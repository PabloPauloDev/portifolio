"use client";

import { motion } from "framer-motion";

interface Props {
  lines: { type: string; content: string }[];
  cwd: string;
  input: string;
  isDimmed: boolean;
  isShuttingDown: boolean;
  inputRef: React.RefObject<HTMLInputElement | null>;
  onInputChange: (v: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function InteractiveShell(props: Props) {
  const { lines, cwd, input, isDimmed, isShuttingDown, inputRef, onInputChange, onKeyDown } = props;
  return (
    <motion.div className="flex flex-col gap-0.5 min-h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
      {lines.map((line, i) => (
        <p key={i} className="font-mono leading-relaxed whitespace-pre-wrap break-all"
          style={{ fontSize: 11, color: line.type === "error" ? "rgba(220,80,60,0.85)"
            : line.type === "prompt" ? "rgba(255,253,241,0.72)" : "rgba(255,253,241,0.42)" }}>
          {line.type === "prompt" && <span style={{ color: "#FF9644" }}>{cwd}&nbsp;$&nbsp;</span>}
          {line.content}
        </p>
      ))}
      <div className="flex items-center mt-auto pt-1">
        <span className="font-mono flex-shrink-0" style={{ fontSize: 11, color: "#FF9644" }}>{cwd}&nbsp;$&nbsp;</span>
        <input ref={inputRef} className="font-mono flex-1 min-w-0 bg-transparent border-none outline-none"
          style={{ fontSize: 11, color: "rgba(255,253,241,0.85)", caretColor: "#FF9644" }}
          value={input} onChange={(e) => onInputChange(e.target.value)} onKeyDown={onKeyDown}
          autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck={false}
          disabled={isDimmed || isShuttingDown} />
      </div>
    </motion.div>
  );
}
