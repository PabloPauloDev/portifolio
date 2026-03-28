"use client";

import { motion } from "framer-motion";
import type { DiagramNode } from "@/types/diagram";

interface Props {
  node: DiagramNode;
  screenX: number;
  screenY: number;
}

export default function DiagramTooltip({ node, screenX, screenY }: Props) {
  return (
    <motion.div className="absolute pointer-events-none z-30 max-w-52.5"
      style={{ left: screenX, top: screenY }}
      initial={{ opacity: 0, scale: 0.85, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 6 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}>
      <div className="glass-card rounded-lg px-3 py-2 shadow-lg border border-amber/20">
        <p className="font-mono text-[10px] text-amber uppercase tracking-wider mb-1">{node.type}</p>
        <p className="font-hand text-sm text-rust leading-snug">{node.description}</p>
      </div>
    </motion.div>
  );
}
