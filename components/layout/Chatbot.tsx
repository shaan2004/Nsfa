"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot } from "lucide-react";

// 1. CHANGED "bot" to "assistant" HERE
type Message = {
  id: string;
  role: "user" | "assistant"; 
  content: string;
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant", // 2. CHANGED HERE
      content: "Hello! I am the NSFA Academy Assistant. You can ask me questions about clinical setups, Indian medical guidelines for injectables, or global aesthetic regulations."
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: messages.concat(userMsg).map(m => ({ role: m.role, content: m.content })) 
        })
      });

      if (!response.ok) throw new Error("API Error");

      const data = await response.json();
      
      setMessages(prev => [...prev, { 
        id: (Date.now() + 1).toString(), 
        role: "assistant", // 3. CHANGED HERE
        content: data.reply 
      }]);

    } catch (error) {
      setMessages(prev => [...prev, { 
        id: (Date.now() + 1).toString(), 
        role: "assistant", // 4. CHANGED HERE
        content: "I'm having trouble connecting right now. Please try again later." 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  const isWhatsAppFallback = (content: string) => {
    return content.includes("WhatsApp");
  };

  return (
    <>
      {/* FLOATING TOGGLE BUTTON */}
      <motion.button
        onClick={() => setIsOpen(true)}
        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className={`fixed bottom-8 right-8 z-[100] w-16 h-16 rounded-full bg-[linear-gradient(135deg,#BF953F,#FCF6BA,#B38728)] flex items-center justify-center shadow-[0_10px_30px_rgba(191,149,63,0.4)] hover:scale-110 transition-transform ${isOpen ? 'hidden' : 'flex'}`}
      >
        <Bot className="w-8 h-8 text-[#040814]" />
      </motion.button>

      {/* CHAT WINDOW MODAL */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", bounce: 0.3 }}
            className="fixed bottom-6 right-6 z-[100] w-[380px] h-[600px] max-h-[85vh] max-w-[90vw] bg-[#0A1128] border border-[#BF953F]/40 rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[linear-gradient(135deg,#BF953F,#FCF6BA,#B38728)] p-4 flex justify-between items-center shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#040814] flex items-center justify-center">
                  <Bot className="w-6 h-6 text-[#FBF5B7]" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-[#040814] leading-tight">NSFA Assistant</h3>
                  <p className="text-[#040814]/70 text-xs font-medium">Online</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 rounded-full bg-black/10 hover:bg-black/20 text-[#040814] transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#040814]/50">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-white/10 border border-white/20 text-white rounded-br-none' 
                      : 'bg-[#0A1128] border border-[#BF953F]/30 text-white/90 rounded-bl-none shadow-lg'
                  }`}>
                    {msg.content}
                    
                    {/* Render WhatsApp Button if Fallback Triggered */}
                    {/* 5. CHANGED HERE */}
                    {msg.role === 'assistant' && isWhatsAppFallback(msg.content) && (
                      <a 
                        href="https://wa.me/919884718883?text=Hello%20NSFA%20Academy,%20I%20need%20more%20information." 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="mt-3 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold uppercase tracking-wider text-xs transition-colors"
                      >
                        <MessageCircle size={16} /> Chat on WhatsApp
                      </a>
                    )}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-[#0A1128] border border-[#BF953F]/30 text-white/50 p-4 rounded-2xl rounded-bl-none shadow-lg flex gap-1">
                     <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-2 h-2 bg-[#BF953F] rounded-full" />
                     <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-2 h-2 bg-[#BF953F] rounded-full" />
                     <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-2 h-2 bg-[#BF953F] rounded-full" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-[#0A1128] border-t border-white/5">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about guidelines..."
                  className="w-full bg-white/5 border border-white/10 text-white text-sm rounded-full py-3 pl-4 pr-12 focus:outline-none focus:border-[#BF953F] focus:ring-1 focus:ring-[#BF953F] transition-all"
                />
                <button 
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="absolute right-2 p-2 rounded-full bg-[linear-gradient(135deg,#BF953F,#FCF6BA,#B38728)] text-[#040814] disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}