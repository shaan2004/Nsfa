"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X, Phone, Mail } from "lucide-react";

// Standardize the premium gradient class for reuse
const premiumGoldGradient = "bg-[linear-gradient(145deg,#D4AF37_0%,#FFF2CD_45%,#AA771C_100%)] text-[#040814]";
const premiumGoldText = "text-transparent bg-clip-text bg-[linear-gradient(to_right,#BF953F,#FCF6BA,#B38728)]";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // The exact navigation links extracted from nsfaacademy.com
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about-us" },
    { name: "Gallery", path: "/gallery" },
    { name: "Courses", path: "/courses" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      animate={{ y: [-100, 0] }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? "bg-[#040814]/90 backdrop-blur-lg border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.8)]" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-24">
          
          {/* Logo Area */}
          <Link href="/" className="flex items-center gap-3">
            <img src="/assets/nsfa-logo.png" alt="NSFA Academy" className="h-16 w-auto" />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className="text-white/80 hover:text-[#FBF5B7] text-xs font-bold tracking-widest uppercase transition-colors duration-300 relative group"
              >
                {link.name}
                {/* Animated Gold Underline on Hover */}
                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-[linear-gradient(to_right,#BF953F,#FCF6BA)] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

        {/* Desktop Contact Area (Phone & Email) */}
          <div className="hidden xl:flex items-center space-x-3 shrink-0">
            {/* Email Button */}
            <a 
              href="mailto:info@nsfaacademy.com" 
              className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#BF953F]/40 text-[#FBF5B7] hover:border-transparent transition-all duration-300 text-sm tracking-wider font-bold shadow-[0_0_15px_rgba(191,149,63,0.1)] group relative overflow-hidden whitespace-nowrap shrink-0"
            >
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${premiumGoldGradient}`} />
              <Mail size={16} className="relative z-10 group-hover:text-[#040814] transition-colors duration-300 shrink-0" />
              <span className="relative z-10 group-hover:text-[#040814] transition-colors duration-300 lowercase">info@nsfaacademy.com</span>
            </a>
            
            {/* Phone Button */}
            <a 
              href="tel:+919884718883" 
              className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#BF953F]/40 text-[#FBF5B7] hover:border-transparent transition-all duration-300 text-sm tracking-wider font-bold shadow-[0_0_15px_rgba(191,149,63,0.1)] group relative overflow-hidden whitespace-nowrap shrink-0"
            >
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${premiumGoldGradient}`} />
              <Phone size={16} className="relative z-10 group-hover:text-[#040814] transition-colors duration-300 shrink-0" />
              <span className="relative z-10 group-hover:text-[#040814] transition-colors duration-300">+91-9884718883</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden text-white/90 hover:text-[#FBF5B7] transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-24 left-0 w-full bg-[#040814]/95 backdrop-blur-xl border-b border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
          <div className="flex flex-col px-6 py-8 space-y-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-2xl font-serif font-medium tracking-wide transition-colors ${link.path === '/contact' ? premiumGoldText : 'text-white/80 hover:text-white'}`}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="pt-6 border-t border-white/10 flex flex-col gap-4">
              <a href="tel:+919884718883" className="flex items-center gap-4 text-[#FBF5B7] text-lg font-bold">
                <Phone size={20} className="text-[#BF953F]" /> +91-9884718883
              </a>
              <a href="mailto:info@nsfaacademy.com" className="flex items-center gap-4 text-white/70 text-lg">
                <Mail size={20} className="text-[#BF953F]" /> info@nsfaacademy.com
              </a>
            </div>
          </div>
        </div>
      )}
    </motion.nav>
  );
}