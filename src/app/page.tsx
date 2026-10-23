import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle, MapPin } from "lucide-react";
import { LIMA_CONFIG } from "@/data/content";
import { HeroSection } from "@/components/HeroSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ServiceAreaMap } from "@/components/ServiceAreaMap";
import { QuoteSection } from "@/components/QuoteSection";
import { ScrollReveal } from "@/components/ScrollReveal";

export default function HomePage() {
  return (
    <div>
      {/* 1. HERO SECTION WITH SCROLL-DRIVEN REVEAL */}
      <HeroSection />

      {/* 2. PROJECTS GALLERY SECTION (4 FEATURED MODAL CARDS) */}
      <ProjectsSection />

      {/* 5. SERVICE AREA SECTION */}
      <section id="service-area" className="pt-24 sm:pt-32 pb-14 sm:pb-16 bg-neutral-100 border-t border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Centered Editorial Header (Mesma fonte e estilo da seção acima) */}
          <ScrollReveal className="mb-12 sm:mb-16 text-center">
            <div className="pb-8 border-b border-neutral-200/80 max-w-4xl mx-auto">
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#A45A2A] font-semibold block mb-3">
                Service Area
              </span>
              <h2 className="text-3xl sm:text-5xl font-normal text-[#1F302B] tracking-tight">
                Proudly Serving Northern Colorado.
              </h2>
              <p className="text-neutral-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto mt-4 font-normal">
                Based in Loveland, CO, Lima Innovations brings top-tier exterior craftsmanship to surrounding communities. Wherever you are in Northern Colorado, we bring our tools and dedication to your doorstep.
              </p>
              <div className="pt-3">
                <a
                  href={LIMA_CONFIG.company.phoneHref}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#A45A2A] hover:underline uppercase tracking-wider"
                >
                  <span>Have questions about your location? Call {LIMA_CONFIG.company.phone}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </ScrollReveal>

          {/* Centered Wide Map */}
          <ScrollReveal delay={120} duration={800} className="w-full max-w-6xl mx-auto">
            <ServiceAreaMap />
          </ScrollReveal>

        </div>
      </section>

      {/* 6. QUOTE SECTION */}
      <QuoteSection />
    </div>
  );
}
