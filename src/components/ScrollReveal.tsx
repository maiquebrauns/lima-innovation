"use client";

import React from "react";
import { motion } from "framer-motion";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // Accepts seconds (e.g. 0.15) or milliseconds (e.g. 150)
  duration?: number; // Accepts seconds (e.g. 0.75) or milliseconds (e.g. 750)
  distance?: number; // in pixels, default 40
  direction?: "up" | "down" | "left" | "right" | "none";
  scale?: number; // starting scale, default 0.96
  once?: boolean;
  amount?: number | "some" | "all";
}

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  duration = 0.75,
  distance = 36,
  direction = "up",
  scale = 0.97,
  once = false,
  amount = 0.12,
}: ScrollRevealProps) {
  // Normalize seconds vs milliseconds
  const normalizedDelay = delay > 5 ? delay / 1000 : delay;
  const normalizedDuration = duration > 5 ? duration / 1000 : duration;

  const getInitialPosition = () => {
    switch (direction) {
      case "up":
        return { y: distance, x: 0 };
      case "down":
        return { y: -distance, x: 0 };
      case "left":
        return { x: distance, y: 0 };
      case "right":
        return { x: -distance, y: 0 };
      case "none":
      default:
        return { x: 0, y: 0 };
    }
  };

  const initialPos = getInitialPosition();

  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: scale,
        x: initialPos.x,
        y: initialPos.y,
      }}
      whileInView={{
        opacity: 1,
        scale: 1,
        x: 0,
        y: 0,
      }}
      viewport={{
        once,
        amount,
        margin: "0px 0px -40px 0px",
      }}
      transition={{
        duration: normalizedDuration,
        delay: normalizedDelay,
        ease: [0.16, 1, 0.3, 1], // Apple-style smooth cubic bezier
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
