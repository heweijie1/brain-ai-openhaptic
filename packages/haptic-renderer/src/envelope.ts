import type { HapticEnvelope } from "@openhapticai/haptic-core";

export function computeEnvelopeGain(
  envelope: HapticEnvelope | undefined,
  t: number,
  durationMs: number,
): number {
  if (durationMs <= 0) return 0;

  const ratio = Math.min(Math.max(t / durationMs, 0), 1);

  switch (envelope) {
    case "instant":
      return 1;
    case "linear":
      return ratio < 0.5 ? ratio * 2 : (1 - ratio) * 2;
    case "smooth_attack":
      return Math.sin((ratio * Math.PI) / 2);
    case "smooth_release":
      return Math.cos((ratio * Math.PI) / 2);
    case "smooth_attack_release":
      return Math.sin(ratio * Math.PI);
    default:
      return 1;
  }
}
