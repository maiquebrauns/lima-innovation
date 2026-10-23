"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, ShieldCheck, Phone, MapPin, Sparkles, ArrowUpRight } from "lucide-react";
import { LIMA_CONFIG } from "@/data/content";

interface CleanServiceQuoteFormProps {
  serviceId: string;
  serviceTitle: string;
}

export function CleanServiceQuoteForm({ serviceId, serviceTitle }: CleanServiceQuoteFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: serviceId,
    city: "Loveland",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 450);
  };

  return (
    <section id="quote" className="w-full py-16 sm:py-20 bg-[#101A16] border-t border-white/10 relative overflow-hidden scroll-mt-16">
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[420px] h-[420px] rounded-full bg-[#1F302B]/40 blur-[130px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[380px] h-[380px] rounded-full bg-[#A45A2A]/15 blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="rounded-2xl sm:rounded-3xl bg-[#16231F] border border-white/10 p-6 sm:p-10 shadow-2xl backdrop-blur-md">
          {isSubmitted ? (
            <div className="text-center py-10 sm:py-14 space-y-4">
              <div className="w-14 h-14 bg-[#A45A2A]/20 text-[#D48B55] rounded-2xl flex items-center justify-center mx-auto border border-[#A45A2A]/30">
                <CheckCircle2 className="w-8 h-8 text-[#D48B55]" />
              </div>

              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#D48B55] font-semibold block">
                Inquiry Received
              </span>

              <h3 className="text-2xl sm:text-3xl font-normal text-white tracking-tight">
                Thank You, {formData.name || "Neighbor"}!
              </h3>

              <p className="text-white/75 max-w-lg mx-auto text-sm leading-relaxed">
                We received your consultation request for{" "}
                <strong className="text-white capitalize">{serviceTitle}</strong> in{" "}
                <strong className="text-white">{formData.city || "Northern Colorado"}</strong>. Our team will review your project and get back to you at{" "}
                <strong className="text-white">{formData.phone || formData.email}</strong> within 24 business hours.
              </p>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({
                      name: "",
                      phone: "",
                      email: "",
                      service: serviceId,
                      city: "Loveland",
                      message: "",
                    });
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D48B55] hover:text-[#E8A572] underline uppercase tracking-wider cursor-pointer"
                >
                  <span>Submit another inquiry</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              {/* Clean Reduced Header */}
              <div className="border-b border-white/10 pb-4 mb-2 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                <div>
                  <div className="inline-flex items-center gap-2 text-[#D48B55] text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] font-semibold mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D48B55]" />
                    <span>Request A Free Quote • {serviceTitle}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-normal text-white tracking-tight">
                    Start Your {serviceTitle.charAt(0) + serviceTitle.slice(1).toLowerCase()} Transformation
                  </h3>
                  <p className="text-white/60 text-xs sm:text-sm mt-1 max-w-xl">
                    Fill out this quick form or call us directly at{" "}
                    <a href={LIMA_CONFIG.company.phoneHref} className="text-[#D48B55] font-semibold hover:underline">
                      {LIMA_CONFIG.company.phone}
                    </a>
                    . Honest guidance, transparent pricing, no pushy sales.
                  </p>
                </div>

                {/* Pre-selected Category Badge */}
                <div className="shrink-0 self-start sm:self-auto">
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-white/80 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                    <Sparkles className="w-3 h-3 text-[#D48B55]" />
                    <span>Focus: {serviceTitle}</span>
                  </span>
                </div>
              </div>

              {/* Row 1: Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-white/70 mb-1 font-medium">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Eleanor Vance"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-white/15 bg-white/5 text-[16px] sm:text-sm text-white placeholder-white/35 focus:outline-none focus:ring-2 focus:ring-[#A45A2A]/50 focus:border-[#A45A2A] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-white/70 mb-1 font-medium">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="(970) 555-0123"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-white/15 bg-white/5 text-[16px] sm:text-sm text-white placeholder-white/35 focus:outline-none focus:ring-2 focus:ring-[#A45A2A]/50 focus:border-[#A45A2A] transition-all"
                  />
                </div>
              </div>

              {/* Row 2: Email & City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-white/70 mb-1 font-medium">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="eleanor@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-white/15 bg-white/5 text-[16px] sm:text-sm text-white placeholder-white/35 focus:outline-none focus:ring-2 focus:ring-[#A45A2A]/50 focus:border-[#A45A2A] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-white/70 mb-1 font-medium">
                    City / Location
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Loveland, Fort Collins, Windsor..."
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-white/15 bg-white/5 text-[16px] sm:text-sm text-white placeholder-white/35 focus:outline-none focus:ring-2 focus:ring-[#A45A2A]/50 focus:border-[#A45A2A] transition-all"
                  />
                </div>
              </div>

              {/* Row 3: Service Selection Dropdown */}
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-white/70 mb-1 font-medium">
                  Service Needed
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-white/15 bg-[#14211D] text-[16px] sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#A45A2A]/50 focus:border-[#A45A2A] transition-all cursor-pointer"
                >
                  <option value="windows">Window Installation &amp; Replacement</option>
                  <option value="doors">Architectural Entryway &amp; Patio Doors</option>
                  <option value="siding">Exterior Siding &amp; Architectural Trim</option>
                  <option value="decks">Custom Mountain View Decks</option>
                  <option value="multiple">Complete Exterior Package</option>
                </select>
              </div>

              {/* Row 4: Project Scope (Optional short notes) */}
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-white/70 mb-1 font-medium">
                  Project Notes &amp; Scope <span className="text-white/40 normal-case font-normal">(Optional)</span>
                </label>
                <textarea
                  rows={2}
                  placeholder="Tell us what you have in mind (e.g. approximate count, preferred style, timeline)..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-white/15 bg-white/5 text-[16px] sm:text-sm text-white placeholder-white/35 focus:outline-none focus:ring-2 focus:ring-[#A45A2A]/50 focus:border-[#A45A2A] transition-all resize-none"
                />
              </div>

              {/* Action Bar: Direct Call + Submit Button */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <a
                  href={LIMA_CONFIG.company.phoneHref}
                  className="inline-flex items-center gap-2.5 text-xs text-white/70 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-3.5 py-2.5 rounded-xl border border-white/10 w-fit"
                >
                  <Phone className="w-3.5 h-3.5 text-[#D48B55]" />
                  <span>Call or Text: <strong className="text-white font-mono">{LIMA_CONFIG.company.phone}</strong></span>
                </a>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 bg-[#A45A2A] hover:bg-[#8B4A20] text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.99] cursor-pointer disabled:opacity-60"
                >
                  <span>{isSubmitting ? "Sending..." : "Request Free Consultation"}</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Trust Footnote */}
              <div className="flex items-center justify-center gap-2 text-[11px] text-white/50 text-center pt-1 border-t border-white/5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D48B55]" />
                <span>Licensed &amp; Insured in Northern Colorado • We respect your privacy. No spam, ever.</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
