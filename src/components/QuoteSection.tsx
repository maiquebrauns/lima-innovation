"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Send, CheckCircle2, ShieldCheck, Phone, MapPin, ArrowUpRight, Sparkles } from "lucide-react";
import { LIMA_CONFIG } from "@/data/content";
import { ScrollReveal } from "@/components/ScrollReveal";

export function QuoteSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "windows",
    city: "Loveland",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [highlightCity, setHighlightCity] = useState(false);

  // Automatically update city when selected from the Service Area Map
  useEffect(() => {
    const handleCitySelect = (e: any) => {
      const city = e.detail?.city;
      if (city) {
        setFormData((prev) => ({ ...prev, city }));
        setHighlightCity(true);
        setTimeout(() => setHighlightCity(false), 2500);
      }
    };

    window.addEventListener("lima:select-city", handleCitySelect);
    return () => window.removeEventListener("lima:select-city", handleCitySelect);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="bg-[#121B18] text-white relative overflow-hidden scroll-mt-16"
    >
      {/* Anchor alias so #quote also scrolls here */}
      <div id="quote" className="absolute top-20 left-0 pointer-events-none" />

      {/* Organic Wave Transition from Service Area (#F5F5F5 / neutral-100) to Contact Section */}
      <div className="w-full overflow-hidden leading-none bg-[#F5F5F5] pointer-events-none -mb-px relative z-20">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative block w-full h-12 sm:h-20 lg:h-28"
          preserveAspectRatio="none"
        >
          {/* Top solid neutral fill (completely opaque, prevents any background bleed) */}
          <path
            d="M0,0 L1440,0 L1440,45 C1380,30 1260,15 1080,50 C900,95 720,95 540,50 C360,10 180,10 0,45 Z"
            fill="#F5F5F5"
          />
          {/* Bottom solid dark fill flowing up and down */}
          <path
            d="M0,45 C180,10 360,10 540,50 C720,95 900,95 1080,50 C1260,15 1380,30 1440,45 L1440,120 L0,120 Z"
            fill="#121B18"
          />
        </svg>
      </div>

      <div className="pt-10 sm:pt-14 pb-20 sm:pb-28 lg:pb-32 relative z-10 overflow-hidden">
        {/* Decorative architectural ambient glows (safely positioned below wave) */}
        <div className="absolute top-24 -left-40 w-[550px] h-[550px] rounded-full bg-[#1F302B]/60 blur-[140px] pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-[550px] h-[550px] rounded-full bg-[#A45A2A]/20 blur-[150px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Architectural Split Container */}
        <ScrollReveal duration={850} distance={36}>
          <div className="rounded-3xl sm:rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl bg-[#17231F] grid grid-cols-1 lg:grid-cols-12 items-stretch">
          
          {/* =========================================================
              Left Side — Architectural Visual Experience
             ========================================================= */}
          <div className="lg:col-span-5 relative min-h-[520px] lg:min-h-full flex flex-col justify-between p-8 sm:p-12 lg:p-14 overflow-hidden">
            {/* Background Image: High-end Colorado home featuring custom windows, siding, and architectural details */}
            <Image
              src="/assets/images/contact-colorado-home.jpg"
              alt="Colorado mountain residence featuring custom windows, exterior siding, and deck"
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover object-center scale-105 transition-transform duration-1000 ease-out"
              priority
            />

            {/* Architectural Dark Green Gradient Overlay for High Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#111A17]/95 via-[#162420]/80 to-[#121B18]/55" />
            
            {/* Subtle top ambient light line */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            {/* Content Layer (Top: Headlines & Story) */}
            <div className="relative z-10 space-y-5">
              <span className="inline-block text-[11px] font-mono uppercase tracking-[0.25em] text-[#C98A5B] font-semibold">
                LET&apos;S TALK ABOUT YOUR PROJECT
              </span>
              
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-normal text-white tracking-tight leading-[1.12]">
                Your Home Deserves Better.
              </h2>
              
              <p className="text-white/80 text-sm sm:text-base font-light leading-relaxed max-w-md pt-1">
                From beautiful new windows to complete exterior transformations, we help homeowners bring their vision to life with quality craftsmanship and honest guidance.
              </p>

              {/* Architectural Value Tags */}
              <div className="flex flex-wrap gap-2 pt-4">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-white/70 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                  <Sparkles className="w-3 h-3 text-[#C98A5B]" />
                  Northern Colorado
                </span>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-white/70 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                  <ShieldCheck className="w-3 h-3 text-[#C98A5B]" />
                  Licensed &amp; Insured
                </span>
              </div>
            </div>

            {/* Content Layer (Bottom: Refined Contact Detail & Direct Call) */}
            <div className="relative z-10 pt-10 mt-8 border-t border-white/15 space-y-4">
              <div className="flex items-center justify-between text-xs text-white/60 font-mono uppercase tracking-wider">
                <span>Direct Contact</span>
                <span>Primary Hub</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <a
                  href="tel:+19707751830"
                  className="inline-flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 backdrop-blur-md transition-all duration-200 group/call"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#A45A2A] text-white flex items-center justify-center shrink-0 group-hover/call:scale-105 transition-transform shadow-sm">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-white/60 font-mono uppercase tracking-wider">Call or Text</span>
                    <span className="text-sm font-semibold text-white tracking-wide">970 775 1830</span>
                  </div>
                </a>

                <div className="flex items-center gap-2 text-white/80 text-xs sm:text-sm font-medium">
                  <MapPin className="w-4 h-4 text-[#C98A5B] shrink-0" />
                  <span>Northern Colorado</span>
                </div>
              </div>
            </div>
          </div>

          {/* =========================================================
              Right Side — Premium Form Card Experience
             ========================================================= */}
          <div className="lg:col-span-7 bg-[#FAF9F6] p-8 sm:p-12 lg:p-14 text-neutral-900 flex flex-col justify-center relative">
            {isSubmitted ? (
              <div className="text-center py-10 sm:py-16 space-y-5">
                <div className="w-16 h-16 bg-[#1F302B]/10 text-[#1F302B] rounded-2xl flex items-center justify-center mx-auto border border-[#1F302B]/20">
                  <CheckCircle2 className="w-9 h-9 text-[#1F302B]" />
                </div>
                
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#A45A2A] font-semibold block">
                  Inquiry Received
                </span>

                <h3 className="text-2xl sm:text-3xl font-normal text-[#1F302B] tracking-tight">
                  Thank You, {formData.name || "Neighbor"}!
                </h3>
                
                <p className="text-neutral-600 max-w-md mx-auto text-sm leading-relaxed">
                  We received your consultation request for{" "}
                  <strong className="text-neutral-900 capitalize">{formData.service}</strong> in{" "}
                  <strong className="text-neutral-900">{formData.city || "Northern Colorado"}</strong>. Our team will review your project details and reach out at{" "}
                  <strong className="text-neutral-900">{formData.phone || formData.email}</strong> within 24 business hours.
                </p>

                <div className="pt-4">
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: "",
                        phone: "",
                        email: "",
                        service: "windows",
                        city: "Loveland",
                        message: "",
                      });
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#A45A2A] hover:underline uppercase tracking-wider"
                  >
                    <span>Submit another inquiry</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Form Header */}
                <div className="border-b border-neutral-200/70 pb-5 mb-2">
                  <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#A45A2A] font-semibold block mb-1.5">
                    Request a Free Quote
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-normal text-[#1F302B] tracking-tight">
                    Start Your Transformation
                  </h3>
                  <p className="text-neutral-500 text-xs sm:text-sm mt-1.5 leading-relaxed">
                    Fill out the form below or reach us directly at{" "}
                    <a
                      href="tel:+19707751830"
                      className="text-[#A45A2A] font-semibold hover:underline"
                    >
                      970 775 1830
                    </a>
                    . No high-pressure sales tactics — just clear, honest exterior guidance.
                  </p>
                </div>

                {/* Two-Column Inputs: Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-600 mb-1.5 font-medium">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Eleanor Vance"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200/90 bg-white text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#A45A2A]/30 focus:border-[#A45A2A] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-600 mb-1.5 font-medium">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="(970) 555-0123"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200/90 bg-white text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#A45A2A]/30 focus:border-[#A45A2A] transition-all"
                    />
                  </div>
                </div>

                {/* Two-Column Inputs: Email & Service */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-600 mb-1.5 font-medium">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="eleanor@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200/90 bg-white text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#A45A2A]/30 focus:border-[#A45A2A] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-600 mb-1.5 font-medium">
                      Service Needed *
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200/90 bg-white text-sm text-neutral-800 focus:outline-none focus:ring-2 focus:ring-[#A45A2A]/30 focus:border-[#A45A2A] transition-all cursor-pointer"
                    >
                      <option value="windows">Window Installation &amp; Replacement</option>
                      <option value="doors">Architectural Entryway &amp; Patio Doors</option>
                      <option value="siding">Exterior Siding &amp; Architectural Trim</option>
                      <option value="decks">Custom Mountain View Decks</option>
                      <option value="multiple">Complete Exterior Renovation Package</option>
                    </select>
                  </div>
                </div>

                {/* City Input with Auto-Select animation from Map */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label
                      htmlFor="quote-city-input"
                      className="block text-[11px] font-mono uppercase tracking-wider text-neutral-600 font-medium"
                    >
                      Your City / Location
                    </label>
                    {highlightCity && (
                      <span className="text-[10px] font-mono text-[#A45A2A] font-bold uppercase tracking-wider animate-pulse flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#A45A2A]" />
                        Auto-selected from map
                      </span>
                    )}
                  </div>
                  <input
                    id="quote-city-input"
                    type="text"
                    placeholder="e.g. Loveland, Fort Collins, Windsor, Longmont..."
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border text-sm text-neutral-800 placeholder-neutral-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#A45A2A]/30 focus:border-[#A45A2A] ${
                      highlightCity
                        ? "border-[#A45A2A] ring-2 ring-[#A45A2A]/40 bg-[#FFF7F0]"
                        : "border-neutral-200/90 bg-white"
                    }`}
                  />
                </div>

                {/* Project Details */}
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-600 mb-1.5 font-medium">
                    Project Notes &amp; Scope
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us what you have in mind (e.g. approximate window count, wood or composite preferences, desired timeline)..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200/90 bg-white text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#A45A2A]/30 focus:border-[#A45A2A] transition-all resize-none"
                  />
                </div>

                {/* Submit Action */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-[#A45A2A] hover:bg-[#8B4A20] text-white py-4 rounded-xl font-bold text-sm uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                  >
                    <span>Request Free Consultation</span>
                    <Send className="w-4 h-4" />
                  </button>
                </div>

                {/* Privacy & Trust Footnote */}
                <div className="flex items-center justify-center gap-2 text-[11px] text-neutral-500 text-center pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#1F302B]" />
                  <span>Your privacy is respected. No spam, ever.</span>
                </div>
              </form>
            )}
          </div>

          </div>
        </ScrollReveal>

      </div>
    </div>
  </section>
  );
}
