"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, BookOpenText, Globe, Award, Stethoscope, MessageCircle, ChevronDown, ChevronRight, MapPin } from "lucide-react";

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

/* ---------------- RESTRUCTURED DATA (ACTUAL COURSES) ---------------- */
const aestheticCourses = [
  { 
    category: "Level 4 Certification", 
    icon: Award, 
    duration: "Varies", 
    programs: [
      { title: "Skin Aesthetics", badge: "Level 4 - NVQF", location: "India", desc: "Advanced clinical training focusing on skin aesthetics. This Level 4 NVQF program provides world-class, hands-on experience, emphasizing international protocols and patient safety." }
    ] 
  },
  { 
    category: "Fellowship Programs", 
    icon: Globe, 
    duration: "Varies", 
    programs: [
      { title: "Facial Aesthetics", badge: "International Fellowship", location: "South Korea & Dubai", desc: "A prestigious International Fellowship in Facial Aesthetics offering advanced clinical exposure and mastery of international protocols in South Korea and Dubai." }
    ] 
  },
  { 
    category: "Masterclass & Diploma", 
    icon: BookOpenText, 
    duration: "Varies", 
    programs: [
      { title: "Permanent Makeup", badge: "ISPMU Masterclass & Professional Diploma", location: "Bangkok & India", desc: "Comprehensive ISPMU Masterclass and Professional Diploma focusing on cutting-edge permanent makeup techniques, delivered in Bangkok and India." },
      { title: "K-Beauty Aesthetics", badge: "Masterclass", location: "Seoul, South Korea", desc: "Immersive training in the latest K-Beauty aesthetic trends and techniques, straight from the industry capital in Seoul, South Korea." }
    ] 
  },
  { 
    category: "Upcoming Programs", 
    icon: GraduationCap, 
    duration: "Coming Soon", 
    programs: [
      { title: "Cosmetology", badge: "BVOC / BSC", location: "Global", desc: "Our upcoming BVOC / BSC in Cosmetology will offer a comprehensive academic curriculum bridging foundational sciences with advanced aesthetic practices." }
    ] 
  },
];

const dentalCourses = [
  { 
    category: "Fellowship Programs", 
    icon: Award, 
    duration: "Varies", 
    programs: [
      { title: "Cosmetic Dentistry", badge: "International Fellowship", location: "India & Dubai", desc: "Master the art of smile design and advanced cosmetic procedures through this International Fellowship in Cosmetic Dentistry." },
      { title: "Implantology", badge: "International Fellowship", location: "India & Dubai", desc: "Comprehensive surgical and restorative training in dental implants, emphasizing precision and global standards." },
      { title: "Clear Aligner Therapy", badge: "International Fellowship", location: "India & Dubai", desc: "Specialized training in modern orthodontic alignment using clear aligner technology, from case selection to advanced treatment." },
      { title: "Endodontics", badge: "International Fellowship", location: "India & Dubai", desc: "Advanced clinical fellowship focusing on modern rotary endodontics, 3D obturation, and complex root canal treatments." }
    ] 
  },
  { 
    category: "Upcoming Programs", 
    icon: GraduationCap, 
    duration: "Coming Soon", 
    programs: [
      { title: "Aesthetic Dentistry", badge: "M.Sc", location: "India & Dubai", desc: "Our upcoming M.Sc in Aesthetic Dentistry will provide an extensive academic and clinical framework for mastering dental aesthetics." }
    ] 
  },
];

const medicalCourses = [
  { 
    category: "Upcoming 2027", 
    icon: Stethoscope, 
    duration: "Coming Soon", 
    programs: [
      { title: "Internal Medicine", badge: "Fellowship", location: "GLOBAL", desc: "Intensive training focusing on adult diseases, diagnostics, and non-surgical treatments. Officially launching in 2027." },
      { title: "General Practice", badge: "Mastership", location: "GLOBAL", desc: "Advanced comprehensive program covering modern general medical practices. Enrollment begins late 2026." },
      { title: "Emergency Medicine", badge: "PG Diploma", location: "GLOBAL", desc: "Equip yourself with life-saving skills and rapid diagnostic protocols. Coming in 2027." }
    ] 
  }
];

/* ---------------- ACCORDION COMPONENT ---------------- */
const CourseAccordion = ({ 
  title, 
  badge, 
  location, 
  desc, 
  duration, 
  theme = "gold" 
}: { 
  title: string; 
  badge: string; 
  location: string; 
  desc: string; 
  duration: string; 
  theme?: "gold" | "blue" | "green" 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleWhatsAppEnquiry = (e: React.MouseEvent) => {
    e.stopPropagation();
    const message = `Hello NSFA Academy, I am interested in learning more about: *${badge} in ${title}*. Please share the syllabus and details.`;
    window.open(`https://wa.me/919884718883?text=${encodeURIComponent(message)}`, '_blank');
  };

  const getThemeStyles = () => {
    if (theme === "gold") return { 
        active: "bg-[#BF953F]/10 border-[#BF953F]/50 text-[#FBF5B7]", 
        btn: "bg-[linear-gradient(45deg,#BF953F,#FCF6BA,#B38728)] text-[#080E21]",
        icon: "text-[#BF953F]",
        badge: "border-[#BF953F]/40 text-[#FBF5B7] bg-[#BF953F]/10"
    };
    if (theme === "blue") return { 
        active: "bg-[#0074A5]/10 border-[#88D4FF]/50 text-[#88D4FF]", 
        btn: "bg-[linear-gradient(45deg,#0074A5,#88D4FF,#005B82)] text-white",
        icon: "text-[#88D4FF]",
        badge: "border-[#88D4FF]/40 text-[#88D4FF] bg-[#88D4FF]/10"
    };
    return { 
        active: "bg-[#059669]/10 border-[#34D399]/50 text-[#34D399]", 
        btn: "bg-[linear-gradient(45deg,#059669,#34D399,#065F46)] text-white",
        icon: "text-[#34D399]",
        badge: "border-[#34D399]/40 text-[#34D399] bg-[#34D399]/10"
    };
  };

  const styles = getThemeStyles();

  return (
    <motion.div 
      initial={false}
      onClick={() => setIsOpen(!isOpen)}
      className={`w-full mb-3 rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden ${
        isOpen ? styles.active : "bg-white/[0.03] border-white/10 hover:bg-white/[0.06]"
      }`}
      style={{ willChange: "transform, opacity" }}
    >
      <div className="p-4 md:p-5 flex items-center justify-between gap-4">
        <div>
          <h4 className={`font-serif font-bold text-lg md:text-xl ${isOpen ? "" : "text-white"}`}>{title}</h4>
          <div className="flex flex-wrap items-center gap-2 md:gap-3 mt-2">
            <span className={`text-[10px] md:text-xs px-2 py-0.5 rounded border font-bold uppercase tracking-wider ${styles.badge}`}>
              {badge}
            </span>
            <span className="text-[10px] md:text-xs text-white/60 flex items-center gap-1 font-medium uppercase tracking-widest">
              <MapPin size={12} /> {location}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4 shrink-0">
          <span className="hidden md:block text-xs font-light text-white/40">{duration}</span>
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <ChevronDown className={`w-5 h-5 ${styles.icon}`} />
          </motion.div>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
            <div className="px-4 pb-5 pt-2 border-t border-white/5 md:px-5 md:pb-6">
              <p className="text-white/60 text-sm md:text-base leading-relaxed mb-6 font-light">{desc}</p>
              <button onClick={handleWhatsAppEnquiry} className={`w-full md:w-auto px-6 py-2.5 rounded-xl font-bold tracking-wider uppercase text-xs flex items-center justify-center gap-2 transition-transform hover:scale-105 ${styles.btn}`}>
                <MessageCircle size={16} /> Enquire Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ---------------- MAIN PAGE COMPONENT ---------------- */
export default function Courses() {
  const [activeAestheticIdx, setActiveAestheticIdx] = useState(0);
  const [activeDentalIdx, setActiveDentalIdx] = useState(0);
  const [activeMedicalIdx, setActiveMedicalIdx] = useState(0);

  return (
    <main suppressHydrationWarning className="bg-[#040814] text-white min-h-screen pt-32 pb-24 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#BF953F]/05 blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#0074A5]/05 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        {/* HEADER */}
        <div className="text-center mb-16 md:mb-24">
          <h3 className="text-white/40 tracking-[0.3em] uppercase mb-4 font-semibold text-xs">Curriculum</h3>
          <GoldText text="Our Academic Programs" className="text-4xl md:text-7xl mb-6" />
          <p className="text-white/50 text-base md:text-lg max-w-2xl mx-auto font-light">
            Select a program to explore world-class courses designed for medical professionals.
          </p>
        </div>

        {/* ---------------- 1. AESTHETIC SECTION ---------------- */}
        <div className="mb-24 md:mb-32">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-2xl md:text-4xl font-serif text-[#FBF5B7]">Aesthetic Courses</h2>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-[#BF953F]/40 to-transparent" />
          </div>

          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
            <div className="w-full lg:w-[30%] flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-4 no-scrollbar">
              {aestheticCourses.map((cat, idx) => (
                <button key={idx} onClick={() => setActiveAestheticIdx(idx)} className={`flex items-center justify-between w-full min-w-[240px] lg:min-w-0 p-4 rounded-2xl transition-all border text-left ${activeAestheticIdx === idx ? "bg-[linear-gradient(135deg,#BF953F,#FCF6BA,#B38728)] border-transparent text-[#040814]" : "bg-white/5 border-white/10 text-white/60 hover:border-[#BF953F]/30"}`}>
                  <div className="flex items-center gap-4">
                    <cat.icon className={`w-5 h-5 ${activeAestheticIdx === idx ? "text-[#040814]" : "text-[#BF953F]"}`} />
                    <span className="font-bold text-sm md:text-base">{cat.category}</span>
                  </div>
                  {activeAestheticIdx === idx && <ChevronRight className="hidden lg:block w-4 h-4" />}
                </button>
              ))}
            </div>
            <div className="w-full lg:w-[70%]">
              <AnimatePresence mode="wait">
                <motion.div key={activeAestheticIdx} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.3 }} className="bg-white/[0.02] border border-white/10 rounded-3xl p-4 md:p-8 backdrop-blur-sm">
                  {aestheticCourses[activeAestheticIdx].programs.map((prog, i) => (
                    <CourseAccordion 
                      key={i} 
                      title={prog.title} 
                      badge={prog.badge}
                      location={prog.location}
                      desc={prog.desc}
                      duration={aestheticCourses[activeAestheticIdx].duration} 
                      theme="gold" 
                    />
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* ---------------- 2. DENTAL SECTION ---------------- */}
        <div className="mb-24 md:mb-32">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-2xl md:text-4xl font-serif text-[#88D4FF]">Dental Courses</h2>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-[#0074A5]/40 to-transparent" />
          </div>

          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
            <div className="w-full lg:w-[30%] flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-4 no-scrollbar">
              {dentalCourses.map((cat, idx) => (
                <button key={idx} onClick={() => setActiveDentalIdx(idx)} className={`flex items-center justify-between w-full min-w-[240px] lg:min-w-0 p-4 rounded-2xl transition-all border text-left ${activeDentalIdx === idx ? "bg-[linear-gradient(135deg,#0074A5,#88D4FF,#005B82)] border-transparent text-white" : "bg-white/5 border-white/10 text-white/60 hover:border-[#88D4FF]/30"}`}>
                  <div className="flex items-center gap-4">
                    <cat.icon className={`w-5 h-5 ${activeDentalIdx === idx ? "text-white" : "text-[#88D4FF]"}`} />
                    <span className="font-bold text-sm md:text-base">{cat.category}</span>
                  </div>
                  {activeDentalIdx === idx && <ChevronRight className="hidden lg:block w-4 h-4" />}
                </button>
              ))}
            </div>
            <div className="w-full lg:w-[70%]">
              <AnimatePresence mode="wait">
                <motion.div key={activeDentalIdx} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.3 }} className="bg-white/[0.02] border border-white/10 rounded-3xl p-4 md:p-8 backdrop-blur-sm">
                  {dentalCourses[activeDentalIdx].programs.map((prog, i) => (
                    <CourseAccordion 
                      key={i} 
                      title={prog.title} 
                      badge={prog.badge}
                      location={prog.location}
                      desc={prog.desc}
                      duration={dentalCourses[activeDentalIdx].duration} 
                      theme="blue" 
                    />
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* ---------------- 3. GENERAL MEDICAL SECTION (2027) ---------------- */}
        <div>
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-2xl md:text-4xl font-serif text-[#34D399]">
              General Medical <span className="text-xs md:text-lg opacity-50 font-sans">(Launching 2027)</span>
            </h2>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-[#059669]/40 to-transparent" />
          </div>

          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
            <div className="w-full lg:w-[30%] flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-4 no-scrollbar">
              {medicalCourses.map((cat, idx) => (
                <button key={idx} onClick={() => setActiveMedicalIdx(idx)} className={`flex items-center justify-between w-full min-w-[240px] lg:min-w-0 p-4 rounded-2xl transition-all border text-left ${activeMedicalIdx === idx ? "bg-[linear-gradient(135deg,#059669,#34D399,#065F46)] border-transparent text-white" : "bg-white/5 border-white/10 text-white/60 hover:border-[#34D399]/30"}`}>
                  <div className="flex items-center gap-4">
                    <cat.icon className={`w-5 h-5 ${activeMedicalIdx === idx ? "text-white" : "text-[#34D399]"}`} />
                    <span className="font-bold text-sm md:text-base">{cat.category}</span>
                  </div>
                  {activeMedicalIdx === idx && <ChevronRight className="hidden lg:block w-4 h-4" />}
                </button>
              ))}
            </div>
            <div className="w-full lg:w-[70%]">
              <AnimatePresence mode="wait">
                <motion.div key={activeMedicalIdx} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.3 }} className="bg-white/[0.02] border border-white/10 rounded-3xl p-4 md:p-8 backdrop-blur-sm">
                  {medicalCourses[activeMedicalIdx].programs.map((prog, i) => (
                    <CourseAccordion 
                      key={i} 
                      title={prog.title} 
                      badge={prog.badge}
                      location={prog.location}
                      desc={prog.desc}
                      duration={medicalCourses[activeMedicalIdx].duration} 
                      theme="green" 
                    />
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </main>
  );
}