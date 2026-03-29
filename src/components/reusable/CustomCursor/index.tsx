"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useMotionValueEvent, useSpring } from "framer-motion";
import { useCursor } from "./CursorContext";
import { themeProgress } from "@/components/reusable/ThemeProvider";

// Morph spring: stiffness 100 / damping 20 → weighty, mechanical feel
const MORPH = { type: "spring", stiffness: 100, damping: 20 } as const;
// Move spring: tight tracking for position
const MOVE  = { stiffness: 500, damping: 28, restDelta: 0.01 } as const;

export default function CustomCursor() {
  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);
  const x = useSpring(rawX, MOVE);
  const y = useSpring(rawY, MOVE);
  // Ref guards the pointermove handler — avoids stale-closure re-creation
  const locked = useRef(false);
  const { cursorType, targetSize, setCursorLinkHovered, setCursorButtonHovered } = useCursor();
  const [tp, setTp] = useState(() => themeProgress.get());
  useMotionValueEvent(themeProgress, "change", setTp);

  // Position tracking — BYPASSES React render cycle entirely
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (locked.current) return;    // frozen to button center
      rawX.set(e.clientX);
      rawY.set(e.clientY);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [rawX, rawY]);

  // Snap position to button center; release on other variants
  useEffect(() => {
    locked.current = cursorType === "button-hover";
    if (cursorType === "button-hover") {
      rawX.set(targetSize.centerX);
      rawY.set(targetSize.centerY);
    }
  }, [cursorType, targetSize, rawX, rawY]);

  // Document-level delegation — works for dynamically rendered elements
  // (e.g. links that appear inside AnimatePresence after a card hover).
  // mouseover/mouseout bubble; mouseenter/mouseleave do not.
  useEffect(() => {
    const onOver = (e: MouseEvent) => {
      const target = e.target as Element;
      // Check for explicit button-hover opt-in first
      const btn = target.closest?.("[data-cursor='button']");
      if (btn) { setCursorButtonHovered(btn); return; }
      // All other interactive elements → link-hover ring
      if (target.closest?.("a, button, [data-cursor]")) setCursorLinkHovered(true);
    };
    const onOut = (e: MouseEvent) => {
      const el = (e.target as Element).closest?.("a, button, [data-cursor]");
      if (!el) return;
      // Reset only when the pointer genuinely leaves the interactive zone
      if (!el.contains(e.relatedTarget as Node | null)) {
        setCursorLinkHovered(false);
        setCursorButtonHovered(null);
      }
    };
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout",  onOut);
    return () => {
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout",  onOut);
    };
  }, [setCursorLinkHovered, setCursorButtonHovered]);

  // Derived dimensions — no state, pure computation
  const isBtn      = cursorType === "button-hover";
  const isLink     = cursorType === "link-hover";
  const isHovering = isBtn || isLink;
  const w  = isBtn ? targetSize.width  + 28 : isLink ? 40 : 20;
  const h  = isBtn ? targetSize.height + 18 : isLink ? 40 : 20;
  const br = isBtn ? targetSize.borderRadius + 4 : isLink ? 30 : 10;
  const bg = isBtn ? "rgba(255,150,68,0.12)" : "rgba(0,0,0,0)";
  const lp = (a: number, b: number) => Math.round(a + (b - a) * tp);
  const borderColor = isHovering ? "rgba(255,150,68,0.9)" : `rgba(${lp(86,255)},${lp(47,253)},${lp(0,241)},0.75)`;

  return (
    <motion.div className="fixed top-0 left-0 pointer-events-none z-9999" style={{ x, y }}>
      <motion.div
        className="-translate-x-1/2 -translate-y-1/2"
        animate={{ width: w, height: h, borderRadius: br, backgroundColor: bg, borderColor }}
        transition={MORPH}
        style={{
          border: `1.5px solid ${borderColor}`,
          backdropFilter: isLink ? "contrast(1.1) brightness(1.1)" : "none",
          mixBlendMode: isLink ? "difference" : "normal",
        }}
      />
    </motion.div>
  );
}

