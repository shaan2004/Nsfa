"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Images } from "lucide-react";
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

// Helper function to generate an array of image paths
const generateImagePaths = (basePath: string, totalImages: number, ext: string = "jpg") => {
  return Array.from({ length: totalImages }, (_, index) => `${basePath}/${index + 1}.${ext}`);
};

// Premium Metallic Gold Gradient
const premiumGoldGradient = "bg-[linear-gradient(145deg,#D4AF37_0%,#FFF2CD_45%,#AA771C_100%)]";

/* ---------------- GALLERY DATA STRUCTURE ---------------- */
const galleryEvents = [
  { id: "1", category: "Awards", title: "Certificate Award Ceremony", cover: "/assets/certificate awards/1.jpg", images: generateImagePaths("/assets/certificate awards", 25) },
  { id: "2", category: "Training", title: "Lecture Sessions", cover: "/assets/lecture session/1.jpg", images: generateImagePaths("/assets/lecture session", 8) },
  { id: "3", category: "Training", title: "Practise Sessions", cover: "/assets/practice session/1.jpg", images: generateImagePaths("/assets/practice session", 22) },
  { id: "4", category: "Awards", title: "July 2021 Batch Awards", cover: "/assets/july-2021-award/1.jpg", images: generateImagePaths("/assets/july-2021-award", 65) },
  { id: "5", category: "Training", title: "July 2021 Batch Training", cover: "/assets/july-2021/1.jpg", images: generateImagePaths("/assets/july-2021", 7) },
  { id: "6", category: "Training", title: "November 2021 Batch Training", cover: "/assets/nov-2021/1.jpeg", images: generateImagePaths("/assets/nov-2021", 20, "jpeg") },
  { id: "7", category: "Awards", title: "January 2022 Batch Awards", cover: "/assets/jan-2022/1.jpeg", images: generateImagePaths("/assets/jan-2022", 9, "jpeg") },
  { id: "8", category: "Awards", title: "February 2022 Batch Awards", cover: "/assets/feb-2022/1.jpeg", images: generateImagePaths("/assets/feb-2022", 4, "jpeg") },
  { id: "9", category: "Awards", title: "PMU1 Batch Awards", cover: "/assets/pmu1/1.jpeg", images: generateImagePaths("/assets/pmu1", 11, "jpeg") },
  { id: "10", category: "Awards", title: "PMU2 Batch Awards", cover: "/assets/pmu2/1.jpeg", images: generateImagePaths("/assets/pmu2", 8, "jpeg") }
];

const categories = ["All", "Awards", "Training"];

/* ---------------- ANIMATION VARIANTS (OPTIMIZED) ---------------- */
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { delay: i * 0.05, duration: 0.5, ease: "easeOut" }
  }),
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
};

/* ---------------- PAGE ---------------- */
export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedEvent, setSelectedEvent] = useState<typeof galleryEvents[0] | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const filteredEvents = activeCategory === "All" 
    ? galleryEvents 
    : galleryEvents.filter(event => event.category === activeCategory);

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedEvent) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedEvent.images.length);
    }
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedEvent) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedEvent.images.length) % selectedEvent.images.length);
    }
  };

  const closeLightbox = () => {
    setSelectedEvent(null);
    setCurrentImageIndex(0);
  };

  const openLightbox = (event: typeof galleryEvents[0]) => {
    setSelectedEvent(event);
    setCurrentImageIndex(0);
  };

  return (
    <main suppressHydrationWarning className="bg-[#040814] text-white min-h-screen pt-32 pb-32 relative">
      
      {/* ---------------- DYNAMIC AURORA BACKGROUND (Optimized) ---------------- */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(212,175,55,0.15) 0%, rgba(0,0,0,0) 70%)" }}
        />
        <motion.div
          animate={{ opacity: [0.1, 0.25, 0.1] }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] right-[-10%] w-[900px] h-[900px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(0,116,165,0.15) 0%, rgba(0,0,0,0) 70%)" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        {/* 1. HEADER */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.h3 
            initial={{ opacity: 0, letterSpacing: "0.1em" }} animate={{ opacity: 1, letterSpacing: "0.4em" }} transition={{ duration: 1.5, ease: "easeOut" }}
            className="text-[#D4AF37] uppercase mb-4 text-sm font-bold"
          >
            A Glimpse of Excellence
          </motion.h3>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
             <GoldText text="The NSFA Gallery" className="text-5xl md:text-7xl mb-6" />
          </motion.div>
          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }}
            className="text-white/70 text-lg md:text-xl font-light font-serif italic"
          >
            Explore the vibrant academic life, cutting-edge facilities, and proud moments of our international scholars.
          </motion.p>
        </div>

        {/* 2. CATEGORY FILTERS */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-4 mb-16 md:mb-20"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2.5 md:px-8 md:py-3 rounded-full md:rounded-2xl text-xs md:text-sm font-bold tracking-widest uppercase transition-all duration-300 ${
                activeCategory === category
                  ? `${premiumGoldGradient} text-[#040814] shadow-[0_5px_20px_rgba(212,175,55,0.4)] scale-105 border-transparent`
                  : "bg-white/5 border border-white/10 text-white/60 hover:text-white active:bg-white/10 hover:bg-white/10 hover:border-[#D4AF37]/50 active:border-[#D4AF37]/50"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* 3. ROYAL ART GALLERY GRID (2-Col Mobile, 3-Col Desktop) */}
        {/* Changed grid-cols-1 to grid-cols-2 and adjusted gap for mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-12">
          <AnimatePresence mode="wait">
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="relative group cursor-pointer h-full outline-none"
                onClick={() => openLightbox(event)}
                tabIndex={0}
              >
                {/* THE ROYAL FRAME CONTAINER (Added touch active states) */}
                <div className="p-1 md:p-2 rounded-2xl md:rounded-[2rem] shadow-[0_10px_30px_rgba(0,0,0,0.8)] md:shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-all duration-500 group-hover:shadow-[0_20px_50px_rgba(212,175,55,0.25)] group-active:shadow-[0_20px_50px_rgba(212,175,55,0.25)] group-hover:-translate-y-2 group-active:-translate-y-2 flex flex-col h-full relative overflow-hidden">
                  
                  {/* DUAL LAYER BACKGROUND FOR SMOOTH CROSSFADE */}
                  <div className="absolute inset-0 bg-[#0A1128] border-2 border-[#BF953F]/30 rounded-2xl md:rounded-[2rem] transition-opacity duration-500 z-0 group-hover:opacity-0 group-active:opacity-0" />
                  <div className={`absolute inset-0 ${premiumGoldGradient} rounded-2xl md:rounded-[2rem] opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-500 z-0`} />

                  {/* Inner Matte & Image (Resized for mobile) */}
                  <div className="relative overflow-hidden aspect-square md:aspect-[4/3] bg-black rounded-xl m-1 md:m-2 z-10 border border-white/10 group-hover:border-[#040814]/20 group-active:border-[#040814]/20 transition-colors duration-500">
                    <Image
                      src={event.cover}
                      alt={event.title}
                      fill
                      sizes="(max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-1000 group-hover:scale-105 group-active:scale-105"
                      priority={index < 3} 
                    />
                    
                    {/* Floating Counter Badge */}
                    <div className="absolute top-2 right-2 md:top-4 md:right-4 bg-[#0A1128]/80 backdrop-blur-md border border-[#BF953F]/50 px-2 py-1 md:px-3 md:py-1.5 rounded-lg md:rounded-xl flex items-center gap-1 md:gap-2 shadow-lg group-hover:bg-[#040814] group-active:bg-[#040814] transition-colors duration-500">
                      <Images size={12} className="text-[#FBF5B7] md:w-3.5 md:h-3.5" />
                      <span className="text-[#FBF5B7] text-[10px] md:text-xs font-bold tracking-wider">{event.images.length}</span>
                    </div>
                  </div>

                  {/* Card Info Area (Resized text for mobile) */}
                  <div className="p-3 md:p-6 pb-3 md:pb-4 flex flex-col items-center justify-center text-center flex-grow relative z-10">
                    <span className="text-[#BF953F] group-hover:text-[#040814]/70 group-active:text-[#040814]/70 transition-colors duration-500 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-1 md:mb-3">
                      {event.category}
                    </span>
                    <h4 className="text-white group-hover:text-[#040814] group-active:text-[#040814] transition-colors duration-500 font-serif text-sm md:text-xl font-bold mb-3 md:mb-6 leading-tight drop-shadow-md group-hover:drop-shadow-none group-active:drop-shadow-none">
                      {event.title}
                    </h4>
                    
                    <button className="px-3 py-2 md:px-8 md:py-3 rounded-lg md:rounded-xl border border-[#BF953F]/40 bg-[linear-gradient(180deg,#121F3D,#0A1128)] group-hover:bg-none group-active:bg-none group-hover:bg-[#040814] group-active:bg-[#040814] text-[#FBF5B7] group-hover:text-[#FFF2CD] group-active:text-[#FFF2CD] group-hover:border-[#040814] group-active:border-[#040814] font-bold transition-all duration-500 text-[10px] md:text-xs uppercase tracking-widest shadow-inner mt-auto w-full">
                      View
                    </button>
                  </div>

                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>

      {/* 4. OPTIMIZED LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#040814]/95 backdrop-blur-md p-0 md:p-4"
            onClick={closeLightbox}
          >
            {/* Top Bar Controls */}
            <motion.div 
              initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}
              className="absolute top-0 left-0 w-full p-4 md:p-6 flex justify-between items-center z-[60] bg-gradient-to-b from-black/80 to-transparent"
            >
               <div className="text-white pl-2 md:pl-6 max-w-[70vw]">
                 <h3 className="font-serif text-lg md:text-3xl text-[#FBF5B7] drop-shadow-lg truncate">{selectedEvent.title}</h3>
                 <p className="text-white/60 text-[10px] md:text-sm tracking-widest uppercase mt-1 md:mt-2">Photo {currentImageIndex + 1} of {selectedEvent.images.length}</p>
               </div>
               
               <button 
                onClick={closeLightbox}
                className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-white/5 border border-white/20 flex shrink-0 items-center justify-center text-white/90 hover:text-[#040814] hover:bg-[linear-gradient(145deg,#D4AF37_0%,#FFF2CD_45%,#AA771C_100%)] active:bg-[linear-gradient(145deg,#D4AF37_0%,#FFF2CD_45%,#AA771C_100%)] hover:border-transparent active:border-transparent transition-all shadow-lg"
               >
                 <X size={24} className="md:w-7 md:h-7" />
               </button>
            </motion.div>

            {/* Slider Navigation Buttons */}
           {selectedEvent.images.length > 1 && (
              <>
                <button 
                  onClick={handlePrevImage}
                  className="absolute left-2 md:left-10 top-1/2 -translate-y-1/2 w-10 h-10 md:w-16 md:h-16 rounded-full bg-[#0A1128]/80 border border-[#BF953F]/40 flex items-center justify-center text-[#FBF5B7] hover:bg-[linear-gradient(145deg,#D4AF37_0%,#FFF2CD_45%,#AA771C_100%)] active:bg-[linear-gradient(145deg,#D4AF37_0%,#FFF2CD_45%,#AA771C_100%)] hover:text-[#040814] active:text-[#040814] hover:border-transparent active:border-transparent transition-all z-[60] shadow-xl"
                >
                  <ChevronLeft size={24} className="md:w-8 md:h-8" />
                </button>

                <button 
                  onClick={handleNextImage}
                  className="absolute right-2 md:right-10 top-1/2 -translate-y-1/2 w-10 h-10 md:w-16 md:h-16 rounded-full bg-[#0A1128]/80 border border-[#BF953F]/40 flex items-center justify-center text-[#FBF5B7] hover:bg-[linear-gradient(145deg,#D4AF37_0%,#FFF2CD_45%,#AA771C_100%)] active:bg-[linear-gradient(145deg,#D4AF37_0%,#FFF2CD_45%,#AA771C_100%)] hover:text-[#040814] active:text-[#040814] hover:border-transparent active:border-transparent transition-all z-[60] shadow-xl"
                >
                  <ChevronRight size={24} className="md:w-8 md:h-8" />
                </button>
              </>
            )}
            {/* The Image Container */}
            <div className="relative w-full h-[75vh] md:h-[85vh] flex items-center justify-center px-10 md:px-32 mt-8 md:mt-0" onClick={(e) => e.stopPropagation()}>
               <Image
                 key={selectedEvent.images[currentImageIndex]} 
                 src={selectedEvent.images[currentImageIndex]}
                 alt={`${selectedEvent.title} - Image ${currentImageIndex + 1}`}
                 fill
                 sizes="100vw"
                 className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
                 priority 
               />
            </div>

            {/* Thumbnail Navigation Strip */}
            {selectedEvent.images.length > 1 && (
              <motion.div 
                initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
                className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 md:gap-3 z-[60] bg-[#0A1128]/80 p-2 md:p-3 rounded-2xl border border-[#BF953F]/30 max-w-[95vw] md:max-w-[90vw] overflow-x-auto scrollbar-hide shadow-2xl backdrop-blur-md" 
                onClick={(e) => e.stopPropagation()}
              >
                {selectedEvent.images.map((imgSrc, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`relative w-12 h-10 md:w-20 md:h-14 shrink-0 rounded-lg overflow-hidden transition-all border-2 ${currentImageIndex === idx ? "border-[#FBF5B7] opacity-100 scale-105" : "border-transparent opacity-40 hover:opacity-100 active:opacity-100"}`}
                  >
                    <Image src={imgSrc} alt={`Thumb ${idx}`} fill sizes="80px" className="object-cover" />
                  </button>
                ))}
              </motion.div>
            )}

          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}