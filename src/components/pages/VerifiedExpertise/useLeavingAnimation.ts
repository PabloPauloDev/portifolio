"use client";

import { useState, useCallback, useRef } from "react";
import type { LeavingPhase } from "./types";

const SHRINK_DURATION = 300;
const FALL_DURATION = 900;

export function useLeavingAnimation(onComplete: () => void) {
  const [phase, setPhase] = useState<LeavingPhase>("idle");
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const startLeaving = useCallback(() => {
    if (phase !== "idle") return;
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];

    setPhase("shrinking");

    const t1 = setTimeout(() => setPhase("falling"), SHRINK_DURATION);
    const t2 = setTimeout(() => {
      setPhase("complete");
      onComplete();
    }, SHRINK_DURATION + FALL_DURATION);

    timersRef.current = [t1, t2];
  }, [phase, onComplete]);

  const reset = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    setPhase("idle");
  }, []);

  return { phase, startLeaving, reset };
}
