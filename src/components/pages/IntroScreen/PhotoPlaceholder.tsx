"use client";

import { motion } from "framer-motion";

export default function PhotoPlaceholder() {
  return (
    <motion.div
      className="relative flex-shrink-0"
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.25, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className="relative overflow-hidden"
        style={{
          width: "clamp(180px, 20vw, 280px)",
          height: "clamp(220px, 25vw, 360px)",
          borderRadius: "12px",
          border: "1.5px solid rgba(255,150,68,0.35)",
          background: "linear-gradient(145deg, rgba(255,150,68,0.12) 0%, rgba(255,253,241,0.06) 100%)",
        }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-4">
          <div className="rounded-full mb-[-2px]" style={{ width: "38%", height: "30%", background: "rgba(255,253,241,0.18)" }} />
          <div className="rounded-t-3xl" style={{ width: "68%", height: "44%", background: "rgba(255,253,241,0.10)" }} />
        </div>
        <div className="absolute top-3 right-3 font-mono uppercase tracking-widest"
          style={{ fontSize: "8px", color: "rgba(255,150,68,0.5)" }}>your photo</div>
        <div className="absolute bottom-0 left-0 w-8 h-8"
          style={{ borderBottom: "2px solid rgba(255,150,68,0.6)", borderLeft: "2px solid rgba(255,150,68,0.6)", borderBottomLeftRadius: "4px" }} />
        <div className="absolute top-0 right-0 w-8 h-8"
          style={{ borderTop: "2px solid rgba(255,150,68,0.6)", borderRight: "2px solid rgba(255,150,68,0.6)", borderTopRightRadius: "4px" }} />
      </div>
    </motion.div>
  );
}
