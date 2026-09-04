import React from 'react';
import { prisma } from '@/lib/prisma';
import { Building2, Plus, MapPin, Users, Award, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function AdminChaptersPage() {
  const chapters = await prisma.chapter.findMany({
    include: { university: true, cabinetMembers: true },
    orderBy: { impactScore: 'desc' }
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-white">
            Nationwide Chapter Charters
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage chartered university chapters, active presidents, and society registration approvals.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {chapters.map((ch) => (
          <div
            key={ch.id}
            className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 space-y-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                {ch.university.province}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                {ch.status}
              </span>
            </div>

            <div>
              <h3 className="text-base font-bold text-white">{ch.name}</h3>
              <p className="text-xs text-slate-400">{ch.university.name} • {ch.university.city}</p>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs bg-slate-800/40 p-3 rounded-xl">
              <div>
                <span className="font-bold text-white block">{ch.volunteerCount}</span>
                <span className="text-[10px] text-slate-500">Volunteers</span>
              </div>
              <div>
                <span className="font-bold text-brand-400 block">{ch.streakMonths} Mo</span>
                <span className="text-[10px] text-slate-500">Streak</span>
              </div>
              <div>
                <span className="font-bold text-emerald-400 block">{ch.complianceScore}%</span>
                <span className="text-[10px] text-slate-500">Compliance</span>
              </div>
            </div>

            <div className="flex justify-between items-center text-xs text-slate-400 pt-2 border-t border-slate-800">
              <span>{ch.cabinetMembers.length} Registered Cabinet Officers</span>
              <Link
                href={`/chapters/${ch.slug}`}
                className="text-brand-400 hover:underline font-semibold"
              >
                View Public Profile →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
