import type {
  HapticFrame,
  HapticIntent,
  HapticPrimitive,
  SafetyProfile,
  TactileSample,
  Vector3,
} from "./types";

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function isFiniteVector3(value: Vector3): boolean {
  return Number.isFinite(value.x) && Number.isFinite(value.y) && Number.isFinite(value.z);
}

export function normalizeIntensity(value: number): number {
  return clamp(value, 0, 1);
}

export function validateHapticIntent(intent: HapticIntent): string[] {
  const errors: string[] = [];

  if (!intent.id) errors.push("HapticIntent.id is required.");
  if (!isFiniteVector3(intent.position)) errors.push("HapticIntent.position must be finite.");
  if (!Number.isFinite(intent.intensity)) errors.push("HapticIntent.intensity must be finite.");
  if (intent.intensity < 0 || intent.intensity > 1) errors.push("HapticIntent.intensity must be between 0 and 1.");
  if (!Number.isFinite(intent.durationMs) || intent.durationMs <= 0) errors.push("HapticIntent.durationMs must be positive.");

  return errors;
}

export function validateHapticPrimitive(primitive: HapticPrimitive): string[] {
  const errors: string[] = [];

  if (!primitive.id) errors.push("HapticPrimitive.id is required.");
  if (!isFiniteVector3(primitive.position)) errors.push("HapticPrimitive.position must be finite.");
  if (!Number.isFinite(primitive.intensity)) errors.push("HapticPrimitive.intensity must be finite.");
  if (primitive.intensity < 0 || primitive.intensity > 1) errors.push("HapticPrimitive.intensity must be between 0 and 1.");
  if (!Number.isFinite(primitive.durationMs) || primitive.durationMs <= 0) errors.push("HapticPrimitive.durationMs must be positive.");

  return errors;
}

export function applySafetyProfile(frame: HapticFrame, profile: SafetyProfile): HapticFrame {
  const focusPoints = frame.focusPoints
    .filter((point) => profile.allowedCoordinateSystems.includes(point.coordinateSystem))
    .slice(0, profile.maxFocusPoints)
    .map((point) => ({
      ...point,
      intensity: clamp(point.intensity, 0, profile.maxIntensity),
    }));

  return {
    ...frame,
    focusPoints,
  };
}

export function validateTactileSample(sample: TactileSample): string[] {
  const errors: string[] = [];

  if (!sample.sessionId) errors.push("TactileSample.sessionId is required.");
  if (!Number.isFinite(sample.timestampMs) || sample.timestampMs < 0) errors.push("TactileSample.timestampMs must be non-negative.");
  if (sample.normalForceN !== undefined && (!Number.isFinite(sample.normalForceN) || sample.normalForceN < 0)) errors.push("TactileSample.normalForceN must be non-negative.");
  if (sample.vibration !== undefined && !Number.isFinite(sample.vibration)) errors.push("TactileSample.vibration must be finite.");
  if (sample.slidingVelocityMps !== undefined && !Number.isFinite(sample.slidingVelocityMps)) errors.push("TactileSample.slidingVelocityMps must be finite.");
  if (sample.humanRating !== undefined && (sample.humanRating < 1 || sample.humanRating > 5)) errors.push("TactileSample.humanRating must be between 1 and 5.");
  if (sample.acceleration !== undefined && !isFiniteVector3(sample.acceleration)) errors.push("TactileSample.acceleration must be finite.");

  return errors;
}
