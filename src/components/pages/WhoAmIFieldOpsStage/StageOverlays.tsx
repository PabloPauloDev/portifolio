"use client";

import { motion } from "framer-motion";
import type { ShutdownPhase } from "./types";

interface Props { showFieldOps: boolean; shutdownPhase: ShutdownPhase }

export default function StageOverlays({ showFieldOps, shutdownPhase }: Props) {
  return (
    <>
      <span className="absolute top-4 right-6 font-mono pointer-events-none z-10"
        style={{ fontSize: 8, letterSpacing: "0.14em", color: "rgba(86,47,0,0.16)" }}>
        {showFieldOps ? "[x:−200vw · y:−200vh]" : "[x:−200vw · y:−200vh]"}
      </span>
      <div className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 39, background: "#562F00", opacity: "var(--contact-overlay)" }} />
      <motion.div className="absolute inset-0 z-40 pointer-events-none" style={{ background: "#562F00" }}
        animate={{ opacity: shutdownPhase === "minimizing" ? 1 : 0 }}
        transition={{
          duration: shutdownPhase === "minimizing" ? 0.75 : shutdownPhase === "done" ? 0 : 0.85,
          ease: "easeInOut",
        }} />
    </>
  );
}
