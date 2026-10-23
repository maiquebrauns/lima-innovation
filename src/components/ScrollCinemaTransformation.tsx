"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Sparkles, Layers, ShieldCheck } from "lucide-react";

export function ScrollCinemaTransformation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isReady, setIsReady] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    let duration = 0;
    let target = 0;
    let ticking = false;

    // Check if metadata is already loaded
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

    // Fallback if network is slow or video is cached
    const fallbackTimer = setTimeout(markReady, 3500);

    const apply = () => {
      ticking = false;
      if (duration > 0 && Number.isFinite(duration)) {
        // Fast seek bound to scroll
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
  }, []);

  // Compute thematic values from scroll progress (0 to 1)
  const pct = Math.round(progress * 100);

  let currentPhase = "PREPARATION & WEATHER-SEAL";
  if (pct > 66) {
    currentPhase = "FINISHED MASTERPIECE";
  } else if (pct > 33) {
    currentPhase = "SIDING & ACCENT INSTALLATION";
  }

  return (
    <div className="mt-20 pt-16 border-t border-neutral-200">
      {/* Header Info */}
      <div className="text-center max-w-3xl mx-auto mb-10 px-4">
        <span className="text-xs uppercase font-extrabold tracking-widest text-[#A45A2A] bg-[#A45A2A]/10 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#A45A2A]" />
          <span>CINEMATIC TRANSFORMATION</span>
        </span>
        <h3 className="text-3xl sm:text-5xl font-extrabold text-[#1F302B] mt-4 mb-3 tracking-tight">
          See the transformation
        </h3>
        <p className="text-neutral-600 text-base sm:text-lg">
          Scroll down to control the construction timeline in real-time.
        </p>
      </div>

      {/* High Scroll Runway (420vh) with Sticky 100vh viewport */}
      <div
        ref={containerRef}
        className="relative h-[420vh] w-full"
      >
        <div className="sticky top-0 h-screen w-full flex items-center justify-center p-3 sm:p-6 lg:p-8 overflow-hidden z-20">
          <div className="relative w-full max-w-5xl aspect-4/3 sm:aspect-16/10 rounded-3xl overflow-hidden shadow-2xl border border-neutral-200/80 bg-neutral-950 select-none">
            
            {/* Fallback / Poster Image */}
            <Image
              src="/assets/videos/transformation-poster.jpg"
              alt="Transformation poster frame"
              fill
              priority
              className={`object-cover object-center transition-opacity duration-700 pointer-events-none ${
                isReady ? "opacity-0" : "opacity-100"
              }`}
            />

            {/* Scroll Cinema Keyframe Video */}
            <video
              ref={videoRef}
              src="/assets/videos/transformation-keyint.mp4"
              muted
              playsInline
              preload="auto"
              className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 pointer-events-none ${
                isReady ? "opacity-100" : "opacity-0"
              }`}
            />

            {/* Subtle cinematic vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />

            {/* Top Corners: Phase tags */}
            <div className="absolute top-4 left-4 z-20 pointer-events-none">
              <span className="bg-black/60 backdrop-blur-md text-white text-[10px] sm:text-xs font-extrabold px-3 py-1.5 rounded-lg border border-white/15 tracking-wider uppercase shadow-md flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#A45A2A]" />
                <span>CONSTRUCTION</span>
              </span>
            </div>

            <div className="absolute top-4 right-4 z-20 pointer-events-none">
              <span className="bg-black/60 backdrop-blur-md text-white text-[10px] sm:text-xs font-extrabold px-3 py-1.5 rounded-lg border border-white/15 tracking-wider uppercase shadow-md flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>FINISHED</span>
              </span>
            </div>

            {/* Center Dynamic Scroll Timeline Bar */}
            <div className="absolute bottom-5 left-5 right-5 z-20 pointer-events-none flex flex-col gap-2">
              <div className="flex items-center justify-between text-white text-xs sm:text-sm font-bold drop-shadow-md">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#A45A2A] animate-pulse" />
                  <span className="tracking-wide text-white/95 uppercase text-[11px] sm:text-xs">
                    {currentPhase}
                  </span>
                </div>
                <span className="tabular-nums font-extrabold text-[#E5E1D8] text-xs sm:text-sm bg-black/40 px-2 py-0.5 rounded-md border border-white/10 backdrop-blur-xs">
                  {pct}%
                </span>
              </div>

              {/* Progress track */}
              <div className="h-1.5 sm:h-2 w-full bg-white/20 rounded-full overflow-hidden backdrop-blur-sm border border-white/10">
                <div
                  className="h-full bg-gradient-to-r from-[#A45A2A] via-[#C26F38] to-[#E5E1D8] rounded-full transition-all duration-75 ease-out"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>

            {/* Loading Indicator before video is cached */}
            {!isReady && (
              <div className="absolute inset-0 bg-[#08080a]/90 backdrop-blur-md flex flex-col items-center justify-center text-white z-30 transition-opacity duration-500">
                <div className="w-9 h-9 border-3 border-white/20 border-t-[#A45A2A] rounded-full animate-spin mb-3" />
                <span className="text-xs uppercase font-extrabold tracking-widest text-[#E5E1D8]">
                  Loading Cinematic Timeline...
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
