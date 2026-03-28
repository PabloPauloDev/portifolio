"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import MorphingDiagramRenderer from "@/components/custom/MorphingDiagramRenderer";
import type { StoryChapter, DiagramData } from "@/types/diagram";

interface ChapterBlockProps {
  chapter: StoryChapter;
  index: number;
  total: number;
  active: number;
}

const ChapterBlock = forwardRef<HTMLDivElement, ChapterBlockProps>(
  function ChapterBlock({ chapter, index, total, active }, ref) {
    return (
      <div ref={ref} className="relative min-h-screen flex flex-col justify-center px-8 py-20"
        style={{ scrollMarginTop: "3.5rem" }}>
        <div className={`absolute left-0 top-8 bottom-8 w-[3px] rounded-r-full transition-all duration-500 ${
          index === active ? "bg-amber shadow-[0_0_8px_rgba(255,150,68,0.5)]" : index < active ? "bg-rust/20" : "bg-transparent"
        }`} />
        <motion.div animate={{ opacity: index === active ? 1 : 0.22, x: index === active ? 0 : -8 }} transition={{ duration: 0.4 }}>
          <p className="font-mono text-xs text-amber/70 uppercase tracking-widest mb-3">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </p>
          <h2 className="text-2xl md:text-3xl font-mono font-bold text-rust mb-5 leading-snug">{chapter.title}</h2>
          <p className="font-hand text-xl text-rust/80 leading-relaxed max-w-lg">{chapter.description}</p>
          {chapter.visual && typeof chapter.visual === "object" && (
            <div className="lg:hidden mt-8 glass-card rounded-xl p-5">
              <MorphingDiagramRenderer data={chapter.visual as DiagramData} />
            </div>
          )}
        </motion.div>
      </div>
    );
  });

export default ChapterBlock;
