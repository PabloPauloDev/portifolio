"use client";

import { motion } from "framer-motion";
import { scrollToSection } from "@/hooks/useHybridScroll";
import PhotoFrame from "./PhotoFrame";

export default function Hero() {
  return (
    <section className="relative w-full h-full flex items-center overflow-hidden pt-14">
      <div className="flex-1 flex flex-col justify-center px-12 lg:px-20 max-w-[55vw]">
        <motion.div className="absolute top-24 left-8 font-hand text-4xl text-rust/6 select-none pointer-events-none"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.8, duration: 1 }}>
          {"// architecture matters"}
        </motion.div>
        <motion.p className="font-hand text-xl text-amber mb-4 -rotate-1"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 3.4 }}>
          {"/* Solutions Architect */"}
        </motion.p>
        <motion.h1 className="text-5xl lg:text-7xl font-mono font-bold text-rust leading-tight mb-6"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 3.5 }}>
          How can I solve<br /><span className="text-amber">your problem</span>?
        </motion.h1>
        <motion.p className="text-base lg:text-lg text-rust/60 font-mono max-w-lg mb-10"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 3.65 }}>
          I design systems that scale. From monoliths to microservices,
          from on-prem to multi-region cloud — I architect the bridge.
        </motion.p>
        <motion.div className="flex gap-4"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 3.8 }}>
          <button data-cursor onClick={() => scrollToSection(1)}
            className="px-6 py-3 bg-rust text-cream rounded-lg font-mono text-sm hover:bg-rust/90 transition-all hover:shadow-lg hover:shadow-rust/20">
            View Architecture →
          </button>
          <button data-cursor onClick={() => scrollToSection(4)}
            className="px-6 py-3 border border-rust/20 text-rust rounded-lg font-mono text-sm hover:border-amber hover:text-amber transition-all">
            Who Am I
          </button>
        </motion.div>
        <motion.div className="absolute bottom-10 left-20 flex items-center gap-3"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4.2 }}>
          <motion.div className="flex flex-col gap-1"
            animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}>
            <div className="w-1.5 h-1.5 rounded-full bg-amber/40" />
            <div className="w-1.5 h-1.5 rounded-full bg-amber/60" />
            <div className="w-1.5 h-1.5 rounded-full bg-amber" />
          </motion.div>
          <span className="font-mono text-[10px] text-rust/30 uppercase tracking-widest">scroll to explore</span>
        </motion.div>
      </div>
      <PhotoFrame />
    </section>
  );
}
