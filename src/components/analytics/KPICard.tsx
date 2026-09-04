import React from 'react';
import { LucideIcon } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  subtext?: string;
  change?: string;
  changeType?: 'positive' | 'neutral' | 'negative';
  icon: LucideIcon;
  colorScheme?: 'emerald' | 'cyan' | 'amber' | 'indigo';
}

export function KPICard({
  title,
  value,
  subtext,
  change,
  changeType = 'positive',
  icon: Icon,
  colorScheme = 'emerald'
}: KPICardProps) {
  const schemeClasses = {
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800',
    cyan: 'bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-950/40 dark:text-cyan-400 dark:border-cyan-800',
    amber: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800',
    indigo: 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-400 dark:border-indigo-800',
  }[colorScheme];

  const iconBgClasses = {
    emerald: 'bg-emerald-600 text-white',
    cyan: 'bg-cyan-600 text-white',
    amber: 'bg-amber-600 text-white',
    indigo: 'bg-indigo-600 text-white',
  }[colorScheme];

  return (
    <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 transition-all hover:shadow-md">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider dark:text-slate-400">
          {title}
        </span>
        <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${iconBgClasses} shadow-sm`}>
          <Icon className="h-4 w-4" />
        </div>
      </div>

      <div className="mt-3">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-heading">
          {value}
        </h3>
        <div className="mt-1 flex items-center gap-2">
          {change && (
            <span className={`text-[11px] font-bold px-1.5 py-0.5 rounded ${
              changeType === 'positive' ? 'text-emerald-700 bg-emerald-50 dark:bg-emerald-950/50 dark:text-emerald-300' : 'text-slate-600 bg-slate-100'
            }`}>
              {change}
            </span>
          )}
          {subtext && <span className="text-xs text-slate-400">{subtext}</span>}
        </div>
      </div>
    </div>
  );
}
