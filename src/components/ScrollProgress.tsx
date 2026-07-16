"use client";

import { useEffect, useRef, useState } from "react";
import { ScrollTrigger, prefersReduced } from "@/lib/gsap";

/** Right-edge HUD: scroll percentage, progress rail, current chapter. */
export default function ScrollProgress() {
  const fillRef = useRef<HTMLDivElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);
  const [label, setLabel] = useState("HERO");

  useEffect(() => {
    if (prefersReduced()) return;

    const main = ScrollTrigger.create({
      trigger: document.documentElement,
      start: 0,
      end: () => document.documentElement.scrollHeight - window.innerHeight,
      onUpdate: (self) => {
        if (fillRef.current) fillRef.current.style.transform = `scaleY(${self.progress})`;
        if (pctRef.current) pctRef.current.textContent = `${String(Math.round(self.progress * 100)).padStart(2, "0")}%`;
      },
    });

    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-chapter]"));
    const triggers = sections.map((el) =>
      ScrollTrigger.create({
        trigger: el,
        start: "top 55%",
        end: "bottom 55%",
        onToggle: (self) => {
          if (self.isActive) setLabel(el.dataset.chapter || "");
        },
      })
    );

    return () => {
      main.kill();
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return (
    <div
      className="fixed right-6 top-1/2 z-[80] hidden -translate-y-1/2 flex-col items-center gap-4 xl:flex"
      aria-hidden="true"
    >
      <span ref={pctRef} className="font-mono text-[10px] tracking-[0.2em] text-silver/50">
        00%
      </span>
      <div className="h-36 w-px overflow-hidden rounded-full bg-white/10">
        <div
          ref={fillRef}
          className="h-full w-full origin-top scale-y-0 bg-gradient-to-b from-quantum to-electric"
        />
      </div>
      <span
        className="font-mono text-[9px] uppercase tracking-[0.42em] text-silver/45"
        style={{ writingMode: "vertical-rl" }}
      >
        {label}
      </span>
    </div>
  );
}
