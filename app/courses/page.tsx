"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { GraduationCap, ArrowRight, BookOpenText, X, Globe, Award, Stethoscope, MessageCircle } from "lucide-react";

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

/* ---------------- 6 COURSES DATA ---------------- */
const courseData = [
  { id: 1, category: "Diploma", icon: BookOpenText, duration: "1 Year", programs: ["Clinical Cosmetology", "Medical Trichology", "Non Surgical Facial Aesthetics", "Bariatric Science"] },
  { id: 2, category: "Fellowship", icon: Award, duration: "6 Months", programs: ["Aesthetic Medicine", "Cosmetic Medicine", "Medical Cosmetology", "Non Surgical Facial Aesthetics"] },
  { id: 3, category: "Mastership", icon: GraduationCap, duration: "1 Year", programs: ["Implantology", "Aesthetic Dentistry (3 In 1)", "Endodontics"] },
  { id: 4, category: "PG Cert", icon: Globe, duration: "3-6 Months", programs: ["Advanced Lasers", "Chemical Peels", "Botulinum Toxin", "Dermal Fillers"] },
  { id: 5, category: "Dental Sci", icon: Stethoscope, duration: "Varies", programs: ["Laser Dentistry", "Cosmetic Dentistry", "Orthodontics"] },
  { id: 6, category: "M.SC", icon: BookOpenText, duration: "2 Years", programs: ["Facial Aesthetics", "Aesthetic Dentistry", "Trichology", "Cosmeceutical Science"] },
];

export default function Courses() {
  const [selectedBook, setSelectedBook] = useState<number | null>(null);
  const activeCourse = courseData.find(c => c.id === selectedBook);

  // SCROLL PHYSICS SETUP
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // 1. BAG LID ROTATION (Opens completely backwards)
  const bagLidRotation = useTransform(scrollYProgress, [0, 0.35], [0, 180]);
  
  // 2. STAGGERED BOOK TRANSLATIONS (Adjusted for taller bag)
  const bookY1 = useTransform(scrollYProgress, [0.15, 0.45], [0, -140]);
  const bookY2 = useTransform(scrollYProgress, [0.20, 0.50], [0, -170]);
  const bookY3 = useTransform(scrollYProgress, [0.25, 0.55], [0, -190]);
  const bookY4 = useTransform(scrollYProgress, [0.30, 0.60], [0, -190]);
  const bookY5 = useTransform(scrollYProgress, [0.35, 0.65], [0, -170]);
  const bookY6 = useTransform(scrollYProgress, [0.40, 0.70], [0, -140]);
  const bookTranslates = [bookY1, bookY2, bookY3, bookY4, bookY5, bookY6];

  // WHATSAPP REDIRECT FUNCTION
  const handleWhatsAppEnquiry = (courseCategory: string) => {
    const phoneNumber = "919884718883";
    const message = `Hello NSFA Academy, I am interested in learning more about the ${courseCategory} courses. Please send me the syllabus and enrollment details.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <main suppressHydrationWarning className="bg-[#040814] text-white min-h-screen">
      
      <section ref={containerRef} className="h-[300vh] relative">
        <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden perspective-[1500px]">
          
          <div className="absolute inset-0 bg-[linear-gradient(135deg,#050914_0%,#080E21_40%,#121F3D_100%)] -z-20" />
          <div className="absolute top-[20%] w-[60%] h-[60%] rounded-full bg-[#BF953F]/10 blur-[150px] -z-10 pointer-events-none" />

          <motion.div 
            style={{ opacity: useTransform(scrollYProgress, [0, 0.3], [1, 0]) }}
            className="absolute top-[10%] text-center z-10"
          >
            <h3 className="text-[#FFD700] tracking-[0.3em] uppercase mb-4 font-semibold text-sm drop-shadow-md">Scroll to Unveil</h3>
            <GoldText text="The Academic Library" className="text-5xl md:text-7xl drop-shadow-2xl" />
          </motion.div>

          {/* THE 2.5D BAG CONSTRUCT - HEIGHT INCREASED */}
          {/* Increased base height from 250px to 320px */}
          <div className="relative w-[360px] md:w-[750px] h-[320px] mt-40" style={{ transformStyle: "preserve-3d", transform: "rotateX(10deg)" }}>
            
            <div className="absolute top-0 w-full h-full bg-[#0A1128] rounded-b-3xl border border-white/5 shadow-inner z-0 flex items-center justify-center">
                 <div className="w-[90%] h-[80%] border-2 border-dashed border-[#BF953F]/20 rounded-xl" />
            </div>

            {/* THE BOOKS */}
            <div 
              className="absolute bottom-0 left-0 w-full flex justify-center -space-x-3 md:-space-x-6 px-4 z-10 h-full items-end pb-6"
              style={{ clipPath: "inset(-200% -50% 0 -50%)" }} 
            >
              {courseData.map((course, i) => (
                <motion.div
                  key={course.id}
                  style={{ y: bookTranslates[i] }} 
                  onClick={() => setSelectedBook(course.id)}
                  className="w-[70px] md:w-[110px] h-[160px] md:h-[220px] cursor-pointer group relative z-0 hover:z-50"
                >
                  <motion.div 
                    layoutId={`book-${course.id}`} 
                    className="w-full h-full bg-[linear-gradient(135deg,#1A2D4A,#080E21)] border border-[#BF953F]/40 rounded-r-xl rounded-l-sm shadow-[0_10px_20px_rgba(0,0,0,0.9)] flex flex-col items-center justify-center p-2 md:p-4 relative overflow-hidden transition-transform duration-300 group-hover:-translate-y-6 group-hover:rotate-y-[-10deg]"
                    style={{ transformOrigin: "left center" }}
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 md:w-2 bg-gradient-to-r from-[#BF953F] to-[#FCF6BA]" />
                    <course.icon className="w-6 h-6 md:w-8 md:h-8 text-[#FFD700] mb-2 md:mb-3 group-hover:scale-110 transition-transform" />
                    <motion.h4 layoutId={`title-${course.id}`} className="text-center font-serif text-[10px] md:text-sm font-bold text-white leading-tight">
                      {course.category}
                    </motion.h4>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Increased front wall height from 160px to 220px */}
            <div className="absolute bottom-0 w-full h-[220px] bg-[linear-gradient(180deg,#121F3D,#050914)] rounded-b-3xl rounded-t-lg border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.9)] z-30 flex items-center justify-center">
               <h2 className="font-serif text-[#BF953F]/30 text-4xl md:text-6xl font-bold uppercase tracking-widest mt-8">NSFA</h2>
            </div>

            {/* Increased lid height from 120px to 160px */}
            <motion.div
              style={{ rotateX: bagLidRotation, transformOrigin: "top center" }}
              className="absolute top-0 left-0 w-full h-[160px] bg-[linear-gradient(180deg,#1A2D4A,#121F3D)] rounded-b-3xl rounded-t-sm shadow-[0_10px_30px_rgba(0,0,0,0.6)] z-40 flex items-end justify-center pb-4 border-b border-white/20 backface-hidden"
            >
               <div className="w-20 h-10 bg-gradient-to-b from-[#FCF6BA] to-[#BF953F] rounded-b-lg shadow-lg border border-white/40 flex items-center justify-center">
                  <div className="w-8 h-1.5 bg-black/30 rounded-full" />
               </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ---------------- SMOOTH EXPANSION MODAL ---------------- */}
      <AnimatePresence>
        {activeCourse && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { delay: 0.2 } }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
            onClick={() => setSelectedBook(null)}
          >
            
            <motion.div
              layoutId={`book-${activeCourse.id}`} 
              className="w-full max-w-5xl h-[85vh] md:h-[600px] relative flex flex-col md:flex-row shadow-[0_20px_60px_rgba(191,149,63,0.4)] rounded-2xl overflow-hidden bg-[#080E21] border border-[#BF953F]/30"
              onClick={(e) => e.stopPropagation()}
            >
              
              <div className="w-full md:w-[40%] h-[30%] md:h-full bg-[linear-gradient(135deg,#1A2D4A,#080E21)] border-b md:border-b-0 md:border-r border-[#BF953F]/30 flex flex-col items-center justify-center p-8 relative">
                 <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-[#BF953F] to-[#FCF6BA] opacity-50" />
                 <activeCourse.icon className="w-16 h-16 md:w-24 md:h-24 text-[#FFD700] mb-6 drop-shadow-lg" />
                 <motion.h3 layoutId={`title-${activeCourse.id}`} className="text-3xl md:text-5xl font-serif text-white font-bold text-center drop-shadow-md">
                   {activeCourse.category}
                 </motion.h3>
              </div>

              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.1 } }} transition={{ delay: 0.3 }}
                className="w-full md:w-[60%] h-[70%] md:h-full p-8 md:p-12 flex flex-col relative overflow-y-auto"
              >
                 <button 
                  onClick={() => setSelectedBook(null)}
                  className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-[#FBF5B7] hover:border-[#BF953F]/50 transition-all z-10"
                >
                  <X size={20} />
                 </button>

                 <div className="w-12 h-1 bg-[#BF953F] mb-6 shrink-0" />
                 <h4 className="text-3xl font-serif text-[#FBF5B7] font-bold mb-4 shrink-0">Program Overview</h4>
                 <p className="text-white/70 leading-relaxed text-sm md:text-base mb-10 shrink-0">
                   Our {activeCourse.category} curriculum provides world-class, hands-on training for medical professionals. Focus on advanced clinical skills, patient safety, and aesthetic mastery.
                 </p>
                 
                 <h4 className="text-sm text-[#BF953F] uppercase tracking-[0.3em] font-bold mb-6 shrink-0">Modules Included</h4>
                 <ul className="space-y-4 mb-10 flex-grow">
                   {activeCourse.programs.map((program, idx) => (
                     <li key={idx} className="flex items-start gap-4 border-b border-white/10 pb-4">
                       <ArrowRight className="text-[#BF953F] w-5 h-5 shrink-0 mt-0.5 opacity-80" />
                       <span className="text-white/90 font-medium text-sm md:text-base">{program}</span>
                     </li>
                   ))}
                 </ul>

                 <div className="pt-8 border-t border-white/10 flex flex-wrap gap-4 justify-between items-center shrink-0">
                    <span className="px-5 py-2 rounded-full bg-white/5 border border-white/10 text-white/50 text-sm tracking-wide">
                      Course Duration: <strong className="text-white">{activeCourse.duration}</strong>
                    </span>
                    
                    {/* WHATSAPP BUTTON */}
                    <button 
                      onClick={() => handleWhatsAppEnquiry(activeCourse.category)}
                      className="px-6 py-3 rounded-xl font-bold text-[#080E21] tracking-wider uppercase cursor-pointer shadow-lg hover:scale-105 transition-transform flex items-center gap-2" 
                      style={{ background: "linear-gradient(45deg, #BF953F, #FCF6BA, #B38728)" }}
                    >
                        <MessageCircle size={20} />
                        Enquire Now
                    </button>
                 </div>

              </motion.div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}