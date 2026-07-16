/**
 * Mutable render state for the Quantum Core WebGL stage.
 * GSAP scroll choreography writes to it; the R3F frame loop reads it.
 * Kept as a plain object so tweens never trigger React re-renders.
 */
export const coreState = {
  opacity: 1, // stage opacity (mirrored onto the canvas wrapper)
  scale: 1,
  x: 0,
  y: 0,
  intensity: 1, // nucleus glow multiplier
  spin: 1, // rotation speed multiplier
  mouseX: 0, // normalized -1..1
  mouseY: 0,
};
