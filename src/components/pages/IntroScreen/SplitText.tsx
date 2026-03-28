"use client";

import { motion } from "framer-motion";

export default function SplitText({ text, delayBase }: { text: string; delayBase: number }) {
  return (
    <div className="flex">
      {text.split("").map((char, i) => (
        <div key={i} className="overflow-hidden">
          <motion.span
            className="block font-mono font-black leading-none"
            style={{ fontSize: "clamp(4rem, 11vw, 9rem)", color: "var(--cream)", letterSpacing: "-0.02em" }}
            initial={{ y: "105%" }}
            animate={{ y: 0 }}
            transition={{ delay: delayBase + i * 0.04, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          >
            {char}
          </motion.span>
        </div>
      ))}
    </div>
  );
}
