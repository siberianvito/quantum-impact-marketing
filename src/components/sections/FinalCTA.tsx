"use client";

import { CONTACT } from "@/lib/data";
import { SectionTag, Reveal, Magnetic } from "@/components/ui";

/**
 * Transparent section — the fixed stage behind shows the horizon film
 * and the returning Quantum Core.
 */
export default function FinalCTA() {
  return (
    <section
      id="consultation"
      data-chapter="INITIALIZE"
      className="relative flex min-h-[110svh] flex-col items-center justify-center overflow-hidden py-32 text-center"
    >
      <Reveal>
        <SectionTag index="09" className="justify-center">
          INITIALIZE YOUR SYSTEM
        </SectionTag>
      </Reveal>

      <Reveal delay={0.1}>
        <h2 className="section-pad mt-8 font-display text-[clamp(2.4rem,6.4vw,5.6rem)] font-extrabold leading-[1.03] tracking-[-0.02em] text-white">
          The <span className="text-gradient drop-glow">future</span> of business
          <br />
          starts here.
        </h2>
      </Reveal>

      <Reveal delay={0.2}>
        <p className="section-pad mt-7 max-w-xl text-base leading-relaxed text-silver/80 md:text-lg">
          Request a consultation. We&rsquo;ll audit your business, show you exactly
          where opportunities are leaking, and design the system that captures them.
        </p>
      </Reveal>

      <Reveal delay={0.3}>
        <div className="mt-11 flex flex-col items-center gap-6">
          <Magnetic strength={0.4}>
            <a
              href={`mailto:${CONTACT.email}?subject=System%20Consultation%20Request`}
              className="group inline-flex items-center gap-4 rounded-full bg-quantum px-10 py-5 font-mono text-xs font-medium uppercase tracking-[0.24em] text-black transition-shadow duration-300 hover:shadow-[0_0_80px_-8px_rgba(57,255,20,0.8)]"
            >
              Request a Consultation
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className="transition-transform duration-300 group-hover:translate-x-1.5">
                <path d="M5 12h14m0 0-6-6m6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </Magnetic>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-silver/50">
            {CONTACT.email} — {CONTACT.phone}
          </p>
          <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-silver/40">
            BUSINESS AUDIT → STRATEGY SESSION → SYSTEM BUILD → SCALE
          </p>
        </div>
      </Reveal>

      {/* Watermark */}
      <div
        className="pointer-events-none absolute bottom-6 left-1/2 w-full -translate-x-1/2 select-none whitespace-nowrap text-center font-display text-[clamp(2rem,7.5vw,7rem)] font-black uppercase leading-none tracking-tight text-outline opacity-40"
        aria-hidden="true"
      >
        Systems Scale. Chaos Doesn&rsquo;t.
      </div>
    </section>
  );
}
