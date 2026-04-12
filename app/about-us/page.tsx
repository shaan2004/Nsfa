// src/app/about-us/page.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Globe2, Award, ShieldCheck, MapPin } from "lucide-react";

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

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

export default function AboutUs() {
  return (
    <main suppressHydrationWarning className="bg-[#040814] text-white min-h-screen pt-32 pb-24 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#BF953F]/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#0074A5]/10 rounded-full blur-[150px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header Section */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center mb-24 max-w-4xl mx-auto">
          <h3 className="text-[#BF953F] tracking-[0.3em] uppercase mb-4 text-sm font-bold">Know Us Better</h3>
          <GoldText text="Who We Are" className="text-5xl md:text-7xl mb-8" />
          <p className="text-white/80 text-xl md:text-2xl font-light leading-relaxed font-serif italic">
            NSFA is a globally recognised international education academy for advanced beauty & aesthetic education, headquartered in India.
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
              <div className="absolute inset-0 bg-[#0B132A]/80 backdrop-blur-sm z-10 group-hover:bg-transparent transition-all duration-700" />
              {/* Replace with actual academy image later */}
              <img src="https://images.unsplash.com/photo-1551076805-e1869043e560?q=80&w=2000&auto=format&fit=crop" alt="Aesthetic Clinic" className="w-full h-[500px] object-cover scale-105 group-hover:scale-100 transition-transform duration-700" />
              <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/90 to-transparent z-20">
                <GoldText text="Pioneering Aesthetic Science" className="text-2xl mb-2" />
              </div>
            </div>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="space-y-8">
            <div>
              <h3 className="text-2xl font-serif text-[#FBF5B7] mb-4 flex items-center gap-3">
                <ShieldCheck className="text-[#BF953F]" /> International Accreditation
              </h3>
              <p className="text-white/70 leading-relaxed text-lg">
                Affiliated with BWSSC & IEB UK, NSFA Academy is an internationally accredited beauty aesthetic education academy providing world-class standard training since 2020. NSFA Academy has also established an affiliated Advance Dental CPD Training Institute.
              </p>
            </div>
            
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            
            <div>
              <h3 className="text-2xl font-serif text-[#FBF5B7] mb-4 flex items-center gap-3">
                <Globe2 className="text-[#BF953F]" /> Global Footprint
              </h3>
              <p className="text-white/70 leading-relaxed text-lg mb-6">
                The Academy provides immersive programs designed to educate professionals on the latest innovations in the Aesthetic Industry across multiple countries.
              </p>
              <div className="flex flex-wrap gap-4">
                {["India", "Thailand", "South Korea (Upcoming)", "Dubai (Upcoming)"].map((location, idx) => (
                  <span key={idx} className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm font-medium flex items-center gap-2">
                    <MapPin size={14} className="text-[#BF953F]" /> {location}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Vision & Certification Stats */}
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="p-10 rounded-3xl border border-[#BF953F]/30 bg-gradient-to-br from-[#BF953F]/10 to-transparent backdrop-blur-xl relative overflow-hidden"
          >
            <Award className="w-24 h-24 text-[#BF953F]/20 absolute top-[-10%] right-[-10%]" />
            <GoldText text="Our Vision" className="text-3xl mb-6" />
            <p className="text-white/80 leading-relaxed">
              We strive in teaching the best non-surgical facial aesthetics across the country. The field of aesthetic practice appears very alluring. Hence we ensure proper training and constant up-gradation of knowledge and skills. We are forever changing the world of aesthetics training through the power of learning, educating, and networking.
            </p>
          </motion.div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="p-10 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl"
          >
            <h3 className="text-2xl font-serif text-[#FBF5B7] mb-6">First-Rate Courses</h3>
            <p className="text-white/70 leading-relaxed mb-6">
              NSFA Aesthetic Academy is an IAF, IAS & ISO 9001:2015 certified private, unaided, and standalone aesthetic training academy.
            </p>
            <div className="p-4 rounded-xl bg-[#0B132A] border border-[#BF953F]/50 shadow-[0_0_15px_rgba(191,149,63,0.2)]">
              <p className="text-white font-medium text-center italic">
                "We are India's first Academy to gain IAO Accreditation for Facial Aesthetics training."
              </p>
            </div>
          </motion.div>
        </div>

      </div>
    </main>
  );
}