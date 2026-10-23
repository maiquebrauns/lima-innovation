"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Play } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";

interface CategoryShowcaseItem {
  id: string;
  category: string;
  title: string;
  href: string;
  image: string;
  altText: string;
  colSpan: string;
  aspect: string;
  offsetClass?: string;
}

const CATEGORY_SHOWCASE: CategoryShowcaseItem[] = [
  {
    id: "windows",
    category: "Windows",
    title: "Custom Window Replacement",
    href: "/services/windows",
    image: "/assets/images/custom-window-replacement-showcase.jpg",
    altText: "Professional installer securing custom residential window frame in Loveland, CO",
    colSpan: "col-span-12 md:col-span-7",
    aspect: "aspect-[16/11]",
  },
  {
    id: "decks",
    category: "Decks",
    title: "Colorado Mountain View Deck",
    href: "/services/decks",
    image: "/assets/images/colorado-mountain-view-deck-showcase.jpg",
    altText: "Deck builder fastening cedar planks with Rocky Mountain vista in Loveland, CO",
    colSpan: "col-span-12 md:col-span-5",
    aspect: "aspect-[3/4]",
  },
  {
    id: "siding",
    category: "Siding",
    title: "Complete Siding & Trim Renovation",
    href: "/services/siding",
    image: "/assets/images/complete-siding-trim-showcase.jpg",
    altText: "Exterior siding specialist installing weather-tight horizontal lap panels in Loveland, CO",
    colSpan: "col-span-12 md:col-span-5",
    aspect: "aspect-[3/4]",
    offsetClass: "md:-mt-24 lg:-mt-32",
  },
  {
    id: "doors",
    category: "Doors",
    title: "Architectural Entryway Door",
    href: "/services/doors",
    image: "/assets/images/architectural-entryway-door-showcase.jpg",
    altText: "Artisan craftsman laser leveling and hanging solid wood entry door in Loveland, CO",
    colSpan: "col-span-12 md:col-span-7",
    aspect: "aspect-[16/10]",
  },
];

export function ProjectsSection() {
  return (
    <section id="projects" className="py-24 sm:py-32 bg-white border-t border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Header Section (Centralizado) */}
        <ScrollReveal className="mb-16 sm:mb-20">
          <div className="pb-8 border-b border-neutral-200 text-center">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#A45A2A] font-semibold block mb-3">
              Architectural Portfolio • Loveland &amp; Northern Colorado
            </span>
            <h2 className="text-3xl sm:text-5xl font-normal text-[#1F302B] tracking-tight">
              Craftsmanship That Speaks for Itself.
            </h2>
          </div>
        </ScrollReveal>

        {/* Asymmetric Editorial Architecture Grid (4 Categorias com ritmo assimétrico) */}
        <div className="grid grid-cols-12 gap-x-8 gap-y-16 sm:gap-y-24 items-start">
          {CATEGORY_SHOWCASE.map((item, index) => (
            <ScrollReveal
              key={item.id}
              className={`${item.colSpan} ${item.offsetClass || ""} group flex flex-col`}
              delay={index % 2 === 1 ? 140 : 0}
              duration={850}
              distance={32}
            >
              <Link
                href={item.href}
                className="block focus:outline-none"
              >
                {/* Image Container com proporções assimétricas editoriais */}
                <div
                  className={`relative w-full ${item.aspect} overflow-hidden rounded-md bg-neutral-100 transition-all duration-500 group-hover:shadow-md`}
                >
                  <Image
                    src={item.image}
                    alt={item.altText}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 50vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  />

                  {/* Badge interativo sutil no hover */}
                  <div className="absolute top-4 right-4 bg-[#1F302B]/90 backdrop-blur-md text-white text-[10px] font-mono uppercase tracking-widest px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play className="w-2.5 h-2.5 fill-white" />
                    <span>Explore {item.category}</span>
                  </div>
                </div>

                {/* Tipografia: Título e Comentário apenas com a Categoria */}
                <div className="mt-3.5 pt-1">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-lg sm:text-xl font-normal text-neutral-900 tracking-tight group-hover:text-[#A45A2A] transition-colors">
                      {item.title}
                    </h3>
                    <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-[#A45A2A] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                  </div>

                  {/* Comentário: Apenas o tipo de categoria sem outros dados */}
                  <div className="mt-1.5 text-[11px] font-mono uppercase tracking-[0.16em] text-[#A45A2A] font-semibold">
                    {item.category}
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
}
