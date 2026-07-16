"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, prefersReduced } from "@/lib/gsap";
import { LOOP_NODES } from "@/lib/data";
import { SectionTag, SplitHeading, Reveal } from "@/components/ui";
import VideoBackdrop from "@/components/VideoBackdrop";

export default function GrowthLoop() {
  const rootRef = useRef<HTMLElement>(null);
  const spineFillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      if (prefersReduced()) {
        gsap.set("[data-loop-dot]", { backgroundColor: "#39ff14", borderColor: "rgba(57,255,20,0.6)" });
        if (spineFillRef.current) spineFillRef.current.style.transform = "scaleY(1)";
        return;
      }

      // Spine draws itself as the loop scrolls
      gsap.fromTo(
        spineFillRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-diagram]",
            start: "top 72%",
            end: "bottom 58%",
            scrub: 0.4,
          },
        }
      );

      // Nodes ignite as the energy reaches them
      const isMd = window.matchMedia("(min-width: 768px)").matches;
      root.querySelectorAll<HTMLElement>("[data-loop-row]").forEach((row, i) => {
        const dot = row.querySelector("[data-loop-dot]");
        const card = row.querySelector("[data-loop-card]");
        gsap.set(card, { x: isMd ? (i % 2 === 1 ? 46 : -46) : 28 });
        ScrollTrigger.create({
          trigger: row,
          start: "top 64%",
          onEnter: () => {
            gsap.to(dot, {
              backgroundColor: "#39ff14",
              borderColor: "rgba(57,255,20,0.65)",
              boxShadow: "0 0 22px 2px rgba(57,255,20,0.55)",
              scale: 1.18,
              duration: 0.5,
              ease: "back.out(3)",
            });
            gsap.to(card, { autoAlpha: 1, x: 0, duration: 0.9, ease: "power3.out" });
          },
          once: true,
        });
      });

      // Continuous energy packets flowing down the spine
      const spine = root.querySelector<HTMLElement>("[data-spine]");
      root.querySelectorAll<HTMLElement>("[data-packet]").forEach((p, i) => {
        gsap.fromTo(
          p,
          { y: 0, opacity: 0 },
          {
            y: () => (spine ? spine.offsetHeight - 10 : 600),
            keyframes: { opacity: [0, 0.9, 0.9, 0] },
            duration: 7.5,
            delay: i * 2.5,
            repeat: -1,
            ease: "none",
            scrollTrigger: { trigger: "[data-diagram]", start: "top 85%", toggleActions: "play pause resume pause" },
            invalidateOnRefresh: true,
          }
        );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="growth-loop"
      data-chapter="GROWTH LOOP"
      className="relative overflow-hidden bg-[#040505] py-28 md:py-40"
    >
      <VideoBackdrop
        src="/media/node-chain.mp4"
        poster="/media/node-chain.webp"
        className="opacity-[0.16]"
      />

      <div className="section-pad relative mx-auto max-w-6xl">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Reveal>
            <SectionTag index="04">THE GROWTH LOOP</SectionTag>
          </Reveal>
          <SplitHeading className="mt-7 font-display text-[clamp(2rem,4.6vw,3.8rem)] font-extrabold leading-[1.05] tracking-[-0.02em] text-white">
            One system. Every opportunity captured.
          </SplitHeading>
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-silver/75 md:text-lg">
              From first click to repeat customer — an autonomous loop where every
              stage feeds the next, and the whole machine compounds.
            </p>
          </Reveal>
        </div>

        {/* Diagram */}
        <div data-diagram className="relative mt-20">
          {/* Loop-back conduit (desktop) */}
          <div className="pointer-events-none absolute -right-2 top-10 bottom-10 hidden w-24 lg:block" aria-hidden="true">
            <svg className="h-full w-full" viewBox="0 0 100 1000" preserveAspectRatio="none" fill="none">
              <path
                d="M 0 992 H 55 Q 92 992 92 950 V 50 Q 92 8 55 8 H 8"
                stroke="rgba(0,207,255,0.35)"
                strokeWidth="1.5"
                strokeDasharray="7 9"
                vectorEffect="non-scaling-stroke"
                className="animate-[dashflow_3.5s_linear_infinite]"
              />
            </svg>
            <svg className="absolute left-0 top-[3px] h-3 w-3 text-electric/70" viewBox="0 0 12 12" fill="currentColor">
              <path d="M12 6 2 0v12L12 6Z" transform="rotate(180 6 6)" />
            </svg>
            <span
              className="absolute -right-1 top-1/2 -translate-y-1/2 font-mono text-[9px] uppercase tracking-[0.42em] text-electric/60"
              style={{ writingMode: "vertical-rl" }}
            >
              THE LOOP COMPOUNDS
            </span>
            <style>{`@keyframes dashflow{to{stroke-dashoffset:-64}}`}</style>
          </div>

          {/* Spine */}
          <div
            data-spine
            className="absolute bottom-6 left-[7px] top-6 w-px bg-white/10 md:left-1/2 md:-translate-x-1/2"
            aria-hidden="true"
          >
            <div
              ref={spineFillRef}
              className="absolute inset-0 origin-top scale-y-0 bg-gradient-to-b from-quantum via-quantum to-electric shadow-[0_0_14px_rgba(57,255,20,0.5)]"
            />
            <div data-packet className="absolute -left-[3px] top-0 h-[7px] w-[7px] rounded-full bg-quantum opacity-0 shadow-[0_0_12px_3px_rgba(57,255,20,0.6)]" />
            <div data-packet className="absolute -left-[3px] top-0 h-[7px] w-[7px] rounded-full bg-electric opacity-0 shadow-[0_0_12px_3px_rgba(0,207,255,0.6)]" />
            <div data-packet className="absolute -left-[3px] top-0 h-[7px] w-[7px] rounded-full bg-quantum opacity-0 shadow-[0_0_12px_3px_rgba(57,255,20,0.6)]" />
          </div>

          <ol className="relative flex flex-col gap-10 md:gap-6">
            {LOOP_NODES.map((node, i) => {
              const right = i % 2 === 1;
              return (
                <li
                  key={node.index}
                  data-loop-row
                  className={`relative grid grid-cols-[24px_1fr] items-center gap-5 md:grid-cols-[1fr_56px_1fr] md:gap-0`}
                >
                  {/* Node dot */}
                  <span className="order-1 flex justify-center md:order-2 md:col-start-2">
                    <span
                      data-loop-dot
                      className="relative z-10 block h-3.5 w-3.5 rounded-full border border-white/25 bg-carbon transition-colors"
                    />
                  </span>

                  {/* Card */}
                  <div
                    data-loop-card
                    className={`invisible order-2 opacity-0 md:order-none ${
                      right
                        ? "md:col-start-3 md:justify-self-start md:pl-4"
                        : "md:col-start-1 md:justify-self-end md:pr-4"
                    }`}
                  >
                    <div className="glass w-full max-w-md rounded-xl p-5 md:p-6">
                      <div className="flex items-baseline gap-3">
                        <span className="font-mono text-[10px] tracking-[0.28em] text-quantum/85">{node.index}</span>
                        <h3 className="font-display text-lg font-bold tracking-tight text-white md:text-xl">
                          {node.title}
                        </h3>
                        {node.index === "08" && (
                          <svg viewBox="0 0 24 24" className="h-4 w-4 text-electric" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M3 12a9 9 0 1 1 2.6 6.3M3 22v-5h5" />
                          </svg>
                        )}
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-silver/70">{node.desc}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <Reveal className="mt-16 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.34em] text-silver/50">
            REVIEW FEEDS REPUTATION — REPUTATION FEEDS TRAFFIC — <span className="text-quantum">THE MACHINE COMPOUNDS</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
