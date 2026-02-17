import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flame, TrendingUp, Lock, Unlock, Users, Clock, Trophy, Zap, Search, Filter, ArrowLeft, Menu, X } from 'lucide-react';

export default function LaunchesPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('live');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('trending');
  const [selectedLaunch, setSelectedLaunch] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Mock data - gerçek uygulamada Monad RPC'den gelecek
  const launches = [
    {
      id: 1,
      name: 'BONK2.0',
      symbol: 'BONK2',
      burnProgress: 67,
      totalBurned: 670000000,
      totalSupply: 1000000000,
      threshold: 60,
      lpCollected: 145.5,
      topBurner: '7xKX...9pQz',
      createdAt: '2h ago',
      isLive: true,
      multiplier: 2.4,
      description: 'The next generation of BONK. Community-driven, meme-powered.',
      creator: '9xBN...4tYz',
      burners: 234,
      imageUrl: null
    },
    {
      id: 2,
      name: 'MOONSHOT',
      symbol: 'MOON',
      burnProgress: 89,
      totalBurned: 890000000,
      totalSupply: 1000000000,
      threshold: 60,
      lpCollected: 234.2,
      topBurner: 'DcA9...kL2m',
      createdAt: '5h ago',
      isLive: true,
      multiplier: 1.1,
      description: 'Aiming for the moon with revolutionary tokenomics.',
      creator: 'DcA9...kL2m',
      burners: 456,
      imageUrl: null
    },
    {
      id: 3,
      name: 'DEGEN KING',
      symbol: 'DKING',
      burnProgress: 34,
      totalBurned: 340000000,
      totalSupply: 1000000000,
      threshold: 60,
      lpCollected: 78.9,
      topBurner: '9xBN...4tYz',
      createdAt: '1h ago',
      isLive: true,
      multiplier: 3.8,
      description: 'For true degens only. High risk, high reward.',
      creator: '5mKL...8xQp',
      burners: 189,
      imageUrl: null
    },
    {
      id: 4,
      name: 'SOL BURNER',
      symbol: 'SBURN',
      burnProgress: 100,
      totalBurned: 600000000,
      totalSupply: 1000000000,
      threshold: 60,
      lpCollected: 189.3,
      topBurner: '5mKL...8xQp',
      createdAt: '12h ago',
      isLive: false,
      multiplier: 1.0,
      description: 'Successfully burned and launched. Now trading on Uniswap.',
      creator: '2pHG...7nWx',
      burners: 567,
      imageUrl: null
    },
    {
      id: 5,
      name: 'PYRO TOKEN',
      symbol: 'PYRO',
      burnProgress: 45,
      totalBurned: 450000000,
      totalSupply: 1000000000,
      threshold: 60,
      lpCollected: 92.3,
      topBurner: '3kLM...2nPx',
      createdAt: '4h ago',
      isLive: true,
      multiplier: 2.1,
      description: 'Burn baby burn! Deflationary mechanics at its finest.',
      creator: '8xQR...5tWz',
      burners: 312,
      imageUrl: null
    },
    {
      id: 6,
      name: 'FIRE STARTER',
      symbol: 'FIRE',
      burnProgress: 78,
      totalBurned: 780000000,
      totalSupply: 1000000000,
      threshold: 60,
      lpCollected: 167.8,
      topBurner: '6mNO...9kQy',
      createdAt: '7h ago',
      isLive: true,
      multiplier: 1.5,
      description: 'Igniting the next wave of DeFi innovation.',
      creator: '4pRS...3xVw',
      burners: 423,
      imageUrl: null
    }
  ];

  const filteredLaunches = launches
    .filter(l => {
      if (activeTab === 'live') return l.isLive;
      if (activeTab === 'completed') return !l.isLive;
      return true;
    })
    .filter(l => {
      if (!searchQuery) return true;
      return l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
             l.symbol.toLowerCase().includes(searchQuery.toLowerCase());
    })
    .sort((a, b) => {
      if (sortBy === 'trending') return b.multiplier - a.multiplier;
      if (sortBy === 'progress') return b.burnProgress - a.burnProgress;
      if (sortBy === 'recent') return a.id - b.id;
      return 0;
    });

  return (
    <div className="min-h-screen bg-black text-gray-100 font-['Outfit']">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Bebas+Neue&display=swap');
        
        @keyframes flicker {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(255, 94, 0, 0.3); }
          50% { box-shadow: 0 0 40px rgba(255, 94, 0, 0.5); }
        }
        
        @keyframes slide-up {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        .flicker {
          animation: flicker 3s ease-in-out infinite;
        }
        
        .glow-border {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        
        .slide-up {
          animation: slide-up 0.6s ease-out forwards;
        }
        
        .gradient-text {
          background: linear-gradient(135deg, #ff5e00 0%, #ff0000 50%, #ff5e00 100%);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradient-shift 3s ease infinite;
        }
        
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>

      {/* Background Effects */}
      <div className="fixed inset-0 bg-gradient-to-b from-black via-red-950/5 to-black pointer-events-none" />

      {/* Header */}
      <header className="relative border-b border-red-900/30 bg-black/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 sm:gap-4">
              <button 
                onClick={() => navigate('/dashboard')}
                className="w-8 h-8 sm:w-10 sm:h-10 bg-zinc-800 hover:bg-zinc-700 rounded-lg flex items-center justify-center transition-all"
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="relative">
                  <Flame className="w-8 h-8 sm:w-10 sm:h-10 text-orange-500 flicker" />
                  <div className="absolute inset-0 blur-xl bg-orange-500/30 flicker" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-['Bebas_Neue'] tracking-wider gradient-text">
                    LAUNCHES
                  </h1>
                  <p className="text-[8px] sm:text-xs text-gray-500 -mt-1">ACTIVE BURN POOLS</p>
                </div>
              </div>
            </div>
            
            <button className="px-4 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-orange-600 to-red-600 rounded-lg font-semibold text-xs sm:text-sm hover:from-orange-500 hover:to-red-500 transition-all shadow-lg shadow-orange-900/50">
              CONNECT WALLET
            </button>
          </div>
        </div>
      </header>

      {/* Filters & Search */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between mb-6">
          {/* Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg font-semibold text-xs sm:text-sm transition-all whitespace-nowrap ${
                activeTab === 'all'
                  ? 'bg-orange-600 text-white'
                  : 'bg-zinc-800 text-gray-400 hover:bg-zinc-700'
              }`}
            >
              ALL ({launches.length})
            </button>
            <button
              onClick={() => setActiveTab('live')}
              className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg font-semibold text-xs sm:text-sm transition-all whitespace-nowrap ${
                activeTab === 'live'
                  ? 'bg-orange-600 text-white'
                  : 'bg-zinc-800 text-gray-400 hover:bg-zinc-700'
              }`}
            >
              🔥 LIVE ({launches.filter(l => l.isLive).length})
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg font-semibold text-xs sm:text-sm transition-all whitespace-nowrap ${
                activeTab === 'completed'
                  ? 'bg-orange-600 text-white'
                  : 'bg-zinc-800 text-gray-400 hover:bg-zinc-700'
              }`}
            >
              ✓ COMPLETED ({launches.filter(l => !l.isLive).length})
            </button>
          </div>

          {/* Search & Sort */}
          <div className="flex gap-2 sm:gap-3">
            <div className="relative flex-1 lg:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search launches..."
                className="w-full pl-10 pr-4 py-2 sm:py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:border-orange-600 transition-all text-sm"
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 sm:px-4 py-2 sm:py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:border-orange-600 transition-all text-xs sm:text-sm"
            >
              <option value="trending">Trending</option>
              <option value="progress">Progress</option>
              <option value="recent">Recent</option>
            </select>
          </div>
        </div>
      </section>

      {/* Launches Grid */}
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 pb-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredLaunches.map((launch, i) => (
            <div
              key={launch.id}
              onClick={() => setSelectedLaunch(launch)}
              className={`bg-gradient-to-br from-zinc-900 to-zinc-950 border rounded-xl p-5 sm:p-6 cursor-pointer transition-all hover:scale-[1.02] slide-up ${
                launch.burnProgress >= launch.threshold
                  ? 'border-green-600/50 glow-border'
                  : 'border-zinc-800 hover:border-orange-600/50'
              }`}
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex-shrink-0 ${
                    launch.isLive ? 'bg-gradient-to-br from-orange-600 to-red-600' : 'bg-zinc-800'
                  } flex items-center justify-center text-xl sm:text-2xl font-bold`}>
                    {launch.symbol.slice(0, 2)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="text-lg sm:text-xl font-bold truncate">{launch.name}</h3>
                      {launch.isLive && (
                        <span className="px-2 py-0.5 bg-red-600/20 text-red-500 text-xs font-bold rounded border border-red-600/50 flicker whitespace-nowrap">
                          LIVE
                        </span>
                      )}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-500">${launch.symbol}</div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-gray-400 mb-4 line-clamp-2">
                {launch.description}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-2 sm:p-3 bg-zinc-800/50 rounded-lg">
                  <div className="text-xs text-gray-500 mb-1">Multiplier</div>
                  <div className="text-lg sm:text-xl font-bold text-orange-500">{launch.multiplier}x</div>
                </div>
                <div className="p-2 sm:p-3 bg-zinc-800/50 rounded-lg">
                  <div className="text-xs text-gray-500 mb-1">Burners</div>
                  <div className="text-lg sm:text-xl font-bold">{launch.burners}</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-gray-400">BURN PROGRESS</span>
                  <span className="font-bold">
                    {launch.burnProgress}% / {launch.threshold}%
                  </span>
                </div>
                <div className="relative h-2.5 bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className={`absolute inset-y-0 left-0 transition-all duration-1000 ${
                      launch.burnProgress >= launch.threshold
                        ? 'bg-gradient-to-r from-green-600 to-emerald-600'
                        : 'bg-gradient-to-r from-orange-600 to-red-600'
                    }`}
                    style={{ width: `${Math.min(launch.burnProgress, 100)}%` }}
                  />
                </div>
              </div>

              {/* Footer Stats */}
              <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-zinc-800">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {launch.createdAt}
                </div>
                <div className="flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  {launch.lpCollected} MON LP
                </div>
              </div>

              {/* CTA Button */}
              {launch.burnProgress < launch.threshold && (
                <button className="w-full mt-4 py-2.5 bg-gradient-to-r from-orange-600 to-red-600 rounded-lg font-semibold text-sm hover:from-orange-500 hover:to-red-500 transition-all">
                  BURN NOW 🔥
                </button>
              )}

              {launch.burnProgress >= launch.threshold && (
                <div className="mt-4 p-3 bg-green-600/10 border border-green-600/30 rounded-lg flex items-center gap-2">
                  <Unlock className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-semibold text-green-500">
                    TRADING LIVE!
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredLaunches.length === 0 && (
          <div className="text-center py-20">
            <Flame className="w-20 h-20 text-gray-700 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">No launches found</h3>
            <p className="text-gray-500">Try adjusting your filters or search query</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative border-t border-zinc-800 bg-black/80 backdrop-blur-xl mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
              <Flame className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500" />
              <span>Powered by Monad • Built for Degens</span>
            </div>
            <div className="flex gap-4 sm:gap-6 text-xs sm:text-sm text-gray-500">
              <a href="#" className="hover:text-orange-500 transition-colors">Twitter</a>
              <a href="#" className="hover:text-orange-500 transition-colors">Discord</a>
              <a href="#" className="hover:text-orange-500 transition-colors">GitHub</a>
              <a href="#" className="hover:text-orange-500 transition-colors">Docs</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
