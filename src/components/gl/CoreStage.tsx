"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import VideoBackdrop from "@/components/VideoBackdrop";
import { coreState } from "@/lib/coreState";
import { gsap, ScrollTrigger, prefersReduced } from "@/lib/gsap";

const QuantumScene = dynamic(() => import("./QuantumScene"), { ssr: false });

/**
 * The persistent cinematic stage: ambient space films + the WebGL Quantum Core.
 * Fixed behind all content — sections with opaque backgrounds naturally wipe
 * over it like scene transitions. The core "returns" for the final CTA.
 */
export default function CoreStage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);
  const [finale, setFinale] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduced = prefersReduced();

    const ctx = gsap.context(() => {
      // Deterministic base state, regardless of load scroll position
      gsap.set("#stage-nebula", { autoAlpha: 1 });
      gsap.set("#stage-horizon", { autoAlpha: 0 });

      // Pause the GPU entirely while the core is fully covered mid-page
      ScrollTrigger.create({
        trigger: "#system",
        start: "top bottom",
        end: "max",
        onEnter: () => setActive(false),
        onLeaveBack: () => setActive(true),
      });
      ScrollTrigger.create({
        trigger: "#consultation",
        start: "top 120%",
        onEnter: () => {
          setActive(true);
          setFinale(true);
        },
        onLeaveBack: () => {
          setActive(false);
          setFinale(false);
        },
      });

      if (reduced) return;

      // Hero exit: the core recedes as the manifesto covers it
      gsap.fromTo(
        coreState,
        { scale: 1, y: 0 },
        {
          scale: 0.72,
          y: 0.35,
          ease: "none",
          immediateRender: false,
          scrollTrigger: { trigger: "#top", start: "top top", end: "bottom top", scrub: 0.6 },
        }
      );

      // Nebula film dims as we sink into the manifesto
      gsap.fromTo(
        "#stage-nebula",
        { autoAlpha: 1 },
        {
          autoAlpha: 0,
          ease: "none",
          immediateRender: false,
          scrollTrigger: { trigger: "#belief", start: "top 90%", end: "top 20%", scrub: 0.6 },
        }
      );

      // Finale: horizon film rises, the core returns brighter
      const finale = gsap.timeline({
        scrollTrigger: { trigger: "#consultation", start: "top 95%", end: "top 25%", scrub: 0.7 },
      });
      finale
        .fromTo(
          "#stage-horizon",
          { autoAlpha: 0 },
          { autoAlpha: 1, ease: "none", immediateRender: false },
          0
        )
        .fromTo(
          coreState,
          { scale: 0.55, y: -1.4, intensity: 0.9 },
          { scale: 0.92, y: -0.12, intensity: 1.35, ease: "none", immediateRender: false },
          0
        );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div
      id="core-stage"
      ref={rootRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    >
      {/* Ambient film: hero nebula */}
      <div id="stage-nebula" className="absolute inset-0">
        <VideoBackdrop
          src="/media/hero-nebula.mp4"
          poster="/media/hero-nebula.webp"
          priority
          veil={false}
          paused={!active || finale}
          className="opacity-65"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_60%_at_50%_42%,transparent_0%,rgba(4,5,5,0.72)_78%)]" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#040505] via-[#040505]/60 to-transparent" />
      </div>

      {/* Ambient film: finale horizon (hidden until the last chapter) */}
      <div id="stage-horizon" className="invisible absolute inset-0 opacity-0">
        <VideoBackdrop
          src="/media/horizon.mp4"
          poster="/media/horizon.webp"
          veil={false}
          paused={!finale}
          className="opacity-75"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_65%_at_50%_55%,transparent_0%,rgba(4,5,5,0.7)_80%)]" />
      </div>

      {/* The Quantum Core */}
      <QuantumScene active={active} />
    </div>
  );
}
