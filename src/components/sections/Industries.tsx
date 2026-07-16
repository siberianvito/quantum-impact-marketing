"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, prefersReduced } from "@/lib/gsap";
import { INDUSTRIES } from "@/lib/data";
import { SectionTag, SplitHeading, Reveal } from "@/components/ui";

function MarqueeRow({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const list = [...items, ...items];
  return (
    <div className="marquee-mask overflow-hidden">
      <div className={`flex w-max gap-3 ${reverse ? "animate-marquee-rev" : "animate-marquee"}`}>
        {list.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="glass flex items-center gap-3 whitespace-nowrap rounded-full px-6 py-3.5 font-display text-sm font-semibold tracking-wide text-silver/90"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-quantum to-electric" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Industries() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      if (prefersReduced()) return;
      ScrollTrigger.create({
        trigger: "[data-stats]",
        start: "top 80%",
        once: true,
        onEnter: () => {
          root.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
            const target = Number(el.dataset.count);
            const obj = { v: 0 };
            gsap.to(obj, {
              v: target,
              duration: 1.8,
              ease: "power2.out",
              onUpdate: () => {
                el.textContent = String(Math.round(obj.v));
              },
            });
          });
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="industries"
      data-chapter="INDUSTRIES"
      className="relative overflow-hidden bg-[#040505] py-28 md:py-40"
    >
      <div className="section-pad relative mx-auto max-w-7xl">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Reveal>
            <SectionTag index="06">BUILT FOR OPERATORS</SectionTag>
          </Reveal>
          <SplitHeading className="mt-7 font-display text-[clamp(2rem,4.4vw,3.6rem)] font-extrabold leading-[1.06] tracking-[-0.02em] text-white">
            Engineered for serious businesses.
          </SplitHeading>
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-silver/75 md:text-lg">
              We partner with established service businesses that are done duct-taping
              tools together — and ready to run on infrastructure.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="relative mt-14 flex flex-col gap-4">
        <MarqueeRow items={INDUSTRIES.slice(0, 6)} />
        <MarqueeRow items={INDUSTRIES.slice(6)} reverse />
      </div>

      <div data-stats className="section-pad relative mx-auto mt-16 grid max-w-5xl gap-4 sm:grid-cols-3">
        <Reveal>
          <div className="glass rounded-2xl p-7 text-center">
            <p className="font-mono text-4xl font-medium text-gradient">
              $<span data-count="500">0</span>K+
            </p>
            <p className="mt-3 font-mono text-[9.5px] uppercase tracking-[0.26em] text-silver/55">
              Annual revenue minimum
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="glass rounded-2xl p-7 text-center">
            <p className="font-mono text-4xl font-medium text-gradient">
              <span data-count="5">0</span>+
            </p>
            <p className="mt-3 font-mono text-[9.5px] uppercase tracking-[0.26em] text-silver/55">
              Team members & growing
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.16}>
          <div className="glass rounded-2xl p-7 text-center">
            <p className="font-mono text-4xl font-medium text-gradient">24/7</p>
            <p className="mt-3 font-mono text-[9.5px] uppercase tracking-[0.26em] text-silver/55">
              System uptime — multi-location ready
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
