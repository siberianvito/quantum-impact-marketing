"use client";

import { SYSTEMS } from "@/lib/data";
import { SectionTag, SplitHeading, Reveal, useGlowCards } from "@/components/ui";

const ICONS: Record<string, React.ReactNode> = {
  signal: (
    <path d="M12 20v-8m0 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm-5.6 2.4a8 8 0 0 1 0-8.8M17.6 14.4a8 8 0 0 0 0-8.8M4.2 17.2a12 12 0 0 1 0-12.4M19.8 17.2a12 12 0 0 0 0-12.4" />
  ),
  grid: (
    <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" />
  ),
  pulse: <path d="M2 12h4l2.5-7 4 14 2.5-7h7" />,
  bolt: <path d="M13 2 4.5 13.5H11L9.5 22 19 10.5h-6.5L13 2Z" />,
  star: (
    <path d="M12 2.5c.6 4.8 2.6 7 7.5 7.5-4.9.5-6.9 2.7-7.5 7.5-.6-4.8-2.6-7-7.5-7.5 4.9-.5 6.9-2.7 7.5-7.5ZM19 16.5c.3 2.1 1.2 3 3 3.2-1.8.2-2.7 1.1-3 3.3-.3-2.2-1.2-3.1-3-3.3 1.8-.2 2.7-1.1 3-3.2Z" />
  ),
  wave: (
    <path d="M3 12c2.5-5 4.5-5 6 0s3.5 5 6 0 3.8-4.5 6-1M3 18c2.5-4 4.5-4 6 0" />
  ),
};

export default function Systems() {
  const gridRef = useGlowCards();

  return (
    <section
      id="capabilities"
      data-chapter="CAPABILITIES"
      className="relative overflow-hidden bg-[#040505] py-28 md:py-40"
    >
      {/* Neural-grid still, masked into the darkness */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/media/neural-grid.webp"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.14] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_35%,black,transparent_75%)]"
      />

      <div className="section-pad relative mx-auto max-w-7xl">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Reveal>
            <SectionTag index="03">WHAT WE ENGINEER</SectionTag>
          </Reveal>
          <SplitHeading className="mt-7 font-display text-[clamp(2rem,4.6vw,3.8rem)] font-extrabold leading-[1.05] tracking-[-0.02em] text-white">
            Six systems. Thirteen capabilities. Zero chaos.
          </SplitHeading>
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-silver/75 md:text-lg">
              Not a menu of services — an architecture. Every capability is a
              component in one machine, engineered to capture, convert, and
              compound.
            </p>
          </Reveal>
        </div>

        <div ref={gridRef} className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {SYSTEMS.map((sys) => (
            <Reveal
              key={sys.index}
              className={sys.wide ? "lg:col-span-2" : ""}
            >
              <div className="glow-card glass h-full rounded-2xl p-7">
                <div className="flex items-start justify-between">
                  <span className="font-mono text-[10px] tracking-[0.3em] text-quantum/80">
                    {sys.index}
                  </span>
                  <svg
                    viewBox="0 0 24 24"
                    className="h-6 w-6 text-quantum/90"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    {ICONS[sys.icon]}
                  </svg>
                </div>
                <h3 className="mt-6 font-display text-xl font-bold tracking-tight text-white md:text-2xl">
                  {sys.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-silver/70">{sys.blurb}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {sys.services.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-silver/80"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}

          {/* Custom build card completes the bento */}
          <Reveal>
            <a
              href="#consultation"
              className="glow-card glass-deep group flex h-full flex-col justify-between rounded-2xl border-quantum/20 p-7"
              data-cursor
            >
              <div>
                <span className="font-mono text-[10px] tracking-[0.3em] text-quantum/80">SYS.CUSTOM</span>
                <h3 className="mt-6 font-display text-xl font-bold tracking-tight text-white md:text-2xl">
                  Your Architecture
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-silver/70">
                  Every business receives customized workflows, CRM, automation,
                  reporting, and strategy. No templates.
                </p>
              </div>
              <span className="mt-8 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-quantum">
                Request your blueprint
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="transition-transform duration-300 group-hover:translate-x-1.5">
                  <path d="M5 12h14m0 0-6-6m6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
