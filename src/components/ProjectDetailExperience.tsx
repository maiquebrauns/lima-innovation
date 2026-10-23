"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CheckCircle2, ChevronDown, MapPin, Sparkles, ShieldCheck } from "lucide-react";
import { ProjectItem, LIMA_CONFIG } from "@/data/content";

interface ProjectDetailProps {
  project: ProjectItem;
}

export function ProjectDetailExperience({ project }: ProjectDetailProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isReady, setIsReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check reduced-motion preference
  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia) {
      setPrefersReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    }
  }, []);

  const hasVideo = Boolean(project.videoUrl);

  // Scroll synchronization for video-enabled projects
  useEffect(() => {
    if (!hasVideo) return;
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    let duration = 0;
    let target = 0;
    let ticking = false;

    if (video.readyState >= 1 && video.duration) {
      duration = video.duration;
    }

    const markReady = () => {
      duration = video.duration || duration || 10;
      setIsReady(true);
      onScroll();
    };

    const handleLoadedMetadata = () => {
      duration = video.duration || 10;
      markReady();
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("canplaythrough", markReady);
    const fallbackTimer = setTimeout(markReady, 3500);

    const apply = () => {
      ticking = false;
      if (duration > 0 && Number.isFinite(duration)) {
        // Direct seek without React state causing re-renders
        video.currentTime = target * duration;
      }
      setProgress(target);
    };

    const onScroll = () => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const scrollable = container.offsetHeight - window.innerHeight;
      const p = scrollable > 0 ? -rect.top / scrollable : 0;
      target = Math.min(1, Math.max(0, p));

      if (document.hidden) {
        apply();
      } else if (!ticking) {
        ticking = true;
        requestAnimationFrame(apply);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();

    return () => {
      clearTimeout(fallbackTimer);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("canplaythrough", markReady);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [hasVideo]);

  // Captions based on scroll milestones
  const captions = project.videoCaptions || [];
  const currentCaption = captions.find((c) => progress >= c.start && progress <= c.end)?.text || null;

  return (
    <div className="bg-[#14211D] text-white min-h-screen">
      {/* 1. TOP STICKY BREADCRUMB HEADER */}
      <div className="sticky top-0 z-40 bg-[#14211D]/90 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 py-4 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            href={`/#projects?category=${project.category}`}
            className="inline-flex items-center gap-2 text-white/80 hover:text-white text-xs sm:text-sm font-bold bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full border border-white/10 transition-all group"
          >
            <ArrowLeft className="w-4 h-4 text-[#A45A2A] group-hover:-translate-x-1 transition-transform" />
            <span>Back to Projects</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-block text-xs uppercase font-extrabold tracking-wider bg-[#1F302B] text-white px-3 py-1 rounded-full border border-white/15">
              {project.categoryLabel}
            </span>
            <span className="text-white/60 text-xs flex items-center gap-1 font-medium">
              <MapPin className="w-3.5 h-3.5 text-[#A45A2A]" />
              {project.location}
            </span>
          </div>
        </div>
      </div>

      {/* 2. MAIN VISUAL EXPERIENCE (SCROLL-CONTROLLED VIDEO OR ARCHITECTURAL HERO) */}
      {hasVideo ? (
        <section ref={containerRef} className="relative h-[480vh] w-full bg-[#0a0f0d]">
          {/* Sticky 100vh Viewport Container */}
          <div className="sticky top-0 h-screen w-full flex items-center justify-center p-3 sm:p-6 lg:p-8 overflow-hidden z-20">
            <div className="relative w-full max-w-6xl aspect-4/3 sm:aspect-16/9 rounded-3xl overflow-hidden shadow-2xl border border-white/15 bg-black select-none">
              
              {/* Fallback Poster */}
              {project.videoPoster && (
                <Image
                  src={project.videoPoster}
                  alt={`${project.title} - renovation poster frame`}
                  fill
                  priority
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  className={`object-cover object-center transition-opacity duration-700 pointer-events-none ${
                    isReady ? "opacity-0" : "opacity-100"
                  }`}
                />
              )}

              {/* Scroll-synced Renovation Video */}
              <video
                ref={videoRef}
                src={project.videoUrl}
                muted
                playsInline
                preload="auto"
                aria-label={`${project.title} - scroll-controlled renovation footage`}
                className={`w-full h-full object-cover object-center transition-opacity duration-700 pointer-events-none ${
                  isReady ? "opacity-100" : "opacity-0"
                }`}
              />

              {/* Elegant dark gradient vignettes */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/40 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* Top Meta Tags */}
              <div className="absolute top-4 left-4 right-4 z-30 pointer-events-none flex items-center justify-between">
                <span className="bg-black/60 backdrop-blur-md text-white text-[11px] sm:text-xs font-extrabold px-3.5 py-1.5 rounded-full border border-white/15 tracking-wider uppercase shadow-md flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#A45A2A]" />
                  <span>Interactive Renovation Reel</span>
                </span>
                <span className="bg-black/60 backdrop-blur-md text-white text-[11px] sm:text-xs font-bold px-3 py-1.5 rounded-full border border-white/15 shadow-md">
                  {Math.round(progress * 100)}%
                </span>
              </div>

              {/* STORYTELLING OVERLAY CAPTIONS (REVEALED AT SPECIFIC MILESTONES) */}
              <div className="absolute bottom-16 sm:bottom-20 left-6 sm:left-10 right-6 sm:right-10 z-30 pointer-events-none">
                <div className="max-w-xl">
                  {currentCaption ? (
                    <div className="inline-block bg-black/75 backdrop-blur-xl border border-white/20 p-4 sm:p-5 rounded-2xl shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-500">
                      <p className="text-white text-base sm:text-xl font-light tracking-wide leading-snug">
                        &ldquo;{currentCaption}&rdquo;
                      </p>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-[#A45A2A] mt-2 block">
                        Renovation Milestones
                      </span>
                    </div>
                  ) : null}
                </div>
              </div>

              {/* Progress timeline bar at bottom */}
              <div className="absolute bottom-4 left-6 right-6 z-30 pointer-events-none">
                <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
                  <div
                    className="h-full bg-gradient-to-r from-[#A45A2A] via-[#B86732] to-[#E5E1D8] rounded-full transition-all duration-75"
                    style={{ width: `${Math.round(progress * 100)}%` }}
                  />
                </div>
              </div>

              {/* Loading spinner overlay */}
              {!isReady && (
                <div className="absolute inset-0 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center text-white z-40 transition-opacity duration-500">
                  <div className="w-10 h-10 border-3 border-white/20 border-t-[#A45A2A] rounded-full animate-spin mb-3" />
                  <span className="text-xs uppercase font-extrabold tracking-widest text-[#E5E1D8]">
                    Loading Drone Footage &amp; Keyframes...
                  </span>
                </div>
              )}
            </div>

            {/* Scroll instruction indicator */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
              <div className="flex items-center gap-1.5 text-white/50 text-[11px] font-semibold tracking-widest uppercase">
                <span>Scroll down to advance facade</span>
                <ChevronDown className="w-3.5 h-3.5 animate-bounce text-white/70" />
              </div>
            </div>
          </div>
        </section>
      ) : (
        /* ARCHITECTURAL HERO FOR PROJECTS WITHOUT VIDEO */
        <section className="relative min-h-[60vh] sm:min-h-[70vh] flex items-center justify-center overflow-hidden">
          <Image
            src={project.image}
            alt={project.altText}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center brightness-45"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#14211D] via-[#14211D]/60 to-transparent" />
          
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center py-20">
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#A45A2A] bg-white/10 px-3.5 py-1.5 rounded-full border border-white/15 inline-block mb-4">
              {project.categoryLabel} Project Showcase
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-4">
              {project.title}
            </h1>
            <p className="text-white/80 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              {project.description}
            </p>
          </div>
        </section>
      )}

      {/* 3. EDITORIAL DETAILS, CRAFTSMANSHIP SPECS & PHOTO GALLERY */}
      <section className="py-20 bg-[#1F302B] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Story & Specifications */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-[#A45A2A] text-xs uppercase font-extrabold tracking-widest">
                <span className="w-2 h-2 rounded-full bg-[#A45A2A]" />
                <span>Craftsmanship &amp; Engineering</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Built for Colorado’s Climate. Finished with Precision.
              </h2>
              <p className="text-white/85 text-base sm:text-lg leading-relaxed font-normal">
                {project.longDescription || project.description}
              </p>

              {/* Engineering highlights */}
              {project.features && project.features.length > 0 && (
                <div className="pt-4 space-y-3">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#E5E1D8]">
                    Key Installation Highlights
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    {project.features.map((feat, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-xs"
                      >
                        <CheckCircle2 className="w-5 h-5 text-[#A45A2A] shrink-0 mt-0.5" />
                        <span className="text-sm text-white/90 font-medium">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Quality Guarantee badge */}
              <div className="pt-4 flex items-center gap-3 text-xs font-semibold text-white/60">
                <ShieldCheck className="w-4 h-4 text-[#A45A2A]" />
                <span>Licensed, Insured &amp; Engineered to Local Building Codes in Loveland, CO</span>
              </div>
            </div>

            {/* Sticky Action Card */}
            <div className="lg:col-span-5">
              <div className="bg-[#14211D] border border-white/15 p-8 rounded-3xl shadow-2xl space-y-6">
                <div>
                  <span className="text-xs font-bold text-[#A45A2A] uppercase tracking-wider block mb-1">
                    Ready for a similar transformation?
                  </span>
                  <h3 className="text-2xl font-extrabold text-white">
                    Start Your Project With Lima Innovations
                  </h3>
                  <p className="text-xs sm:text-sm text-white/70 mt-2 leading-relaxed">
                    Schedule a free on-site consultation in Loveland, Fort Collins, or anywhere in Northern Colorado.
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <Link
                    href={`/services/${project.category}`}
                    className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-3.5 px-6 rounded-xl border border-white/20 flex items-center justify-between transition-colors text-sm"
                  >
                    <span>Explore Our {project.categoryLabel} Services</span>
                    <ArrowUpRight className="w-4 h-4 text-[#A45A2A]" />
                  </Link>

                  <Link
                    href="/#quote"
                    className="w-full bg-[#A45A2A] hover:bg-[#8B4A20] text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors text-sm shadow-lg hover:shadow-xl"
                  >
                    <span>Request a Free Quote &rarr;</span>
                  </Link>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/60">
                  <span>Questions? Call Directly:</span>
                  <a
                    href={LIMA_CONFIG.company.phoneHref}
                    className="font-bold text-white hover:text-[#A45A2A] transition-colors"
                  >
                    {LIMA_CONFIG.company.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Photo Gallery */}
          {project.gallery && project.gallery.length > 0 && (
            <div className="mt-20 pt-16 border-t border-white/10">
              <div className="text-center max-w-2xl mx-auto mb-10">
                <span className="text-xs uppercase font-extrabold tracking-widest text-[#A45A2A]">
                  Project Gallery
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
                  Captured Perspectives
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {project.gallery.map((imgUrl, i) => (
                  <div
                    key={i}
                    className="relative aspect-4/3 rounded-2xl overflow-hidden border border-white/15 shadow-xl group"
                  >
                    <Image
                      src={imgUrl}
                      alt={`${project.title} detail perspective ${i + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
