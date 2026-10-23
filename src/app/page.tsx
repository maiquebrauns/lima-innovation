import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle, MapPin } from "lucide-react";
import { LIMA_CONFIG } from "@/data/content";
import { HeroSection } from "@/components/HeroSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { QuoteSection } from "@/components/QuoteSection";

export default function HomePage() {
  return (
    <div>
      {/* 1. HERO SECTION WITH SCROLL-DRIVEN REVEAL */}
      <HeroSection />

      {/* 2. PROJECTS GALLERY SECTION (4 FEATURED MODAL CARDS) */}
      <ProjectsSection />

      {/* 5. SERVICE AREA SECTION */}
      <section id="service-area" className="py-20 bg-neutral-100 border-t border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs uppercase font-extrabold tracking-widest text-[#A45A2A] bg-[#A45A2A]/10 px-3 py-1 rounded-full">
                Service Area
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1F302B] tracking-tight">
                Proudly Serving Northern Colorado
              </h2>
              <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                Based in Loveland, CO, Lima Innovations brings top-tier exterior craftsmanship to surrounding communities. Wherever you are in Northern Colorado, we bring our tools and dedication to your doorstep.
              </p>
              <div className="pt-2">
                <a
                  href={LIMA_CONFIG.company.phoneHref}
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#A45A2A] hover:underline"
                >
                  <span>Have questions about your location? Call {LIMA_CONFIG.company.phone}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {LIMA_CONFIG.serviceAreas.map((area, idx) => (
                  <div
                    key={idx}
                    className={`p-5 rounded-2xl border transition-all ${
                      area.isPrimary
                        ? "bg-[#1F302B] text-white border-[#1F302B] shadow-md"
                        : "bg-white text-neutral-900 border-neutral-200 hover:border-[#A45A2A]"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <MapPin
                        className={`w-5 h-5 ${
                          area.isPrimary ? "text-[#A45A2A]" : "text-neutral-400"
                        }`}
                      />
                      {area.isPrimary && (
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-white/10 px-2 py-0.5 rounded">
                          Hub
                        </span>
                      )}
                    </div>
                    <div className="font-extrabold text-base">{area.city}</div>
                    <div
                      className={`text-xs mt-1 ${
                        area.isPrimary ? "text-white/70" : "text-neutral-500"
                      }`}
                    >
                      {area.note}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. QUOTE SECTION */}
      <QuoteSection />
    </div>
  );
}
