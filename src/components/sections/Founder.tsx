"use client";

import { SectionTag, SplitHeading, Reveal } from "@/components/ui";
import VideoBackdrop from "@/components/VideoBackdrop";

const MARKETS = [
  { name: "SOUTH FLORIDA", status: "HEADQUARTERS", active: true },
  { name: "WASHINGTON, D.C.", status: "EXPANDING", active: false },
  { name: "FLORIDA — STATEWIDE", status: "EXPANDING", active: false },
  { name: "UNITED STATES", status: "2030 HORIZON", active: false },
];

const STANDARD = [
  "Strategy before tactics",
  "Simplify complexity",
  "Build for long-term scalability",
  "Measure success through systems",
  "Partners, not vendors",
];

export default function Founder() {
  return (
    <section
      id="founder"
      data-chapter="THE ARCHITECT"
      className="relative overflow-hidden bg-[#040505] py-32 md:py-44"
    >
      {/* The frozen lake & glowing tower — building the future */}
      <VideoBackdrop
        src="/media/aurora-lake.mp4"
        poster="/media/aurora-lake.webp"
        className="opacity-45"
      />

      <div className="section-pad relative mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
        <div>
          <Reveal>
            <SectionTag index="08">THE ARCHITECT</SectionTag>
          </Reveal>
          <SplitHeading
            as="p"
            className="mt-9 font-display text-[clamp(1.7rem,3.6vw,3rem)] font-bold leading-[1.2] tracking-[-0.015em] text-white"
          >
            &ldquo;Businesses don&rsquo;t need another marketing company. They need
            a business operating system. We don&rsquo;t chase trends — we build
            systems that outlast them.&rdquo;
          </SplitHeading>
          <Reveal delay={0.2}>
            <div className="mt-9 flex items-center gap-4">
              <span className="h-px w-12 bg-gradient-to-r from-quantum to-transparent" />
              <div>
                <p className="font-display text-base font-bold tracking-wide text-white">Gustavo Siverio</p>
                <p className="mt-1 font-mono text-[9.5px] uppercase tracking-[0.3em] text-silver/55">
                  Founder — Quantum Impact Marketing
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-12 flex flex-wrap gap-2.5">
              {STANDARD.map((s) => (
                <span
                  key={s}
                  className="glass rounded-full px-4 py-2 font-mono text-[9px] uppercase tracking-[0.18em] text-silver/80"
                >
                  {s}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Expansion map */}
        <Reveal delay={0.15}>
          <div className="glass-deep rounded-2xl p-7 md:p-9">
            <p className="hud-label mb-8">EXPANSION GRID</p>
            <ol className="relative flex flex-col">
              <span className="absolute bottom-3 left-[5px] top-3 w-px bg-white/10" aria-hidden="true" />
              {MARKETS.map((m) => (
                <li key={m.name} className="relative flex items-start gap-5 py-4">
                  <span
                    className={`relative z-10 mt-1 block h-[11px] w-[11px] rounded-full border ${
                      m.active
                        ? "border-quantum bg-quantum shadow-[0_0_16px_rgba(57,255,20,0.7)]"
                        : "border-white/30 bg-carbon"
                    }`}
                  />
                  <div className="flex flex-1 items-baseline justify-between gap-4">
                    <span className="font-display text-sm font-bold tracking-wide text-white md:text-base">
                      {m.name}
                    </span>
                    <span
                      className={`whitespace-nowrap font-mono text-[8.5px] uppercase tracking-[0.24em] ${
                        m.active ? "text-quantum" : "text-silver/50"
                      }`}
                    >
                      {m.status}
                    </span>
                  </div>
                </li>
              ))}
            </ol>
            <div className="hud-rule mt-6" />
            <p className="mt-6 text-sm leading-relaxed text-silver/65">
              By 2030: proprietary AI frameworks and industry-specific growth
              platforms for healthcare, legal, home services, and professional
              service businesses across the United States.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
