"use client";

import { motion } from "framer-motion";

export default function PhotoFrame() {
  return (
    <motion.div
      className="flex-shrink-0 flex items-center justify-center pr-12 lg:pr-20"
      style={{ width: "clamp(260px, 35vw, 480px)" }}
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9, delay: 3.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="relative">
        <div className="absolute inset-0 rounded-2xl blur-3xl opacity-20"
          style={{ backgroundColor: "var(--amber)", transform: "scale(0.9) translateY(5%)" }} />
        <div className="relative overflow-hidden rounded-2xl"
          style={{ width: "clamp(220px, 28vw, 400px)", height: "clamp(280px, 36vw, 520px)",
            border: "1.5px solid rgba(86,47,0,0.12)", background: "linear-gradient(145deg, rgba(255,150,68,0.08), rgba(86,47,0,0.04))" }}>
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-6">
            <div className="rounded-full mb-[-2px]" style={{ width: "42%", height: "28%", background: "rgba(86,47,0,0.12)" }} />
            <div className="rounded-t-3xl" style={{ width: "72%", height: "48%", background: "rgba(86,47,0,0.07)" }} />
          </div>
          <div className="absolute top-4 left-4 font-mono uppercase tracking-widest"
            style={{ fontSize: "9px", color: "rgba(86,47,0,0.25)" }}>[ your photo here ]</div>
          <div className="absolute bottom-0 right-0 w-10 h-10"
            style={{ borderBottom: "2px solid rgba(255,150,68,0.5)", borderRight: "2px solid rgba(255,150,68,0.5)", borderBottomRightRadius: "4px" }} />
          <div className="absolute top-0 left-0 w-10 h-10"
            style={{ borderTop: "2px solid rgba(255,150,68,0.5)", borderLeft: "2px solid rgba(255,150,68,0.5)", borderTopLeftRadius: "4px" }} />
        </div>
        <motion.div className="absolute -bottom-4 -left-4 glass-card px-3 py-2 rounded-lg"
          animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}>
          <p className="font-hand text-sm text-amber">{"// 9+ years building"}</p>
        </motion.div>
      </div>
    </motion.div>
  );
}
