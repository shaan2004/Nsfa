"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, Variants , AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Award, BookOpen, Globe, Stethoscope, Briefcase, GraduationCap, Play, Star, Building2, Users, MonitorPlay, MessageCircle } from "lucide-react";

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

const DarkGoldText = ({ text, className = "" }: { text: string; className?: string }) => (
  <h2
    className={`font-serif font-bold text-transparent bg-clip-text ${className}`}
    style={{
      backgroundImage: "linear-gradient(to right, #8B6914, #B38728, #8B6914)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    }}
  >
    {text}
  </h2>
);

/* ---------------- INTERACTIVE VIDEO COMPONENT ---------------- */
const VideoReelCard = ({ num }: { num: number }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        // Only load the heavy video data when the user explicitly clicks to play
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -10, boxShadow: "0 25px 50px -12px rgba(191,149,63,0.3)" }}
      className="w-[320px] h-[550px] bg-black rounded-3xl overflow-hidden shadow-xl border-2 border-[#BF953F]/20 flex flex-col relative group transition-all duration-300 cursor-pointer"
      onClick={togglePlay}
      style={{ willChange: "transform, box-shadow" }} // OPTIMIZATION: GPU Acceleration
    >
      <video 
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
        loop 
        playsInline
        muted // OPTIMIZATION: Muted videos initialize faster
        preload="metadata" // OPTIMIZATION: Don't download the whole video on page load, just the first frame
      >
        <source src={`/assets/r${num}.mp4`} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className={`absolute inset-0 transition-opacity duration-500 pointer-events-none ${isPlaying ? 'opacity-0' : 'opacity-100'}`}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
            <Play className="w-8 h-8 text-white ml-1" fill="white" />
          </div>
        </div>

        <div className="absolute top-6 left-6 flex gap-2 z-10">
          <span className="px-3 py-1 bg-black/50 backdrop-blur-md border border-[#BF953F]/50 rounded-full text-xs font-bold text-[#FBF5B7] uppercase tracking-wider">
            NSFA
          </span>
        </div>
      </div>
    </motion.div>
  );
};

/* ---------------- DATA ARRAYS ---------------- */
const advancedFeatures = [
  { id: 1, title: "Global Certifications", desc: "Globally Recognised Certifications from IAO, ISO, IAF, BSS & UK Boards.", x: 15, y: 15 },
  { id: 2, title: "Affordable 8-in-1", desc: "Highly affordable 8 in 1 Course with Individual Certification.", x: 85, y: 18 },
  { id: 3, title: "Student Exchange", desc: "Exchange Programs with International Universities (Sweden, Turkey, Dubai, UK).", x: 12, y: 48 },
  { id: 4, title: "Dual Degree", desc: "First in India to Launch Dual Degree Certification.", x: 88, y: 45 },
  { id: 5, title: "Job Placement", desc: "100% Job Placement offers and career assistance.", x: 18, y: 78 },
  { id: 6, title: "Cosmetic Medicine", desc: "First in India to Launch Cosmetic Medicine Courses.", x: 82, y: 75 },
  { id: 7, title: "Research Ops", desc: "India's Only course for Facial Aesthetics with Research opportunities.", x: 35, y: 92 },
  { id: 8, title: "Pioneer Training", desc: "Training by true Pioneers in the field of Aesthetics and Dentistry.", x: 65, y: 90 },
];

const meshConnections = [
  [1, 3], [3, 5], [5, 7], [7, 8], [8, 6], [6, 4], [4, 2], [2, 1]
];

const courses = [
  { title: "Diploma Courses", icon: BookOpen },
  { title: "Fellowship Courses", icon: Award },
  { title: "Mastership Courses", icon: GraduationCap },
  { title: "PG Certification", icon: Globe },
  { title: "Dental Science", icon: Stethoscope },
];

const marquee = [...courses, ...courses, ...courses];

const journeyFeatures = [
  { title: "Hands on Experience", desc: "Get Hands on experience with Live practical sessions", icon: Building2, color: "from-[#1A2D4A] to-[#080E21]" },
  { title: "Expert Training", desc: "Get trained from the experts in the field of Aesthetics", icon: Users, color: "from-[#BF953F] to-[#B38728]" },
  { title: "Webinars / Online Courses", desc: "Get informed with the latest trends in the field of Aesthetics", icon: MonitorPlay, color: "from-[#0F766E] to-[#042F2E]" }
];

/* ---------------- ADVANCED ANIMATION VARIANTS ---------------- */
const wordReveal: Variants = {
  hidden: { opacity: 0, y: 50, filter: "blur(10px)" },
  visible: (i: number) => ({
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { delay: i * 0.15, duration: 0.8, type: "spring", stiffness: 50 },
  }),
};

const wipeReveal: Variants = {
  hidden: { clipPath: "inset(0 100% 0 0)", opacity: 0 },
  visible: { 
    clipPath: "inset(0 0% 0 0)", opacity: 1, 
    transition: { duration: 1.2, ease: [0.77, 0, 0.175, 1] } 
  }
};

const grandCardUp: Variants = {
  hidden: { opacity: 0, y: 80, scale: 0.9, rotateX: 15 },
  visible: (i: number) => ({
    opacity: 1, y: 0, scale: 1, rotateX: 0,
    transition: { delay: i * 0.15, duration: 0.8, type: "spring", bounce: 0.4 },
  }),
};

/* ---------------- PAGE ---------------- */
export default function Home() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [activeFeature, setActiveFeature] = useState<number | null>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);
  const programsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <main className="min-h-screen bg-[#080E21]"></main>;

  return (
    <main suppressHydrationWarning className="bg-[#080E21] text-white overflow-hidden min-h-screen relative perspective-[1000px]">
      
     

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes infinite-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-250px * 5 - 1.5rem * 5)); }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: infinite-scroll 25s linear infinite;
          will-change: transform; /* OPTIMIZATION: Force hardware acceleration */
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}} />

    {/* ---------------- 1. HERO SECTION ---------------- */}
      <section className="min-h-[100vh] flex items-center justify-center text-center px-4 relative overflow-hidden">
        
        {/* SLIDER BACKGROUND IMAGES */}
        <div className="absolute inset-0 -z-30 bg-[#050914]">
          {[1, 2].map((num, i) => (
            <motion.div
              key={i}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('/assets/hero${num}.png')`, willChange: "opacity, transform" }}
              animate={{ opacity: [0, 1, 1, 0, 0], scale: [1.05, 1, 1, 1.05, 1.05] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", times: [0, 0.1, 0.33, 0.43, 1], delay: i * 5 }}
            />
          ))}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,9,20,0.7)_0%,rgba(8,14,33,0.9)_100%)] mix-blend-multiply" />
        </div>

        {/* Ambient Lights */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#0074A5]/30 blur-[150px] -z-10" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#BF953F]/20 blur-[150px] -z-10" />

        <motion.div 
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} // OPTIMIZATION: Stop tracking after it appears
          exit={{ opacity: 0, scale: 0.95 }}
          className="max-w-6xl z-10 flex flex-col items-center pt-20"
        >
          <motion.h3 
            initial={{ opacity: 0, letterSpacing: "0.1em" }} animate={{ opacity: 1, letterSpacing: "0.4em" }} transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
            className="text-[#FBF5B7] uppercase mb-4 font-bold text-sm md:text-base drop-shadow-md tracking-widest"
          >
            Welcome to
          </motion.h3>

          <div className="overflow-hidden py-4 px-2">
            <motion.h1
              initial={{ y: "100%", clipPath: "inset(100% 0 0 0)" }} animate={{ y: "0%", clipPath: "inset(0% 0 0 0)" }} transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1], delay: 0.2 }}
              className="text-7xl md:text-9xl lg:text-[10rem] font-serif font-extrabold text-transparent bg-clip-text drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] leading-none"
              style={{ backgroundImage: "linear-gradient(to bottom right, #FCF6BA, #BF953F, #B38728)", willChange: "transform, clip-path" }}
            >
              NSFA
            </motion.h1>
          </div>
          
          <div className="overflow-hidden pb-4">
            <motion.h1
              initial={{ y: "-100%", clipPath: "inset(0 0 100% 0)" }} animate={{ y: "0%", clipPath: "inset(0 0 0% 0)" }} transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1], delay: 0.4 }}
              className="text-6xl md:text-8xl lg:text-[7rem] font-serif font-bold text-transparent bg-clip-text drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] leading-none"
              style={{ backgroundImage: "linear-gradient(to top right, #FCF6BA, #BF953F, #B38728)", willChange: "transform, clip-path" }}
            >
              ACADEMY
            </motion.h1>
          </div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-8 text-white/90 text-2xl md:text-4xl font-light italic font-serif tracking-wide"
          >
            Zeal To Excellence In Aesthetics Science
          </motion.p>

          <motion.button
            onClick={() => router.push('/courses')} // <-- Added onClick routing
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 1.5, type: "spring" }}
            whileHover={{ scale: 1.05, boxShadow: "0 10px 50px rgba(191,149,63,0.5)", y: -5 }} whileTap={{ scale: 0.95 }}
            className="mt-14 px-14 py-5 rounded-full font-bold text-[#080E21] tracking-[0.2em] text-lg uppercase cursor-pointer shadow-xl border border-white/20 backdrop-blur-md"
            style={{ background: "linear-gradient(135deg, #BF953F 0%, #FCF6BA 50%, #B38728 100%)" }}
          >
            Explore Courses
          </motion.button>
        </motion.div>
      </section>

   {/* ---------------- 2. WHY CHOOSE US (Neurolink Floating Network) ---------------- */}
      <section className="min-h-[100vh] py-24 relative overflow-hidden bg-[linear-gradient(180deg,#0B132A_0%,#050914_100%)] flex items-center justify-center hidden md:flex">
        
        <div className="absolute top-[20%] left-[20%] w-[40%] h-[40%] rounded-full bg-[#BF953F]/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[20%] right-[20%] w-[40%] h-[40%] rounded-full bg-[#0074A5]/10 blur-[120px] pointer-events-none" />

        <div className="relative z-20 flex flex-col items-center justify-center text-center max-w-3xl px-4 pointer-events-none">
          <motion.div initial={{ width: 0 }} whileInView={{ width: "100px" }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="h-[2px] bg-[#FFD700] mb-8" />
          
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <GoldText text="Why NSFA Academy" className="text-5xl md:text-7xl lg:text-8xl mb-6 pointer-events-auto drop-shadow-2xl" />
            <p className="text-white/70 text-lg md:text-xl leading-relaxed font-light pointer-events-auto">
              NSFA Academy is a globally recognized advanced aesthetic science & dental academy. The academy provides immersive programs designed to educate medical professionals on the latest innovations in the industry.
            </p>
          </motion.div>

          <motion.div initial={{ width: 0 }} whileInView={{ width: "100px" }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="h-[2px] bg-[#FFD700] mt-8" />
        </div>

        <div className={`absolute inset-0 ${activeFeature ? 'pointer-events-none z-0' : 'pointer-events-auto z-20'}`}>
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
            <defs>
              <linearGradient id="neuro-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#BF953F" stopOpacity="0.5" />
                <stop offset="50%" stopColor="#0074A5" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#FFD700" stopOpacity="0.5" />
              </linearGradient>
            </defs>
            
            {advancedFeatures.map((f) => (
               <motion.line
                  key={`spoke-${f.id}`} x1="50%" y1="50%" x2={`${f.x}%`} y2={`${f.y}%`} stroke="url(#neuro-grad)" strokeWidth="1.5"
                  animate={{ opacity: [0.1, 0.8, 0.1] }} transition={{ repeat: Infinity, duration: 3 + (f.id % 3), ease: "easeInOut" }}
                  style={{ willChange: "opacity" }} // OPTIMIZATION
               />
            ))}
            
            {meshConnections.map(([id1, id2], i) => {
               const f1 = advancedFeatures.find(f => f.id === id1)!;
               const f2 = advancedFeatures.find(f => f.id === id2)!;
               return (
                 <motion.line
                    key={`ring-${i}`} x1={`${f1.x}%`} y1={`${f1.y}%`} x2={`${f2.x}%`} y2={`${f2.y}%`} stroke="url(#neuro-grad)" strokeWidth="1" strokeDasharray="5 5"
                    animate={{ opacity: [0.05, 0.5, 0.05] }} transition={{ repeat: Infinity, duration: 4 + (i % 2), ease: "easeInOut", delay: i * 0.4 }}
                    style={{ willChange: "opacity" }} // OPTIMIZATION
                 />
               );
            })}
          </svg>

          {advancedFeatures.map((f, i) => (
            <motion.div
              key={f.id} layoutId={`feature-container-${f.id}`} onClick={() => setActiveFeature(f.id)}
              style={{ left: `${f.x}%`, top: `${f.y}%`, willChange: "transform" }}
              className="absolute -translate-x-1/2 -translate-y-1/2 w-max cursor-pointer z-20"
              animate={{ y: [0, -12, 0], x: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 4 + (i % 3), ease: "easeInOut", delay: i * 0.2 }}
              whileHover={{ scale: 1.1, zIndex: 30 }}
            >
              <motion.div layoutId={`feature-bg-${f.id}`} className="relative overflow-hidden px-6 py-3 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.3)] border border-[#BF953F]/30 transition-colors duration-300 group">
                <div className="absolute inset-0 bg-[#080E21]/60 backdrop-blur-xl transition-opacity duration-300 group-hover:opacity-0" />
                <div className="absolute inset-0 bg-[linear-gradient(135deg,#BF953F,#FCF6BA,#B38728)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <motion.span layoutId={`feature-text-${f.id}`} className="relative z-10 text-[#FBF5B7] group-hover:text-[#080E21] font-serif font-bold tracking-wide whitespace-nowrap drop-shadow-md group-hover:drop-shadow-none transition-colors duration-300">
                  {f.title}
                </motion.span>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {activeFeature && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActiveFeature(null)} className="absolute inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 cursor-pointer">
              {advancedFeatures.filter(f => f.id === activeFeature).map(f => (
                <motion.div key={f.id} layoutId={`feature-bg-${f.id}`} className="bg-[linear-gradient(135deg,#BF953F,#FCF6BA,#B38728)] p-10 rounded-3xl max-w-lg w-full shadow-[0_20px_60px_rgba(191,149,63,0.6)] cursor-default text-center relative overflow-hidden" onClick={(e) => e.stopPropagation()}>
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay pointer-events-none" />
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }} exit={{ opacity: 0, transition: { duration: 0.1 } }} className="relative z-10 flex flex-col items-center">
                    <div className="w-16 h-2 bg-[#080E21]/20 rounded-full mb-8" />
                    <motion.h3 layoutId={`feature-text-${f.id}`} className="text-3xl font-serif font-bold text-[#080E21] mb-6">{f.title}</motion.h3>
                    <p className="text-[#080E21]/90 text-lg font-medium leading-relaxed">{f.desc}</p>
                    <button onClick={() => setActiveFeature(null)} className="mt-10 px-8 py-3 rounded-full border-2 border-[#080E21]/40 text-[#080E21] font-bold tracking-widest uppercase hover:bg-[#080E21] hover:text-[#FBF5B7] transition-all">Close Details</button>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ---------------- 3. TO THE JOURNEY AHEAD ---------------- */}
      <section className="py-32 relative bg-white text-black overflow-hidden border-y-4 border-[#BF953F]">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-20 items-center">
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="space-y-6">
            <h3 className="text-[#8B6914] tracking-[0.2em] uppercase text-sm font-bold">To The Journey Ahead</h3>
            <motion.div variants={wipeReveal}>
              <DarkGoldText text="Gain Valuable Knowledge & Experience" className="text-4xl md:text-6xl leading-tight" />
            </motion.div>

            <div className="space-y-12 pt-8">
              {journeyFeatures.map((item, idx) => (
                <motion.div key={idx} custom={idx} variants={grandCardUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex items-start gap-8 group cursor-default">
                  <div className={`w-20 h-20 rounded-2xl flex items-center justify-center shrink-0 bg-gradient-to-br ${item.color} shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                    <item.icon className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <h4 className="text-3xl font-serif font-bold text-[#080E21] mb-3 group-hover:text-[#8B6914] transition-colors duration-300">{item.title}</h4>
                    <p className="text-gray-600 text-lg leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.8, rotateY: 20 }} whileInView={{ opacity: 1, scale: 1, rotateY: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 1, type: "spring" }} className="grid grid-cols-2 grid-rows-2 gap-6 h-[700px] perspective-[1000px]">
            <div className="bg-[linear-gradient(135deg,#1A2D4A,#080E21)] p-10 rounded-3xl flex flex-col justify-center text-white shadow-2xl hover:-translate-y-4 hover:rotate-2 transition-all duration-500 cursor-pointer border border-[#1A2D4A]/50">
              <h4 className="text-3xl font-serif font-bold mb-4">Having any queries?</h4>
              <p className="text-white/80 text-base leading-relaxed">Ready to move into a fast-growing industry with multiple career path opportunities available?</p>
            </div>
            <div className="rounded-3xl overflow-hidden shadow-2xl"><img src="/assets/j1.png" alt="Graduation" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" loading="lazy" /></div>
            <div className="rounded-3xl overflow-hidden shadow-2xl"><img src="/assets/j2.png" alt="Students Learning" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" loading="lazy" /></div>
            <div className="bg-[linear-gradient(135deg,#BF953F,#FCF6BA,#B38728)] p-10 rounded-3xl flex flex-col justify-center text-[#080E21] shadow-[0_20px_40px_rgba(191,149,63,0.4)] hover:-translate-y-4 hover:-rotate-2 transition-all duration-500 cursor-pointer">
              <h4 className="text-3xl font-serif font-bold mb-4">Connect with us!</h4>
              <p className="text-[#080E21]/80 text-base leading-relaxed font-bold">We are here to help you. It's time to earn your Aesthetician certification with NSFA Academy!</p>
            </div>
          </motion.div>
        </div>
      </section>

    {/* ---------------- 4. PROGRAMS SECTION (Marquee with Meteors) ---------------- */}
      <section className="py-32 relative bg-[linear-gradient(180deg,#080E21_0%,#0B132A_100%)] overflow-hidden">
        
        {/* INJECTED CSS FOR INFINITE SCROLL & METEORS */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes scroll-left {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); } /* Scrolls exactly half the width before snapping back perfectly */
          }
          
          .animate-programs {
            display: flex;
            width: max-content;
            animation: scroll-left 40s linear infinite; /* Slower, smoother duration */
            will-change: transform; /* Hardware Acceleration */
            backface-visibility: hidden;
            -webkit-font-smoothing: antialiased;
          }
          
          .pause-on-hover:hover .animate-programs {
            animation-play-state: paused;
          }

          /* --- GOLDEN METEORS --- */
          @keyframes meteor-fall {
            0% { transform: translate(0, 0) rotate(45deg); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translate(-100vw, 100vh) rotate(45deg); opacity: 0; }
          }

          .meteor {
            position: absolute;
            width: 150px;
            height: 2px;
            background: linear-gradient(90deg, rgba(255,215,0,0) 0%, rgba(255,215,0,0.8) 100%);
            animation: meteor-fall linear infinite;
            will-change: transform, opacity;
            pointer-events: none;
            opacity: 0;
            z-index: 0;
          }
          /* Create varying speeds and starting positions for meteors */
          .meteor:nth-child(1) { top: -10%; left: 30%; animation-duration: 4s; animation-delay: 0.5s; }
          .meteor:nth-child(2) { top: -20%; left: 80%; animation-duration: 5s; animation-delay: 2s; }
          .meteor:nth-child(3) { top: -10%; left: 110%; animation-duration: 6s; animation-delay: 1.5s; }
          .meteor:nth-child(4) { top: 30%; left: 120%; animation-duration: 4.5s; animation-delay: 3s; }
          .meteor:nth-child(5) { top: 60%; left: 110%; animation-duration: 5.5s; animation-delay: 0.8s; }
        `}} />

        {/* METEOR ELEMENTS */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="meteor" />
          <div className="meteor" />
          <div className="meteor" />
          <div className="meteor" />
          <div className="meteor" />
        </div>

        <div className="max-w-7xl mx-auto px-4 text-center mb-16 relative z-10">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8, type: "spring", bounce: 0.4 }} className="space-y-4">
            <GoldText text="Explore Our Programs" className="text-5xl md:text-7xl py-2" />
            <p className="text-white/60 text-xl font-light mt-4">Hover to pause. Drag to explore our world-class curriculum.</p>
          </motion.div>
        </div>

        {/* OPTIMIZED SCROLLING CONTAINER */}
        <div className="w-full overflow-hidden cursor-grab active:cursor-grabbing pb-16 pt-8 pause-on-hover relative z-10" ref={programsRef}>
          <motion.div 
            drag="x" 
            dragConstraints={programsRef} 
            className="animate-programs gap-8 px-4" 
          >
            {/* Render the courses array TWICE to create a seamless infinite loop */}
            {[...courses, ...courses].map((c, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -15, scale: 1.05, boxShadow: "0 30px 60px -15px rgba(255,215,0,0.3)" }} 
                className="w-[300px] h-[360px] shrink-0 rounded-[2rem] relative overflow-hidden group flex flex-col items-center justify-start pt-12 border border-white/10 shadow-2xl transition-all duration-500"
              >
                <div className="absolute inset-0 bg-white/5 backdrop-blur-md transition-opacity duration-500 group-hover:opacity-0" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[linear-gradient(135deg,#BF953F,#FCF6BA,#B38728)]" />
                
                <div className="relative z-10 flex flex-col items-center text-center px-8 w-full h-full">
                  
                  {/* Icon & Title Group */}
                  <div className="mb-6 p-5 rounded-full bg-white/10 border border-white/20 group-hover:border-black/20 group-hover:bg-black/10 transition-colors duration-500 shadow-inner">
                    <c.icon className="w-12 h-12 text-[#FBF5B7] group-hover:text-black transition-colors duration-500" />
                  </div>
                  <h3 className="text-2xl font-serif text-white group-hover:text-black font-bold transition-colors duration-500 mb-auto">
                    {c.title}
                  </h3>

                  {/* Action Buttons (Fades in on hover) */}
                  <div className="w-full flex flex-col gap-3 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 pb-8">
                    
                    {/* View Details Button */}
                    <button 
                      onClick={() => window.location.href = '/courses'}
                      className="w-full py-2.5 rounded-xl bg-black text-[#FBF5B7] font-bold text-xs tracking-widest uppercase hover:bg-white hover:text-black transition-colors shadow-lg"
                    >
                      View Details
                    </button>
                    
                    {/* Enquire Button */}
                    <button 
                      onClick={() => {
                        const message = `Hello NSFA Academy, I am interested in learning more about the ${c.title}.`;
                        window.open(`https://wa.me/919884718883?text=${encodeURIComponent(message)}`, '_blank');
                      }}
                      className="w-full py-2.5 rounded-xl border border-black/30 text-black font-bold text-xs tracking-widest uppercase hover:bg-black hover:text-[#FBF5B7] transition-colors"
                    >
                      Enquire Now
                    </button>

                  </div>

                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

     {/* ---------------- 5. GLOBALLY RECOGNISED ---------------- */}
      <section className="py-24 relative overflow-hidden bg-[#050914] flex flex-col items-center justify-center">
        <div className="absolute inset-0 z-0 flex items-center justify-center opacity-30 mix-blend-screen pointer-events-none">
          <img src="/assets/map.png" alt="World Map" className="w-[100%] max-w-[1600px] object-contain drop-shadow-[0_0_30px_rgba(191,149,63,0.3)]" loading="lazy" />
        </div>
        <div className="absolute top-[20%] left-[50%] -translate-x-1/2 w-[60%] h-[60%] rounded-full bg-[#BF953F]/10 blur-[200px] -z-10 pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 relative z-10 w-full text-center flex flex-col items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="mb-20 space-y-6">
            <motion.div variants={wipeReveal}>
              <GoldText text="Globally Recognised Certifications" className="text-6xl md:text-7xl lg:text-8xl leading-tight" />
            </motion.div>
            <motion.p variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { delay: 0.5 }}}} className="text-white/70 text-2xl leading-relaxed max-w-4xl mx-auto font-light">
              We ensure comprehensive training and upgradation of knowledge and skills on a global scale.
            </motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={{ visible: { transition: { staggerChildren: 0.3 } } }} className="flex flex-wrap justify-center gap-10 lg:gap-16 items-center w-full">
            {[{ src: "/assets/mets.png", w: "w-[280px]" }, { src: "/assets/mount.png", w: "w-[380px]", center: true }, { src: "/assets/meds.png", w: "w-[280px]" }].map((logo, i) => (
              <motion.div 
                key={i} 
                variants={grandCardUp} 
                whileHover={{ y: -15, scale: 1.05, boxShadow: logo.center ? "0 30px 60px -10px rgba(191,149,63,0.4)" : "0 20px 50px -10px rgba(191,149,63,0.2)" }} 
                className={`rounded-3xl flex items-center justify-center cursor-pointer transition-all duration-500 shadow-2xl backdrop-blur-xl ${logo.w} ${
                  logo.center 
                    ? 'p-10 border border-[#BF953F]/40 h-[200px] bg-[linear-gradient(145deg,rgba(191,149,63,0.15)_0%,rgba(0,0,0,0)_100%)]' 
                    : 'p-8 h-[160px] bg-white/5 border border-white/10 hover:border-[#BF953F]/30 hover:bg-white/10'
                }`}
              >
                <img src={logo.src} alt="Partner" className="max-w-[85%] max-h-[85%] object-contain" loading="lazy" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ---------------- 6. VIDEO REELS ---------------- */}
      <section className="py-32 relative bg-[#FAFAFA] text-black border-t-8 border-[#BF953F] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 text-center mb-20 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="space-y-4">
            <h3 className="text-[#8B6914] tracking-[0.2em] uppercase text-sm font-bold flex items-center justify-center gap-2">
              <Play className="w-5 h-5 fill-current" /> Watch Our Success Stories
            </h3>
            <motion.div variants={wipeReveal}>
              <DarkGoldText text="Student Experience" className="text-5xl md:text-7xl" />
            </motion.div>
            <motion.p variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { delay: 0.5 }}}} className="text-gray-600 text-xl max-w-3xl mx-auto font-light pt-4">
              Swipe and click to watch real testimonials and clinical training experiences from our alumni across the globe.
            </motion.p>
          </motion.div>
        </div>

        <div className="w-full overflow-hidden cursor-grab active:cursor-grabbing pb-16 pt-4 relative z-10" ref={reviewsRef}>
          <motion.div drag="x" dragConstraints={reviewsRef} className="flex gap-8 px-10 w-max mx-auto" style={{ willChange: "transform" }}>
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <VideoReelCard key={num} num={num} />
            ))}
          </motion.div>
        </div>
      </section>

    </main>
  );
}