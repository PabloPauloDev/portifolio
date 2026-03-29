"use client";

import { motion, type MotionValue } from "framer-motion";
import type { ReactNode } from "react";

interface Props {
  content: ReactNode;
  x: MotionValue<number>;
  y: MotionValue<number>;
}

/**
 * Rendered inside a portal at document.body.
 * Position is driven by spring MotionValues so the tooltip trails the
 * cursor with damped physics — no React state, no re-renders on move.
 */
export default function FloatingTooltip({ content, x, y }: Props) {
  return (
    <motion.div
      className="fixed z-500 pointer-events-none"
      style={{ x, y, translateX: "16px", translateY: "-50%" }}
      initial={{ opacity: 0, scale: 0.88 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.88 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
    >
      {content}
    </motion.div>
  );
}
