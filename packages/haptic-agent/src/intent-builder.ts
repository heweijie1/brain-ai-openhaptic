import type {
  HapticIntent,
  HapticIntentType,
  HapticMaterial,
} from "@openhapticai/haptic-core";
import type { HapticToolCall } from "./tool-schema";

let intentCounter = 0;

function nextId(): string {
  intentCounter += 1;
  return `intent-${Date.now()}-${intentCounter}`;
}

export function buildIntentFromToolCall(call: HapticToolCall): HapticIntent {
  const params = call.parameters;

  return {
    id: nextId(),
    type: (params.action ?? "touch_contact") as HapticIntentType,
    position: params.position ?? { x: 0, y: 0, z: 0.2 },
    coordinateSystem: "array_local",
    intensity: params.intensity ?? 0.5,
    durationMs: params.duration_ms ?? 200,
    material: (params.material as HapticMaterial) ?? undefined,
    objectId: params.object_id,
    semantic: params.semantic,
  };
}
