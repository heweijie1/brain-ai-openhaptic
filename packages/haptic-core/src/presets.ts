import type { HapticMaterial, HapticPrimitive } from "./types";

export interface MaterialPreset {
  material: HapticMaterial;
  primitive: HapticPrimitive["primitive"];
  intensity: number;
  modulationHz: number;
  envelope: HapticPrimitive["envelope"];
  durationMs: number;
}

export const MATERIAL_PRESETS: Record<"skin" | "cloth" | "hair" | "stone", MaterialPreset> = {
  skin: {
    material: "skin",
    primitive: "soft_contact",
    intensity: 0.38,
    modulationHz: 180,
    envelope: "smooth_attack_release",
    durationMs: 320,
  },
  cloth: {
    material: "cloth",
    primitive: "texture",
    intensity: 0.32,
    modulationHz: 145,
    envelope: "smooth_attack_release",
    durationMs: 260,
  },
  hair: {
    material: "hair",
    primitive: "vibration",
    intensity: 0.24,
    modulationHz: 220,
    envelope: "smooth_attack",
    durationMs: 180,
  },
  stone: {
    material: "stone",
    primitive: "press",
    intensity: 0.55,
    modulationHz: 120,
    envelope: "instant",
    durationMs: 220,
  },
};
