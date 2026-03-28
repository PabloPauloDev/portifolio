export const SECTION_KEYS = [
  "home",
  "projects",
  "playground",
  "expertise",
  "whoami",
  "fieldops",
  "contact",
] as const;

export type SectionKey = (typeof SECTION_KEYS)[number];

export const GRID: Record<SectionKey, [col: number, row: number]> = {
  home:       [0, 0],
  projects:   [1, 0],
  playground: [2, 0],
  expertise:  [2, 1],
  whoami:     [2, 2],
  fieldops:   [2, 2],
  contact:    [2, 3],
};

export const N = SECTION_KEYS.length;

export const BREAKS = SECTION_KEYS.map((_, i) => i / (N - 1));

export const CANVAS_COLS = 4;
export const CANVAS_ROWS = 4;

export const NAV_SECTIONS: { label: string; index: number }[] = [
  { label: "home",     index: 0 },
  { label: "projects", index: 1 },
  { label: "diagrams", index: 2 },
  { label: "certs",    index: 3 },
  { label: "who_am_i", index: 4 },
  { label: "home_lab", index: 5 },
];

export function scrollToSection(index: number) {
  if (typeof window === "undefined") return;
  window.scrollTo({ top: index * window.innerHeight, behavior: "smooth" });
}

export function piecewise(breaks: number[], values: number[], t: number): number {
  for (let i = 0; i < breaks.length - 1; i++) {
    if (t <= breaks[i + 1]) {
      const pct = (t - breaks[i]) / (breaks[i + 1] - breaks[i]);
      return values[i] + pct * (values[i + 1] - values[i]);
    }
  }
  return values[values.length - 1];
}
