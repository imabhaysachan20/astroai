import React, { useState } from 'react';
import AstroChat from './AstroChat';

interface Message {
  sender: 'user' | 'bot';
  content: string;
}

const ChatDemo: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'bot',
      content: "🌟 Namaste! I've analyzed your birth chart and I'm ready to reveal the cosmic insights about your future. Your Jupiter is beautifully positioned, indicating great potential ahead!"
    }
  ]);

  const [isPremium, setIsPremium] = useState(false);

  const suggestions = [
    "When will I find true love?",
    "What does my career future look like?",
    "Will I become wealthy in this lifetime?",
    "What are my lucky numbers and colors?",
    "When is the best time for marriage?",
    "What challenges should I prepare for?"
  ];

  const handleSendMessage = (message: string) => {
    // Add user message
    setMessages(prev => [...prev, { sender: 'user', content: message }]);

    // Simulate bot response after delay
    setTimeout(() => {
      const botResponses = [
        "🔮 Based on your planetary positions, I see interesting developments in your love life during the next Venus transit. Your 7th house shows strong romantic potential between March and June.",
        "💰 Your wealth indicators are quite promising! Jupiter's influence on your 2nd house suggests financial growth through partnerships or investments. The period around your next birthday looks particularly auspicious.",
        "🌙 Your Moon sign reveals deep emotional intelligence. This is both your strength and your challenge - learning to trust your intuition while staying grounded in practical decisions.",
        "⭐ The stars indicate a period of transformation ahead. Your Saturn return is approaching, which typically brings important life lessons and lasting positive changes.",
        "🎯 Your career path shows multiple opportunities. Mars in your 10th house suggests leadership roles suit you well. Consider positions where you can guide and inspire others."
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      setMessages(prev => [...prev, { sender: 'bot', content: randomResponse }]);
    }, 2000);
  };

  const handleUpgrade = () => {
    setIsPremium(true);
    setMessages(prev => [...prev, {
      sender: 'bot',
      content: "🎉 Welcome to Premium! You now have access to unlimited custom questions and deeper cosmic insights. What would you like to explore first?"
    }]);
  };

  return (
    <div className="h-[100dvh]">
      <AstroChat
        messages={messages}
        suggestions={suggestions}
        isPremium={isPremium}
        onSendMessage={handleSendMessage}
        onUpgrade={handleUpgrade}
      />
      
      {/* Demo Controls */}
      {/* <div className="fixed top-4 right-4 z-50 bg-white rounded-lg shadow-lg p-3 border border-gray-200">
        <div className="text-xs text-gray-600 mb-2">Demo Controls:</div>
        <button
          onClick={() => setIsPremium(!isPremium)}
          className={`text-xs px-3 py-1 rounded-full font-medium transition-all ${
            isPremium 
              ? 'bg-gold-100 text-gold-700 border border-gold-200'
              : 'bg-gray-100 text-gray-600 border border-gray-200'
          }`}
        >
          {isPremium ? 'Switch to Free' : 'Switch to Premium'}
        </button>
      </div> */}
    </div>
  );
};

export default ChatDemo;