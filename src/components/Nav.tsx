"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { NAV_LINKS } from "@/lib/data";
import QuantumLogo from "@/components/QuantumLogo";

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Entrance after boot
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const enter = () =>
      gsap.fromTo(nav, { y: -28, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1, ease: "power3.out", delay: 0.15 });
    if (window.__qimBooted) enter();
    else window.addEventListener("qim:booted", enter, { once: true });
    return () => window.removeEventListener("qim:booted", enter);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobile overlay open/close animation + scroll lock
  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    if (open) {
      window.__lenis?.stop();
      document.documentElement.style.overflow = "hidden";
      gsap.fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4, ease: "power2.out" });
      gsap.fromTo(
        overlay.querySelectorAll("[data-m-link]"),
        { y: 42, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.07, delay: 0.1, ease: "power3.out" }
      );
    } else {
      window.__lenis?.start();
      document.documentElement.style.overflow = "";
      gsap.to(overlay, { autoAlpha: 0, duration: 0.3, ease: "power2.in" });
    }
  }, [open]);

  const goTo = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    const lenis = window.__lenis;
    if (lenis) lenis.scrollTo(href, { offset: -72, duration: 1.7, easing: (t: number) => 1 - Math.pow(1 - t, 4) });
    else document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header ref={navRef} className="invisible fixed inset-x-0 top-0 z-[90]">
        <div
          className={`mx-auto mt-3 flex max-w-7xl items-center justify-between rounded-full px-5 py-2.5 transition-all duration-500 md:mt-5 md:px-7 ${
            scrolled ? "glass-deep mx-3 shadow-[0_18px_50px_-20px_rgba(0,0,0,0.8)] md:mx-auto" : "bg-transparent"
          }`}
        >
          <a href="#top" onClick={goTo("#top")} className="flex items-center gap-3" aria-label="Quantum Impact Marketing — home">
            <QuantumLogo id="nav-logo" className="h-9 w-8" />
            <span className="flex flex-col leading-none">
              <span className="font-display text-[13px] font-extrabold tracking-[0.16em] text-white">
                QUANTUM IMPACT
              </span>
              <span className="mt-1 font-mono text-[8.5px] tracking-[0.52em] text-silver/60">
                MARKETING
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={goTo(l.href)}
                className="group relative font-mono text-[11px] uppercase tracking-[0.24em] text-silver/75 transition-colors duration-300 hover:text-quantum"
              >
                {l.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gradient-to-r from-quantum to-electric transition-all duration-400 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#consultation"
              onClick={goTo("#consultation")}
              className="hidden rounded-full border border-quantum/50 px-5 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-quantum transition-all duration-300 hover:bg-quantum hover:text-black hover:shadow-[0_0_34px_-6px_rgba(57,255,20,0.7)] sm:block"
            >
              Consultation
            </a>
            <button
              onClick={() => setOpen(!open)}
              className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-full border border-white/10 lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              <span className={`h-px w-4 bg-white transition-transform duration-300 ${open ? "translate-y-[3px] rotate-45" : ""}`} />
              <span className={`h-px w-4 bg-white transition-transform duration-300 ${open ? "-translate-y-[3px] -rotate-45" : ""}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div
        ref={overlayRef}
        className={`invisible fixed inset-0 z-[85] flex flex-col justify-between bg-[#040505]/88 pb-10 pt-28 opacity-0 backdrop-blur-2xl ${open ? "" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        <nav className="flex flex-col gap-2 px-8" aria-label="Mobile">
          {NAV_LINKS.map((l, i) => (
            <a
              key={l.href}
              data-m-link
              href={l.href}
              onClick={goTo(l.href)}
              className="group flex items-baseline gap-4 border-b border-white/5 py-4"
            >
              <span className="font-mono text-[10px] text-quantum/70">0{i + 1}</span>
              <span className="font-display text-3xl font-bold tracking-tight text-white transition-colors group-hover:text-quantum">
                {l.label}
              </span>
            </a>
          ))}
          <a
            data-m-link
            href="#consultation"
            onClick={goTo("#consultation")}
            className="mt-8 self-start rounded-full bg-quantum px-7 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-black"
          >
            Request Consultation
          </a>
        </nav>
        <div data-m-link className="px-8">
          <div className="hud-rule mb-5" />
          <p className="hud-label">SOUTH FLORIDA — WASHINGTON D.C. — NATIONWIDE</p>
        </div>
      </div>
    </>
  );
}
