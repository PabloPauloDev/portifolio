"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SplitText from "./SplitText";
import PhotoPlaceholder from "./PhotoPlaceholder";

const EASE_EXPO = [0.76, 0, 0.24, 1] as const;
const LINE_2 = "Carpanedo";

export default function IntroScreen({ onDone }: { onDone: () => void }) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => { const t = setTimeout(() => setExiting(true), 2900); return () => clearTimeout(t); }, []);
  useEffect(() => { if (!exiting) return; const t = setTimeout(onDone, 1100); return () => clearTimeout(t); }, [exiting, onDone]);

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden">
      <motion.div className="absolute inset-x-0 top-0" style={{ height: "50%", backgroundColor: "var(--rust)" }}
        initial={{ y: 0 }} animate={exiting ? { y: "-100%" } : { y: 0 }}
        transition={{ duration: 1.0, ease: EASE_EXPO, delay: exiting ? 0.05 : 0 }} />
      <motion.div className="absolute inset-x-0 bottom-0" style={{ height: "50%", backgroundColor: "var(--rust)" }}
        initial={{ y: 0 }} animate={exiting ? { y: "100%" } : { y: 0 }}
        transition={{ duration: 1.0, ease: EASE_EXPO, delay: exiting ? 0.1 : 0 }} />
      <div className="absolute inset-x-0 pointer-events-none"
        style={{ top: "50%", height: "1px", backgroundColor: "var(--amber)", opacity: 0.4 }} />

      <motion.div className="absolute inset-0 flex items-center justify-center px-8"
        animate={exiting ? { opacity: 0 } : { opacity: 1 }} transition={{ duration: 0.35 }}>
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 w-full max-w-6xl">
          <PhotoPlaceholder />
          <div className="flex flex-col gap-2">
            <div className="overflow-hidden mb-3">
              <motion.p className="font-mono uppercase tracking-[0.3em]"
                style={{ fontSize: "clamp(0.6rem, 1vw, 0.75rem)", color: "rgba(255,150,68,0.7)" }}
                initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3, duration: 0.5 }}>
                {"// Solutions Architect"}
              </motion.p>
            </div>
            <SplitText text="Pablo" delayBase={0.5} />
            <div className="flex">
              {LINE_2.split("").map((char, i) => (
                <div key={i} className="overflow-hidden">
                  <motion.span className="block font-mono font-black leading-none"
                    style={{ fontSize: "clamp(4rem, 11vw, 9rem)", color: "var(--amber)", letterSpacing: "-0.02em" }}
                    initial={{ y: "105%" }} animate={{ y: 0 }}
                    transition={{ delay: 0.68 + i * 0.04, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}>
                    {char}
                  </motion.span>
                </div>
              ))}
            </div>
            <motion.div className="flex items-center gap-3 mt-4"
              initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.3, duration: 0.6 }}>
              <div className="h-px w-8" style={{ backgroundColor: "var(--amber)" }} />
              <span className="font-hand" style={{ fontSize: "clamp(1rem, 2vw, 1.4rem)", color: "var(--amber)" }}>
                Designing systems that scale
              </span>
            </motion.div>
            <motion.p className="font-mono"
              style={{ fontSize: "10px", color: "rgba(255,253,241,0.3)", letterSpacing: "0.2em", marginTop: "0.5rem" }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}>
              2024 · REMOTE
            </motion.p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
