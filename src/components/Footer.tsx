import React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import { LIMA_CONFIG } from "@/data/content";

export function Footer() {
  return (
    <footer className="bg-[#1F302B] text-white pt-16 pb-12 border-t border-[#2D443D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <svg
                className="w-8 h-8 text-[#A45A2A]"
                viewBox="0 0 40 32"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 26L16 8L24 18L30 10L38 26" />
                <path d="M12 26L16 20L20 26" />
              </svg>
              <span className="font-extrabold text-xl tracking-wider">
                {LIMA_CONFIG.company.brandName}
              </span>
            </div>
            <p className="text-[#A45A2A] font-semibold text-sm italic">
              &quot;{LIMA_CONFIG.company.tagline}&quot;
            </p>
            <p className="text-white/70 text-sm leading-relaxed">
              Proudly serving residential homeowners with premier exterior installation
              services across Loveland and Northern Colorado. Built for high performance and lasting durability.
            </p>
          </div>

          {/* Services Links */}
          <div className="space-y-4">
            <h3 className="text-base font-bold tracking-wider text-white uppercase">
              Services
            </h3>
            <ul className="space-y-2.5 text-sm text-white/80">
              {LIMA_CONFIG.services.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services/${service.id}`}
                    className="hover:text-[#A45A2A] transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-[#A45A2A]">&rsaquo;</span>
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-base font-bold tracking-wider text-white uppercase">
              Company
            </h3>
            <ul className="space-y-2.5 text-sm text-white/80">
              <li>
                <Link href="/#projects" className="hover:text-[#A45A2A] transition-colors">
                  Our Work & Projects
                </Link>
              </li>
              <li>
                <Link href="/#service-area" className="hover:text-[#A45A2A] transition-colors">
                  Service Area
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-[#A45A2A] transition-colors">
                  Request a Free Quote / Contact
                </Link>
              </li>
              <li>
                <span className="inline-block bg-white/10 text-white/90 text-xs px-2.5 py-1 rounded-full font-medium mt-1">
                  {LIMA_CONFIG.company.licenseInfo}
                </span>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h3 className="text-base font-bold tracking-wider text-white uppercase">
              Get in Touch
            </h3>
            <div className="space-y-3 text-sm text-white/80">
              <a
                href={LIMA_CONFIG.company.phoneHref}
                className="flex items-center gap-3 hover:text-white transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-[#A45A2A]">
                  <Phone className="w-4 h-4" />
                </div>
                <span>{LIMA_CONFIG.company.phone}</span>
              </a>
              <a
                href={LIMA_CONFIG.company.emailHref}
                className="flex items-center gap-3 hover:text-white transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-[#A45A2A]">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="truncate">{LIMA_CONFIG.company.email}</span>
              </a>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-[#A45A2A]">
                  <MapPin className="w-4 h-4" />
                </div>
                <span>{LIMA_CONFIG.company.address}</span>
              </div>
            </div>
            <div className="pt-2">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 bg-[#A45A2A] hover:bg-[#8B4A20] text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors"
              >
                <span>Free Consultation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Legal */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-white/60 gap-4">
          <div>
            &copy; {new Date().getFullYear()} {LIMA_CONFIG.company.legalName}. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Loveland &amp; Northern Colorado Exterior Specialists</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
