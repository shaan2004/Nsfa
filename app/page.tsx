"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Award, BookOpen, Globe, Stethoscope, Briefcase, GraduationCap, Play, PlayCircle, Star, Volume2, VolumeX, Building2, Users, MonitorPlay, MessageCircle, ChevronDown, Sparkles, X, CheckCircle2 } from "lucide-react";

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

const VideoReelCard = ({ num }: { num: number }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (hasError) return;
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch((e) => {
          console.error("Video playback failed:", e);
          setHasError(true);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -10 }}
      whileTap={{ scale: 0.98 }}
      className="relative w-[260px] md:w-[300px] h-[460px] md:h-[533px] shrink-0 rounded-3xl overflow-hidden shadow-2xl cursor-pointer group transition-all duration-500 bg-black border-2 border-transparent hover:border-[#BF953F]/60 active:border-[#BF953F]/60 hover:shadow-[0_20px_50px_rgba(191,149,63,0.3)] active:shadow-[0_20px_50px_rgba(191,149,63,0.3)]"
      onClick={togglePlay}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 group-active:opacity-100 bg-[linear-gradient(145deg,#D4AF37_0%,#FFF2CD_45%,#AA771C_100%)] pointer-events-none transition-opacity duration-500 -z-10 scale-[1.02]" />

      {hasError && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-[#050914]">
          <p className="text-white/40 text-xs font-bold uppercase tracking-[0.2em] border border-white/10 px-4 py-2 rounded-full">
            Video Missing
          </p>
        </div>
      )}

      <video
        ref={videoRef}
        className={`w-full h-full object-cover relative z-10 ${hasError ? 'hidden' : 'block'}`}
        loop
        playsInline
        muted={isMuted}
        preload="metadata"
        onEnded={() => setIsPlaying(false)}
        onError={() => setHasError(true)}
      >
        <source src={`/assets/r${num}.mp4`} type="video/mp4" />
        <source src={`/assets/r${num}.mp4`} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {!hasError && (
        <div className={`absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/40 transition-opacity duration-300 ${isPlaying ? 'opacity-0' : 'opacity-100'}`}>
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/40 text-white shadow-[0_0_20px_rgba(0,0,0,0.5)] group-hover:bg-[#BF953F]/90 group-active:bg-[#BF953F]/90 group-hover:border-[#FBF5B7] group-active:border-[#FBF5B7] group-hover:text-[#040814] group-active:text-[#040814] transition-all duration-500">
            <PlayCircle size={32} className="ml-1" />
          </div>
          <p className="mt-4 text-white font-serif tracking-widest text-xs md:text-sm uppercase drop-shadow-md">
            {isPlaying ? '' : 'Tap to Play'}
          </p>
        </div>
      )}

      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-black/80 to-transparent z-20 pointer-events-none" />

      {isPlaying && !hasError && (
        <button
          onClick={toggleMute}
          className="absolute top-4 right-4 z-30 p-2 md:p-3 rounded-full bg-black/50 backdrop-blur-md text-white border border-white/20 hover:bg-[#BF953F] active:bg-[#BF953F] hover:text-[#040814] active:text-[#040814] transition-all"
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
      )}

      <div className="absolute bottom-0 left-0 w-full p-4 md:p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-20">
        <h4 className="text-lg md:text-xl font-bold text-white mb-1 group-hover:text-[#FBF5B7] group-active:text-[#FBF5B7] transition-colors">Success Story {num}</h4>
        <p className="text-white/80 text-xs md:text-sm font-light flex items-center gap-2">
           <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" /> Verified Alumni
        </p>
      </div>
    </motion.div>
  );
};

/* ---------------- ACTUAL BUSINESS DATA ---------------- */
const targetAudience = [
  { title: "Medical Professionals", desc: "MBBS, BDS, BHMS, BAMS, MAXFAX", icon: Stethoscope },
  { title: "Allied Health", desc: "Nurses, BPT (Physiotherapists)", icon: Users },
  { title: "Beauty Experts", desc: "Beauticians, Makeup Artists (MUA)", icon: Star },
  { title: "Clinic Owners", desc: "Salon & Clinic Entrepreneurs (KBAC)", icon: Building2 }
];

const advancedFeatures = [
  { id: 1, title: "8-in-1 Course", desc: "Only institute providing 8 CPD trainings in 1 comprehensive course.", x: 15, y: 15 },
  { id: 2, title: "Monopoly", desc: "Exclusive ISPMU Permanent Makeup Masterclass in Bangkok.", x: 85, y: 18 },
  { id: 3, title: "Free Internships", desc: "Guaranteed free internship benefits and hands-on practice.", x: 12, y: 48 },
  { id: 4, title: "Korea", desc: "Exclusive Korea University Programme. Only 30 seats per year.", x: 88, y: 45 },
  { id: 5, title: "Business Setup", desc: "Business & Entrepreneurship classes to open your own clinic.", x: 18, y: 78 },
  { id: 6, title: "Easy EMI", desc: "Highly accessible courses with flexible Easy EMI options.", x: 82, y: 75 },
  { id: 7, title: "Global Placement", desc: "100% Job Placement offers and career assistance globally.", x: 35, y: 92 },
  { id: 8, title: "Master Fellowship", desc: "Multi-level certifications across Dubai & South Korea.", x: 65, y: 90 },
];

const meshConnections = [
  [1, 3], [3, 5], [5, 7], [7, 8], [8, 6], [6, 4], [4, 2], [2, 1]
];

const courses = [
  { title: "Fellowship", loc: "Chennai", desc: "Facial Aesthetics & Clinical Cosmetology. 4 Batches/Yr.", badge: "8 CPDs in 1", icon: Award },
  { title: "Master Fellowship", loc: "Dubai / S. Korea", desc: "Multi-level global certification with international faculty.", badge: "Global Placement", icon: Globe },
  { title: "PMU Masterclass", loc: "Bangkok", desc: "ISPMU Permanent Makeup Masterclass. 2 Batches/Yr.", badge: "Monopoly", icon: Star },
  { title: "Korea University Programme", loc: "South Korea", desc: "Premium University Training. Only 30 seats per year.", badge: "Monopoly", icon: GraduationCap },
  { title: "PMU & Lashes", loc: "Chennai", desc: "Monthly PMU batches & 6 Eyelash batches per year.", badge: "Hands-on", icon: BookOpen },
];

const journeyFeatures = [
  { title: "8 CPDs in 1 Course", desc: "We are the only institute to provide 8 CPD training modules integrated into a single course.", icon: Award, color: "from-[#1A2D4A] to-[#080E21]" },
  { title: "Business & Internships", desc: "Free internship benefits plus exclusive Business & Entrepreneurship classes to launch your clinic.", icon: Briefcase, color: "from-[#BF953F] to-[#B38728]" },
  { title: "Accessible Learning", desc: "World-class education made accessible with flexible Easy EMI options and 100% placement assistance.", icon: Sparkles, color: "from-[#0F766E] to-[#042F2E]" }
];

const faqs = [
  { question: "Who is eligible to enroll in these aesthetic courses?", answer: "Our courses are specifically designed for MBBS, BDS, BHMS, BAMS, MAXFAX, Nurses, BPT, Beauticians, and Makeup Artists." },
  { question: "What is the fee structure and do you offer EMI?", answer: "Our average fees range from ₹35,000 to ₹90,000 depending on the course level. Yes, we offer Easy EMI options to make our world-class training accessible." },
  { question: "What does the Fellowship include?", answer: "The Fellowship (held in Chennai) includes Facial Aesthetics, Clinical/Medical Cosmetology, and Skin Aesthetics. We take only 20 students per batch, 4 times a year." },
  { question: "Do you offer international training?", answer: "Yes! We offer a Master Fellowship in Dubai/South Korea,PMU Masterclass in Bangkok, and a Korea University Programme." },
  { question: "Will I get help setting up my own clinic?", answer: "Absolutely. In addition to 100% job placement assistance, we provide specialized Business & Entrepreneurship classes to help you launch your own aesthetic clinic or salon." }
];

/* ---------------- ADVANCED ANIMATION VARIANTS ---------------- */
const wipeReveal: Variants = {
  hidden: { clipPath: "inset(0 100% 0 0)", opacity: 0 },
  visible: { clipPath: "inset(0 0% 0 0)", opacity: 1, transition: { duration: 1.2, ease: [0.77, 0, 0.175, 1] } }
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
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  
  // LEAD GEN POPUP STATE
  const [showLeadPopup, setShowLeadPopup] = useState(false);
  const [hasDismissedPopup, setHasDismissedPopup] = useState(false);
  const [popupSubmitted, setPopupSubmitted] = useState(false);

  const reviewsRef = useRef<HTMLDivElement>(null);
  const programsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // SCROLL LISTENER FOR LEAD POPUP
  useEffect(() => {
    const handleScroll = () => {
      // Triggers smoothly after the user scrolls down 800px 
      if (window.scrollY > 800 && !hasDismissedPopup && !showLeadPopup && !popupSubmitted) {
        setShowLeadPopup(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasDismissedPopup, showLeadPopup, popupSubmitted]);

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPopupSubmitted(true);
    setTimeout(() => {
      setShowLeadPopup(false);
      setHasDismissedPopup(true);
    }, 3000);
  };

  if (!mounted) return <main className="min-h-screen bg-[#080E21]"></main>;

  // NOTICE: Using a React Fragment to hold the Modal OUTSIDE the main tag.
  // This solves the CSS perspective fixed-positioning bug!
  return (
    <>
      {/* ---------------- LEAD GEN POPUP MODAL (Now positioned flawlessly) ---------------- */}
      <AnimatePresence>
        {showLeadPopup && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} transition={{ type: "spring", bounce: 0.4 }}
              className="w-full max-w-md bg-[#0A1128] border border-[#BF953F]/40 rounded-3xl shadow-[0_20px_60px_rgba(191,149,63,0.3)] relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-32 bg-[linear-gradient(135deg,rgba(191,149,63,0.2)_0%,rgba(0,0,0,0)_100%)] pointer-events-none" />
              
              <button 
                onClick={() => { setShowLeadPopup(false); setHasDismissedPopup(true); }}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/5 text-white/50 hover:text-white hover:bg-white/10 active:bg-white/10 transition-all z-20"
              >
                <X size={20} />
              </button>

              <div className="p-8 relative z-10">
                {!popupSubmitted ? (
                  <>
                    <h3 className="text-2xl font-serif font-bold text-white mb-2">Book Free Counseling</h3>
                    <p className="text-[#FBF5B7]/70 text-sm mb-6 font-light">Get exclusive syllabus details, EMI options, and admission guidance.</p>
                    
                    <form onSubmit={handleLeadSubmit} className="space-y-4">
                      <div>
                        <input type="text" required placeholder="Full Name" className="w-full bg-white/5 border border-white/10 text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-[#BF953F] focus:ring-1 focus:ring-[#BF953F] transition-all" />
                      </div>
                      <div>
                        <input type="tel" required placeholder="WhatsApp Number" className="w-full bg-white/5 border border-white/10 text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-[#BF953F] focus:ring-1 focus:ring-[#BF953F] transition-all" />
                      </div>
                      <div>
                        <select required defaultValue="" className="w-full bg-[#0A1128] border border-white/10 text-white/80 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-[#BF953F] focus:ring-1 focus:ring-[#BF953F] transition-all appearance-none">
                          <option value="" disabled>Select Your Profession</option>
                          <option value="doctor">Medical Doctor (MBBS, BDS, etc.)</option>
                          <option value="nurse">Nurse / Allied Health</option>
                          <option value="beautician">Beautician / MUA</option>
                          <option value="clinic_owner">Clinic / Salon Owner</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <button type="submit" className="w-full mt-4 py-3.5 rounded-xl bg-[linear-gradient(135deg,#BF953F,#FCF6BA,#B38728)] text-[#080E21] font-bold text-sm tracking-widest uppercase hover:scale-[1.02] active:scale-95 transition-all shadow-lg">
                        Request Counseling
                      </button>
                    </form>
                  </>
                ) : (
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center text-center py-8">
                    <div className="w-16 h-16 rounded-full bg-[#25D366]/20 flex items-center justify-center mb-4 text-[#25D366]">
                      <CheckCircle2 size={40} />
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-white mb-2">Request Received!</h3>
                    <p className="text-white/70 text-sm">Our academic counselor will reach out to you on WhatsApp shortly.</p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---------------- MAIN CONTENT WRAPPER ---------------- */}
      <main suppressHydrationWarning className="bg-[#080E21] text-white overflow-hidden min-h-screen relative perspective-[1000px]">
        
        {/* GLOBAL CSS OPTIMIZATIONS */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes infinite-scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(calc(-300px * 5 - 2rem * 5)); }
          }
          @media (max-width: 768px) {
            @keyframes infinite-scroll {
              0% { transform: translateX(0); }
              100% { transform: translateX(calc(-260px * 5 - 1rem * 5)); }
            }
          }
          .animate-programs {
            display: flex;
            width: max-content;
            animation: infinite-scroll 25s linear infinite;
            will-change: transform; 
          }
          .pause-on-hover:hover .animate-programs,
          .pause-on-hover:active .animate-programs,
          .pause-on-hover:focus-within .animate-programs {
            animation-play-state: paused;
          }
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
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
          .meteor:nth-child(1) { top: -10%; left: 30%; animation-duration: 4s; animation-delay: 0.5s; }
          .meteor:nth-child(2) { top: -20%; left: 80%; animation-duration: 5s; animation-delay: 2s; }
          .meteor:nth-child(3) { top: -10%; left: 110%; animation-duration: 6s; animation-delay: 1.5s; }
          .meteor:nth-child(4) { top: 30%; left: 120%; animation-duration: 4.5s; animation-delay: 3s; }
          .meteor:nth-child(5) { top: 60%; left: 110%; animation-duration: 5.5s; animation-delay: 0.8s; }
        `}} />

        {/* ---------------- SCARCITY TOP BANNER ---------------- */}
        <div className="bg-[linear-gradient(135deg,#BF953F,#FCF6BA,#B38728)] text-[#080E21] py-2 md:py-3 px-4 text-center z-50 relative flex items-center justify-center gap-2 md:gap-4 shadow-lg">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-40"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-black"></span>
          </span>
          <p className="text-[10px] md:text-sm font-bold uppercase tracking-wider">
            Admissions Open: Chennai Batch (Only 20 Seats) | Easy EMI Available
          </p>
        </div>

        {/* ---------------- 1. HERO SECTION ---------------- */}
        <section className="min-h-[95vh] flex items-center justify-center text-center px-4 relative overflow-hidden">
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

          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#0074A5]/30 blur-[150px] -z-10" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#BF953F]/20 blur-[150px] -z-10" />

          <motion.div 
            initial={{ opacity: 1, y: 0 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} exit={{ opacity: 0, scale: 0.95 }}
            className="max-w-6xl z-10 flex flex-col items-center pt-10"
          >
            <motion.h3 
              initial={{ opacity: 0, letterSpacing: "0.1em" }} animate={{ opacity: 1, letterSpacing: "0.4em" }} transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
              className="text-[#FBF5B7] uppercase mb-4 font-bold text-xs md:text-base drop-shadow-md tracking-widest"
            >
              Welcome to
            </motion.h3>

            <div className="overflow-hidden py-2 md:py-4 px-2">
              <motion.h1
                initial={{ y: "100%", clipPath: "inset(100% 0 0 0)" }} animate={{ y: "0%", clipPath: "inset(0% 0 0 0)" }} transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1], delay: 0.2 }}
                className="text-6xl md:text-9xl lg:text-[10rem] font-serif font-extrabold text-transparent bg-clip-text drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] leading-none"
                style={{ backgroundImage: "linear-gradient(to bottom right, #FCF6BA, #BF953F, #B38728)", willChange: "transform, clip-path" }}
              >
                NSFA
              </motion.h1>
            </div>
            
            <div className="overflow-hidden pb-2 md:pb-4">
              <motion.h1
                initial={{ y: "-100%", clipPath: "inset(0 0 100% 0)" }} animate={{ y: "0%", clipPath: "inset(0 0 0% 0)" }} transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1], delay: 0.4 }}
                className="text-5xl md:text-8xl lg:text-[7rem] font-serif font-bold text-transparent bg-clip-text drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] leading-none"
                style={{ backgroundImage: "linear-gradient(to top right, #FCF6BA, #BF953F, #B38728)", willChange: "transform, clip-path" }}
              >
                ACADEMY
              </motion.h1>
            </div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.2 }}
              className="mt-4 md:mt-8 text-white/90 text-lg md:text-4xl font-light italic font-serif tracking-wide px-4"
            >
              Zeal To Excellence In Aesthetics Science
            </motion.p>

            <motion.button
              onClick={() => router.push('/courses')}
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 1.5, type: "spring" }}
              whileHover={{ scale: 1.05, boxShadow: "0 10px 50px rgba(191,149,63,0.5)", y: -5 }} whileTap={{ scale: 0.95 }}
              className="mt-8 md:mt-14 px-8 py-4 md:px-14 md:py-5 rounded-full font-bold text-[#080E21] tracking-[0.2em] text-sm md:text-lg uppercase cursor-pointer shadow-xl border border-white/20 backdrop-blur-md"
              style={{ background: "linear-gradient(135deg, #BF953F 0%, #FCF6BA 50%, #B38728 100%)" }}
            >
              Explore Courses
            </motion.button>
          </motion.div>
        </section>

      {/* ---------------- 1.5 DESIGNED FOR (Target Audience) ---------------- */}
      <section className="py-12 md:py-20 relative bg-[#050914] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-2 md:px-4 text-center">
          <motion.h3 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="text-[#BF953F] tracking-[0.15em] md:tracking-[0.3em] uppercase text-[10px] md:text-sm font-bold mb-8 md:mb-12 drop-shadow-md"
          >
            Programs Exclusively Designed For
          </motion.h3>

          {/* Changed to strict 4-column grid for all screen sizes */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={{ visible: { transition: { staggerChildren: 0.2 } } }} 
            className="grid grid-cols-4 gap-2 sm:gap-4 md:gap-8 pb-4 items-start"
          >
            {targetAudience.map((audience, i) => (
              <motion.div 
                key={i} 
                variants={grandCardUp} 
                whileHover={{ y: -8 }} 
                // Severely reduced mobile padding so the shields fit side-by-side
                className="relative w-full pt-6 pb-8 px-1 md:pt-12 md:pb-16 md:px-6 flex flex-col items-center text-center group cursor-pointer drop-shadow-[0_10px_20px_rgba(191,149,63,0.2)] md:drop-shadow-[0_15px_30px_rgba(191,149,63,0.2)]"
              >
                {/* 1. Outer Golden Shield Shape */}
                <div 
                  className="absolute inset-0 bg-[linear-gradient(145deg,#BF953F,#FCF6BA,#B38728)] transition-all duration-500 group-hover:brightness-110 group-active:brightness-110"
                  style={{ clipPath: 'polygon(50% 0%, 100% 12%, 100% 75%, 50% 100%, 0 75%, 0 12%)' }}
                />
                
                {/* 2. Inner Golden Shield (Creates a premium inset border effect) */}
                <div 
                  className="absolute inset-[2px] md:inset-[3px] bg-[linear-gradient(135deg,#D4AF37,#FFF2CD,#AA771C)] transition-all duration-500"
                  style={{ clipPath: 'polygon(50% 0%, 100% 12%, 100% 75%, 50% 100%, 0 75%, 0 12%)' }}
                />

                {/* 3. Shield Content */}
                <div className="relative z-10 flex flex-col items-center h-full justify-start">
                  {/* Scaled down icon circle for mobile */}
                  <div className="w-8 h-8 md:w-16 md:h-16 rounded-full bg-[#080E21] flex items-center justify-center mb-2 md:mb-6 shadow-inner group-hover:scale-110 group-active:scale-110 transition-transform duration-300 shrink-0">
                    <audience.icon className="w-4 h-4 md:w-8 md:h-8 text-[#FBF5B7]" />
                  </div>
                  
                  {/* Scaled down typography for mobile */}
                  <h4 className="text-[9px] min-[400px]:text-[10px] sm:text-sm md:text-2xl font-serif font-bold text-[#080E21] mb-1 md:mb-3 leading-tight">
                    {audience.title}
                  </h4>
                  
                  {/* Kept description but made it tiny on mobile so it fits the narrow columns */}
                  <p className="text-[#080E21]/80 text-[6px] min-[400px]:text-[7px] sm:text-[10px] md:text-xs font-bold uppercase tracking-wider md:tracking-widest leading-tight md:leading-relaxed">
                    {audience.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

        {/* ---------------- 2. WHY CHOOSE US (Neurolink Active on Mobile & Desktop) ---------------- */}
        <section className="min-h-[100vh] py-24 relative overflow-hidden bg-[linear-gradient(180deg,#0B132A_0%,#050914_100%)] flex flex-col items-center justify-center">
          <div className="absolute top-[20%] left-[20%] w-[40%] h-[40%] rounded-full bg-[#BF953F]/10 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-[20%] right-[20%] w-[40%] h-[40%] rounded-full bg-[#0074A5]/10 blur-[120px] pointer-events-none" />
          
          <div className="relative z-20 flex flex-col items-center justify-center text-center max-w-3xl px-4 pointer-events-none mb-12">
            <motion.div initial={{ width: 0 }} whileInView={{ width: "100px" }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="h-[2px] bg-[#FFD700] mb-6 md:mb-8" />
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <GoldText text="Why NSFA Academy" className="text-4xl md:text-7xl lg:text-8xl mb-4 md:mb-6 pointer-events-auto drop-shadow-2xl" />
              <p className="text-white/70 text-base md:text-xl leading-relaxed font-light pointer-events-auto px-4">
                NSFA Academy is a globally recognized advanced aesthetic science academy. We are the ONLY institute offering true monopoly masterclasses and 8 CPDs in one course.
              </p>
            </motion.div>
            <motion.div initial={{ width: 0 }} whileInView={{ width: "100px" }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="h-[2px] bg-[#FFD700] mt-6 md:mt-8" />
          </div>

          <div className={`absolute inset-0 mt-32 md:mt-40 ${activeFeature ? 'pointer-events-none z-0' : 'pointer-events-auto z-20'}`}>
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
              <defs>
                <linearGradient id="neuro-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#BF953F" stopOpacity="0.5" />
                  <stop offset="50%" stopColor="#0074A5" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#FFD700" stopOpacity="0.5" />
                </linearGradient>
              </defs>
              {advancedFeatures.map((f) => (
                 <motion.line key={`spoke-${f.id}`} x1="50%" y1="50%" x2={`${f.x}%`} y2={`${f.y}%`} stroke="url(#neuro-grad)" strokeWidth="1.5" animate={{ opacity: [0.1, 0.8, 0.1] }} transition={{ repeat: Infinity, duration: 3 + (f.id % 3), ease: "easeInOut" }} style={{ willChange: "opacity" }} />
              ))}
              {meshConnections.map(([id1, id2], i) => {
                 const f1 = advancedFeatures.find(f => f.id === id1)!;
                 const f2 = advancedFeatures.find(f => f.id === id2)!;
                 return (
                   <motion.line key={`ring-${i}`} x1={`${f1.x}%`} y1={`${f1.y}%`} x2={`${f2.x}%`} y2={`${f2.y}%`} stroke="url(#neuro-grad)" strokeWidth="1" strokeDasharray="5 5" animate={{ opacity: [0.05, 0.5, 0.05] }} transition={{ repeat: Infinity, duration: 4 + (i % 2), ease: "easeInOut", delay: i * 0.4 }} style={{ willChange: "opacity" }} />
                 );
              })}
            </svg>
            
            {advancedFeatures.map((f, i) => (
              <motion.div key={f.id} layoutId={`feature-container-${f.id}`} onClick={() => setActiveFeature(f.id)} style={{ left: `${f.x}%`, top: `${f.y}%`, willChange: "transform" }} className="absolute -translate-x-1/2 -translate-y-1/2 w-max cursor-pointer z-20" animate={{ y: [0, -12, 0], x: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 4 + (i % 3), ease: "easeInOut", delay: i * 0.2 }} whileHover={{ scale: 1.1, zIndex: 30 }} whileTap={{ scale: 0.95 }}>
                <motion.div layoutId={`feature-bg-${f.id}`} className="relative overflow-hidden px-3 py-2 md:px-6 md:py-3 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.3)] border border-[#BF953F]/30 transition-colors duration-300 group">
                  <div className="absolute inset-0 bg-[#080E21]/80 backdrop-blur-xl transition-opacity duration-300 group-hover:opacity-0 group-active:opacity-0" />
                  <div className="absolute inset-0 bg-[linear-gradient(135deg,#BF953F,#FCF6BA,#B38728)] opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300" />
                  <motion.span layoutId={`feature-text-${f.id}`} className="relative z-10 text-[#FBF5B7] group-hover:text-[#080E21] group-active:text-[#080E21] font-serif font-bold text-[10px] md:text-base tracking-wide whitespace-nowrap drop-shadow-md group-hover:drop-shadow-none group-active:drop-shadow-none transition-colors duration-300">{f.title}</motion.span>
                </motion.div>
              </motion.div>
            ))}
          </div>

         {/* MODAL - Now optimized for Mobile & Desktop with Enquire Button */}
        <AnimatePresence>
          {activeFeature && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActiveFeature(null)} className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 cursor-pointer">
              {advancedFeatures.filter(f => f.id === activeFeature).map(f => (
                <motion.div key={f.id} layoutId={`feature-bg-${f.id}`} className="bg-[linear-gradient(135deg,#BF953F,#FCF6BA,#B38728)] p-6 md:p-10 rounded-3xl max-w-[90vw] md:max-w-lg w-full shadow-[0_20px_60px_rgba(191,149,63,0.6)] cursor-default text-center relative overflow-hidden" onClick={(e) => e.stopPropagation()}>
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay pointer-events-none" />
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }} exit={{ opacity: 0, transition: { duration: 0.1 } }} className="relative z-10 flex flex-col items-center">
                    <div className="w-12 md:w-16 h-1.5 md:h-2 bg-[#080E21]/20 rounded-full mb-6 md:mb-8" />
                    <motion.h3 layoutId={`feature-text-${f.id}`} className="text-2xl md:text-3xl font-serif font-bold text-[#080E21] mb-4 md:mb-6">{f.title}</motion.h3>
                    <p className="text-[#080E21]/90 text-base md:text-lg font-medium leading-relaxed">{f.desc}</p>
                    
                    {/* BUTTON CONTAINER - Added Enquire Now alongside Close */}
                    <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mt-8 md:mt-10 w-full justify-center">
                      <button 
                        onClick={() => window.open(`https://wa.me/919884718883?text=${encodeURIComponent(`Hello NSFA, I would like to know more about: ${f.title}.`)}`, '_blank')} 
                        className="px-6 py-3 md:px-8 rounded-full bg-[#080E21] text-[#FBF5B7] font-bold tracking-widest text-xs md:text-sm uppercase hover:scale-[1.02] active:scale-95 transition-all shadow-lg w-full sm:w-auto"
                      >
                        Enquire Now
                      </button>
                      <button 
                        onClick={() => setActiveFeature(null)} 
                        className="px-6 py-3 md:px-8 rounded-full border-2 border-[#080E21]/40 text-[#080E21] font-bold tracking-widest text-xs md:text-sm uppercase hover:bg-[#080E21] active:bg-[#080E21] hover:text-[#FBF5B7] active:text-[#FBF5B7] transition-all w-full sm:w-auto"
                      >
                        Close
                      </button>
                    </div>

                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        </section>

        {/* ---------------- 3. TO THE JOURNEY AHEAD ---------------- */}
        <section className="py-24 md:py-32 relative bg-white text-black overflow-hidden border-y-4 border-[#BF953F]">
          <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
            
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="space-y-6">
              <h3 className="text-[#8B6914] tracking-[0.2em] uppercase text-xs md:text-sm font-bold text-center lg:text-left">To The Journey Ahead</h3>
              <motion.div variants={wipeReveal} className="text-center lg:text-left">
                <DarkGoldText text="Gain Valuable Knowledge & Experience" className="text-3xl md:text-5xl lg:text-6xl leading-tight" />
              </motion.div>

              <div className="space-y-8 md:space-y-12 pt-4 md:pt-8">
                {journeyFeatures.map((item, idx) => (
                  <motion.div key={idx} custom={idx} variants={grandCardUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 md:gap-8 group cursor-default">
                    <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center shrink-0 bg-gradient-to-br ${item.color} shadow-xl group-hover:scale-110 group-active:scale-110 group-hover:rotate-6 group-active:rotate-6 transition-all duration-500`}>
                      <item.icon className="w-8 h-8 md:w-10 md:h-10 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xl md:text-3xl font-serif font-bold text-[#080E21] mb-2 md:mb-3 group-hover:text-[#8B6914] group-active:text-[#8B6914] transition-colors duration-300">{item.title}</h4>
                      <p className="text-gray-600 text-sm md:text-lg leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 1, type: "spring" }} 
              className="flex overflow-x-auto gap-4 snap-x snap-mandatory w-full h-[350px] no-scrollbar pb-4 md:grid md:grid-cols-2 md:grid-rows-2 md:h-[700px] md:gap-6 perspective-[1000px]"
            >
              <div className="min-w-[85vw] snap-center md:min-w-0 bg-[linear-gradient(135deg,#1A2D4A,#080E21)] p-6 md:p-10 rounded-3xl flex flex-col justify-center text-white shadow-2xl hover:-translate-y-4 active:-translate-y-4 md:hover:rotate-2 transition-all duration-500 cursor-pointer border border-[#1A2D4A]/50">
                <h4 className="text-2xl md:text-3xl font-serif font-bold mb-3 md:mb-4">Having any queries?</h4>
                <p className="text-white/80 text-sm md:text-base leading-relaxed">Ready to move into a fast-growing industry with multiple career path opportunities available?</p>
              </div>
              <div className="min-w-[85vw] snap-center md:min-w-0 rounded-3xl overflow-hidden shadow-2xl">
                <img src="/assets/j1.png" alt="Graduation" className="w-full h-full object-cover hover:scale-110 active:scale-110 transition-transform duration-700" loading="lazy" />
              </div>
              <div className="min-w-[85vw] snap-center md:min-w-0 rounded-3xl overflow-hidden shadow-2xl">
                <img src="/assets/j2.png" alt="Students Learning" className="w-full h-full object-cover hover:scale-110 active:scale-110 transition-transform duration-700" loading="lazy" />
              </div>
              <div className="min-w-[85vw] snap-center md:min-w-0 bg-[linear-gradient(135deg,#BF953F,#FCF6BA,#B38728)] p-6 md:p-10 rounded-3xl flex flex-col justify-center text-[#080E21] shadow-[0_20px_40px_rgba(191,149,63,0.4)] hover:-translate-y-4 active:-translate-y-4 md:hover:-rotate-2 transition-all duration-500 cursor-pointer">
                <h4 className="text-2xl md:text-3xl font-serif font-bold mb-3 md:mb-4">Connect with us!</h4>
                <p className="text-[#080E21]/80 text-sm md:text-base leading-relaxed font-bold">We are here to help you. It's time to earn your Aesthetician certification with NSFA Academy!</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ---------------- 4. PROGRAMS SECTION ---------------- */}
        <section className="py-24 md:py-32 relative bg-[linear-gradient(180deg,#080E21_0%,#0B132A_100%)] overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="meteor" /><div className="meteor" /><div className="meteor" /><div className="meteor" /><div className="meteor" />
          </div>

          <div className="max-w-7xl mx-auto px-4 text-center mb-10 md:mb-16 relative z-10">
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8, type: "spring", bounce: 0.4 }} className="space-y-4">
              <GoldText text="Explore Our Programs" className="text-4xl md:text-7xl py-2" />
              <p className="text-white/60 text-sm md:text-xl font-light mt-4 px-4">Touch to pause. Drag to explore our world-class curriculum.</p>
            </motion.div>
          </div>

          <div className="w-full overflow-hidden cursor-grab active:cursor-grabbing pb-16 pt-4 md:pt-8 pause-on-hover relative z-10" ref={programsRef}>
            <motion.div drag="x" dragConstraints={programsRef} className="animate-programs gap-4 md:gap-8 px-4">
              {[...courses, ...courses].map((c, i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ y: -10, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }} 
                  className="w-[260px] md:w-[320px] h-[340px] md:h-[400px] shrink-0 rounded-[2rem] relative overflow-hidden group flex flex-col items-center justify-start pt-8 md:pt-10 border border-white/10 shadow-2xl transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(255,215,0,0.3)] active:shadow-[0_30px_60px_-15px_rgba(255,215,0,0.3)]"
                >
                  <div className="absolute inset-0 bg-white/5 backdrop-blur-md transition-opacity duration-500 group-hover:opacity-0 group-active:opacity-0" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-500 bg-[linear-gradient(135deg,#BF953F,#FCF6BA,#B38728)]" />
                  
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm border border-[#BF953F]/50 text-[#FBF5B7] text-[10px] md:text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full z-20 group-hover:bg-white group-hover:text-black group-active:bg-white group-active:text-black transition-colors">
                    {c.badge}
                  </div>
                  
                  <div className="relative z-10 flex flex-col items-center text-center px-4 md:px-6 w-full h-full">
                    <div className="mb-4 md:mb-6 p-4 rounded-full bg-white/10 border border-white/20 group-hover:border-black/20 group-active:border-black/20 group-hover:bg-black/10 group-active:bg-black/10 transition-colors duration-500 shadow-inner">
                      <c.icon className="w-8 h-8 md:w-10 md:h-10 text-[#FBF5B7] group-hover:text-black group-active:text-black transition-colors duration-500" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-serif text-white group-hover:text-black group-active:text-black font-bold transition-colors duration-500 mb-2">
                      {c.title}
                    </h3>
                    <p className="text-xs md:text-sm text-[#BF953F] group-hover:text-black/70 group-active:text-black/70 font-bold uppercase tracking-widest mb-2 transition-colors duration-500">
                      📍 {c.loc}
                    </p>
                    <p className="text-xs md:text-sm text-white/60 group-hover:text-black/80 group-active:text-black/80 font-light mb-auto transition-colors duration-500">
                      {c.desc}
                    </p>

                    <div className="w-full flex flex-col gap-2 opacity-100 md:opacity-0 md:translate-y-4 md:group-hover:opacity-100 md:group-active:opacity-100 md:group-hover:translate-y-0 transition-all duration-500 pb-6 mt-4">
                      <button onClick={() => window.location.href = '/courses'} className="w-full py-2 md:py-2.5 rounded-xl bg-black/50 md:bg-black text-[#FBF5B7] font-bold text-[10px] md:text-xs tracking-widest uppercase hover:bg-white hover:text-black active:bg-white active:text-black transition-colors border border-white/10 md:border-none">
                        View Details
                      </button>
                      <button onClick={() => window.open(`https://wa.me/919884718883?text=${encodeURIComponent(`Hello NSFA, I'm interested in ${c.title} (${c.loc}).`)}`, '_blank')} className="w-full py-2 md:py-2.5 rounded-xl border border-white/30 md:border-black/30 text-white md:text-black font-bold text-[10px] md:text-xs tracking-widest uppercase hover:bg-black active:bg-black hover:text-[#FBF5B7] active:text-[#FBF5B7] transition-colors">
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

          <div className="max-w-7xl mx-auto px-4 relative z-10 w-full text-center flex flex-col items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="mb-12 md:mb-20 space-y-4 md:space-y-6">
              <motion.div variants={wipeReveal}>
                <GoldText text="Globally Recognised" className="text-4xl md:text-7xl lg:text-8xl leading-tight" />
              </motion.div>
              <motion.p variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { delay: 0.5 }}}} className="text-white/70 text-sm md:text-2xl leading-relaxed max-w-4xl mx-auto font-light px-4">
                Comprehensive training and upgradation of skills on a global scale.
              </motion.p>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={{ visible: { transition: { staggerChildren: 0.3 } } }} 
              className="flex flex-nowrap overflow-x-auto snap-x snap-mandatory md:flex-wrap justify-start md:justify-center gap-6 md:gap-16 items-center w-full no-scrollbar pb-8 md:pb-0"
            >
              {[{ src: "/assets/mets.png", w: "w-[240px] md:w-[280px]" }, { src: "/assets/mount.png", w: "w-[280px] md:w-[380px]", center: true }, { src: "/assets/meds.png", w: "w-[240px] md:w-[280px]" }].map((logo, i) => (
                <motion.div key={i} variants={grandCardUp} whileHover={{ y: -10, scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  className={`snap-center shrink-0 rounded-3xl flex items-center justify-center cursor-pointer transition-all duration-500 shadow-2xl backdrop-blur-xl ${logo.w} ${
                    logo.center ? 'p-8 md:p-10 border border-[#BF953F]/40 h-[160px] md:h-[200px] bg-[linear-gradient(145deg,rgba(191,149,63,0.15)_0%,rgba(0,0,0,0)_100%)] shadow-[0_20px_40px_-10px_rgba(191,149,63,0.3)]' : 'p-6 md:p-8 h-[120px] md:h-[160px] bg-white/5 border border-white/10 hover:border-[#BF953F]/30 active:border-[#BF953F]/30'
                  }`}
                >
                  <img src={logo.src} alt="Partner" className="max-w-[85%] max-h-[85%] object-contain" loading="lazy" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ---------------- 6. VIDEO REELS ---------------- */}
        <section className="py-24 md:py-32 relative bg-[#FAFAFA] text-black border-t-8 border-[#BF953F] overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 text-center mb-12 md:mb-20 relative z-10">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="space-y-4">
              <h3 className="text-[#8B6914] tracking-[0.2em] uppercase text-xs md:text-sm font-bold flex items-center justify-center gap-2">
                <Play className="w-4 h-4 md:w-5 md:h-5 fill-current" /> Watch Our Success Stories
              </h3>
              <motion.div variants={wipeReveal}>
                <DarkGoldText text="Student Experience" className="text-4xl md:text-7xl" />
              </motion.div>
              <motion.p variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { delay: 0.5 }}}} className="text-gray-600 text-sm md:text-xl max-w-3xl mx-auto font-light pt-2 md:pt-4 px-4">
                Swipe and click to watch real testimonials and clinical training experiences.
              </motion.p>
            </motion.div>
          </div>

          <div className="w-full overflow-hidden cursor-grab active:cursor-grabbing pb-16 pt-4 relative z-10 no-scrollbar" ref={reviewsRef}>
            <motion.div drag="x" dragConstraints={reviewsRef} className="flex gap-4 md:gap-8 px-4 md:px-10 w-max mx-auto">
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <VideoReelCard key={num} num={num} />
              ))}
            </motion.div>
          </div>
        </section>

        {/* ---------------- 7. FAQ SECTION ---------------- */}
        <section className="py-24 md:py-32 relative bg-[#050914] overflow-hidden border-t border-white/5">
          <div className="max-w-4xl mx-auto px-4 relative z-10">
            <div className="text-center mb-12 md:mb-20">
              <h3 className="text-[#BF953F] tracking-[0.2em] uppercase text-xs md:text-sm font-bold mb-4">Support</h3>
              <GoldText text="Frequently Asked Questions" className="text-3xl md:text-6xl" />
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <FAQItem key={idx} question={faq.question} answer={faq.answer} isOpen={openFaq === idx} onClick={() => setOpenFaq(openFaq === idx ? null : idx)} />
              ))}
            </div>
          </div>
        </section>

      </main>
    </>
  );
}

/* ---------------- FAQ ITEM COMPONENT ---------------- */
function FAQItem({ question, answer, isOpen, onClick }: { question: string, answer: string, isOpen: boolean, onClick: () => void }) {
  return (
    <div className={`border rounded-2xl transition-all duration-300 overflow-hidden ${isOpen ? 'border-[#BF953F]/50 bg-white/5 shadow-[0_10px_30px_rgba(191,149,63,0.1)]' : 'border-white/10 bg-transparent hover:bg-white/5'}`}>
      <button onClick={onClick} className="w-full px-6 py-5 flex items-center justify-between text-left outline-none">
        <span className={`font-serif font-bold text-base md:text-lg transition-colors ${isOpen ? 'text-[#FBF5B7]' : 'text-white'}`}>{question}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} className={`shrink-0 ml-4 p-1 rounded-full ${isOpen ? 'bg-[#BF953F] text-[#050914]' : 'bg-white/10 text-white'}`}>
          <ChevronDown size={18} />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <div className="px-6 pb-6 text-white/70 text-sm md:text-base leading-relaxed font-light border-t border-white/5 pt-4">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}