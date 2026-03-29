"use client";

import {
  createContext, ReactNode, useContext, useEffect, useState,
} from "react";
import { createPortal } from "react-dom";
import { useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import FloatingTooltip from "./FloatingTooltip";
import { useMounted } from "@/hooks/useMounted";
import type { TooltipContextType } from "./types";

const TooltipCtx = createContext<TooltipContextType | null>(null);

export function useTooltip(): TooltipContextType {
  const ctx = useContext(TooltipCtx);
  if (!ctx) throw new Error("useTooltip must be used inside <TooltipProvider>");
  return ctx;
}

/**
 * Mount once at the layout root (inside ThemeProvider).
 *
 * Mouse coordinates are tracked with useMotionValue + useSpring so the
 * tooltip position updates bypass the React render cycle entirely.
 * damping:25 / stiffness:120 produces a smooth "trailing" feel.
 *
 * show() / hide() do cause a single state update (to swap content), but
 * those are triggered only on pointer-enter/leave — not on every move.
 */
export default function TooltipProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<ReactNode>(null);
  const domReady = useMounted();

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 120, damping: 25 });
  const y = useSpring(rawY, { stiffness: 120, damping: 25 });

  useEffect(() => {
    const handler = (e: PointerEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
    };
    window.addEventListener("pointermove", handler);
    return () => window.removeEventListener("pointermove", handler);
  }, [rawX, rawY]);

  const show = (c: ReactNode) => setContent(c);
  const hide = () => setContent(null);

  return (
    <TooltipCtx.Provider value={{ show, hide }}>
      {children}
      {domReady && createPortal(
        <AnimatePresence>
          {content && (
            <FloatingTooltip key="floating-tip" content={content} x={x} y={y} />
          )}
        </AnimatePresence>,
        document.body,
      )}
    </TooltipCtx.Provider>
  );
}
