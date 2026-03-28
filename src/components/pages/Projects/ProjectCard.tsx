"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import DiagramPreview from "@/components/reusable/DiagramPreview";
import ProjectCardOverlay from "./ProjectCardOverlay";
import type { ProjectDef } from "./types";

export default function ProjectCard({ id, title, tags, decisions, hasStory, index, accent, diagram }: ProjectDef & { index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="flex-1 min-w-0 h-full glass-card rounded-2xl overflow-hidden flex flex-col"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 3.2 + index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="h-1 flex-shrink-0" style={{ backgroundColor: accent }} />

      <div className="flex-shrink-0 px-5 pt-4 pb-3">
        <div className="flex items-baseline gap-2 mb-2">
          <span className="font-mono text-[10px] uppercase tracking-widest opacity-30">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="text-lg lg:text-xl font-mono font-bold text-rust leading-tight">{title}</h3>
        </div>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {tags.slice(0, 4).map((tag) => (
            <span key={tag} className="px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider bg-amber/10 text-amber rounded border border-amber/20">
              {tag}
            </span>
          ))}
        </div>
        <p className="font-mono text-[10px] text-rust/50 leading-snug line-clamp-2">
          <span className="text-amber font-semibold">→ </span>{decisions.win}
        </p>
      </div>

      <div className="relative flex-1 min-h-0 overflow-hidden border-t border-rust/8">
        <div className="absolute inset-0" style={{ background: "rgba(255,253,241,0.72)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "linear-gradient(rgba(86,47,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(86,47,0,0.04) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }} />
        <motion.div className="absolute inset-0 p-3"
          animate={{ scale: hovered ? 1.07 : 1 }}
          transition={{ type: "spring", stiffness: 280, damping: 24 }}
          style={{ transformOrigin: "center center" }}
        >
          <DiagramPreview data={diagram} />
        </motion.div>
        <div className="absolute top-0 left-0 right-0 pointer-events-none"
          style={{ height: 28, background: "linear-gradient(rgba(255,253,241,0.45), transparent)" }} />
        <ProjectCardOverlay hovered={hovered} hasStory={hasStory} id={id} />
      </div>
    </motion.div>
  );
}
