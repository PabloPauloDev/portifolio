"use client";

import { useRef, useState, useEffect, type KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { useTerminal } from "@/hooks/useTerminal";
import TerminalLine from "./TerminalLine";
import DonutBackground from "./DonutBackground";

export default function MacTerminal() {
  const { cwd, lines, exec } = useTerminal();
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { const el = scrollRef.current; if (el) el.scrollTop = el.scrollHeight; }, [lines]);

  const submit = () => { if (!input.trim()) return; exec(input); setInput(""); };
  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") submit();
    // Prevent spacebar from bubbling to scroll engine while typing
    if (e.key === " ") e.stopPropagation();
  };

  return (
    // Clicking anywhere in the terminal focuses the input
    <div className="relative flex flex-col rounded-lg overflow-hidden h-full"
      style={{ background: "#FFFDF1", border: "1.5px solid rgba(86,47,0,0.25)", boxShadow: "0 8px 40px rgba(86,47,0,0.12), 0 1px 3px rgba(86,47,0,0.08)" }}
      onClick={() => inputRef.current?.focus()}>
      <DonutBackground />
      <div className="flex items-center gap-2 px-3 py-2 flex-shrink-0"
        style={{ background: "#FFFFFF", borderBottom: "1px solid rgba(86,47,0,0.12)" }}>
        {["#FF9644", "#FFB870", "#562F00"].map((c, i) => (
          <div key={i} className="w-[10px] h-[10px] rounded-full" style={{ backgroundColor: c, opacity: 0.75 }} />
        ))}
        <span className="flex-1 text-center font-mono" style={{ fontSize: 10, letterSpacing: "0.08em", color: "rgba(86,47,0,0.45)" }}>
          field-ops — zsh
        </span>
      </div>
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-0.5" style={{ minHeight: 0 }}>
        {lines.map((l, i) => <TerminalLine key={i} line={l} />)}
      </div>
      <div className="flex items-center gap-2 px-4 py-2 flex-shrink-0" style={{ borderTop: "1px solid rgba(86,47,0,0.10)" }}>
        <span className="font-mono flex-shrink-0" style={{ fontSize: 12, color: "#FF9644" }}>{cwd} $</span>
        <input ref={inputRef} className="flex-1 bg-transparent font-mono outline-none"
          style={{ fontSize: 12, color: "#562F00", caretColor: "#FF9644" }}
          value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={onKey}
          spellCheck={false} autoComplete="off" aria-label="Terminal input" />
        <motion.span className="font-mono flex-shrink-0" style={{ fontSize: 12, color: "#FF9644" }}
          animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 0.85 }}>▌</motion.span>
      </div>
    </div>
  );
}
