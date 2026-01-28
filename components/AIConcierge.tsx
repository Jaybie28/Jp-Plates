import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, User, ChefHat, FileText } from 'lucide-react';
import { ChatMessage } from '../types';
import { getGeminiResponse } from '../services/geminiService';

interface AIConciergeProps {
  onOpenContactForm: () => void;
}

export const AIConcierge: React.FC<AIConciergeProps> = ({ onOpenContactForm }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Bon appétit! I'm your personal Flavor Guide. Tell me what you're craving, and I'll find the perfect dish for you.", timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    // Create user message
    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: new Date() };
    
    // Optimistically update UI
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // Pass the current history (messages) AND the new input (userMsg.text)
      let responseText = await getGeminiResponse(messages, userMsg.text);
      
      // Check for legacy form trigger token (optional fallback if AI decides to use it)
      if (responseText.includes('[OPEN_ORDER_FORM]')) {
        onOpenContactForm();
        responseText = responseText.replace('[OPEN_ORDER_FORM]', '').trim();
      }

      const aiMsg: ChatMessage = { role: 'model', text: responseText, timestamp: new Date() };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
      const errorMsg: ChatMessage = { role: 'model', text: "I apologize, I'm having trouble connecting to the kitchen right now.", timestamp: new Date() };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="concierge" className="py-20 bg-dark border-y border-white/5 scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-3 bg-dark-card rounded-full shadow-sm mb-4 border border-white/5">
            <Sparkles className="text-brand-500 w-6 h-6" />
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white">Not sure what to eat?</h2>
          <p className="mt-2 text-stone-400">Ask our AI Flavor Guide for a personalized recommendation.</p>
        </div>

        <div className="bg-dark-card rounded-2xl shadow-xl overflow-hidden border border-white/10 flex flex-col h-[600px]">
          
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-brand-900 to-dark p-4 flex items-center justify-between border-b border-white/5">
             <div className="flex items-center gap-3">
                <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm">
                    <ChefHat className="text-brand-500 w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm">JP Plates Concierge</h3>
                  <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                      <span className="text-stone-400 text-xs">Online & Ready to Help</span>
                  </div>
                </div>
             </div>
             <button 
                onClick={onOpenContactForm}
                className="flex items-center gap-2 px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold rounded-full transition-all shadow-md transform hover:scale-105"
             >
                <FileText size={14} />
                Fill Order Form
             </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-dark scroll-smooth">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex max-w-[85%] gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  
                  {/* Avatar */}
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-sm mt-1 ${
                    msg.role === 'user' ? 'bg-stone-700 text-stone-300' : 'bg-brand-900/30 text-brand-500'
                  }`}>
                    {msg.role === 'user' ? <User size={14} /> : <Sparkles size={14} />}
                  </div>

                  {/* Bubble */}
                  <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm whitespace-pre-wrap ${
                    msg.role === 'user' 
                      ? 'bg-stone-700 text-white rounded-tr-none' 
                      : 'bg-dark-card text-stone-200 border border-white/5 rounded-tl-none font-medium'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
               <div className="flex justify-start w-full">
                 <div className="flex items-center gap-2 bg-dark-card px-4 py-3 rounded-2xl rounded-tl-none border border-white/5 ml-11">
                    <span className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></span>
                    <span className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
                 </div>
               </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-dark-card border-t border-white/5">
            <form onSubmit={handleSend} className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ex: Show me the menu..."
                className="w-full pl-6 pr-14 py-4 bg-dark border border-white/10 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all text-stone-200 placeholder-stone-600"
              />
              <button 
                type="submit" 
                disabled={!input.trim() || isLoading}
                className="absolute right-2 top-2 p-2 bg-brand-600 text-white rounded-full hover:bg-brand-500 disabled:opacity-50 disabled:hover:bg-brand-600 transition-all shadow-md"
              >
                <Send size={18} />
              </button>
            </form>
            <p className="text-center text-xs text-stone-600 mt-2">
              AI recommendations are based on our current menu availability.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};