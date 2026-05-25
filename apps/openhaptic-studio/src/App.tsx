const resources = [
  { title: '默认工程', meta: '单点焦点仿真' },
  { title: '16×16 超声阵列', meta: '仿真 backend' },
  { title: '皮肤材质预设', meta: '低强度平滑包络' },
  { title: '虚拟按钮场景', meta: '待接入 OpenXR' },
]

const parameters = [
  ['焦点 X', '0.00 m'],
  ['焦点 Y', '0.00 m'],
  ['焦点 Z', '0.18 m'],
  ['载波频率', '40 kHz'],
  ['调制频率', '180 Hz'],
  ['安全功率', '42%'],
]

const logs = [
  'Studio 工作台已加载',
  '当前 backend：SimulationBackend',
  '等待接入 haptic-field-solver 单点求解',
]

function App() {
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

      <section className="workspace">
        <aside className="resource-panel" aria-label="资源栏">
          <div className="panel-title">资源</div>
          <div className="resource-list">
            {resources.map((item) => (
              <button className="resource-card" key={item.title} type="button">
                <span>{item.title}</span>
                <small>{item.meta}</small>
              </button>
            ))}
          </div>
        </aside>

        <section className="center-panel" aria-label="声场工作区">
          <div className="work-header">
            <div>
              <div className="panel-title">声压场预览</div>
              <p>用于承载 2D 声压热力图、阵列视图和焦点轨迹。</p>
            </div>
            <div className="status-pill">仿真模式</div>
          </div>

          <div className="field-canvas" role="img" aria-label="声压场仿真占位图">
            <div className="array-grid">
              {Array.from({ length: 64 }, (_, index) => (
                <span key={index} />
              ))}
            </div>
            <div className="focus-marker">
              <span />
            </div>
          </div>

          <div className="metric-row">
            <Metric label="阵列规模" value="16 × 16" />
            <Metric label="焦点高度" value="18 cm" />
            <Metric label="计算状态" value="待接入" />
          </div>
        </section>

        <aside className="inspector-panel" aria-label="参数面板">
          <div className="panel-title">参数</div>
          <div className="parameter-list">
            {parameters.map(([label, value]) => (
              <div className="parameter-row" key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
          <button className="primary-action" type="button">运行仿真</button>
        </aside>
      </section>

      <footer className="log-panel" aria-label="底部日志">
        {logs.map((log) => (
          <span key={log}>{log}</span>
        ))}
      </footer>
    </main>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="metric-card">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  )
}

export default App
