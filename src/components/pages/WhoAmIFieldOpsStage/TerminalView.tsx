"use client";

import { motion, AnimatePresence } from "framer-motion";
import { BOOT_LOG, SHUTDOWN_LOG } from "./constants";
import InteractiveShell from "./InteractiveShell";

interface Props {
  isShuttingDown: boolean;
  shutdownCount: number;
  termReady: boolean;
  bootKey: number;
  bootCount: number;
  lines: { type: string; content: string }[];
  cwd: string;
  input: string;
  isDimmed: boolean;
  inputRef: React.RefObject<HTMLInputElement | null>;
  logRef: React.RefObject<HTMLDivElement | null>;
  onInputChange: (v: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function TerminalView(props: Props) {
  const { isShuttingDown, shutdownCount, termReady, bootKey, bootCount,
    lines, cwd, input, isDimmed, inputRef, logRef, onInputChange, onKeyDown } = props;
  return (
    <div ref={logRef} className="flex flex-col p-3 gap-0.5 overflow-y-auto"
      style={{ flex: 1, background: "#0C0805", scrollbarWidth: "none" }}
      onClick={() => inputRef.current?.focus()}>
      <AnimatePresence mode="wait" initial={false}>
        {isShuttingDown ? (
          <ShutdownLog key="shutdown" count={shutdownCount} />
        ) : !termReady ? (
          <BootLog key={`boot-${bootKey}`} count={bootCount} />
        ) : (
          <InteractiveShell key="interactive" {...{ lines, cwd, input, isDimmed, isShuttingDown, inputRef, onInputChange, onKeyDown }} />
        )}
      </AnimatePresence>
    </div>
  );
}

function ShutdownLog({ count }: { count: number }) {
  return (
    <motion.div className="flex flex-col gap-[3px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.15 } }}>
      {SHUTDOWN_LOG.slice(0, count).map((line, i) => (
        <motion.p key={i} className="font-mono leading-relaxed whitespace-pre"
          style={{ fontSize: 11, color: "highlight" in line && line.highlight ? "#FF5555" : "rgba(255,253,241,0.52)",
            fontWeight: "highlight" in line && line.highlight ? 700 : 400 }}
          initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.12 }}>
          {line.text}
        </motion.p>
      ))}
      {count < SHUTDOWN_LOG.length && (
        <motion.span className="font-mono" style={{ fontSize: 11, color: "rgba(255,85,85,0.7)" }}
          animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 0.65 }}>▌</motion.span>
      )}
    </motion.div>
  );
}

function BootLog({ count }: { count: number }) {
  return (
    <motion.div className="flex flex-col gap-[3px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}>
      {BOOT_LOG.slice(0, count).map((line, i) => {
        const isAscii = "ascii" in line && line.ascii;
        return (
          <motion.p key={i}
            className={`font-mono whitespace-pre ${isAscii ? "leading-none" : "leading-relaxed"}`}
            style={{
              fontSize: isAscii ? 9 : 11,
              color: isAscii ? "rgba(255,150,68,0.55)"
                : "highlight" in line && line.highlight ? "#FF9644"
                : i === 0 ? "rgba(255,253,241,0.70)" : "rgba(255,253,241,0.42)",
              fontWeight: "highlight" in line && line.highlight ? 700 : 400,
            }}
            initial={{ opacity: 0, x: isAscii ? 0 : -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: isAscii ? 0.35 : 0.12 }}>
            {line.text}
          </motion.p>
        );
      })}
      {count < BOOT_LOG.length && (
        <motion.span className="font-mono" style={{ fontSize: 11, color: "#FF9644" }}
          animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 0.75 }}>▌</motion.span>
      )}
    </motion.div>
  );
}
