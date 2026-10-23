import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle, MapPin } from "lucide-react";
import { LIMA_CONFIG } from "@/data/content";
import { HeroSection } from "@/components/HeroSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ServiceAreaMap } from "@/components/ServiceAreaMap";
import { QuoteSection } from "@/components/QuoteSection";

export default function HomePage() {
  return (
    <div>
      {/* 1. HERO SECTION WITH SCROLL-DRIVEN REVEAL */}
      <HeroSection />

      {/* 2. PROJECTS GALLERY SECTION (4 FEATURED MODAL CARDS) */}
      <ProjectsSection />

      {/* 5. SERVICE AREA SECTION */}
      <section id="service-area" className="py-24 sm:py-32 bg-neutral-100 border-t border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Centered Editorial Header */}
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-12 sm:mb-16">
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#A45A2A] bg-[#A45A2A]/10 px-3.5 py-1.5 rounded-full inline-block">
              Service Area
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#1F302B] tracking-tight">
              Proudly Serving Northern Colorado
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              Based in Loveland, CO, Lima Innovations brings top-tier exterior craftsmanship to surrounding communities. Wherever you are in Northern Colorado, we bring our tools and dedication to your doorstep.
            </p>
            <div className="pt-1">
              <a
                href={LIMA_CONFIG.company.phoneHref}
                className="inline-flex items-center gap-2 text-sm font-bold text-[#A45A2A] hover:underline"
              >
                <span>Have questions about your location? Call {LIMA_CONFIG.company.phone}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Centered Wide Map */}
          <div className="w-full max-w-6xl mx-auto">
            <ServiceAreaMap />
          </div>

        </div>
      </section>

      {/* 6. QUOTE SECTION */}
      <QuoteSection />
    </div>
  );
}
