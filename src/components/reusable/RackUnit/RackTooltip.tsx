"use client";

import type { Blade } from "./types";

interface Props {
  blade: Blade;
}

/**
 * Pure content card for a rack blade.
 * Rendered inside FloatingTooltip (portal, root level) — no positioning,
 * no animation, no overflow:hidden clipping risk.
 */
export default function RackTooltip({ blade }: Props) {
  return (
    <div className="rounded-sm p-3 w-52"
      style={{
        background: "#0C0805",
        border: "1px solid rgba(255,150,68,0.22)",
        boxShadow: "0 10px 40px rgba(0,0,0,0.55)",
      }}>
      <p className="font-mono uppercase mb-2"
        style={{ fontSize: 8, letterSpacing: "0.18em", color: "rgba(255,150,68,0.55)" }}>
        {blade.name} — deep dive
      </p>
      {blade.deepDive.lines.map((line, i) => (
        <p key={i} className="font-mono leading-relaxed"
          style={{ fontSize: 10, color: "rgba(255,253,241,0.55)" }}>
          {line}
        </p>
      ))}
      <p className="font-hand mt-2 pt-2"
        style={{ fontSize: 12, color: "rgba(255,150,68,0.6)", borderTop: "1px solid rgba(86,47,0,0.3)" }}>
        ✎ {blade.deepDive.note}
      </p>
    </div>
  );
}
