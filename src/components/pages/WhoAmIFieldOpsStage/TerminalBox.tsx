"use client";

import { motion } from "framer-motion";

interface Props { termW: number; termH: number; children: React.ReactNode }

export default function TerminalBox({ termW, termH, children }: Props) {
  return (
    <motion.div layout layoutId="fo-terminal"
      className="flex-shrink-0 overflow-hidden rounded flex flex-col"
      style={{ width: termW, height: termH,
        boxShadow: "0 24px 64px rgba(0,0,0,0.50), 0 6px 20px rgba(0,0,0,0.26)" }}
      transition={{ layout: { type: "spring", stiffness: 100, damping: 20 } }}>
      <div className="flex items-center px-3 gap-2 flex-shrink-0"
        style={{ height: 28, background: "#2E1A08", borderBottom: "1px solid rgba(86,47,0,0.35)" }}>
        {(["#FF9644", "#FFB870", "rgba(86,47,0,0.28)"] as const).map((c, i) => (
          <div key={i} className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: c }} />
        ))}
        <span className="font-hand ml-1 flex-1 truncate" style={{ fontSize: 13, color: "rgba(255,150,68,0.65)" }}>
          field-ops — zsh</span>
      </div>
      {children}
    </motion.div>
  );
}
