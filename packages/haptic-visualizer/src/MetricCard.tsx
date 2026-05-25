interface MetricCardProps {
  label: string;
  value: string;
  description?: string;
  tone?: 'blue' | 'green' | 'orange' | 'purple';
}

const toneClass = {
  blue: 'bg-blue-50 text-blue-700 border-blue-100',
  green: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  orange: 'bg-amber-50 text-amber-700 border-amber-100',
  purple: 'bg-violet-50 text-violet-700 border-violet-100',
};

export default function MetricCard({ label, value, description, tone = 'blue' }: MetricCardProps) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
      <div className="mb-3 text-sm text-slate-500">{label}</div>
      <div className={`inline-flex rounded-full border px-3 py-1 text-lg font-semibold ${toneClass[tone]}`}>
        {value}
      </div>
      {description ? <div className="mt-3 text-xs leading-5 text-slate-500">{description}</div> : null}
    </div>
  );
}
