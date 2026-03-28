import { useEffect } from "react";
import type { Scene } from "./types";
import type { StackPhase } from "@/components/reusable/ExperienceBrick";

export function useBrickPhysics(
  stackPhase: StackPhase,
  sceneRef: React.RefObject<Scene>,
  goStack: (s: StackPhase) => void,
  setBootKey: React.Dispatch<React.SetStateAction<number>>,
) {
  // shattering → fallen: brief pause at shatter pose then kick bricks off
  useEffect(() => {
    if (stackPhase !== "shattering") return;
    const t = setTimeout(() => goStack("fallen"), 350);
    return () => clearTimeout(t);
  }, [stackPhase, goStack]);

  // fallen → boot
  useEffect(() => {
    if (stackPhase !== "fallen") return;
    const t1 = setTimeout(() => {
      goStack("initial");
      if (sceneRef.current === "fieldops") setBootKey((k) => k + 1);
    }, 1200);
    return () => { clearTimeout(t1); };
  }, [stackPhase, goStack, sceneRef, setBootKey]);
}
