"use client";
import { useEffect, useRef } from "react";

const W = 80, H = 23;
const CHARS = ".,-~:;=!*#$@";

function frame(A: number, B: number): string {
  const z = new Float32Array(W * H);
  const b = new Uint8Array(W * H).fill(32);
  for (let j = 0; j < 6.28; j += 0.07) {
    for (let i = 0; i < 6.28; i += 0.02) {
      const c=Math.sin(i), d=Math.cos(j), e=Math.sin(A), f=Math.sin(j), g=Math.cos(A);
      const h=d+2, D=1/(c*h*e+f*g+5), l=Math.cos(i), m=Math.cos(B), n=Math.sin(B);
      const t=c*h*g-f*e;
      const x=Math.floor(40+30*D*(l*h*m-t*n));
      const y=Math.floor(12+15*D*(l*h*n+t*m));
      const o=x+W*y;
      const N=Math.floor(8*((f*e-c*d*g)*m-c*d*e-f*g-l*d*n));
      if (y>=0 && y<H && x>=0 && x<W && D>z[o]) {
        z[o]=D; b[o]=CHARS.charCodeAt(N>0?N:0);
      }
    }
  }
  let s = "";
  for (let k = 0; k < W*H; k++) s += (k%W===W-1) ? (k<W*(H-1)?"\n":"") : String.fromCharCode(b[k]);
  return s;
}

export default function DoughnutAnimation() {
  const ref = useRef<HTMLPreElement>(null);
  const A = useRef(0), B = useRef(0), raf = useRef(0);

  useEffect(() => {
    let live = true;
    const tick = () => {
      if (!live) return;
      if (ref.current) ref.current.textContent = frame(A.current, B.current);
      A.current += 0.02;
      B.current += 0.01;
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => { live = false; cancelAnimationFrame(raf.current); };
  }, []);

  return (
    <pre ref={ref} className="font-mono shrink-0"
      style={{ fontSize: 9, lineHeight: "10px", color: "rgba(255,150,68,0.6)",
        userSelect: "none", pointerEvents: "none" }} />
  );
}
