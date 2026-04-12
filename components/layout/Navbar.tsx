"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

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
    { name: "Downloads", path: "/downloads" },
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
  className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
    isScrolled ? "bg-brand-darkBg/90 backdrop-blur-md border-b border-white/10 shadow-lg" : "bg-transparent"
  }`}
>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Logo Area */}
          <Link href="/" className="flex items-center gap-3">
            <img src="assets/nsfa-logo.png" alt="NSFA Academy" className="h-16 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className="text-white/80 hover:text-[#FFD700] text-sm tracking-widest uppercase transition-colors duration-300 font-medium"
              >
                {link.name}
              </Link>
            ))}
            <a 
              href="tel:+919884718883" 
              className="px-6 py-2 rounded-full border border-[#FFD700] text-[#FFD700] hover:bg-gold-shimmer hover:text-brand-darkBg transition-all duration-300 text-sm tracking-wider font-bold"
            >
              +91-9884718883
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-24 left-0 w-full bg-brand-darkBg border-b border-white/10 shadow-2xl">
          <div className="flex flex-col px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="text-white hover:text-[#FFD700] text-lg tracking-wider"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </motion.nav>
  );
}