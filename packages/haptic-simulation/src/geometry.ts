import type { ArrayGeometry, Transducer } from "@openhapticai/haptic-core";

export interface GridArrayOptions {
  id: string;
  rows: number;
  columns: number;
  spacingM: number;
  carrierFrequencyHz?: number;
}

export function createGridArrayGeometry(options: GridArrayOptions): ArrayGeometry {
  const carrierFrequencyHz = options.carrierFrequencyHz ?? 40_000;
  const transducers: Transducer[] = [];
  const xOffset = ((options.columns - 1) * options.spacingM) / 2;
  const yOffset = ((options.rows - 1) * options.spacingM) / 2;

  for (let row = 0; row < options.rows; row += 1) {
    for (let column = 0; column < options.columns; column += 1) {
      transducers.push({
        id: row * options.columns + column,
        position: {
          x: column * options.spacingM - xOffset,
          y: row * options.spacingM - yOffset,
          z: 0,
        },
        normal: {
          x: 0,
          y: 0,
          z: 1,
        },
        enabled: true,
      });
    }
  }

  return {
    id: options.id,
    coordinateSystem: "array_local",
    carrierFrequencyHz,
    transducers,
  };
}
