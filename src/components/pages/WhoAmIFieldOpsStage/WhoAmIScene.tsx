"use client";

import { motion } from "framer-motion";
import type { Scene } from "./types";

interface Props { scene: Scene }

export default function WhoAmIScene({ scene }: Props) {
  return (
    <motion.div
      className="absolute inset-0 flex flex-col pt-14"
      style={{ zIndex: 10 }}
      initial={{ x: 0, opacity: 1 }}
      exit={{ x: "-100vw", opacity: 0, transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] } }}
    >
      <div className="flex-shrink-0 px-8 pt-5 pb-3 flex items-baseline justify-between">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: scene !== "idle" ? 0 : -50, opacity: scene !== "idle" ? 1 : 0 }}
          transition={{ type: "spring", stiffness: 180, damping: 26 }}
        >
          <p className="font-hand text-amber text-base mb-0.5">{"// about"}</p>
          <h2 className="text-3xl font-mono font-bold text-rust leading-none">Who Am I</h2>
        </motion.div>
      </div>
      <div className="flex-1 flex min-h-0 gap-5 px-7 pb-0">
        <motion.div
          className="w-[38%] flex-shrink-0 flex items-stretch pb-[88px]"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: scene !== "idle" ? 0 : -50, opacity: scene !== "idle" ? 1 : 0 }}
          transition={{ type: "spring", stiffness: 180, damping: 26, delay: 0.08 }}
        >
          <BioPaper />
        </motion.div>
        <div className="flex-1" />
      </div>
    </motion.div>
  );
}

function BioPaper() {
  return (
    <div className="w-full h-full relative"
      style={{
        background: "#FDFBF0",
        backgroundImage: "repeating-linear-gradient(transparent, transparent 27px, rgba(86,47,0,0.055) 28px)",
        backgroundSize: "100% 28px", backgroundPositionY: "32px",
        borderRadius: "3px",
        boxShadow: "3px 5px 18px rgba(86,47,0,0.13), 6px 10px 36px rgba(86,47,0,0.05), -1px -1px 0 rgba(86,47,0,0.06)",
        transform: "rotate(-0.8deg)", padding: "24px 22px 28px 36px",
        borderLeft: "3px solid rgba(255,150,68,0.35)",
      }}>
      <div className="absolute top-5 left-[-11px] flex flex-col gap-5">
        {[0, 1, 2].map((i) => (
          <div key={i} className="w-4 h-4 rounded-full"
            style={{ background: "#F5F0E0", boxShadow: "inset 0 1px 3px rgba(86,47,0,0.18)" }} />
        ))}
      </div>
      <p className="absolute left-2 top-[22px] font-hand"
        style={{ fontSize: 9, color: "rgba(255,150,68,0.5)", writingMode: "vertical-rl", letterSpacing: "0.1em" }}>
        architecture · systems · people
      </p>
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-rust/35 mb-1">about the architect</p>
      <h3 className="font-mono text-xl font-bold text-rust mb-0.5 leading-tight">Pablo Carpanedo</h3>
      <p className="font-hand text-amber text-base mb-4" style={{ lineHeight: 1.2 }}>Solutions Architect &amp; Systems Thinker</p>
      <div className="space-y-3">
        <p className="font-hand text-rust/75 leading-relaxed" style={{ fontSize: 15 }}>
          I believe good architecture is invisible — it&apos;s the foundation that lets teams ship fast without breaking things.
        </p>
        <p className="font-hand text-rust/75 leading-relaxed" style={{ fontSize: 15 }}>
          10 years solving hard problems across fintech, edtech &amp; enterprise SaaS. I speak business, I think in systems, I build for the long run.
        </p>
        <p className="font-hand text-rust/75 leading-relaxed" style={{ fontSize: 15 }}>
          When I&apos;m not designing distributed systems, I&apos;m running a home lab — because the best architects stay close to the metal.
        </p>
      </div>
      <p className="font-hand text-amber/70 mt-5 text-right" style={{ fontSize: 13 }}>— pablo ✦</p>
    </div>
  );
}
