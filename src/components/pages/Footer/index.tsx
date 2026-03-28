"use client";

import { motion } from "framer-motion";
import DebrisBricks from "./DebrisBricks";

export default function Footer() {
  return (
    <motion.footer className="relative w-full h-full flex flex-col items-center justify-center gap-8 px-8 overflow-hidden"
      style={{ backgroundColor: "var(--bg-color)" }}>
      <motion.div className="text-center"
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}>
        <p className="font-hand text-amber text-xl mb-3">{"// let's build"}</p>
        <h2 className="font-mono font-black text-cream leading-none" style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}>
          Got a hard<br /><span className="text-amber">problem?</span>
        </h2>
      </motion.div>
      <motion.div className="flex gap-8"
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }}>
        {["GitHub", "LinkedIn", "Email"].map((link) => (
          <span key={link} data-cursor className="font-mono text-sm text-cream/50 hover:text-amber transition-colors cursor-pointer">
            {link}
          </span>
        ))}
      </motion.div>
      <motion.div className="flex flex-col items-center gap-2"
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
        viewport={{ once: true }} transition={{ delay: 0.6 }}>
        <div className="w-12 h-px bg-cream/10" />
        <p className="font-mono text-[10px] text-cream/30 uppercase tracking-widest">
          Designed &amp; architected with intent.
        </p>
        <p className="font-hand text-sm text-amber/60">{"// built with Next.js + Framer Motion"}</p>
      </motion.div>
      <DebrisBricks />
    </motion.footer>
  );
}
