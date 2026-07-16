"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReduced } from "@/lib/gsap";
import { PROCESS_STEPS } from "@/lib/data";
import { SectionTag, SplitHeading, Reveal } from "@/components/ui";

export default function Process() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      if (prefersReduced()) return;
      gsap.fromTo(
        "[data-process-line]",
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-process-track]",
            start: "top 78%",
            end: "bottom 55%",
            scrub: 0.4,
          },
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="process"
      data-chapter="PROCESS"
      className="relative overflow-hidden bg-[#040505] py-28 md:py-40"
    >
      <div className="section-pad relative mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <Reveal>
            <SectionTag index="07">THE PROCESS</SectionTag>
          </Reveal>
          <SplitHeading className="mt-7 font-display text-[clamp(2rem,4.4vw,3.6rem)] font-extrabold leading-[1.06] tracking-[-0.02em] text-white">
            From chaos to system in five phases.
          </SplitHeading>
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-silver/75 md:text-lg">
              Strategy before tactics. Architecture before ads. Every engagement
              follows the same engineering discipline.
            </p>
          </Reveal>
        </div>

        <div data-process-track className="relative mt-16">
          {/* Draw-on progress rail (desktop) */}
          <div className="absolute left-0 right-0 top-[7px] hidden h-px bg-white/10 lg:block" aria-hidden="true">
            <div
              data-process-line
              className="h-full w-full origin-left scale-x-0 bg-gradient-to-r from-quantum to-electric shadow-[0_0_12px_rgba(57,255,20,0.45)]"
            />
          </div>

          <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
            {PROCESS_STEPS.map((step, i) => (
              <Reveal key={step.index} delay={i * 0.08}>
                <li className="relative">
                  <span className="relative z-10 block h-3.5 w-3.5 rounded-full border border-quantum/60 bg-[#040505] shadow-[0_0_14px_rgba(57,255,20,0.4)]">
                    <span className="absolute inset-[3px] rounded-full bg-quantum" />
                  </span>
                  <p className="mt-6 font-mono text-[10px] tracking-[0.3em] text-quantum/85">{step.index}</p>
                  <h3 className="mt-2.5 font-display text-lg font-bold tracking-tight text-white md:text-xl">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-silver/70">{step.desc}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
