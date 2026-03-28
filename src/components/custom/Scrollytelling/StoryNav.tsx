"use client";

import Link from "next/link";

interface StoryNavProps {
  projectTitle: string;
  chapterCount: number;
  active: number;
  onDotClick: (i: number) => void;
}

export default function StoryNav({ projectTitle, chapterCount, active, onDotClick }: StoryNavProps) {
  return (
    <div className="fixed top-0 left-0 right-0 z-[200] glass-card border-b border-rust/5">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="font-mono text-xs text-rust/50 hover:text-amber transition-colors">
          ← Back
        </Link>
        <span className="font-hand text-amber text-sm">
          {"/* "}{projectTitle}{" — Story Mode */"}
        </span>
        <div className="flex items-center gap-1.5">
          {Array.from({ length: chapterCount }, (_, i) => (
            <button key={i} onClick={() => onDotClick(i)} aria-label={`Chapter ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === active ? "w-5 bg-amber" : i < active ? "w-1.5 bg-rust/40" : "w-1.5 bg-rust/15"
              }`} />
          ))}
        </div>
      </div>
    </div>
  );
}
