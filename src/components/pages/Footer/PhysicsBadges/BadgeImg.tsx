"use client";

import { certifications } from "@/data/certifications";

const BADGE_SIZE = 56;
const RECT_W = 72;
const RECT_H = 48;
const HEX_CLIP = "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)";

interface Props {
  index: number;
  setRef: (el: HTMLImageElement | null) => void;
}

export function BadgeImg({ index, setRef }: Props) {
  const cert = certifications[index];
  const isHex = cert.shape === "hexagon";
  const w = isHex ? BADGE_SIZE : RECT_W;
  const h = isHex ? BADGE_SIZE : RECT_H;
  return (
    // eslint-disable-next-line -- physics-synced DOM; next/image incompatible with direct ref transforms
    <img
      ref={setRef}
      src={cert.badgeUrl}
      alt={cert.certificateName}
      draggable={false}
      data-cursor
      className="absolute top-0 left-0 select-none"
      style={{
        width: w, height: h,
        objectFit: "contain",
        willChange: "transform",
        pointerEvents: "auto",
        cursor: "grab",
        ...(isHex
          ? { clipPath: HEX_CLIP, borderRadius: 0 }
          : { borderRadius: 6, clipPath: "none" }),
      }}
    />
  );
}
