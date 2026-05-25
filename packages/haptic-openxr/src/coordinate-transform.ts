import type { CoordinateSystem, Vector3 } from "@openhapticai/haptic-core";

export interface TransformMatrix {
  rotation: [number, number, number, number, number, number, number, number, number];
  translation: Vector3;
}

export function identityTransform(): TransformMatrix {
  return {
    rotation: [1, 0, 0, 0, 1, 0, 0, 0, 1],
    translation: { x: 0, y: 0, z: 0 },
  };
}

export function applyTransform(point: Vector3, transform: TransformMatrix): Vector3 {
  const r = transform.rotation;
  const t = transform.translation;
  return {
    x: r[0] * point.x + r[1] * point.y + r[2] * point.z + t.x,
    y: r[3] * point.x + r[4] * point.y + r[5] * point.z + t.y,
    z: r[6] * point.x + r[7] * point.y + r[8] * point.z + t.z,
  };
}

export type TransformRegistry = Map<`${CoordinateSystem}->${CoordinateSystem}`, TransformMatrix>;

export function createTransformRegistry(): TransformRegistry {
  return new Map();
}

export function registerTransform(
  registry: TransformRegistry,
  from: CoordinateSystem,
  to: CoordinateSystem,
  transform: TransformMatrix,
): void {
  registry.set(`${from}->${to}`, transform);
}

export function transformPoint(
  registry: TransformRegistry,
  point: Vector3,
  from: CoordinateSystem,
  to: CoordinateSystem,
): Vector3 {
  if (from === to) return point;

  const transform = registry.get(`${from}->${to}`);
  if (!transform) {
    throw new Error(`No transform registered from ${from} to ${to}.`);
  }
  return applyTransform(point, transform);
}
