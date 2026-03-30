"use client";

import { useEffect, useRef } from "react";
import type { LeavingPhase } from "./types";

const EXPERTISE_IDX = 3;

export function useExpertiseScrollGuard(
  phaseRef: React.RefObject<LeavingPhase>,
  startLeaving: () => void,
) {
  const touchStartYRef = useRef(0);

  useEffect(() => {
    const atExpertise = () => {
      const h = window.innerHeight;
      const idx = Math.round(window.scrollY / h);
      return idx === EXPERTISE_IDX;
    };

    const onWheel = (e: WheelEvent) => {
      if (!atExpertise()) return;
      if (e.deltaY <= 0) return;
      const p = phaseRef.current;
      if (p === "complete") return;
      e.stopImmediatePropagation();
      e.preventDefault();
      if (p === "idle") startLeaving();
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (!atExpertise()) return;
      if (!["ArrowDown", "ArrowRight", " ", "PageDown"].includes(e.key)) return;
      if (
        e.key === " " &&
        (document.activeElement instanceof HTMLInputElement ||
          document.activeElement instanceof HTMLTextAreaElement)
      ) return;
      const p = phaseRef.current;
      if (p === "complete") return;
      e.stopImmediatePropagation();
      e.preventDefault();
      if (p === "idle") startLeaving();
    };

    const onTouchStart = (e: TouchEvent) => {
      touchStartYRef.current = e.touches[0].clientY;
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (!atExpertise()) return;
      const swipedDown = touchStartYRef.current - e.changedTouches[0].clientY > 40;
      if (!swipedDown) return;
      const p = phaseRef.current;
      if (p === "complete") return;
      e.stopImmediatePropagation();
      if (p === "idle") startLeaving();
    };

    window.addEventListener("wheel", onWheel, { passive: false, capture: true });
    window.addEventListener("keydown", onKeyDown, { capture: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true, capture: true });
    window.addEventListener("touchend", onTouchEnd, { capture: true });
    return () => {
      window.removeEventListener("wheel", onWheel, { capture: true });
      window.removeEventListener("keydown", onKeyDown, { capture: true });
      window.removeEventListener("touchstart", onTouchStart, { capture: true });
      window.removeEventListener("touchend", onTouchEnd, { capture: true });
    };
  }, [phaseRef, startLeaving]);
}
