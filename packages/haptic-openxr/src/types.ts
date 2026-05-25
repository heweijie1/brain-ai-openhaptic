import type { CoordinateSystem, Pose, Vector3 } from "@openhapticai/haptic-core";

export interface HandJoint {
  id: string;
  position: Vector3;
  radius: number;
}

export interface HandPose {
  handedness: "left" | "right";
  joints: HandJoint[];
  indexTipPosition: Vector3;
  thumbTipPosition: Vector3;
  palmPosition: Vector3;
  palmNormal: Vector3;
  coordinateSystem: CoordinateSystem;
  timestampMs: number;
}

export interface SpatialAnchor {
  id: string;
  pose: Pose;
  label?: string;
}

export interface CollisionEvent {
  handedness: "left" | "right";
  jointId: string;
  objectId: string;
  contactPosition: Vector3;
  contactNormal: Vector3;
  penetrationDepthM: number;
  timestampMs: number;
}
