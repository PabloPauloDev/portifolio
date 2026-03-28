"use client";

import { createContext, useContext, useEffect, ReactNode } from "react";
import { animate, motionValue, useMotionValueEvent } from "framer-motion";

export const CREAM = "#FFFDF1";
export const RUST  = "#562F00";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

export const themeProgress = motionValue(0);

export function animateTheme(to: "cream" | "rust", duration = 1.5) {
  animate(themeProgress, to === "rust" ? 1 : 0, { duration, ease: EASE });
}

interface ThemeCtx { animateTheme: typeof animateTheme }
const Ctx = createContext<ThemeCtx>({ animateTheme });
export const useTheme = () => useContext(Ctx);

export function ThemeProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    document.documentElement.style.setProperty("--bg-color", CREAM);
    document.documentElement.style.setProperty("--text-color", RUST);
    document.documentElement.style.setProperty("--contact-overlay", "0");
  }, []);

  useMotionValueEvent(themeProgress, "change", (v) => {
    document.documentElement.style.setProperty("--bg-color", lerpHex(CREAM, RUST, v));
    document.documentElement.style.setProperty("--text-color", lerpHex(RUST, CREAM, v));
    document.documentElement.style.setProperty("--contact-overlay", String(v));
  });

  return <Ctx.Provider value={{ animateTheme }}>{children}</Ctx.Provider>;
}

function lerpHex(a: string, b: string, t: number): string {
  const ar = parseInt(a.slice(1, 3), 16);
  const ag = parseInt(a.slice(3, 5), 16);
  const ab = parseInt(a.slice(5, 7), 16);
  const br = parseInt(b.slice(1, 3), 16);
  const bg = parseInt(b.slice(3, 5), 16);
  const bb = parseInt(b.slice(5, 7), 16);
  const r  = Math.round(ar + (br - ar) * t);
  const g  = Math.round(ag + (bg - ag) * t);
  const bv = Math.round(ab + (bb - ab) * t);
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${bv.toString(16).padStart(2, "0")}`;
}
