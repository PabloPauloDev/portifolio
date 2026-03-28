import { useEffect, useRef } from "react";
import type { Scene } from "./types";
import { BOOT_DELAYS } from "./constants";

export function useBootSequence(
  scene: Scene,
  bootKey: number,
  setBootCount: React.Dispatch<React.SetStateAction<number>>,
  setRackVisible: React.Dispatch<React.SetStateAction<boolean>>,
  setTermReady: React.Dispatch<React.SetStateAction<boolean>>,
) {
  const bootTimers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    if (scene !== "fieldops") return;
    bootTimers.current.forEach(clearTimeout);
    bootTimers.current = [];
    setBootCount(0);
    setRackVisible(false);
    setTermReady(false);

    BOOT_DELAYS.forEach((delay, i) => {
      bootTimers.current.push(setTimeout(() => setBootCount(i + 1), delay));
    });

    const shiftDelay = BOOT_DELAYS[BOOT_DELAYS.length - 1] + 600;
    bootTimers.current.push(setTimeout(() => setTermReady(true), shiftDelay));

    return () => bootTimers.current.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bootKey]);

  return bootTimers;
}
