"use client";

import { motion, AnimatePresence } from "framer-motion";
import ExperienceBrick from "@/components/reusable/ExperienceBrick";
import type { StackPhase } from "@/components/reusable/ExperienceBrick";
import { WORK } from "./constants";

interface Props {
  stackPhase: StackPhase;
  dropKey: number;
  showStack: boolean;
  showFloor: boolean;
}

export default function BrickStack({ stackPhase, dropKey, showStack, showFloor }: Props) {
  if (!showStack) return null;
  return (
    <div className="absolute inset-x-8 inset-y-0 pointer-events-none" style={{ zIndex: 2 }}>
      <AnimatePresence>
        {showFloor && (
          <motion.div
            key={`floor-${dropKey}`}
            className="absolute origin-left"
            style={{
              bottom: 80, left: "38%", right: 0, height: 1.5,
              backgroundColor: "rgba(86,47,0,0.28)",
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ scaleX: 0, transition: { duration: 0.4 } }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showFloor && (
          <motion.p
            className="absolute font-hand"
            style={{ bottom: 83, right: 0, fontSize: 10, color: "rgba(86,47,0,0.22)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            ← gravity floor →
          </motion.p>
        )}
      </AnimatePresence>
      <div className="absolute flex flex-col gap-2.5" style={{ top: 88, bottom: 82, left: "38%", right: 0 }}>
        {WORK.map((job, i) => (
          <ExperienceBrick
            key={`${job.id}-${dropKey}`}
            job={job}
            phase={stackPhase}
            index={i}
            total={WORK.length}
          />
        ))}
      </div>
    </div>
  );
}
