import type { Metadata } from "next";
import "./globals.css"; // Uses our Tailwind v4 setup
import Navbar from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "NSFA Academy | Zeal to Excellence in Aesthetics Science",
  description: "Non Surgical Facial Aesthetics Academy offering globally recognised certifications in Cosmetic Medicine, Dental Science, and Cosmetology.",
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
        {/* Adds padding-top so content isn't hidden behind the fixed navbar */}
        <div className="pt-24 min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}