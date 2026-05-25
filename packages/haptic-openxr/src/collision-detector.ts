import type { Vector3 } from "@openhapticai/haptic-core";
import type { CollisionEvent, HandPose } from "./types";

export interface BoundingSphere {
  objectId: string;
  center: Vector3;
  radiusM: number;
}

function distance(a: Vector3, b: Vector3): number {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  const dz = a.z - b.z;
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

function subtract(a: Vector3, b: Vector3): Vector3 {
  return { x: a.x - b.x, y: a.y - b.y, z: a.z - b.z };
}

function normalize(v: Vector3): Vector3 {
  const len = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
  if (len === 0) return { x: 0, y: 0, z: 1 };
  return { x: v.x / len, y: v.y / len, z: v.z / len };
}

export function detectCollisions(
  hand: HandPose,
  objects: BoundingSphere[],
): CollisionEvent[] {
  const events: CollisionEvent[] = [];
  const fingertip = hand.indexTipPosition;

  for (const obj of objects) {
    const dist = distance(fingertip, obj.center);
    if (dist < obj.radiusM) {
      const penetration = obj.radiusM - dist;
      const normal = normalize(subtract(fingertip, obj.center));
      events.push({
        handedness: hand.handedness,
        jointId: "index_tip",
        objectId: obj.objectId,
        contactPosition: fingertip,
        contactNormal: normal,
        penetrationDepthM: penetration,
        timestampMs: hand.timestampMs,
      });
    }
  }

  return events;
}
