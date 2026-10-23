"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { ServiceItem, LIMA_CONFIG, SERVICE_GALLERY_IMAGES, ALL_PROJECT_GALLERY_IMAGES } from "@/data/content";
import { CleanServiceQuoteForm } from "@/components/CleanServiceQuoteForm";

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
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isProgrammaticScroll = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const galleryItems =
    SERVICE_GALLERY_IMAGES[service.id] ||
    ALL_PROJECT_GALLERY_IMAGES.slice(0, 6);

  const handleCardSelect = (idx: number) => {
    setActiveGalleryIdx(idx);
    const cardEl = cardRefs.current[idx];
    const container = scrollContainerRef.current;
    if (cardEl && container) {
      isProgrammaticScroll.current = true;
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

      const cardLeft = cardEl.offsetLeft;
      const cardWidth = cardEl.offsetWidth;
      const containerWidth = container.offsetWidth;
      const targetScroll = cardLeft - containerWidth / 2 + cardWidth / 2;

      container.scrollTo({
        left: Math.max(0, targetScroll),
        behavior: "smooth",
      });

      scrollTimeoutRef.current = setTimeout(() => {
        isProgrammaticScroll.current = false;
      }, 450);
    }
  };

  // Real-time synchronization when swiping / scrolling natively (no click required on mobile)
  const handleGalleryScroll = () => {
    if (isProgrammaticScroll.current) return;
    const container = scrollContainerRef.current;
    if (!container) return;

    const containerCenter = container.scrollLeft + container.offsetWidth / 2;
    let closestIdx = 0;
    let minDistance = Infinity;

    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      const elCenter = el.offsetLeft + el.offsetWidth / 2;
      const dist = Math.abs(containerCenter - elCenter);
      if (dist < minDistance) {
        minDistance = dist;
        closestIdx = i;
      }
    });

    if (closestIdx !== activeGalleryIdx) {
      setActiveGalleryIdx(closestIdx);
    }
  };

  const handlePrev = () => {
    const nextIdx =
      (activeGalleryIdx - 1 + galleryItems.length) % galleryItems.length;
    handleCardSelect(nextIdx);
  };

  const handleNext = () => {
    const nextIdx = (activeGalleryIdx + 1) % galleryItems.length;
    handleCardSelect(nextIdx);
  };

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
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#0a0f0d]/90 backdrop-blur-xl border-b border-white/10 px-3 sm:px-8 pt-[max(0.75rem,env(safe-area-inset-top))] pb-2.5 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 sm:gap-2 text-white/80 hover:text-white text-xs sm:text-sm font-bold bg-white/5 hover:bg-white/10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/10 transition-all group shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#A45A2A] group-hover:-translate-x-1 transition-transform" />
            <span>Home</span>
          </Link>

          {/* Service Tabs */}
          <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar py-0.5">
            {LIMA_CONFIG.services.map((item) => {
              const isActive = item.id === service.id;
              return (
                <Link
                  key={item.id}
                  href={`/services/${item.id}`}
                  className={`px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-mono uppercase tracking-wider transition-all duration-200 whitespace-nowrap shrink-0 ${
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

            {/* =========================================================
                MOBILE VIEW: DEDICATED DOCKED STEP CARD (ZERO OVERLAPPING)
               ========================================================= */}
            <div className="block sm:hidden absolute bottom-5 inset-x-3.5 z-30 pointer-events-auto">
              {(() => {
                const currentIdx = spatialCards.findIndex(
                  (c) => progress >= c.activeRange[0] && progress < c.activeRange[1]
                );
                const activeIdx =
                  currentIdx !== -1
                    ? currentIdx
                    : progress < spatialCards[0].activeRange[0]
                    ? 0
                    : spatialCards.length - 1;
                const activeCard = spatialCards[activeIdx];

                return (
                  <div className="relative rounded-2xl p-4 bg-black/85 backdrop-blur-2xl border border-white/20 shadow-[0_16px_40px_rgba(0,0,0,0.7)] transition-all duration-300">
                    {/* Top Segmented Step Indicator */}
                    <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-white/10">
                      <div className="flex items-center gap-1.5 flex-1">
                        {spatialCards.map((c, i) => (
                          <div
                            key={c.id}
                            className={`h-1.5 rounded-full transition-all duration-300 flex-1 ${
                              i === activeIdx
                                ? "bg-[#A45A2A]"
                                : i < activeIdx
                                ? "bg-white/40"
                                : "bg-white/15"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-[10px] font-mono font-bold text-[#D48B55] bg-white/5 px-2 py-0.5 rounded-md border border-white/10 shrink-0">
                        Step 0{activeCard.step} / 0{spatialCards.length}
                      </span>
                    </div>

                    {/* Step Tag */}
                    <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-white/70 font-semibold block">
                      {activeCard.tag}
                    </span>

                    {/* Headline & Subtitle */}
                    <h4 className="text-xl font-medium text-white tracking-tight mt-0.5 leading-tight">
                      {activeCard.headline}
                    </h4>
                    <p className="text-xs font-normal text-white/75 mt-0.5">
                      {activeCard.subtitle}
                    </p>

                    {/* Detail Description */}
                    <p className="text-xs text-white/70 leading-relaxed mt-2 pt-2 border-t border-white/10">
                      {activeCard.detail}
                    </p>
                  </div>
                );
              })()}
            </div>

            {/* =========================================================
                DESKTOP VIEW: SPATIAL HUD CARDS ACROSS THE 4 CORNERS
               ========================================================= */}
            <div className="hidden sm:block absolute inset-0 pointer-events-none max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

      {/* 3. OUR LATEST CREATIONS ACCORDION GALLERY - ALL REAL PROJECTS */}
      <section className="w-full flex flex-col items-center justify-start pt-14 pb-16 sm:py-24 bg-[#14211D] border-t border-white/10 overflow-hidden">
        <div className="max-w-3xl text-center px-4">
          <div className="inline-flex items-center gap-2 text-[#A45A2A] text-xs uppercase font-extrabold tracking-widest mb-3">
            <span className="w-2 h-2 rounded-full bg-[#A45A2A]" />
            <span>Featured Craftsmanship</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Our Latest Creations
          </h2>
          <p className="text-sm sm:text-base text-white/70 mt-3 max-w-xl mx-auto leading-relaxed">
            A visual collection of our most recent works – each piece crafted with intention, emotion, and style.
          </p>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous project"
              className="w-10 h-10 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 hover:border-white/30 transition-all active:scale-95 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-xs font-mono text-white/90 bg-white/5 px-4 py-1.5 rounded-full border border-white/10 tracking-widest font-semibold">
              {String(activeGalleryIdx + 1).padStart(2, "0")} /{" "}
              {String(galleryItems.length).padStart(2, "0")}
            </span>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next project"
              className="w-10 h-10 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 hover:border-white/30 transition-all active:scale-95 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Card Carousel */}
        <div
          ref={scrollContainerRef}
          onScroll={handleGalleryScroll}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          className="flex items-center gap-4 sm:gap-6 h-[440px] sm:h-[500px] w-full max-w-7xl mt-8 px-4 sm:px-8 overflow-x-auto overflow-y-hidden no-scrollbar [&::-webkit-scrollbar]:hidden scroll-smooth select-none snap-x snap-mandatory"
        >
          {galleryItems.map((item, idx) => {
            const isActive = activeGalleryIdx === idx;
            return (
              <div
                key={item.id}
                ref={(el) => {
                  cardRefs.current[idx] = el;
                }}
                onClick={() => handleCardSelect(idx)}
                className={`relative group transition-all duration-300 ease-out h-[390px] sm:h-[460px] w-[84vw] max-w-[340px] sm:w-[380px] lg:w-[410px] sm:max-w-none rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer shrink-0 snap-center ${
                  isActive
                    ? "ring-2 ring-[#A45A2A] shadow-[0_24px_50px_rgba(0,0,0,0.7)] scale-[1.01] opacity-100"
                    : "border border-white/10 opacity-75 hover:opacity-100 hover:scale-[1.01]"
                }`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 85vw, (max-width: 1024px) 400px, 420px"
                  className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  priority={idx === 0}
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none" />

                {/* Index Pill at Top */}
                <div className="absolute top-4 left-4 font-mono text-[10px] text-white/90 bg-black/50 px-2.5 py-1 rounded-md border border-white/15 backdrop-blur-md pointer-events-none flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-[#D48B55]" : "bg-white/40"}`} />
                  <span>{String(idx + 1).padStart(2, "0")}</span>
                </div>

                {/* Card Details Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 flex flex-col justify-end pointer-events-none transition-all duration-300">
                  <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.16em] text-[#D48B55] font-bold leading-normal block">
                    {item.tag} • {item.location}
                  </span>
                  <h4 className="text-base sm:text-lg font-bold text-white tracking-tight mt-1 leading-snug line-clamp-2">
                    {item.title}
                  </h4>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dot Pagination Below */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {galleryItems.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleCardSelect(i)}
              aria-label={`Go to project ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                i === activeGalleryIdx
                  ? "w-8 bg-[#A45A2A]"
                  : "w-2 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </section>

      {/* 4. CLEAN REDUCED QUOTE FORM SECTION */}
      <CleanServiceQuoteForm serviceId={service.id} serviceTitle={service.title} />
    </div>
  );
}
