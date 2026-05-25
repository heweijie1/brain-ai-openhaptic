import type { HapticFrame, HapticPrimitive } from "@openhapticai/haptic-core";
import type { RenderOptions } from "./renderers";
import {
  renderPress,
  renderPulse,
  renderSoftContact,
  renderTap,
  renderTexture,
  renderVibration,
} from "./renderers";

export function renderPrimitive(
  primitive: HapticPrimitive,
  options: RenderOptions = { frameRateHz: 1000 },
): HapticFrame[] {
  switch (primitive.primitive) {
    case "tap":
      return renderTap(primitive, options);
    case "press":
      return renderPress(primitive, options);
    case "pulse":
      return renderPulse(primitive, options);
    case "vibration":
      return renderVibration(primitive, options);
    case "texture":
      return renderTexture(primitive, options);
    case "soft_contact":
      return renderSoftContact(primitive, options);
    case "stroke":
    case "edge":
    case "surface":
      return renderTap(primitive, options);
    default:
      return renderTap(primitive, options);
  }
}
