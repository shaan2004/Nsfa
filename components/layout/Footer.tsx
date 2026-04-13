"use client";

import React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, ChevronRight, MessageCircle } from "lucide-react"; // Removed Instagram and Facebook

// --- CUSTOM SVG ICONS ---
const FacebookIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const InstagramIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const whatsappMsg = encodeURIComponent("Hello NSFA Academy, I have some questions regarding your courses.");


  return (
    <footer className="bg-[#02040A] text-white border-t border-white/5 relative overflow-hidden">
      
      {/* Subtle Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-[#BF953F]/50 to-transparent" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.05)_0%,rgba(0,0,0,0)_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 pt-20 pb-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Logo & About */}
          <div className="space-y-6">
            <h2 className="text-3xl font-serif font-bold text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(to right, #BF953F, #FCF6BA)" }}>
              NSFA ACADEMY
            </h2>
            <p className="text-white/60 leading-relaxed font-light text-sm">
              Zeal To Excellence In Aesthetics Science. We are India's premier globally recognised international education academy for advanced beauty, aesthetic, and dental science.
            </p>
            <div className="flex gap-4">
          <span className="text-[#D4AF37] font-bold uppercase tracking-widest text-sm">Follow Us</span>
              <a href="https://www.facebook.com/nsfaacademy/" target="_blank" className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-[#040814] transition-all duration-300">
                <FacebookIcon size={20} />
              </a>
              <a href="https://www.instagram.com/nsfa_courses/" target="_blank" className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-[#040814] transition-all duration-300">
                <InstagramIcon size={20} />
              </a>
              <a href={`https://wa.me/919884718883?text=${whatsappMsg}`} target="_blank" className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-[#040814] transition-all duration-300">
                <MessageCircle size={20} />
              </a></div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-lg font-serif font-bold text-[#FBF5B7] mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { name: "Home", path: "/" },
                { name: "About Us", path: "/about-us" },
                { name: "Courses", path: "/courses" },
                { name: "Gallery", path: "/gallery" },
                { name: "Contact Us", path: "/contact" }
              ].map((link, i) => (
                <li key={i}>
                  <Link href={link.path} className="text-white/60 hover:text-[#D4AF37] transition-colors flex items-center gap-2 group text-sm">
                    <ChevronRight size={14} className="text-[#D4AF37]/50 group-hover:text-[#D4AF37] transition-colors" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Our Programs */}
          <div>
            <h4 className="text-lg font-serif font-bold text-[#FBF5B7] mb-6">Our Programs</h4>
            <ul className="space-y-3">
              {[
                "Diploma Courses",
                "Fellowship Courses",
                "Mastership Courses",
                "PG Certification",
                "Advanced Dental Science",
                "M.SC Courses"
              ].map((course, i) => (
                <li key={i}>
                  <Link href="/courses" className="text-white/60 hover:text-[#D4AF37] transition-colors flex items-center gap-2 group text-sm">
                    <ChevronRight size={14} className="text-[#D4AF37]/50 group-hover:text-[#D4AF37] transition-colors" />
                    {course}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Details */}
          <div>
            <h4 className="text-lg font-serif font-bold text-[#FBF5B7] mb-6">Get In Touch</h4>
            <ul className="space-y-4">
              <li>
                <a href="https://maps.app.goo.gl/v3xZ4Z39Z9Z9Z9Z9" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 text-white/60 hover:text-[#D4AF37] transition-colors text-sm group">
                  <MapPin size={18} className="shrink-0 text-[#D4AF37]/70 group-hover:text-[#D4AF37]" />
                  <span>No: 31, Ramalingam Nagar 1st St, Kamdar nagar, Nungambakkam, Chennai 600034</span>
                </a>
              </li>
              <li>
                <a href="tel:+919884718883" className="flex items-center gap-3 text-white/60 hover:text-[#D4AF37] transition-colors text-sm group">
                  <Phone size={18} className="shrink-0 text-[#D4AF37]/70 group-hover:text-[#D4AF37]" />
                  <span>+91 98847 18883</span>
                </a>
              </li>
              <li>
                <a href="mailto:info@nsfaacademy.com" className="flex items-center gap-3 text-white/60 hover:text-[#D4AF37] transition-colors text-sm group">
                  <Mail size={18} className="shrink-0 text-[#D4AF37]/70 group-hover:text-[#D4AF37]" />
                  <span>info@nsfaacademy.com</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* SEO Keywords Hidden from view but readable by crawlers */}
        <div className="sr-only">
          Keywords: Facial Aesthetics Training India, Aesthetic Medicine Courses Chennai, Cosmetology Fellowship, PG Diploma in Aesthetics, Dental Science Academy, Non-Surgical Facial Aesthetics, Medical Trichology Course, IAO Accredited Beauty Academy.
        </div>

        {/* ---------------- COPYRIGHT STRIP ---------------- */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm font-light tracking-wide text-center md:text-left">
            Copyright © {currentYear} | All Rights Reserved | Non Surgical Facial Aesthetics Academy
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-white/40 hover:text-white text-xs font-light">Privacy Policy</Link>
            <Link href="#" className="text-white/40 hover:text-white text-xs font-light">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}