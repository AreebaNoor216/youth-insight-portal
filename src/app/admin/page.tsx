import React from 'react';
import { prisma } from '@/lib/prisma';
import { KPICard } from '@/components/analytics/KPICard';
import { Building2, FileText, CheckCircle2, AlertTriangle, Users, TrendingUp, Download } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function AdminOverviewPage() {
  const chapters = await prisma.chapter.findMany({
    include: { university: true, monthlyReports: true },
    orderBy: { complianceScore: 'desc' }
  });

  const totalReports = await prisma.monthlyReport.count();
  const pendingReports = await prisma.monthlyReport.count({
    where: { status: { in: ['SUBMITTED', 'UNDER_REVIEW'] } }
  });

  const totalVolunteers = chapters.reduce((acc, c) => acc + c.volunteerCount, 0);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-800 p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
            Executive Governance & Society Audits
          </span>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Central Executive Super-Admin
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            Nationwide chapter surveillance, monthly report approvals, financial voucher clearance, and cross-provincial analytics.
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            href="/admin/reports"
            className="inline-flex items-center gap-2 rounded-2xl bg-cyan-600 px-5 py-3 text-xs font-bold text-white hover:bg-cyan-500 transition-colors shadow-lg shadow-cyan-600/20"
          >
            <FileText className="h-4 w-4" />
            <span>Review Pending Reports ({pendingReports})</span>
          </Link>
        </div>
      </div>

      {/* Global Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Active Chapters"
          value={chapters.length}
          subtext="Across 4 provinces & ICT"
          change="100% operational"
          changeType="positive"
          icon={Building2}
          colorScheme="cyan"
        />
        <KPICard
          title="Total Volunteers"
          value={totalVolunteers}
          subtext="Verified student delegates"
          change="+18% growth"
          changeType="positive"
          icon={Users}
          colorScheme="emerald"
        />
        <KPICard
          title="Monthly Reports"
          value={totalReports}
          subtext={`${pendingReports} awaiting audit`}
          change={pendingReports > 0 ? 'Action Needed' : 'All Cleared'}
          changeType={pendingReports > 0 ? 'neutral' : 'positive'}
          icon={FileText}
          colorScheme="amber"
        />
        <KPICard
          title="Avg Compliance"
          value="95.4%"
          subtext="Nationwide society grade"
          change="Tier 1 High"
          changeType="positive"
          icon={TrendingUp}
          colorScheme="indigo"
        />
      </div>

      {/* Nationwide Chapters Table */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-heading text-base font-bold text-white">
            Nationwide Chapter Performance & Compliance Matrix
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="border-b border-slate-800 text-[11px] uppercase tracking-wider text-slate-400 bg-slate-800/40">
              <tr>
                <th className="py-3 px-4">Chapter & Institution</th>
                <th className="py-3 px-4">Province</th>
                <th className="py-3 px-4">Volunteers</th>
                <th className="py-3 px-4">Streak</th>
                <th className="py-3 px-4">Compliance Score</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {chapters.map((ch) => (
                <tr key={ch.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-white flex items-center gap-2">
                    <span>{ch.name}</span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-400">{ch.university.province}</td>
                  <td className="py-3.5 px-4">{ch.volunteerCount}</td>
                  <td className="py-3.5 px-4 font-bold text-brand-400">{ch.streakMonths} Months 🔥</td>
                  <td className="py-3.5 px-4 font-bold text-emerald-400">{ch.complianceScore}%</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                      {ch.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
