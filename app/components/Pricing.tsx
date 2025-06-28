import React from 'react';
import { Check, Star, Crown, Infinity } from 'lucide-react';

const plans = [
  {
    name: 'Free Preview',
    price: '₹0',
    description: 'Get a taste of your destiny',
    features: [
      'Basic Ascendant reading',
      '1 line insight',
      'Birth chart preview',
      'No registration needed'
    ],
    icon: Star,
    color: 'from-gray-500 to-gray-600',
    buttonText: 'Start Free',
    buttonStyle: 'border-2 border-gray-300 text-gray-700 hover:bg-gray-50'
  },
  {
    name: 'Full Reading',
    price: '₹49',
    description: 'Complete astrology analysis',
    features: [
      'Love compatibility score',
      'Career predictions',
      'Wealth timeline',
      'Mahadasha analysis',
      'Instant AI insights'
    ],
    icon: Crown,
    color: 'from-gold-500 to-gold-600',
    buttonText: 'Get Full Reading',
    buttonStyle: 'bg-gradient-to-r from-gold-500 to-gold-600 text-white hover:from-gold-600 hover:to-gold-700',
    popular: true
  },
  {
    name: 'Compatibility Pack',
    price: '₹99',
    description: 'Perfect for couples',
    features: [
      'Two-person reading',
      'Relationship compatibility',
      'Marriage timing',
      'Manglik analysis',
      'Joint future predictions'
    ],
    icon: Star,
    color: 'from-mystical-500 to-mystical-600',
    buttonText: 'Check Compatibility',
    buttonStyle: 'bg-gradient-to-r from-mystical-500 to-mystical-600 text-white hover:from-mystical-600 hover:to-mystical-700'
  },
  {
    name: 'All Access',
    price: '₹499',
    period: '/year',
    description: 'Everything + ongoing guidance',
    features: [
      'Unlimited readings',
      'Monthly transit alerts',
      'PDF reports',
      'Priority support',
      'Exclusive predictions'
    ],
    icon: Infinity,
    color: 'from-primary-500 to-primary-600',
    buttonText: 'Go Premium',
    buttonStyle: 'bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700'
  }
];

const Pricing = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Choose Your Reading
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transparent pricing, no hidden fees. Start free, upgrade anytime.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-slide-up ${
                plan.popular ? 'ring-2 ring-gold-400 scale-105' : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-gold-500 to-gold-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                </div>
              )}
              
              <div className="text-center mb-6">
                <div className={`w-16 h-16 bg-gradient-to-br ${plan.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <plan.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{plan.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center">
                  <span className="text-3xl font-bold text-gray-800">{plan.price}</span>
                  {plan.period && <span className="text-gray-500 ml-1">{plan.period}</span>}
                </div>
              </div>
              
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${plan.buttonStyle}`}>
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            🔒 Secure payment • 💯 Money-back guarantee • 📱 Instant access
          </p>
          <div className="flex items-center justify-center gap-8 text-sm text-gray-500">
            <span>✓ No subscription traps</span>
            <span>✓ One-time payments</span>
            <span>✓ Cancel anytime</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;