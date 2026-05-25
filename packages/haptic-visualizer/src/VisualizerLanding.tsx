import FeatureGrid from './FeatureGrid';
import SimulatorPanel from './SimulatorPanel';

export default function VisualizerLanding() {
  return (
    <div className="min-h-screen bg-[#F5F8FC] text-slate-950">
      <section className="bg-[#07111F] text-white">
        <Header />
        <div className="mx-auto grid max-w-7xl gap-10 px-6 pb-14 pt-10 lg:grid-cols-[1fr_480px] lg:items-center lg:pb-16 lg:pt-14">
          <div>
            <div className="mb-6 inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-white/80">
              原创开源 AI 空间触觉框架
            </div>
            <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
              面向科研、产业和政企演示的空间触觉仿真平台
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/68">
              OpenHapticAI 将触觉意图、声场求解、硬件抽象和仿真验证整合为统一工程链路，让 AI 场景具备可计算、可验证、可输出的触觉反馈能力。
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#simulator" className="rounded-full bg-white px-6 py-3 text-sm font-medium text-slate-950">查看仿真</a>
              <a href="https://github.com/heweijie1/brain-ai-openhaptic" target="_blank" className="rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white/90">查看文档</a>
            </div>
          </div>
          <HeroPreview />
        </div>
      </section>
      <div id="simulator">
        <SimulatorPanel />
      </div>
      <FeatureGrid />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="border-b border-white/10">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-sm font-semibold text-white">H</div>
          <div>
            <div className="text-base font-semibold">OpenHapticAI</div>
            <div className="text-xs text-white/45">空间触觉智能平台</div>
          </div>
        </div>
        <nav className="hidden items-center gap-8 text-sm text-white/62 md:flex">
          <a href="#simulator">声场仿真</a>
          <span>技术架构</span>
          <span>安全合规</span>
          <a href="https://github.com/heweijie1/brain-ai-openhaptic" target="_blank">代码仓库</a>
        </nav>
      </div>
    </header>
  );
}

function HeroPreview() {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white p-4 text-slate-950 shadow-2xl shadow-blue-950/35">
      <div className="mb-4 flex items-center justify-between px-1">
        <div>
          <div className="text-sm font-semibold">声压场预览</div>
          <div className="mt-1 text-xs text-slate-500">静态设计稿 · 后续接入真实仿真</div>
        </div>
        <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">安全通过</div>
      </div>
      <div className="grid gap-4 md:grid-cols-[1fr_160px]">
        <div className="relative aspect-square overflow-hidden rounded-3xl bg-[#eef5ff]">
          <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at center, #f59e0b 0 3%, #2563eb 4% 9%, #93c5fd 10% 20%, #dbeafe 21% 45%, #eff6ff 46% 100%)' }} />
          <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(37,99,235,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.08) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        </div>
        <div className="grid gap-3">
          <MiniMetric label="峰值声压" value="249.0" />
          <MiniMetric label="焦点高度" value="200 mm" />
          <MiniMetric label="阵列规模" value="16 × 16" />
        </div>
      </div>
    </div>
  );
}

function MiniMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <div className="text-xs text-slate-500">{label}</div>
      <div className="mt-2 font-mono text-lg font-semibold text-slate-950">{value}</div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 text-sm text-slate-500">
        <span>© 2026 深圳兆小白人工智能 · OpenHapticAI</span>
        <span>作者：吴龙</span>
      </div>
    </footer>
  );
}
