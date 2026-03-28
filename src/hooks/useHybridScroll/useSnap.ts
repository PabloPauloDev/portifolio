import { useEffect } from "react";
import { N } from "./constants";

export function useSnap() {
  useEffect(() => {
    let locked = false;
    let touchStartY = 0;

    function snapTo(dir: 1 | -1) {
      if (locked) return;
      locked = true;
      const h = window.innerHeight;
      const current = Math.round(window.scrollY / h);
      const next = Math.max(0, Math.min(N - 1, current + dir));
      window.scrollTo({ top: next * h, behavior: "smooth" });
      setTimeout(() => { locked = false; }, 950);
    }

    function onWheel(e: WheelEvent) {
      e.preventDefault();
      snapTo(e.deltaY > 0 ? 1 : -1);
    }

    function onTouchStart(e: TouchEvent) {
      touchStartY = e.touches[0].clientY;
    }

    function onTouchEnd(e: TouchEvent) {
      const diff = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(diff) > 40) snapTo(diff > 0 ? 1 : -1);
    }

    function onKeyDown(e: KeyboardEvent) {
      if (["ArrowDown", "ArrowRight", " "].includes(e.key)) {
        e.preventDefault(); snapTo(1);
      } else if (["ArrowUp", "ArrowLeft"].includes(e.key)) {
        e.preventDefault(); snapTo(-1);
      }
    }

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);
}
