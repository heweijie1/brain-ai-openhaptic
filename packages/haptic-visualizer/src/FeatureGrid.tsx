const features = [
  {
    title: 'AI 触觉意图',
    desc: '将自然语言、空间事件和材料语义统一转化为可验证的触觉意图。',
  },
  {
    title: '声场求解',
    desc: '围绕焦点、相位、幅度和安全约束形成清晰的工程计算链路。',
  },
  {
    title: '仿真验证',
    desc: '在接入真实硬件之前，先通过可视化方式验证声压分布与参数变化。',
  },
  {
    title: '安全边界',
    desc: '对强度、持续时间、焦点数量和设备能力进行统一约束。',
  },
];

export default function FeatureGrid() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-7 flex items-end justify-between gap-6">
        <div>
          <div className="mb-2 text-sm font-medium text-blue-600">核心能力</div>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-950">从意图到声场的完整链路</h2>
        </div>
        <p className="hidden max-w-md text-sm leading-7 text-slate-500 md:block">
          第一版可视化页面聚焦仿真可信度和工程表达，避免炫技式界面。
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        {features.map((item) => (
          <div key={item.title} className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
            <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-sm font-semibold text-blue-600">
              {item.title.slice(0, 2)}
            </div>
            <h3 className="mb-3 text-base font-semibold text-slate-950">{item.title}</h3>
            <p className="text-sm leading-7 text-slate-500">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
