"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ScrollIndicatorWrapperProps {
  children: React.ReactNode;
  className?: string;
  theme?: "gold" | "blue" | "green";
}

export default function ScrollIndicatorWrapper({
  children,
  className = "",
  theme = "gold"
}: ScrollIndicatorWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollState, setScrollState] = useState({ canScrollLeft: false, canScrollRight: false });

  const checkScroll = () => {
    if (containerRef.current) {
      const target = containerRef.current;
      
      // Calculate if container has scrollable overflow
      const hasOverflow = target.scrollWidth > target.clientWidth;
      
      if (!hasOverflow) {
        setScrollState({ canScrollLeft: false, canScrollRight: false });
        return;
      }

      // Check if scrolled away from the left edge (with 5px buffer)
      const canScrollLeft = target.scrollLeft > 5;
      
      // Check if not fully scrolled to the right edge (with 5px buffer)
      const canScrollRight = target.scrollLeft < target.scrollWidth - target.clientWidth - 5;

      setScrollState({ canScrollLeft, canScrollRight });
    }
  };

  useEffect(() => {
    // Initial check
    checkScroll();

    // Listen to scroll events on the inner container
    const el = containerRef.current;
    if (el) {
      el.addEventListener("scroll", checkScroll, { passive: true });
    }

    // Listen to window resizing
    window.addEventListener("resize", checkScroll);

    // Dynamic checks on content changes
    const observer = new MutationObserver(checkScroll);
    if (el) {
      observer.observe(el, { childList: true, subtree: true });
    }

    return () => {
      if (el) {
        el.removeEventListener("scroll", checkScroll);
      }
      window.removeEventListener("resize", checkScroll);
      observer.disconnect();
    };
  }, [children]);

  const getThemeStyles = () => {
    if (theme === "gold") return {
      color: "text-[#BF953F] drop-shadow-[0_0_8px_rgba(191,149,63,0.6)]",
      gradientLeft: "from-[#040814] via-[#040814]/80 to-transparent",
      gradientRight: "from-[#040814] via-[#040814]/80 to-transparent",
      border: "border-[#BF953F]/30"
    };
    if (theme === "blue") return {
      color: "text-[#88D4FF] drop-shadow-[0_0_8px_rgba(136,212,255,0.6)]",
      gradientLeft: "from-[#040814] via-[#040814]/80 to-transparent",
      gradientRight: "from-[#040814] via-[#040814]/80 to-transparent",
      border: "border-[#88D4FF]/30"
    };
    return {
      color: "text-[#34D399] drop-shadow-[0_0_8px_rgba(52,211,153,0.6)]",
      gradientLeft: "from-[#040814] via-[#040814]/80 to-transparent",
      gradientRight: "from-[#040814] via-[#040814]/80 to-transparent",
      border: "border-[#34D399]/30"
    };
  };

  const styles = getThemeStyles();

  return (
    <div className={`relative w-full group/scrollwrapper overflow-hidden ${className}`}>
      
      {/* Scrollable Container Wrapper */}
      <div 
        ref={containerRef}
        className="w-full overflow-x-auto no-scrollbar"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {children}
      </div>

      {/* Left Scroll Indicator Arrow overlay (visible only on lg:hidden) */}
      <AnimatePresence>
        {scrollState.canScrollLeft && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3 }}
            className={`absolute left-0 top-0 bottom-0 w-14 flex items-center justify-start bg-gradient-to-r ${styles.gradientLeft} pointer-events-none lg:hidden z-30`}
          >
            <motion.div
              animate={{ x: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className={`p-1.5 rounded-full bg-[#0A1128]/95 border ${styles.border} ml-1 flex items-center justify-center`}
            >
              <ChevronLeft size={16} className={styles.color} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Right Scroll Indicator Arrow overlay (visible only on lg:hidden) */}
      <AnimatePresence>
        {scrollState.canScrollRight && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.3 }}
            className={`absolute right-0 top-0 bottom-0 w-14 flex items-center justify-end bg-gradient-to-l ${styles.gradientRight} pointer-events-none lg:hidden z-30`}
          >
            <motion.div
              animate={{ x: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className={`p-1.5 rounded-full bg-[#0A1128]/95 border ${styles.border} mr-1 flex items-center justify-center`}
            >
              <ChevronRight size={16} className={styles.color} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
    </div>
  );
}
