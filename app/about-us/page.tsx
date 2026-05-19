"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import Image from "next/image"; // Added Next.js Image component
import { Globe2, Award, ShieldCheck, MapPin, Briefcase, Sparkles, ChevronLeft } from "lucide-react";
import Link from "next/link";

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
const blurReveal: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(15px)" },
  visible: (i: number) => ({
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { delay: i * 0.15, duration: 1, type: "spring", bounce: 0.3 }
  })
};

const glassSlideIn: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, x: 0, 
    transition: { duration: 0.8, type: "spring", bounce: 0.2, staggerChildren: 0.2 } 
  }
};

const wipeReveal: Variants = {
  hidden: { clipPath: "inset(0 100% 0 0)", opacity: 0 },
  visible: { 
    clipPath: "inset(0 0% 0 0)", opacity: 1, 
    transition: { duration: 1.4, ease: [0.77, 0, 0.175, 1] } 
  }
};

const flipUp3D: Variants = {
  hidden: { opacity: 0, rotateX: -40, y: 60, scale: 0.95 },
  visible: { 
    opacity: 1, rotateX: 0, y: 0, scale: 1,
    transition: { duration: 1, type: "spring", bounce: 0.4 } 
  }
};

const grandCardUp: Variants = {
  hidden: { opacity: 0, y: 80, scale: 0.9, rotateX: 15 },
  visible: (i: number) => ({
    opacity: 1, y: 0, scale: 1, rotateX: 0,
    transition: { delay: i * 0.15, duration: 0.8, type: "spring", bounce: 0.4 },
  }),
};

/* ---------------- DATA ---------------- */
const journeyFeatures = [
  { title: "8 CPDs in 1 Course", desc: "We are the only institute to provide 8 CPD training modules integrated into a single course.", icon: Award, color: "from-[#1A2D4A] to-[#080E21]" },
  { title: "Business & Internships", desc: "Free internship benefits plus exclusive Business & Entrepreneurship classes to launch your clinic.", icon: Briefcase, color: "from-[#BF953F] to-[#B38728]" },
  { title: "Accessible Learning", desc: "World-class education made accessible with flexible Easy EMI options and 100% placement assistance.", icon: Sparkles, color: "from-[#0F766E] to-[#042F2E]" }
];

/* ---------------- PAGE ---------------- */
export default function AboutUs() {
  return (
    <main suppressHydrationWarning className="bg-[#040814] text-white min-h-screen pt-32 relative overflow-hidden perspective-[1500px]">
      
      {/* Background Ambience */}
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#BF953F]/10 rounded-full blur-[150px] -z-10 pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-[700px] h-[700px] bg-[#0074A5]/10 rounded-full blur-[180px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 pb-32">
        
        {/* ---------------- 1. HERO SECTION ---------------- */}
        <div className="text-center mb-20 md:mb-32 max-w-4xl mx-auto">
          <motion.h3 
            initial={{ opacity: 0, letterSpacing: "0.1em" }} animate={{ opacity: 1, letterSpacing: "0.4em" }} transition={{ duration: 1.5, ease: "easeOut" }}
            className="text-[#BF953F] uppercase mb-4 md:mb-6 text-xs md:text-sm font-bold"
          >
            Know Us Better
          </motion.h3>
          
          <div className="flex flex-wrap justify-center gap-x-2 md:gap-x-4 overflow-hidden py-2 mb-4 md:mb-6">
            {["Who", "We", "Are"].map((word, i) => (
              <motion.div key={i} custom={i} variants={blurReveal} initial="hidden" animate="visible" style={{ willChange: "transform, opacity, filter" }}>
                <GoldText text={word} className="text-5xl md:text-8xl drop-shadow-2xl" />
              </motion.div>
            ))}
          </div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 1 }}
            className="text-white/70 text-lg md:text-2xl font-light leading-relaxed font-serif italic mt-4 md:mt-8 px-2"
          >
            NSFA is a globally recognised international education academy for advanced beauty & aesthetic education, headquartered in India.
          </motion.p>
        </div>

        {/* ---------------- 2. JOURNEY AHEAD (NOW MATCHING DARK THEME) ---------------- */}
        <section className="py-24 md:py-32 relative bg-[#050914] text-white overflow-hidden border-2 border-[#BF953F]/30 rounded-[2rem] md:rounded-[3rem] mb-24 md:mb-40 shadow-[0_30px_100px_rgba(0,0,0,0.8)]">
          {/* Internal Glow for Dark Theme */}
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(191,149,63,0.1),transparent_70%)] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 md:gap-20 items-center relative z-10">
            
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="space-y-6">
              <h3 className="text-[#BF953F] tracking-[0.2em] uppercase text-xs md:text-sm font-bold text-center lg:text-left">To The Journey Ahead</h3>
              <motion.div variants={wipeReveal} className="text-center lg:text-left">
                <GoldText text="Gain Valuable Knowledge & Experience" className="text-3xl md:text-5xl lg:text-6xl leading-tight" />
              </motion.div>

              <div className="space-y-8 md:space-y-12 pt-4 md:pt-8">
                {journeyFeatures.map((item, idx) => (
                  <motion.div key={idx} custom={idx} variants={grandCardUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 md:gap-8 group cursor-default" style={{ willChange: "transform, opacity" }}>
                    <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center shrink-0 bg-gradient-to-br ${item.color} shadow-xl border border-white/10 group-hover:scale-110 group-active:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                      <item.icon className="w-8 h-8 md:w-10 md:h-10 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xl md:text-3xl font-serif font-bold text-[#FBF5B7] mb-2 md:mb-3 transition-colors duration-300">{item.title}</h4>
                      <p className="text-white/60 text-sm md:text-lg leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 1, type: "spring" }} 
              className="flex overflow-x-auto gap-4 snap-x snap-mandatory w-full h-[350px] no-scrollbar pb-4 md:grid md:grid-cols-2 md:grid-rows-2 md:h-[700px] md:gap-6 perspective-[1000px]"
            >
              <div className="min-w-[85vw] snap-center md:min-w-0 bg-[linear-gradient(135deg,#1A2D4A,#080E21)] p-6 md:p-10 rounded-3xl flex flex-col justify-center text-white shadow-2xl hover:-translate-y-4 md:hover:rotate-2 transition-all duration-500 cursor-pointer border border-white/10">
                <h4 className="text-2xl md:text-3xl font-serif font-bold mb-3 md:mb-4">Having any queries?</h4>
                <p className="text-white/70 text-sm md:text-base leading-relaxed">Ready to move into a fast-growing industry with multiple career path opportunities available?</p>
              </div>
              <div className="min-w-[85vw] snap-center md:min-w-0 rounded-3xl overflow-hidden shadow-2xl relative">
                <Image src="/assets/j1.png" alt="Graduation" fill className="object-cover hover:scale-110 transition-transform duration-700" sizes="(max-width: 768px) 100vw, 400px" />
              </div>
              <div className="min-w-[85vw] snap-center md:min-w-0 rounded-3xl overflow-hidden shadow-2xl relative">
                <Image src="/assets/j2.png" alt="Students Learning" fill className="object-cover hover:scale-110 transition-transform duration-700" sizes="(max-width: 768px) 100vw, 400px" />
              </div>
              <div className="min-w-[85vw] snap-center md:min-w-0 bg-[linear-gradient(135deg,#BF953F,#FCF6BA,#B38728)] p-6 md:p-10 rounded-3xl flex flex-col justify-center text-[#080E21] shadow-[0_20px_40px_rgba(191,149,63,0.4)] hover:-translate-y-4 md:hover:-rotate-2 transition-all duration-500 cursor-pointer">
                <h4 className="text-2xl md:text-3xl font-serif font-bold mb-3 md:mb-4 text-[#040814]">Connect with us!</h4>
                <p className="text-[#040814]/80 text-sm md:text-base leading-relaxed font-bold">We are here to help you. It's time to earn your Aesthetician certification with NSFA Academy!</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ---------------- 3. CONTENT GRID (Image & Info) ---------------- */}
        <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center mb-24 md:mb-40">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 1, type: "spring" }}
            className="relative rounded-3xl md:rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.6)] group h-[400px] md:h-[550px]"
            style={{ willChange: "transform, opacity" }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#040814] via-transparent to-transparent z-10 opacity-90 transition-opacity duration-700" />
            
            <Image 
              src="/assets/aboutus.jpg" 
              alt="NSFA Academy Gathering" 
              fill
              priority
              className="object-cover scale-105 group-hover:scale-100 transition-transform duration-1000 ease-out" 
              sizes="(max-width: 1024px) 100vw, 800px"
            />
            
            <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 z-20 transform translate-y-2 md:translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <div className="w-8 md:w-12 h-1 bg-[#BF953F] mb-3 md:mb-4" />
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#FBF5B7] drop-shadow-lg">Pioneering Aesthetic Science</h3>
            </div>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={glassSlideIn} className="space-y-6 md:space-y-8">
            
            <motion.div variants={glassSlideIn} className="p-6 md:p-8 rounded-[2rem] md:rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 hover:border-[#BF953F]/40 transition-colors shadow-xl group" style={{ willChange: "transform, opacity" }}>
              <h3 className="text-xl md:text-2xl font-serif text-white mb-3 md:mb-4 flex items-center gap-3 md:gap-4">
                <div className="p-2 md:p-3 rounded-full bg-[#BF953F]/10 group-hover:bg-[#BF953F]/20 transition-colors">
                  <ShieldCheck className="text-[#BF953F] w-5 h-5 md:w-6 md:h-6" />
                </div>
                International Accreditation
              </h3>
              <p className="text-white/60 leading-relaxed text-sm md:text-lg pl-12 md:pl-14">
                Affiliated with BWSSC & IEB UK, NSFA Academy is an internationally accredited beauty aesthetic education academy providing world-class standard training since 2020.
              </p>
            </motion.div>
            
            <motion.div variants={glassSlideIn} className="p-6 md:p-8 rounded-[2rem] md:rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 hover:border-[#BF953F]/40 transition-colors shadow-xl group" style={{ willChange: "transform, opacity" }}>
              <h3 className="text-xl md:text-2xl font-serif text-white mb-3 md:mb-4 flex items-center gap-3 md:gap-4">
                <div className="p-2 md:p-3 rounded-full bg-[#0074A5]/10 group-hover:bg-[#0074A5]/20 transition-colors">
                  <Globe2 className="text-[#BF953F] w-5 h-5 md:w-6 md:h-6" />
                </div>
                Global Footprint
              </h3>
              <p className="text-white/60 leading-relaxed text-sm md:text-lg mb-4 md:mb-6 pl-12 md:pl-14">
                The Academy provides immersive programs designed to educate professionals on the latest innovations across multiple countries.
              </p>
              <div className="flex flex-wrap gap-2 md:gap-3 pl-12 md:pl-14">
                {["India", "Thailand", "South Korea", "Dubai"].map((location, idx) => (
                  <span key={idx} className="px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-white/10 bg-white/5 text-xs md:text-sm font-medium flex items-center gap-1.5 md:gap-2 transition-colors cursor-default">
                    <MapPin size={12} className="text-[#BF953F]" /> {location}
                  </span>
                ))}
              </div>
            </motion.div>

          </motion.div>
        </div>

        {/* ---------------- 4. ACCREDITATION SECTION ---------------- */}
        <motion.section 
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }}
          className="mb-24 md:mb-40 relative py-16 md:py-24 rounded-[2.5rem] md:rounded-[3rem] border border-[#BF953F]/20 bg-[linear-gradient(135deg,#080E21,#040814)] overflow-hidden flex flex-col lg:flex-row items-center gap-10 md:gap-16 px-6 md:px-16 shadow-2xl"
          style={{ willChange: "opacity" }}
        >
          {/* Background Map - Next/Image optimized */}
          <div className="absolute inset-0 z-0 flex items-center justify-center opacity-10 pointer-events-none mix-blend-screen overflow-hidden">
            <div className="relative w-[200%] h-full">
               <Image src="/assets/global.png" alt="Global Reach" fill className="object-contain opacity-50" sizes="100vw" />
            </div>
          </div>

          <div className="relative z-10 w-full lg:w-[55%] text-center lg:text-left">
            <motion.div variants={wipeReveal}>
              <h2 className="text-3xl md:text-5xl lg:text-[3.5rem] font-serif font-bold text-white leading-snug md:leading-tight mb-4 md:mb-8">
                We are the India's first Academy to gain <br className="hidden lg:block"/> <span className="text-transparent bg-clip-text drop-shadow-md" style={{ backgroundImage: "linear-gradient(to right, #BF953F, #FCF6BA, #B38728)" }}>IAO Accreditation</span> for Facial Aesthetics training.
              </h2>
            </motion.div>
          </div>

          <div className="relative z-10 w-full lg:w-[45%]">
            <motion.div 
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
              className="grid grid-cols-2 gap-6 md:gap-8 items-center justify-items-center bg-white/5 backdrop-blur-2xl p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-white/20 shadow-inner"
            >
              {[ "/assets/iso.png", "/assets/iao.png", "/assets/iaf.png", "/assets/ias.png"].map((src, idx) => (
                <motion.div key={idx} variants={flipUp3D} className="relative w-20 h-16 md:w-32 md:h-24">
                   <Image src={src} alt="Accreditation" fill className="object-contain filter drop-shadow-lg hover:scale-110 transition-transform" sizes="150px" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* ---------------- 5. STATS & VISION ---------------- */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-10">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={flipUp3D}
            style={{ transformStyle: "preserve-3d", willChange: "transform, opacity" }}
            className="p-8 md:p-12 rounded-[2rem] md:rounded-[2.5rem] border border-[#BF953F]/40 bg-[linear-gradient(145deg,rgba(191,149,63,0.1)_0%,rgba(0,0,0,0)_100%)] backdrop-blur-2xl relative overflow-hidden shadow-2xl group"
          >
            <Award className="w-32 h-32 md:w-40 md:h-40 text-[#BF953F]/10 absolute -top-4 -right-4 transform group-hover:rotate-12 transition-transform duration-700" />
            <GoldText text="Our Vision" className="text-3xl md:text-4xl mb-4 md:mb-8 relative z-10" />
            <p className="text-white/80 leading-relaxed text-sm md:text-lg relative z-10 font-light">
              We strive in teaching the best non-surgical facial aesthetics across the country. Hence we ensure proper training and constant up-gradation of knowledge and skills.
            </p>
          </motion.div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={flipUp3D}
            style={{ transformStyle: "preserve-3d", willChange: "transform, opacity" }}
            className="p-8 md:p-12 rounded-[2rem] md:rounded-[2.5rem] border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl flex flex-col justify-center"
          >
            <h3 className="text-2xl md:text-3xl font-serif text-[#FBF5B7] mb-4 md:mb-6">First-Rate Courses</h3>
            <p className="text-white/70 leading-relaxed mb-6 md:mb-8 text-sm md:text-lg font-light">
              NSFA Aesthetic Academy is an IAF, IAS & ISO 9001:2015 certified standalone aesthetic training academy.
            </p>
            <div className="p-4 md:p-6 rounded-xl md:rounded-2xl bg-[#050914] border border-[#BF953F]/40 shadow-inner relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 md:w-2 bg-gradient-to-b from-[#BF953F] to-[#FCF6BA]" />
              <p className="text-white/90 font-medium text-center italic text-sm md:text-lg leading-relaxed md:leading-snug">
                "Elevating standards through world-class accreditation and uncompromising excellence."
              </p>
            </div>
          </motion.div>
        </div>

      </div>
    </main>
  );
}