"use client";

import { createContext, ReactNode, useContext, useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import {
  SECTION_KEYS, GRID, BREAKS, N,
  CANVAS_COLS, CANVAS_ROWS,
  piecewise,
} from "./constants";
import { useSnap } from "./useSnap";
import type { HybridCtx } from "./types";

// Re-export everything consumers need from a single import
export {
  SECTION_KEYS, GRID, BREAKS, N,
  scrollToSection, NAV_SECTIONS, piecewise,
} from "./constants";
export type { SectionKey } from "./constants";
export type { HybridCtx } from "./types";

const Ctx = createContext<HybridCtx | null>(null);
export const useHybridScroll = () => useContext(Ctx)!;

export default function HybridScroll({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useSnap();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const rawX = useTransform(scrollYProgress, (p) => {
    if (typeof window === "undefined") return 0;
    const w = window.innerWidth;
    return piecewise(BREAKS, SECTION_KEYS.map(k => -GRID[k][0] * w), p);
  });

  const rawY = useTransform(scrollYProgress, (p) => {
    if (typeof window === "undefined") return 0;
    const h = window.innerHeight;
    return piecewise(BREAKS, SECTION_KEYS.map(k => -GRID[k][1] * h), p);
  });

  const x = useSpring(rawX, { stiffness: 50, damping: 20, restDelta: 0.5 });
  const y = useSpring(rawY, { stiffness: 50, damping: 20, restDelta: 0.1 });

  return (
    <Ctx.Provider value={{ scrollYProgress }}>
      <div ref={containerRef} style={{ height: `${N * 100}vh` }}>
        <div
          className="sticky top-0 w-screen overflow-hidden grid-overlay"
          style={{ height: "100vh", backgroundColor: "var(--bg-color)" }}
        >
          <motion.div
            style={{
              x, y,
              position: "absolute",
              top: 0, left: 0,
              width:  `${CANVAS_COLS * 100}vw`,
              height: `${CANVAS_ROWS * 100}vh`,
              willChange: "transform",
            }}
          >
            {children}
          </motion.div>
        </div>
      </div>
    </Ctx.Provider>
  );
}
