"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReduced } from "@/lib/gsap";
import VideoBackdrop from "@/components/VideoBackdrop";

/**
 * The movie moment: the crystalline Quantum Core film scales from a framed
 * artifact to full-bleed while the positioning statement lands.
 */
export default function CoreReveal() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      if (prefersReduced()) {
        gsap.set("[data-frame]", { scale: 1, borderRadius: 0 });
        gsap.set("[data-cr-t2]", { autoAlpha: 1 });
        return;
      }

      gsap
        .timeline({
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.55,
          },
          defaults: { ease: "none" },
        })
        .fromTo(
          "[data-frame]",
          { scale: 0.62, borderRadius: 28 },
          { scale: 1, borderRadius: 0, duration: 3.4, ease: "power1.inOut" },
          0
        )
        .fromTo("[data-frame-inner]", { scale: 1.22 }, { scale: 1, duration: 3.4, ease: "power1.inOut" }, 0)
        .fromTo("[data-cr-t1]", { autoAlpha: 0, y: 34 }, { autoAlpha: 1, y: 0, duration: 1 }, 0.5)
        .to("[data-cr-t1]", { autoAlpha: 0, y: -34, duration: 1 }, 2.2)
        .fromTo("[data-cr-t2]", { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 1.2 }, 3.0)
        .fromTo("[data-cr-t3]", { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 1 }, 3.7)
        .to({}, { duration: 1.2 });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="system"
      data-chapter="THE SYSTEM"
      className="relative h-[340vh] bg-[#040505]"
    >
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {/* Scaling cinema frame */}
        <div
          data-frame
          className="relative h-full w-full overflow-hidden border border-white/10 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)]"
        >
          <div data-frame-inner className="absolute inset-0">
            <VideoBackdrop
              src="/media/core-reveal.mp4"
              poster="/media/core-reveal.webp"
              veil
              className="opacity-90"
            />
          </div>
        </div>

        {/* Overlay narrative */}
        <div className="section-pad pointer-events-none absolute inset-0 z-10 grid place-items-center text-center">
          <div data-cr-t1 className="invisible col-start-1 row-start-1 opacity-0">
            <span className="hud-label mb-5 block">WHAT WE ARE</span>
            <p className="font-display text-[clamp(1.9rem,4.6vw,4rem)] font-bold tracking-[-0.015em] text-white">
              We are <span className="text-outline">not</span> a marketing agency.
            </p>
          </div>

          <div className="col-start-1 row-start-1 flex flex-col items-center">
            <div data-cr-t2 className="invisible opacity-0">
              <p className="font-display text-[clamp(2.1rem,5.4vw,4.8rem)] font-extrabold leading-[1.05] tracking-[-0.02em] text-white">
                We are an{" "}
                <span className="text-gradient drop-glow">
                  AI Business
                  <br />
                  Systems
                </span>{" "}
                company.
              </p>
            </div>
            <p
              data-cr-t3
              className="invisible mt-7 max-w-xl text-base leading-relaxed text-silver/85 opacity-0 md:text-lg"
            >
              We engineer the operating system your business runs on — one intelligent
              ecosystem for leads, follow-up, sales, and scale.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
