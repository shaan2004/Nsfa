"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Globe2, Award, ShieldCheck, MapPin } from "lucide-react";

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

/* ---------------- ANIMATION VARIANTS ---------------- */
// Style 1: Cinematic Blur & Spring Reveal for Hero Text
const blurReveal: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(15px)" },
  visible: (i: number) => ({
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { delay: i * 0.15, duration: 1, type: "spring", bounce: 0.3 }
  })
};

// Style 2: Smooth Slide & Frost (Glassmorphism Reveal)
const glassSlideIn: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, x: 0, 
    transition: { duration: 0.8, type: "spring", bounce: 0.2, staggerChildren: 0.2 } 
  }
};

// Style 3: Luxury Text Wipe Reveal
const wipeReveal: Variants = {
  hidden: { clipPath: "inset(0 100% 0 0)", opacity: 0 },
  visible: { 
    clipPath: "inset(0 0% 0 0)", opacity: 1, 
    transition: { duration: 1.4, ease: [0.77, 0, 0.175, 1] } 
  }
};

// Style 4: 3D Flip Up
const flipUp3D: Variants = {
  hidden: { opacity: 0, rotateX: -40, y: 60, scale: 0.95 },
  visible: { 
    opacity: 1, rotateX: 0, y: 0, scale: 1,
    transition: { duration: 1, type: "spring", bounce: 0.4 } 
  }
};


/* ---------------- PAGE ---------------- */
export default function AboutUs() {
  return (
    <main suppressHydrationWarning className="bg-[#040814] text-white min-h-screen pt-32 pb-32 relative overflow-hidden perspective-[1500px]">
      
      {/* Background Ambience */}
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#BF953F]/10 rounded-full blur-[150px] -z-10 pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-[700px] h-[700px] bg-[#0074A5]/10 rounded-full blur-[180px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4">
        
        {/* ---------------- 1. HERO SECTION ---------------- */}
        <div className="text-center mb-32 max-w-4xl mx-auto">
          <motion.h3 
            initial={{ opacity: 0, letterSpacing: "0.1em" }} animate={{ opacity: 1, letterSpacing: "0.4em" }} transition={{ duration: 1.5, ease: "easeOut" }}
            className="text-[#BF953F] uppercase mb-6 text-sm font-bold"
          >
            Know Us Better
          </motion.h3>
          
          <div className="flex flex-wrap justify-center gap-x-4 overflow-hidden py-2 mb-6">
            {["Who", "We", "Are"].map((word, i) => (
              <motion.div key={i} custom={i} variants={blurReveal} initial="hidden" animate="visible">
                <GoldText text={word} className="text-6xl md:text-8xl drop-shadow-2xl" />
              </motion.div>
            ))}
          </div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 1 }}
            className="text-white/70 text-xl md:text-2xl font-light leading-relaxed font-serif italic mt-8"
          >
            NSFA is a globally recognised international education academy for advanced beauty & aesthetic education, headquartered in India.
          </motion.p>
        </div>

        {/* ---------------- 2. CONTENT GRID (Image & Info) ---------------- */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-40">
          
          {/* THE IMAGE FIX */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 1, type: "spring" }}
            className="relative rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group h-[550px]"
          >
            {/* FIX: Removed the dark/blur overlay entirely! Added a subtle gradient only at the very bottom for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#040814] via-transparent to-transparent z-10 opacity-90 transition-opacity duration-700" />
            
            {/* The Image - Now clear and optimized */}
            <img 
              src="/assets/aboutus.jpg" 
              alt="NSFA Academy Gathering" 
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000 ease-out" 
            />
            
            <div className="absolute bottom-0 left-0 w-full p-10 z-20 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <div className="w-12 h-1 bg-[#BF953F] mb-4" />
              <h3 className="text-3xl font-serif font-bold text-[#FBF5B7] drop-shadow-lg">Pioneering Aesthetic Science</h3>
            </div>
          </motion.div>

          {/* THE GLASSMORPHIC INFO CARDS */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={glassSlideIn} className="space-y-8">
            
            <motion.div variants={glassSlideIn} className="p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-[#BF953F]/40 transition-colors shadow-xl group">
              <h3 className="text-2xl font-serif text-white mb-4 flex items-center gap-4">
                <div className="p-3 rounded-full bg-[#BF953F]/10 group-hover:bg-[#BF953F]/20 transition-colors">
                  <ShieldCheck className="text-[#BF953F] w-6 h-6" />
                </div>
                International Accreditation
              </h3>
              <p className="text-white/70 leading-relaxed text-lg pl-14">
                Affiliated with BWSSC & IEB UK, NSFA Academy is an internationally accredited beauty aesthetic education academy providing world-class standard training since 2020. NSFA Academy has also established an affiliated Advance Dental CPD Training Institute.
              </p>
            </motion.div>
            
            <motion.div variants={glassSlideIn} className="p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-[#BF953F]/40 transition-colors shadow-xl group">
              <h3 className="text-2xl font-serif text-white mb-4 flex items-center gap-4">
                <div className="p-3 rounded-full bg-[#0074A5]/10 group-hover:bg-[#0074A5]/20 transition-colors">
                  <Globe2 className="text-[#BF953F] w-6 h-6" />
                </div>
                Global Footprint
              </h3>
              <p className="text-white/70 leading-relaxed text-lg mb-6 pl-14">
                The Academy provides immersive programs designed to educate professionals on the latest innovations in the Aesthetic Industry across multiple countries.
              </p>
              <div className="flex flex-wrap gap-3 pl-14">
                {["India", "Thailand", "South Korea (Upcoming)", "Dubai (Upcoming)"].map((location, idx) => (
                  <span key={idx} className="px-4 py-2 rounded-full border border-white/20 bg-white/5 text-sm font-medium flex items-center gap-2 hover:bg-white/10 transition-colors cursor-default">
                    <MapPin size={14} className="text-[#BF953F]" /> {location}
                  </span>
                ))}
              </div>
            </motion.div>

          </motion.div>
        </div>

        {/* ---------------- 3. ACCREDITATION SECTION (Cinematic Wipe Reveal) ---------------- */}
        <motion.section 
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }}
          className="mb-40 relative py-24 rounded-[3rem] border border-white/10 bg-[linear-gradient(135deg,#080E21,#040814)] overflow-hidden flex flex-col md:flex-row items-center gap-16 px-8 md:px-16 shadow-2xl"
        >
          {/* Animated Background Map */}
          <div className="absolute inset-0 z-0 flex items-center justify-start opacity-10 pointer-events-none mix-blend-screen overflow-hidden">
            <motion.img 
              animate={{ x: [0, -20, 0] }} transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
              src="/assets/map.png" 
              alt="Global Reach" 
              className="w-[150%] max-w-none md:w-[90%] object-contain opacity-50"
            />
          </div>

          <div className="relative z-10 w-full md:w-[55%]">
            <motion.div variants={wipeReveal}>
              <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-serif font-bold text-white leading-tight mb-8">
                We are the India's first Academy to gain <span className="text-transparent bg-clip-text drop-shadow-md" style={{ backgroundImage: "linear-gradient(to right, #BF953F, #FCF6BA, #B38728)" }}>IAO Accreditation</span> for Facial Aesthetics training.
              </h2>
            </motion.div>
          </div>

          <div className="relative z-10 w-full md:w-[45%]">
            <motion.div 
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
              className="grid grid-cols-2 gap-8 items-center justify-items-center bg-white/5 backdrop-blur-2xl p-10 rounded-[2.5rem] border border-white/20 shadow-inner"
            >
              <motion.img variants={flipUp3D} src="/assets/iso.png" alt="ISO 9001:2015" className="h-20 md:h-24 object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] hover:scale-110 transition-transform" />
              <motion.img variants={flipUp3D} src="/assets/iao.png" alt="IAO Accredited" className="h-20 md:h-24 object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] hover:scale-110 transition-transform" />
              <motion.img variants={flipUp3D} src="/assets/iaf.png" alt="IAF" className="h-20 md:h-24 object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] hover:scale-110 transition-transform" />
              <motion.img variants={flipUp3D} src="/assets/ias.png" alt="IAS" className="h-20 md:h-24 object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] hover:scale-110 transition-transform" />
            </motion.div>
          </div>
        </motion.section>

        {/* ---------------- 4. STATS & VISION (3D Flip Animation) ---------------- */}
        <div className="grid md:grid-cols-2 gap-10">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={flipUp3D}
            style={{ transformStyle: "preserve-3d" }}
            className="p-12 rounded-[2.5rem] border border-[#BF953F]/40 bg-[linear-gradient(145deg,rgba(191,149,63,0.1)_0%,rgba(0,0,0,0)_100%)] backdrop-blur-2xl relative overflow-hidden shadow-[0_20px_50px_rgba(191,149,63,0.15)] group"
          >
            <Award className="w-40 h-40 text-[#BF953F]/10 absolute -top-4 -right-4 transform group-hover:rotate-12 transition-transform duration-700" />
            <GoldText text="Our Vision" className="text-4xl mb-8 relative z-10" />
            <p className="text-white/80 leading-relaxed text-lg relative z-10 font-light">
              We strive in teaching the best non-surgical facial aesthetics across the country. The field of aesthetic practice appears very alluring. Hence we ensure proper training and constant up-gradation of knowledge and skills. We are forever changing the world of aesthetics training through the power of learning, educating, and networking.
            </p>
          </motion.div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={flipUp3D}
            style={{ transformStyle: "preserve-3d" }}
            className="p-12 rounded-[2.5rem] border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl flex flex-col justify-center"
          >
            <h3 className="text-3xl font-serif text-[#FBF5B7] mb-6">First-Rate Courses</h3>
            <p className="text-white/70 leading-relaxed mb-8 text-lg font-light">
              NSFA Aesthetic Academy is an IAF, IAS & ISO 9001:2015 certified private, unaided, and standalone aesthetic training academy.
            </p>
            <div className="p-6 rounded-2xl bg-[#050914] border border-[#BF953F]/40 shadow-inner relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-[#BF953F] to-[#FCF6BA]" />
              <p className="text-white/90 font-medium text-center italic text-lg leading-snug">
                "Elevating standards through world-class accreditation and uncompromising excellence."
              </p>
            </div>
          </motion.div>
        </div>

      </div>
    </main>
  );
}