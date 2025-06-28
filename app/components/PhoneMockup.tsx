import React from 'react';
import { Star, TrendingUp, Heart } from 'lucide-react';

const PhoneMockup = () => {
  return (
    <div className="relative">
      {/* Phone frame */}
      <div className="w-80 h-[600px] bg-gray-900 rounded-[3rem] p-2 shadow-2xl">
        <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
          {/* Status bar */}
          <div className="bg-gray-50 h-8 flex items-center justify-between px-6 text-xs text-gray-600">
            <span>9:41</span>
            <div className="flex items-center gap-1">
              <div className="w-4 h-2 bg-green-500 rounded-sm"></div>
            </div>
          </div>
          
          {/* App content */}
          <div className="p-6 bg-gradient-to-br from-primary-50 to-mystical-50 h-full">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-mystical-500 to-primary-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Your Reading</h3>
              <p className="text-sm text-gray-600">Based on your birth chart</p>
            </div>
            
            {/* Sample reading content with blur effect */}
            <div className="space-y-4 relative">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-mystical-100">
                <div className="flex items-center gap-3 mb-3">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  <span className="font-semibold text-gray-800">Wealth Prediction</span>
                </div>
                <div className="relative">
                  <p className="text-sm text-gray-700 leading-relaxed blur-sm">
                    Your billionaire window opens in 2027 during your Venus Mahadasha. 
                    Jupiter's transit through your 11th house indicates...
                  </p>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent flex items-center justify-center">
                    <div className="bg-gold-500 text-white px-4 py-2 rounded-full text-xs font-medium">
                      Unlock Full Reading
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-4 shadow-sm border border-mystical-100">
                <div className="flex items-center gap-3 mb-3">
                  <Heart className="w-5 h-5 text-pink-500" />
                  <span className="font-semibold text-gray-800">Love Compatibility</span>
                </div>
                <div className="relative">
                  <p className="text-sm text-gray-700 leading-relaxed blur-sm">
                    Your Moon sign compatibility shows 85% match with...
                  </p>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent flex items-center justify-center">
                    <div className="bg-mystical-500 text-white px-4 py-2 rounded-full text-xs font-medium">
                      ₹49 to Unlock
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <button className="w-full bg-gradient-to-r from-gold-500 to-mystical-500 text-white py-3 rounded-xl font-semibold">
                Get Full Reading - ₹49
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating elements around phone */}
      <div className="absolute -top-4 -right-4 w-8 h-8 bg-gold-400 rounded-full animate-float opacity-60"></div>
      <div className="absolute -bottom-6 -left-6 w-6 h-6 bg-mystical-400 rounded-full animate-float opacity-40" style={{ animationDelay: '3s' }}></div>
    </div>
  );
};

export default PhoneMockup;