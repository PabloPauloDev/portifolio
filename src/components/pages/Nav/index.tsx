"use client";

import { useState } from "react";
import {
  motion, useScroll, useTransform, useSpring, useMotionValueEvent,
} from "framer-motion";
import { NAV_SECTIONS, scrollToSection, N } from "@/hooks/useHybridScroll";

interface Props { delay?: number }

export default function Nav({ delay = 3.2 }: Props) {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 25 });
  const progressWidth = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);
  const [activeIdx, setActiveIdx] = useState(0);

  // Map scroll progress to the nearest nav section index.
  // useMotionValueEvent avoids re-renders on every scroll frame —
  // it only fires when the discrete index changes (max 5 times total).
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActiveIdx(Math.min(Math.round(v * (N - 1)), NAV_SECTIONS.length - 1));
  });

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-200 glass-card border-b border-rust/5"
      initial={{ y: -60 }} animate={{ y: 0 }} transition={{ duration: 0.6, delay }}
    >
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <button
          onClick={() => scrollToSection(0)}
          className="font-hand text-lg text-amber cursor-pointer"
          data-cursor
        >
          {"<SA />"}
        </button>
        <div className="flex gap-6">
          {NAV_SECTIONS.map((link, i) => (
            <button
              key={link.label}
              onClick={() => scrollToSection(link.index)}
              data-cursor
              className="relative font-mono text-xs uppercase tracking-wider transition-colors"
              style={{ color: activeIdx === i ? "var(--accent)" : "rgba(86,47,0,0.5)" }}
            >
              {link.label}
              {activeIdx === i && (
                <motion.span
                  layoutId="navbar-indicator"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-amber origin-left"
        style={{ width: progressWidth }}
      />
    </motion.nav>
  );
}
