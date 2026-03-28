"use client";

import { motion } from "framer-motion";
import type { Job, StackPhase } from "./types";
import { brickAnimate, brickTransition } from "./types";

export type { Job, StackPhase } from "./types";
export { brickAnimate, brickTransition } from "./types";

interface Props {
  job: Job;
  phase: StackPhase;
  index: number;
  onFallen?: () => void;
  total?: number;
}

export default function ExperienceBrick({ job, phase, index, onFallen, total }: Props) {
  return (
    <motion.div
      className="flex-1 min-h-0 rounded-xl flex flex-col overflow-hidden"
      style={{
        background: "rgba(255,253,241,0.88)",
        backdropFilter: "blur(14px)",
        border: `1.5px solid ${job.accent}30`,
        boxShadow: "0 6px 24px rgba(86,47,0,0.07), 0 0 0 0.5px rgba(86,47,0,0.04)",
      }}
      initial={{ y: -900, opacity: 0, rotate: 0 }}
      animate={brickAnimate(phase, job.rot)}
      transition={brickTransition(phase, index)}
      onAnimationComplete={() => {
        if (phase === "fallen" && total && index === total - 1) onFallen?.();
      }}
    >
      <div style={{ height: 2.5, backgroundColor: job.accent, opacity: 0.9, flexShrink: 0 }} />
      <div className="flex gap-4 px-4 py-3 flex-1 min-h-0 overflow-hidden">
        <div className="flex-shrink-0 flex flex-col justify-between" style={{ minWidth: 88 }}>
          <div>
            <p className="font-hand text-sm leading-tight" style={{ color: job.accent }}>{job.period}</p>
            <h3 className="font-mono text-sm font-bold text-rust leading-tight mt-1">{job.role}</h3>
            <p className="font-mono text-[10px] text-rust/40 mt-0.5">@ {job.company}</p>
          </div>
          <span className="mt-2 inline-block rounded-full"
            style={{ width: 6, height: 6, backgroundColor: job.accent, opacity: 0.6 }} />
        </div>
        <div className="flex-shrink-0 self-stretch" style={{ width: 1, backgroundColor: `${job.accent}25` }} />
        <div className="flex flex-col justify-between flex-1 min-w-0 overflow-hidden">
          <p className="font-mono text-[11px] text-rust/60 leading-relaxed line-clamp-3">{job.description}</p>
          <div className="flex flex-wrap gap-1 pt-2 mt-auto">
            {job.tech.map((tag) => (
              <span key={tag} className="font-mono rounded px-1.5 py-[2px]"
                style={{
                  fontSize: 9, letterSpacing: "0.05em",
                  backgroundColor: `${job.accent}12`, border: `1px solid ${job.accent}28`,
                  color: job.accent, whiteSpace: "nowrap",
                }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
