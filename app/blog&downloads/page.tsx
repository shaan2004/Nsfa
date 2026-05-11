"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Calendar, ChevronRight, User, FileText, Download, BookOpen } from "lucide-react";
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

/* ---------------- DATA ARRAYS ---------------- */
const categories = ["All", "India", "Dubai", "Korea", "Bangkok"];

const blogPosts = [
  { id: 1, title: "Mastering Facial Aesthetics in Chennai", category: "India", author: "Dr. Sarah Jenkins", date: "April 10, 2026", image: "/assets/fillers.jpg", excerpt: "An inside look at our Level 4 Fellowship program in India, covering advanced clinical cosmetology." },
  { id: 2, title: "Global Exposure: Dubai Master Fellowship", category: "Dubai", author: "NSFA Faculty", date: "April 05, 2026", image: "/assets/facial.jpg", excerpt: "How our multi-level certification in Dubai is creating global placement opportunities." },
  { id: 3, title: "Exclusive Korea University Programme", category: "Korea", author: "Dr. Michael Chen", date: "March 28, 2026", image: "/assets/dental.jpg", excerpt: "Exploring the cutting-edge techniques and monopoly training offered in South Korea." },
  { id: 4, title: "ISPMU Permanent Makeup Masterclass", category: "Bangkok", author: "NSFA Faculty", date: "March 15, 2026", image: "/assets/injectables.jpg", excerpt: "A comprehensive review of the advanced PMU techniques taught during our Bangkok masterclass." },
  { id: 5, title: "Setting Up Your Aesthetic Clinic in India", category: "India", author: "Business Dept", date: "March 02, 2026", image: "/assets/face.jpg", excerpt: "Insights from our Business classes to help you launch your own successful clinic in India." }
];

const downloads = [
  { id: "d1", title: "Aesthetic Clinical Set Up In India", desc: "Guidelines for reference regarding setting up an aesthetic clinical practice in India.", file: "/assets/CLINICAL.pdf" },
  { id: "d2", title: "Global Aesthetic Guidelines for Injectables", desc: "Botulinum Toxin & Dermal Fillers for cosmetic indications globally accepted standards.", file: "/assets/comman.pdf" },
];

export default function BlogAndDownloads() {
  const [activeTab, setActiveTab] = useState<"blog" | "downloads">("blog");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  // Memoized filtering for performance
  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesCategory = activeCategory === "All" || post.category === activeCategory;
      const matchesSearch = 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <main suppressHydrationWarning className="bg-[#040814] text-white min-h-screen pt-32 pb-32 relative overflow-hidden">
      
      {/* ---------------- 1. GLOWING BRAIN BACKGROUND (OPTIMIZED) ---------------- */}
      <div className="absolute top-0 left-0 w-full h-[600px] z-0 overflow-hidden pointer-events-none flex items-center justify-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.12)_0%,rgba(0,0,0,0)_60%)] blur-[50px]" />
        
        <motion.div
          animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.02, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-[600px] h-[600px] opacity-40 mix-blend-screen"
          style={{ willChange: "transform, opacity" }}
        >
          <Image 
            src="/assets/brain-glow.png" 
            alt="Neural Network Brain" 
            fill
            sizes="600px" 
            className="object-contain drop-shadow-[0_0_50px_rgba(212,175,55,0.4)]" 
            priority
          />
        </motion.div>
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-[#040814] to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        {/* ---------------- 2. HEADER SECTION ---------------- */}
        <div className="text-center mb-12 max-w-4xl mx-auto pt-10">
          <motion.h3 
            initial={{ opacity: 0, letterSpacing: "0.1em" }} animate={{ opacity: 1, letterSpacing: "0.3em" }} transition={{ duration: 1.5, ease: "easeOut" }}
            className="text-[#D4AF37] uppercase mb-6 text-sm font-bold tracking-[0.3em]"
          >
            Insights, Innovation & Resources
          </motion.h3>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
             <GoldText text="BLOG & DOWNLOADS" className="text-4xl md:text-6xl lg:text-7xl xl:text-[6rem] mb-8" />
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }}
            className="text-white/70 text-lg md:text-xl font-light font-serif italic leading-relaxed max-w-3xl mx-auto"
          >
            Explore global clinical discussions, technique breakdowns, and download essential regulatory guidelines.
          </motion.p>
        </div>

        {/* ---------------- 3. MAIN NAVIGATION TABS ---------------- */}
        <div className="flex justify-center mb-16">
          <div className="bg-[#0A1128] border border-white/10 p-2 rounded-full inline-flex relative shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            <motion.div 
              className="absolute top-2 bottom-2 w-[calc(50%-8px)] rounded-full bg-[linear-gradient(135deg,#BF953F,#FCF6BA,#B38728)] shadow-[0_5px_15px_rgba(191,149,63,0.4)]"
              animate={{ x: activeTab === "blog" ? 0 : "100%" }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              style={{ willChange: "transform" }}
            />
            
            <button 
              onClick={() => setActiveTab("blog")}
              className={`relative z-10 px-8 py-3 md:px-12 md:py-4 flex items-center gap-2 rounded-full font-bold text-xs md:text-sm tracking-widest uppercase transition-colors duration-300 ${activeTab === "blog" ? "text-[#080E21]" : "text-white/60 hover:text-white"}`}
            >
              <BookOpen size={18} /> Read Articles
            </button>
            <button 
              onClick={() => setActiveTab("downloads")}
              className={`relative z-10 px-8 py-3 md:px-12 md:py-4 flex items-center gap-2 rounded-full font-bold text-xs md:text-sm tracking-widest uppercase transition-colors duration-300 ${activeTab === "downloads" ? "text-[#080E21]" : "text-white/60 hover:text-white"}`}
            >
              <Download size={18} /> Official Guidelines
            </button>
          </div>
        </div>

        {/* ---------------- 4. TAB CONTENT AREA ---------------- */}
        <AnimatePresence mode="wait">
          
          {activeTab === "blog" && (
            <motion.div
              key="blog-view"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}
            >
              <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 bg-white/[0.03] backdrop-blur-xl border border-white/10 p-4 rounded-3xl shadow-lg">
                <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`px-6 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 shrink-0 ${
                        activeCategory === category
                          ? `${premiumGoldGradient} text-[#040814] shadow-[0_5px_20px_rgba(212,175,55,0.4)]`
                          : "bg-white/5 border border-white/10 text-white/60 hover:text-white hover:border-[#D4AF37]/50"
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
                    className="w-full bg-[#0A1128]/80 border border-white/20 text-white rounded-full py-3 pl-12 pr-4 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/50 transition-all"
                  />
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-[#D4AF37] transition-colors w-5 h-5" />
                </div>
              </div>

              {filteredPosts.length === 0 ? (
                <div className="text-center py-20">
                  <h4 className="text-2xl text-white/50 font-serif">No articles found.</h4>
                  <button onClick={() => {setSearchQuery(""); setActiveCategory("All");}} className="mt-4 text-[#D4AF37] underline hover:text-white transition-colors">Clear all filters</button>
                </div>
              ) : (
                <motion.div layout className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-10">
                  <AnimatePresence mode="popLayout">
                    {filteredPosts.map((post) => (
                      <motion.article
                        key={post.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.4 }}
                        className="bg-[#0A1128] border border-white/10 rounded-2xl md:rounded-[2rem] overflow-hidden shadow-2xl group cursor-pointer hover:-translate-y-2 transition-all duration-500 hover:border-[#BF953F]/60 flex flex-col h-full"
                        style={{ willChange: "transform, opacity" }}
                      >
                        <div className="relative h-32 md:h-64 overflow-hidden bg-black">
                          <Image 
                            src={post.image} 
                            alt={post.title} 
                            fill 
                            sizes="(max-width: 1024px) 50vw, 33vw" 
                            className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100 mix-blend-lighten" 
                          />
                          <div className="absolute top-2 right-2 md:top-4 md:right-4 bg-[#040814]/80 backdrop-blur-md border border-[#BF953F]/50 px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[#FBF5B7] text-[10px] md:text-xs font-bold uppercase tracking-wider">
                            {post.category}
                          </div>
                        </div>

                        <div className="p-4 md:p-8 flex flex-col flex-grow">
                          <h4 className="text-base md:text-2xl font-serif font-bold text-white mb-2 md:mb-4 leading-tight group-hover:text-[#FBF5B7] transition-colors duration-500">
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
                            <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-white/5 border border-white/10 flex shrink-0 items-center justify-center group-hover:bg-[linear-gradient(135deg,#BF953F,#FCF6BA,#B38728)] group-hover:border-transparent transition-all duration-300">
                              <ChevronRight className="w-4 h-4 md:w-6 md:h-6 text-white/50 group-hover:text-[#040814] transition-colors" />
                            </div>
                          </div>
                        </div>
                      </motion.article>
                    ))}
                  </AnimatePresence>
                </motion.div>
              )}
            </motion.div>
          )}

          {activeTab === "downloads" && (
            <motion.div
              key="downloads-view"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}
              className="pt-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
                {downloads.map((doc, i) => (
                  <motion.a
                    key={doc.id}
                    href={doc.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: i * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="bg-[#0A1128]/80 backdrop-blur-md border border-[#BF953F]/30 p-6 md:p-8 rounded-[2rem] flex flex-col h-full group transition-all duration-300 hover:border-[#BF953F]"
                    style={{ willChange: "transform" }}
                  >
                    <div className="w-14 h-14 rounded-2xl bg-[#040814] border border-[#BF953F]/50 flex items-center justify-center mb-6 shadow-inner group-hover:bg-[linear-gradient(135deg,#BF953F,#FCF6BA,#B38728)] transition-all duration-500">
                      <FileText className="w-7 h-7 text-[#FBF5B7] group-hover:text-[#040814] transition-colors duration-500" />
                    </div>
                    
                    <h4 className="text-lg md:text-xl font-serif font-bold text-white mb-3 leading-snug group-hover:text-[#FBF5B7] transition-colors">
                      {doc.title}
                    </h4>
                    
                    <p className="text-white/60 text-sm font-light leading-relaxed mb-8 flex-grow">
                      {doc.desc}
                    </p>

                    <div className="mt-auto flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-[#D4AF37] group-hover:text-white transition-colors">
                      <Download size={16} className="animate-bounce" /> Download PDF
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </main>
  );
}