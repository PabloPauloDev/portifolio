import { DiagramData } from "@/types/diagram";

interface TradeOff {
  problem: string;
  solution: string;
  tradeoff: string;
  win: string;
}

export interface ProjectDef {
  id: string;
  title: string;
  accent: string;
  tags: string[];
  diagram: DiagramData;
  hasStory: boolean;
  decisions: TradeOff;
}
