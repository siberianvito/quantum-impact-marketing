/**
 * The Quantum Impact mark — the brand's actual artwork (public/logo.png),
 * extracted with a transparent background. `id` is accepted for call-site
 * compatibility; sizing comes from the className (object-contain preserves
 * the mark's proportions inside any box).
 */
import { asset } from "@/lib/asset";

export default function QuantumLogo({
  className = "",
}: {
  className?: string;
  id?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={asset("/logo.png")}
      alt=""
      aria-hidden="true"
      draggable={false}
      loading="eager"
      className={`select-none object-contain ${className}`}
    />
  );
}
