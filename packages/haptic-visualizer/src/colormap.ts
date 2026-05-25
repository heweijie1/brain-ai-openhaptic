export function pressureToColor(normalized: number): [number, number, number] {
  const t = Math.max(0, Math.min(1, normalized));

  if (t < 0.25) {
    const s = t / 0.25;
    return [0, Math.round(s * 60), Math.round(40 + s * 140)];
  } else if (t < 0.5) {
    const s = (t - 0.25) / 0.25;
    return [0, Math.round(60 + s * 160), Math.round(180 - s * 30)];
  } else if (t < 0.75) {
    const s = (t - 0.5) / 0.25;
    return [Math.round(s * 255), Math.round(220 + s * 35), Math.round(150 - s * 100)];
  } else {
    const s = (t - 0.75) / 0.25;
    return [255, Math.round(255 - s * 60), Math.round(50 - s * 50)];
  }
}

export function renderHeatmap(
  canvas: HTMLCanvasElement,
  data: Float32Array,
  width: number,
  height: number,
  max: number,
) {
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;
  const imageData = ctx.createImageData(width, height);

  for (let j = 0; j < height; j++) {
    for (let i = 0; i < width; i++) {
      const idx = j * width + i;
      const norm = max > 0 ? data[idx] / max : 0;
      const [r, g, b] = pressureToColor(norm);
      const pIdx = idx * 4;
      imageData.data[pIdx] = r;
      imageData.data[pIdx + 1] = g;
      imageData.data[pIdx + 2] = b;
      imageData.data[pIdx + 3] = 255;
    }
  }

  ctx.putImageData(imageData, 0, 0);
}
