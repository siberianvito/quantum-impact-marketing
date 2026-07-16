"use client";

import { NAV_LINKS, CONTACT } from "@/lib/data";
import QuantumLogo from "@/components/QuantumLogo";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/8 bg-[#040505]/92 backdrop-blur-xl">
      <div className="section-pad mx-auto max-w-7xl py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <QuantumLogo id="footer-logo" className="h-11 w-9" />
              <span className="flex flex-col leading-none">
                <span className="font-display text-sm font-extrabold tracking-[0.16em] text-white">
                  QUANTUM IMPACT
                </span>
                <span className="mt-1 font-mono text-[8.5px] tracking-[0.52em] text-silver/60">
                  MARKETING
                </span>
              </span>
            </div>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-silver/65">
              AI business systems company. We engineer the operating system your
              business runs on — leads, follow-up, sales, and scale.
            </p>
            <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.26em] text-quantum/80">
              Systems Scale. Chaos Doesn&rsquo;t.
            </p>
          </div>

          <div>
            <p className="hud-label mb-6">SYSTEMS</p>
            <ul className="flex flex-col gap-3.5">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-silver/70 transition-colors duration-200 hover:text-quantum"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="hud-label mb-6">COMPANY</p>
            <ul className="flex flex-col gap-3.5 text-sm text-silver/70">
              <li>
                <a href="#founder" className="transition-colors duration-200 hover:text-quantum">The Architect</a>
              </li>
              <li>
                <a href="#industries" className="transition-colors duration-200 hover:text-quantum">Industries</a>
              </li>
              <li>
                <a href="#consultation" className="transition-colors duration-200 hover:text-quantum">Consultation</a>
              </li>
              <li>
                <a href={`mailto:${CONTACT.email}`} className="transition-colors duration-200 hover:text-quantum">
                  {CONTACT.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="hud-label mb-6">LOCATIONS</p>
            <ul className="flex flex-col gap-3.5 font-mono text-[10.5px] uppercase tracking-[0.18em] text-silver/60">
              <li className="flex items-center gap-2.5">
                <span className="h-1 w-1 rounded-full bg-quantum" /> South Florida — HQ
              </li>
              <li className="flex items-center gap-2.5">
                <span className="h-1 w-1 rounded-full bg-white/25" /> Washington, D.C.
              </li>
              <li className="flex items-center gap-2.5">
                <span className="h-1 w-1 rounded-full bg-white/25" /> Florida Statewide
              </li>
              <li className="flex items-center gap-2.5">
                <span className="h-1 w-1 rounded-full bg-white/25" /> Nationwide — 2030
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/6 pt-8 md:flex-row">
          <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-silver/40">
            © {new Date().getFullYear()} Quantum Impact Marketing — Engineered in South Florida
          </p>
          <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-silver/40">
            AI BUSINESS SYSTEMS · AUTOMATION · GROWTH
          </p>
        </div>
      </div>
    </footer>
  );
}
