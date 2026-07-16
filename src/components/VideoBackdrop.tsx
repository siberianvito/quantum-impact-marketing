"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReduced } from "@/lib/gsap";
import { asset } from "@/lib/asset";

/**
 * Cinematic ambient video layer.
 * - Poster paints instantly; video lazy-loads near the viewport and crossfades in.
 * - Plays only while on screen; pauses off screen (battery + perf).
 * - Falls back to the poster on error or reduced-motion.
 */
export default function VideoBackdrop({
  src,
  poster,
  className = "",
  veil = true,
  priority = false,
  paused = false,
  loop = true,
}: {
  src: string;
  poster: string;
  className?: string;
  veil?: boolean;
  priority?: boolean;
  /** Force-pause even while on screen (e.g. film hidden behind stage fades) */
  paused?: boolean;
  /** false = play once and hold the final frame (no snap-back) */
  loop?: boolean;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const endedRef = useRef(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    const video = videoRef.current;
    if (!wrap || !video || prefersReduced()) return;

    let loaded = false;
    let onScreen = false;

    const sync = () => {
      if (onScreen && !paused) {
        if (!loaded) {
          loaded = true;
          video.src = asset(src);
          video.load();
        }
        // A finished one-shot film stays frozen on its last frame
        if (loop || !endedRef.current) video.play().catch(() => {});
      } else if (!video.paused) {
        video.pause();
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        sync();
      },
      { rootMargin: priority ? "1200px" : "600px" }
    );

    io.observe(wrap);
    return () => io.disconnect();
  }, [src, priority, paused]);

  return (
    <div ref={wrapRef} className={`absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {/* Poster underlay — always present, zero layout shift */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={asset(poster)}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />
      {!failed && (
        <video
          ref={videoRef}
          muted
          loop={loop}
          playsInline
          preload="none"
          poster={asset(poster)}
          onCanPlay={() => setReady(true)}
          onEnded={() => {
            if (!loop) endedRef.current = true;
          }}
          onError={() => setFailed(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1400ms] ease-out ${
            ready ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
      {veil && (
        <>
          <div className="absolute inset-0 bg-[#040505]/38" />
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#040505] to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#040505] to-transparent" />
        </>
      )}
    </div>
  );
}
