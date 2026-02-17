import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Flame, Zap, Lock, TrendingUp, Shield, Users, ArrowRight, Github, Twitter, FileText, Rocket, Menu, X } from 'lucide-react';
import ConnectButton from './ConnectButton';

export default function PyrePadLanding() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { value: '$2.4M', label: 'Total Burned' },
    { value: '47', label: 'Active Launches' },
    { value: '12.4K', label: 'Community Members' },
    { value: '89%', label: 'Success Rate' }
  ];

  const features = [
    {
      icon: Flame,
      title: 'Burn-to-Launch',
      description: 'Revolutionary mechanism where users burn tokens to unlock trading - no presale, no insider advantage.',
      color: 'orange'
    },
    {
      icon: Lock,
      title: 'Anti-Rug Protection',
      description: 'LP automatically locked forever. Dev allocation vests linearly. Trading locked until threshold reached.',
      color: 'green'
    },
    {
      icon: TrendingUp,
      title: 'Deflationary by Design',
      description: 'Every burn reduces supply permanently. Early burners get better rates. Price discovery through scarcity.',
      color: 'red'
    },
    {
      icon: Zap,
      title: 'Powered by Monad',
      description: '10,000 TPS parallel execution. Gas fees under $0.01. Instant finality with EVM compatibility.',
      color: 'purple'
    }
  ];

  const howItWorks = [
    {
      step: '1',
      title: 'Create Launch',
      description: 'Deploy your token with custom threshold (30-90%) and vesting period (30-180 days)',
      icon: Rocket
    },
    {
      step: '2',
      title: 'Community Burns',
      description: 'Users send MON to burn tokens. 2% goes to LP, rest to creator. Bonding curve determines price.',
      icon: Flame
    },
    {
      step: '3',
      title: 'Threshold Reached',
      description: 'When burn target is hit, trading unlocks automatically. LP is created and locked forever.',
      icon: Lock
    },
    {
      step: '4',
      title: 'Trade & Vest',
      description: 'Free market begins. Dev allocation vests linearly. No rug possible. Community wins.',
      icon: TrendingUp
    }
  ];

  return (
    <div className="min-h-screen bg-black text-gray-100 font-['Outfit'] overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Bebas+Neue&display=swap');
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes flicker {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        
        @keyframes ember-rise {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          100% { transform: translateY(-200px) scale(0); opacity: 0; }
        }
        
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(255, 94, 0, 0.4), 0 0 60px rgba(255, 94, 0, 0.1); }
          50% { box-shadow: 0 0 40px rgba(255, 94, 0, 0.6), 0 0 80px rgba(255, 94, 0, 0.2); }
        }
        
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes slide-up {
          from { transform: translateY(40px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes scale-in {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        
        .float {
          animation: float 6s ease-in-out infinite;
        }
        
        .flicker {
          animation: flicker 3s ease-in-out infinite;
        }
        
        .ember-particle {
          animation: ember-rise 8s ease-out infinite;
        }
        
        .glow-pulse {
          animation: glow-pulse 3s ease-in-out infinite;
        }
        
        .gradient-animate {
          background-size: 200% 200%;
          animation: gradient-x 5s ease infinite;
        }
        
        .slide-up {
          animation: slide-up 0.8s ease-out forwards;
        }
        
        .scale-in {
          animation: scale-in 0.6s ease-out forwards;
        }
        
        .text-gradient {
          background: linear-gradient(135deg, #ff5e00 0%, #ff0000 50%, #ff5e00 100%);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradient-x 3s ease infinite;
        }
        
        .bg-mesh {
          background-image: 
            radial-gradient(at 20% 30%, rgba(255, 94, 0, 0.15) 0px, transparent 50%),
            radial-gradient(at 80% 70%, rgba(255, 0, 0, 0.1) 0px, transparent 50%),
            radial-gradient(at 50% 50%, rgba(139, 69, 19, 0.05) 0px, transparent 50%);
        }
        
        .grid-pattern {
          background-image: 
            linear-gradient(rgba(255, 94, 0, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 94, 0, 0.03) 1px, transparent 1px);
          background-size: 50px 50px;
        }
      `}</style>

      {/* Background Effects */}
      <div className="fixed inset-0 bg-mesh pointer-events-none" />
      <div className="fixed inset-0 grid-pattern opacity-30 pointer-events-none" />
      
      {/* Ember Particles */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="ember-particle fixed w-1.5 h-1.5 bg-orange-500 rounded-full pointer-events-none blur-sm"
          style={{
            left: `${Math.random() * 100}%`,
            bottom: '-10px',
            animationDelay: `${Math.random() * 8}s`,
            opacity: 0.5
          }}
        />
      ))}

      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/90 backdrop-blur-xl border-b border-orange-900/30' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="relative">
                <Flame className="w-8 h-8 sm:w-10 sm:h-10 text-orange-500 flicker" />
                <div className="absolute inset-0 blur-2xl bg-orange-500/40 flicker" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-['Bebas_Neue'] tracking-wider text-gradient">
                  PYREPAD
                </h1>
                <p className="text-[8px] sm:text-[10px] text-gray-500 -mt-1 uppercase tracking-widest">Burn to Launch</p>
              </div>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              <a href="#features" className="text-sm font-medium text-gray-400 hover:text-orange-500 transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-sm font-medium text-gray-400 hover:text-orange-500 transition-colors">
                How It Works
              </a>
              <a href="#docs" className="text-sm font-medium text-gray-400 hover:text-orange-500 transition-colors">
                Docs
              </a>
              <button className="px-6 py-2.5 bg-gradient-to-r from-orange-600 to-red-600 rounded-lg font-semibold text-sm hover:from-orange-500 hover:to-red-500 transition-all glow-pulse" onClick={() => navigate('/dashboard')}>
                LAUNCH APP
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-10 h-10 bg-zinc-800 hover:bg-zinc-700 rounded-lg flex items-center justify-center transition-all"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-orange-900/30 py-4">
              <nav className="flex flex-col gap-4 px-4">
                <a 
                  href="#features" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-medium text-gray-400 hover:text-orange-500 transition-colors py-2"
                >
                  Features
                </a>
                <a 
                  href="#how-it-works" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-medium text-gray-400 hover:text-orange-500 transition-colors py-2"
                >
                  How It Works
                </a>
                <a 
                  href="#docs" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-medium text-gray-400 hover:text-orange-500 transition-colors py-2"
                >
                  Docs
                </a>
                <button className="w-full px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 rounded-lg font-semibold text-sm hover:from-orange-500 hover:to-red-500 transition-all">
                  LAUNCH APP
                </button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 pt-24 sm:pt-20">
        <div className="max-w-6xl mx-auto text-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-orange-600/10 border border-orange-600/30 rounded-full mb-6 sm:mb-8 scale-in text-xs sm:text-sm">
            <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500" />
            <span className="font-semibold text-orange-500">Powered by Monad • 10,000 TPS</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black mb-4 sm:mb-6 slide-up leading-tight px-4">
            <span className="text-gradient">BURN</span>
            <br />
            <span className="text-white">TO LAUNCH</span>
          </h1>

          <p className="text-base sm:text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-8 sm:mb-12 slide-up px-4" style={{ animationDelay: '0.1s' }}>
            The first deflationary launchpad on Monad. No presale, no insider advantage. 
            <span className="text-orange-500 font-semibold"> Community burns to unlock trading.</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-16 slide-up px-4" style={{ animationDelay: '0.2s' }}>
            <button className="group w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-orange-600 to-red-600 rounded-xl font-bold text-base sm:text-lg hover:from-orange-500 hover:to-red-500 transition-all glow-pulse flex items-center justify-center gap-3" onClick={() => navigate('/dashboard')}>
              START BURNING
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-zinc-900 border-2 border-zinc-800 hover:border-orange-600/50 rounded-xl font-bold text-base sm:text-lg transition-all flex items-center justify-center gap-3">
              <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
              READ DOCS
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 max-w-4xl mx-auto slide-up px-4" style={{ animationDelay: '0.3s' }}>
            {stats.map((stat, i) => (
              <div key={i} className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:border-orange-600/50 transition-all">
                <div className="text-2xl sm:text-3xl font-bold text-orange-500 mb-1 sm:mb-2">{stat.value}</div>
                <div className="text-xs sm:text-sm text-gray-500 uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating 3D Fire Icon - Hide on mobile/tablet */}
        <div className="absolute right-20 top-1/3 hidden 2xl:block">
          <div className="relative float">
            <Flame className="w-64 h-64 text-orange-500/20" strokeWidth={0.5} />
            <div className="absolute inset-0 blur-3xl bg-orange-500/20" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 sm:mb-6 px-4">
              <span className="text-gradient">WHY PYREPAD?</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto px-4">
              Fair launch mechanics meet anti-rug technology on the fastest EVM chain
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            {features.map((feature, i) => (
              <div
                key={i}
                className="group bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 hover:border-orange-600/50 transition-all cursor-pointer"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-${feature.color}-600/20 to-${feature.color}-600/5 border border-${feature.color}-600/30 flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`w-6 h-6 sm:w-8 sm:h-8 text-${feature.color}-500`} />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">{feature.title}</h3>
                <p className="text-sm sm:text-base text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-zinc-950/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 sm:mb-6 px-4">
              <span className="text-gradient">HOW IT WORKS</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto px-4">
              Four simple steps to launch your token the fair way
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {howItWorks.map((item, i) => (
              <div key={i} className="relative">
                {/* Connector Line - Hidden on mobile, show from lg */}
                {i < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-orange-600 to-transparent -z-10" />
                )}
                
                <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-xl sm:rounded-2xl p-6 sm:p-8 hover:border-orange-600/50 transition-all h-full">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-orange-600 to-red-600 flex items-center justify-center font-black text-xl sm:text-2xl mb-4 sm:mb-6 glow-pulse">
                    {item.step}
                  </div>
                  <item.icon className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500 mb-3 sm:mb-4" />
                  <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border-2 border-orange-600/50 rounded-2xl sm:rounded-3xl p-8 sm:p-12 relative overflow-hidden">
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-600/5 to-red-600/5 pointer-events-none" />
            
            <div className="relative z-10">
              <Flame className="w-16 h-16 sm:w-20 sm:h-20 text-orange-500 mx-auto mb-4 sm:mb-6 flicker" />
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 sm:mb-6 px-4">
                READY TO <span className="text-gradient">IGNITE?</span>
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
                Join the revolution. Launch your token with complete transparency and anti-rug protection.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4">
                <button className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-orange-600 to-red-600 rounded-xl font-bold text-base sm:text-lg hover:from-orange-500 hover:to-red-500 transition-all glow-pulse" onClick={() => navigate('/create')}>
                  LAUNCH YOUR TOKEN
                </button>
                <button className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-zinc-800 hover:bg-zinc-700 rounded-xl font-bold text-base sm:text-lg transition-all" onClick={() => navigate('/dashboard')}>
                  EXPLORE LAUNCHES
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-zinc-800 bg-black py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-8 sm:mb-12">
            {/* Logo & Description */}
            <div className="sm:col-span-2">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <Flame className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500" />
                <span className="text-xl sm:text-2xl font-['Bebas_Neue'] tracking-wider text-gradient">PYREPAD</span>
              </div>
              <p className="text-gray-500 text-xs sm:text-sm max-w-md">
                The first burn-to-launch protocol on Monad. Fair launches with complete anti-rug protection.
              </p>
              <div className="flex gap-3 sm:gap-4 mt-4 sm:mt-6">
                <a href="#" className="w-9 h-9 sm:w-10 sm:h-10 bg-zinc-900 hover:bg-orange-600 rounded-lg flex items-center justify-center transition-all">
                  <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
                <a href="#" className="w-9 h-9 sm:w-10 sm:h-10 bg-zinc-900 hover:bg-orange-600 rounded-lg flex items-center justify-center transition-all">
                  <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
                <a href="#" className="w-9 h-9 sm:w-10 sm:h-10 bg-zinc-900 hover:bg-orange-600 rounded-lg flex items-center justify-center transition-all">
                  <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">PRODUCT</h4>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-500">
                <li><a href="#" className="hover:text-orange-500 transition-colors">Launches</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Create</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Leaderboard</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Stats</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">RESOURCES</h4>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-500">
                <li><a href="#" className="hover:text-orange-500 transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Smart Contracts</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Brand Kit</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-zinc-800 pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-gray-500">
            <p className="text-center sm:text-left">© 2024 PyrePad. All rights reserved.</p>
            <div className="flex gap-4 sm:gap-6">
              <a href="#" className="hover:text-orange-500 transition-colors">Terms</a>
              <a href="#" className="hover:text-orange-500 transition-colors">Privacy</a>
              <a href="#" className="hover:text-orange-500 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
