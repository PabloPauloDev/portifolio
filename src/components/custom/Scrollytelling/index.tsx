"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import MorphingDiagramRenderer from "@/components/custom/MorphingDiagramRenderer";
import StoryNav from "./StoryNav";
import ChapterBlock from "./ChapterBlock";
import type { StoryChapter, DiagramData } from "@/types/diagram";

interface ScrollytellingProps {
  projectId: string;
  projectTitle: string;
  chapters: StoryChapter[];
}

export default function Scrollytelling({ projectTitle, chapters }: ScrollytellingProps) {
  const [active, setActive] = useState(-1); // -1 = intro, 0..N-1 = chapters
  const pageRef = useRef(0);               // 0 = intro, 1..N = chapters, N+1 = end
  const scrolling = useRef(false);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const goTo = useCallback((p: number) => {
    const clamped = Math.max(0, Math.min(chapters.length + 1, p));
    if (scrolling.current || clamped === pageRef.current) return;
    scrolling.current = true;
    pageRef.current = clamped;
    sectionRefs.current[clamped]?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActive(clamped === 0 ? -1 : Math.min(clamped - 1, chapters.length - 1));
    setTimeout(() => { scrolling.current = false; }, 900);
  }, [chapters.length]);

  useEffect(() => {
    const onWheel = (e: WheelEvent) => { e.preventDefault(); if (!scrolling.current) goTo(pageRef.current + (e.deltaY > 0 ? 1 : -1)); };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown") { e.preventDefault(); goTo(pageRef.current + 1); }
      else if (e.key === "ArrowUp" || e.key === "PageUp") { e.preventDefault(); goTo(pageRef.current - 1); }
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("wheel", onWheel); window.removeEventListener("keydown", onKey); };
  }, [goTo]);

  let activeDiagram: DiagramData | null = null;
  if (active >= 0) {
    for (let i = active; i >= 0; i--) {
      const v = chapters[i]?.visual;
      if (v && typeof v === "object") { activeDiagram = v as DiagramData; break; }
    }
  }

  return (
    <div>
      <StoryNav projectTitle={projectTitle} chapterCount={chapters.length} active={active} onDotClick={(i) => goTo(i + 1)} />
      <div className="pt-14 max-w-7xl mx-auto lg:flex">
        <div className="lg:flex-1 min-w-0">
          <div ref={(el) => { sectionRefs.current[0] = el; }} className="min-h-screen flex flex-col justify-center px-8"
            style={{ scrollMarginTop: "3.5rem" }}>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <p className="font-hand text-amber text-xl mb-3">{"// architecture history"}</p>
              <h1 className="text-4xl md:text-5xl font-mono font-bold text-rust mb-4 leading-tight">{projectTitle}</h1>
              <p className="font-mono text-sm text-rust/40">{chapters.length} chapters · scroll to evolve the diagram →</p>
            </motion.div>
          </div>
          {chapters.map((ch, i) => (
            <ChapterBlock key={i} ref={(el) => { sectionRefs.current[i + 1] = el; }}
              chapter={ch} index={i} total={chapters.length} active={active} />
          ))}
          <div ref={(el) => { sectionRefs.current[chapters.length + 1] = el; }}
            className="min-h-screen flex flex-col items-center justify-center px-8 text-center"
            style={{ scrollMarginTop: "3.5rem" }}>
            <p className="font-hand text-amber text-2xl mb-8">{"// end of story"}</p>
            <Link href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-rust text-cream rounded-lg font-mono text-sm font-medium hover:bg-amber hover:text-rust transition-all duration-200 hover:shadow-lg hover:shadow-amber/25">
              ← View All Projects
            </Link>
          </div>
        </div>
        <div className="hidden lg:block lg:flex-1">
          <div className="sticky top-14 h-[calc(100vh-3.5rem)] flex items-center px-8 py-12">
            <div className="glass-card rounded-2xl p-8 w-full">
              <AnimatePresence mode="wait">
                {activeDiagram ? (
                  <motion.div key="has-diagram" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                    <MorphingDiagramRenderer data={activeDiagram} />
                  </motion.div>
                ) : (
                  <motion.div key="no-diagram" className="flex flex-col items-center justify-center h-64 gap-4"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <p className="font-hand text-3xl text-amber/40">{"// "}{active >= 0 ? chapters[active]?.title : projectTitle}</p>
                    <p className="font-mono text-xs text-rust/25 text-center max-w-xs">{active < 0 ? "scroll to begin" : "text-only chapter"}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
