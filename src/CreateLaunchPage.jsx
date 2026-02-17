import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flame, ArrowLeft, Info, Lock, Zap, CheckCircle, Upload, X } from 'lucide-react';

export default function CreateLaunchPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    symbol: '',
    description: '',
    totalSupply: '1000000000',
    threshold: 60,
    vestingDuration: 90,
    twitter: '',
    telegram: '',
    website: '',
    imageUrl: null
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData({ ...formData, imageUrl: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const validateStep = (currentStep) => {
    const newErrors = {};
    
    if (currentStep === 1) {
      if (!formData.name) newErrors.name = 'Token name required';
      if (!formData.symbol) newErrors.symbol = 'Symbol required';
      if (formData.symbol.length > 8) newErrors.symbol = 'Max 8 characters';
      if (!formData.description) newErrors.description = 'Description required';
    }
    
    if (currentStep === 2) {
      if (formData.threshold < 30 || formData.threshold > 90) {
        newErrors.threshold = 'Threshold must be 30-90%';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const prevStep = () => setStep(step - 1);

  // Hesaplanan değerler
  const devAllocation = (parseInt(formData.totalSupply) * 0.03).toLocaleString();
  const burnableSupply = (parseInt(formData.totalSupply) * 0.97).toLocaleString();
  const thresholdAmount = (parseInt(formData.totalSupply) * formData.threshold / 100).toLocaleString();

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
        
        @keyframes slide-in {
          from { transform: translateX(-20px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        .flicker {
          animation: flicker 3s ease-in-out infinite;
        }
        
        .glow-border {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        
        .slide-in {
          animation: slide-in 0.5s ease-out forwards;
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

        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          background: linear-gradient(135deg, #ff5e00, #ff0000);
          cursor: pointer;
          border-radius: 50%;
          border: 2px solid #000;
        }

        input[type="range"]::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: linear-gradient(135deg, #ff5e00, #ff0000);
          cursor: pointer;
          border-radius: 50%;
          border: 2px solid #000;
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
                  <Flame className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500 flicker" />
                  <div className="absolute inset-0 blur-xl bg-orange-500/30 flicker" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-['Bebas_Neue'] tracking-wider gradient-text">
                    CREATE LAUNCH
                  </h1>
                  <p className="text-[8px] sm:text-xs text-gray-500 -mt-1">BURN-TO-LAUNCH PROTOCOL</p>
                </div>
              </div>
            </div>
            
            <button className="px-4 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-orange-600 to-red-600 rounded-lg font-semibold text-xs sm:text-sm hover:from-orange-500 hover:to-red-500 transition-all shadow-lg shadow-orange-900/50">
              CONNECT
            </button>
          </div>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
        <div className="flex items-center justify-between mb-8 sm:mb-12">
          {[
            { num: 1, label: 'Token Info', icon: Zap },
            { num: 2, label: 'Launch Config', icon: Flame },
            { num: 3, label: 'Social Links', icon: Info },
            { num: 4, label: 'Review', icon: CheckCircle }
          ].map((item, i) => (
            <React.Fragment key={item.num}>
              <div className="flex flex-col items-center">
                <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center font-bold text-base sm:text-lg transition-all ${
                  step >= item.num 
                    ? 'bg-gradient-to-br from-orange-600 to-red-600 text-white glow-border' 
                    : 'bg-zinc-800 text-gray-500'
                }`}>
                  {step > item.num ? (
                    <CheckCircle className="w-5 h-5 sm:w-8 sm:h-8" />
                  ) : (
                    <item.icon className="w-5 h-5 sm:w-8 sm:h-8" />
                  )}
                </div>
                <div className={`mt-2 text-[10px] sm:text-sm font-medium text-center ${
                  step >= item.num ? 'text-orange-500' : 'text-gray-500'
                }`}>
                  <span className="hidden sm:inline">{item.label}</span>
                  <span className="sm:hidden">{item.num}</span>
                </div>
              </div>
              {i < 3 && (
                <div className={`flex-1 h-1 mx-2 sm:mx-4 rounded-full transition-all ${
                  step > item.num ? 'bg-gradient-to-r from-orange-600 to-red-600' : 'bg-zinc-800'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 pb-12">
        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-xl sm:rounded-2xl p-6 sm:p-8">
          
          {/* Step 1: Token Info */}
          {step === 1 && (
            <div className="space-y-6 slide-in">
              <div>
                <h2 className="text-2xl font-bold mb-2">Token Information</h2>
                <p className="text-gray-400 text-sm">Basic details about your token</p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {/* Token Image */}
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-2">Token Image</label>
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      {imagePreview ? (
                        <div className="relative w-32 h-32 rounded-xl overflow-hidden border-2 border-orange-600/50">
                          <img src={imagePreview} alt="Token" className="w-full h-full object-cover" />
                          <button
                            onClick={() => {
                              setImagePreview(null);
                              setFormData({ ...formData, imageUrl: null });
                            }}
                            className="absolute top-2 right-2 w-6 h-6 bg-black/80 rounded-full flex items-center justify-center hover:bg-red-600 transition-all"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <label className="w-32 h-32 border-2 border-dashed border-zinc-700 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-orange-600/50 transition-all">
                          <Upload className="w-8 h-8 text-gray-500 mb-2" />
                          <span className="text-xs text-gray-500">Upload</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>
                    <div className="text-sm text-gray-400">
                      <p>• Recommended: 512x512px</p>
                      <p>• Max size: 2MB</p>
                      <p>• Format: PNG, JPG, GIF</p>
                    </div>
                  </div>
                </div>

                {/* Token Name */}
                <div>
                  <label className="block text-sm font-medium mb-2">Token Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., PyrePad Token"
                    className={`w-full px-4 py-3 bg-zinc-800 border ${
                      errors.name ? 'border-red-500' : 'border-zinc-700'
                    } rounded-lg focus:outline-none focus:border-orange-600 transition-all`}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                {/* Token Symbol */}
                <div>
                  <label className="block text-sm font-medium mb-2">Token Symbol *</label>
                  <input
                    type="text"
                    value={formData.symbol}
                    onChange={(e) => setFormData({ ...formData, symbol: e.target.value.toUpperCase() })}
                    placeholder="e.g., PYRE"
                    maxLength={8}
                    className={`w-full px-4 py-3 bg-zinc-800 border ${
                      errors.symbol ? 'border-red-500' : 'border-zinc-700'
                    } rounded-lg focus:outline-none focus:border-orange-600 transition-all uppercase`}
                  />
                  {errors.symbol && <p className="text-red-500 text-xs mt-1">{errors.symbol}</p>}
                </div>

                {/* Description */}
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-2">Description *</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe your project, vision, and what makes it unique..."
                    rows={4}
                    className={`w-full px-4 py-3 bg-zinc-800 border ${
                      errors.description ? 'border-red-500' : 'border-zinc-700'
                    } rounded-lg focus:outline-none focus:border-orange-600 transition-all resize-none`}
                  />
                  {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                  <p className="text-xs text-gray-500 mt-1">{formData.description.length}/500</p>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Launch Config */}
          {step === 2 && (
            <div className="space-y-6 slide-in">
              <div>
                <h2 className="text-2xl font-bold mb-2">Launch Configuration</h2>
                <p className="text-gray-400 text-sm">Set your burn mechanics and tokenomics</p>
              </div>

              {/* Total Supply */}
              <div>
                <label className="block text-sm font-medium mb-2">Total Supply</label>
                <input
                  type="text"
                  value={formData.totalSupply}
                  onChange={(e) => setFormData({ ...formData, totalSupply: e.target.value.replace(/\D/g, '') })}
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:border-orange-600 transition-all"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {parseInt(formData.totalSupply).toLocaleString()} tokens
                </p>
              </div>

              {/* Burn Threshold Slider */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium">Burn Threshold</label>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-orange-500">{formData.threshold}%</span>
                    <Info className="w-4 h-4 text-gray-500" />
                  </div>
                </div>
                <input
                  type="range"
                  min="30"
                  max="90"
                  value={formData.threshold}
                  onChange={(e) => setFormData({ ...formData, threshold: parseInt(e.target.value) })}
                  className="w-full h-2 bg-zinc-800 rounded-full appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>30% (Easy)</span>
                  <span>60% (Balanced)</span>
                  <span>90% (Hard)</span>
                </div>
                {errors.threshold && <p className="text-red-500 text-xs mt-1">{errors.threshold}</p>}
              </div>

              {/* Info Box */}
              <div className="bg-orange-600/10 border border-orange-600/30 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-orange-500 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-semibold text-orange-500 mb-1">How Burn Threshold Works</p>
                    <p className="text-gray-300">
                      Users must burn {formData.threshold}% of total supply ({thresholdAmount} tokens) 
                      before trading is enabled. Higher threshold = more deflationary + longer burn phase.
                    </p>
                  </div>
                </div>
              </div>

              {/* Vesting Duration Slider */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium">Dev Vesting Duration</label>
                  <span className="text-2xl font-bold text-orange-500">{formData.vestingDuration} days</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="180"
                  step="30"
                  value={formData.vestingDuration}
                  onChange={(e) => setFormData({ ...formData, vestingDuration: parseInt(e.target.value) })}
                  className="w-full h-2 bg-zinc-800 rounded-full appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>30 days</span>
                  <span>90 days</span>
                  <span>180 days</span>
                </div>
              </div>

              {/* Tokenomics Summary */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-4">
                  <div className="text-xs text-gray-500 mb-1">BURNABLE SUPPLY</div>
                  <div className="text-xl font-bold">{burnableSupply}</div>
                  <div className="text-xs text-orange-500 mt-1">97% of total</div>
                </div>
                <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-4">
                  <div className="text-xs text-gray-500 mb-1">DEV ALLOCATION</div>
                  <div className="text-xl font-bold">{devAllocation}</div>
                  <div className="text-xs text-orange-500 mt-1">3% vested</div>
                </div>
                <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-4">
                  <div className="text-xs text-gray-500 mb-1">THRESHOLD</div>
                  <div className="text-xl font-bold">{thresholdAmount}</div>
                  <div className="text-xs text-orange-500 mt-1">{formData.threshold}% must burn</div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Social Links */}
          {step === 3 && (
            <div className="space-y-6 slide-in">
              <div>
                <h2 className="text-2xl font-bold mb-2">Social Links</h2>
                <p className="text-gray-400 text-sm">Help your community find you (optional)</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">🐦 Twitter / X</label>
                  <input
                    type="text"
                    value={formData.twitter}
                    onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                    placeholder="https://twitter.com/yourproject"
                    className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:border-orange-600 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">✈️ Telegram</label>
                  <input
                    type="text"
                    value={formData.telegram}
                    onChange={(e) => setFormData({ ...formData, telegram: e.target.value })}
                    placeholder="https://t.me/yourproject"
                    className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:border-orange-600 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">🌐 Website</label>
                  <input
                    type="text"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    placeholder="https://yourproject.com"
                    className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:border-orange-600 transition-all"
                  />
                </div>
              </div>

              {/* Info */}
              <div className="bg-blue-600/10 border border-blue-600/30 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-500 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-semibold text-blue-500 mb-1">Social links are optional but recommended</p>
                    <p className="text-gray-300">
                      Projects with active socials tend to perform better. Make sure to engage with your community!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Review */}
          {step === 4 && (
            <div className="space-y-6 slide-in">
              <div>
                <h2 className="text-2xl font-bold mb-2">Review & Launch</h2>
                <p className="text-gray-400 text-sm">Double check everything before deploying</p>
              </div>

              {/* Preview Card */}
              <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 border border-orange-600/30 rounded-xl p-6">
                <div className="flex items-start gap-4 mb-6">
                  {imagePreview ? (
                    <img src={imagePreview} alt={formData.name} className="w-20 h-20 rounded-xl" />
                  ) : (
                    <div className="w-20 h-20 bg-gradient-to-br from-orange-600 to-red-600 rounded-xl flex items-center justify-center text-2xl font-bold">
                      {formData.symbol.slice(0, 2)}
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-1">{formData.name}</h3>
                    <p className="text-gray-400">${formData.symbol}</p>
                    <p className="text-sm text-gray-500 mt-2">{formData.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-zinc-800/50 rounded-lg">
                    <div className="text-xs text-gray-500 mb-1">Total Supply</div>
                    <div className="font-bold">{parseInt(formData.totalSupply).toLocaleString()}</div>
                  </div>
                  <div className="p-3 bg-zinc-800/50 rounded-lg">
                    <div className="text-xs text-gray-500 mb-1">Burn Threshold</div>
                    <div className="font-bold text-orange-500">{formData.threshold}%</div>
                  </div>
                  <div className="p-3 bg-zinc-800/50 rounded-lg">
                    <div className="text-xs text-gray-500 mb-1">Dev Vesting</div>
                    <div className="font-bold">{formData.vestingDuration} days</div>
                  </div>
                  <div className="p-3 bg-zinc-800/50 rounded-lg">
                    <div className="text-xs text-gray-500 mb-1">Dev Allocation</div>
                    <div className="font-bold">3%</div>
                  </div>
                </div>
              </div>

              {/* Costs */}
              <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-6">
                <h3 className="font-bold mb-4">Launch Costs</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Token Contract Deployment</span>
                    <span className="font-mono">~0.001 ETH</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Launch Pool Initialization</span>
                    <span className="font-mono">~0.002 ETH</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Metadata Upload (IPFS)</span>
                    <span className="font-mono">~0.0005 ETH</span>
                  </div>
                  <div className="border-t border-zinc-700 pt-3 flex justify-between text-lg font-bold">
                    <span>Total Estimated Cost</span>
                    <span className="text-orange-500">~0.0035 ETH</span>
                  </div>
                  <p className="text-xs text-gray-500 pt-2">
                    * Gas fees on Monad are significantly lower than Ethereum mainnet
                  </p>
                </div>
              </div>

              {/* Warning */}
              <div className="bg-red-600/10 border border-red-600/30 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-red-500 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-semibold text-red-500 mb-1">⚠️ Important Reminders</p>
                    <ul className="text-gray-300 space-y-1 list-disc list-inside">
                      <li>Launch parameters are PERMANENT and cannot be changed</li>
                      <li>Dev allocation will vest linearly over {formData.vestingDuration} days</li>
                      <li>Trading will be locked until {formData.threshold}% is burned</li>
                      <li>LP will be permanently locked (anti-rug protection)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-zinc-800">
            {step > 1 && (
              <button
                onClick={prevStep}
                className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-lg font-semibold transition-all"
              >
                ← Back
              </button>
            )}
            
            {step < 4 ? (
              <button
                onClick={nextStep}
                className="ml-auto px-8 py-3 bg-gradient-to-r from-orange-600 to-red-600 rounded-lg font-semibold hover:from-orange-500 hover:to-red-500 transition-all shadow-lg shadow-orange-900/50"
              >
                Continue →
              </button>
            ) : (
              <button
                className="ml-auto px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg font-semibold hover:from-green-500 hover:to-emerald-500 transition-all shadow-lg shadow-green-900/50 glow-border"
              >
                🚀 DEPLOY LAUNCH
              </button>
            )}
          </div>
        </div>

        {/* Live Preview Sidebar - Hidden on mobile/tablet */}
        {step < 4 && (
          <div className="hidden xl:block fixed right-8 top-32 w-80 bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-xl p-6 slide-in">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-orange-500" />
              <h3 className="font-bold">Live Preview</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="w-16 h-16 rounded-lg" />
                ) : (
                  <div className="w-16 h-16 bg-zinc-800 rounded-lg flex items-center justify-center text-gray-500">
                    ?
                  </div>
                )}
                <div>
                  <div className="font-bold">{formData.name || 'Token Name'}</div>
                  <div className="text-sm text-gray-500">${formData.symbol || 'SYMBOL'}</div>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Supply:</span>
                  <span>{parseInt(formData.totalSupply || 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Threshold:</span>
                  <span className="text-orange-500">{formData.threshold}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Vesting:</span>
                  <span>{formData.vestingDuration} days</span>
                </div>
              </div>

              {formData.description && (
                <p className="text-xs text-gray-400 pt-3 border-t border-zinc-800">
                  {formData.description.slice(0, 100)}
                  {formData.description.length > 100 && '...'}
                </p>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
