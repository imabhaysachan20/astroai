import React from 'react';
import { Calendar, Target, Sparkles, Unlock } from 'lucide-react';

const steps = [
  {
    icon: Calendar,
    title: 'Enter Birth Details',
    description: 'Date, time, and place of birth',
    color: 'from-primary-500 to-primary-600'
  },
  {
    icon: Target,
    title: 'Choose Your Focus',
    description: 'Love, Career, or Wealth predictions',
    color: 'from-mystical-500 to-mystical-600'
  },
  {
    icon: Sparkles,
    title: 'AI Analysis',
    description: 'Get instant AI-powered reading',
    color: 'from-gold-500 to-gold-600'
  },
  {
    icon: Unlock,
    title: 'Unlock Insights',
    description: 'Mahadasha, Compatibility & more',
    color: 'from-green-500 to-green-600'
  }
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get your personalized astrology reading in just 4 simple steps
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Connection lines for desktop */}
            <div className="hidden lg:block absolute top-16 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-primary-200 via-mystical-200 to-gold-200"></div>
            
            {steps.map((step, index) => (
              <div 
                key={index}
                className="text-center animate-slide-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="relative mb-6">
                  <div className={`w-20 h-20 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center mx-auto shadow-lg`}>
                    <step.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full border-4 border-gray-100 flex items-center justify-center text-sm font-bold text-gray-600">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button className="bg-gradient-to-r from-mystical-500 to-primary-600 hover:from-mystical-600 hover:to-primary-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
              Start Your Reading Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;