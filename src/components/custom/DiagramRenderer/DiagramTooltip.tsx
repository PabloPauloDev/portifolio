"use client";

import type { DiagramNode } from "@/types/diagram";

interface Props {
  node: DiagramNode;
}

/**
 * Pure content card rendered inside FloatingTooltip (no positioning or
 * animation — those are handled by the global TooltipProvider portal).
 */
export default function DiagramTooltip({ node }: Props) {
  return (
    <div className="glass-card rounded-lg px-3 py-2 shadow-lg border border-amber/20 max-w-[210px]">
      <p className="font-mono text-[10px] text-amber uppercase tracking-wider mb-1">{node.type}</p>
      <p className="font-hand text-sm text-rust leading-snug">{node.description}</p>
    </div>
  );
}
