"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ServiceItem, LIMA_CONFIG } from "@/data/content";

interface SpatialGlassCard {
  id: string;
  step: number;
  trigger: number;
  activeRange: [number, number];
  tag: string;
  headline: string;
  subtitle: string;
  detail: string;
  positionClass: string;
}

interface ServiceDetailExperienceProps {
  service: ServiceItem;
}

export function ServiceDetailExperience({ service }: ServiceDetailExperienceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isReady, setIsReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeGalleryIdx, setActiveGalleryIdx] = useState<number>(0);

  const hasVideo = Boolean(service.videoUrl);

  // Reset state and scroll position instantly when switching service
  useEffect(() => {
    setIsReady(false);
    setProgress(0);
    setActiveGalleryIdx(0);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [service.id, service.videoUrl]);

  // Scroll synchronization for video
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
  }, [hasVideo, service.videoUrl]);

  // Spatial Glass Popups with organic, asymmetric placement across the scene
  const getSpatialCards = (): SpatialGlassCard[] => {
    switch (service.id) {
      case "siding":
        return [
          {
            id: "siding-1",
            step: 1,
            trigger: 0.08,
            activeRange: [0.08, 0.32],
            tag: "Substrate",
            headline: "Tear-off & Prep",
            subtitle: "Sheathing integrity",
            detail: "Removing decayed siding and repairing substrate to create an even, sturdy base.",
            positionClass: "top-[12%] left-[4%] sm:left-[6%]",
          },
          {
            id: "siding-2",
            step: 2,
            trigger: 0.32,
            activeRange: [0.32, 0.58],
            tag: "Weather Barrier",
            headline: "HardieWrap",
            subtitle: "Breathable shield",
            detail: "Continuous moisture and air barrier with taped flashing seams around all joints.",
            positionClass: "bottom-[16%] left-[8%] sm:left-[14%]",
          },
          {
            id: "siding-3",
            step: 3,
            trigger: 0.58,
            activeRange: [0.58, 0.82],
            tag: "Facade Cladding",
            headline: "Fiber Cement",
            subtitle: "Laser-aligned lap",
            detail: "Fastening fire-resistant and hail-rated siding panels with precision spacing.",
            positionClass: "top-[16%] right-[5%] sm:right-[8%]",
          },
          {
            id: "siding-4",
            step: 4,
            trigger: 0.82,
            activeRange: [0.82, 1.0],
            tag: "Trim & Detailing",
            headline: "Mitered Corners",
            subtitle: "Natural cedar trim",
            detail: "Precision-cut corner trim, elastomeric architectural sealants, and UV-cured finish.",
            positionClass: "bottom-[26%] right-[18%] sm:right-[24%]",
          },
        ];

      case "doors":
        return [
          {
            id: "doors-1",
            step: 1,
            trigger: 0.08,
            activeRange: [0.08, 0.32],
            tag: "Structural Frame",
            headline: "Laser Plumb",
            subtitle: "Rough opening alignment",
            detail: "Laser-leveling studs, squaring tolerances & reinforcing upper load-bearing header.",
            positionClass: "top-[12%] left-[4%] sm:left-[6%]",
          },
          {
            id: "doors-2",
            step: 2,
            trigger: 0.32,
            activeRange: [0.32, 0.58],
            tag: "Thermal Defense",
            headline: "Thermal Break",
            subtitle: "Insulated sill & jamb",
            detail: "Heavy-duty threshold pan bedded with vapor barrier to stop subfloor thermal bridge.",
            positionClass: "bottom-[15%] right-[20%] sm:right-[26%]",
          },
          {
            id: "doors-3",
            step: 3,
            trigger: 0.58,
            activeRange: [0.58, 0.82],
            tag: "Artisan Fit",
            headline: "Dual Entry Slabs",
            subtitle: "Ball-bearing hinges",
            detail: "Mounting custom architectural door slabs with multi-point deadbolt security locks.",
            positionClass: "top-[20%] right-[5%] sm:right-[7%]",
          },
          {
            id: "doors-4",
            step: 4,
            trigger: 0.82,
            activeRange: [0.82, 1.0],
            tag: "Weatherproofing",
            headline: "Airtight Seal",
            subtitle: "Magnetic compression",
            detail: "Finished architectural casing, low-expansion foam seal, and weather-tight trim.",
            positionClass: "bottom-[24%] left-[8%] sm:left-[14%]",
          },
        ];

      case "windows":
        return [
          {
            id: "win-1",
            step: 1,
            trigger: 0.08,
            activeRange: [0.08, 0.32],
            tag: "Multi-Story Staging",
            headline: "Scaffolding & Prep",
            subtitle: "Rough masonry openings",
            detail: "Erecting structural staging and laser-plumbing stone masonry rough openings for multi-level glass.",
            positionClass: "top-[12%] left-[4%] sm:left-[6%]",
          },
          {
            id: "win-2",
            step: 2,
            trigger: 0.32,
            activeRange: [0.32, 0.58],
            tag: "Structural Anchoring",
            headline: "Thermal Framing",
            subtitle: "Heavy composite frames",
            detail: "Anchoring reinforced composite frames into natural stone masonry with precision sill flashing.",
            positionClass: "bottom-[16%] left-[8%] sm:left-[14%]",
          },
          {
            id: "win-3",
            step: 3,
            trigger: 0.58,
            activeRange: [0.58, 0.82],
            tag: "High-Altitude Glazing",
            headline: "Low-E Triple Pane",
            subtitle: "Argon gas thermal shield",
            detail: "Setting massive multi-story glass panels engineered to reflect high-altitude UV radiation.",
            positionClass: "top-[16%] right-[5%] sm:right-[8%]",
          },
          {
            id: "win-4",
            step: 4,
            trigger: 0.82,
            activeRange: [0.82, 1.0],
            tag: "Envelope Defense",
            headline: "Airtight Seal",
            subtitle: "Closed-cell foam & sealants",
            detail: "Injecting expanding thermal foam barrier and applying elastomeric sealants across all stone joints.",
            positionClass: "bottom-[26%] right-[18%] sm:right-[24%]",
          },
        ];

      case "decks":
      default:
        return [
          {
            id: "decks-1",
            step: 1,
            trigger: 0.08,
            activeRange: [0.08, 0.32],
            tag: "Foundation",
            headline: "Helical Piers",
            subtitle: "Below frost line",
            detail: "Engineered steel helical footings driven deep to support heavy mountain snow loads.",
            positionClass: "top-[12%] left-[4%] sm:left-[6%]",
          },
          {
            id: "decks-2",
            step: 2,
            trigger: 0.32,
            activeRange: [0.32, 0.58],
            tag: "Framing",
            headline: "Glulam Beams",
            subtitle: "Heavy structural timber",
            detail: "Erecting load-bearing joists with powder-coated galvanized steel bracket ties.",
            positionClass: "bottom-[16%] left-[8%] sm:left-[14%]",
          },
          {
            id: "decks-3",
            step: 3,
            trigger: 0.58,
            activeRange: [0.58, 0.82],
            tag: "Planking",
            headline: "Composite Core",
            subtitle: "Hidden fastener clips",
            detail: "Concealed stainless steel clips for a seamless, barefoot-safe, splinter-free deck.",
            positionClass: "top-[16%] right-[5%] sm:right-[8%]",
          },
          {
            id: "decks-4",
            step: 4,
            trigger: 0.82,
            activeRange: [0.82, 1.0],
            tag: "Balusters & Light",
            headline: "Cable Railing",
            subtitle: "Integrated LEDs",
            detail: "Slimline black aluminum balusters with subtle low-voltage recessed step illumination.",
            positionClass: "bottom-[26%] right-[18%] sm:right-[24%]",
          },
        ];
    }
  };

  const spatialCards = getSpatialCards();

  return (
    <div className="bg-[#0a0f0d] text-white min-h-screen">
      {/* 1. TOP STICKY BAR WITH SERVICES SWITCHER */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#0a0f0d]/85 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 py-3.5 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white text-xs sm:text-sm font-bold bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full border border-white/10 transition-all group shrink-0"
          >
            <ArrowLeft className="w-4 h-4 text-[#A45A2A] group-hover:-translate-x-1 transition-transform" />
            <span>Home</span>
          </Link>

          {/* Service Tabs */}
          <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-1">
            {LIMA_CONFIG.services.map((item) => {
              const isActive = item.id === service.id;
              return (
                <Link
                  key={item.id}
                  href={`/services/${item.id}`}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? "bg-white text-[#1F302B] font-bold shadow-sm"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {item.title}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. FULLSCREEN SCROLL-CONTROLLED VIDEO WITH FLOATING GLASS POPUPS (NO FOOTER/BAR OVERLAY INSIDE) */}
      {hasVideo ? (
        <section ref={containerRef} className="relative h-[480vh] w-full bg-black">
          {/* Sticky 100vh Fullscreen Container */}
          <div className="sticky top-0 h-screen w-full overflow-hidden select-none">
            
            {/* FULL BLEED BACKGROUND VIDEO */}
            <div className="absolute inset-0 w-full h-full bg-black">
              {/* Scroll-synced Fullscreen Video with native poster */}
              <video
                key={`video-${service.id}-${service.videoUrl}`}
                ref={videoRef}
                src={service.videoUrl}
                poster={service.videoPoster}
                muted
                playsInline
                preload="auto"
                aria-label={`${service.title} - scroll-controlled footage`}
                className="w-full h-full object-cover object-center pointer-events-none bg-black"
              />

              {/* Subtle ambient lighting layer */}
              <div className="absolute inset-0 bg-black/10 pointer-events-none" />
            </div>

            {/* FLOATING SPATIAL GLASS CARDS OVER THE VIDEO (SPACED ORGANICALLY) */}
            <div className="absolute inset-0 pointer-events-none max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {spatialCards.map((card) => {
                const isRevealed = progress >= card.trigger;
                const isActive = progress >= card.activeRange[0] && progress < card.activeRange[1];

                return (
                  <div
                    key={card.id}
                    className={`absolute ${card.positionClass} transition-all duration-700 ease-out z-30 pointer-events-auto ${
                      isRevealed
                        ? "opacity-100 translate-y-0 scale-100"
                        : "opacity-0 translate-y-6 scale-90 pointer-events-none"
                    }`}
                  >
                    {/* Liquid Glass Card Container matching reference */}
                    <div
                      className={`relative rounded-3xl p-5 sm:p-6 backdrop-blur-2xl transition-all duration-500 max-w-[270px] sm:max-w-[320px] shadow-[0_16px_40px_rgba(0,0,0,0.55)] border ${
                        isActive
                          ? "bg-black/60 border-white/35 ring-2 ring-[#A45A2A]/50 shadow-[0_20px_50px_rgba(164,90,42,0.25)]"
                          : "bg-black/40 border-white/20 hover:border-white/30"
                      }`}
                    >
                      {/* Top tag & pulse pin */}
                      <div className="flex items-center justify-between gap-3 mb-2">
                        <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.16em] text-white/70 font-semibold flex items-center gap-2">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              isActive ? "bg-[#A45A2A] animate-ping" : "bg-white/40"
                            }`}
                          />
                          <span>{card.tag}</span>
                        </span>

                        <span className="text-[10px] font-mono text-white/50 bg-white/10 px-2 py-0.5 rounded-full">
                          0{card.step}
                        </span>
                      </div>

                      {/* Large Headline/Metric like in reference */}
                      <div className="mt-1 mb-1">
                        <h4 className="text-2xl sm:text-3xl font-light text-white tracking-tight leading-tight">
                          {card.headline}
                        </h4>
                        <p className="text-xs font-medium text-white/75 mt-0.5">
                          {card.subtitle}
                        </p>
                      </div>

                      {/* Detail description */}
                      <p className="text-xs text-white/70 leading-relaxed mt-2.5 pt-2.5 border-t border-white/10">
                        {card.detail}
                      </p>

                      {/* Subtle Glass Reflection Curve */}
                      <div className="absolute inset-x-4 bottom-2 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </section>
      ) : (
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
          <Image
            src={service.image}
            alt={service.altText}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center brightness-45"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f0d] via-[#0a0f0d]/60 to-transparent" />
          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center py-20">
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#A45A2A] bg-white/10 px-3.5 py-1.5 rounded-full border border-white/15 inline-block mb-4">
              {service.categoryTag}
            </span>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-4">
              {service.title}
            </h1>
            <p className="text-white/80 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              {service.shortDesc}
            </p>
          </div>
        </section>
      )}

      {/* 3. OUR LATEST CREATIONS ACCORDION GALLERY */}
      <section className="w-full flex flex-col items-center justify-start py-16 sm:py-24 bg-[#14211D] border-t border-white/10 overflow-hidden">
        <div className="max-w-3xl text-center px-4">
          <div className="inline-flex items-center gap-2 text-[#A45A2A] text-xs uppercase font-extrabold tracking-widest mb-3">
            <span className="w-2 h-2 rounded-full bg-[#A45A2A]" />
            <span>{service.title} Portfolio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Our Latest Creations
          </h2>
          <p className="text-sm sm:text-base text-white/70 mt-3 max-w-xl mx-auto leading-relaxed">
            A visual collection of our most recent works – each piece crafted with intention, emotion, and style.
          </p>
        </div>

        {/* Horizontal Expandable Gallery */}
        <div className="flex items-center gap-2 sm:gap-3 h-[420px] sm:h-[480px] w-full max-w-6xl mt-10 px-4 sm:px-6">
          {(service.gallery && service.gallery.length > 0
            ? service.gallery
            : [service.image]
          ).map((src, idx) => {
            const isActive = activeGalleryIdx === idx;
            return (
              <div
                key={idx}
                onMouseEnter={() => setActiveGalleryIdx(idx)}
                onClick={() => setActiveGalleryIdx(idx)}
                className={`relative group transition-all duration-500 ease-out h-[400px] sm:h-[480px] rounded-2xl overflow-hidden cursor-pointer border border-white/10 shadow-2xl ${
                  isActive
                    ? "flex-[5] sm:flex-[6] min-w-[120px] sm:min-w-[280px] opacity-100 ring-1 ring-white/20"
                    : "flex-1 min-w-[42px] sm:min-w-[64px] lg:min-w-[76px] opacity-75 hover:opacity-100"
                }`}
              >
                <Image
                  src={src}
                  alt={`${service.title} project showcase ${idx + 1}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  priority={idx === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
