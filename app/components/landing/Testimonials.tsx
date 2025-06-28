import React from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Priya S.',
    age: 26,
    location: 'Mumbai',
    text: 'I found out my Moon Dasha was starting next month — this explained everything about my recent mood changes and career confusion.',
    rating: 5,
    focus: 'Career'
  },
  {
    name: 'Arjun K.',
    age: 29,
    location: 'Bangalore',
    text: 'The compatibility reading was so specific about our Manglik doshas, I actually teared up. Finally found someone who gets astrology right.',
    rating: 5,
    focus: 'Love'
  },
  {
    name: 'Sneha R.',
    age: 24,
    location: 'Delhi',
    text: 'Way better than ₹1000 calls I\'ve paid for before. The AI explanation was clearer than any pandit I\'ve consulted.',
    rating: 5,
    focus: 'General'
  },
  {
    name: 'Vikram M.',
    age: 31,
    location: 'Pune',
    text: 'The wealth prediction timeline matched exactly with my business plans. Jupiter transit analysis was spot on!',
    rating: 5,
    focus: 'Wealth'
  },
  {
    name: 'Ananya T.',
    age: 23,
    location: 'Chennai',
    text: 'Finally, astrology that makes sense! The Navamsa analysis helped me understand my relationship patterns.',
    rating: 5,
    focus: 'Love'
  }
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary-50 to-mystical-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            What Our Users Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Real experiences from thousands of satisfied users
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-gold-400 fill-current" />
                  ))}
                </div>
                <div className="bg-mystical-100 text-mystical-700 px-3 py-1 rounded-full text-xs font-medium">
                  {testimonial.focus}
                </div>
              </div>
              
              <div className="relative mb-4">
                <Quote className="w-6 h-6 text-mystical-300 absolute -top-2 -left-1" />
                <p className="text-gray-700 leading-relaxed pl-6">
                  {testimonial.text}
                </p>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-800">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.age}, {testimonial.location}</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-mystical-400 to-primary-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {testimonial.name.charAt(0)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;