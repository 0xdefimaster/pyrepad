// src/utils/web3.js
import { ethers } from 'ethers';

// Contract ABIs
export const FACTORY_ABI = [
  "function createToken(string name, string symbol, uint256 totalSupply, uint256 burnThresholdPercent, uint256 vestingDays, address devWallet, string description, string imageUrl, string twitter, string telegram, string website) payable returns (address)",
  "function getAllTokens() view returns (address[])",
  "function getUserTokens(address user) view returns (address[])",
  "function getTokenCount() view returns (uint256)",
  "function PLATFORM_FEE() view returns (uint256)",
  "event TokenCreated(address indexed token, address indexed creator, string name, string symbol, uint256 totalSupply, uint256 timestamp)"
];

export const TOKEN_ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address) view returns (uint256)",
  "function burn(uint256 amount)",
  "function getBurnProgress() view returns (uint256 burned, uint256 threshold, uint256 percentage)",
  "function getTokenInfo() view returns (string, string, uint256, uint256, uint256, bool, string, string)",
  "function tradingEnabled() view returns (bool)",
  "function claimDevTokens()",
  "function getClaimableDevTokens() view returns (uint256)",
  "event TokensBurned(address indexed burner, uint256 amount, uint256 totalBurned)",
  "event TradingEnabled(uint256 timestamp)"
];

// Monad Network Configuration
export const NETWORKS = {
  monadTestnet: {
    chainId: '0xA1EC', // 41454 in hex
    chainName: 'Monad Testnet',
    nativeCurrency: {
      name: 'MON',
      symbol: 'MON',
      decimals: 18
    },
    rpcUrls: ['https://testnet-rpc.monad.xyz'],
    blockExplorerUrls: ['https://testnet-explorer.monad.xyz']
  },
  monadMainnet: {
    chainId: '0xA1ED', // 41455 in hex
    chainName: 'Monad',
    nativeCurrency: {
      name: 'MON',
      symbol: 'MON',
      decimals: 18
    },
    rpcUrls: ['https://rpc.monad.xyz'],
    blockExplorerUrls: ['https://explorer.monad.xyz']
  }
};

// Contract addresses (update after deployment)
export const CONTRACTS = {
  FACTORY: '0x0000000000000000000000000000000000000000', // UPDATE THIS AFTER DEPLOYMENT
};

/**
 * Connect to wallet
 */
export async function connectWallet() {
  if (!window.ethereum) {
    throw new Error('Please install MetaMask or another Web3 wallet');
  }

  try {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts'
    });

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const balance = await provider.getBalance(address);

    return {
      provider,
      signer,
      address,
      balance: ethers.utils.formatEther(balance)
    };
  } catch (error) {
    console.error('Wallet connection error:', error);
    throw error;
  }
}

/**
 * Switch to Monad network
 */
export async function switchToMonad(network = 'monadTestnet') {
  if (!window.ethereum) {
    throw new Error('No wallet found');
  }

  const networkConfig = NETWORKS[network];

  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: networkConfig.chainId }],
    });
  } catch (switchError) {
    // Network not added, try to add it
    if (switchError.code === 4902) {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [networkConfig],
        });
      } catch (addError) {
        throw addError;
      }
    } else {
      throw switchError;
    }
  }
}

/**
 * Get factory contract instance
 */
export function getFactoryContract(signer) {
  return new ethers.Contract(CONTRACTS.FACTORY, FACTORY_ABI, signer);
}

/**
 * Get token contract instance
 */
export function getTokenContract(tokenAddress, signerOrProvider) {
  return new ethers.Contract(tokenAddress, TOKEN_ABI, signerOrProvider);
}

/**
 * Upload image to IPFS
 */
export async function uploadToIPFS(file) {
  // Simple base64 implementation for now
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(file);
  });
}

/**
 * Create a new token
 */
export async function createToken(signer, tokenData) {
  const factory = getFactoryContract(signer);
  
  // Get platform fee
  const platformFee = await factory.PLATFORM_FEE();
  
  // Upload image if provided
  let imageUrl = tokenData.imageUrl || '';
  if (tokenData.imageFile) {
    imageUrl = await uploadToIPFS(tokenData.imageFile);
  }
  
  // Create token
  const tx = await factory.createToken(
    tokenData.name,
    tokenData.symbol,
    ethers.utils.parseUnits(tokenData.totalSupply, 18),
    tokenData.threshold,
    tokenData.vestingDuration,
    tokenData.devWallet || await signer.getAddress(),
    tokenData.description,
    imageUrl,
    tokenData.twitter || '',
    tokenData.telegram || '',
    tokenData.website || '',
    { value: platformFee }
  );
  
  const receipt = await tx.wait();
  
  // Find TokenCreated event
  const event = receipt.events?.find(e => e.event === 'TokenCreated');
  const tokenAddress = event?.args?.token;
  
  return {
    tokenAddress,
    transactionHash: receipt.transactionHash
  };
}

/**
 * Get all tokens
 */
export async function getAllTokens(provider) {
  const factory = new ethers.Contract(CONTRACTS.FACTORY, FACTORY_ABI, provider);
  const addresses = await factory.getAllTokens();
  
  const tokens = await Promise.all(
    addresses.map(async (address) => {
      const token = new ethers.Contract(address, TOKEN_ABI, provider);
      const info = await token.getTokenInfo();
      const burnProgress = await token.getBurnProgress();
      
      return {
        address,
        name: info[0],
        symbol: info[1],
        totalSupply: ethers.utils.formatUnits(info[2], 18),
        burnThreshold: ethers.utils.formatUnits(info[3], 18),
        totalBurned: ethers.utils.formatUnits(info[4], 18),
        tradingEnabled: info[5],
        description: info[6],
        imageUrl: info[7],
        burnPercentage: burnProgress.percentage.toNumber()
      };
    })
  );
  
  return tokens;
}

/**
 * Burn tokens
 */
export async function burnTokens(signer, tokenAddress, amount) {
  const token = getTokenContract(tokenAddress, signer);
  const tx = await token.burn(ethers.utils.parseUnits(amount, 18));
  const receipt = await tx.wait();
  return receipt;
}

/**
 * Get token info
 */
export async function getTokenInfo(provider, tokenAddress) {
  const token = getTokenContract(tokenAddress, provider);
  const info = await token.getTokenInfo();
  const burnProgress = await token.getBurnProgress();
  
  return {
    name: info[0],
    symbol: info[1],
    totalSupply: ethers.utils.formatUnits(info[2], 18),
    burnThreshold: ethers.utils.formatUnits(info[3], 18),
    totalBurned: ethers.utils.formatUnits(info[4], 18),
    tradingEnabled: info[5],
    description: info[6],
    imageUrl: info[7],
    burnPercentage: burnProgress.percentage.toNumber(),
    burned: ethers.utils.formatUnits(burnProgress.burned, 18),
    threshold: ethers.utils.formatUnits(burnProgress.threshold, 18)
  };
}

/**
 * Format error messages
 */
export function formatError(error) {
  if (error.code === 4001) {
    return 'Transaction rejected by user';
  }
  if (error.code === -32603) {
    return 'Internal error - please try again';
  }
  if (error.message) {
    const match = error.message.match(/reason="([^"]+)"/);
    if (match) {
      return match[1];
    }
    return error.message;
  }
  return 'An error occurred';
}