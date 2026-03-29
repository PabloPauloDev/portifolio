"use client";

import { motion, LayoutGroup } from "framer-motion";
import type { ShutdownPhase } from "./types";
import TerminalView from "./TerminalView";
import TerminalBox from "./TerminalBox";
import Rack from "@/components/reusable/RackUnit";
import { BLADES } from "@/components/reusable/RackUnit/repository/schema";

interface Props {
  isDimmed: boolean;
  shutdownPhase: ShutdownPhase;
  rackVisible: boolean;
  isShuttingDown: boolean;
  termReady: boolean;
  bootKey: number;
  bootCount: number;
  shutdownCount: number;
  lines: { type: string; content: string }[];
  cwd: string;
  input: string;
  inputRef: React.RefObject<HTMLInputElement | null>;
  logRef: React.RefObject<HTMLDivElement | null>;
  onInputChange: (v: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onGenieComplete: () => void;
}

export default function FieldOpsScene(props: Props) {
  const { isDimmed, shutdownPhase, rackVisible, isShuttingDown } = props;
  const layoutAsExpanded = rackVisible;
  const termW = (rackVisible || isShuttingDown) ? 1000 : 700;
  const termH = (rackVisible || isShuttingDown) ? 700 : 350;
  const showRack = rackVisible && !isShuttingDown;

  return (
    <motion.div key="fieldops" className="absolute inset-0" style={{ zIndex: 10 }}
      exit={{ x: "100vw", opacity: 0, transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] } }}>
      <FieldOpsTitle />
      <motion.div className="absolute inset-0 flex flex-col"
        initial={{ x: "100vw", opacity: 0 }} animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}>
        <div className="flex-shrink-0" style={{ height: 96 }} />
        <GenieWrapper shutdownPhase={shutdownPhase} onComplete={props.onGenieComplete}>
          <LayoutGroup>
            <div className="flex-1 flex items-center min-h-0"
              style={{ justifyContent: layoutAsExpanded ? "flex-start" : "center",
                paddingLeft: layoutAsExpanded ? 72 : 0, paddingRight: layoutAsExpanded ? 28 : 0,
                paddingBottom: 24, gap: layoutAsExpanded ? 24 : 0 }}>
              <TerminalBox termW={termW} termH={termH}>
                <TerminalView {...props} />
              </TerminalBox>
              {showRack && (
                <div className="flex-1 flex items-center justify-center min-w-0">
                  <motion.div style={{ width: 1000, height: 805 }}
                    initial={{ scale: 0.88, opacity: 0 }}
                    animate={{ scale: 1, opacity: isDimmed ? 0.32 : 1 }}
                    transition={{ type: "spring", stiffness: 280, damping: 22 }}>
                    <Rack blades={BLADES} isDimmed={isDimmed} height={805} />
                  </motion.div>
                </div>
              )}
            </div>
          </LayoutGroup>
        </GenieWrapper>
      </motion.div>
    </motion.div>
  );
}

function FieldOpsTitle() {
  return (
    <motion.div className="absolute top-16 left-0 px-8 pt-4 pointer-events-none" style={{ zIndex: 15 }}
      initial={{ x: -72, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}>
      <p className="font-hand text-base mb-0.5" style={{ color: "#FF9644" }}>{"// home lab"}</p>
      <h2 className="text-3xl font-mono font-bold leading-none" style={{ color: "#562F00" }}>Field Operations</h2>
      <p className="font-mono mt-1" style={{ fontSize: 10, color: "rgba(86,47,0,0.35)" }}>
        Infrastructure doesn&apos;t stop at the office.</p>
    </motion.div>
  );
}

function GenieWrapper({ shutdownPhase, onComplete, children }: {
  shutdownPhase: ShutdownPhase; onComplete: () => void; children: React.ReactNode;
}) {
  const minimizing = shutdownPhase === "minimizing" || shutdownPhase === "done";
  return (
    <motion.div className="flex-1 flex flex-col min-h-0" style={{ transformOrigin: "bottom center" }}
      animate={minimizing ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
      transition={shutdownPhase === "minimizing"
        ? { duration: 0.75, ease: [0.4, 0, 0.8, 0] as [number, number, number, number] }
        : { duration: 0 }}
      onAnimationComplete={() => { if (shutdownPhase === "minimizing") onComplete(); }}>
      {children}
    </motion.div>
  );
}