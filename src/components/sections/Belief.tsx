"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReduced } from "@/lib/gsap";
import VideoBackdrop from "@/components/VideoBackdrop";

const PHASE_A = [
  { text: "Businesses don't fail because they lack leads.", accent: [] as number[] },
  { text: "They fail because they lack systems.", accent: [6] },
];
const PHASE_B = [
  { text: "Marketing attracts attention.", accent: [] as number[] },
  { text: "Systems create businesses.", accent: [0] },
];

function Words({ lines, phase }: { lines: typeof PHASE_A; phase: string }) {
  return (
    <div data-phase={phase} className="flex flex-col gap-6">
      {lines.map((line, li) => (
        <p
          key={li}
          className="font-display text-[clamp(1.7rem,4.6vw,3.9rem)] font-bold leading-[1.14] tracking-[-0.015em]"
        >
          {line.text.split(" ").map((w, wi) => (
            <span
              key={wi}
              data-belief-word
              className={`mr-[0.28em] inline-block opacity-[0.13] ${
                line.accent.includes(wi) ? "text-gradient" : "text-white"
              }`}
            >
              {w}
            </span>
          ))}
        </p>
      ))}
    </div>
  );
}

export default function Belief() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      if (prefersReduced()) {
        gsap.set("[data-belief-word]", { opacity: 1 });
        gsap.set("[data-stamp]", { autoAlpha: 1, scale: 1 });
        return;
      }

      const phaseA = root.querySelectorAll("[data-phase='a'] [data-belief-word]");
      const phaseB = root.querySelectorAll("[data-phase='b'] [data-belief-word]");

      gsap
        .timeline({
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5,
          },
          defaults: { ease: "none" },
        })
        // Phase A illuminates word by word
        .to(phaseA, { opacity: 1, stagger: 0.5, duration: 1.4 })
        .to({}, { duration: 1.5 }) // hold
        .to("[data-phase='a']", { autoAlpha: 0, y: -46, duration: 2 })
        .fromTo("[data-phase='b']", { autoAlpha: 0, y: 46 }, { autoAlpha: 1, y: 0, duration: 2 }, "<0.6")
        .to(phaseB, { opacity: 1, stagger: 0.7, duration: 1.4 })
        .to({}, { duration: 1.5 })
        .to("[data-phase='b']", { autoAlpha: 0, y: -46, duration: 2 })
        // The stamp
        .fromTo(
          "[data-stamp]",
          { autoAlpha: 0, scale: 0.86 },
          { autoAlpha: 1, scale: 1, duration: 2.6, ease: "power2.out" },
          "<0.4"
        )
        .to({}, { duration: 2 });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="belief"
      data-chapter="THE BELIEF"
      className="relative h-[380vh] bg-[#040505]"
    >
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <VideoBackdrop
          src="/media/frozen-glass.mp4"
          poster="/media/frozen-glass.webp"
          className="opacity-40"
        />

        <div className="section-pad relative z-10 mx-auto grid max-w-5xl place-items-center text-center">
          <div className="col-start-1 row-start-1">
            <Words lines={PHASE_A} phase="a" />
          </div>
          <div className="col-start-1 row-start-1">
            <Words lines={PHASE_B} phase="b" />
          </div>

          {/* Final stamp */}
          <div data-stamp className="invisible col-start-1 row-start-1 flex flex-col items-center gap-6 opacity-0">
            <span className="hud-label">OUR BELIEF</span>
            <p className="font-display text-[clamp(2.2rem,6vw,5.2rem)] font-extrabold leading-[1.04] tracking-[-0.02em]">
              <span className="text-gradient drop-glow">Systems scale.</span>
              <br />
              <span className="text-white">Chaos doesn&rsquo;t.</span>
            </p>
            <span className="hud-rule w-40" />
          </div>
        </div>
      </div>
    </section>
  );
}
