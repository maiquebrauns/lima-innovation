"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, ShieldCheck, Clock, Sparkles } from "lucide-react";
import { LIMA_CONFIG } from "@/data/content";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate interactive smooth form handling
    setIsSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 bg-[#1F302B] text-white relative overflow-hidden scroll-mt-16">
      {/* Anchor alias so #quote also scrolls here */}
      <div id="quote" className="absolute -top-16 left-0 pointer-events-none" />
      
      {/* Decorative mountain background glow */}
      <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 rounded-full bg-[#A45A2A]/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-96 h-96 rounded-full bg-[#2D443D]/60 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Info Side */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#A45A2A] bg-[#A45A2A]/20 px-3 py-1 rounded-full border border-[#A45A2A]/30">
              Free Consultation &amp; Estimate
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Ready to Upgrade Your Home?
            </h2>
            <p className="text-white/80 text-base sm:text-lg leading-relaxed">
              Tell us about your upcoming project. We provide straightforward, transparent consultations and detailed, no-obligation quotes for homeowners across Northern Colorado.
            </p>

            <div className="space-y-4 pt-4 border-t border-white/10">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#A45A2A] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm">Clear, Honest Estimates</h4>
                  <p className="text-white/60 text-xs">No pushy sales tactics or hidden fees. Just expert advice.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#A45A2A] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm">Prompt Response</h4>
                  <p className="text-white/60 text-xs">We typically get back to project inquiries within 24 business hours.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-[#A45A2A] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm">Built for Colorado Weather</h4>
                  <p className="text-white/60 text-xs">Engineered to endure hail, UV exposure, and seasonal freezing shifts.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-2xl text-neutral-900 border border-neutral-100">
              {isSubmitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-[#1F302B]">
                    Thank You, {formData.name || "Neighbor"}!
                  </h3>
                  <p className="text-neutral-600 max-w-md mx-auto text-sm">
                    We received your quote request. Our team will review your project details and contact you shortly at{" "}
                    <strong>{formData.phone || formData.email}</strong>.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-6 text-sm font-bold text-[#A45A2A] hover:underline"
                  >
                    Send another inquiry &rarr;
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="border-b border-neutral-100 pb-4 mb-2">
                    <h3 className="text-xl font-extrabold text-[#1F302B]">
                      Request a Free Quote
                    </h3>
                    <p className="text-neutral-500 text-xs mt-1">
                      Fill out the form below or call us directly at{" "}
                      <a href={LIMA_CONFIG.company.phoneHref} className="text-[#A45A2A] font-semibold underline">
                        {LIMA_CONFIG.company.phone}
                      </a>
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#A45A2A]/40 focus:border-[#A45A2A] text-sm text-neutral-800"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="(970) 555-0123"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#A45A2A]/40 focus:border-[#A45A2A] text-sm text-neutral-800"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#A45A2A]/40 focus:border-[#A45A2A] text-sm text-neutral-800"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                        Service Needed *
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#A45A2A]/40 focus:border-[#A45A2A] text-sm text-neutral-800 bg-white"
                      >
                        <option value="windows">Window Installation &amp; Replacement</option>
                        <option value="doors">Door Installation &amp; Upgrades</option>
                        <option value="siding">Exterior Siding &amp; Trim</option>
                        <option value="decks">Custom Deck Construction</option>
                        <option value="multiple">Multiple / Comprehensive Exterior</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                      Your City / Location
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Loveland, Fort Collins, Windsor..."
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#A45A2A]/40 focus:border-[#A45A2A] text-sm text-neutral-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                      Project Details / Notes
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Briefly describe what you'd like to get done (approximate number of windows/doors, style preferences, timeline)..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#A45A2A]/40 focus:border-[#A45A2A] text-sm text-neutral-800 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#A45A2A] hover:bg-[#8B4A20] text-white py-4 rounded-xl font-bold text-base transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Submit Free Quote Request</span>
                    <Send className="w-4 h-4" />
                  </button>

                  <p className="text-[11px] text-neutral-400 text-center">
                    We respect your privacy. Your information is never sold or shared.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
