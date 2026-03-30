"use client";

import { useEffect, useRef } from "react";

const W = 80;
const H = 22;
const CHARS = " .,-~:;=!*#$@";

export default function DonutBackground() {
  const preRef = useRef<HTMLPreElement>(null);
  const ARef = useRef(1);
  const BRef = useRef(0);

  useEffect(() => {
    let raf = 0;

    const render = () => {
      const zbuf = new Float32Array(W * H);
      const out = new Array<string>(W * H).fill(" ");
      const A = ARef.current;
      const B = BRef.current;
      const cosA = Math.cos(A), sinA = Math.sin(A);
      const cosB = Math.cos(B), sinB = Math.sin(B);

      for (let j = 0; j < 6.28; j += 0.07) {
        const cosJ = Math.cos(j), sinJ = Math.sin(j);
        for (let i = 0; i < 6.28; i += 0.02) {
          const cosI = Math.cos(i), sinI = Math.sin(i);
          const h = cosJ + 2;
          const D = 1 / (sinI * h * sinA - sinJ * cosA + 5);
          const t = sinI * h * cosA + sinJ * sinA;
          const x = Math.floor(W / 2 + (W / 3) * D * (cosI * h * cosB - t * sinB));
          const y = Math.floor(H / 2 + (H / 2) * D * (cosI * h * sinB + t * cosB));
          const o = x + W * y;
          const raw = Math.floor(8 * (
            (sinJ * sinA - sinI * cosJ * cosA) * cosB
            - sinI * cosJ * sinA - sinJ * cosA - cosI * cosJ * sinB
          ));
          const L = Math.max(0, Math.min(CHARS.length - 1, raw));
          if (y >= 0 && y < H && x >= 0 && x < W && D > zbuf[o]) {
            zbuf[o] = D;
            out[o] = CHARS[L];
          }
        }
      }

      const rows: string[] = [];
      for (let row = 0; row < H; row++) rows.push(out.slice(row * W, (row + 1) * W).join(""));
      if (preRef.current) preRef.current.textContent = rows.join("\n");

      ARef.current += 0.07;
      BRef.current += 0.03;
      raf = requestAnimationFrame(render);
    };

    raf = requestAnimationFrame(render);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      className="absolute inset-0 pointer-events-none select-none overflow-hidden flex items-center justify-center"
      style={{ opacity: 0.08 }}
    >
      <pre
        ref={preRef}
        style={{
          color: "var(--rust)",
          fontFamily: "monospace",
          fontSize: 10,
          lineHeight: 1.2,
          whiteSpace: "pre",
          margin: 0,
        }}
      />
    </div>
  );
}
