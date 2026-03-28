import type { TargetAndTransition, Transition } from "framer-motion";

export interface Job {
  id:          string;
  period:      string;
  role:        string;
  company:     string;
  description: string;
  tech:        readonly string[];
  accent:      string;
  rot:         number;
}

export type StackPhase = "initial" | "dropping" | "resting" | "shattering" | "fallen";

export function brickAnimate(phase: StackPhase, rot: number): TargetAndTransition {
  switch (phase) {
    case "initial":    return { y: -900,  opacity: 0, rotate: 0,         scale: 1    };
    case "dropping":
    case "resting":    return { y: 0,     opacity: 1, rotate: rot,       scale: 1    };
    case "shattering": return { y: 0,     opacity: 1, rotate: rot * 1.6, scale: 0.96 };
    case "fallen":     return { y: 1200,  opacity: 1, rotate: rot * 5,   scale: 0.9  };
  }
}

export function brickTransition(phase: StackPhase, index: number): Transition {
  switch (phase) {
    case "dropping":   return { type: "spring", bounce: 0.36, duration: 1.05, delay: index * 0.15 };
    case "shattering": return { duration: 0.18, ease: "easeOut" };
    case "fallen":     return { ease: "easeIn", duration: 0.65, delay: index * 0.06 };
    default:           return { duration: 0 };
  }
}
