"use client";

import { useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { SECTION_KEYS, GRID, BREAKS, scrollToSection } from "@/hooks/useHybridScroll";
import { CELL, DOT_R, MAP_W, MAP_H, pathD } from "./constants";

export default function MiniMap() {
  const { scrollYProgress } = useScroll();
  const [label, setLabel] = useState<string>(SECTION_KEYS[0]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.round(v * (SECTION_KEYS.length - 1));
    setLabel(SECTION_KEYS[Math.max(0, Math.min(SECTION_KEYS.length - 1, idx))]);
  });

  const dotX = useTransform(scrollYProgress, BREAKS, SECTION_KEYS.map(k => GRID[k][0] * CELL));
  const dotY = useTransform(scrollYProgress, BREAKS, SECTION_KEYS.map(k => GRID[k][1] * CELL));

  return (
    <motion.div className="fixed bottom-6 right-6 z-[500] select-none"
      style={{ background: "rgba(255,253,241,0.75)", backdropFilter: "blur(12px)",
        border: "1px solid rgba(86,47,0,0.08)", borderRadius: "14px", padding: "10px 12px 8px",
        transformOrigin: "bottom right" }}
      whileHover={{ scale: 1.8 }}
      transition={{ type: "spring", stiffness: 280, damping: 28 }}>
      <p className="font-mono uppercase text-center mb-2"
        style={{ fontSize: "6px", letterSpacing: "0.18em", color: "rgba(86,47,0,0.3)" }}>camera</p>
      <div style={{ width: MAP_W, height: MAP_H, position: "relative" }}>
        <svg width={MAP_W} height={MAP_H} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
          <path d={pathD} fill="none" stroke="rgba(86,47,0,0.12)" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
          {SECTION_KEYS.map((k, i) => {
            const [col, row] = GRID[k];
            return (
              <circle key={k} cx={col * CELL + CELL / 2} cy={row * CELL + CELL / 2} r={DOT_R}
                fill="rgba(86,47,0,0.18)" data-cursor="link" onClick={() => scrollToSection(i)} />
            );
          })}
        </svg>
        <motion.div className="absolute pointer-events-none"
          style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "var(--amber)",
            boxShadow: "0 0 6px rgba(255,150,68,0.6)", top: CELL / 2 - 4, left: CELL / 2 - 4, x: dotX, y: dotY }} />
        <motion.div className="absolute pointer-events-none"
          style={{ width: 16, height: 16, borderRadius: "50%", border: "1.5px solid rgba(255,150,68,0.5)",
            top: CELL / 2 - 8, left: CELL / 2 - 8, x: dotX, y: dotY }}
          animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }} />
      </div>
      <p className="font-mono text-center mt-2"
        style={{ fontSize: "7px", color: "rgba(255,150,68,0.7)", letterSpacing: "0.1em" }}>{label}</p>
    </motion.div>
  );
}
