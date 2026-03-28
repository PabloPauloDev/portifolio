"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { NAV_SECTIONS, scrollToSection } from "@/hooks/useHybridScroll";

export default function Nav() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 25 });
  const progressWidth = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <motion.nav className="fixed top-0 left-0 right-0 z-[200] glass-card border-b border-rust/5"
      initial={{ y: -60 }} animate={{ y: 0 }} transition={{ duration: 0.6, delay: 3.2 }}>
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <button onClick={() => scrollToSection(0)} className="font-hand text-lg text-amber cursor-pointer" data-cursor>
          {"<SA />"}
        </button>
        <div className="flex gap-6">
          {NAV_SECTIONS.map((link) => (
            <button key={link.label} onClick={() => scrollToSection(link.index)} data-cursor
              className="font-mono text-xs uppercase tracking-wider transition-colors text-rust/50 hover:text-rust">
              {link.label}
            </button>
          ))}
        </div>
      </div>
      <motion.div className="absolute bottom-0 left-0 h-[2px] bg-amber origin-left" style={{ width: progressWidth }} />
    </motion.nav>
  );
}
