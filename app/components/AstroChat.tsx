import React, { useState, useRef, useEffect } from 'react';
import { Send, Star, Sparkles, Crown, Lock, Zap } from 'lucide-react';

interface Message {
  sender: 'user' | 'bot';
  content: string;
}

interface AstroChatProps {
  messages: Message[];
  suggestions: string[];
  isPremium: boolean;
  onSendMessage: (message: string) => void;
  onUpgrade: () => void;
}

// Chat Bubble Component
const ChatBubble: React.FC<{ message: Message; isLatest: boolean }> = ({ message, isLatest }) => {
  const isUser = message.sender === 'user';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 animate-fade-in`}>
      <div className={`max-w-[80%] ${isUser ? 'order-2' : 'order-1'}`}>
        {/* Bot Avatar */}
        {!isUser && (
          <div className="flex items-center mb-2">
            <div className="w-8 h-8 bg-gradient-to-br from-mystical-500 to-primary-600 rounded-full flex items-center justify-center mr-2">
              <Star className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm text-gray-600 font-medium">Cosmic Advisor</span>
          </div>
        )}
        
        {/* Message Bubble */}
        <div
          className={`px-4 py-3 rounded-2xl ${
            isUser
              ? 'bg-gradient-to-r from-mystical-500 to-primary-600 text-white shadow-lg shadow-mystical-200'
              : 'bg-white border border-mystical-100 text-gray-800 shadow-sm relative overflow-hidden'
          }`}
        >
          {/* Starry background for bot messages */}
          {!isUser && (
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-2 left-3">
                <Sparkles className="w-3 h-3 text-mystical-400" />
              </div>
              <div className="absolute bottom-3 right-4">
                <Star className="w-2 h-2 text-gold-400" />
              </div>
              <div className="absolute top-4 right-6">
                <Star className="w-1.5 h-1.5 text-mystical-300" />
              </div>
            </div>
          )}
          
          <p className="relative z-10 leading-relaxed">{message.content}</p>
        </div>
        
        {/* Timestamp */}
        <div className={`text-xs text-gray-500 mt-1 ${isUser ? 'text-right' : 'text-left'}`}>
          Just now
        </div>
      </div>
    </div>
  );
};

// Suggestion Button Component
const SuggestionButton: React.FC<{ suggestion: string; onClick: () => void }> = ({ 
  suggestion, 
  onClick 
}) => {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-mystical-50 to-primary-50 hover:from-mystical-100 hover:to-primary-100 border border-mystical-200 rounded-full text-sm font-medium text-mystical-700 transition-all duration-200 hover:shadow-md hover:scale-105 mr-2 mb-2"
    >
      <Sparkles className="w-3 h-3 mr-2 text-mystical-500" />
      {suggestion}
    </button>
  );
};

// Chat Input Component
const ChatInput: React.FC<{
  isPremium: boolean;
  onSendMessage: (message: string) => void;
  onUpgrade: () => void;
}> = ({ isPremium, onSendMessage, onUpgrade }) => {
  const [message, setMessage] = useState('');
  const [showUpgradeTooltip, setShowUpgradeTooltip] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && isPremium) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleInputClick = () => {
    if (!isPremium) {
      setShowUpgradeTooltip(true);
      setTimeout(() => setShowUpgradeTooltip(false), 3000);
    }
  };

  return (
    <div className="relative">
      {/* Upgrade Tooltip */}
      {showUpgradeTooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50 animate-fade-in">
          <div className="bg-gray-900 text-white px-4 py-3 rounded-xl shadow-xl max-w-xs">
            <div className="flex items-center mb-2">
              <Crown className="w-4 h-4 text-gold-400 mr-2" />
              <span className="font-semibold text-sm">Premium Feature</span>
            </div>
            <p className="text-xs text-gray-300 mb-3">
              Custom questions are available in the Premium Plan. Upgrade to unlock!
            </p>
            <button
              onClick={onUpgrade}
              className="w-full bg-gradient-to-r from-gold-500 to-mystical-500 text-white py-2 px-3 rounded-lg text-xs font-medium hover:from-gold-600 hover:to-mystical-600 transition-all"
            >
              Upgrade Now
            </button>
          </div>
          {/* Tooltip Arrow */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2">
            <div className="border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-gray-900"></div>
          </div>
        </div>
      )}

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="flex items-center gap-3">
        <div className="flex-1 relative">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onClick={handleInputClick}
            placeholder={isPremium ? "Ask your cosmic question..." : "Upgrade to ask custom questions"}
            disabled={!isPremium}
            className={`w-full px-4 py-3 pr-12 rounded-xl border-2 transition-all duration-200 ${
              isPremium
                ? 'border-mystical-200 focus:border-mystical-500 focus:ring-2 focus:ring-mystical-200 bg-white text-gray-800'
                : 'border-gray-200 bg-gray-50 cursor-not-allowed text-gray-800'
            }`}
          />
          
          {/* Lock Icon for Free Mode */}
          {!isPremium && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Lock className="w-5 h-5 text-gray-400" />
            </div>
          )}
        </div>

        {/* Send Button */}
        <button
          type="submit"
          disabled={!isPremium || !message.trim()}
          className={`p-3 rounded-xl transition-all duration-200 ${
            isPremium && message.trim()
              ? 'bg-gradient-to-r from-mystical-500 to-primary-600 hover:from-mystical-600 hover:to-primary-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          <Send className="w-5 h-5" />
        </button>
      </form>

      {/* Premium Upgrade Banner for Free Users */}
      {!isPremium && (
        <div className="mt-3 bg-gradient-to-r from-gold-50 to-mystical-50 border border-gold-200 rounded-xl p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Crown className="w-5 h-5 text-gold-500 mr-2" />
              <div>
                <p className="text-sm font-medium text-gray-800">Unlock Custom Questions</p>
                <p className="text-xs text-gray-600">Get personalized insights with Premium</p>
              </div>
            </div>
            <button
              onClick={onUpgrade}
              className="bg-gradient-to-r from-gold-500 to-mystical-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-gold-600 hover:to-mystical-600 transition-all transform hover:scale-105"
            >
              Upgrade
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Typing Indicator Component
const TypingIndicator: React.FC = () => {
  return (
    <div className="flex justify-start mb-4">
      <div className="flex items-center">
        <div className="w-8 h-8 bg-gradient-to-br from-mystical-500 to-primary-600 rounded-full flex items-center justify-center mr-2">
          <Star className="w-4 h-4 text-white" />
        </div>
        <div className="bg-white border border-mystical-100 rounded-2xl px-4 py-3 shadow-sm">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-mystical-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-mystical-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-mystical-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main AstroChat Component
const AstroChat: React.FC<AstroChatProps> = ({
  messages,
  suggestions,
  isPremium,
  onSendMessage,
  onUpgrade
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Simulate typing when bot is responding
  useEffect(() => {
    if (messages.length > 0 && messages[messages.length - 1].sender === 'user') {
      setIsTyping(true);
      const timer = setTimeout(() => setIsTyping(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [messages]);

  const handleSuggestionClick = (suggestion: string) => {
    onSendMessage(suggestion);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-primary-50 via-white to-mystical-50">
      {/* Header */}
      <div className="bg-white border-b border-mystical-100 px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-br from-mystical-500 to-primary-600 rounded-full flex items-center justify-center mr-3">
              <Star className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-800">Cosmic Advisor</h1>
              <p className="text-sm text-gray-600">Your AI Vedic Astrology Guide</p>
            </div>
          </div>
          
          {/* Premium Badge */}
          <div className={`flex items-center px-3 py-1 rounded-full text-xs font-medium ${
            isPremium 
              ? 'bg-gradient-to-r from-gold-100 to-mystical-100 text-gold-700 border border-gold-200'
              : 'bg-gray-100 text-gray-600 border border-gray-200'
          }`}>
            {isPremium ? (
              <>
                <Crown className="w-3 h-3 mr-1" />
                Premium
              </>
            ) : (
              <>
                <Zap className="w-3 h-3 mr-1" />
                Free
              </>
            )}
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        <div className="max-w-4xl mx-auto">
          {/* Welcome Message */}
          {messages.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gradient-to-br from-mystical-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">Welcome to Your Cosmic Journey</h2>
              <p className="text-gray-600 mb-6">I'm here to guide you through the mysteries of Vedic astrology</p>
              
              {/* Initial Suggestions */}
              <div className="flex flex-wrap justify-center gap-2">
                {suggestions.slice(0, 3).map((suggestion, index) => (
                  <SuggestionButton
                    key={index}
                    suggestion={suggestion}
                    onClick={() => handleSuggestionClick(suggestion)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Chat Messages */}
          {messages.map((message, index) => (
            <ChatBubble
              key={index}
              message={message}
              isLatest={index === messages.length - 1}
            />
          ))}

          {/* Typing Indicator */}
          {isTyping && <TypingIndicator />}

          {/* Suggestions (shown after bot messages) */}
          {messages.length > 0 && 
           messages[messages.length - 1].sender === 'bot' && 
           !isTyping && 
           suggestions.length > 0 && (
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-3 font-medium">Suggested questions:</p>
              <div className="flex flex-wrap">
                {suggestions.map((suggestion, index) => (
                  <SuggestionButton
                    key={index}
                    suggestion={suggestion}
                    onClick={() => handleSuggestionClick(suggestion)}
                  />
                ))}
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-mystical-100 px-6 py-4">
        <div className="max-w-4xl mx-auto">
          <ChatInput
            isPremium={isPremium}
            onSendMessage={onSendMessage}
            onUpgrade={onUpgrade}
          />
        </div>
      </div>
    </div>
  );
};

export default AstroChat;