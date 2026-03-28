import { SECTION_KEYS, GRID } from "@/hooks/useHybridScroll";

export const CELL = 18;
export const DOT_R = 3;
export const COLS = 4;
export const ROWS = 4;
export const MAP_W = COLS * CELL + 4;
export const MAP_H = ROWS * CELL + 4;

export const pathD = SECTION_KEYS.map((k, i) => {
  const [col, row] = GRID[k];
  const px = col * CELL + CELL / 2;
  const py = row * CELL + CELL / 2;
  return `${i === 0 ? "M" : "L"} ${px} ${py}`;
}).join(" ");
