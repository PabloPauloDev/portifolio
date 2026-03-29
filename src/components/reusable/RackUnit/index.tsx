"use client";

import { useState } from "react";
import type { Blade } from "./types";
import RackBar from "./RackBar";
import BladeRow from "./BladeRow";

export type { Blade, BladeId } from "./types";

interface Props {
  blades: readonly Blade[];
  isDimmed: boolean;
  height?: number;
}

export default function Rack({ blades, isDimmed, height }: Props) {
  // hoveredId drives the isHovered highlight on the blade row.
  // Tooltip content is managed by the global TooltipProvider via BladeRow.
  const [hoveredId, setHoveredId] = useState<string | null>(null);

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
    </div>
  );
}
