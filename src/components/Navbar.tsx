"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X, Phone, ArrowRight } from "lucide-react";
import { LIMA_CONFIG } from "@/data/content";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      if (isHome) {
        // Na Home, só exibe a barra fixa quando o usuário passar do Hero e chegar na segunda seção (#projects)
        const projectsEl = document.getElementById("projects");
        if (projectsEl) {
          const rect = projectsEl.getBoundingClientRect();
          setIsScrolled(rect.top <= 80);
        } else {
          setIsScrolled(window.scrollY > window.innerHeight * 2.5);
        }
      } else {
        setIsScrolled(window.scrollY > 40);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  // Handle smooth scroll for all hash links (#contact, #quote, #projects, etc.)
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (!href) return;

      // Handle both "#hash" and "/#hash" when currently on home page
      const isHashLink = href.startsWith("#") || (href.startsWith("/#") && pathname === "/");
      if (isHashLink) {
        const hash = href.replace(/^\/?#/, "");
        const element = document.getElementById(hash);
        if (element) {
          e.preventDefault();
          element.scrollIntoView({ behavior: "smooth" });
          window.history.pushState(null, "", `#${hash}`);
          setMobileMenuOpen(false);
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, [pathname]);

  // Handle incoming hash when navigating to home page from other routes
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const hash = window.location.hash.replace("#", "");
      const timer = setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  const isSolid = !isHome || isScrolled;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
          isHome && !isScrolled
            ? "opacity-0 pointer-events-none -translate-y-4"
            : isSolid
            ? "bg-white/95 backdrop-blur-md shadow-md py-3 text-neutral-900 border-b border-neutral-100 opacity-100 translate-y-0"
            : "bg-transparent py-5 text-white opacity-100 translate-y-0"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 group focus:outline-none"
              aria-label="Lima Innovations LLC Home"
            >
              <div
                className={`p-1.5 rounded-lg transition-colors ${
                  isSolid ? "text-[#1F302B] group-hover:text-[#A45A2A]" : "text-white"
                }`}
              >
                <svg
                  className="w-8 h-8 transform transition-transform group-hover:scale-105"
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
              </div>
              <div className="flex flex-col">
                <span
                  className={`text-xl font-extrabold tracking-wider leading-none transition-colors ${
                    isSolid ? "text-[#1F302B]" : "text-white"
                  }`}
                >
                  LIMA
                </span>
                <span
                  className={`text-[10px] font-semibold tracking-widest leading-none mt-1 transition-colors ${
                    isSolid ? "text-neutral-500" : "text-white/80"
                  }`}
                >
                  INNOVATIONS LLC
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
              <Link
                href="/"
                className={`px-3.5 py-2 rounded-md text-sm font-semibold transition-colors ${
                  pathname === "/"
                    ? isSolid ? "text-[#A45A2A]" : "text-white font-bold"
                    : isSolid
                    ? "text-neutral-700 hover:text-[#A45A2A] hover:bg-neutral-50"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                }`}
              >
                Home
              </Link>

              {/* Services Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <button
                  type="button"
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-md text-sm font-semibold transition-colors focus:outline-none ${
                    pathname.startsWith("/services")
                      ? isSolid ? "text-[#A45A2A]" : "text-white font-bold"
                      : isSolid
                      ? "text-neutral-700 hover:text-[#A45A2A] hover:bg-neutral-50"
                      : "text-white/90 hover:text-white hover:bg-white/10"
                  }`}
                >
                  Services
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu Container */}
                <div
                  className={`absolute left-0 w-64 pt-3 transition-all duration-200 ${
                    dropdownOpen
                      ? "opacity-100 visible translate-y-0"
                      : "opacity-0 invisible -translate-y-2 pointer-events-none"
                  }`}
                >
                  <div className="bg-white rounded-xl shadow-xl border border-neutral-100 p-2 space-y-1 ring-1 ring-black/5">
                    {LIMA_CONFIG.services.map((service) => (
                      <Link
                        key={service.id}
                        href={`/services/${service.id}`}
                        className="flex flex-col px-3.5 py-2.5 rounded-lg text-sm transition-colors hover:bg-neutral-50 group"
                      >
                        <span className="font-semibold text-neutral-900 group-hover:text-[#A45A2A]">
                          {service.title}
                        </span>
                        <span className="text-xs text-neutral-500 line-clamp-1">
                          {service.categoryTag}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <Link
                href="/#projects"
                className={`px-3.5 py-2 rounded-md text-sm font-semibold transition-colors ${
                  isSolid
                    ? "text-neutral-700 hover:text-[#A45A2A] hover:bg-neutral-50"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                }`}
              >
                Projects
              </Link>
              <Link
                href="/#service-area"
                className={`px-3.5 py-2 rounded-md text-sm font-semibold transition-colors ${
                  isSolid
                    ? "text-neutral-700 hover:text-[#A45A2A] hover:bg-neutral-50"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                }`}
              >
                Service Area
              </Link>
              <Link
                href="/#contact"
                className={`px-3.5 py-2 rounded-md text-sm font-semibold transition-colors ${
                  isSolid
                    ? "text-neutral-700 hover:text-[#A45A2A] hover:bg-neutral-50"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                }`}
              >
                Contact
              </Link>
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-4">
              <a
                href={LIMA_CONFIG.company.phoneHref}
                className={`flex items-center gap-2 text-sm font-bold transition-colors ${
                  isSolid ? "text-[#1F302B] hover:text-[#A45A2A]" : "text-white hover:text-white/80"
                }`}
              >
                <Phone className="w-4 h-4 text-[#A45A2A]" />
                <span>{LIMA_CONFIG.company.phone}</span>
              </a>
              <Link
                href="/#quote"
                className="bg-[#A45A2A] hover:bg-[#8B4A20] text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow flex items-center gap-2"
              >
                <span>Free Quote</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-2">
              <a
                href={LIMA_CONFIG.company.phoneHref}
                aria-label="Call Lima Innovations"
                className={`p-2 rounded-lg transition-colors ${
                  isSolid ? "text-[#A45A2A] hover:bg-neutral-100" : "text-white hover:bg-white/10"
                }`}
              >
                <Phone className="w-5 h-5" />
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-2 rounded-lg transition-colors ${
                  isSolid ? "text-neutral-800 hover:bg-neutral-100" : "text-white hover:bg-white/10"
                }`}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 md:hidden transition-opacity duration-300 ${
          mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileMenuOpen(false)}
      >
        <div
          className={`fixed top-0 right-0 bottom-0 w-5/6 max-w-sm bg-white shadow-2xl z-50 flex flex-col transition-transform duration-300 ease-out transform ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Mobile Drawer Header */}
          <div className="p-5 flex items-center justify-between border-b border-neutral-100">
            <div className="flex items-center gap-2">
              <div className="text-[#1F302B]">
                <svg
                  className="w-6 h-6"
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
              </div>
              <span className="font-extrabold text-[#1F302B] text-base tracking-wide">
                LIMA INNOVATIONS
              </span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-neutral-400 hover:text-neutral-700 rounded-lg hover:bg-neutral-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Navigation Links */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-bold text-neutral-800 hover:text-[#A45A2A]"
            >
              Home
            </Link>

            <div className="space-y-2">
              <span className="text-xs uppercase tracking-wider font-bold text-neutral-400">
                Services
              </span>
              <div className="pl-3 space-y-2 border-l-2 border-neutral-100">
                {LIMA_CONFIG.services.map((service) => (
                  <Link
                    key={service.id}
                    href={`/services/${service.id}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-sm font-medium text-neutral-700 hover:text-[#A45A2A]"
                  >
                    • {service.title}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/#projects"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-bold text-neutral-800 hover:text-[#A45A2A]"
            >
              Projects
            </Link>
            <Link
              href="/#service-area"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-bold text-neutral-800 hover:text-[#A45A2A]"
            >
              Service Area
            </Link>
            <Link
              href="/#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-bold text-neutral-800 hover:text-[#A45A2A]"
            >
              Contact
            </Link>
          </div>

          {/* Mobile Drawer Footer CTA */}
          <div className="p-5 border-t border-neutral-100 space-y-3 bg-neutral-50">
            <Link
              href="/#quote"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full bg-[#A45A2A] hover:bg-[#8B4A20] text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 shadow"
            >
              <span>Get a Free Quote</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={LIMA_CONFIG.company.phoneHref}
              className="w-full bg-white border border-neutral-200 text-neutral-800 hover:bg-neutral-100 py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#A45A2A]" />
              <span>Call {LIMA_CONFIG.company.phone}</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
