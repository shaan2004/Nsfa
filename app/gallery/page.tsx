"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Images, MousePointerClick, MapPin } from "lucide-react";
import Image from "next/image";
import Masonry from "../../components/ui/Masonry/Masonry"; // Verify this path matches your folder structure!

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

// HELPER: Generates the "First Guess" image paths. 
// If the guess is wrong (e.g. .jpeg instead of .jpg), our Masonry component will auto-fix it.
const generateImagePaths = (basePath: string, totalImages: number, ext: string = "JPG", prefix: string = "") => {
  return Array.from({ length: totalImages }, (_, index) => {
    const separator = basePath === "" ? "" : "/";
    return `${basePath}${separator}${prefix}${index + 1}.${ext}`;
  });
};

const premiumGoldGradient = "bg-[linear-gradient(145deg,#D4AF37_0%,#FFF2CD_45%,#AA771C_100%)]";

/* ---------------- GALLERY DATA STRUCTURE (SORTED NEWEST TO OLDEST) ---------------- */
const galleryEvents = [
  //2026
  { id: "11", category: "Dubai", title: "Dubai Masterclass Experience 2026", cover: "/assets/Dubai/d9.JPG", images: generateImagePaths("/assets/Dubai", 30, "jpeg", "d") },
  { id: "1", category: "Bangkok", title: "Bankok Masterclass Experience 2026", cover: "/assets/bankok/b18.jpeg", images: generateImagePaths("/assets/bankok", 76, "jpeg", "b") },  

  // 2022
  { id: "4", category: "Dubai", title: "July Batch Awards", cover: "/assets/july-2021-award/1.jpg", images: generateImagePaths("/assets/july-2021-award", 65) },
  { id: "6", category: "India", title: "Certificate Award Ceremony", cover: "/assets/certificate awards/1.jpg", images: generateImagePaths("/assets/certificate awards", 25) },

  { id: "8", category: "Korea", title: "February Batch Awards", cover: "/assets/feb-2022/1.jpeg", images: generateImagePaths("/assets/feb-2022", 4, "jpeg") },
  { id: "7", category: "Korea", title: "January Batch Awards", cover: "/assets/jan-2022/1.jpeg", images: generateImagePaths("/assets/jan-2022", 9, "jpeg") },
  
  // 2021

  { id: "5", category: "Dubai", title: "July 2021 Batch Training", cover: "/assets/july-2021/1.jpg", images: generateImagePaths("/assets/july-2021", 7) },

  

  // Undated / Ongoing India & PMU Batches
  { id: "9", category: "India", title: "PMU1 Batch Awards", cover: "/assets/pmu1/1.jpeg", images: generateImagePaths("/assets/pmu1", 11, "jpeg") },
  { id: "10", category: "India", title: "PMU2 Batch Awards", cover: "/assets/pmu2/1.jpeg", images: generateImagePaths("/assets/pmu2", 8, "jpeg") },
  { id: "2", category: "India", title: "Lecture Sessions", cover: "/assets/lecture session/1.jpg", images: generateImagePaths("/assets/lecture session", 8) },
  { id: "3", category: "India", title: "Practise Sessions", cover: "/assets/practice session/1.jpg", images: generateImagePaths("/assets/practice session", 22) }
];

const categories = ["All", "India", "Dubai", "Korea", "Bangkok"];

/* ---------------- PAGE ---------------- */
export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeCarouselIndex, setActiveCarouselIndex] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState<typeof galleryEvents[0] | null>(null);

  const filteredEvents = activeCategory === "All" 
    ? galleryEvents 
    : galleryEvents.filter(event => event.category === activeCategory);

  // Convert raw image strings into the Masonry Object Format dynamically
  const masonryItems = useMemo(() => {
    if (!selectedEvent) return [];
    
    // Tighter height constraints ensure Next/Image `objectFit="cover"` looks perfect without severe cropping
    const heights = [350, 450, 400, 500, 300, 450]; 
    
    return selectedEvent.images.map((src, i) => ({
      id: `${selectedEvent.id}-${i}`,
      img: src,
      url: src, 
      height: heights[i % heights.length]
    }));
  }, [selectedEvent]);

  useEffect(() => {
    setActiveCarouselIndex(0);
  }, [activeCategory]);

  const handleCarouselNext = () => {
    if (activeCarouselIndex < filteredEvents.length - 1) setActiveCarouselIndex(prev => prev + 1);
  };

  const handleCarouselPrev = () => {
    if (activeCarouselIndex > 0) setActiveCarouselIndex(prev => prev - 1);
  };

  const closeLightbox = () => setSelectedEvent(null);
  const openLightbox = (event: typeof galleryEvents[0]) => setSelectedEvent(event);

  return (
    <main suppressHydrationWarning className="bg-[#040814] text-white min-h-screen pt-32 pb-32 relative overflow-hidden">
      
      {/* ---------------- DYNAMIC AURORA BACKGROUND (Optimized) ---------------- */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(212,175,55,0.15) 0%, rgba(0,0,0,0) 70%), willChange: opacity" }}
        />
        <motion.div
          animate={{ opacity: [0.1, 0.25, 0.1] }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] right-[-10%] w-[900px] h-[900px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(0,116,165,0.15) 0%, rgba(0,0,0,0) 70%), willChange: opacity" }}
        />
      </div>

      <div className="max-w-[1920px] mx-auto relative z-10">
        
        {/* 1. HEADER */}
        <div className="text-center mb-10 max-w-3xl mx-auto px-4">
          <motion.h3 
            initial={{ opacity: 0, letterSpacing: "0.1em" }} animate={{ opacity: 1, letterSpacing: "0.4em" }} transition={{ duration: 1.5, ease: "easeOut" }}
            className="text-[#D4AF37] uppercase mb-4 text-sm font-bold"
          >
            A Glimpse of Excellence
          </motion.h3>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
             <GoldText text="The NSFA Gallery" className="text-4xl md:text-6xl mb-6" />
          </motion.div>
          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }}
            className="text-white/70 text-base md:text-xl font-light font-serif italic"
          >
            Explore the vibrant academic life, cutting-edge facilities, and proud moments of our international scholars.
          </motion.p>
        </div>

        {/* 2. CATEGORY FILTERS */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-3 md:gap-4 mb-8 md:mb-12 px-4"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 md:px-8 md:py-3 rounded-full md:rounded-2xl text-[10px] md:text-xs font-bold tracking-widest uppercase transition-all duration-300 ${
                activeCategory === category
                  ? `${premiumGoldGradient} text-[#040814] shadow-[0_5px_20px_rgba(212,175,55,0.4)] scale-105 border-transparent`
                  : "bg-white/5 border border-white/10 text-white/60 hover:text-white active:bg-white/10 hover:bg-white/10 hover:border-[#D4AF37]/50 active:border-[#D4AF37]/50"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* 3. 3D SPIRAL CAROUSEL */}
        <div className="relative w-full h-[500px] md:h-[650px] flex items-center justify-center perspective-[1500px]">
          
          <button 
            onClick={handleCarouselPrev} disabled={activeCarouselIndex === 0}
            className="absolute left-4 md:left-12 z-50 p-3 md:p-5 rounded-full bg-[#0A1128]/80 border border-[#BF953F]/40 text-[#FBF5B7] hover:bg-[#D4AF37] hover:text-[#040814] disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-[0_0_30px_rgba(0,0,0,0.8)] backdrop-blur-md"
          >
            <ChevronLeft size={28} />
          </button>

          <button 
            onClick={handleCarouselNext} disabled={activeCarouselIndex === filteredEvents.length - 1}
            className="absolute right-4 md:right-12 z-50 p-3 md:p-5 rounded-full bg-[#0A1128]/80 border border-[#BF953F]/40 text-[#FBF5B7] hover:bg-[#D4AF37] hover:text-[#040814] disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-[0_0_30px_rgba(0,0,0,0.8)] backdrop-blur-md"
          >
            <ChevronRight size={28} />
          </button>

          {/* Render Spiral Cards (OPTIMIZED) */}
          <div className="relative w-[280px] h-[380px] md:w-[400px] md:h-[500px] transform-style-3d">
            <AnimatePresence>
              {filteredEvents.map((event, index) => {
                const offset = index - activeCarouselIndex;
                const absOffset = Math.abs(offset);
                const sign = Math.sign(offset);
                
                // PERFORMANCE: Drop cards that are too far back from the DOM entirely
                if (absOffset > 4) return null;

                const xOffset = offset * (typeof window !== "undefined" && window.innerWidth < 768 ? 100 : 180);
                const zOffset = absOffset * -200;
                const yOffset = absOffset * 25; 
                const rotateY = sign * -25; 
                const rotateZ = offset * 2;
                
                const isActive = offset === 0;

                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ 
                      x: xOffset, y: yOffset, z: zOffset, rotateY: rotateY, rotateZ: rotateZ,
                      opacity: isActive ? 1 : 1 - (absOffset * 0.25),
                      scale: isActive ? 1 : 0.9,
                      zIndex: 100 - absOffset
                    }}
                    transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
                    className={`absolute inset-0 rounded-[2rem] shadow-[0_30px_60px_rgba(0,0,0,0.8)] ${isActive ? "cursor-pointer" : "cursor-pointer"} border ${isActive ? "border-[#BF953F]" : "border-white/10"} overflow-hidden bg-[#0A1128]`}
                    style={{ willChange: "transform, opacity" }} // Hardware Acceleration
                    onClick={() => {
                      if (isActive) { openLightbox(event); } 
                      else { setActiveCarouselIndex(index); }
                    }}
                  >
                    {/* The Image (OPTIMIZED WITH NEXT/IMAGE) */}
                    <div className="absolute inset-0 bg-black">
                      <Image
                        src={event.cover}
                        alt={event.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 500px"
                        className={`object-cover transition-transform duration-1000 ${isActive ? "hover:scale-110" : ""}`}
                        priority={absOffset <= 1}
                        loading={absOffset > 1 ? "lazy" : undefined}
                      />
                    </div>
                    
                    {/* Dark gradient overlay for non-active cards */}
                    <div className={`absolute inset-0 bg-black transition-opacity duration-700 pointer-events-none ${isActive ? "opacity-0" : "opacity-60"}`} />
                    
                    {/* Inner content overlay for ACTIVE card */}
                    <motion.div 
                      animate={{ opacity: isActive ? 1 : 0 }}
                      className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-6 md:p-8 pointer-events-none"
                    >
                      <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md border border-[#BF953F]/50 px-3 py-1.5 rounded-xl flex items-center gap-2">
                        <Images size={14} className="text-[#FBF5B7]" />
                        <span className="text-[#FBF5B7] text-xs font-bold">{event.images.length} Photos</span>
                      </div>

                      <span className="text-[#BF953F] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-2 drop-shadow-md">
                        {event.category}
                      </span>
                      <h4 className="text-white font-serif text-xl md:text-3xl font-bold mb-4 leading-tight drop-shadow-lg">
                        {event.title}
                      </h4>
                      
                      <div className="flex items-center gap-3 text-[#FBF5B7] text-sm font-bold uppercase tracking-widest group">
                        <MousePointerClick size={18} className="animate-pulse" />
                        Click to view album
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

      </div>

      {/* 4. THE MASONRY GALLERY MODAL (FIXED & OPTIMIZED) */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-[#040814] flex flex-col items-center justify-start p-4 md:p-10"
          >
            {/* Modal Header */}
            <div className="w-full max-w-7xl flex items-center justify-between mb-8 shrink-0 relative z-[99999] mt-12 md:mt-0">
              <div>
                <h3 className="text-[#FBF5B7] text-2xl md:text-4xl font-serif font-bold drop-shadow-md">
                  {selectedEvent.title}
                </h3>
                <p className="text-white/50 text-sm uppercase tracking-widest mt-2 flex items-center gap-2">
                  <MapPin size={16} className="text-[#BF953F]" /> {selectedEvent.category} • {selectedEvent.images.length} Photos
                </p>
              </div>
              <button 
                onClick={closeLightbox}
                className="relative z-[99999] p-3 rounded-full bg-white/10 hover:bg-[#BF953F] hover:text-[#040814] transition-all text-white shadow-xl border border-white/20 cursor-pointer"
              >
                <X size={28} />
              </button>
            </div>

            {/* Masonry Container */}
            <div className="w-full max-w-7xl flex-1 relative bg-black/40 rounded-3xl overflow-y-auto custom-scrollbar p-2 border border-white/5 shadow-inner">
               {/* No fixed height needed - Masonry automatically calculates it! */}
               <div className="w-full relative"> 
                <Masonry
                  items={masonryItems}
                  scaleOnHover={true}
                  hoverScale={0.98}
                />
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0,0,0,0.2); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(191, 149, 63, 0.5); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(191, 149, 63, 0.8); }
      `}} />

    </main>
  );
}