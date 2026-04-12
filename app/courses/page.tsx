// src/app/courses/page.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, ArrowRight } from "lucide-react";

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

const courseData = [
  {
    category: "Diploma Courses",
    programs: [
      "PG Diploma Clinical Cosmetology and Trichology",
      "PG Diploma in Medical Trichology, Trichopigmentation and Nutraceuticals",
      "PG Diploma in Non Surgical Facial Aesthetics",
      "PG Diploma in Bariatric Science and Nutrition"
    ]
  },
  {
    category: "Fellowship Courses",
    programs: [
      "Fellowship in Non Surgical Facial Aesthetics",
      "Fellowship in Medical Cosmetology",
      "Fellowship in Aesthetic Medicine",
      "Fellowship in Cosmetic Medicine"
    ]
  },
  {
    category: "M.SC Courses",
    programs: [
      "M.SC in Facial Aesthetics & Cosmetology",
      "M.SC in Aesthetic Dentistry",
      "M.SC in Cosmeceutical Science",
      "M.SC in Aesthetic Medicine",
      "M.SC in Trichology"
    ]
  },
  {
    category: "Advanced Dental Science",
    programs: [
      "Fellowship In Laser Dentistry",
      "Fellowship In Cosmetic Dentistry",
      "Fellowship In Orthodontics",
      "Mastership In Implantology",
      "Mastership In Aesthetic Dentistry (3 In 1) Course",
      "Mastership In Endodontics"
    ]
  },
  {
    category: "PG Certification",
    programs: [
      "Certification Training in Advanced Lasers",
      "Certification Training in Chemical Peels and Medifacial",
      "Certification Training in Botulinum Toxin",
      "Certification Training in Dermal Fillers",
      "Certification Training in Biostimulation in Aesthetics"
    ]
  }
];

export default function Courses() {
  return (
    <main suppressHydrationWarning className="bg-[#040814] text-white min-h-screen pt-32 pb-24 relative overflow-hidden">
      
      {/* Background Texture */}
      <style dangerouslySetInnerHTML={{__html: `
        .bg-grid-pattern {
          background-size: 40px 40px;
          background-image: linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
        }
      `}} />
      <div className="absolute inset-0 bg-grid-pattern z-0 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} 
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-[#BF953F]/50 bg-[#BF953F]/10 text-[#FBF5B7] text-sm font-bold tracking-widest uppercase mb-6">
            <GraduationCap size={16} /> First in India to Launch Cosmetic Medicine
          </div>
          <GoldText text="Academic Catalog" className="text-5xl md:text-7xl mb-6" />
          <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto font-light">
            Comprehensive training and upgradation of knowledge. Browse our internationally accredited curriculums.
          </p>
        </motion.div>

        {/* Dynamic Course Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          {courseData.map((category, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl group hover:border-[#BF953F]/50 transition-colors"
              style={{ background: "linear-gradient(165deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 100%)" }}
            >
              <h3 className="text-2xl font-serif text-[#FBF5B7] mb-6 pb-6 border-b border-white/10">
                {category.category}
              </h3>
              
              <ul className="space-y-4">
                {category.programs.map((program, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-3 group/item cursor-pointer">
                    <ArrowRight className="text-[#BF953F] w-5 h-5 shrink-0 mt-0.5 opacity-50 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all" />
                    <span className="text-white/80 group-hover/item:text-white leading-snug transition-colors text-sm font-medium">
                      {program}
                    </span>
                  </li>
                ))}
              </ul>

              <button className="mt-8 w-full py-3 rounded-xl border border-[#BF953F]/30 text-[#FBF5B7] font-semibold text-sm tracking-wider uppercase hover:bg-[#BF953F] hover:text-[#040814] transition-all">
                View Syllabus
              </button>
            </motion.div>
          ))}
        </div>

      </div>
    </main>
  );
}