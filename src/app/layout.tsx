import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LIMA_CONFIG } from "@/data/content";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: `${LIMA_CONFIG.company.brandName} ${LIMA_CONFIG.company.brandSuffix} | Exterior Improvements in Loveland, CO`,
  description:
    "Premier installation and replacement of windows, doors, siding, and custom decks in Loveland and Northern Colorado. Built for high performance and lasting durability.",
  keywords: [
    "window installation Loveland CO",
    "doors replacement Colorado",
    "siding contractors Northern Colorado",
    "deck builders Loveland",
    "Lima Innovations",
  ],
  icons: {
    icon: "/assets/images/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable} scroll-smooth`}>
      <body className="min-h-screen flex flex-col bg-[#F8F6F0] text-[#1E2322] font-sans antialiased selection:bg-[#A45A2A] selection:text-white">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
