"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { Blade } from "./types";

interface Props {
  blade: Blade | null;
}

export default function RackTooltip({ blade }: Props) {
  return (
    <AnimatePresence mode="wait">
      {blade && (
        <motion.div
          key={blade.id}
          className="absolute z-50 pointer-events-none"
          style={{ right: -8, top: "50%", transform: "translate(100%, -50%)" }}
          initial={{ opacity: 0, scale: 0.94, x: -8 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.94, x: -8 }}
          transition={{ duration: 0.16 }}
        >
          <div className="rounded-sm p-3 w-52"
            style={{
              background: "#0C0805",
              border: "1px solid rgba(255,150,68,0.22)",
              boxShadow: "0 10px 40px rgba(0,0,0,0.55)",
            }}>
            <p className="font-mono uppercase mb-2"
              style={{ fontSize: 8, letterSpacing: "0.18em", color: "rgba(255,150,68,0.55)" }}>
              {blade.name} — deep dive
            </p>
            {blade.deepDive.lines.map((line, i) => (
              <p key={i} className="font-mono leading-relaxed"
                style={{ fontSize: 10, color: "rgba(255,253,241,0.55)" }}>
                {line}
              </p>
            ))}
            <p className="font-hand mt-2 pt-2"
              style={{ fontSize: 12, color: "rgba(255,150,68,0.6)", borderTop: "1px solid rgba(86,47,0,0.3)" }}>
              ✎ {blade.deepDive.note}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
