import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flame, TrendingUp, Lock, Unlock, Users, Clock, Trophy, Zap } from 'lucide-react';
import ConnectButton from './ConnectButton';


export default function PyrePadDashboard() {
  const navigate = useNavigate();
  const [burnProgress, setBurnProgress] = useState(42);
  const [activeTab, setActiveTab] = useState('trending');
  const [selectedLaunch, setSelectedLaunch] = useState(null);

  // Mock data - gerçek uygulamada Solana RPC'den gelecek
  const launches = [
    {
      id: 1,
      name: 'BONK2.0',
      symbol: 'BONK2',
      burnProgress: 67,
      totalBurned: 670000000,
      totalSupply: 1000000000,
      threshold: 60,
      lpCollected: 45.5,
      topBurner: '7xKX...9pQz',
      createdAt: '2h ago',
      isLive: true,
      multiplier: 2.4
    },
    {
      id: 2,
      name: 'MOONSHOT',
      symbol: 'MOON',
      burnProgress: 89,
      totalBurned: 890000000,
      totalSupply: 1000000000,
      threshold: 60,
      lpCollected: 78.2,
      topBurner: 'DcA9...kL2m',
      createdAt: '5h ago',
      isLive: true,
      multiplier: 1.1
    },
    {
      id: 3,
      name: 'DEGEN KING',
      symbol: 'DKING',
      burnProgress: 34,
      totalBurned: 340000000,
      totalSupply: 1000000000,
      threshold: 60,
      lpCollected: 28.9,
      topBurner: '9xBN...4tYz',
      createdAt: '1h ago',
      isLive: true,
      multiplier: 3.8
    },
    {
      id: 4,
      name: 'SOL BURNER',
      symbol: 'SBURN',
      burnProgress: 100,
      totalBurned: 600000000,
      totalSupply: 1000000000,
      threshold: 60,
      lpCollected: 62.3,
      topBurner: '5mKL...8xQp',
      createdAt: '12h ago',
      isLive: false,
      multiplier: 1.0
    }
  ];

  const leaderboard = [
    { rank: 1, wallet: '7xKX...9pQz', burned: 45000000, spent: 4.2, points: 48200 },
    { rank: 2, wallet: 'DcA9...kL2m', burned: 38000000, spent: 3.5, points: 41500 },
    { rank: 3, wallet: '9xBN...4tYz', burned: 29000000, spent: 2.8, points: 33100 },
    { rank: 4, wallet: '5mKL...8xQp', burned: 24000000, spent: 2.3, points: 28900 },
    { rank: 5, wallet: '2pHG...7nWx', burned: 19000000, spent: 1.9, points: 22400 }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setBurnProgress(prev => Math.min(prev + Math.random() * 2, 100));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-gray-100 font-['Outfit']">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Bebas+Neue&display=swap');
        
        @keyframes flicker {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        
        @keyframes ember {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          100% { transform: translateY(-100px) scale(0); opacity: 0; }
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(255, 94, 0, 0.3), 0 0 40px rgba(255, 94, 0, 0.1); }
          50% { box-shadow: 0 0 30px rgba(255, 94, 0, 0.5), 0 0 60px rgba(255, 94, 0, 0.2); }
        }
        
        @keyframes slide-up {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        .ember-particle {
          animation: ember 4s ease-out infinite;
        }
        
        .flicker {
          animation: flicker 3s ease-in-out infinite;
        }
        
        .glow-border {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        
        .slide-up-anim {
          animation: slide-up 0.6s ease-out forwards;
        }
        
        .bg-grid {
          background-image: 
            linear-gradient(rgba(255, 94, 0, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 94, 0, 0.05) 1px, transparent 1px);
          background-size: 50px 50px;
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
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
          scroll-behavior: smooth;
        }
      `}</style>

      {/* Animated Background */}
      <div className="fixed inset-0 bg-grid opacity-20 pointer-events-none" />
      <div className="fixed inset-0 bg-gradient-to-b from-black via-red-950/5 to-black pointer-events-none" />
      
      {/* Ember Particles */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="ember-particle fixed w-1 h-1 bg-orange-500 rounded-full pointer-events-none"
          style={{
            left: `${Math.random() * 100}%`,
            bottom: '0',
            animationDelay: `${Math.random() * 4}s`,
            opacity: 0.6
          }}
        />
      ))}

      {/* Header */}
      <header className="sticky top-0 border-b border-red-900/30 bg-black/80 backdrop-blur-xl z-[90]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3 cursor-pointer" onClick={() => navigate('/')}>
              <div className="relative">
                <Flame className="w-8 h-8 sm:w-10 sm:h-10 text-orange-500 flicker" />
                <div className="absolute inset-0 blur-xl bg-orange-500/30 flicker" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-['Bebas_Neue'] tracking-wider gradient-text">
                  PYREPAD
                </h1>
                <p className="text-[8px] sm:text-xs text-gray-500 -mt-1">BURN TO LAUNCH</p>
              </div>
            </div>
            
            <nav className="hidden lg:flex items-center gap-6">
              <button className="text-gray-400 hover:text-orange-500 transition-colors text-sm font-medium">
                LAUNCHES
              </button>
              <button className="text-gray-400 hover:text-orange-500 transition-colors text-sm font-medium">
                DOCS
              </button>
              <button 
                onClick={() => navigate('/create')}
                className="px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 border border-orange-600/50 rounded-lg font-semibold text-sm transition-all"
              >
                + CREATE TOKEN
              </button>
              <ConnectButton variant="primary" />
            </nav>

            {/* Mobile buttons */}
            <div className="lg:hidden flex items-center gap-2">
              <button 
                onClick={() => navigate('/CreateLaunchPage.jsx')}
                className="px-3 py-2 bg-zinc-800 hover:bg-zinc-700 border border-orange-600/50 rounded-lg font-semibold text-xs transition-all"
              >
                + CREATE
              </button>
              <ConnectButton variant="primary" />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Stats */}
      <section className="relative max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-4 gap-6">
          {[
            { label: 'TOTAL BURNED', value: '$2.4M', icon: Flame, color: 'orange' },
            { label: 'ACTIVE LAUNCHES', value: '47', icon: Zap, color: 'red' },
            { label: 'LP LOCKED', value: '1,234 ETH', icon: Lock, color: 'yellow' },
            { label: 'TOTAL BURNERS', value: '12.4K', icon: Users, color: 'orange' }
          ].map((stat, i) => (
            <div key={i} className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-xl p-6 slide-up-anim" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="flex items-center justify-between mb-3">
                <stat.icon className={`w-5 h-5 text-${stat.color}-500`} />
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-xs text-gray-500 uppercase tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Horizontal Launch Slider */}
      <section className="relative max-w-7xl mx-auto px-6 pb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Flame className="w-6 h-6 text-orange-500" />
            LIVE BURNS
          </h2>
          <div className="flex gap-2">
            <button className="w-10 h-10 bg-zinc-800 hover:bg-zinc-700 rounded-lg flex items-center justify-center transition-all">
              ←
            </button>
            <button className="w-10 h-10 bg-zinc-800 hover:bg-zinc-700 rounded-lg flex items-center justify-center transition-all">
              →
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-4 pb-4" style={{ width: 'max-content' }}>
            {launches.filter(l => l.isLive).map((launch, i) => (
              <div
                key={launch.id}
                onClick={() => setSelectedLaunch(launch)}
                className={`w-80 bg-gradient-to-br from-zinc-900 to-zinc-950 border rounded-xl p-5 cursor-pointer transition-all hover:scale-105 slide-up-anim ${
                  launch.burnProgress >= launch.threshold
                    ? 'border-green-600/50 glow-border'
                    : 'border-zinc-800 hover:border-orange-600/50'
                }`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-600 to-red-600 flex items-center justify-center text-lg font-bold">
                      {launch.symbol.slice(0, 2)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold">{launch.name}</h3>
                        <span className="px-2 py-0.5 bg-red-600/20 text-red-500 text-xs font-bold rounded border border-red-600/50 flicker">
                          LIVE
                        </span>
                      </div>
                      <div className="text-xs text-gray-500">${launch.symbol}</div>
                    </div>
                  </div>
                </div>

                {/* Multiplier Badge */}
                <div className="mb-4 p-3 bg-orange-600/10 border border-orange-600/30 rounded-lg flex items-center justify-between">
                  <span className="text-sm text-gray-400">Current Multiplier</span>
                  <span className="text-2xl font-bold text-orange-500">{launch.multiplier}x</span>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
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

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="p-2 bg-zinc-800/50 rounded">
                    <div className="text-gray-500 text-xs mb-1">Burned</div>
                    <div className="font-bold">{(launch.totalBurned / 1000000).toFixed(0)}M</div>
                  </div>
                  <div className="p-2 bg-zinc-800/50 rounded">
                    <div className="text-gray-500 text-xs mb-1">LP Pool</div>
                    <div className="font-bold">{launch.lpCollected} SOL</div>
                  </div>
                </div>

                {/* Status */}
                {launch.burnProgress >= launch.threshold && (
                  <div className="mt-3 p-2 bg-green-600/10 border border-green-600/30 rounded-lg flex items-center gap-2">
                    <Unlock className="w-4 h-4 text-green-500" />
                    <span className="text-xs font-semibold text-green-500">
                      TRADING LIVE!
                    </span>
                  </div>
                )}

                {launch.burnProgress < launch.threshold && (
                  <button className="w-full mt-3 py-2.5 bg-gradient-to-r from-orange-600 to-red-600 rounded-lg font-semibold text-sm hover:from-orange-500 hover:to-red-500 transition-all">
                    BURN NOW 🔥
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 pb-12">
        <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
          
          {/* Left Column - All Launches List */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
              <h2 className="text-xl sm:text-2xl font-bold">ALL LAUNCHES</h2>
              <div className="flex items-center gap-2 overflow-x-auto">
                <button
                  onClick={() => setActiveTab('trending')}
                  className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                    activeTab === 'trending'
                      ? 'bg-orange-600 text-white'
                      : 'bg-zinc-800 text-gray-400 hover:bg-zinc-700'
                  }`}
                >
                  🔥 TRENDING
                </button>
                <button
                  onClick={() => setActiveTab('new')}
                  className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                    activeTab === 'new'
                      ? 'bg-orange-600 text-white'
                      : 'bg-zinc-800 text-gray-400 hover:bg-zinc-700'
                  }`}
                >
                  ⚡ NEW
                </button>
                <button
                  onClick={() => setActiveTab('completed')}
                  className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                    activeTab === 'completed'
                      ? 'bg-orange-600 text-white'
                      : 'bg-zinc-800 text-gray-400 hover:bg-zinc-700'
                  }`}
                >
                  ✓ COMPLETED
                </button>
              </div>
            </div>

            {launches.filter(l => activeTab === 'completed' ? !l.isLive : true).map((launch, i) => (
              <div
                key={launch.id}
                onClick={() => setSelectedLaunch(launch)}
                className={`bg-gradient-to-br from-zinc-900 to-zinc-950 border rounded-xl p-6 cursor-pointer transition-all hover:scale-[1.02] slide-up-anim ${
                  launch.burnProgress >= launch.threshold
                    ? 'border-green-600/50 glow-border'
                    : 'border-zinc-800 hover:border-orange-600/50'
                }`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                    <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl flex-shrink-0 ${
                      launch.isLive ? 'bg-gradient-to-br from-orange-600 to-red-600' : 'bg-zinc-800'
                    } flex items-center justify-center text-lg sm:text-2xl font-bold`}>
                      {launch.symbol.slice(0, 2)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
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
                  
                  <div className="text-right flex-shrink-0">
                    <div className="text-xl sm:text-2xl font-bold text-orange-500">{launch.multiplier}x</div>
                    <div className="text-[10px] sm:text-xs text-gray-500">MULTIPLIER</div>
                  </div>
                </div>

                {/* Burn Progress Bar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">BURN PROGRESS</span>
                    <span className="font-bold">
                      {launch.burnProgress}% / {launch.threshold}%
                    </span>
                  </div>
                  <div className="relative h-3 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className={`absolute inset-y-0 left-0 transition-all duration-1000 ${
                        launch.burnProgress >= launch.threshold
                          ? 'bg-gradient-to-r from-green-600 to-emerald-600'
                          : 'bg-gradient-to-r from-orange-600 to-red-600'
                      }`}
                      style={{ width: `${Math.min(launch.burnProgress, 100)}%` }}
                    />
                    {launch.burnProgress >= launch.threshold && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
                    )}
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mt-4 pt-4 border-t border-zinc-800">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">BURNED</div>
                    <div className="text-sm sm:text-base font-bold">{(launch.totalBurned / 1000000).toFixed(0)}M</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">LP COLLECTED</div>
                    <div className="text-sm sm:text-base font-bold">{launch.lpCollected} SOL</div>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <div className="text-xs text-gray-500 mb-1">TOP BURNER</div>
                    <div className="font-mono text-xs sm:text-sm">{launch.topBurner}</div>
                  </div>
                </div>

                {launch.burnProgress >= launch.threshold && (
                  <div className="mt-4 p-3 bg-green-600/10 border border-green-600/30 rounded-lg flex items-center gap-2">
                    <Unlock className="w-5 h-5 text-green-500" />
                    <span className="text-sm font-semibold text-green-500">
                      TRADING UNLOCKED - LP LIVE!
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Column - Leaderboard */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-6">
                <Trophy className="w-6 h-6 text-yellow-500" />
                <h2 className="text-xl font-bold">TOP BURNERS</h2>
              </div>
              
              <div className="space-y-3">
                {leaderboard.map((user, i) => (
                  <div
                    key={user.rank}
                    className={`p-4 rounded-lg transition-all hover:scale-[1.02] ${
                      i === 0
                        ? 'bg-gradient-to-r from-yellow-600/20 to-orange-600/20 border border-yellow-600/50'
                        : 'bg-zinc-800/50 border border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                          i === 0 ? 'bg-yellow-600 text-black' :
                          i === 1 ? 'bg-gray-400 text-black' :
                          i === 2 ? 'bg-orange-700 text-white' :
                          'bg-zinc-700 text-gray-400'
                        }`}>
                          {user.rank}
                        </div>
                        <div className="font-mono text-sm">{user.wallet}</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
                      <div>
                        <div className="text-gray-500">Burned</div>
                        <div className="font-bold">{(user.burned / 1000000).toFixed(1)}M</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Points</div>
                        <div className="font-bold text-orange-500">{user.points.toLocaleString()}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-lg font-bold mb-4">📊 PLATFORM STATS</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">24h Volume</span>
                  <span className="font-bold">$847K</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Avg Burn Time</span>
                  <span className="font-bold">4.2h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Success Rate</span>
                  <span className="font-bold text-green-500">89%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative border-t border-zinc-800 bg-black/80 backdrop-blur-xl mt-12">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Flame className="w-4 h-4 text-orange-500" />
              <span>Powered by Monad • Blazing Fast EVM</span>
            </div>
            <div className="flex gap-6 text-sm text-gray-500">
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
