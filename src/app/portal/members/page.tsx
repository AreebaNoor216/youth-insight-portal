import React from 'react';
import { prisma } from '@/lib/prisma';
import { Users, Mail, Phone, ShieldCheck, UserCheck } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function PortalMembersPage() {
  const chapter = await prisma.chapter.findFirst({
    where: { slug: 'haripur' },
    include: {
      cabinetMembers: {
        orderBy: { order: 'asc' }
      }
    }
  });

  const cabinet = chapter?.cabinetMembers || [];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="font-heading text-2xl font-bold text-white">
          Cabinet Roster & Volunteer Registry
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Registered office bearers and department executive heads for Haripur Chapter (Tenure 2025-2026).
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {cabinet.map((member) => (
          <div
            key={member.id}
            className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 space-y-3"
          >
            <div className="flex items-center gap-3">
              <img
                src={member.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
                alt={member.name}
                className="h-12 w-12 rounded-full object-cover border border-slate-700"
              />
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-400">
                  {member.roleTitle}
                </span>
                <h4 className="text-sm font-bold text-white">{member.name}</h4>
              </div>
            </div>

            <div className="space-y-1 text-xs text-slate-400 border-t border-slate-800/80 pt-2">
              <p className="text-slate-300 leading-relaxed text-[11px]">{member.bio}</p>
              {member.email && (
                <div className="flex items-center gap-2 pt-1 text-[11px]">
                  <Mail className="h-3 w-3 text-brand-400" />
                  <span className="truncate">{member.email}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
