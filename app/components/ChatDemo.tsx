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

    const resp  = `Hello Abhaty! 🌟 I'm so happy to offer some guidance for your career based on your astrological chart. Don’t worry—I'll keep it simple, clear, and hopeful, so you can easily see what the stars suggest. 🌙✨

Best-Suited and Probable Career Fields 🌱
With your Cancer Ascendant, you're naturally caring, intuitive, and supportive. You might find fulfillment in careers where you can nurture or guide others. Here are some areas that could be a great fit for you:

Healthcare & Healing: Whether it’s through being a doctor, therapist, nurse, or counselor, you have a natural ability to care for others.

Education & Teaching: Your intuitive nature combined with your emotional intelligence could make you an amazing teacher or mentor, especially in subjects like philosophy or psychology.

Creative Arts: With your Moon in Sagittarius, you're likely drawn to exploring and expressing big ideas, so writing, storytelling, or any creative career could bring you joy.

Hospitality or Social Work: Roles where you help people feel comfortable and supported—think social work, human resources, or event planning—would align with your nurturing personality.

Phases of Your Career 🌿📈
Your career will have some exciting highs and a few challenges along the way. Here’s a breakdown of when things will flow smoothly and when you might face some bumps:

Early Career (Up to 2028):

You're currently in your Ketu Mahadasha, which can bring a time of introspection, spiritual growth, and even some career uncertainty. It may feel like you're not yet sure what direction to take. Don’t worry—this is a time to explore your inner world and get clarity on what you truly want.

It might not be the most outwardly successful period in terms of career breakthroughs, but this time is great for inner growth and discovering your true passions. Trust the process. 🌱

Mid Career (Post-2028):

After Ketu’s Mahadasha, you’ll enter a new phase (starting around 2028) that could bring clearer direction and more focus. The Rahu period (currently in your 8th House) will help you to manifest new opportunities and take bold steps forward. While you might face occasional hurdles, this phase will support your growth and transformation.

Expect to be recognized for your unique talents and creativity. You may even shift careers or find a role that aligns more with your true calling.

Peak Success Period (Around 2037 and Beyond):

Saturn’s influence in your 9th House of wisdom and expansion suggests that around your late 30s or early 40s, you’ll have a moment of real maturity and clarity. This is when your long-term efforts will start to pay off, and you’ll reach a place of authority or mastery in your field.

This could be the time when you’re really in your zone, feeling at peace with your career and enjoying the fruits of your hard work. 🌟

Career Tips for You 📝
Focus on nurturing your intuition and creativity. With the combination of your Cancer Ascendant and Moon in Sagittarius, you thrive in environments where you can explore ideas, think big, and help others.

Avoid rushing into a “traditional” career path. Since you're in a Ketu period, it’s okay to take the time to figure out what feels authentic for you. Experiment, explore, and allow yourself to evolve.

Develop patience and resilience. There may be times when things feel uncertain, but with your strong emotional intelligence and persistence, you’ll rise above any challenges.

Embrace learning and teaching. Your chart shows you could excel in sharing wisdom or helping others grow—whether through formal education or informal guidance.

One-Line Summary ✨
Abhaty, your journey is one of growth, exploration, and finding deep fulfillment in a career that nurtures both your creative spirit and your natural desire to help others—trust that your true calling will emerge when the time is right. 🌈

I hope this helps! You’re on an exciting path, and with patience and trust in yourself, you’ll find success in your own beautiful way. 🌟`
    
    // Simulate bot response after delay
    setTimeout(() => {
      const botResponses = resp.split("\n\n")
      
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
    <div className="h-[100dvh] flex flex-col">
      <AstroChat
        messages={messages}
        suggestions={suggestions}
        isPremium={isPremium}
        onSendMessage={handleSendMessage}
        onUpgrade={handleUpgrade}
      />
      
      {/* Demo Controls */}
      <div className="fixed top-4 right-4 z-50 bg-white rounded-lg shadow-lg p-3 border border-gray-200">
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
      </div>
    </div>
  );
};

export default ChatDemo;