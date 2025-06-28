import React from 'react';
import { Shield, Lock, FileText, Award } from 'lucide-react';

const trustItems = [
  {
    icon: Award,
    title: 'Built with OpenAI & Real Astrology',
    description: 'Combining GPT-4o with authentic Vedic calculations'
  },
  {
    icon: Lock,
    title: 'Your Data is Safe & Encrypted',
    description: 'Bank-level security, no data sharing with third parties'
  },
  {
    icon: Shield,
    title: 'Trusted by 30,000+ Users',
    description: '4.8/5 rating across all platforms'
  },
  {
    icon: FileText,
    title: 'Transparent & Ethical',
    description: 'Clear pricing, no hidden fees, honest predictions'
  }
];

const Trust = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Why Trust Our Platform?
            </h2>
            <p className="text-xl text-gray-600">
              Built with integrity, powered by technology, guided by ancient wisdom
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {trustItems.map((item, index) => (
              <div 
                key={index}
                className="flex items-start gap-4 bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-mystical-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-gradient-to-r from-primary-50 to-mystical-50 rounded-2xl p-8 border border-primary-100">
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Important Disclaimer</h3>
              <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto">
                <strong>For informational purposes only.</strong> Our AI-powered astrology readings are designed to provide insights and guidance based on Vedic astrology principles. 
                This service is not a substitute for professional advice regarding medical, legal, financial, or relationship matters. 
                Please consult qualified professionals for specific concerns. Use our predictions as guidance, not absolute truth.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Trust;