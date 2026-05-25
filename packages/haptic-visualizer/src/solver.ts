const SPEED_OF_SOUND = 343;
const FREQUENCY = 40_000;
const WAVELENGTH = SPEED_OF_SOUND / FREQUENCY;
const TWO_PI = 2 * Math.PI;
const K = TWO_PI / WAVELENGTH;

export interface Vec3 { x: number; y: number; z: number }

export interface TransducerState {
  position: Vec3;
  phase: number;
  amplitude: number;
  enabled: boolean;
}

export function createGridArray(rows: number, cols: number, spacing: number): Vec3[] {
  const positions: Vec3[] = [];
  const offsetX = ((cols - 1) * spacing) / 2;
  const offsetY = ((rows - 1) * spacing) / 2;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      positions.push({ x: c * spacing - offsetX, y: r * spacing - offsetY, z: 0 });
    }
  }
  return positions;
}

export function solveFocusPhases(transducers: Vec3[], focus: Vec3): TransducerState[] {
  return transducers.map((t) => {
    const dx = t.x - focus.x;
    const dy = t.y - focus.y;
    const dz = t.z - focus.z;
    const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
    const phase = ((-K * dist) % TWO_PI + TWO_PI) % TWO_PI;
    return { position: t, phase, amplitude: 1, enabled: true };
  });
}

export function computePressureField(
  states: TransducerState[],
  xRange: [number, number],
  yRange: [number, number],
  z: number,
  resolution: number,
): { data: Float32Array; width: number; height: number; max: number } {
  const width = resolution;
  const height = resolution;
  const data = new Float32Array(width * height);
  const xStep = (xRange[1] - xRange[0]) / (width - 1);
  const yStep = (yRange[1] - yRange[0]) / (height - 1);

  let max = 0;

  for (let j = 0; j < height; j++) {
    const py = yRange[0] + j * yStep;
    for (let i = 0; i < width; i++) {
      const px = xRange[0] + i * xStep;
      let re = 0;
      let im = 0;
      for (const s of states) {
        if (!s.enabled) continue;
        const dx = s.position.x - px;
        const dy = s.position.y - py;
        const dz = s.position.z - z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        const totalPhase = s.phase + K * dist;
        re += s.amplitude * Math.cos(totalPhase);
        im += s.amplitude * Math.sin(totalPhase);
      }
      const pressure = Math.sqrt(re * re + im * im);
      data[j * width + i] = pressure;
      if (pressure > max) max = pressure;
    }
  }

  return { data, width, height, max };
}
