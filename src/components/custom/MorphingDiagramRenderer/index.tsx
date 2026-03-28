"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { DiagramData } from "@/types/diagram";
import { NODE_W, NODE_H, typeStyles, getEdgePath, getEdgeLabelPos } from "../diagram-utils";

interface Props { data: DiagramData; className?: string }

export default function MorphingDiagramRenderer({ data, className = "" }: Props) {
  const nodeMap = new Map(data.nodes.map((n) => [n.id, n]));
  const maxX = Math.max(...data.nodes.map((n) => n.x + NODE_W + 40), 800);
  const maxY = Math.max(...data.nodes.map((n) => n.y + NODE_H + 40), 500);

  return (
    <div className={`relative w-full ${className}`}>
      <AnimatePresence mode="wait">
        <motion.p key={data.systemName} className="font-hand text-lg text-amber mb-3 -rotate-1"
          initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 12 }} transition={{ duration: 0.25 }}>
          {"/* "}{data.systemName}{" */"}
        </motion.p>
      </AnimatePresence>
      <svg viewBox={`0 0 ${maxX} ${maxY}`} className="w-full h-auto overflow-visible" style={{ minHeight: 260 }}>
        <AnimatePresence mode="wait">
          <motion.g key={`edges-${data.systemName}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
            {data.edges.map((edge, i) => {
              const from = nodeMap.get(edge.from), to = nodeMap.get(edge.to);
              if (!from || !to) return null;
              const path = getEdgePath(from, to), lp = getEdgeLabelPos(from, to);
              return (
                <g key={`${edge.from}-${edge.to}-${i}`}>
                  <motion.path d={path} fill="none" stroke="rgba(86,47,0,0.06)" strokeWidth={3}
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                    transition={{ duration: 0.9, delay: 0.15 + i * 0.1, ease: "easeOut" }} />
                  <motion.path d={path} fill="none" stroke="#562F00" strokeWidth={1.5} strokeDasharray="6 3"
                    initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 0.45 }}
                    transition={{ duration: 0.8, delay: 0.15 + i * 0.1, ease: "easeOut" }} />
                  <motion.circle r={3} fill="#FF9644" cx={to.x} cy={to.y + NODE_H / 2}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 + i * 0.1 }} />
                  {edge.label && (
                    <text x={lp.x} y={lp.y} textAnchor="middle" dominantBaseline="middle" fill="#FF9644"
                      fontSize={13} fontFamily="var(--font-caveat), cursive" style={{ paintOrder: "stroke" }}
                      stroke="rgba(255,253,241,0.85)" strokeWidth={3}>{edge.label}</text>
                  )}
                </g>
              );
            })}
          </motion.g>
        </AnimatePresence>
        <AnimatePresence>
          {data.nodes.map((node, i) => {
            const s = typeStyles[node.type] ?? typeStyles.service;
            return (
              <motion.g key={node.id}
                initial={{ x: node.x, y: node.y - 44, opacity: 0 }}
                animate={{ x: node.x, y: node.y, opacity: 1 }}
                exit={{ x: node.x, y: node.y + 20, opacity: 0, transition: { duration: 0.2 } }}
                transition={{ type: "spring", stiffness: 260, damping: 24, delay: i * 0.045 }}>
                <rect x={0} y={0} width={NODE_W} height={NODE_H} rx={8} fill={s.bg} stroke={s.border} strokeWidth={1.5} />
                <text x={14} y={NODE_H / 2 + 1} textAnchor="middle" dominantBaseline="middle" fontSize={14} fill={s.border}>{s.icon}</text>
                <text x={NODE_W / 2 + 8} y={NODE_H / 2 + 1} textAnchor="middle" dominantBaseline="middle"
                  fontSize={12} fontFamily="var(--font-jetbrains-mono), monospace" fill="#562F00">{node.label}</text>
              </motion.g>
            );
          })}
        </AnimatePresence>
      </svg>
    </div>
  );
}
