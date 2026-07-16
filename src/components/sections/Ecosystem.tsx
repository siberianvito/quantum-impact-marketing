"use client";

import { ECOSYSTEM_CHIPS } from "@/lib/data";
import { SectionTag, SplitHeading, Reveal } from "@/components/ui";
import QuantumLogo from "@/components/QuantumLogo";

const OUTER = ECOSYSTEM_CHIPS.slice(0, 4);
const INNER = ECOSYSTEM_CHIPS.slice(4);

/**
 * Anchor sits at a fixed point on the ring; the ring wrapper spins the anchor
 * around the center while the chip counter-rotates about its own center to
 * stay upright.
 */
function OrbitChip({
  label,
  angle,
  radius,
  counterClass,
}: {
  label: string;
  angle: number;
  radius: number;
  counterClass: string;
}) {
  const rad = (angle * Math.PI) / 180;
  const x = 50 + radius * Math.cos(rad);
  const y = 50 + radius * Math.sin(rad);
  return (
    <div className="absolute" style={{ left: `${x}%`, top: `${y}%` }}>
      <div className={counterClass}>
        <div className="glass flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 whitespace-nowrap rounded-full px-3.5 py-2">
          <span className="h-1 w-1 rounded-full bg-quantum" />
          <span className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-silver/90">{label}</span>
        </div>
      </div>
    </div>
  );
}

export default function Ecosystem() {
  return (
    <section
      id="ecosystem"
      data-chapter="ECOSYSTEM"
      className="relative overflow-hidden bg-[#040505] py-28 md:py-40"
    >
      {/* Aurora atmosphere */}
      <div className="pointer-events-none absolute -left-40 top-10 h-[480px] w-[480px] animate-aurora rounded-full bg-quantum/[0.05] blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[520px] w-[520px] animate-aurora rounded-full bg-electric/[0.06] blur-[130px] [animation-delay:-7s]" />

      <div className="section-pad relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2 lg:gap-10">
        <div>
          <Reveal>
            <SectionTag index="02">ONE ECOSYSTEM</SectionTag>
          </Reveal>
          <SplitHeading className="mt-7 font-display text-[clamp(2rem,4.4vw,3.6rem)] font-extrabold leading-[1.06] tracking-[-0.02em] text-white">
            Seven disciplines. One intelligent operating system.
          </SplitHeading>
          <Reveal delay={0.15}>
            <p className="mt-7 max-w-lg text-base leading-relaxed text-silver/80 md:text-lg">
              Most businesses run on disconnected tools and manual effort. We fuse
              AI, CRM, automation, lead generation, sales infrastructure, customer
              experience, and data intelligence into a single ecosystem — engineered
              around how your business actually operates.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="mt-9 flex flex-wrap gap-2.5 lg:hidden">
              {ECOSYSTEM_CHIPS.map((c) => (
                <span key={c} className="glass rounded-full px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-silver/90">
                  {c}
                </span>
              ))}
            </div>
            <div className="mt-10 flex items-center gap-4">
              <span className="font-mono text-[34px] font-medium leading-none text-gradient">13</span>
              <span className="max-w-[220px] font-mono text-[10px] uppercase leading-relaxed tracking-[0.2em] text-silver/55">
                Growth capabilities engineered into every build
              </span>
            </div>
          </Reveal>
        </div>

        {/* Orbital system (desktop) */}
        <Reveal className="hidden lg:block" delay={0.2}>
          <div className="relative mx-auto aspect-square w-full max-w-[540px]">
            {/* rings */}
            <div className="absolute inset-[8%] rounded-full border border-white/[0.07]" />
            <div className="absolute inset-[26%] rounded-full border border-white/[0.09]" />
            <div className="absolute inset-[8%] rounded-full bg-[radial-gradient(circle,transparent_58%,rgba(57,255,20,0.04)_100%)]" />

            {/* center core */}
            <div className="absolute left-1/2 top-1/2 flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full glass-deep shadow-[0_0_80px_-12px_rgba(57,255,20,0.35)]">
              <QuantumLogo id="eco-logo" className="h-16 w-14" />
              <span className="absolute inset-0 animate-ping rounded-full border border-quantum/25 [animation-duration:3.2s]" />
            </div>

            {/* orbiting chips — parent spins, chips counter-rotate to stay level */}
            <div className="absolute inset-0 animate-orbit">
              {OUTER.map((label, i) => (
                <OrbitChip
                  key={label}
                  label={label}
                  angle={(360 / OUTER.length) * i - 45}
                  radius={42}
                  counterClass="animate-orbit-rev"
                />
              ))}
            </div>
            <div className="absolute inset-0 animate-orbit-rev [animation-duration:26s]">
              {INNER.map((label, i) => (
                <OrbitChip
                  key={label}
                  label={label}
                  angle={(360 / INNER.length) * i + 30}
                  radius={24}
                  counterClass="animate-orbit [animation-duration:26s]"
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
