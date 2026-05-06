"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, BookOpenText, Globe, Award, Stethoscope, MessageCircle, ChevronDown, ChevronRight } from "lucide-react";

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

/* ---------------- HELPER FOR DYNAMIC DESCRIPTIONS ---------------- */
const generateDescription = (title: string) => {
  const cleanTitle = title.replace(/PG Diploma in |PG Diploma |Fellowship in |Fellowship In |Certification Training in |Mastership In |M\.SC in |M\.SC IN |PG Certificate In /i, '').trim();
  return `Advanced clinical training focusing on ${cleanTitle.toLowerCase()}. This program provides world-class, hands-on experience, emphasizing international protocols and patient safety to elevate your medical practice.`;
};

/* ---------------- RESTRUCTURED DATA ---------------- */
const aestheticCourses = [
  { 
    category: "Diploma Programs", 
    icon: BookOpenText, 
    duration: "1 Year", 
    programs: [
      "PG Diploma Clinical Cosmetology and Trichology", 
      "PG Diploma in Medical Trichology, Trichopigmentation and Nutraceuticals", 
      "PG Diploma in Non Surgical Facial Aesthetics", 
      "PG Diploma in Bariatric Science and Nutrition"
    ] 
  },
  { 
    category: "Fellowship Programs", 
    icon: Award, 
    duration: "6 Months", 
    programs: [
      "Fellowship in Non Surgical Facial Aesthetics", 
      "Fellowship in Medical Cosmetology", 
      "Fellowship in Aesthetic Medicine", 
      "Fellowship in Cosmetic Medicine"
    ] 
  },
  { 
    category: "Mastership Programs", 
    icon: GraduationCap, 
    duration: "1 Year", 
    programs: [
      "Non Surgical Facial Aesthetics with advanced Transformation", 
      "Non Surgical Hair restoration", 
      "Non Surgical Nutrigenomics"
    ] 
  },
  { 
    category: "PG Certification", 
    icon: Globe, 
    duration: "3-6 Months", 
    programs: [
      "Certification Training in Advanced Lasers", 
      "Certification Training in Chemical Peels and Medifacial", 
      "Certification Training in Trichology", 
      "Certification Training in Medical Cupping", 
      "Certification Training in BBGlow", 
      "Certification Training in Micropigmentation", 
      "Certification Training in Clinical Nutrition", 
      "Certification Training in Derma Planning", 
      "Certification Training in Cosmeceutical Formation Science", 
      "Certification Training in Botulinun toxin", 
      "Certification Training in Dermal Fillers", 
      "Certification Training in Fibroblast Pen", 
      "Certification Training in Biostimulation in Aesthetics", 
      "Certification Training in Acne & Hyperpigmentation"
    ] 
  },
  { 
    category: "M.SC Programs", 
    icon: BookOpenText, 
    duration: "2 Years", 
    programs: [
      "M.SC IN FACIAL AESTHETICS & COSMETOLOGY", 
      "M.SC in Cosmeceutical Science", 
      "M.SC in Aesthetic Medicine", 
      "M.SC in Trichology"
    ] 
  },
];

const dentalCourses = [
  { 
    category: "Fellowship Programs", 
    icon: Award, 
    duration: "Varies", 
    programs: [
      "Fellowship In Laser Dentistry", 
      "Fellowship In Cosmetic Dentistry", 
      "Fellowship In Orthodontics", 
    ] 
  },
  { 
    category: "Mastership Programs", 
    icon: GraduationCap, 
    duration: "Varies", 
    programs: [
      "Mastership In Implantology", 
      "Mastership In Aesthetic Dentistry (3 In 1) Course", 
      "Mastership In Endodontics", 
      "Mastership In Comprehensive Clinical Dentistry", 
    ] 
  },
  { 
    category: "PG Certification", 
    icon: Globe, 
    duration: "Varies", 
    programs: [
      "PG Certificate In Botulinum Toxin In Denstistry", 
      "PG Certificate In Sports Dentistry", 
      "PG Certificate In Gum Rejuvenation"
    ] 
  },
  { 
    category: "M.SC Programs", 
    icon: Stethoscope, 
    duration: "2 Years", 
    programs: [
      "M.SC in Aesthetic Dentistry"
    ] 
  },
];

/* ---------------- ACCORDION COMPONENT ---------------- */
const CourseAccordion = ({ 
  title, 
  duration, 
  theme = "gold" 
}: { 
  title: string; 
  duration: string; 
  theme?: "gold" | "blue" 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleWhatsAppEnquiry = (e: React.MouseEvent) => {
    e.stopPropagation();
    const message = `Hello NSFA Academy, I am interested in learning more about: *${title}*. Please share the syllabus, fees, and enrollment details.`;
    window.open(`https://wa.me/919884718883?text=${encodeURIComponent(message)}`, '_blank');
  };

  const isGold = theme === "gold";

  return (
    <motion.div 
      initial={false}
      onClick={() => setIsOpen(!isOpen)}
      className={`w-full mb-3 rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden backdrop-blur-md ${
        isOpen 
          ? isGold ? "bg-[#BF953F]/10 border-[#BF953F]/50 shadow-[0_10px_30px_rgba(191,149,63,0.15)]" : "bg-[#0074A5]/10 border-[#88D4FF]/50 shadow-[0_10px_30px_rgba(0,116,165,0.15)]"
          : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
      }`}
    >
      <div className="p-4 md:p-5 flex items-center justify-between gap-4">
        <div className="flex-1">
          <h4 className={`font-medium text-sm md:text-base transition-colors ${isOpen ? (isGold ? "text-[#FBF5B7]" : "text-[#88D4FF]") : "text-white"}`}>
            {title}
          </h4>
        </div>
        <div className="flex items-center gap-4 shrink-0">
          <span className="hidden md:block text-xs font-light text-white/50 tracking-wider">
            {duration}
          </span>
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <ChevronDown className={`w-5 h-5 ${isGold ? "text-[#BF953F]" : "text-[#88D4FF]"}`} />
          </motion.div>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className={`px-4 pb-5 pt-2 border-t md:px-5 md:pb-6 md:pt-4 ${isGold ? "border-[#BF953F]/20" : "border-[#88D4FF]/20"}`}>
              <p className="text-white/70 text-sm md:text-base leading-relaxed mb-6 font-light">
                {generateDescription(title)}
              </p>
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <span className="md:hidden text-xs font-light text-white/50 tracking-wider">
                  Duration: {duration}
                </span>
                <button 
                  onClick={handleWhatsAppEnquiry}
                  className={`w-full md:w-auto px-6 py-2.5 rounded-xl font-bold tracking-wider uppercase text-xs flex items-center justify-center gap-2 transition-transform hover:scale-105 active:scale-95 ${
                    isGold 
                      ? "bg-[linear-gradient(45deg,#BF953F,#FCF6BA,#B38728)] text-[#080E21] shadow-[0_5px_20px_rgba(191,149,63,0.3)]" 
                      : "bg-[linear-gradient(45deg,#0074A5,#88D4FF,#005B82)] text-white shadow-[0_5px_20px_rgba(0,116,165,0.3)]"
                  }`}
                >
                  <MessageCircle size={16} />
                  Enquire via WhatsApp
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ---------------- MAIN PAGE COMPONENT ---------------- */
export default function Courses() {
  // State to track which tab is active for each section
  const [activeAestheticIdx, setActiveAestheticIdx] = useState(0);
  const [activeDentalIdx, setActiveDentalIdx] = useState(0);

  return (
    <main suppressHydrationWarning className="bg-[#040814] text-white min-h-screen pt-32 pb-24 relative overflow-hidden">
      
      {/* STATIC BACKGROUND EFFECTS */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#BF953F]/10 blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#0074A5]/10 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        {/* HEADER */}
        <div className="text-center mb-16 md:mb-24">
          <h3 className="text-white/50 tracking-[0.3em] uppercase mb-4 font-semibold text-xs md:text-sm">
            Curriculum
          </h3>
          <GoldText text="Our Academic Programs" className="text-4xl md:text-6xl lg:text-7xl mb-6" />
          <p className="text-white/60 text-base md:text-lg max-w-2xl mx-auto font-light">
            Select a program below to explore our world-class courses designed for medical professionals aiming for excellence.
          </p>
        </div>

        {/* ---------------- 1. AESTHETIC COURSES (Tabbed Layout) ---------------- */}
        <div className="mb-24">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-2xl md:text-4xl font-serif text-[#FBF5B7]">Aesthetic Courses</h2>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-[#BF953F]/50 to-transparent" />
          </div>

          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
            {/* Sidebar Tabs */}
            <div className="w-full lg:w-[30%] flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 hide-scrollbar">
              {aestheticCourses.map((category, idx) => {
                const isActive = activeAestheticIdx === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveAestheticIdx(idx)}
                    className={`flex items-center justify-between w-full min-w-[240px] lg:min-w-0 p-4 rounded-2xl transition-all duration-300 border text-left ${
                      isActive 
                        ? "bg-[linear-gradient(135deg,#BF953F,#FCF6BA,#B38728)] border-transparent shadow-[0_10px_30px_rgba(191,149,63,0.3)] text-[#040814]" 
                        : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:border-[#BF953F]/30"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <category.icon className={`w-6 h-6 ${isActive ? "text-[#040814]" : "text-[#BF953F]"}`} />
                      <span className="font-bold text-sm md:text-base">{category.category}</span>
                    </div>
                    {isActive && <ChevronRight className="hidden lg:block w-5 h-5 text-[#040814]" />}
                  </button>
                );
              })}
            </div>

            {/* Content Area */}
            <div className="w-full lg:w-[70%]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeAestheticIdx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="w-full"
                >
                  <div className="bg-white/5 border border-white/10 rounded-3xl p-4 md:p-8 backdrop-blur-sm">
                    <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
                      <h3 className="text-xl md:text-2xl font-serif text-white font-bold">
                        {aestheticCourses[activeAestheticIdx].category}
                      </h3>
                      <span className="text-xs font-bold bg-white/10 text-[#FBF5B7] px-3 py-1.5 rounded-full border border-[#BF953F]/30">
                        {aestheticCourses[activeAestheticIdx].programs.length} Programs
                      </span>
                    </div>
                    
                    <div className="flex flex-col">
                      {aestheticCourses[activeAestheticIdx].programs.map((prog, i) => (
                        <CourseAccordion 
                          key={i} 
                          title={prog} 
                          duration={aestheticCourses[activeAestheticIdx].duration} 
                          theme="gold" 
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* ---------------- 2. DENTAL COURSES (Tabbed Layout) ---------------- */}
        <div>
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-2xl md:text-4xl font-serif text-[#88D4FF]">Dental Courses</h2>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-[#0074A5]/50 to-transparent" />
          </div>

          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
            {/* Sidebar Tabs */}
            <div className="w-full lg:w-[30%] flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 hide-scrollbar">
              {dentalCourses.map((category, idx) => {
                const isActive = activeDentalIdx === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveDentalIdx(idx)}
                    className={`flex items-center justify-between w-full min-w-[240px] lg:min-w-0 p-4 rounded-2xl transition-all duration-300 border text-left ${
                      isActive 
                        ? "bg-[linear-gradient(135deg,#0074A5,#88D4FF,#005B82)] border-transparent shadow-[0_10px_30px_rgba(0,116,165,0.3)] text-white" 
                        : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:border-[#88D4FF]/30"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <category.icon className={`w-6 h-6 ${isActive ? "text-white" : "text-[#88D4FF]"}`} />
                      <span className="font-bold text-sm md:text-base">{category.category}</span>
                    </div>
                    {isActive && <ChevronRight className="hidden lg:block w-5 h-5 text-white" />}
                  </button>
                );
              })}
            </div>

            {/* Content Area */}
            <div className="w-full lg:w-[70%]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeDentalIdx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="w-full"
                >
                  <div className="bg-white/5 border border-white/10 rounded-3xl p-4 md:p-8 backdrop-blur-sm">
                    <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
                      <h3 className="text-xl md:text-2xl font-serif text-white font-bold">
                        {dentalCourses[activeDentalIdx].category}
                      </h3>
                      <span className="text-xs font-bold bg-white/10 text-[#88D4FF] px-3 py-1.5 rounded-full border border-[#0074A5]/30">
                        {dentalCourses[activeDentalIdx].programs.length} Programs
                      </span>
                    </div>
                    
                    <div className="flex flex-col">
                      {dentalCourses[activeDentalIdx].programs.map((prog, i) => (
                        <CourseAccordion 
                          key={i} 
                          title={prog} 
                          duration={dentalCourses[activeDentalIdx].duration} 
                          theme="blue" 
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

      </div>

      {/* Global Style to hide scrollbar for tabs on mobile but allow scrolling */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </main>
  );
}