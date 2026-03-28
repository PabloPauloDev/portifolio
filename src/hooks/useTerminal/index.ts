"use client";

import { useState, useCallback } from "react";
import type { TermLine } from "./types";
import { execCommand } from "./commands";

export type { TermLine } from "./types";

export function useTerminal() {
  const [cwd, setCwd] = useState("/root");
  const [lines, setLines] = useState<TermLine[]>([
    { type: "text", content: "Welcome to field-ops-rack-01" },
    { type: "text", content: 'Type "help" for the system manual.' },
  ]);

  const exec = useCallback(
    (raw: string) => {
      const input = raw.trim();
      if (!input) return;

      const promptLine: TermLine = { type: "prompt", content: `${cwd} $ ${input}` };

      const push = (...l: TermLine[]) =>
        setLines((prev) => [...prev, promptLine, ...l]);

      const clearLines = () => setLines([]);

      execCommand(input, cwd, push, setCwd, clearLines);
    },
    [cwd],
  );

  return { cwd, lines, exec } as const;
}
