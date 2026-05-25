export interface HapticToolCall {
  name: "generate_haptic_intent";
  parameters: {
    object_id?: string;
    material?: string;
    action?: string;
    position?: { x: number; y: number; z: number };
    intensity?: number;
    duration_ms?: number;
    semantic?: string;
  };
}

export const HAPTIC_TOOL_SCHEMA = {
  name: "generate_haptic_intent",
  description:
    "Generate a spatial haptic feedback intent for a given object, material, and action. " +
    "The system will convert this intent into ultrasonic phased-array output.",
  parameters: {
    type: "object",
    properties: {
      object_id: {
        type: "string",
        description: "ID of the virtual object being interacted with.",
      },
      material: {
        type: "string",
        enum: ["skin", "cloth", "hair", "stone", "metal", "wood", "glass", "generic"],
        description: "Material of the object surface.",
      },
      action: {
        type: "string",
        enum: [
          "touch_contact",
          "button_press",
          "warning_pulse",
          "material_texture",
          "edge_contact",
          "surface_contact",
          "gesture_feedback",
        ],
        description: "Type of haptic action.",
      },
      position: {
        type: "object",
        properties: {
          x: { type: "number" },
          y: { type: "number" },
          z: { type: "number" },
        },
        required: ["x", "y", "z"],
        description: "Position of the haptic feedback in meters.",
      },
      intensity: {
        type: "number",
        minimum: 0,
        maximum: 1,
        description: "Normalized intensity (0-1).",
      },
      duration_ms: {
        type: "number",
        minimum: 0,
        description: "Duration of the haptic feedback in milliseconds.",
      },
      semantic: {
        type: "string",
        description: "Free-form semantic description for the AI to interpret.",
      },
    },
    required: ["action"],
  },
} as const;
