import type { ArrayGeometry, DeviceProfile } from "@openhapticai/haptic-core";

export function createSimulationDeviceProfile(geometry: ArrayGeometry): DeviceProfile {
  return {
    id: `${geometry.id}-simulation-device`,
    name: "OpenHapticAI Simulation Device",
    backend: "simulation",
    geometry,
    maxFocusPoints: 1,
    supportsAmplitudeControl: true,
    supportsPhaseControl: true,
    supportsModulation: true,
  };
}
