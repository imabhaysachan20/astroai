import React from 'react';
import { Brain, Zap, Shield, IndianRupee } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'Real Vedic Logic',
    description: 'Based on birth chart, Mahadasha, Navamsa calculations',
    color: 'from-mystical-500 to-mystical-600'
  },
  {
    icon: Zap,
    title: 'Powered by GPT-4o',
    description: 'Human-like interpretation, no generic fluff',
    color: 'from-primary-500 to-primary-600'
  },
  {
    icon: Shield,
    title: 'Fast & Private',
    description: 'Instant results, no login needed',
    color: 'from-green-500 to-green-600'
  },
  {
    icon: IndianRupee,
    title: 'Affordable',
    description: 'Full reading just ₹49, no scams',
    color: 'from-gold-500 to-gold-600'
  }
];

const Features = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Why Choose Our AI Astrology?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Combining ancient Vedic wisdom with modern AI technology for accurate, personalized insights
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 mx-auto`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-center leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;