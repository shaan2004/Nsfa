import type { Metadata, Viewport } from "next";
import "./globals.css"; // Uses our Tailwind v4 setup
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Chatbot from "@/components/layout/Chatbot";

// Defines viewport and theme settings (Required separately in Next.js 14+)
export const viewport: Viewport = {
  themeColor: "#050914", // Matches your brand dark background
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  // Use metadataBase to resolve relative image/canonical URLs automatically
  metadataBase: new URL("https://nsfaacademy.com"), 
  
  title: {
    default: "NSFA Academy | Zeal to Excellence in Aesthetics Science",
    template: "%s | NSFA Academy", // Automatically formats child page titles (e.g., "Courses | NSFA Academy")
  },
  description: "India's premier Non-Surgical Facial Aesthetics Academy offering globally recognised certifications in Cosmetic Medicine, Dental Science, and Clinical Cosmetology.",
  keywords: [
    "NSFA Academy",
    "Facial Aesthetics Training",
    "Clinical Cosmetology Courses",
    "Aesthetic Medicine Fellowship",
    "Dental Aesthetics Training",
    "Chennai Aesthetic Academy",
    "Medical Cosmetology",
    "Botox and Fillers Training India"
  ],
  authors: [{ name: "NSFA Academy" }],
  creator: "NSFA Academy",
  
  alternates: {
    canonical: "/",
  },

  // Open Graph (For beautiful link previews on WhatsApp, Facebook, LinkedIn)
  openGraph: {
    title: "NSFA Academy | Advanced Aesthetics Education",
    description: "Globally recognised certifications in Cosmetic Medicine, Dental Science, and Cosmetology.",
    url: "/",
    siteName: "NSFA Academy",
    images: [
      {
        url: "/assets/aboutus.jpg", // The hero/about image we used earlier
        width: 1200,
        height: 630,
        alt: "NSFA Academy - Advanced Aesthetics Training",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  // Twitter Cards (For Twitter sharing)
  twitter: {
    card: "summary_large_image",
    title: "NSFA Academy | Aesthetics & Cosmetology Education",
    description: "Globally recognised certifications in Cosmetic Medicine, Dental Science, and Cosmetology.",
    images: ["/assets/aboutus.jpg"],
  },

  // Instructs Google exactly how to crawl the site
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-brand-darkBg text-white">
        <Navbar />
       
        <div className="pt-24 min-h-screen">
          {children}
        </div>
        <Footer />
        <Chatbot />
      </body>
    </html>
  );
}