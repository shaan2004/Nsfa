"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Calendar, ChevronRight, User } from "lucide-react";
import Image from "next/image";

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

const premiumGoldGradient = "bg-[linear-gradient(145deg,#D4AF37_0%,#FFF2CD_45%,#AA771C_100%)]";

/* ---------------- DUMMY BLOG DATA ---------------- */
const categories = ["All", "Aesthetics", "Clinical Training", "Dental Science", "Industry News"];

const blogPosts = [
  {
    id: 1,
    title: "The Future of Non-Surgical Facelifts: PDO Threads vs. Dermal Fillers",
    category: "Aesthetics",
    author: "Dr. Sarah Jenkins",
    date: "April 10, 2026",
    image: "/assets/fillers.jpg", 
    excerpt: "An in-depth clinical comparison of lifting capacities, longevity, and patient satisfaction rates between threads and advanced volumizers.",
  },
  {
    id: 2,
    title: "Mastering the Golden Ratio in Facial Contouring",
    category: "Clinical Training",
    author: "NSFA Faculty",
    date: "April 05, 2026",
    image: "/assets/facial.jpg",
    excerpt: "How to apply the mathematical principles of Phi (1.618) to achieve natural, hyper-realistic results in aesthetic medicine.",
  },
  {
    id: 3,
    title: "Breakthroughs in Aesthetic Dentistry 2026",
    category: "Dental Science",
    author: "Dr. Michael Chen",
    date: "March 28, 2026",
    image: "/assets/dental.jpg",
    excerpt: "Exploring the latest composite materials and digital smile design software revolutionizing the dental cosmetic industry.",
  },
  {
    id: 4,
    title: "Navigating FDA Regulations for New Cosmetic Injectables",
    category: "Industry News",
    author: "Legal Dept",
    date: "March 15, 2026",
    image: "/assets/injectables.jpg",
    excerpt: "A comprehensive guide for practitioners on staying compliant with the newest regulatory updates regarding off-label filler usage.",
  },
  {
    id: 5,
    title: "Advanced Botox Techniques for the Lower Face",
    category: "Clinical Training",
    author: "NSFA Faculty",
    date: "March 02, 2026",
    image: "/assets/face.jpg",
    excerpt: "Clinical insights into treating masseters, DAO, and perioral rhytids for complete lower facial rejuvenation.",
  }
];

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <main suppressHydrationWarning className="bg-[#040814] text-white min-h-screen pt-32 pb-32 relative overflow-hidden">
      
      {/* ---------------- 1. GLOWING BRAIN BACKGROUND ---------------- */}
      <div className="absolute top-0 left-0 w-full h-[600px] z-0 overflow-hidden pointer-events-none flex items-center justify-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.15)_0%,rgba(0,0,0,0)_60%)] blur-[50px]" />
        
        <motion.div
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.02, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-[600px] h-[600px] opacity-40 mix-blend-screen"
        >
          <Image 
            src="/assets/brain-glow.png" 
            alt="Neural Network Brain" 
            fill
            sizes="(max-width: 768px) 100vw, 600px" // Fixed missing sizes warning
            className="object-contain drop-shadow-[0_0_50px_rgba(212,175,55,0.6)]" 
            priority
          />
        </motion.div>
        
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-[#040814] to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        {/* ---------------- 2. HEADER SECTION ---------------- */}
        <div className="text-center mb-16 max-w-4xl mx-auto pt-10">
          <motion.h3 
            initial={{ opacity: 0, letterSpacing: "0.1em" }} animate={{ opacity: 1, letterSpacing: "0.3em" }} transition={{ duration: 1.5, ease: "easeOut" }}
            className="text-[#D4AF37] uppercase mb-6 text-sm font-bold tracking-[0.3em]"
          >
            Insights & Innovation
          </motion.h3>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
             <GoldText text="ACADEMY BLOG" className="text-5xl md:text-8xl lg:text-[7rem] mb-8" />
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }}
            className="text-white/70 text-lg md:text-xl font-light font-serif italic leading-relaxed max-w-3xl mx-auto"
          >
            Explore the intersection of medical science and artistic mastery. Dive into clinical discussions, technique breakdowns, and the latest research defining the future of aesthetics.
          </motion.p>
        </div>

        {/* ---------------- 3. FUNCTIONAL SEARCH & FILTER BAR ---------------- */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-16 bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 shrink-0 ${
                  activeCategory === category
                    ? `${premiumGoldGradient} text-[#040814] shadow-[0_5px_20px_rgba(212,175,55,0.4)] border-transparent`
                    : "bg-white/5 border border-white/10 text-white/60 hover:text-white active:bg-white/10 hover:bg-white/10 hover:border-[#D4AF37]/50 active:border-[#D4AF37]/50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80 group">
            <input 
              type="text" 
              placeholder="Search articles..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0A1128]/80 border border-white/20 text-white rounded-full py-3 pl-12 pr-4 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/50 transition-all duration-300"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-[#D4AF37] transition-colors w-5 h-5" />
          </div>
        </div>

        {/* ---------------- 4. BLOG POSTS GRID ---------------- */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-20">
            <h4 className="text-2xl text-white/50 font-serif">No articles found matching your criteria.</h4>
            <button onClick={() => {setSearchQuery(""); setActiveCategory("All");}} className="mt-4 text-[#D4AF37] underline hover:text-white transition-colors">Clear all filters</button>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-10">
            <AnimatePresence mode="popLayout">
              {filteredPosts.map((post) => (
                <motion.article
                  key={post.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  tabIndex={0}
                  className="bg-[#0A1128] border border-white/10 rounded-2xl md:rounded-[2rem] overflow-hidden shadow-2xl group cursor-pointer hover:-translate-y-2 active:-translate-y-2 transition-all duration-500 hover:border-[#BF953F]/60 active:border-[#BF953F]/60 hover:shadow-[0_15px_40px_rgba(191,149,63,0.3)] active:shadow-[0_15px_40px_rgba(191,149,63,0.3)] flex flex-col h-full"
                >
                  {/* Post Image */}
                  <div className="relative h-32 md:h-64 overflow-hidden bg-black">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#121F3D] to-[#0A1128]" />
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 1024px) 50vw, 33vw" // Fixed missing sizes warning
                      className="object-cover transition-transform duration-1000 group-hover:scale-110 group-active:scale-110 opacity-80 group-hover:opacity-100 group-active:opacity-100 mix-blend-lighten"
                    />
                    <div className="absolute top-2 right-2 md:top-4 md:right-4 bg-[#040814]/80 backdrop-blur-md border border-[#BF953F]/50 px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[#FBF5B7] text-[10px] md:text-xs font-bold uppercase tracking-wider shadow-lg">
                      {post.category}
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="p-4 md:p-8 flex flex-col flex-grow">
                    <h4 className="text-base md:text-2xl font-serif font-bold text-white mb-2 md:mb-4 leading-tight group-hover:text-transparent group-active:text-transparent group-hover:bg-clip-text group-active:bg-clip-text group-hover:bg-[linear-gradient(to_right,#BF953F,#FCF6BA,#B38728)] group-active:bg-[linear-gradient(to_right,#BF953F,#FCF6BA,#B38728)] transition-all duration-500">
                      {post.title}
                    </h4>
                    
                    <p className="text-white/60 text-xs md:text-base font-light leading-relaxed mb-4 md:mb-8 line-clamp-2 md:line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="mt-auto pt-4 md:pt-6 border-t border-white/10 flex items-center justify-between">
                      <div className="flex flex-col gap-1">
                        <span className="flex items-center gap-1 md:gap-2 text-[10px] md:text-xs text-white/50 uppercase tracking-widest"><User size={12}/> {post.author}</span>
                        <span className="flex items-center gap-1 md:gap-2 text-[10px] md:text-xs text-white/50 uppercase tracking-widest"><Calendar size={12}/> {post.date}</span>
                      </div>
                      
                      <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-white/5 border border-white/10 flex shrink-0 items-center justify-center group-hover:bg-[linear-gradient(135deg,#BF953F,#FCF6BA,#B38728)] group-active:bg-[linear-gradient(135deg,#BF953F,#FCF6BA,#B38728)] group-hover:border-transparent group-active:border-transparent transition-all duration-300 group-hover:shadow-[0_5px_15px_rgba(191,149,63,0.4)] group-active:shadow-[0_5px_15px_rgba(191,149,63,0.4)]">
                        <ChevronRight className="w-4 h-4 md:w-6 md:h-6 text-white/50 group-hover:text-[#040814] group-active:text-[#040814] transition-colors" />
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

      </div>
    </main>
  );
}