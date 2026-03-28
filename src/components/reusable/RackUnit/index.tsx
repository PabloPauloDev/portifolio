"use client";

import { useState } from "react";
import type { Blade } from "./types";
import RackBar from "./RackBar";
import BladeRow from "./BladeRow";
import RackTooltip from "./RackTooltip";

export type { Blade, BladeId } from "./types";

interface Props {
  blades: readonly Blade[];
  isDimmed: boolean;
  height?: number;
}

export default function Rack({ blades, isDimmed, height }: Props) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const hoveredBlade = blades.find((b) => b.id === hoveredId) ?? null;

  return (
    <div className="relative" style={height ? { height } : undefined}>
      <div
        className="rounded-sm overflow-hidden h-full flex flex-col"
        style={{
          background: "#0C0805",
          border: "2px solid rgba(86,47,0,0.45)",
          boxShadow: "0 8px 40px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,150,68,0.06)",
        }}
      >
        <RackBar side="top" isDimmed={isDimmed} />
        {blades.map((blade, i) => (
          <BladeRow
            key={blade.id}
            blade={blade}
            index={i}
            isHovered={hoveredId === blade.id}
            isDimmed={isDimmed}
            onHover={setHoveredId}
          />
        ))}
        <RackBar side="bottom" isDimmed={isDimmed} />
      </div>
      <RackTooltip blade={hoveredBlade} />
    </div>
  );
}
