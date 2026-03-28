"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { DiagramData } from "@/types/diagram";

interface DiagramEditorProps {
  data: DiagramData;
  onChange: (data: DiagramData) => void;
}

export default function DiagramEditor({ data, onChange }: DiagramEditorProps) {
  const [jsonText, setJsonText] = useState(JSON.stringify(data, null, 2));
  const [error, setError] = useState<string | null>(null);

  const handleChange = useCallback((value: string) => {
    setJsonText(value);
    try {
      const parsed: DiagramData = JSON.parse(value);
      if (!parsed.systemName || !Array.isArray(parsed.nodes) || !Array.isArray(parsed.edges)) {
        setError("Missing required fields: systemName, nodes, edges");
        return;
      }
      setError(null);
      onChange(parsed);
    } catch {
      setError("Invalid JSON");
    }
  }, [onChange]);

  return (
    <motion.div className="glass-card rounded-xl p-4 flex flex-col h-full"
      initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-mono text-sm text-rust/60 uppercase tracking-wider">diagram.json</h3>
        <span className="font-hand text-amber text-sm">{"// edit me ↓"}</span>
      </div>
      <textarea value={jsonText} onChange={(e) => handleChange(e.target.value)} spellCheck={false}
        className={`flex-1 w-full resize-none rounded-lg p-3 font-mono text-xs leading-relaxed
          bg-rust/[0.03] border transition-colors focus:outline-none focus:ring-2 focus:ring-amber/30
          ${error ? "border-red-400" : "border-rust/10"}`} />
      {error && (
        <motion.p className="mt-2 text-xs text-red-500 font-mono" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          ✗ {error}
        </motion.p>
      )}
      {!error && (
        <p className="mt-2 text-xs text-rust/40 font-mono">
          ✓ {data.nodes.length} nodes · {data.edges.length} edges
        </p>
      )}
    </motion.div>
  );
}
