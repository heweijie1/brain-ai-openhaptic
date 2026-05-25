export type CoordinateSystem = "array_local" | "world" | "openxr" | "unity";

export interface Vector3 {
  x: number;
  y: number;
  z: number;
}

export interface Pose {
  position: Vector3;
  rotation?: {
    x: number;
    y: number;
    z: number;
    w: number;
  };
  coordinateSystem: CoordinateSystem;
}

export type HapticMaterial =
  | "skin"
  | "cloth"
  | "hair"
  | "stone"
  | "metal"
  | "wood"
  | "glass"
  | "generic";

export type HapticIntentType =
  | "touch_contact"
  | "button_press"
  | "warning_pulse"
  | "material_texture"
  | "edge_contact"
  | "surface_contact"
  | "gesture_feedback";

export interface HapticIntent {
  id: string;
  type: HapticIntentType;
  position: Vector3;
  coordinateSystem: CoordinateSystem;
  intensity: number;
  durationMs: number;
  material?: HapticMaterial;
  objectId?: string;
  semantic?: string;
  metadata?: Record<string, string | number | boolean>;
}

export type HapticPrimitiveType =
  | "tap"
  | "press"
  | "pulse"
  | "vibration"
  | "stroke"
  | "texture"
  | "edge"
  | "surface"
  | "soft_contact";

export type HapticEnvelope =
  | "instant"
  | "linear"
  | "smooth_attack"
  | "smooth_release"
  | "smooth_attack_release";

export interface HapticPrimitive {
  id: string;
  primitive: HapticPrimitiveType;
  position: Vector3;
  coordinateSystem: CoordinateSystem;
  intensity: number;
  durationMs: number;
  modulationHz?: number;
  envelope?: HapticEnvelope;
  material?: HapticMaterial;
}

export interface FocusPoint {
  position: Vector3;
  coordinateSystem: CoordinateSystem;
  intensity: number;
  modulationHz?: number;
}

export interface HapticFrame {
  timestampMs: number;
  focusPoints: FocusPoint[];
}

export interface Transducer {
  id: number;
  position: Vector3;
  normal?: Vector3;
  enabled: boolean;
}

export interface ArrayGeometry {
  id: string;
  coordinateSystem: CoordinateSystem;
  carrierFrequencyHz: number;
  transducers: Transducer[];
}

export interface DeviceProfile {
  id: string;
  name: string;
  backend: "simulation" | "generic_array" | "compatibility_layer" | "diy_array";
  geometry: ArrayGeometry;
  maxFocusPoints: number;
  supportsAmplitudeControl: boolean;
  supportsPhaseControl: boolean;
  supportsModulation: boolean;
}

export interface SafetyProfile {
  maxIntensity: number;
  maxDurationMs: number;
  maxDutyCycle: number;
  maxFocusPoints: number;
  allowedCoordinateSystems: CoordinateSystem[];
  forbiddenZones?: Array<{
    id: string;
    center: Vector3;
    radiusM: number;
  }>;
}

export interface PhaseAmplitudeChannel {
  id: number;
  phaseRad: number;
  amplitude: number;
  enabled: boolean;
}

export interface PhaseAmplitudeFrame {
  timestampMs: number;
  frequencyHz: number;
  channels: PhaseAmplitudeChannel[];
  safetyLimited: boolean;
}

export type TouchPhase = "approach" | "press" | "hold" | "slide" | "release";

export interface TactileSample {
  sessionId: string;
  material: HapticMaterial;
  timestampMs: number;
  normalForceN?: number;
  pressureMatrix?: number[][];
  acceleration?: Vector3;
  vibration?: number;
  slidingVelocityMps?: number;
  touchPhase: TouchPhase;
  humanRating?: number;
  metadata?: Record<string, string | number | boolean>;
}

export interface HardwareBackend {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  getDeviceProfile(): DeviceProfile;
  sendFrame(frame: PhaseAmplitudeFrame): Promise<void>;
  start(): Promise<void>;
  stop(): Promise<void>;
  emergencyStop(): Promise<void>;
}
