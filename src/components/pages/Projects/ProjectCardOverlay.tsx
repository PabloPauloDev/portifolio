"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface ProjectCardOverlayProps {
  hovered: boolean;
  hasStory: boolean;
  id: string;
}

export default function ProjectCardOverlay({ hovered, hasStory, id }: ProjectCardOverlayProps) {
  return (
    <AnimatePresence>
      {hovered && hasStory && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          style={{ background: "rgba(255,253,241,0.68)", backdropFilter: "blur(3px)" }}
        >
          <motion.div
            initial={{ scale: 0.82, y: 10, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.88, y: 6, opacity: 0 }}
            transition={{ type: "spring", stiffness: 420, damping: 24, mass: 0.7 }}
          >
            <Link
              href={`/projects/${id}/story`}
              className="inline-flex items-center gap-2 px-5 py-2.5
                         font-mono text-xs font-semibold rounded-xl
                         shadow-lg shadow-rust/20 transition-colors duration-150"
              style={{ background: "#562F00", color: "#FFFDF1", border: "1.5px solid rgba(255,150,68,0.35)" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#FF9644"; e.currentTarget.style.color = "#562F00"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#562F00"; e.currentTarget.style.color = "#FFFDF1"; }}
            >
              Architecture Story →
            </Link>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
