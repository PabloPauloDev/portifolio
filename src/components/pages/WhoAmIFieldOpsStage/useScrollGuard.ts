import { useEffect, useRef } from "react";
import type { ShutdownPhase } from "./types";
import { FIELD_OPS_IDX } from "./types";

export function useScrollGuard(
  currentIdxRef: React.RefObject<number>,
  shutdownRef: React.RefObject<ShutdownPhase>,
  isExiting: React.RefObject<boolean>,
  startShutdown: () => void,
) {
  const touchStartYRef = useRef(0);

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (currentIdxRef.current !== FIELD_OPS_IDX) return;
      if (e.deltaY <= 0) return;
      if (shutdownRef.current === "done") return;
      e.stopImmediatePropagation();
      e.preventDefault();
      if (shutdownRef.current === "idle") {
        isExiting.current = true;
        startShutdown();
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (currentIdxRef.current !== FIELD_OPS_IDX) return;
      if (!["ArrowDown", "ArrowRight", " ", "PageDown"].includes(e.key)) return;
      if (shutdownRef.current === "done") return;      // Let the terminal input handle its own spacebar — don't intercept
      // when the user is typing in a focused text field.
      if (
        e.key === " " &&
        (document.activeElement instanceof HTMLInputElement ||
          document.activeElement instanceof HTMLTextAreaElement)
      ) return;      e.stopImmediatePropagation();
      e.preventDefault();
      if (shutdownRef.current === "idle") {
        isExiting.current = true;
        startShutdown();
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      touchStartYRef.current = e.touches[0].clientY;
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (currentIdxRef.current !== FIELD_OPS_IDX) return;
      if (shutdownRef.current === "done") return;
      const swipedDown = touchStartYRef.current - e.changedTouches[0].clientY > 40;
      if (!swipedDown) return;
      e.stopImmediatePropagation();
      if (shutdownRef.current === "idle") {
        isExiting.current = true;
        startShutdown();
      }
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
  }, [startShutdown, currentIdxRef, shutdownRef, isExiting]);
}
