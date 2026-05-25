import MetricCard from './MetricCard';

export default function SimulatorPanel() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-12">
      <div className="rounded-[2rem] border border-slate-100 bg-white p-5 shadow-xl shadow-slate-200/60 md:p-6">
        <div className="mb-5 flex flex-col justify-between gap-4 border-b border-slate-100 pb-5 md:flex-row md:items-center">
          <div>
            <div className="mb-2 text-sm font-medium text-blue-600">仿真工作台</div>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950">声压场静态设计稿</h2>
          </div>
          <div className="inline-flex w-fit items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            安全配置已启用
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1fr_340px]">
          <div className="rounded-3xl bg-slate-50 p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="text-base font-semibold text-slate-950">声压热力图</div>
                <div className="mt-1 text-sm text-slate-500">观测平面：Z = 200 mm</div>
              </div>
              <div className="rounded-full bg-white px-3 py-1 text-xs text-slate-500 shadow-sm">120 × 120 采样</div>
            </div>
            <div className="grid gap-5 md:grid-cols-[minmax(260px,420px)_1fr] md:items-center">
              <div className="relative aspect-square overflow-hidden rounded-3xl border border-slate-200 bg-[#eef5ff]">
                <div className="absolute inset-0 opacity-90" style={{ background: 'radial-gradient(circle at center, #f59e0b 0 2.5%, #2563eb 3% 7%, #93c5fd 8% 16%, #dbeafe 17% 38%, #eff6ff 39% 100%)' }} />
                <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(37,99,235,0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.09) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
                <div className="absolute left-1/2 top-1/2 h-12 w-px -translate-y-1/2 bg-white/80" />
                <div className="absolute left-1/2 top-1/2 h-px w-12 -translate-x-1/2 bg-white/80" />
                <div className="absolute bottom-3 left-3 text-xs text-slate-400">-120 mm</div>
                <div className="absolute bottom-3 right-3 text-xs text-slate-400">+120 mm</div>
              </div>
              <div className="space-y-4">
                <MetricCard label="峰值声压" value="249.0" description="静态示意值，后续接入真实 solver 输出。" tone="orange" />
                <MetricCard label="阵列规模" value="16 × 16" description="256 个换能器，间距 10.5 mm。" tone="blue" />
                <MetricCard label="载波频率" value="40 kHz" description="第一阶段固定载波频率，后续支持设备配置。" tone="purple" />
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
              <div className="mb-4 text-base font-semibold text-slate-950">焦点位置</div>
              <ControlRow label="X 轴偏移" value="0.0 mm" />
              <ControlRow label="Y 轴偏移" value="0.0 mm" />
              <ControlRow label="焦点高度" value="200 mm" />
            </div>
            <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
              <div className="mb-4 text-base font-semibold text-slate-950">输出状态</div>
              <StatusRow label="安全限制" value="通过" ok />
              <StatusRow label="计算耗时" value="24 ms" />
              <StatusRow label="采样点数" value="14,400" />
              <StatusRow label="硬件输出" value="未连接" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ControlRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="mb-4 last:mb-0">
      <div className="mb-2 flex justify-between text-sm">
        <span className="text-slate-500">{label}</span>
        <span className="font-mono text-slate-900">{value}</span>
      </div>
      <div className="h-2 rounded-full bg-slate-100">
        <div className="h-2 w-1/2 rounded-full bg-blue-600" />
      </div>
    </div>
  );
}

function StatusRow({ label, value, ok }: { label: string; value: string; ok?: boolean }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-100 py-3 text-sm last:border-b-0">
      <span className="text-slate-500">{label}</span>
      <span className={ok ? 'font-medium text-emerald-600' : 'font-mono text-slate-900'}>{value}</span>
    </div>
  );
}
