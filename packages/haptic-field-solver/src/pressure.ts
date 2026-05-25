import type { ArrayGeometry, PhaseAmplitudeChannel, Vector3 } from "@openhapticai/haptic-core";
import { TWO_PI, WAVELENGTH_M } from "./constants";
import { euclideanDistance } from "./distance";

export function computePressureAtPoint(
  geometry: ArrayGeometry,
  channels: PhaseAmplitudeChannel[],
  point: Vector3,
): number {
  let realSum = 0;
  let imagSum = 0;

  for (let i = 0; i < geometry.transducers.length; i += 1) {
    const transducer = geometry.transducers[i];
    const ch = channels[i];

    if (!ch || !ch.enabled || !transducer.enabled) continue;

    const distance = euclideanDistance(transducer.position, point);
    const propagationPhase = (TWO_PI * distance) / WAVELENGTH_M;
    const totalPhase = ch.phaseRad + propagationPhase;

    realSum += ch.amplitude * Math.cos(totalPhase);
    imagSum += ch.amplitude * Math.sin(totalPhase);
  }

  return Math.sqrt(realSum * realSum + imagSum * imagSum);
}
