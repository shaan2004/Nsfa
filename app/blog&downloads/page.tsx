"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Calendar, ChevronRight, User, FileText, Download, BookOpen, ArrowLeft, Globe } from "lucide-react";
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
  { 
    id: 1, 
    title: "The Global Landscape of Aesthetic Practitioner Laws: Why Local Knowledge Matters", 
    category: "Global", 
    author: "NSFA Legal Dept", 
    date: "May 15, 2026", 
    image: "/assets/fillers.jpg", 
    excerpt: "The world of aesthetic medicine is marked by significant regulatory diversity. Understanding this variation is essential to legal compliance and professional excellence." 
  },
  { id: 2, title: "Global Exposure: Dubai Master Fellowship", category: "Dubai", author: "NSFA Faculty", date: "April 05, 2026", image: "/assets/facial.jpg", excerpt: "How our multi-level certification in Dubai is creating global placement opportunities." },
  { id: 3, title: "Exclusive Korea University Programme", category: "Korea", author: "Dr. Michael Chen", date: "March 28, 2026", image: "/assets/dental.jpg", excerpt: "Exploring the cutting-edge techniques and monopoly training offered in South Korea." },
  { id: 4, title: "ISPMU Permanent Makeup Masterclass", category: "Bangkok", author: "NSFA Faculty", date: "March 15, 2026", image: "/assets/injectables.jpg", excerpt: "A comprehensive review of the advanced PMU techniques taught during our Bangkok masterclass." },
  { id: 5, title: "Setting Up Your Aesthetic Clinic in India", category: "India", author: "Business Dept", date: "March 02, 2026", image: "/assets/face.jpg", excerpt: "Insights from our Business classes to help you launch your own successful clinic in India." }
];

const downloads = [
  { id: "d1", title: "Aesthetic Clinical Set Up In India", desc: "Guidelines for reference regarding setting up an aesthetic clinical practice in India.", file: "/assets/CLINICAL.pdf" },
  { id: "d2", title: "Global Aesthetic Guidelines for Injectables", desc: "Botulinum Toxin & Dermal Fillers for cosmetic indications globally accepted standards.", file: "/assets/comman.pdf" },
  { id: "d3", title: "Singapore Medical Council Aesthetic Guidelines", desc: "2016 Guidelines on Aesthetic Practices for Doctors providing a framework for risk-adjusted regulatory oversight.", file: "/assets/2016-edition---guidelines-on-aesthetic-practices-for-doctors.pdf" },
  { id: "d4", title: "Singapore Dental Council Facial Procedures", desc: "2017 Guidelines on Aesthetic Facial Procedures for Dental Practitioners in Singapore.", file: "/assets/2017-guidelines-on-aesthetic-facial-procedures-for-dental-practitioners.pdf" },
  { id: "d5", title: "Malaysia Aesthetic Medical Practice Guidelines", desc: "National guidelines on aesthetic medical practice for general practitioners and specialists in Malaysia.", file: "/assets/GUIDELINES ON AESTHETIC MEDICAL PRACTICE FOR REGISTERED MEDICAL PRACTITIONERS(1).pdf" },
  { id: "d6", title: "Malaysian Dental Council Orofacial Guidelines", desc: "Revised 2025 guidelines for Orofacial Aesthetic Practice by the Malaysian Dental Council.", file: "/assets/OFA GUIDELINES - REVISED 1 JULY 2025.pdf" },
  { id: "d7", title: "Dubai Healthcare City Authority Licensing", desc: "Licensure Requirements for General Aesthetic Medicine in Dubai Healthcare City.", file: "/assets/327. DHCR Licensing Requirements for General Aesthetic Medicine v2.pdf" },
  { id: "d8", title: "Global Regulation of Aesthetic Practices", desc: "Research report detailing aesthetic practice regulations in Hong Kong, Florida, South Korea, Singapore, and the UK.", file: "/assets/1415rp01-regulation-of-aesthetic-practices-in-selected-places-20141128-e.pdf" },
  { id: "d9", title: "AAMSSA Non-Clinical Setting Risks", desc: "Guideline by the Aesthetic and Anti-aging Medicine Society of South Africa on practicing in non-clinical settings.", file: "/assets/AAMSSA-Guideline-The-risks-of-practicing-Aesthetic-Medicine-in-non-clinical-setting-Issued-09-December-2019.pdf" },
  { id: "d10", title: "New Brunswick Medical Aesthetics Guideline", desc: "Practice Guideline for Medical Aesthetics by the Nurses Association of New Brunswick (NANB).", file: "/assets/NANB-Practice-Guideline-MedicalAesthetics-Dec-24-_Jan-25-E.pdf" },
  { id: "d11", title: "UK Cosmetic Procedures Regulation", desc: "House of Commons research briefing on the regulation of non-surgical cosmetic procedures in England.", file: "/assets/CBP-10331.pdf" },
  { id: "d12", title: "Abu Dhabi Non-Surgical Cosmetics Standard", desc: "Department of Health standard for healthcare professionals performing non-surgical cosmetic procedures in Abu Dhabi.", file: "/assets/standard-for-healthcare-professionals-performing-non-surgical-cosmetic-procedures (1).pdf" }
  
];

export default function BlogAndDownloads() {
  const [activeTab, setActiveTab] = useState<"blog" | "downloads">("blog");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  
  // State to manage the open article
  const [selectedPost, setSelectedPost] = useState<typeof blogPosts[0] | null>(null);

  // Scroll to top when opening an article
  useEffect(() => {
    if (selectedPost) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [selectedPost]);

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

  // --- WEBINAR WHATSAPP INTEGRATION ---
  const handleWebinarSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Grab the values from the form
    const form = e.currentTarget;
    const firstName = (form.elements.namedItem('firstName') as HTMLInputElement).value;
    const lastName = (form.elements.namedItem('lastName') as HTMLInputElement).value;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const phone = (form.elements.namedItem('phone') as HTMLInputElement).value;
    const city = (form.elements.namedItem('city') as HTMLInputElement).value;
    const country = (form.elements.namedItem('country') as HTMLSelectElement).value;

    // Format the WhatsApp message
    const clientWhatsAppNumber = "919884718883";
    const message = `*New Webinar Registration!* 🎓\n\n*Name:* ${firstName} ${lastName}\n*Email:* ${email}\n*Phone:* ${phone}\n*Location:* ${city}, ${country}\n*Event:* The Future of Anti-Aging Medicine`;
    const waUrl = `https://wa.me/${clientWhatsAppNumber}?text=${encodeURIComponent(message)}`;

    // Open WhatsApp in a new tab
    window.open(waUrl, '_blank', 'noopener,noreferrer');

    // Optional: Clear the form and show a quick native alert
    form.reset();
    alert("Redirecting to WhatsApp to complete your registration!");
  };

  return (
    <main suppressHydrationWarning className="bg-[#040814] text-white min-h-screen pt-32 pb-32 relative overflow-hidden">
      
      {/* ---------------- 1. GLOWING BRAIN BACKGROUND ---------------- */}
      <div className="absolute top-0 left-0 w-full h-[600px] z-0 overflow-hidden pointer-events-none flex items-center justify-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.12)_0%,rgba(0,0,0,0)_60%)] blur-[50px]" />
        <motion.div
          animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.02, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-[600px] h-[600px] opacity-40 mix-blend-screen"
          style={{ willChange: "transform, opacity" }}
        >
          <Image src="/assets/brain-glow.png" alt="Neural Network Brain" fill sizes="600px" className="object-contain drop-shadow-[0_0_50px_rgba(212,175,55,0.4)]" priority />
        </motion.div>
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-[#040814] to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        {/* ---------------- 2. HEADER SECTION ---------------- */}
        {!selectedPost && (
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
        )}

        {/* ---------------- 3. MAIN NAVIGATION TABS ---------------- */}
        {!selectedPost && (
          <div className="flex justify-center mb-16">
            <div className="bg-[#0A1128] border border-white/10 p-2 rounded-full inline-flex relative shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
              <motion.div 
                className="absolute top-2 bottom-2 w-[calc(50%-8px)] rounded-full bg-[linear-gradient(135deg,#BF953F,#FCF6BA,#B38728)] shadow-[0_5px_15px_rgba(191,149,63,0.4)]"
                animate={{ x: activeTab === "blog" ? 0 : "100%" }}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                style={{ willChange: "transform" }}
              />
              <button onClick={() => setActiveTab("blog")} className={`relative z-10 px-8 py-3 md:px-12 md:py-4 flex items-center gap-2 rounded-full font-bold text-xs md:text-sm tracking-widest uppercase transition-colors duration-300 ${activeTab === "blog" ? "text-[#080E21]" : "text-white/60 hover:text-white"}`}>
                <BookOpen size={18} /> Read Articles
              </button>
              <button onClick={() => setActiveTab("downloads")} className={`relative z-10 px-8 py-3 md:px-12 md:py-4 flex items-center gap-2 rounded-full font-bold text-xs md:text-sm tracking-widest uppercase transition-colors duration-300 ${activeTab === "downloads" ? "text-[#080E21]" : "text-white/60 hover:text-white"}`}>
                <Download size={18} /> Official Guidelines
              </button>
            </div>
          </div>
        )}

        {/* ---------------- 4. TAB CONTENT AREA ---------------- */}
        <AnimatePresence mode="wait">
          
          {/* BLOG GRID VIEW */}
          {activeTab === "blog" && !selectedPost && (
            <motion.div key="blog-grid" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}>
              <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 bg-white/[0.03] backdrop-blur-xl border border-white/10 p-4 rounded-3xl shadow-lg">
                <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
                  {categories.map((category) => (
                    <button
                      key={category} onClick={() => setActiveCategory(category)}
                      className={`px-6 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 shrink-0 ${activeCategory === category ? `${premiumGoldGradient} text-[#040814] shadow-[0_5px_20px_rgba(212,175,55,0.4)]` : "bg-white/5 border border-white/10 text-white/60 hover:text-white hover:border-[#D4AF37]/50"}`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
                <div className="relative w-full md:w-80 group">
                  <input type="text" placeholder="Search articles..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-[#0A1128]/80 border border-white/20 text-white rounded-full py-3 pl-12 pr-4 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/50 transition-all" />
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
                        onClick={() => setSelectedPost(post)}
                        className="bg-[#0A1128] border border-white/10 rounded-2xl md:rounded-[2rem] overflow-hidden shadow-2xl group cursor-pointer hover:-translate-y-2 transition-all duration-500 hover:border-[#BF953F]/60 flex flex-col h-full"
                        style={{ willChange: "transform, opacity" }}
                      >
                        <div className="relative h-32 md:h-64 overflow-hidden bg-black">
                          <Image src={post.image} alt={post.title} fill sizes="(max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100 mix-blend-lighten" />
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

          {/* FULL ARTICLE READING VIEW */}
          {activeTab === "blog" && selectedPost && (
            <motion.article 
              key="article-view" 
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 30 }} transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto bg-[#0A1128]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-12 shadow-2xl mt-8"
            >
              {/* Back Button */}
              <button onClick={() => setSelectedPost(null)} className="flex items-center gap-2 text-white/50 hover:text-[#D4AF37] transition-colors mb-8 group text-sm uppercase tracking-widest font-bold">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Articles
              </button>

              {/* Article Header */}
              <div className="mb-10 text-center">
                <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-[#BF953F]/40 text-[#FBF5B7] text-xs font-bold uppercase tracking-widest mb-6">
                  {selectedPost.category} Article
                </span>
                <h1 className="text-3xl md:text-5xl font-serif font-bold text-white leading-tight mb-6">{selectedPost.title}</h1>
                <div className="flex items-center justify-center gap-6 text-white/50 text-xs md:text-sm uppercase tracking-widest">
                  <span className="flex items-center gap-2"><User size={14}/> {selectedPost.author}</span>
                  <span className="flex items-center gap-2"><Calendar size={14}/> {selectedPost.date}</span>
                </div>
              </div>

              {/* Hero Image */}
              <div className="relative w-full h-[250px] md:h-[450px] rounded-2xl overflow-hidden mb-12 shadow-lg">
                <Image src={selectedPost.image} alt={selectedPost.title} fill className="object-cover opacity-90 mix-blend-lighten" />
              </div>

              {/* DYNAMIC ARTICLE CONTENT */}
              <div className="prose prose-invert prose-lg max-w-none text-white/80 font-light leading-loose space-y-8">
                
                <p className="text-xl md:text-2xl text-white leading-relaxed font-serif italic border-l-4 border-[#BF953F] pl-6 py-2 bg-white/5 rounded-r-xl">
                  The world of aesthetic medicine is marked by significant regulatory diversity. While some countries maintain stringent requirements mandating that only medically licensed professionals may perform injectables and other procedures, others permit trained nurses or allied health professionals to carry out specific treatments under supervision.
                </p>

                <p>
                  Understanding this variation is essential because ignorance of local aesthetic practitioner laws can expose practitioners to legal repercussions, including fines, loss of license, or worse, jeopardize patient safety. Whether you are a physician, nurse, or clinic manager, staying informed about who can do Botox legally in your jurisdiction and ensuring your team holds a valid aesthetic medicine license is a foundational step towards legal compliance and professional excellence.
                </p>

                {/* Country-by-Country Guide */}
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#FBF5B7] mt-12 mb-6">Country-by-Country Legal Guide to Performing Aesthetic Procedures in 2026</h2>
                
                <h3 className="text-xl font-bold text-white mt-8 mb-4 flex items-center gap-2"><Globe className="text-[#BF953F]" size={20}/> United States: A State-Regulated Patchwork</h3>
                <p>
                  In the United States, aesthetic practitioner laws are predominantly governed at the state level, resulting in a patchwork of varying regulations. While physicians universally require an aesthetic medicine license or equivalent credentials, the permissions granted to nurse practitioners, physician assistants, and registered nurses differ substantially.
                </p>
                <p>
                  States such as California and New York enforce rigorous licensing and training prerequisites for non-physician injectors, whereas other states offer more lenient pathways, sometimes allowing non-medical personnel to perform procedures under physician delegation.
                </p>

                <h3 className="text-xl font-bold text-white mt-8 mb-4 flex items-center gap-2"><Globe className="text-[#BF953F]" size={20}/> United Kingdom: Tightening Oversight</h3>
                <p>
                  The United Kingdom maintains strict aesthetic practitioner laws that generally restrict the administration of Botox and other injectables to medically qualified professionals holding an aesthetic medicine license or recognized equivalent qualification. Recent years have witnessed increased regulatory scrutiny targeting non-medical providers.
                </p>

                <h3 className="text-xl font-bold text-white mt-8 mb-4 flex items-center gap-2"><Globe className="text-[#BF953F]" size={20}/> Canada: Provincial Autonomy</h3>
                <p>
                  Canada’s provinces establish their own aesthetic practitioner laws, which in turn shape who may perform aesthetic procedures. For example, Ontario requires that Botox injections be performed by physicians or registered nurses with additional certification, all under the umbrella of a valid aesthetic medicine license or provincial equivalent.
                </p>

                {/* EMBEDDED LEAD GEN FORM (Webinar) */}
                <div className="my-16 p-8 md:p-10 rounded-3xl bg-[linear-gradient(135deg,rgba(191,149,63,0.1)_0%,rgba(10,17,40,1)_100%)] border border-[#BF953F]/30 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#BF953F]/10 rounded-full blur-[80px]" />
                  <h3 className="text-2xl font-serif font-bold text-white mb-2 relative z-10">The Future of Anti-Aging Medicine</h3>
                  <p className="text-[#FBF5B7] text-sm tracking-widest uppercase font-bold mb-8 relative z-10">Free Live Webinar Registration</p>
                  
                  <form onSubmit={handleWebinarSubmit} className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input name="firstName" type="text" placeholder="First Name *" required className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#BF953F] focus:ring-1 focus:ring-[#BF953F] outline-none transition-all" />
                    <input name="lastName" type="text" placeholder="Last Name *" required className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#BF953F] focus:ring-1 focus:ring-[#BF953F] outline-none transition-all" />
                    <input name="email" type="email" placeholder="Email Address *" required className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#BF953F] focus:ring-1 focus:ring-[#BF953F] outline-none transition-all md:col-span-2" />
                    <input name="phone" type="tel" placeholder="Phone Number *" required className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#BF953F] focus:ring-1 focus:ring-[#BF953F] outline-none transition-all md:col-span-2" />
                    <input name="city" type="text" placeholder="City" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#BF953F] focus:ring-1 focus:ring-[#BF953F] outline-none transition-all" />
                    <select name="country" required defaultValue="" className="bg-[#0A1128] border border-white/10 rounded-xl px-4 py-3 text-sm text-white/70 focus:border-[#BF953F] focus:ring-1 focus:ring-[#BF953F] outline-none transition-all appearance-none">
                      <option value="" disabled>Select Country *</option>
                      <option value="India">India</option>
                      <option value="UAE">UAE</option>
                      <option value="Thailand">Thailand</option>
                      <option value="South Korea">South Korea</option>
                      <option value="Canada">Canada</option>
                      <option value="United States">United States</option>
                    </select>
                    
                    <label className="flex items-start gap-3 mt-2 md:col-span-2 text-xs text-white/60 cursor-pointer">
                      <input type="checkbox" required className="mt-1 accent-[#BF953F]" />
                      I agree to receive marketing emails, including offers and updates. I can unsubscribe at any time.
                    </label>

                    <button type="submit" className="md:col-span-2 mt-4 py-4 rounded-xl bg-[linear-gradient(135deg,#BF953F,#FCF6BA,#B38728)] text-[#040814] font-bold text-sm tracking-widest uppercase hover:scale-[1.02] active:scale-95 transition-transform shadow-lg">
                      Register for Webinar
                    </button>
                  </form>
                </div>

                <h3 className="text-xl font-bold text-white mt-8 mb-4 flex items-center gap-2"><Globe className="text-[#BF953F]" size={20}/> Australia: National Standards</h3>
                <p>
                  Australia operates under a national regulatory system that requires aesthetic injectors to hold an aesthetic medicine license, generally in the form of a medical or nursing license accompanied by formal aesthetic training. Nurse practitioners are increasingly recognized as eligible to perform injectables provided they meet national competency standards.
                </p>

                <h3 className="text-xl font-bold text-white mt-8 mb-4 flex items-center gap-2"><Globe className="text-[#BF953F]" size={20}/> European Union: Harmonized Frameworks</h3>
                <p>
                  Within the European Union, aesthetic procedures are regulated under a combination of harmonized medical device regulations and individual member state laws. Countries such as Germany, France, and Spain each implement additional national aesthetic practitioner laws, specifying who can perform procedures like Botox injections.
                </p>

                <h3 className="text-xl font-bold text-white mt-8 mb-4 flex items-center gap-2"><Globe className="text-[#BF953F]" size={20}/> Middle East & Asia-Pacific: Fast-Evolving Laws</h3>
                <p>
                  In regions such as the Middle East and Asia-Pacific, aesthetic medicine markets are expanding rapidly. Countries like the United Arab Emirates have established formal licensing systems requiring injectors to hold an aesthetic medicine license issued by local health authorities.
                </p>

                {/* FAQ SECTION */}
                <div className="my-12 p-8 border border-white/10 rounded-2xl bg-white/[0.02]">
                  <h2 className="text-2xl font-serif font-bold text-[#FBF5B7] mb-8">Frequently Asked Questions (FAQ)</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-white font-bold text-lg">Who can do Botox legally in my country?</h4>
                      <p className="text-white/60 text-sm mt-2">This depends on local aesthetic practitioner laws and whether the individual holds a valid aesthetic medicine license recognized by health authorities.</p>
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-lg">What qualifications are needed for non-physician injectors?</h4>
                      <p className="text-white/60 text-sm mt-2">Many countries allow nurses or allied health professionals to perform certain procedures provided they hold appropriate licenses and complete accredited aesthetic training.</p>
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-lg">What are the legal consequences of non-compliance?</h4>
                      <p className="text-white/60 text-sm mt-2">Consequences may include fines, suspension or revocation of licenses, civil lawsuits, and reputational harm.</p>
                    </div>
                  </div>
                </div>

                <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#FBF5B7] mt-12 mb-4">Conclusion: Mastering Compliance Amidst Diverse Regulation</h2>
                <p>
                  In 2026, the question of who can do Botox legally and hold a valid aesthetic medicine license remains central to the safe and lawful practice of aesthetic medicine worldwide. For practitioners and clinics committed to excellence, understanding and complying with beauty regulation by country is not optional—it is a professional imperative.
                </p>

                <div className="p-6 md:p-8 rounded-2xl bg-[#BF953F]/10 border border-[#BF953F]/30 mt-8 mb-16">
                  <h3 className="text-xl font-serif font-bold text-white mb-2">Take the Next Step with NSFA Academy</h3>
                  <p className="text-sm text-white/80 mb-6">
                    To ensure your practice is fully compliant with international standards, and to gain the skills necessary to excel, enroll in NSFA's internationally recognized aesthetic certification programs. Choose the gold standard in aesthetic education today.
                  </p>
                  <button onClick={() => window.location.href = '/courses'} className="px-6 py-3 rounded-full bg-[#040814] text-[#FBF5B7] border border-[#BF953F] font-bold text-xs tracking-widest uppercase hover:bg-[#BF953F] hover:text-[#040814] transition-colors">
                    Explore Our Programs
                  </button>
                </div>
              </div>

              {/* COMMENTS SECTION */}
              <div className="mt-16 pt-12 border-t border-white/10">
                <h3 className="text-2xl font-serif font-bold text-white mb-2">Leave a Reply</h3>
                <p className="text-white/50 text-sm mb-8">Your email address will not be published. Required fields are marked *</p>
                
                <form className="space-y-4">
                  <textarea placeholder="Comment *" required rows={5} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#BF953F] focus:ring-1 focus:ring-[#BF953F] outline-none transition-all resize-none"></textarea>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" placeholder="Name *" required className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#BF953F] focus:ring-1 focus:ring-[#BF953F] outline-none transition-all" />
                    <input type="email" placeholder="Email *" required className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#BF953F] focus:ring-1 focus:ring-[#BF953F] outline-none transition-all" />
                  </div>
                  <label className="flex items-center gap-3 text-xs text-white/60 cursor-pointer pt-2">
                    <input type="checkbox" className="accent-[#BF953F]" />
                    Save my name, email, and website in this browser for the next time I comment.
                  </label>
                  <button type="submit" className="mt-6 px-8 py-3 rounded-full bg-white/10 text-white font-bold text-xs tracking-widest uppercase hover:bg-white/20 transition-colors border border-white/20">
                    Post Comment
                  </button>
                </form>
              </div>

            </motion.article>
          )}

          {/* DOWNLOADS TAB CONTENT */}
          {activeTab === "downloads" && !selectedPost && (
            <motion.div key="downloads-view" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }} className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
                {downloads.map((doc, i) => (
                  <motion.a
                    key={doc.id} href={doc.file} target="_blank" rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: i * 0.1 }}
                    whileHover={{ y: -5 }} style={{ willChange: "transform" }}
                    className="bg-[#0A1128]/80 backdrop-blur-md border border-[#BF953F]/30 p-6 md:p-8 rounded-[2rem] flex flex-col h-full group transition-all duration-300 hover:shadow-[0_15px_40px_rgba(191,149,63,0.2)] hover:border-[#BF953F]"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-[#040814] border border-[#BF953F]/50 flex items-center justify-center mb-6 shadow-inner group-hover:bg-[linear-gradient(135deg,#BF953F,#FCF6BA,#B38728)] transition-all duration-500">
                      <FileText className="w-7 h-7 text-[#FBF5B7] group-hover:text-[#040814] transition-colors duration-500" />
                    </div>
                    <h4 className="text-lg md:text-xl font-serif font-bold text-white mb-3 leading-snug group-hover:text-[#FBF5B7] transition-colors">{doc.title}</h4>
                    <p className="text-white/60 text-sm font-light leading-relaxed mb-8 flex-grow">{doc.desc}</p>
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

      <style dangerouslySetInnerHTML={{__html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </main>
  );
}