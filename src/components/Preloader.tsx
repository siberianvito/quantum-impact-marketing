"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReduced } from "@/lib/gsap";
import { asset } from "@/lib/asset";
import QuantumLogo from "@/components/QuantumLogo";

const BOOT_LINES = [
  "IGNITING NEURAL PATHWAYS",
  "CONNECTING SYNAPSES",
  "ASSEMBLING INTELLIGENCE",
  "SYSTEMS ONLINE",
];

/**
 * Cinematic boot: a Higgsfield film of neurons connecting into a brain,
 * progress driven by the film itself, ending with the brand mark drawing
 * out of the formed network — then a wipe straight into the live hero.
 * Falls back to the logo-draw loader on slow connections or errors.
 */
export default function Preloader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const statusRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const video = videoRef.current;
    if (!root) return;

    const finish = () => {
      window.__qimBooted = true;
      window.dispatchEvent(new CustomEvent("qim:booted"));
    };

    if (prefersReduced()) {
      root.style.display = "none";
      finish();
      return;
    }

    document.documentElement.style.overflow = "hidden";
    const unfreeze = () => {
      document.documentElement.style.overflow = "";
    };

    let done = false;
    let fellBack = false;
    let endSeq: () => void = () => {};
    let startFb: () => void = () => {};
    let watchdog: ReturnType<typeof setTimeout> | undefined;
    let skipHint: ReturnType<typeof setTimeout> | undefined;

    const ctx = gsap.context(() => {
      const setProgress = (p: number) => {
        const v = Math.round(Math.min(1, Math.max(0, p)) * 100);
        if (counterRef.current) counterRef.current.textContent = String(v).padStart(3, "0");
        if (barRef.current) barRef.current.style.transform = `scaleX(${v / 100})`;
        if (statusRef.current) {
          const line = BOOT_LINES[Math.min(BOOT_LINES.length - 1, Math.floor((v / 100) * BOOT_LINES.length))];
          if (statusRef.current.textContent !== line) statusRef.current.textContent = line;
        }
      };

      endSeq = () => {
        if (done) return;
        done = true;
        if (watchdog) clearTimeout(watchdog);
        if (skipHint) clearTimeout(skipHint);
        video?.pause();
        setProgress(1);

        const tl = gsap.timeline();
        if (!fellBack) {
          // The brain recedes; the brand mark draws itself out of the network
          tl.to("[data-boot-video]", { opacity: 0.12, scale: 1.07, duration: 0.75, ease: "power2.inOut" }, 0)
            .fromTo(
              "[data-boot-logo]",
              { autoAlpha: 0, scale: 0.82, y: 14 },
              { autoAlpha: 1, scale: 1, y: 0, duration: 0.7, ease: "power3.out" },
              0.18
            )
            .fromTo(
              "[data-boot-logo] img",
              { filter: "drop-shadow(0 0 0px rgba(57,255,20,0))" },
              { filter: "drop-shadow(0 0 44px rgba(57,255,20,0.45))", duration: 0.85, ease: "power2.out" },
              0.28
            );
        }
        tl.to("[data-boot-ui], [data-boot-skip]", { autoAlpha: 0, y: -12, duration: 0.4, ease: "power2.in" }, "+=0.4")
          .to("[data-boot-logo]", { autoAlpha: 0, scale: 1.05, duration: 0.45, ease: "power2.in" }, "<")
          .add(finish, "<")
          .to(root, {
            yPercent: -100,
            duration: 0.95,
            ease: "power4.inOut",
            onComplete: () => {
              unfreeze();
              root.style.display = "none";
            },
          }, "<0.12");

        // GSAP-independent insurance: even if the finale timeline is frozen
        // or killed (hidden tab, HMR), the site always finishes booting.
        setTimeout(() => {
          if (!window.__qimBooted) finish();
        }, 2800);
        setTimeout(() => {
          if (root.style.display !== "none") {
            unfreeze();
            root.style.display = "none";
          }
        }, 5000);
      };

      const startFallback = () => {
        if (done || fellBack) return;
        fellBack = true;
        if (watchdog) clearTimeout(watchdog);
        video?.pause();
        gsap.to("[data-boot-video]", { opacity: 0, duration: 0.4 });
        gsap.fromTo(
          "[data-boot-logo]",
          { autoAlpha: 0, scale: 0.9 },
          { autoAlpha: 1, scale: 1, duration: 0.8, ease: "power3.out" }
        );
        // Gentle breathing while the loader runs
        gsap.to("[data-boot-logo] img", {
          scale: 1.035,
          duration: 1.1,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        });
        const progress = { v: 0 };
        gsap.to(progress, {
          v: 1,
          duration: 2,
          ease: "power2.inOut",
          onUpdate: () => setProgress(progress.v),
          onComplete: () => endSeq(),
        });
      };

      startFb = startFallback;

      if (video) {
        video.currentTime = 0;
        const onTime = () => {
          if (!video.duration) return;
          setProgress(video.currentTime / video.duration);
          // Hand off just before the final frame so the cut is invisible
          if (video.duration - video.currentTime < 0.35) endSeq();
        };
        const onEnded = () => endSeq();
        const onError = () => startFallback();
        video.addEventListener("timeupdate", onTime);
        video.addEventListener("ended", onEnded);
        video.addEventListener("error", onError);
        video.play().catch(() => {
          /* muted autoplay is expected to succeed; watchdog covers the rest */
        });
        // If the film can't stream fast enough, don't hold the site hostage
        watchdog = setTimeout(() => {
          if (video.readyState < 3 || video.currentTime === 0) startFallback();
        }, 1700);
        skipHint = setTimeout(() => {
          gsap.to("[data-boot-skip]", { autoAlpha: 1, duration: 0.5 });
        }, 1500);
      } else {
        startFallback();
      }
    }, root);

    // Stall guard: if the film gets paused/stuck (OS battery saver, tab
    // switch, capture tools), resume it — and if it stays stuck, move on.
    let lastT = -1;
    let strikes = 0;
    const video2 = videoRef.current;
    const stallTimer = setInterval(() => {
      if (done || fellBack || !video2) return;
      if (video2.currentTime === lastT) {
        strikes += 1;
        video2.play().catch(() => {});
        if (strikes >= 3) {
          if (video2.currentTime > 1.2) endSeq();
          else startFb();
        }
      } else {
        strikes = 0;
        lastT = video2.currentTime;
      }
    }, 900);

    // Absolute ceiling: the boot may never outlive 12 seconds
    const hardCap = setTimeout(() => endSeq(), 12000);

    const onSkip = () => endSeq();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") endSeq();
    };
    root.addEventListener("pointerdown", onSkip);
    window.addEventListener("keydown", onKey);
    window.addEventListener("wheel", onSkip, { passive: true });

    return () => {
      root.removeEventListener("pointerdown", onSkip);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("wheel", onSkip);
      if (watchdog) clearTimeout(watchdog);
      if (skipHint) clearTimeout(skipHint);
      clearInterval(stallTimer);
      clearTimeout(hardCap);
      ctx.revert();
      unfreeze();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[9999] overflow-hidden bg-[#040505]"
      aria-hidden="true"
    >
      {/* The boot film: neurons connect and assemble the brain */}
      <video
        data-boot-video
        ref={videoRef}
        muted
        playsInline
        autoPlay
        preload="auto"
        disablePictureInPicture
        src={asset("/media/boot-neural.mp4")}
        poster={asset("/media/boot-poster.webp")}
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Edge vignette keeps HUD legible over the film */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_80%_at_50%_50%,transparent_45%,rgba(4,5,5,0.82)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#040505]/90 to-transparent" />

      {/* Brand mark — materializes out of the formed network at the end */}
      <div data-boot-logo className="invisible absolute inset-0 grid place-items-center opacity-0">
        <div className="flex flex-col items-center gap-6">
          <QuantumLogo id="boot-logo" className="h-28 w-24 drop-shadow-[0_0_34px_rgba(57,255,20,0.35)] md:h-32 md:w-28" />
          <span className="font-display text-sm font-extrabold tracking-[0.34em] text-white">
            QUANTUM IMPACT
          </span>
        </div>
      </div>

      {/* Boot HUD */}
      <div data-boot-ui className="absolute inset-x-6 bottom-7 flex items-end justify-between gap-6 md:inset-x-10">
        <div className="flex w-56 flex-col gap-3 md:w-72">
          <div className="flex items-end justify-between">
            <span ref={statusRef} className="hud-label !text-[0.56rem] text-silver/65">
              INITIALIZING QUANTUM OS
            </span>
            <span ref={counterRef} className="font-mono text-sm tracking-[0.2em] text-quantum">
              000
            </span>
          </div>
          <div className="h-px w-full overflow-hidden bg-white/10">
            <div
              ref={barRef}
              className="h-full w-full origin-left scale-x-0 bg-gradient-to-r from-quantum to-electric"
            />
          </div>
        </div>
        <span className="hud-label hidden !text-[0.55rem] !tracking-[0.5em] text-silver/35 md:block">
          AI BUSINESS SYSTEMS
        </span>
      </div>

      {/* Skip affordance */}
      <span
        data-boot-skip
        className="invisible absolute right-6 top-6 font-mono text-[9px] uppercase tracking-[0.34em] text-silver/50 opacity-0 md:right-10 md:top-8"
      >
        CLICK TO SKIP
      </span>
    </div>
  );
}
