import type { TargetAndTransition, Transition } from "framer-motion";

export type LeavingPhase = "idle" | "shrinking" | "falling" | "complete";

export function cardAnimate(phase: LeavingPhase): TargetAndTransition {
  switch (phase) {
    case "idle":      return { y: 0, opacity: 1 };
    case "shrinking": return { y: 0, opacity: 1 };
    case "falling":   return { y: 1400, opacity: 1 };
    case "complete":  return { y: 1400, opacity: 0 };
  }
}

export function cardTransition(phase: LeavingPhase, index: number): Transition {
  switch (phase) {
    case "shrinking": return { duration: 0 };
    case "falling":   return { ease: "easeIn", duration: 0.65, delay: index * 0.1 };
    case "complete":  return { duration: 0 };
    default:          return { duration: 0.3, ease: "easeOut" };
  }
}

export function textAnimate(phase: LeavingPhase): TargetAndTransition {
  switch (phase) {
    case "idle":      return { opacity: 1, y: 0 };
    case "shrinking": return { opacity: 0, y: -8 };
    case "falling":   return { opacity: 0, y: -8 };
    case "complete":  return { opacity: 0, y: -8 };
  }
}
