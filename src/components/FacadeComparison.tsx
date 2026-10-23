"use client";

import React, { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { MoveHorizontal } from "lucide-react";

export function FacadeComparison() {
  // Slider position from 0 (0% - Construction) to 100 (100% - Finished)
  const [position, setPosition] = useState<number>(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef<boolean>(false);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const rawX = clientX - rect.left;
    const clampedPercentage = Math.max(0, Math.min(100, (rawX / rect.width) * 100));
    setPosition(clampedPercentage);
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    updatePosition(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = false;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // In case pointer capture was already released
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      setPosition((prev) => Math.max(0, prev - 2));
    } else if (e.key === "ArrowRight") {
      setPosition((prev) => Math.min(100, prev + 2));
    } else if (e.key === "Home") {
      setPosition(0);
    } else if (e.key === "End") {
      setPosition(100);
    }
  };

  return (
    <div className="mt-20 pt-16 border-t border-neutral-200">
      {/* Header Info */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="text-xs uppercase font-extrabold tracking-widest text-[#A45A2A] bg-[#A45A2A]/10 px-3.5 py-1.5 rounded-full inline-block">
          PROJECT TRANSFORMATION
        </span>
        <h3 className="text-3xl sm:text-4xl font-extrabold text-[#1F302B] mt-4 mb-3 tracking-tight">
          See the transformation
        </h3>
        <p className="text-neutral-600 text-base sm:text-lg">
          Drag the slider to see how this project evolved from construction to completion.
        </p>
      </div>

      {/* Interactive 3-Stage Comparison Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div
          ref={containerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          tabIndex={0}
          role="slider"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(position)}
          aria-label="3-Stage Construction Progress Slider"
          onKeyDown={handleKeyDown}
          className="relative w-full aspect-4/3 sm:aspect-16/10 rounded-3xl overflow-hidden shadow-2xl border border-neutral-200/80 bg-neutral-900 select-none touch-none cursor-ew-resize focus:outline-none focus:ring-4 focus:ring-[#A45A2A]/30"
        >
          {/* STAGE 1 (BASE): CONSTRUCTION (fachada-3.jpg) */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="/images/fachada-3.jpg"
              alt="Construction stage - exposed OSB and purple insulation foam"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover object-center pointer-events-none select-none"
            />
          </div>

          {/* STAGE 2: INSTALLATION (fachada-1.jpg)
              Revealed progressively as slider goes from 0% to 50% */}
          <div
            className="absolute inset-0 w-full h-full pointer-events-none will-change-[clip-path]"
            style={{
              clipPath:
                position <= 50
                  ? `inset(0 calc(100% - ${position * 2}%) 0 0)`
                  : "inset(0 0 0 0)",
            }}
          >
            <Image
              src="/images/fachada-1.jpg"
              alt="Installation stage - weather resistant HardieWrap barrier installed"
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover object-center pointer-events-none select-none"
            />
          </div>

          {/* STAGE 3: FINISHED (fachada-2.jpg)
              Revealed progressively as slider goes from 50% to 100% */}
          <div
            className="absolute inset-0 w-full h-full pointer-events-none will-change-[clip-path]"
            style={{
              clipPath:
                position <= 50
                  ? "inset(0 100% 0 0)"
                  : `inset(0 calc(100% - ${(position - 50) * 2}%) 0 0)`,
            }}
          >
            <Image
              src="/images/fachada-2.jpg"
              alt="Finished stage - modern siding installed and completed"
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover object-center pointer-events-none select-none"
            />
          </div>

          {/* Static Corner Stage Labels */}
          <div className="absolute top-4 left-4 z-20 pointer-events-none">
            <span className="bg-black/60 backdrop-blur-md text-white text-[11px] sm:text-xs font-extrabold px-3 py-1.5 rounded-lg border border-white/15 tracking-wider uppercase shadow-md">
              CONSTRUCTION
            </span>
          </div>

          <div className="absolute top-4 right-4 z-20 pointer-events-none">
            <span className="bg-black/60 backdrop-blur-md text-white text-[11px] sm:text-xs font-extrabold px-3 py-1.5 rounded-lg border border-white/15 tracking-wider uppercase shadow-md">
              FINISHED
            </span>
          </div>

          {/* Divider Line */}
          <div
            className="absolute top-0 bottom-0 z-30 pointer-events-none will-change-[left]"
            style={{ left: `${position}%` }}
          >
            <div className="w-[2px] h-full bg-white shadow-[0_0_12px_rgba(0,0,0,0.6)] -ml-[1px]" />
          </div>

          {/* Draggable Circle Handle */}
          <div
            className="absolute top-1/2 z-40 -translate-x-1/2 -translate-y-1/2 will-change-[left]"
            style={{ left: `${position}%` }}
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white text-[#1F302B] rounded-full flex items-center justify-center shadow-[0_8px_25px_rgba(0,0,0,0.35)] border-2 border-white hover:scale-110 active:scale-95 transition-transform duration-150 cursor-ew-resize">
              <MoveHorizontal className="w-5 h-5 sm:w-6 sm:h-6 text-[#A45A2A]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
