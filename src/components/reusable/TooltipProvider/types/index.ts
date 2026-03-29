import type { ReactNode } from "react";

export interface TooltipContextType {
  show: (content: ReactNode) => void;
  hide: () => void;
}
