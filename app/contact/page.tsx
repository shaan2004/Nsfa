"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, ArrowRight, MessageCircle } from "lucide-react";

// --- CUSTOM SVG ICONS ---
const FacebookIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const InstagramIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

/* ---------------- PREMIUM COMPONENTS ---------------- */
const GoldText = ({ text, className = "" }: { text: string; className?: string }) => (
  <h2
    className={`font-serif font-bold text-transparent bg-clip-text drop-shadow-[0_2px_10px_rgba(255,215,0,0.2)] ${className}`}
    style={{
      backgroundImage: "linear-gradient(to right, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    }}
  >
    {text}
  </h2>
);

const premiumGoldGradient = "bg-[linear-gradient(145deg,#D4AF37_0%,#FFF2CD_45%,#AA771C_100%)]";
const premiumTextGradient = "group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-[linear-gradient(to_right,#BF953F,#FCF6BA,#B38728)]";

export default function Contact() {
  const addressQuery = encodeURIComponent("31, Ramalingam Nagar 1st St, Nungambakkam, Chennai, Tamil Nadu 600034");
  const whatsappMsg = encodeURIComponent("Hello NSFA Academy, I have some questions regarding your courses.");

  return (
    <main suppressHydrationWarning className="bg-[#040814] text-white min-h-screen pt-32 pb-32 relative overflow-hidden">
      
      {/* ---------------- BACKGROUND AMBIENCE ---------------- */}
      <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.15)_0%,rgba(0,0,0,0)_70%)] pointer-events-none blur-[50px]" />
      <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(0,116,165,0.15)_0%,rgba(0,0,0,0)_70%)] pointer-events-none blur-[50px]" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        {/* 1. HEADER */}
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <motion.h3 
            initial={{ opacity: 0, letterSpacing: "0.1em" }} animate={{ opacity: 1, letterSpacing: "0.4em" }} transition={{ duration: 1.5, ease: "easeOut" }}
            className="text-[#D4AF37] uppercase mb-4 text-sm font-bold"
          >
            Have More Questions?
          </motion.h3>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
             <GoldText text="Let's Contact Us" className="text-5xl md:text-7xl mb-6" />
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* ---------------- 2. CONTACT INFO CARDS (Glassmorphism) ---------------- */}
          <div className="space-y-6">
            
            {/* Address Card */}
            <motion.a 
              href={`https://www.google.com/maps/search/?api=1&query=$${addressQuery}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
              className="block p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-[#BF953F]/50 transition-all duration-500 shadow-2xl group relative overflow-hidden"
            >
              <div className={`absolute inset-0 ${premiumGoldGradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
              <div className="relative z-10 flex gap-6 items-start">
                {/* Glowing Gradient Icon Container */}
                <div className="relative p-4 rounded-full bg-[#0A1128]/80 border border-[#BF953F]/40 group-hover:border-transparent transition-all duration-500 shrink-0 overflow-hidden group-hover:shadow-[0_0_20px_rgba(191,149,63,0.5)]">
                  <div className={`absolute inset-0 ${premiumGoldGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  <MapPin className="relative z-10 w-8 h-8 text-[#FBF5B7] group-hover:text-[#040814] transition-colors duration-500" />
                </div>
                <div>
                  {/* Gradient Text Hover */}
                  <h4 className={`text-2xl font-serif font-bold text-white mb-3 transition-all duration-500 ${premiumTextGradient}`}>Address</h4>
                  <p className="text-white/70 leading-relaxed font-light text-lg">
                    NSFA Academy<br/>
                    31, Ramalingam Nagar 1st St,<br/>
                    Kamdar nagar, Nungambakkam,<br/>
                    Chennai, Tamil Nadu 600034, India
                  </p>
                </div>
              </div>
            </motion.a>

            {/* Phone Card */}
            <motion.a 
              href="tel:+919884718883"
              initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
              className="block p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-[#BF953F]/50 transition-all duration-500 shadow-2xl group relative overflow-hidden"
            >
              <div className={`absolute inset-0 ${premiumGoldGradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
              <div className="relative z-10 flex gap-6 items-center">
                {/* Glowing Gradient Icon Container */}
                <div className="relative p-4 rounded-full bg-[#0A1128]/80 border border-[#BF953F]/40 group-hover:border-transparent transition-all duration-500 shrink-0 overflow-hidden group-hover:shadow-[0_0_20px_rgba(191,149,63,0.5)]">
                  <div className={`absolute inset-0 ${premiumGoldGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  <Phone className="relative z-10 w-8 h-8 text-[#FBF5B7] group-hover:text-[#040814] transition-colors duration-500" />
                </div>
                <div>
                  {/* Gradient Text Hover */}
                  <h4 className={`text-2xl font-serif font-bold text-white mb-1 transition-all duration-500 ${premiumTextGradient}`}>Phone</h4>
                  <p className="text-white/70 text-lg font-light tracking-wider">+91 98847 18883</p>
                </div>
              </div>
            </motion.a>

            {/* Email Card */}
            <motion.a 
              href="mailto:info@nsfaacademy.com"
              initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.5 }}
              className="block p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-[#BF953F]/50 transition-all duration-500 shadow-2xl group relative overflow-hidden"
            >
              <div className={`absolute inset-0 ${premiumGoldGradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
              <div className="relative z-10 flex gap-6 items-center">
                {/* Glowing Gradient Icon Container */}
                <div className="relative p-4 rounded-full bg-[#0A1128]/80 border border-[#BF953F]/40 group-hover:border-transparent transition-all duration-500 shrink-0 overflow-hidden group-hover:shadow-[0_0_20px_rgba(191,149,63,0.5)]">
                  <div className={`absolute inset-0 ${premiumGoldGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  <Mail className="relative z-10 w-8 h-8 text-[#FBF5B7] group-hover:text-[#040814] transition-colors duration-500" />
                </div>
                <div>
                  {/* Gradient Text Hover */}
                  <h4 className={`text-2xl font-serif font-bold text-white mb-1 transition-all duration-500 ${premiumTextGradient}`}>Email</h4>
                  <p className="text-white/70 text-lg font-light tracking-wide">info@nsfaacademy.com</p>
                </div>
              </div>
            </motion.a>

            {/* Socials & WhatsApp */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}
              className="flex items-center gap-6 pt-4 pl-4"
            >
              {/* Follow Us Gradient Text */}
              <span className="font-bold uppercase tracking-widest text-sm text-transparent bg-clip-text bg-[linear-gradient(to_right,#BF953F,#FCF6BA,#B38728)] drop-shadow-[0_0_10px_rgba(191,149,63,0.2)]">
                Follow Us
              </span>
              
              <a href="https://www.facebook.com/nsfaacademy/" target="_blank" className="relative p-3 rounded-full bg-white/5 border border-white/10 hover:border-transparent transition-all duration-500 overflow-hidden group/social hover:shadow-[0_0_20px_rgba(191,149,63,0.5)]">
                <div className={`absolute inset-0 ${premiumGoldGradient} opacity-0 group-hover/social:opacity-100 transition-opacity duration-500`} />
                <div className="relative z-10 text-white/80 group-hover/social:text-[#040814] transition-colors duration-500">
                  <FacebookIcon size={20} />
                </div>
              </a>
              
              <a href="https://www.instagram.com/nsfa_courses/" target="_blank" className="relative p-3 rounded-full bg-white/5 border border-white/10 hover:border-transparent transition-all duration-500 overflow-hidden group/social hover:shadow-[0_0_20px_rgba(191,149,63,0.5)]">
                <div className={`absolute inset-0 ${premiumGoldGradient} opacity-0 group-hover/social:opacity-100 transition-opacity duration-500`} />
                <div className="relative z-10 text-white/80 group-hover/social:text-[#040814] transition-colors duration-500">
                  <InstagramIcon size={20} />
                </div>
              </a>
              
              <a href={`https://wa.me/919884718883?text=${whatsappMsg}`} target="_blank" className="relative p-3 rounded-full bg-white/5 border border-white/10 hover:border-transparent transition-all duration-500 overflow-hidden group/social hover:shadow-[0_0_20px_rgba(191,149,63,0.5)]">
                <div className={`absolute inset-0 ${premiumGoldGradient} opacity-0 group-hover/social:opacity-100 transition-opacity duration-500`} />
                <div className="relative z-10 text-white/80 group-hover/social:text-[#040814] transition-colors duration-500">
                  <MessageCircle size={20} />
                </div>
              </a>
            </motion.div>

          </div>

          {/* ---------------- 3. INTERACTIVE MAP (Embedded with Real Address) ---------------- */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.4 }}
            className="h-full min-h-[500px] rounded-3xl overflow-hidden border-2 border-[#BF953F]/30 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative group"
          >
            <iframe 
             src={`https://maps.google.com/maps?q=${addressQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
              width="100%" 
              height="100%" 
              style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) contrast(110%)" }} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 grayscale group-hover:grayscale-0 group-hover:filter-none transition-all duration-1000"
            />
            {/* Hover Badge with Glowing Shadow */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#0A1128]/80 backdrop-blur-md px-6 py-2 rounded-full border border-[#BF953F]/50 text-[#FBF5B7] text-sm font-medium tracking-wide pointer-events-none opacity-100 group-hover:opacity-0 transition-opacity duration-500 shadow-[0_10px_30px_rgba(212,175,55,0.2)]">
              Hover to explore map
            </div>
          </motion.div>

        </div>
      </div>
    </main>
  );
}