"use client";

import { motion } from "framer-motion";
import type { Blade } from "./types";
import RackEar from "./RackEar";
import RackTooltip from "./RackTooltip";
import { useTooltip } from "@/components/reusable/TooltipProvider";

interface Props {
  blade: Blade;
  index: number;
  isHovered: boolean;
  isDimmed: boolean;
  onHover: (id: string | null) => void;
}

export default function BladeRow({ blade, index, isHovered, isDimmed, onHover }: Props) {
  const { show, hide } = useTooltip();

  const handleEnter = () => {
    onHover(blade.id);
    show(<RackTooltip blade={blade} />);
  };

  const handleLeave = () => {
    onHover(null);
    hide();
  };

  return (
    <motion.div
      className="relative flex items-center cursor-pointer select-none"
      style={{
        flex: "1 1 0", minHeight: 0,
        borderBottom: index < 5 ? "1px solid rgba(86,47,0,0.15)" : "none",
        backgroundColor: isHovered
          ? "rgba(255,150,68,0.055)"
          : index % 2 === 0 ? "transparent" : "rgba(255,255,255,0.012)",
        transition: "background-color 0.2s",
      }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.06 * index, duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
    >
      <RackEar />
      <div className="shrink-0 px-3">
        <motion.div className="w-1.75 h-1.75 rounded-full" style={{ backgroundColor: "#FF9644" }}
          animate={{ opacity: isDimmed ? [0.4, 0.1, 0] : [1, 0.35, 1] }}
          transition={isDimmed
            ? { duration: 0.5 + index * 0.08, ease: "easeIn" }
            : { repeat: Infinity, duration: 1.4 + index * 0.2, ease: "easeInOut" }} />
      </div>
      <div className="flex-1 flex items-center min-w-0 pr-3">
        <span className="font-mono font-bold shrink-0"
          style={{ fontSize: 11, color: "rgba(255,150,68,0.82)", width: 120 }}>
          {blade.name.toUpperCase()}
        </span>
        <span className="font-mono shrink-0"
          style={{ fontSize: 10, color: "rgba(86,47,0,0.45)", width: 66 }}>
          :{blade.port}
        </span>
        <span className="font-mono shrink-0"
          style={{ fontSize: 10, color: "rgba(255,253,241,0.22)", width: 100 }}>
          {blade.type}
        </span>
        <span className="font-mono flex-1 min-w-0 text-right"
          style={{ fontSize: 10, color: "rgba(86,47,0,0.32)" }}>
          {blade.role}
        </span>
        <span className="font-mono shrink-0 ml-3"
          style={{ fontSize: 9, color: "rgba(255,150,68,0.3)" }}>
          ↑{blade.uptime}
        </span>
      </div>
      <RackEar />
    </motion.div>
  );
}
