"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReduced } from "@/lib/gsap";
import { Magnetic } from "@/components/ui";

function scrollToId(href: string) {
  const lenis = window.__lenis;
  if (lenis) lenis.scrollTo(href, { offset: -72, duration: 1.7, easing: (t: number) => 1 - Math.pow(1 - t, 4) });
  else document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
}

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let tl: gsap.core.Timeline | undefined;
    const play = () => tl?.play();
    let fallback: ReturnType<typeof setTimeout> | undefined;

    const ctx = gsap.context(() => {
      if (prefersReduced()) {
        gsap.set("[data-hero-fade], [data-hero-line]", { autoAlpha: 1, yPercent: 0 });
        return;
      }

      gsap.set("[data-hero-fade]", { autoAlpha: 0, y: 22 });
      gsap.set("[data-hero-line]", { yPercent: 112 });

      tl = gsap
        .timeline({ paused: true, defaults: { ease: "power4.out" } })
        .to("[data-hero-line]", { yPercent: 0, duration: 1.4, stagger: 0.14 }, 0.1)
        .to("[data-hero-fade]", { autoAlpha: 1, y: 0, duration: 1.1, stagger: 0.12 }, 0.55);

      if (window.__qimBooted) {
        play();
      } else {
        window.addEventListener("qim:booted", play, { once: true });
        // Safety net: never leave the hero blank if the boot event is missed
        // (generous — the boot film runs ~7s before dispatching)
        fallback = setTimeout(play, 12000);
      }
    }, root);

    return () => {
      window.removeEventListener("qim:booted", play);
      if (fallback) clearTimeout(fallback);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      id="top"
      data-chapter="HERO"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden pt-[9vh] text-center"
    >
      {/* Eyebrow */}
      <div data-hero-fade className="mb-7 flex items-center gap-3">
        <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-quantum" />
        <span className="hud-label !text-[0.62rem] text-silver/70">
          QUANTUM IMPACT — AI BUSINESS SYSTEMS
        </span>
      </div>

      {/* Headline */}
      <h1 className="section-pad relative font-display text-[clamp(2.7rem,7vw,6.3rem)] font-extrabold leading-[1.02] tracking-[-0.02em] text-white [text-shadow:0_2px_40px_rgba(4,5,5,0.85)]">
        <span className="block overflow-hidden pb-1">
          <span data-hero-line className="block">
            Building the <span className="text-gradient">Future</span>
          </span>
        </span>
        <span className="block overflow-hidden pb-2">
          <span data-hero-line className="block">
            of Business with AI.
          </span>
        </span>
      </h1>

      {/* Subline */}
      <p
        data-hero-fade
        className="section-pad mt-6 max-w-2xl text-base leading-relaxed text-silver/80 md:text-lg"
      >
        We don&rsquo;t sell marketing. We engineer intelligent systems — lead generation,
        CRM, and AI automation fused into one operating system that captures every
        opportunity and scales without chaos.
      </p>

      {/* CTAs */}
      <div data-hero-fade className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Magnetic>
          <a
            href="#consultation"
            onClick={(e) => {
              e.preventDefault();
              scrollToId("#consultation");
            }}
            className="group inline-flex items-center gap-3 rounded-full bg-quantum px-8 py-4 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-black transition-shadow duration-300 hover:shadow-[0_0_60px_-10px_rgba(57,255,20,0.75)]"
          >
            Request a Consultation
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
              <path d="M5 12h14m0 0-6-6m6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </Magnetic>
        <Magnetic>
          <a
            href="#system"
            onClick={(e) => {
              e.preventDefault();
              scrollToId("#system");
            }}
            className="inline-flex items-center gap-3 rounded-full border border-white/15 px-8 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-white transition-colors duration-300 hover:border-electric/70 hover:text-electric"
          >
            Explore the System
          </a>
        </Magnetic>
      </div>

      {/* HUD corners */}
      <div data-hero-fade className="pointer-events-none absolute bottom-7 left-6 hidden text-left md:block">
        <p className="font-mono text-[9px] leading-relaxed tracking-[0.28em] text-silver/40">
          25.7617° N — 80.1918° W
          <br />
          SOUTH FLORIDA HQ
        </p>
      </div>
      <div data-hero-fade className="pointer-events-none absolute bottom-7 right-6 hidden text-right md:block">
        <p className="font-mono text-[9px] leading-relaxed tracking-[0.28em] text-silver/40">
          SYSTEM STATUS
          <br />
          <span className="text-quantum">● ONLINE</span>
        </p>
      </div>

      {/* Scroll cue */}
      <div data-hero-fade className="absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2.5">
        <span className="hud-label !text-[0.55rem]">SCROLL TO INITIALIZE</span>
        <span className="relative block h-9 w-px overflow-hidden bg-white/12">
          <span className="absolute left-0 top-0 h-3 w-px animate-[scrollcue_1.8s_ease-in-out_infinite] bg-quantum" />
        </span>
        <style>{`@keyframes scrollcue{0%{transform:translateY(-14px)}70%,100%{transform:translateY(40px)}}`}</style>
      </div>
    </section>
  );
}
