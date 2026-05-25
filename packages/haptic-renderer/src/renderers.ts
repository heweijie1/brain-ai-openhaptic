import type {
  FocusPoint,
  HapticFrame,
  HapticPrimitive,
} from "@openhapticai/haptic-core";
import { computeEnvelopeGain } from "./envelope";

export interface RenderOptions {
  frameRateHz: number;
}

function generateFrames(
  primitive: HapticPrimitive,
  options: RenderOptions,
  focusPointFn: (t: number, gain: number) => FocusPoint[],
): HapticFrame[] {
  const frames: HapticFrame[] = [];
  const frameIntervalMs = 1000 / options.frameRateHz;
  const totalFrames = Math.max(1, Math.ceil(primitive.durationMs / frameIntervalMs));

  for (let i = 0; i < totalFrames; i += 1) {
    const t = i * frameIntervalMs;
    const gain = computeEnvelopeGain(primitive.envelope, t, primitive.durationMs);
    frames.push({
      timestampMs: t,
      focusPoints: focusPointFn(t, gain),
    });
  }

  return frames;
}

export function renderTap(primitive: HapticPrimitive, options: RenderOptions): HapticFrame[] {
  return generateFrames(primitive, options, (_t, gain) => [
    {
      position: primitive.position,
      coordinateSystem: primitive.coordinateSystem,
      intensity: primitive.intensity * gain,
      modulationHz: primitive.modulationHz,
    },
  ]);
}

export function renderPress(primitive: HapticPrimitive, options: RenderOptions): HapticFrame[] {
  return generateFrames(primitive, options, (_t, gain) => [
    {
      position: primitive.position,
      coordinateSystem: primitive.coordinateSystem,
      intensity: primitive.intensity * gain,
      modulationHz: primitive.modulationHz,
    },
  ]);
}

export function renderPulse(primitive: HapticPrimitive, options: RenderOptions): HapticFrame[] {
  return generateFrames(primitive, options, (t, gain) => {
    const hz = primitive.modulationHz ?? 200;
    const pulseGain = Math.sin((2 * Math.PI * hz * t) / 1000);
    const clampedPulse = Math.max(0, pulseGain);
    return [
      {
        position: primitive.position,
        coordinateSystem: primitive.coordinateSystem,
        intensity: primitive.intensity * gain * clampedPulse,
        modulationHz: hz,
      },
    ];
  });
}

export function renderVibration(primitive: HapticPrimitive, options: RenderOptions): HapticFrame[] {
  return generateFrames(primitive, options, (t, gain) => {
    const hz = primitive.modulationHz ?? 200;
    const vibeGain = (1 + Math.sin((2 * Math.PI * hz * t) / 1000)) / 2;
    return [
      {
        position: primitive.position,
        coordinateSystem: primitive.coordinateSystem,
        intensity: primitive.intensity * gain * vibeGain,
        modulationHz: hz,
      },
    ];
  });
}

export function renderTexture(primitive: HapticPrimitive, options: RenderOptions): HapticFrame[] {
  return generateFrames(primitive, options, (t, gain) => {
    const hz = primitive.modulationHz ?? 150;
    const textureGain = 0.5 + 0.5 * Math.sin((2 * Math.PI * hz * t) / 1000);
    return [
      {
        position: primitive.position,
        coordinateSystem: primitive.coordinateSystem,
        intensity: primitive.intensity * gain * textureGain,
        modulationHz: hz,
      },
    ];
  });
}

export function renderSoftContact(primitive: HapticPrimitive, options: RenderOptions): HapticFrame[] {
  return generateFrames(primitive, options, (_t, gain) => [
    {
      position: primitive.position,
      coordinateSystem: primitive.coordinateSystem,
      intensity: primitive.intensity * gain * 0.6,
      modulationHz: primitive.modulationHz ?? 180,
    },
  ]);
}
