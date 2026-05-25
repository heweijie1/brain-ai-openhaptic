import { useCallback, useEffect, useRef, useState } from 'react';
import { createGridArray, solveFocusPhases, computePressureField, type Vec3 } from './solver';
import { renderHeatmap } from './colormap';

const ROWS = 16;
const COLS = 16;
const SPACING = 0.0105;
const RES = 120;
const HALF = 0.12;

export default function PressureField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fx, setFx] = useState(0);
  const [fy, setFy] = useState(0);
  const [fz, setFz] = useState(0.2);
  const [peak, setPeak] = useState(0);
  const [ms, setMs] = useState(0);

  const compute = useCallback(() => {
    const arr = createGridArray(ROWS, COLS, SPACING);
    const focus: Vec3 = { x: fx, y: fy, z: fz };
    const states = solveFocusPhases(arr, focus);
    const t0 = performance.now();
    const field = computePressureField(states, [-HALF, HALF], [-HALF, HALF], fz, RES);
    setMs(Math.round(performance.now() - t0));
    setPeak(field.max);
    if (canvasRef.current) renderHeatmap(canvasRef.current, field.data, field.width, field.height, field.max);
  }, [fx, fy, fz]);

  useEffect(() => { compute(); }, [compute]);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_260px] gap-4">
      {/* 热力图区域 */}
      <div className="rounded-2xl bg-slate-50 border border-slate-100 p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-sm text-slate-900 font-semibold">声压分布</span>
            <p className="text-[11px] text-slate-400 mt-0.5">二维观测平面</p>
          </div>
          <span className="text-[11px] text-slate-400">Z = {(fz * 1000).toFixed(0)} mm</span>
        </div>
        <div className="relative aspect-square w-full max-w-[330px] mx-auto rounded-xl overflow-hidden bg-white border border-slate-100">
          <canvas ref={canvasRef} className="w-full h-full" style={{ imageRendering: 'auto' }} />
          {/* 焦点十字标 */}
          <div className="absolute pointer-events-none" style={{
            left: `${((fx + HALF) / (HALF * 2)) * 100}%`,
            top: `${((fy + HALF) / (HALF * 2)) * 100}%`,
            transform: 'translate(-50%, -50%)',
          }}>
            <div className="w-5 h-px bg-white/80 absolute top-1/2 left-1/2 -translate-x-1/2" />
            <div className="h-5 w-px bg-white/80 absolute top-1/2 left-1/2 -translate-y-1/2" />
          </div>
          {/* 坐标标注 */}
          <span className="absolute bottom-2 left-3 text-[10px] text-white/60">-{HALF * 1000}mm</span>
          <span className="absolute bottom-2 right-3 text-[10px] text-white/60">+{HALF * 1000}mm</span>
          <span className="absolute top-2 left-3 text-[10px] text-white/60">+{HALF * 1000}mm</span>
        </div>
        {/* 色阶 */}
        <div className="flex items-center gap-2 mt-3 justify-center">
          <span className="text-[11px] text-slate-400">弱</span>
          <div className="w-36 h-1.5 rounded-full" style={{
            background: 'linear-gradient(90deg, #eaf2ff, #93c5fd, #2563eb, #f59e0b)',
          }} />
          <span className="text-[11px] text-slate-400">强</span>
        </div>
      </div>

      {/* 右侧控制面板 */}
      <div className="flex flex-col gap-3">
        {/* 焦点位置 */}
        <Panel title="焦点位置">
          <Slider label="X 轴偏移" val={fx} min={-0.1} max={0.1} step={0.001}
            display={`${(fx * 1000).toFixed(1)} mm`} set={setFx} />
          <Slider label="Y 轴偏移" val={fy} min={-0.1} max={0.1} step={0.001}
            display={`${(fy * 1000).toFixed(1)} mm`} set={setFy} />
          <Slider label="焦点高度" val={fz} min={0.05} max={0.4} step={0.005}
            display={`${(fz * 1000).toFixed(0)} mm`} set={setFz} />
        </Panel>

        {/* 阵列信息 */}
        <Panel title="阵列配置">
          <Row label="阵列规格" value={`${ROWS} × ${COLS}`} />
          <Row label="换能器总数" value={`${ROWS * COLS} 个`} />
          <Row label="元件间距" value={`${SPACING * 1000} mm`} />
          <Row label="载波频率" value="40 kHz" />
          <Row label="波长" value="8.575 mm" />
        </Panel>

        {/* 计算结果 */}
        <Panel title="计算结果">
          <Row label="峰值声压" value={peak.toFixed(1)} accent />
          <Row label="计算耗时" value={`${ms} ms`} />
          <Row label="采样网格" value={`${RES} × ${RES}`} />
          <Row label="总采样点" value={`${(RES * RES).toLocaleString()}`} />
        </Panel>

        {/* 重置 */}
        <button onClick={() => { setFx(0); setFy(0); setFz(0.2); }}
          className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium transition-colors">
          重置焦点位置
        </button>
      </div>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-white border border-slate-100 p-4">
      <div className="text-xs text-slate-900 font-semibold mb-3">{title}</div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Slider({ label, val, min, max, step, display, set }: {
  label: string; val: number; min: number; max: number; step: number; display: string; set: (v: number) => void;
}) {
  return (
    <div>
      <div className="flex justify-between mb-1.5">
        <span className="text-[11px] text-slate-500">{label}</span>
        <span className="text-[11px] text-slate-900 font-mono">{display}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={val}
        onChange={(e) => set(parseFloat(e.target.value))}
        className="w-full cursor-pointer" />
    </div>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-[11px] text-slate-500">{label}</span>
      <span className={`text-[11px] font-mono ${accent ? 'text-blue-600 font-semibold' : 'text-slate-800'}`}>{value}</span>
    </div>
  );
}
