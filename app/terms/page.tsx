"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronLeft, Scale } from "lucide-react";

const termsData = [
  {
    title: "1. Acceptance of Terms",
    content: "By accessing and using the NSFA Academy website, enrolling in our courses, or utilizing our services, you agree to comply with and be bound by these Terms of Service. If you do not agree with any part of these terms, you must not use our services."
  },
  {
    title: "2. Eligibility and Medical Credentials",
    content: "Certain advanced clinical courses, fellowships, and masterships offered by NSFA Academy require participants to hold valid medical or dental degrees (e.g., MBBS, BDS, MDS, MD). You agree to provide accurate and verifiable proof of your medical credentials upon enrollment. NSFA Academy reserves the right to reject any application if the required credentials are not met."
  },
  {
    title: "3. Course Enrollment and Payments",
    content: "Course fees are subject to change without prior notice. Enrollment is confirmed only upon receipt of the minimum required deposit or full payment. For courses offering 'Easy EMI' options, the financing is subject to approval by our third-party financial partners, and separate terms will apply."
  },
  {
    title: "4. Intellectual Property Rights",
    content: "All course materials, including but not limited to syllabi, lecture slides, video demonstrations, and printed notes, are the exclusive intellectual property of NSFA Academy. You may not reproduce, distribute, or create derivative works from these materials without express written consent from the Academy."
  },
  {
    title: "5. Hands-on Clinical Training Protocols",
    content: "During practical sessions and clinical training, participants must strictly adhere to the safety, hygiene, and ethical guidelines provided by the Academy instructors. NSFA Academy provides models for hands-on training; however, the Academy is not liable for any malpractice or negligence committed by a student during or after the training period."
  },
  {
    title: "6. Disclaimer of Medical Liability",
    content: "The information and training provided by NSFA Academy are strictly for educational purposes. We aim to equip medical professionals with advanced aesthetic skills. However, the application of these skills in a clinical setting is the sole responsibility of the practitioner. NSFA Academy assumes no liability for patient outcomes in the practitioner's independent clinics."
  },
  {
    title: "7. Cancellation and Refund Policy",
    content: "Cancellations made 30 days prior to the course commencement are eligible for a partial refund as per our fee structure. Deposits are strictly non-refundable within 30 days of the course start date. NSFA Academy reserves the right to reschedule courses due to unforeseen circumstances, in which case students will be accommodated in subsequent batches."
  },
  {
    title: "8. Governing Law",
    content: "These Terms of Service shall be governed by and construed in accordance with the laws of India. Any disputes arising out of these terms shall be subject to the exclusive jurisdiction of the courts located in Chennai, Tamil Nadu."
  }
];

export default function TermsOfService() {
  return (
    <main className="bg-[#040814] text-white min-h-screen pt-32 pb-24 relative overflow-hidden">
      
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[10%] left-[50%] -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-[#BF953F]/5 blur-[150px]" />
      </div>

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        
        {/* Navigation / Back Button */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-white/50 hover:text-[#BF953F] transition-colors mb-8 md:mb-12 text-sm font-medium uppercase tracking-widest"
        >
          <ChevronLeft size={16} />
          Back to Home
        </Link>

        {/* Header */}
        <div className="mb-12 md:mb-16">
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 shadow-inner">
            <Scale className="w-8 h-8 text-[#BF953F]" />
          </div>
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-transparent bg-clip-text mb-6"
            style={{ backgroundImage: "linear-gradient(to right, #BF953F, #FCF6BA, #B38728)" }}
          >
            Terms of Service
          </h1>
          <p className="text-white/60 font-light text-sm md:text-base tracking-wide">
            Last Updated: May 6, 2026
          </p>
        </div>

        {/* Terms Content container */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/[0.02] border border-white/10 rounded-3xl p-6 md:p-12 backdrop-blur-md shadow-2xl space-y-10"
        >
          {termsData.map((term, index) => (
            <div key={index} className="space-y-4">
              <h2 className="text-xl md:text-2xl font-serif font-bold text-[#FBF5B7]">
                {term.title}
              </h2>
              <p className="text-white/70 leading-relaxed font-light text-sm md:text-base text-justify">
                {term.content}
              </p>
              {index !== termsData.length - 1 && (
                <div className="pt-6 border-b border-white/5" />
              )}
            </div>
          ))}

          {/* Contact Section at bottom of terms */}
          <div className="mt-12 pt-8 border-t border-[#BF953F]/30 text-center md:text-left">
            <h3 className="text-lg font-bold text-white mb-2">Questions regarding our terms?</h3>
            <p className="text-white/60 text-sm font-light mb-4">
              If you have any questions or concerns about these terms, please contact our administrative team.
            </p>
            <a 
              href="mailto:info@nsfaacademy.com" 
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-full border border-[#BF953F]/50 text-[#FBF5B7] hover:bg-[#BF953F] hover:text-[#040814] transition-all duration-300 text-sm font-bold tracking-widest uppercase"
            >
              Contact Support
            </a>
          </div>
        </motion.div>

      </div>
    </main>
  );
}