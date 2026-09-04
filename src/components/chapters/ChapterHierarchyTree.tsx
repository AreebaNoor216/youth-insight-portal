import React from 'react';
import { ShieldCheck, Mail, Phone, UserCheck, Star } from 'lucide-react';

interface CabinetMember {
  id: string;
  name: string;
  roleTitle: string;
  roleCategory: string;
  department?: string | null;
  email?: string | null;
  phone?: string | null;
  avatarUrl?: string | null;
  tenureYear: string;
  bio?: string | null;
  order: number;
}

export function ChapterHierarchyTree({ members }: { members: CabinetMember[] }) {
  const president = members.find((m) => m.roleCategory === 'PRESIDENT') || members[0];
  const vicePresident = members.find((m) => m.roleCategory === 'VICE_PRESIDENT');
  const genSec = members.find((m) => m.roleCategory === 'GENERAL_SECRETARY');
  const leads = members.filter((m) => m.roleCategory === 'DEPARTMENT_LEAD');
  const otherMembers = members.filter(
    (m) => !['PRESIDENT', 'VICE_PRESIDENT', 'GENERAL_SECRETARY', 'DEPARTMENT_LEAD'].includes(m.roleCategory)
  );

  return (
    <div className="space-y-8">
      {/* Tier 1: President */}
      {president && (
        <div className="flex flex-col items-center">
          <div className="w-full max-w-md rounded-2xl border-2 border-brand-500/80 bg-gradient-to-b from-brand-50/70 to-white p-5 text-center shadow-lg shadow-brand-500/10 dark:from-brand-950/40 dark:to-slate-900 dark:border-brand-500/60">
            <div className="relative mx-auto mb-3 h-20 w-20">
              <img
                src={president.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200'}
                alt={president.name}
                className="h-20 w-20 rounded-full object-cover border-2 border-brand-500 shadow-md"
              />
              <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-brand-600 text-white shadow-sm">
                <Star className="h-3.5 w-3.5 fill-white" />
              </span>
            </div>
            <span className="inline-block rounded-full bg-brand-600 px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider text-white">
              {president.roleTitle}
            </span>
            <h4 className="mt-2 text-base font-bold text-slate-900 dark:text-white">{president.name}</h4>
            <p className="text-xs text-brand-700 dark:text-brand-400 font-medium">Tenure: {president.tenureYear}</p>
            {president.bio && <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{president.bio}</p>}
            {president.email && (
              <div className="mt-3 flex items-center justify-center gap-1 text-xs text-slate-500">
                <Mail className="h-3 w-3 text-brand-600" />
                <span>{president.email}</span>
              </div>
            )}
          </div>

          {/* Hierarchy Connector Line */}
          <div className="h-8 w-0.5 bg-slate-300 dark:bg-slate-700"></div>
        </div>
      )}

      {/* Tier 2: Vice President & General Secretary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
        {vicePresident && (
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm text-center dark:border-slate-800 dark:bg-slate-900">
            <img
              src={vicePresident.avatarUrl || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200'}
              alt={vicePresident.name}
              className="mx-auto mb-2 h-16 w-16 rounded-full object-cover border border-slate-200 shadow-sm"
            />
            <span className="inline-block rounded-md bg-emerald-50 text-emerald-800 px-2 py-0.5 text-[10px] font-bold uppercase dark:bg-emerald-950/60 dark:text-emerald-300">
              {vicePresident.roleTitle}
            </span>
            <h5 className="mt-1.5 text-sm font-bold text-slate-900 dark:text-white">{vicePresident.name}</h5>
            <p className="text-[11px] text-slate-500">{vicePresident.bio}</p>
          </div>
        )}

        {genSec && (
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm text-center dark:border-slate-800 dark:bg-slate-900">
            <img
              src={genSec.avatarUrl || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200'}
              alt={genSec.name}
              className="mx-auto mb-2 h-16 w-16 rounded-full object-cover border border-slate-200 shadow-sm"
            />
            <span className="inline-block rounded-md bg-cyan-50 text-cyan-800 px-2 py-0.5 text-[10px] font-bold uppercase dark:bg-cyan-950/60 dark:text-cyan-300">
              {genSec.roleTitle}
            </span>
            <h5 className="mt-1.5 text-sm font-bold text-slate-900 dark:text-white">{genSec.name}</h5>
            <p className="text-[11px] text-slate-500">{genSec.bio}</p>
          </div>
        )}
      </div>

      {/* Tier 3: Department Leads */}
      {leads.length > 0 && (
        <div className="pt-4">
          <h4 className="text-center text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
            Department Leadership Heads
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {leads.map((lead) => (
              <div key={lead.id} className="rounded-xl border border-slate-200/80 bg-white p-3.5 shadow-sm dark:border-slate-800 dark:bg-slate-900 flex items-start gap-3">
                <img
                  src={lead.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
                  alt={lead.name}
                  className="h-12 w-12 rounded-full object-cover shrink-0 border border-slate-100"
                />
                <div>
                  <span className="text-[10px] font-semibold text-brand-600 dark:text-brand-400 block uppercase">
                    {lead.department || lead.roleTitle}
                  </span>
                  <h6 className="text-xs font-bold text-slate-900 dark:text-white">{lead.name}</h6>
                  <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">{lead.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
