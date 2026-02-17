import React, { useState } from 'react';
import { useWeb3 } from './Web3Context';
import { Wallet, LogOut, AlertCircle, CheckCircle, Copy, ExternalLink } from 'lucide-react';

export default function ConnectButton({ variant = 'primary' }) {
  const {
    account,
    isConnected,
    isConnecting,
    error,
    connectWallet,
    disconnectWallet,
    formatAddress,
    walletName,
    isWalletInstalled,
    isMonadNetwork,
    switchToMonad,
    getBalance
  } = useWeb3();

  const [showDropdown, setShowDropdown] = useState(false);
  const [balance, setBalance] = useState(null);
  const [copied, setCopied] = useState(false);

  // Load balance when connected
  React.useEffect(() => {
    if (account) {
      getBalance(account).then(setBalance);
    }
  }, [account]);

  // Copy address to clipboard
  const copyAddress = () => {
    if (account) {
      navigator.clipboard.writeText(account);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Open in explorer
  const openInExplorer = () => {
    if (account) {
      window.open(`https://testnet-explorer.monad.xyz/address/${account}`, '_blank');
    }
  };

  // Button styles based on variant
  const getButtonStyles = () => {
    if (variant === 'primary') {
      return 'px-4 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 rounded-lg font-semibold text-xs sm:text-sm transition-all shadow-lg shadow-orange-900/50';
    }
    return 'px-4 sm:px-6 py-2 sm:py-2.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-lg font-semibold text-xs sm:text-sm transition-all';
  };

  // Not installed
  if (!isWalletInstalled) {
    return (
  <div className="relative z-[100]">
        <button
          onClick={() => window.open('https://metamask.io/download/', '_blank')}
          className={getButtonStyles()}
        >
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            <span className="hidden sm:inline">INSTALL WALLET</span>
            <span className="sm:hidden">INSTALL</span>
          </div>
        </button>
      </div>
    );
  }

  // Not connected
  if (!isConnected) {
    return (
      <div className="relative">
        <button
          onClick={connectWallet}
          disabled={isConnecting}
          className={getButtonStyles()}
        >
          <div className="flex items-center gap-2">
            {isConnecting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span className="hidden sm:inline">CONNECTING...</span>
                <span className="sm:hidden">...</span>
              </>
            ) : (
              <>
                <Wallet className="w-4 h-4" />
                <span className="hidden sm:inline">CONNECT WALLET</span>
                <span className="sm:hidden">CONNECT</span>
              </>
            )}
          </div>
        </button>

        {/* Error message */}
        {error && (
          <div className="absolute top-full mt-2 right-0 w-64 p-3 bg-red-900/20 border border-red-600/50 rounded-lg text-xs text-red-500">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Wrong network
// Wrong network
if (!isMonadNetwork) {
  return (
    <button
      onClick={async () => {
        try {
          await switchToMonad();
          // Refresh after switch
          window.location.reload();
        } catch (error) {
          console.error('Switch failed:', error);
          alert('Failed to switch network. Please switch manually in MetaMask.');
        }
      }}
      className="px-4 sm:px-6 py-2 sm:py-2.5 bg-yellow-600 hover:bg-yellow-500 rounded-lg font-semibold text-xs sm:text-sm transition-all"
    >
      <div className="flex items-center gap-2">
        <AlertCircle className="w-4 h-4" />
        <span className="hidden sm:inline">SWITCH TO MONAD</span>
        <span className="sm:hidden">SWITCH</span>
      </div>
    </button>
  );
}
  // Connected - show dropdown
  return (
     <div className="relative z-[100]">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className={`${getButtonStyles()} ${showDropdown ? 'ring-2 ring-orange-500/50' : ''}`}
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="font-mono">{formatAddress(account)}</span>
        </div>
      </button>

      {/* Dropdown */}
      {showDropdown && (
        <>
          {/* Backdrop */}
         <div 
  className="fixed inset-0 z-[99]" 
  onClick={() => setShowDropdown(false)}
/>
          
          {/* Dropdown menu */}
{/* Dropdown menu */}
<div className="absolute top-full mt-2 right-0 w-80 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl z-[100] overflow-hidden">            <div className="p-4 bg-gradient-to-r from-orange-600/10 to-red-600/10 border-b border-zinc-800">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="font-semibold">Connected</span>
                </div>
                <span className="text-xs px-2 py-1 bg-orange-600/20 text-orange-500 rounded-full border border-orange-600/50">
                  {walletName}
                </span>
              </div>
              
              {/* Address */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">ADDRESS</span>
                  <div className="flex gap-1">
                    <button
                      onClick={copyAddress}
                      className="p-1.5 hover:bg-zinc-800 rounded transition-all"
                      title="Copy address"
                    >
                      {copied ? (
                        <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 text-gray-400" />
                      )}
                    </button>
                    <button
                      onClick={openInExplorer}
                      className="p-1.5 hover:bg-zinc-800 rounded transition-all"
                      title="View in explorer"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
                    </button>
                  </div>
                </div>
                <div className="font-mono text-sm bg-zinc-800/50 p-2 rounded">
                  {account}
                </div>
              </div>
            </div>

            {/* Balance */}
            <div className="p-4 border-b border-zinc-800">
              <div className="text-xs text-gray-500 mb-1">BALANCE</div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold">
                  {balance ? parseFloat(balance).toFixed(4) : '0.0000'}
                </span>
                <span className="text-sm text-gray-500">MON</span>
              </div>
            </div>

            {/* Network info */}
            <div className="p-4 border-b border-zinc-800">
              <div className="text-xs text-gray-500 mb-2">NETWORK</div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="font-semibold">Monad Testnet</span>
              </div>
            </div>

            {/* Actions */}
            <div className="p-3">
              <button
                onClick={() => {
                  disconnectWallet();
                  setShowDropdown(false);
                }}
                className="w-full px-4 py-2.5 bg-red-600/10 hover:bg-red-600/20 border border-red-600/30 rounded-lg font-semibold text-sm text-red-500 transition-all flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Disconnect
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
