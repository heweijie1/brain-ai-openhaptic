import type {
  ArrayGeometry,
  FocusPoint,
  PhaseAmplitudeChannel,
  PhaseAmplitudeFrame,
  SafetyProfile,
} from "@openhapticai/haptic-core";
import { CARRIER_FREQUENCY_HZ, TWO_PI, WAVELENGTH_M } from "./constants";
import { euclideanDistance } from "./distance";

export function solveSingleFocusPhases(
  geometry: ArrayGeometry,
  focus: FocusPoint,
): PhaseAmplitudeChannel[] {
  const channels: PhaseAmplitudeChannel[] = [];

  for (const transducer of geometry.transducers) {
    if (!transducer.enabled) {
      channels.push({
        id: transducer.id,
        phaseRad: 0,
        amplitude: 0,
        enabled: false,
      });
      continue;
    }

    const distance = euclideanDistance(transducer.position, focus.position);
    const phaseRad = (TWO_PI * distance) / WAVELENGTH_M;
    const normalizedPhase = (((-phaseRad % TWO_PI) + TWO_PI) % TWO_PI);

    channels.push({
      id: transducer.id,
      phaseRad: normalizedPhase,
      amplitude: focus.intensity,
      enabled: true,
    });
  }

  return channels;
}

export function solveFrame(
  geometry: ArrayGeometry,
  focus: FocusPoint,
  timestampMs: number,
  safetyProfile?: SafetyProfile,
): PhaseAmplitudeFrame {
  const channels = solveSingleFocusPhases(geometry, focus);

  let safetyLimited = false;
  if (safetyProfile) {
    for (const ch of channels) {
      if (ch.amplitude > safetyProfile.maxIntensity) {
        ch.amplitude = safetyProfile.maxIntensity;
        safetyLimited = true;
      }
    }
  }

  return {
    timestampMs,
    frequencyHz: geometry.carrierFrequencyHz ?? CARRIER_FREQUENCY_HZ,
    channels,
    safetyLimited,
  };
}
