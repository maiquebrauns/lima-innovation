"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { LIMA_CONFIG } from "@/data/content";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isReady, setIsReady] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    let duration = video.duration || 10;
    let isSeeking = false;
    let pendingTime: number | null = null;
    let targetTime = 0;
    let targetProgress = 0;
    let ticking = false;
    let isReadyFired = false;

    // 1. Core video seeker
    const setVideoTime = (time: number) => {
      const safeTime = Math.max(0.001, Math.min(duration - 0.05, time));
      if (isSeeking) {
        pendingTime = safeTime;
      } else {
        isSeeking = true;
        try {
          video.currentTime = safeTime;
        } catch {
          isSeeking = false;
        }
      }
    };

    const handleSeeked = () => {
      isSeeking = false;
      if (pendingTime !== null) {
        const nextTime = pendingTime;
        pendingTime = null;
        setVideoTime(nextTime);
      }
    };

    // 2. Render frame apply
    const apply = () => {
      ticking = false;
      if (duration > 0 && Number.isFinite(duration)) {
        setVideoTime(targetTime);
      }
      setProgress(targetProgress);
    };

    // 3. Scroll position calculator
    const onScroll = () => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const scrollable = container.offsetHeight - window.innerHeight;
      const p = scrollable > 0 ? -rect.top / scrollable : 0;
      targetProgress = Math.min(1, Math.max(0, p));
      targetTime = targetProgress * duration;

      if (document.hidden) {
        apply();
      } else if (!ticking) {
        ticking = true;
        requestAnimationFrame(apply);
      }
    };

    // 4. Ready state handler
    const markReady = () => {
      if (isReadyFired) return;
      isReadyFired = true;
      if (video.duration && Number.isFinite(video.duration)) {
        duration = video.duration;
      } else if (!duration) {
        duration = 10;
      }
      setIsReady(true);
      setVideoTime(0.001);
      onScroll();
    };

    const handleLoadedMetadata = () => {
      if (video.duration && Number.isFinite(video.duration)) {
        duration = video.duration;
      }
      markReady();
    };

    // 5. Register listeners
    video.addEventListener("seeked", handleSeeked);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("canplaythrough", markReady);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    const fallbackTimer = setTimeout(markReady, 1000);

    // 6. Safe immediate invocation after all helpers are initialized
    if (video.readyState >= 1) {
      handleLoadedMetadata();
    } else {
      onScroll();
    }

    return () => {
      clearTimeout(fallbackTimer);
      video.removeEventListener("seeked", handleSeeked);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("canplaythrough", markReady);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Scroll to projects section smoothly
  const scrollToProjects = () => {
    const el = document.getElementById("projects");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div ref={containerRef} className="relative h-[380vh] w-full bg-[#0a0f0d]">
      {/* Sticky Fullscreen Frame */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden z-20">
        
        {/* Full-bleed Background Video & Poster */}
        <div className="absolute inset-0 z-0 pointer-events-none bg-[#0a0f0d]">
          {/* Permanent high-res poster layer (ensures screen is NEVER black on mobile) */}
          <Image
            src="/assets/videos/hero-scroll-poster.jpg"
            alt="Lima Innovations Exterior Construction & Mountain Architecture"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />

          {/* Keyframe Video bound to scroll */}
          <video
            ref={videoRef}
            src="/assets/videos/hero-scroll-keyint.mp4"
            poster="/assets/videos/hero-scroll-poster.jpg"
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
            className={`w-full h-full object-cover object-center transition-opacity duration-700 bg-transparent ${
              isReady ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Vignette gradients for text legibility and clean borders */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f0d] via-black/35 to-black/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/30 to-transparent" />
        </div>

        {/* 1. TOP HEADER BAR: Logo pill + Nav menu pill + CTA pill + Sound toggle */}
        <header className="relative z-30 w-full px-4 sm:px-8 pt-5 sm:pt-6 flex items-center justify-between">
          {/* Left Brand Badge */}
          <Link
            href="/"
            className="flex items-center gap-2.5 bg-black/40 hover:bg-black/60 backdrop-blur-xl border border-white/15 px-3.5 py-2 rounded-full transition-all group"
          >
            <div className="w-7 h-7 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white shadow-xs group-hover:bg-white/20 transition-colors">
              <svg className="w-3.5 h-3.5" viewBox="0 0 40 32" fill="none" stroke="currentColor" strokeWidth="2.8">
                <path d="M4 26L16 8L24 18L30 10L38 26" />
                <path d="M12 26L16 20L20 26" />
              </svg>
            </div>
            <span className="text-white text-xs sm:text-sm font-extrabold tracking-wider pr-1">
              LIMA INNOVATIONS
            </span>
          </Link>

          {/* Right Floating Nav Pill */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <nav className="hidden md:flex items-center bg-black/45 backdrop-blur-xl border border-white/15 rounded-full px-4 py-1.5 text-xs font-semibold text-white/90 shadow-2xl">
              <Link href="#projects" className="px-3 py-1.5 hover:text-white transition-colors">
                Work
              </Link>
              <div className="group relative">
                <button
                  type="button"
                  className="px-3 py-1.5 flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
                >
                  <span>Services</span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-70" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-48 bg-[#14211D]/95 backdrop-blur-xl border border-white/15 rounded-2xl p-2 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  {LIMA_CONFIG.services.map((s) => (
                    <Link
                      key={s.id}
                      href={`/services/${s.id}`}
                      className="block px-3 py-2 rounded-xl text-xs font-bold text-white/90 hover:bg-white/10 hover:text-white transition-colors"
                    >
                      {s.title}
                    </Link>
                  ))}
                </div>
              </div>
              <Link href="#service-area" className="px-3 py-1.5 hover:text-white transition-colors">
                Colorado
              </Link>
              <Link href="#quote" className="px-3 py-1.5 hover:text-white transition-colors">
                Contact
              </Link>

              {/* Get a Quote Pill Button */}
              <Link
                href="#quote"
                className="ml-2 bg-white text-neutral-950 hover:bg-[#E5E1D8] font-bold px-4 py-1.5 rounded-full flex items-center gap-1.5 transition-all text-xs shadow-md"
              >
                <span>Free Quote</span>
                <div className="w-4 h-4 rounded-full bg-neutral-950 text-white flex items-center justify-center">
                  <ArrowUpRight className="w-2.5 h-2.5" />
                </div>
              </Link>
            </nav>
          </div>
        </header>

        {/* 2. MAIN HERO CONTENT: Aligned to the left edge with generous room */}
        <div className="relative z-30 w-full px-5 sm:px-10 lg:px-14 pb-12 sm:pb-16">
          <div className="max-w-2xl lg:max-w-3xl space-y-4 sm:space-y-5 text-left">
            
            {/* Location & Brand Pill (Hidden on mobile per user request) */}
            <div className="hidden sm:inline-flex items-center gap-2 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 text-xs font-semibold text-white/90">
              <span className="w-2 h-2 rounded-full bg-[#A45A2A] animate-pulse" />
              <span>Loveland &amp; Northern Colorado</span>
            </div>

            {/* Minimalist Editorial Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight leading-[1.08]">
              Where Exterior Craft <br />
              <span className="font-semibold text-white">Fuels Enduring Living</span>
            </h1>

            {/* Subtitle statement */}
            <p className="text-sm sm:text-base text-white/80 max-w-xl font-normal leading-relaxed">
              Living exteriors built to endure Colorado’s high-altitude climate. Precision windows, durable siding, and custom architectural woodwork designed for life.
            </p>

            {/* Action buttons (Riverine pill style) */}
            <div className="pt-3 sm:pt-4 flex flex-wrap items-center gap-4">
              <Link
                href="#quote"
                className="bg-white hover:bg-neutral-100 text-neutral-950 font-bold px-6 py-3 rounded-full flex items-center gap-2.5 transition-all text-xs sm:text-sm shadow-xl hover:scale-105"
              >
                <span>Shape your Exterior</span>
                <div className="w-5 h-5 rounded-full bg-neutral-950 text-white flex items-center justify-center">
                  <ArrowUpRight className="w-3 h-3" />
                </div>
              </Link>

              <button
                onClick={scrollToProjects}
                type="button"
                className="hidden sm:inline-flex text-white/90 hover:text-white font-medium text-xs sm:text-sm px-4 py-3 rounded-full hover:bg-white/10 transition-all cursor-pointer backdrop-blur-sm"
              >
                Discover the Craftsmanship &rarr;
              </button>
            </div>
          </div>
        </div>

        {/* 3. SCROLL INDICATOR: Minimal arrow on mobile, mouse on desktop */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
          {/* Mobile indicator: small arrow + tiny scroll text */}
          <div className="flex sm:hidden flex-col items-center gap-0.5">
            <span className="text-[9px] font-mono tracking-widest uppercase text-white/60 font-semibold">
              scroll
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-white/70 animate-bounce" />
          </div>

          {/* Desktop indicator: mouse icon + scroll text */}
          <div className="hidden sm:flex flex-col items-center gap-2">
            <div className="w-5 h-8.5 rounded-full border-2 border-white/40 flex items-start justify-center p-1 backdrop-blur-xs">
              <div className="w-1 h-2 bg-white/80 rounded-full animate-bounce" />
            </div>
            <span className="text-[10px] tracking-widest uppercase font-semibold text-white/50">
              Scroll
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
