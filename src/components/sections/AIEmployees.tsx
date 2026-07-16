"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, prefersReduced } from "@/lib/gsap";
import { AI_EMPLOYEES } from "@/lib/data";
import { SectionTag, SplitHeading, Reveal, useGlowCards } from "@/components/ui";

const CHAT: Array<{ from: "system" | "lead" | "ai"; text: string; meta?: string }> = [
  { from: "system", text: "NEW LEAD CAPTURED — GOOGLE ADS · 10:42:07 PM" },
  { from: "lead", text: "Hi, do you handle emergency AC repair in Coral Gables?" },
  { from: "ai", text: "Hi! Yes we do — and we have a technician available tomorrow morning. Want me to reserve 9:30 AM for you?", meta: "AI RESPONSE · 4 SECONDS LATER" },
  { from: "lead", text: "Yes please." },
  { from: "ai", text: "Done — you're booked for 9:30 AM. Confirmation just sent by text and email. Anything else I can help with?", meta: "APPOINTMENT CREATED" },
  { from: "system", text: "CRM UPDATED → TEAM NOTIFIED → REVIEW REQUEST SCHEDULED" },
];

export default function AIEmployees() {
  const rootRef = useRef<HTMLElement>(null);
  const gridRef = useGlowCards();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const bubbles = root.querySelectorAll("[data-bubble]");
      if (prefersReduced()) {
        gsap.set(bubbles, { autoAlpha: 1, y: 0 });
        return;
      }
      gsap.set(bubbles, { autoAlpha: 0, y: 18 });
      ScrollTrigger.create({
        trigger: "[data-terminal]",
        start: "top 70%",
        once: true,
        onEnter: () => {
          gsap.to(bubbles, {
            autoAlpha: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.55,
            ease: "power2.out",
          });
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="ai-workforce"
      data-chapter="AI WORKFORCE"
      className="relative overflow-hidden bg-[#040505] py-28 md:py-40"
    >
      <div className="pointer-events-none absolute right-[-15%] top-[-10%] h-[560px] w-[560px] animate-aurora rounded-full bg-electric/[0.05] blur-[130px]" />
      <div className="pointer-events-none absolute bottom-[-20%] left-[-10%] h-[520px] w-[520px] animate-aurora rounded-full bg-quantum/[0.04] blur-[120px] [animation-delay:-9s]" />

      <div className="section-pad relative mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <Reveal>
            <SectionTag index="05">AI WORKFORCE</SectionTag>
          </Reveal>
          <SplitHeading className="mt-7 font-display text-[clamp(2.1rem,5vw,4.2rem)] font-extrabold leading-[1.04] tracking-[-0.02em] text-white">
            Your next employee isn&rsquo;t human.
          </SplitHeading>
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-silver/75 md:text-lg">
              Meet the AI team members we train on your business — answering,
              booking, qualifying, and following up in seconds. They never sleep,
              never miss a call, and never let a lead go cold.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          {/* Employee roster */}
          <div ref={gridRef} className="grid gap-4 sm:grid-cols-2">
            {AI_EMPLOYEES.map((emp) => (
              <Reveal key={emp.code}>
                <div className="glow-card glass h-full rounded-2xl p-6">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] tracking-[0.3em] text-quantum/85">{emp.code}</span>
                    <span className="flex items-center gap-2 font-mono text-[9px] tracking-[0.2em] text-quantum">
                      <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-quantum" />
                      ACTIVE
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-lg font-bold tracking-tight text-white">{emp.role}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-silver/70">{emp.line}</p>
                  <ul className="mt-5 flex flex-col gap-1.5">
                    {emp.caps.map((c) => (
                      <li key={c} className="flex items-center gap-2 font-mono text-[9.5px] uppercase tracking-[0.16em] text-silver/60">
                        <span className="text-quantum/70">▸</span> {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Live follow-up terminal */}
          <Reveal delay={0.15}>
            <div data-terminal className="glass-deep overflow-hidden rounded-2xl">
              <div className="flex items-center justify-between border-b border-white/8 px-5 py-3.5">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                  <span className="h-2.5 w-2.5 rounded-full bg-quantum/60" />
                </div>
                <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-silver/55">
                  QUANTUM OS — LIVE FOLLOW-UP
                </span>
              </div>
              <div className="flex flex-col gap-3.5 p-5 md:p-6">
                {CHAT.map((m, i) => {
                  if (m.from === "system") {
                    return (
                      <p key={i} data-bubble className="py-1 text-center font-mono text-[8.5px] uppercase tracking-[0.26em] text-electric/65">
                        ─ {m.text} ─
                      </p>
                    );
                  }
                  const ai = m.from === "ai";
                  return (
                    <div key={i} data-bubble className={`flex flex-col ${ai ? "items-start" : "items-end"}`}>
                      {m.meta && (
                        <span className="mb-1 font-mono text-[8px] uppercase tracking-[0.24em] text-quantum/75">{m.meta}</span>
                      )}
                      <div
                        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                          ai
                            ? "rounded-tl-sm border border-quantum/25 bg-quantum/[0.07] text-white"
                            : "rounded-tr-sm border border-white/10 bg-white/[0.05] text-silver/90"
                        }`}
                      >
                        {m.text}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex items-center justify-between border-t border-white/8 px-5 py-3.5">
                <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-silver/45">SPEED-TO-LEAD</span>
                <span className="font-mono text-[11px] tracking-[0.18em] text-quantum">&lt; 60 SECONDS · 24/7</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
