// src/hooks/useWeb3.js
import { useState, useEffect, createContext, useContext } from 'react';
import { connectWallet, switchToMonad } from '../utils/web3';

const Web3Context = createContext();

export function Web3Provider({ children }) {
  const [wallet, setWallet] = useState({
    connected: false,
    address: null,
    balance: null,
    provider: null,
    signer: null
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Check if already connected
  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({
            method: 'eth_accounts'
          });
          
          if (accounts.length > 0) {
            await connect();
          }
        } catch (err) {
          console.error('Error checking connection:', err);
        }
      }
    };

    checkConnection();

    // Listen for account changes
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      }
    };
  }, []);

  const handleAccountsChanged = async (accounts) => {
    if (accounts.length === 0) {
      disconnect();
    } else {
      await connect();
    }
  };

  const handleChainChanged = () => {
    window.location.reload();
  };

  const connect = async () => {
    setLoading(true);
    setError(null);

    try {
      // First connect wallet
      const walletData = await connectWallet();
      
      // Then switch to Monad network
      try {
        await switchToMonad('monadTestnet');
      } catch (networkError) {
        console.warn('Failed to switch network:', networkError);
        // Continue anyway - user can switch manually
      }

      setWallet({
        connected: true,
        ...walletData
      });

      return walletData;
    } catch (err) {
      console.error('Connection error:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const disconnect = () => {
    setWallet({
      connected: false,
      address: null,
      balance: null,
      provider: null,
      signer: null
    });
  };

  const value = {
    wallet,
    loading,
    error,
    connect,
    disconnect,
    isConnected: wallet.connected
  };

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
}

export function useWeb3() {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3 must be used within Web3Provider');
  }
  return context;
}