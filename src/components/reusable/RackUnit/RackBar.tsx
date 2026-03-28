"use client";

import { motion } from "framer-motion";

export default function RackBar({ side, isDimmed }: { side: "top" | "bottom"; isDimmed: boolean }) {
  const isTop = side === "top";
  return (
    <div
      className="flex items-center justify-between px-4 py-2"
      style={{
        background: "#160E06",
        borderBottom: isTop ? "1px solid rgba(86,47,0,0.30)" : "none",
        borderTop: !isTop ? "1px solid rgba(86,47,0,0.30)" : "none",
      }}
    >
      {isTop ? (
        <>
          <div className="flex items-center gap-2">
            <span className="font-mono uppercase"
              style={{ fontSize: 9, letterSpacing: "0.2em", color: "rgba(255,150,68,0.50)" }}>
              FIELD-OPS-RACK-01
            </span>
            <span className="font-mono" style={{ fontSize: 9, color: "rgba(86,47,0,0.30)" }}>
              Dell PowerEdge R720
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <motion.div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#FF9644" }}
              animate={{ opacity: isDimmed ? 0.2 : [1, 0.4, 1] }}
              transition={isDimmed ? { duration: 0.5 } : { repeat: Infinity, duration: 2, ease: "easeInOut" }} />
            <span className="font-mono"
              style={{ fontSize: 9, color: isDimmed ? "rgba(255,150,68,0.25)" : "rgba(255,150,68,0.65)" }}>
              {isDimmed ? "OFFLINE" : "ONLINE"}
            </span>
          </div>
        </>
      ) : (
        <>
          <span className="font-mono" style={{ fontSize: 9, color: "rgba(86,47,0,0.25)" }}>
            PSU-1: 750 W PLATINUM · PSU-2: 750 W PLATINUM
          </span>
          <div className="flex items-center gap-1.5">
            {[0, 1].map((i) => (
              <motion.div key={i} className="w-1 h-1 rounded-full" style={{ backgroundColor: "#FF9644" }}
                animate={{ opacity: isDimmed ? 0 : [1, 0.3, 1] }}
                transition={isDimmed ? { duration: 0.3 + i * 0.2 } : { repeat: Infinity, duration: 2.5 + i, ease: "easeInOut" }} />
            ))}
            <span className="font-mono ml-1" style={{ fontSize: 9, color: "rgba(86,47,0,0.25)" }}>
              REDUNDANT
            </span>
          </div>
        </>
      )}
    </div>
  );
}
