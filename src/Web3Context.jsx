import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';

const Web3Context = createContext();

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3 must be used within Web3Provider');
  }
  return context;
};

// Monad Testnet Configuration
export const MONAD_TESTNET = {
  chainId: '0x279f', // 90210 in hex
  chainName: 'Monad Testnet',
  nativeCurrency: {
    name: 'Monad',
    symbol: 'MON',
    decimals: 18
  },
  rpcUrls: ['https://testnet-rpc.monad.xyz'],
  blockExplorerUrls: ['https://testnet-explorer.monad.xyz']
};

export const Web3Provider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState(null);

  // Check if wallet is installed
  const isWalletInstalled = () => {
    return typeof window.ethereum !== 'undefined';
  };

  // Get wallet name (MetaMask, Rabby, etc)
  const getWalletName = () => {
    if (!window.ethereum) return null;
    
    if (window.ethereum.isMetaMask && !window.ethereum.isRabby) {
      return 'MetaMask';
    }
    if (window.ethereum.isRabby) {
      return 'Rabby';
    }
    return 'Wallet';
  };

  // Switch to Monad network
  // Switch to Monad network
const switchToMonad = async () => {
  if (!window.ethereum) {
    throw new Error('No wallet found');
  }

  try {
    // First try to switch
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: MONAD_TESTNET.chainId }],
    });
    
    // Reload after successful switch
    setTimeout(() => {
      window.location.reload();
    }, 500);
    
    return true;
  } catch (switchError) {
    console.log('Switch error:', switchError);
    
    // If network doesn't exist (error code 4902), add it
    if (switchError.code === 4902 || switchError.code === -32603) {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: MONAD_TESTNET.chainId,
              chainName: MONAD_TESTNET.chainName,
              nativeCurrency: MONAD_TESTNET.nativeCurrency,
              rpcUrls: MONAD_TESTNET.rpcUrls,
              blockExplorerUrls: MONAD_TESTNET.blockExplorerUrls
            }
          ],
        });
        
        // Reload after successful add
        setTimeout(() => {
          window.location.reload();
        }, 500);
        
        return true;
      } catch (addError) {
        console.error('Error adding Monad network:', addError);
        throw new Error('Failed to add Monad network: ' + addError.message);
      }
    }
    
    // User rejected or other error
    throw new Error('Failed to switch network: ' + switchError.message);
  }
};

  // Connect wallet
 // Connect wallet
const connectWallet = async () => {
  if (!isWalletInstalled()) {
    setError('Please install MetaMask or Rabby wallet');
    return;
  }

  setIsConnecting(true);
  setError(null);

  try {
    // Request account access
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts'
    });

    // Create provider and signer
    const ethersProvider = new ethers.BrowserProvider(window.ethereum);
    const ethersSigner = await ethersProvider.getSigner();
    
    // Get chain ID
    const network = await ethersProvider.getNetwork();
    const currentChainId = '0x' + BigInt(network.chainId).toString(16).toUpperCase();

    setAccount(accounts[0]);
    setChainId(currentChainId);
    setProvider(ethersProvider);
    setSigner(ethersSigner);

    // Check if on Monad, if not show switch button
    if (currentChainId.toLowerCase() !== MONAD_TESTNET.chainId.toLowerCase()) {
      setError('Please switch to Monad Testnet');
      // Don't auto-switch, let user click the button
    } else {
      setError(null);
    }
    
    // Save to localStorage
    localStorage.setItem('walletConnected', 'true');
    
  } catch (err) {
    console.error('Error connecting wallet:', err);
    setError(err.message || 'Failed to connect wallet');
  } finally {
    setIsConnecting(false);
  }
};

  // Disconnect wallet
  const disconnectWallet = () => {
    setAccount(null);
    setProvider(null);
    setSigner(null);
    setChainId(null);
    localStorage.removeItem('walletConnected');
  };

  // Format address (0x1234...5678)
  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // Get balance
  const getBalance = async (address) => {
    if (!provider || !address) return '0';
    try {
      const balance = await provider.getBalance(address);
      return ethers.formatEther(balance);
    } catch (err) {
      console.error('Error getting balance:', err);
      return '0';
    }
  };

  // Auto-connect if previously connected
  useEffect(() => {
    const wasConnected = localStorage.getItem('walletConnected');
    if (wasConnected === 'true' && isWalletInstalled()) {
      connectWallet();
    }
  }, []);

  // Listen for account changes
  useEffect(() => {
    if (!window.ethereum) return;

    const handleAccountsChanged = (accounts) => {
      if (accounts.length === 0) {
        disconnectWallet();
      } else if (accounts[0] !== account) {
        setAccount(accounts[0]);
      }
    };

    const handleChainChanged = (newChainId) => {
      setChainId(newChainId);
      // Reload to avoid any issues
      window.location.reload();
    };

    window.ethereum.on('accountsChanged', handleAccountsChanged);
    window.ethereum.on('chainChanged', handleChainChanged);

    return () => {
      if (window.ethereum.removeListener) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      }
    };
  }, [account]);

  const value = {
    account,
    provider,
    signer,
    chainId,
    isConnecting,
    error,
    isConnected: !!account,
    isWalletInstalled: isWalletInstalled(),
    walletName: getWalletName(),
    connectWallet,
    disconnectWallet,
    switchToMonad,
    formatAddress,
    getBalance,
isMonadNetwork: chainId?.toLowerCase() === MONAD_TESTNET.chainId.toLowerCase()  };

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
};
