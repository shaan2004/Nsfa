"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function GlassCard({ children, className = "", delay = 0 }: GlassCardProps) {
  // We use a standard inline style for the glass background to guarantee it renders
  const glassBg = "linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)";
  const goldLine = "linear-gradient(45deg, #A88F3A, #FFD700 30%, #F9E79F 50%, #FFD700 70%, #A88F3A)";

  return (
    <motion.div
      whileInView={{ opacity: [0, 1], y: [20, 0] }} // FIX: Guarantees visibility on scroll
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: delay, ease: "easeOut" }}
      style={{ backgroundImage: glassBg }}
      className={`relative rounded-2xl overflow-hidden backdrop-blur-xl border border-white/10 shadow-2xl ${className}`}
    >
      <div 
        className="absolute top-0 left-0 w-full h-[2px] opacity-70"
        style={{ backgroundImage: goldLine }}
      ></div>
      <div className="p-6 md:p-8 z-10 relative">
        {children}
      </div>
    </motion.div>
  );
}