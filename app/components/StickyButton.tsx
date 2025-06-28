"use client"
import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

const StickyButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 animate-slide-up">
      <button className="bg-gradient-to-r from-gold-500 to-mystical-500 hover:from-gold-600 hover:to-mystical-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center gap-3">
        <Sparkles className="w-5 h-5" />
        Get Free Reading
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-bold">!</span>
        </div>
      </button>
    </div>
  );
};

export default StickyButton;