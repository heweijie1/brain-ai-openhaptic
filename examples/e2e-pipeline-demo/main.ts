import {
  type HapticPrimitive,
  type SafetyProfile,
  MATERIAL_PRESETS,
  validateHapticIntent,
} from "@openhapticai/haptic-core";
import { buildIntentFromToolCall, type HapticToolCall } from "@openhapticai/haptic-agent";
import { renderPrimitive } from "@openhapticai/haptic-renderer";
import { solveFrame } from "@openhapticai/haptic-field-solver";
import {
  createGridArrayGeometry,
  createSimulationDeviceProfile,
  SimulationBackend,
} from "@openhapticai/haptic-simulation";

// --- Step 1: Simulate an AI tool call ---
const toolCall: HapticToolCall = {
  name: "generate_haptic_intent",
  parameters: {
    material: "cloth",
    action: "material_texture",
    intensity: 0.35,
    duration_ms: 300,
    position: { x: 0, y: 0, z: 0.2 },
    semantic: "soft silk cloth texture",
  },
};

console.log("=== Step 1: AI Tool Call ===");
console.log(JSON.stringify(toolCall, null, 2));

// --- Step 2: Build HapticIntent from tool call ---
const intent = buildIntentFromToolCall(toolCall);
const intentErrors = validateHapticIntent(intent);

console.log("\n=== Step 2: HapticIntent ===");
console.log(JSON.stringify(intent, null, 2));
if (intentErrors.length > 0) {
  console.error("Validation errors:", intentErrors);
  process.exit(1);
}

// --- Step 3: Map intent to HapticPrimitive using material preset ---
const preset = MATERIAL_PRESETS.cloth;
const primitive: HapticPrimitive = {
  id: `prim-${intent.id}`,
  primitive: preset.primitive,
  position: intent.position,
  coordinateSystem: intent.coordinateSystem,
  intensity: intent.intensity,
  durationMs: intent.durationMs,
  modulationHz: preset.modulationHz,
  envelope: preset.envelope,
  material: intent.material,
};

console.log("\n=== Step 3: HapticPrimitive ===");
console.log(JSON.stringify(primitive, null, 2));

// --- Step 4: Render primitive to HapticFrames ---
const frames = renderPrimitive(primitive, { frameRateHz: 1000 });

console.log("\n=== Step 4: Rendered Frames ===");
console.log(`Total frames: ${frames.length}`);
console.log(`First frame:`, JSON.stringify(frames[0], null, 2));
console.log(`Last frame:`, JSON.stringify(frames[frames.length - 1], null, 2));

// --- Step 5: Set up array geometry and solve phases ---
const geometry = createGridArrayGeometry({
  id: "sim-array-16x16",
  rows: 16,
  columns: 16,
  spacingM: 0.0105,
  carrierFrequencyHz: 40_000,
});

const safetyProfile: SafetyProfile = {
  maxIntensity: 0.9,
  maxDurationMs: 5000,
  maxDutyCycle: 0.8,
  maxFocusPoints: 1,
  allowedCoordinateSystems: ["array_local", "world", "openxr", "unity"],
};

const phaseFrames = frames.map((frame) => {
  const focus = frame.focusPoints[0];
  return solveFrame(geometry, focus, frame.timestampMs, safetyProfile);
});

console.log("\n=== Step 5: Phase-Amplitude Frames ===");
console.log(`Total PA frames: ${phaseFrames.length}`);
console.log(`First PA frame channels (first 4):`, JSON.stringify(phaseFrames[0].channels.slice(0, 4), null, 2));
console.log(`Safety limited: ${phaseFrames[0].safetyLimited}`);

// --- Step 6: Send to SimulationBackend ---
const profile = createSimulationDeviceProfile(geometry);
const backend = new SimulationBackend(profile);

async function runSimulation() {
  await backend.connect();
  await backend.start();

  for (const paFrame of phaseFrames) {
    await backend.sendFrame(paFrame);
  }

  await backend.stop();
  await backend.disconnect();

  const snapshots = backend.getSnapshots();
  console.log("\n=== Step 6: Simulation Backend ===");
  console.log(`Total snapshots recorded: ${snapshots.length}`);
  console.log(`Device: ${profile.name}`);
  console.log(`Transducers: ${geometry.transducers.length}`);
  console.log(`\n✅ End-to-end pipeline completed successfully!`);
  console.log(`\nPipeline: AI Tool Call → HapticIntent → HapticPrimitive → ${frames.length} Frames → ${phaseFrames.length} PA Frames → ${snapshots.length} Simulation Snapshots`);
}

runSimulation().catch((err) => {
  console.error("Pipeline failed:", err);
  process.exit(1);
});
