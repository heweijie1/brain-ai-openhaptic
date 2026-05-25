import { useState, useRef, useEffect } from 'react'
import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels'
import { useSimulation } from './hooks/useSimulation'

const TWO_PI = Math.PI * 2

function phaseToColor(phaseRad: number): string {
  const hue = ((phaseRad / TWO_PI) * 360 + 360) % 360
  return `hsl(${hue.toFixed(1)}, 80%, 55%)`
}

const RESOURCES = [
  { title: '默认工程', meta: '单点焦点仿真' },
  { title: '16×16 超声阵列', meta: '仿真 backend' },
  { title: '皮肤材质预设', meta: '低强度平滑包络' },
  { title: '虚拟按钮场景', meta: '待接入 OpenXR' },
]

function App() {
  const [focusX, setFocusX] = useState(0)
  const [focusY, setFocusY] = useState(0)
  const [focusZ, setFocusZ] = useState(0.18)
  const [intensity, setIntensity] = useState(0.8)

  const { result, running, logs, run, reset } = useSimulation()
  const logRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollLeft = logRef.current.scrollWidth
    }
  }, [logs])

  const handleRun = () => run({ focusX, focusY, focusZ, intensity })

  const channels = result?.frame.channels ?? []
  const pressureDisplay = result ? `${result.pressurePa.toFixed(4)} Pa` : '—'
  const statusLabel = running ? '计算中…' : result ? '仿真完成' : '就绪'
  const statusClass = running ? 'status-pill running' : result ? 'status-pill done' : 'status-pill'

  return (
    <main className="studio-shell">
      <header className="topbar">
        <div>
          <div className="eyebrow">OpenHapticAI Studio</div>
          <h1>空间触觉仿真工作台</h1>
        </div>
        <nav className="topnav" aria-label="主导航">
          <a>项目</a>
          <a>仿真</a>
          <a>设备</a>
          <a>安全</a>
          <a>帮助</a>
        </nav>
      </header>

      <div className="workspace">
        <PanelGroup direction="horizontal" style={{ height: '100%' }}>
          <Panel defaultSize={20} minSize={14}>
            <aside className="resource-panel" aria-label="资源栏">
              <div className="panel-title">资源</div>
              <div className="resource-list">
                {RESOURCES.map((item) => (
                  <button className="resource-card" key={item.title} type="button">
                    <span>{item.title}</span>
                    <small>{item.meta}</small>
                  </button>
                ))}
              </div>
            </aside>
          </Panel>

          <PanelResizeHandle className="resize-handle" />

          <Panel defaultSize={55} minSize={38}>
            <section className="center-panel" aria-label="声场工作区">
              <div className="work-header">
                <div>
                  <div className="panel-title">声压场预览</div>
                  <p>16×16 超声阵列 · 单点焦点求解 · 相位着色</p>
                </div>
                <div className={statusClass}>{statusLabel}</div>
              </div>

              <div className="field-canvas" role="img" aria-label="声压场仿真图">
                <div className="array-grid-16">
                  {channels.length > 0
                    ? channels.map((ch) => (
                        <span
                          key={ch.id}
                          style={{ background: ch.enabled ? phaseToColor(ch.phaseRad) : '#cbd5e1' }}
                          title={`ch${ch.id} φ=${ch.phaseRad.toFixed(2)} rad A=${ch.amplitude.toFixed(2)}`}
                        />
                      ))
                    : Array.from({ length: 256 }, (_, i) => <span key={i} />)}
                </div>
                <div className="focus-marker">
                  <span />
                </div>
              </div>

              <div className="metric-row">
                <Metric label="阵列规模" value="16 × 16" />
                <Metric label="焦点高度" value={`${(focusZ * 100).toFixed(0)} cm`} />
                <Metric label="焦点声压" value={pressureDisplay} highlight={!!result} />
                <Metric label="启用通道" value={result ? `${result.channelCount}` : '—'} />
              </div>
            </section>
          </Panel>

          <PanelResizeHandle className="resize-handle" />

          <Panel defaultSize={25} minSize={18}>
            <aside className="inspector-panel" aria-label="参数面板">
              <div className="panel-title">参数</div>
              <div className="parameter-list">
                <ParamRow label="焦点 X" value={focusX} unit="m" step={0.01} min={-0.08} max={0.08} onChange={setFocusX} />
                <ParamRow label="焦点 Y" value={focusY} unit="m" step={0.01} min={-0.08} max={0.08} onChange={setFocusY} />
                <ParamRow label="焦点 Z" value={focusZ} unit="m" step={0.01} min={0.05} max={0.50} onChange={setFocusZ} />
                <ParamRow label="激励强度" value={intensity} unit="" step={0.05} min={0.1} max={1.0} onChange={setIntensity} />
                <div className="parameter-row readonly">
                  <span>载波频率</span>
                  <strong>40 kHz</strong>
                </div>
                <div className="parameter-row readonly">
                  <span>调制频率</span>
                  <strong>180 Hz</strong>
                </div>
              </div>
              <div className="action-row">
                <button className="primary-action" type="button" onClick={handleRun} disabled={running}>
                  {running ? '计算中…' : '运行仿真'}
                </button>
                {result && (
                  <button className="reset-action" type="button" onClick={reset}>
                    重置
                  </button>
                )}
              </div>
            </aside>
          </Panel>
        </PanelGroup>
      </div>

      <footer className="log-panel" ref={logRef} aria-label="底部日志">
        {logs.map((log, i) => (
          <span key={i}>{log}</span>
        ))}
      </footer>
    </main>
  )
}

function Metric({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`metric-card${highlight ? ' metric-highlight' : ''}`}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  )
}

function ParamRow({
  label, value, unit, step, min, max, onChange,
}: {
  label: string; value: number; unit: string; step: number; min: number; max: number
  onChange: (v: number) => void
}) {
  return (
    <div className="parameter-row">
      <span>{label}</span>
      <label className="param-input-wrap">
        <input
          type="number"
          className="param-input"
          value={value}
          step={step}
          min={min}
          max={max}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
        />
        {unit && <em>{unit}</em>}
      </label>
    </div>
  )
}

export default App
