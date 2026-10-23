"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import "maplibre-gl/dist/maplibre-gl.css";
import { Plus, Minus, RotateCcw, MapPin, Building2, CheckCircle2, Navigation, Compass } from "lucide-react";
import { LIMA_CONFIG } from "@/data/content";

// Geographic data for Northern Colorado service areas
export interface ServiceLocation {
  id: string;
  city: string;
  state: string;
  lat: number;
  lng: number;
  isPrimary: boolean;
  note: string;
  description: string;
  distanceFromHub: string;
  direction: string;
}

export const NORTHERN_COLORADO_LOCATIONS: ServiceLocation[] = [
  {
    id: "loveland",
    city: "Loveland",
    state: "CO",
    lat: 40.3978,
    lng: -105.0750,
    isPrimary: true,
    note: "Home Base & Primary Hub",
    description: "Corporate headquarters and primary staging facility for high-performance exterior installations.",
    distanceFromHub: "Central Hub",
    direction: "HQ",
  },
  {
    id: "fort-collins",
    city: "Fort Collins",
    state: "CO",
    lat: 40.5853,
    lng: -105.0844,
    isPrimary: false,
    note: "Full Service Area",
    description: "Full residential installation of custom windows, exterior doors, engineered siding, and decks.",
    distanceFromHub: "13 miles",
    direction: "North",
  },
  {
    id: "longmont",
    city: "Longmont",
    state: "CO",
    lat: 40.1672,
    lng: -105.1019,
    isPrimary: false,
    note: "Full Service Area",
    description: "Architectural exterior remodeling built for longevity against Colorado's dramatic seasonal shifts.",
    distanceFromHub: "16 miles",
    direction: "South",
  },
  {
    id: "windsor",
    city: "Windsor",
    state: "CO",
    lat: 40.4775,
    lng: -104.9014,
    isPrimary: false,
    note: "Full Service Area",
    description: "Precision craftsman window and siding replacement services for premier residential properties.",
    distanceFromHub: "12 miles",
    direction: "Northeast",
  },
  {
    id: "berthoud",
    city: "Berthoud",
    state: "CO",
    lat: 40.3083,
    lng: -105.0811,
    isPrimary: false,
    note: "Full Service Area",
    description: "Direct proximity service for high-efficiency windows, weather-tight lap siding, and outdoor decks.",
    distanceFromHub: "7 miles",
    direction: "South",
  },
  {
    id: "greeley",
    city: "Greeley",
    state: "CO",
    lat: 40.4233,
    lng: -104.7091,
    isPrimary: false,
    note: "Full Service Area",
    description: "Complete exterior renovations with full thermal insulation, durability, and manufacturer warranties.",
    distanceFromHub: "20 miles",
    direction: "East",
  },
];

// Initial camera center bounding Northern Colorado service zone
const INITIAL_CENTER: [number, number] = [-104.92, 40.38];
const INITIAL_ZOOM = 9.4;

export function ServiceAreaMap() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<{ [key: string]: any }>({});
  
  const [selectedLocation, setSelectedLocation] = useState<ServiceLocation>(
    NORTHERN_COLORADO_LOCATIONS[0]
  );
  const [hoveredLocation, setHoveredLocation] = useState<ServiceLocation | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);

  // Initialize MapLibre GL
  useEffect(() => {
    let isMounted = true;

    async function initMap() {
      if (!mapContainerRef.current || mapInstanceRef.current) return;

      try {
        const maplibregl = await import("maplibre-gl");

        // OpenFreeMap Dark Vector Style via MapLibre GL JS
        // Free vector tiles hosted on Cloudflare Edge with OSM data
        const map = new maplibregl.Map({
          container: mapContainerRef.current,
          style: "https://tiles.openfreemap.org/styles/dark",
          center: INITIAL_CENTER,
          zoom: INITIAL_ZOOM,
          minZoom: 8,
          maxZoom: 14,
          attributionControl: false,
          scrollZoom: false, // Prevent intercepting page scroll on mobile
          cooperativeGestures: true, // Use Cmd/Ctrl + scroll to zoom
        });

        // Add minimal compact attribution for OpenStreetMap & OpenFreeMap
        map.addControl(
          new maplibregl.AttributionControl({
            compact: true,
            customAttribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> &copy; <a href="https://openfreemap.org" target="_blank" rel="noopener">OpenFreeMap</a>',
          }),
          "bottom-right"
        );

        // Safety fallback timer so loading skeleton never hangs
        const loadTimer = setTimeout(() => {
          if (isMounted) setIsMapLoaded(true);
        }, 1200);

        const setupLayersAndReveal = () => {
          clearTimeout(loadTimer);
          if (!isMounted) return;
          setIsMapLoaded(true);

          if (!map.getSource("hub-connections")) {
            // Add GeoJSON for subtle decorative connecting lines between Loveland HQ and other cities
            const hub = NORTHERN_COLORADO_LOCATIONS[0];
            const linesGeoJson: any = {
              type: "FeatureCollection",
              features: NORTHERN_COLORADO_LOCATIONS.filter((l) => !l.isPrimary).map((loc) => ({
                type: "Feature",
                properties: {
                  cityId: loc.id,
                },
                geometry: {
                  type: "LineString",
                  coordinates: [
                    [hub.lng, hub.lat],
                    [loc.lng, loc.lat],
                  ],
                },
              })),
            };

            map.addSource("hub-connections", {
              type: "geojson",
              data: linesGeoJson,
            });

            // Glow layer under connection lines
            map.addLayer({
              id: "hub-lines-glow",
              type: "line",
              source: "hub-connections",
              paint: {
                "line-color": "#A45A2A",
                "line-width": 3,
                "line-opacity": 0.25,
                "line-blur": 2,
              },
            });

            // Delicate dashed connector
            map.addLayer({
              id: "hub-lines",
              type: "line",
              source: "hub-connections",
              paint: {
                "line-color": "#C47A4A",
                "line-width": 1.5,
                "line-opacity": 0.6,
                "line-dasharray": [2, 3],
              },
            });
          }
        };

        map.on("load", setupLayersAndReveal);
        map.on("styledata", () => {
          if (isMounted && map.isStyleLoaded()) {
            setupLayersAndReveal();
          }
        });

          // Add custom HTML Markers for each city
          NORTHERN_COLORADO_LOCATIONS.forEach((loc) => {
            const el = document.createElement("button");
            el.className = "lima-marker group relative cursor-pointer focus:outline-none";
            el.setAttribute("aria-label", `Select ${loc.city}, CO service hub`);
            el.setAttribute("type", "button");

            // Marker visual markup
            if (loc.isPrimary) {
              // Loveland HQ Marker
              el.innerHTML = `
                <div class="relative flex items-center justify-center">
                  <!-- Pulsing halo -->
                  <span class="absolute w-10 h-10 -top-2.5 -left-2.5 rounded-full bg-[#A45A2A]/30 animate-ping pointer-events-none"></span>
                  <!-- Outer Badge Ring -->
                  <div class="w-7 h-7 rounded-full bg-[#1F302B] border-2 border-[#A45A2A] shadow-lg flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-110">
                    <span class="w-2.5 h-2.5 rounded-full bg-[#A45A2A]"></span>
                  </div>
                  <!-- Floating Label -->
                  <div class="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#1F302B]/95 text-[#F8F6F0] text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 rounded border border-[#A45A2A]/40 shadow-md pointer-events-none">
                    ${loc.city} <span class="text-[#A45A2A] font-bold">HQ</span>
                  </div>
                </div>
              `;
            } else {
              // Surrounding Cities Markers
              el.innerHTML = `
                <div class="relative flex items-center justify-center">
                  <!-- Outer Dot -->
                  <div class="w-5 h-5 rounded-full bg-[#1F302B]/90 border-2 border-[#A45A2A]/80 shadow-md flex items-center justify-center transition-all duration-300 group-hover:scale-125 group-hover:border-[#F8F6F0]">
                    <span class="w-1.5 h-1.5 rounded-full bg-[#F8F6F0]"></span>
                  </div>
                  <!-- Compact Hover/Active Label -->
                  <div class="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#1F302B]/90 text-[#F8F6F0] text-[9px] font-mono tracking-wider uppercase px-1.5 py-0.5 rounded border border-white/10 shadow-sm transition-opacity pointer-events-none">
                    ${loc.city}
                  </div>
                </div>
              `;
            }

            el.addEventListener("click", () => {
              focusCity(loc);
            });

            el.addEventListener("mouseenter", () => {
              setHoveredLocation(loc);
            });

            el.addEventListener("mouseleave", () => {
              setHoveredLocation(null);
            });

            const marker = new maplibregl.Marker({
              element: el,
              anchor: "center",
            })
              .setLngLat([loc.lng, loc.lat])
              .addTo(map);

            markersRef.current[loc.id] = marker;
          });

        mapInstanceRef.current = map;
      } catch (err: any) {
        console.error("MapLibre GL failed to initialize:", err);
        if (isMounted) {
          setMapError("Unable to load WebGL map. Displaying regional coverage view.");
        }
      }
    }

    initMap();

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Camera navigation to selected location
  const focusCity = useCallback((loc: ServiceLocation) => {
    setSelectedLocation(loc);

    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo({
        center: [loc.lng, loc.lat],
        zoom: loc.isPrimary ? 10.2 : 10.8,
        speed: 1.2,
        curve: 1.4,
        essential: true,
      });
    }
  }, []);

  // Reset to initial geographic overview
  const resetView = useCallback(() => {
    setSelectedLocation(NORTHERN_COLORADO_LOCATIONS[0]);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo({
        center: INITIAL_CENTER,
        zoom: INITIAL_ZOOM,
        speed: 1.2,
        curve: 1.4,
        essential: true,
      });
    }
  }, []);

  const zoomIn = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.zoomIn({ duration: 300 });
    }
  };

  const zoomOut = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.zoomOut({ duration: 300 });
    }
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {/* 1. MAP CANVAS CONTAINER */}
      <div className="relative w-full h-[500px] sm:h-[540px] lg:h-[580px] rounded-2xl overflow-hidden bg-[#162420] border border-[#2D443D] shadow-2xl">
        
        {/* Architectural atmospheric green tint overlay */}
        <div 
          ref={mapContainerRef} 
          className="absolute inset-0 w-full h-full [&_.maplibregl-canvas]:filter [&_.maplibregl-canvas]:contrast-105 [&_.maplibregl-canvas]:hue-rotate-[55deg] [&_.maplibregl-canvas]:brightness-95"
        />

        {/* Ambient forest vignette around map edges */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_40%,rgba(19,32,27,0.7)_100%)] z-10" />

        {/* Loading state skeleton */}
        {!isMapLoaded && !mapError && (
          <div className="absolute inset-0 bg-[#162420] flex flex-col items-center justify-center gap-3 z-30 text-[#F8F6F0]">
            <div className="w-10 h-10 rounded-full border-2 border-[#A45A2A] border-t-transparent animate-spin" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#F8F6F0]/80">
              Loading Northern Colorado Cartography...
            </span>
          </div>
        )}

        {/* Fallback view if WebGL is unavailable */}
        {mapError && (
          <div className="absolute inset-0 bg-[#162420] p-6 flex flex-col justify-between z-30 text-white">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#A45A2A]">
                Regional Coverage
              </span>
              <h3 className="text-xl font-bold">Northern Colorado Exterior Services</h3>
              <p className="text-white/70 text-xs">{mapError}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {NORTHERN_COLORADO_LOCATIONS.map((loc) => (
                <button
                  key={loc.id}
                  onClick={() => setSelectedLocation(loc)}
                  className={`p-3 rounded-lg text-left border text-xs transition-colors ${
                    selectedLocation.id === loc.id
                      ? "bg-[#1F302B] border-[#A45A2A] text-white"
                      : "bg-white/5 border-white/10 text-white/80 hover:bg-white/10"
                  }`}
                >
                  <div className="font-bold">{loc.city}, CO</div>
                  <div className="text-[10px] text-white/60">{loc.note}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 2. MINIMALIST LIQUID-GLASS LOCATION OVERLAY (Sem excesso de texto) */}
        <div className="absolute top-5 left-5 z-20 pointer-events-auto">
          <div className="bg-[#14201C]/65 backdrop-blur-xl border border-white/20 rounded-2xl p-4 sm:p-5 text-white shadow-2xl transition-all duration-300 min-w-[210px] sm:min-w-[240px] flex flex-col gap-3.5">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#A45A2A] animate-pulse shrink-0" />
                <h3 className="text-xl sm:text-2xl font-light tracking-tight text-white leading-none">
                  {selectedLocation.city}
                  <span className="text-xs font-mono font-normal text-white/50 ml-1.5 uppercase">
                    {selectedLocation.state}
                  </span>
                </h3>
              </div>
              {selectedLocation.isPrimary && (
                <span className="text-[10px] font-mono uppercase tracking-wider font-bold bg-[#A45A2A] text-white px-2 py-0.5 rounded-full shadow-xs">
                  HQ
                </span>
              )}
            </div>

            {/* Minimalist Request Button */}
            <a
              href="#contact"
              className="inline-flex items-center justify-center w-full gap-2 py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#A45A2A] hover:bg-[#8B4A20] text-white transition-all shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Request Service</span>
              <Navigation className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* 3. MINIMAL MAP CONTROLS (Top Right) */}
        <div className="absolute top-4 right-4 z-20 flex flex-col gap-1.5 pointer-events-auto">
          <button
            onClick={zoomIn}
            type="button"
            aria-label="Zoom in map"
            className="w-8 h-8 rounded-lg bg-[#1F302B]/90 hover:bg-[#1F302B] backdrop-blur-md border border-[#2D443D] text-[#F8F6F0] flex items-center justify-center transition-colors shadow-md hover:border-[#A45A2A] cursor-pointer"
          >
            <Plus className="w-4 h-4" />
          </button>
          <button
            onClick={zoomOut}
            type="button"
            aria-label="Zoom out map"
            className="w-8 h-8 rounded-lg bg-[#1F302B]/90 hover:bg-[#1F302B] backdrop-blur-md border border-[#2D443D] text-[#F8F6F0] flex items-center justify-center transition-colors shadow-md hover:border-[#A45A2A] cursor-pointer"
          >
            <Minus className="w-4 h-4" />
          </button>
          <button
            onClick={resetView}
            type="button"
            aria-label="Reset map to Northern Colorado overview"
            title="Reset overview"
            className="w-8 h-8 rounded-lg bg-[#1F302B]/90 hover:bg-[#1F302B] backdrop-blur-md border border-[#2D443D] text-[#F8F6F0] flex items-center justify-center transition-colors shadow-md hover:border-[#A45A2A] cursor-pointer mt-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 4. NORTH COMPASS BADGE (Bottom Left) */}
        <div className="absolute bottom-3 left-4 z-20 pointer-events-none hidden sm:flex items-center gap-1.5 text-[10px] font-mono tracking-widest uppercase text-white/50 bg-[#1F302B]/80 backdrop-blur-xs px-2.5 py-1 rounded-md border border-white/5">
          <Compass className="w-3.5 h-3.5 text-[#A45A2A]" />
          <span>North Colorado Basin</span>
        </div>

      </div>

      {/* 5. ACCESSIBLE CITY SELECTION CHIPS (Below Map) */}
      <div 
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2"
        role="tablist"
        aria-label="Northern Colorado Service Locations"
      >
        {NORTHERN_COLORADO_LOCATIONS.map((loc) => {
          const isSelected = selectedLocation.id === loc.id;
          return (
            <button
              key={loc.id}
              role="tab"
              aria-selected={isSelected}
              onClick={() => focusCity(loc)}
              className={`p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? "bg-[#1F302B] text-white border-[#A45A2A] shadow-md ring-1 ring-[#A45A2A]/40"
                  : "bg-white text-neutral-800 border-neutral-200 hover:border-[#A45A2A]/60 hover:bg-neutral-50"
              }`}
            >
              <div className="flex items-center justify-between w-full mb-1">
                <MapPin
                  className={`w-3.5 h-3.5 ${
                    isSelected
                      ? "text-[#A45A2A]"
                      : loc.isPrimary
                      ? "text-[#A45A2A]"
                      : "text-neutral-400"
                  }`}
                />
                {loc.isPrimary && (
                  <span
                    className={`text-[9px] font-mono uppercase tracking-wider font-bold px-1.5 py-0.2 rounded ${
                      isSelected
                        ? "bg-[#A45A2A] text-white"
                        : "bg-[#1F302B] text-white"
                    }`}
                  >
                    HQ
                  </span>
                )}
              </div>
              <div className="font-extrabold text-xs sm:text-sm tracking-tight truncate">
                {loc.city}
              </div>
              <div
                className={`text-[10px] mt-0.5 truncate ${
                  isSelected ? "text-white/70" : "text-neutral-500"
                }`}
              >
                {loc.isPrimary ? "Primary Hub" : loc.distanceFromHub}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
