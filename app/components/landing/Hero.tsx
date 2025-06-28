import React from 'react';
import { Sparkles, Star, Moon } from 'lucide-react';
import PhoneMockup from './PhoneMockup';

const Hero = ({setShowWizard}:{setShowWizard:(value: React.SetStateAction<boolean>) => void}) => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-primary-900 via-mystical-900 to-primary-800 overflow-hidden">
      
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 animate-float">
          <Star className="w-6 h-6 text-gold-400 opacity-60" />
        </div>
        <div className="absolute top-40 right-16 animate-float" style={{ animationDelay: '2s' }}>
          <Moon className="w-8 h-8 text-mystical-300 opacity-40" />
        </div>
        <div className="absolute bottom-32 left-20 animate-float" style={{ animationDelay: '4s' }}>
          <Sparkles className="w-5 h-5 text-gold-300 opacity-50" />
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 pt-20 pb-16">
        <div className="flex flex-col lg:flex-row items-center justify-between min-h-[80vh]">
          {/* Left content */}
          <div className="flex-1 text-center lg:text-left mb-12 lg:mb-0 animate-fade-in">
            <div className="flex items-center justify-center lg:justify-start mb-6">
              <div className="bg-gold-500/20 backdrop-blur-sm rounded-full px-4 py-2 border border-gold-400/30">
                <span className="text-gold-300 text-sm font-medium flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  AI-Powered Vedic Astrology
                </span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Know Your Future —{' '}
              <span className="bg-gradient-to-r from-gold-400 to-mystical-400 bg-clip-text text-transparent">
                Instantly
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-primary-200 mb-8 max-w-2xl mx-auto lg:mx-0">
              Get your birth chart decoded by AI. Career, love, wealth — all in 30 seconds.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button onClick={()=>setShowWizard(true)} className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                Start Free Reading
              </button>
              <button className="border-2 border-mystical-400 text-mystical-300 hover:bg-mystical-400 hover:text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300">
                Watch Demo
              </button>
            </div>
            
            <div className="mt-8 flex items-center justify-center lg:justify-start gap-6 text-primary-300">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm">30,000+ readings done</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex -space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-gold-400 fill-current" />
                  ))}
                </div>
                <span className="text-sm">4.8/5 rating</span>
              </div>
            </div>
          </div>
          
          {/* Right content - Phone mockup */}
          <div className="flex-1 flex justify-center lg:justify-end animate-slide-up">
            <PhoneMockup />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;