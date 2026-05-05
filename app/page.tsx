"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, Variants, AnimatePresence, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useRouter } from "next/navigation";
import Aurora from '../components/ui/Aurora/Aurora';
import BounceCards from '../components/ui/BounceCards/BounceCards'; // Adjust path if needed
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

/* ---------------- COUNTING NUMBER COMPONENT ---------------- */
function Counter({ from, to, duration = 2, suffix = "" }: { from: number; to: number; duration?: number; suffix?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => Math.round(latest) + suffix);

  useEffect(() => {
    if (inView) {
      animate(count, to, { duration, ease: "easeOut" });
    }
  }, [inView, count, to, duration]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

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

const aestheticCourses = [
  { title: "PG Diploma", loc: "Clinical Cosmetology", desc: "Clinical Cosmetology, Trichology & Nutraceuticals.", badge: "Diploma", icon: BookOpen },
  { title: "PG Diploma", loc: "Facial Aesthetics", desc: "Non Surgical Facial Aesthetics, Bariatric Science & Nutrition.", badge: "Diploma", icon: Award },
  { title: "Fellowship", loc: "Medical Cosmetology", desc: "Non Surgical Facial Aesthetics & Aesthetic/Cosmetic Medicine.", badge: "Fellowship", icon: Globe },
  { title: "Mastership", loc: "Advanced Transformation", desc: "Non Surgical Hair restoration & Nutrigenomics.", badge: "Mastership", icon: GraduationCap },
  { title: "M.SC", loc: "Facial Aesthetics", desc: "M.SC in Facial Aesthetics, Cosmetology & Aesthetic Medicine.", badge: "Degree", icon: Briefcase },
  { title: "PG Certification", loc: "Advanced Lasers", desc: "Chemical Peels, Medifacial & Trichology.", badge: "Certificate", icon: Sparkles },
  { title: "PG Certification", loc: "Botulinum Toxin", desc: "Dermal Fillers, Fibroblast Pen & Biostimulation.", badge: "Certificate", icon: Stethoscope },
  { title: "PG Certification", loc: "Clinical Nutrition", desc: "Derma Planning & Cosmeceutical Formation Science.", badge: "Certificate", icon: Users },
];

const dentalCourses = [
  { title: "Fellowship", loc: "Laser Dentistry", desc: "Fellowship In Laser Dentistry.", badge: "Dental", icon: Stethoscope },
  { title: "Fellowship", loc: "Cosmetic Dentistry", desc: "Fellowship In Cosmetic Dentistry & Orthodontics.", badge: "Dental", icon: Award },
  { title: "Mastership", loc: "Implantology", desc: "Mastership In Implantology.", badge: "Dental", icon: Globe },
  { title: "Mastership", loc: "Aesthetic Dentistry", desc: "Mastership In Aesthetic Dentistry (3 In 1) Course.", badge: "Dental", icon: GraduationCap },
  { title: "Mastership", loc: "Endodontics", desc: "Mastership In Endodontics & Comprehensive Clinical Dentistry.", badge: "Dental", icon: BookOpen },
  { title: "PG Certificate", loc: "Botulinum Toxin", desc: "Botulinum Toxin In Denstistry.", badge: "Certificate", icon: Sparkles },
  { title: "PG Certificate", loc: "Sports Dentistry", desc: "Sports Dentistry & Gum Rejuvenation.", badge: "Certificate", icon: Briefcase },
  { title: "M.SC", loc: "Aesthetic Dentistry", desc: "M.SC in Aesthetic Dentistry.", badge: "Degree", icon: Award },
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

  return (
    <>
      {/* ---------------- LEAD GEN POPUP MODAL ---------------- */}
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
            Admissions Open: Chennai Batch (Only 20 Seats) | Global Masterclasses in Bangkok, Dubai & South Korea
          </p>
        </div>

    {/* ---------------- 1. HERO SECTION ---------------- */}
        <section className="min-h-screen flex flex-col justify-center px-4 md:px-8 xl:px-12 relative overflow-hidden pt-24 pb-16">
          
          {/* Dark Base Background */}
          <div className="absolute inset-0 -z-40 bg-[#050914]" />

          {/* Golden Aurora Animation (NO BLUR OVERLAYS) */}
          <div className="absolute inset-0 -z-30 opacity-80">
            <Aurora
              colorStops={["#BF953F", "#FCF6BA", "#B38728"]}
              blend={0.6}
              amplitude={1.2}
              speed={0.5}
            />
          </div>

          {/* Very light vignette so text is readable without blurring the aurora */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#040814_100%)] -z-20 pointer-events-none opacity-80" />

          {/* MAIN CONTENT WRAPPER */}
          <div className="max-w-[1920px] w-full mx-auto flex flex-col z-10 perspective-[1500px]">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center w-full">
              
              {/* ================= LEFT COLUMN: Text & Button ================= */}
              <motion.div 
                initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, ease: "easeOut" }}
                className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left z-10"
              >
                <motion.h3 
                  initial={{ opacity: 0, letterSpacing: "0.1em" }} animate={{ opacity: 1, letterSpacing: "0.4em" }} transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
                  className="text-[#FBF5B7] uppercase mb-4 md:mb-6 font-bold text-xs md:text-sm drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] tracking-widest"
                >
                  Welcome to
                </motion.h3>

                <div className="flex flex-col mb-4 md:mb-6 leading-none">
                  <h1 
                    className="text-6xl md:text-7xl xl:text-[7.5rem] font-serif font-extrabold text-transparent bg-clip-text drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] leading-[1.1]"
                    style={{ backgroundImage: "linear-gradient(to bottom right, #FCF6BA, #BF953F, #B38728)" }}
                  >
                    NSFA
                  </h1>
                  <h1 
                    className="text-5xl md:text-6xl xl:text-[5.5rem] font-serif font-bold text-transparent bg-clip-text drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] leading-[1.1]"
                    style={{ backgroundImage: "linear-gradient(to top right, #FCF6BA, #BF953F, #B38728)" }}
                  >
                    ACADEMY
                  </h1>
                </div>

                <motion.p 
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}
                  className="text-white text-lg md:text-2xl xl:text-3xl font-light italic font-serif tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] max-w-lg"
                >
                  Zeal To Excellence In Upskilling Education
                    
                </motion.p>

                <motion.button
                  onClick={() => router.push('/courses')}
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.9, type: "spring" }}
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 40px rgba(191,149,63,0.5)", y: -5 }} whileTap={{ scale: 0.95 }}
                  className="mt-8 md:mt-12 px-8 py-4 md:px-10 md:py-4 rounded-full font-bold text-[#080E21] tracking-[0.2em] text-xs md:text-sm uppercase cursor-pointer shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-white/20 backdrop-blur-md relative overflow-hidden"
                  style={{ background: "linear-gradient(135deg, #BF953F 0%, #FCF6BA 50%, #B38728 100%)" }}
                >
                  Explore Courses
                </motion.button>
              </motion.div>

              {/* ================= RIGHT COLUMN: "Honourable Mention" Showcase ================= */}
              <div className="lg:col-span-7 flex flex-col gap-6 md:gap-8 w-full relative z-10 lg:pl-10">
                 {/* 2. Honourable Mentions Divider */}
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.8 }}
                  className="flex items-center gap-4 w-full px-2"
                >
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#BF953F]/60" />
                  <span className="text-[#FBF5B7] text-[10px] md:text-xs font-bold uppercase tracking-[0.3em]">
                    Honourable Highlights
                  </span>
                  <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#BF953F]/60" />
                </motion.div>

                {/* 3. The Honours Gallery (4 Photos) */}
                <div className="grid grid-cols-4 gap-3 md:gap-4 w-full">
                  {[
                    "/assets/hero5.jpeg", 
                    "/assets/hero3.jpg", 
                    "/assets/hero2.png", 
                    "/assets/hero4.jpeg"
                  ].map((src, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 30 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      transition={{ duration: 0.8, delay: 1 + (i * 0.15) }}
                      className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden border border-[#BF953F]/30 shadow-lg transition-all duration-500 hover:border-[#BF953F] hover:-translate-y-2 hover:shadow-[0_10px_20px_rgba(191,149,63,0.4)] group"
                    >
                      <img 
                        src={src} 
                        alt={`Academy Highlight ${i + 1}`} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                      />
                     
                      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(191,149,63,0.4)_0%,rgba(0,0,0,0)_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay" />
                    </motion.div>
                  ))}
                </div>
                {/* 1. The Main Spotlight (Video) */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 30 }} 
                  animate={{ opacity: 1, scale: 1, y: 0 }} 
                  transition={{ duration: 1, delay: 0.5 }}
                  className="relative w-full aspect-video rounded-[2rem] p-1.5 shadow-[0_20px_50px_rgba(191,149,63,0.3)] bg-[linear-gradient(135deg,#BF953F,#FCF6BA,#B38728)]"
                >
                  <div className="w-full h-full rounded-[1.5rem] overflow-hidden bg-black relative flex items-center justify-center group">
                    <video 
                      controls 
                      playsInline 
                      className="w-full h-full object-contain outline-none rounded-[1.5rem]"
                      poster="/assets/hero1.png"
                    >
                      <source src="/assets/r5.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </motion.div>

               

              </div>

            </div>
          </div>
        </section>
        {/* ---------------- 2. WHY CHOOSE US (Tree Branch & Glowing Dots Layout) ---------------- */}
        <section className="min-h-[100vh] py-24 relative overflow-hidden bg-[linear-gradient(180deg,#0B132A_0%,#050914_100%)] flex flex-col items-center justify-center">
          <div className="absolute top-[20%] left-[10%] w-[40%] h-[40%] rounded-full bg-[#BF953F]/10 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-[20%] right-[10%] w-[40%] h-[40%] rounded-full bg-[#0074A5]/10 blur-[120px] pointer-events-none" />

          <svg className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none z-10">
            <defs>
              <linearGradient id="tree-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0074A5" stopOpacity="0" />
                <stop offset="40%" stopColor="#BF953F" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#FFD700" stopOpacity="1" />
              </linearGradient>
            </defs>
            {[
              { x: 58, y: 22 }, { x: 78, y: 22 },
              { x: 58, y: 40 }, { x: 78, y: 40 },
              { x: 58, y: 58 }, { x: 78, y: 58 },
              { x: 58, y: 76 }, { x: 78, y: 76 }
            ].map((pos, i) => (
              <motion.path 
                key={`line-${i}`}
                d={`M 35% 50% C 42% 50%, 45% ${pos.y}%, ${pos.x}% ${pos.y}%`}
                fill="none"
                stroke="url(#tree-grad)"
                strokeWidth="1.5"
                strokeDasharray="5 5"
                animate={{ opacity: [0.05, 0.7, 0.05] }} 
                transition={{ repeat: Infinity, duration: 3 + (i % 2), delay: i * 0.2, ease: "easeInOut" }}
              />
            ))}
          </svg>

          <div className="max-w-7xl w-full mx-auto px-4 flex flex-col lg:flex-row items-center justify-between relative z-20 gap-16 lg:gap-8">
            
            <div className="w-full lg:w-5/12 flex flex-col items-center lg:items-start text-center lg:text-left shrink-0">
              <motion.div initial={{ width: 0 }} whileInView={{ width: "100px" }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="h-[2px] bg-[#FFD700] mb-8" />
              
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                <GoldText text="Why NSFA Academy" className="text-5xl md:text-7xl mb-6 drop-shadow-2xl" />
                <p className="text-white/70 text-lg md:text-xl leading-relaxed font-light">
                  NSFA Academy is a globally recognized advanced aesthetic science academy. We are the ONLY institute offering true monopoly masterclasses and 8 CPDs in one course.
                </p>
              </motion.div>

              <motion.div initial={{ width: 0 }} whileInView={{ width: "100px" }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="h-[2px] bg-[#FFD700] mt-8" />
            </div>

            {/* RIGHT SIDE: Key Points Grid */}
          <div className="w-full lg:w-7/12 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 relative z-20">
            {advancedFeatures.map((f, i) => (
              <motion.div 
                key={f.id} 
                onClick={() => setActiveFeature(f.id)}
                initial={{ opacity: 0, x: 50 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                viewport={{ once: true }} 
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ scale: 1.03, x: -5 }} 
                whileTap={{ scale: 0.97 }}
                className="w-full px-5 py-4 md:px-6 md:py-5 rounded-2xl bg-[#0A1128]/80 border border-white/10 shadow-[0_10px_20px_rgba(0,0,0,0.4)] cursor-pointer group transition-all relative flex items-center justify-start text-left overflow-hidden"
              >
                {/* 1. THE GOLDEN HOVER GRADIENT (Fades in smoothly on hover) */}
                <div className="absolute inset-0 bg-[linear-gradient(135deg,#BF953F,#FCF6BA,#B38728)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
                
                {/* 2. "Overgrown" Animated Dot Container */}
                <div className="relative flex items-center justify-center w-4 h-4 mr-4 shrink-0 z-10">
                  {/* Core solid dot (Turns dark on hover) */}
                  <div className="w-1.5 h-1.5 bg-[#FBF5B7] group-hover:bg-[#080E21] transition-colors duration-500 rounded-full z-10" />
                  
                  {/* Pulsing ripple (Turns to dark translucent on hover) */}
                  <motion.div 
                    animate={{ scale: [1, 3.5, 1], opacity: [0.8, 0, 0.8] }}
                    transition={{ repeat: Infinity, duration: 2.5, delay: i * 0.15 }}
                    className="absolute inset-0 bg-[#BF953F] group-hover:bg-[#080E21]/30 transition-colors duration-500 rounded-full"
                  />
                </div>

                {/* 3. Text Content (Turns dark on hover for readability) */}
                <h4 className="text-[#FBF5B7] group-hover:text-[#080E21] font-serif font-bold text-base md:text-lg transition-colors duration-500 relative z-10 truncate">
                  {f.title}
                </h4>
              </motion.div>
            ))}
          </div>

          </div>

          <AnimatePresence>
            {activeFeature && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }} 
                onClick={() => setActiveFeature(null)} 
                className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 cursor-pointer"
              >
                {advancedFeatures.filter(f => f.id === activeFeature).map(f => (
                  <motion.div 
                    key={f.id} 
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                    transition={{ type: "spring", bounce: 0.4 }}
                    className="bg-[linear-gradient(135deg,#BF953F,#FCF6BA,#B38728)] p-6 md:p-10 rounded-3xl max-w-[90vw] md:max-w-lg w-full shadow-[0_20px_60px_rgba(191,149,63,0.6)] cursor-default text-center relative overflow-hidden" 
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay pointer-events-none" />
                    
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="w-12 md:w-16 h-1.5 md:h-2 bg-[#080E21]/20 rounded-full mb-6 md:mb-8" />
                      <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#080E21] mb-4 md:mb-6">{f.title}</h3>
                      <p className="text-[#080E21]/90 text-base md:text-lg font-medium leading-relaxed">{f.desc}</p>
                      
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
                    </div>

                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </section>

      {/* ---------------- 3. STATS SECTION (White Glassmorphism) ---------------- */}
        <section className="py-24 md:py-32 relative bg-[#FAFAFA] border-y-4 border-[#BF953F] overflow-hidden z-10">
          {/* Subtle ambient glows for the glass to blur over */}
          <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-[#BF953F]/10 rounded-full blur-[100px] -z-10" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-[#0074A5]/10 rounded-full blur-[100px] -z-10" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.03] pointer-events-none -z-10" />
          
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="text-center mb-16 md:mb-24">
              <h3 className="text-[#8B6914] tracking-[0.2em] uppercase text-xs md:text-sm font-bold mb-4 drop-shadow-sm">A GLOBAL COMMUNITY</h3>
              <DarkGoldText text="Transforming Careers Worldwide" className="text-4xl md:text-6xl" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              {[
                { number: 5000, suffix: "+", label: "Global Students", icon: GraduationCap },
                { number: 50, suffix: "+", label: "Expert Faculty", icon: Users },
                { number: 30, suffix: "+", label: "Advanced Courses", icon: BookOpen },
                { number: 10, suffix: "+", label: "Countries Reached", icon: Globe },
              ].map((stat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.8 }}
                  className="bg-white/60 backdrop-blur-xl border border-white shadow-[0_15px_30px_rgba(0,0,0,0.05)] rounded-3xl p-6 md:p-10 flex flex-col items-center justify-center text-center group hover:bg-[linear-gradient(135deg,#BF953F,#FCF6BA,#B38728)] hover:border-transparent hover:shadow-[0_20px_50px_rgba(191,149,63,0.5)] transition-all duration-500 hover:-translate-y-3"
                >
                  {/* Icon Box */}
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white border border-gray-100 flex items-center justify-center mb-4 md:mb-6 shadow-sm group-hover:bg-[#080E21] transition-colors duration-500">
                    <stat.icon className="w-6 h-6 md:w-8 md:h-8 text-[#8B6914] group-hover:text-[#FBF5B7] transition-colors duration-500" />
                  </div>
                  
                  {/* Counter */}
                  <div className="text-3xl md:text-5xl font-serif font-bold text-[#080E21] mb-2 drop-shadow-sm group-hover:drop-shadow-none transition-colors duration-500">
                    <Counter from={0} to={stat.number} duration={2.5} suffix={stat.suffix} />
                  </div>
                  
                  <p className="text-gray-500 text-[10px] md:text-xs font-bold uppercase tracking-widest group-hover:text-[#080E21]/80 transition-colors duration-500">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

      {/* ---------------- 4. PROGRAMS SECTION (Two Rows) ---------------- */}
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

          <div className="w-full flex flex-col gap-12 md:gap-20 overflow-hidden pb-16 pt-4 md:pt-8 relative z-10" ref={programsRef}>
            
            {/* ROW 1: Aesthetic Courses */}
            <div className="w-full flex flex-col gap-6">
              {/* Aesthetic Title Bar */}
              <div className="max-w-7xl mx-auto px-4 w-full flex items-center gap-4">
                <h3 className="text-xl md:text-3xl font-serif font-bold uppercase tracking-widest text-transparent bg-clip-text bg-[linear-gradient(to_right,#BF953F,#FCF6BA)] drop-shadow-md">
                  Aesthetic Courses
                </h3>
                <div className="h-[1px] flex-1 bg-gradient-to-r from-[#BF953F]/50 to-transparent" />
              </div>

              <div className="pause-on-hover w-full overflow-visible">
                <div className="animate-programs w-max">
                  <motion.div 
                    drag="x" 
                    dragConstraints={programsRef} 
                    className="flex gap-4 md:gap-8 px-4 w-max cursor-grab active:cursor-grabbing"
                  >
                    {[...aestheticCourses, ...aestheticCourses].map((c, i) => (
                      <motion.div 
                        key={`aesthetic-${i}`} 
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
                          <p className="text-xs md:text-sm text-[#BF953F] group-hover:text-black/70 group-active:text-black/70 font-bold uppercase tracking-widest mb-2 transition-colors duration-500 truncate w-full">
                            📍 {c.loc}
                          </p>
                          <p className="text-xs md:text-sm text-white/60 group-hover:text-black/80 group-active:text-black/80 font-light mb-auto transition-colors duration-500 line-clamp-3">
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
              </div>
            </div>

            {/* ROW 2: Dental Courses */}
            <div className="w-full flex flex-col gap-6">
              {/* Dental Title Bar */}
              <div className="max-w-7xl mx-auto px-4 w-full flex items-center gap-4">
                <h3 className="text-xl md:text-3xl font-serif font-bold uppercase tracking-widest text-transparent bg-clip-text bg-[linear-gradient(to_right,#88D4FF,#FFFFFF)] drop-shadow-md">
                  Dental Courses
                </h3>
                <div className="h-[1px] flex-1 bg-gradient-to-r from-[#0074A5]/50 to-transparent" />
              </div>

              <div className="pause-on-hover w-full overflow-visible">
                <div className="animate-programs w-max" style={{ animationDirection: "reverse" }}>
                  <motion.div 
                    drag="x" 
                    dragConstraints={programsRef} 
                    className="flex gap-4 md:gap-8 px-4 w-max cursor-grab active:cursor-grabbing"
                  >
                    {[...dentalCourses, ...dentalCourses].map((c, i) => (
                      <motion.div 
                        key={`dental-${i}`} 
                        whileHover={{ y: -10, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }} 
                        className="w-[260px] md:w-[320px] h-[340px] md:h-[400px] shrink-0 rounded-[2rem] relative overflow-hidden group flex flex-col items-center justify-start pt-8 md:pt-10 border border-[#0074A5]/30 shadow-2xl transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(0,116,165,0.4)] active:shadow-[0_30px_60px_-15px_rgba(0,116,165,0.4)]"
                      >
                        <div className="absolute inset-0 bg-white/5 backdrop-blur-md transition-opacity duration-500 group-hover:opacity-0 group-active:opacity-0" />
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-500 bg-[linear-gradient(135deg,#0074A5,#0A1128,#0074A5)]" />
                        
                        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm border border-[#0074A5]/50 text-[#88D4FF] text-[10px] md:text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full z-20 group-hover:bg-white group-hover:text-[#0074A5] group-active:bg-white group-active:text-[#0074A5] transition-colors">
                          {c.badge}
                        </div>
                        
                        <div className="relative z-10 flex flex-col items-center text-center px-4 md:px-6 w-full h-full">
                          <div className="mb-4 md:mb-6 p-4 rounded-full bg-white/10 border border-white/20 group-hover:border-black/20 group-active:border-black/20 group-hover:bg-black/20 group-active:bg-black/20 transition-colors duration-500 shadow-inner">
                            <c.icon className="w-8 h-8 md:w-10 md:h-10 text-[#88D4FF] group-hover:text-white group-active:text-white transition-colors duration-500" />
                          </div>
                          <h3 className="text-xl md:text-2xl font-serif text-white font-bold transition-colors duration-500 mb-2">
                            {c.title}
                          </h3>
                          <p className="text-xs md:text-sm text-[#88D4FF] font-bold uppercase tracking-widest mb-2 transition-colors duration-500 truncate w-full">
                            📍 {c.loc}
                          </p>
                          <p className="text-xs md:text-sm text-white/60 group-hover:text-white/90 group-active:text-white/90 font-light mb-auto transition-colors duration-500 line-clamp-3">
                            {c.desc}
                          </p>

                          <div className="w-full flex flex-col gap-2 opacity-100 md:opacity-0 md:translate-y-4 md:group-hover:opacity-100 md:group-active:opacity-100 md:group-hover:translate-y-0 transition-all duration-500 pb-6 mt-4">
                            <button onClick={() => window.location.href = '/courses'} className="w-full py-2 md:py-2.5 rounded-xl bg-black/50 md:bg-white text-white md:text-[#0074A5] font-bold text-[10px] md:text-xs tracking-widest uppercase hover:bg-black hover:text-white active:bg-black active:text-white transition-colors border border-white/10 md:border-none shadow-lg">
                              View Details
                            </button>
                            <button onClick={() => window.open(`https://wa.me/919884718883?text=${encodeURIComponent(`Hello NSFA, I'm interested in ${c.title} (${c.loc}).`)}`, '_blank')} className="w-full py-2 md:py-2.5 rounded-xl border border-white/30 text-white font-bold text-[10px] md:text-xs tracking-widest uppercase hover:bg-black active:bg-black hover:border-black active:border-black transition-colors">
                              Enquire Now
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </div>
            
          </div>
        </section>
      {/* ---------------- 5. GLOBALLY RECOGNISED ---------------- */}
        <section className="py-24 relative overflow-hidden bg-[#050914] flex flex-col items-center justify-center">
          {/* Background Map */}
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
          </div>

          {/* HORIZONTAL CONTINUOUS LOGO TRACK */}
          <div className="w-full relative z-10 overflow-hidden py-10 pause-on-hover">
            {/* Edge Fades for premium scroll effect */}
            <div className="absolute left-0 top-0 bottom-0 w-16 md:w-48 bg-gradient-to-r from-[#050914] to-transparent z-20 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 md:w-48 bg-gradient-to-l from-[#050914] to-transparent z-20 pointer-events-none" />

            {/* Continuous Marquee Animation */}
            <div className="animate-programs w-max flex items-center gap-16 md:gap-32 px-8">
              {[
                "/assets/mets.png", 
                "/assets/mount.png", 
                "/assets/meds.png", 
                "/assets/iso.png", 
                "/assets/iao.png", 
                "/assets/iaf.png",
                // Duplicated array for seamless infinite looping
                "/assets/mets.png", 
                "/assets/mount.png", 
                "/assets/meds.png", 
                "/assets/iso.png", 
                "/assets/iao.png", 
                "/assets/iaf.png"
              ].map((src, i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ scale: 1.15 }} 
                  className="shrink-0 flex items-center justify-center cursor-pointer transition-transform duration-500 group"
                >
                  <img 
                    src={src} 
                    alt={`Accreditation Logo ${i}`} 
                    className="h-16 md:h-28 object-contain filter brightness-75 group-hover:brightness-110 drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] transition-all duration-500" 
                    loading="lazy" 
                  />
                </motion.div>
              ))}
            </div>
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

       

      </main>
    </>
  );
}


 