import React from 'react';
import Link from 'next/link';
import { 
  PlusCircle, 
  FileText, 
  Users, 
  Calendar, 
  Award, 
  TrendingUp, 
  ShieldCheck, 
  Clock, 
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { KPICard } from '@/components/analytics/KPICard';

export const dynamic = 'force-dynamic';

export default async function PresidentDashboardPage() {
  // Fetch Haripur chapter data & reports
  const chapter = await prisma.chapter.findFirst({
    where: { slug: 'haripur' },
    include: {
      monthlyReports: {
        orderBy: { year: 'desc' },
        take: 5
      },
      events: true,
      cabinetMembers: true,
    }
  });

  const reports = chapter?.monthlyReports || [];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Top Banner / Welcome */}
      <div className="rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-800 p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-brand-400 uppercase tracking-wider mb-2">
            <Sparkles className="h-4 w-4" />
            <span>Hazara Regional Division • University of Haripur</span>
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
            Chapter President Dashboard
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-300 max-w-xl">
            Welcome back, <strong>Daniyal Khan</strong>. Manage monthly KPI activity reports, review volunteer metrics, and ensure Central Cabinet compliance.
          </p>
        </div>

        {/* Action Button: "Submit Monthly Report" */}
        <div>
          <Link
            href="/portal/reports/new"
            className="inline-flex items-center gap-2 rounded-2xl bg-brand-600 px-6 py-3.5 text-xs font-bold text-white shadow-lg shadow-brand-600/30 hover:bg-brand-500 transition-all hover:scale-105"
          >
            <PlusCircle className="h-4 w-4" />
            <span>Submit Monthly Report</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Submission Streak"
          value="7 Months 🔥"
          subtext="Consecutive on-time reports"
          change="+1 this month"
          changeType="positive"
          icon={TrendingUp}
          colorScheme="emerald"
        />
        <KPICard
          title="Society Compliance"
          value={`${chapter?.complianceScore || 98}%`}
          subtext="Central Cabinet audit score"
          change="Grade: A+"
          changeType="positive"
          icon={ShieldCheck}
          colorScheme="cyan"
        />
        <KPICard
          title="Active Volunteers"
          value={chapter?.volunteerCount || 68}
          subtext="Verified roster members"
          change="+12 from last cycle"
          changeType="positive"
          icon={Users}
          colorScheme="indigo"
        />
        <KPICard
          title="Events Organized"
          value={chapter?.eventsCount || 19}
          subtext="Workshops & assemblies"
          change="1 upcoming"
          changeType="positive"
          icon={Calendar}
          colorScheme="amber"
        />
      </div>

      {/* Main Grid: Reports & Quick Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Col: Recent Reports Ledger */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-heading text-base font-bold text-white flex items-center gap-2">
              <FileText className="h-4 w-4 text-brand-400" />
              <span>Recent Monthly Activity Reports</span>
            </h3>
            <Link
              href="/portal/reports"
              className="text-xs font-semibold text-brand-400 hover:text-brand-300"
            >
              View Full History →
            </Link>
          </div>

          <div className="space-y-3">
            {reports.map((rep) => (
              <div
                key={rep.id}
                className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 hover:border-slate-700 transition-all space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-brand-400 font-mono">
                      {rep.reportNumber}
                    </span>
                    <span className="text-slate-600">•</span>
                    <span className="text-xs font-semibold text-slate-300">
                      {rep.month} {rep.year}
                    </span>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                    rep.status === 'APPROVED' ? 'bg-emerald-950 text-emerald-300 border border-emerald-700/50' :
                    rep.status === 'SUBMITTED' ? 'bg-cyan-950 text-cyan-300 border border-cyan-700/50' :
                    'bg-amber-950 text-amber-300 border border-amber-700/50'
                  }`}>
                    {rep.status}
                  </span>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-white">{rep.title}</h4>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">{rep.eventSummary}</p>
                </div>

                <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-800/80">
                  <div className="flex gap-4">
                    <span>👥 {rep.attendanceCount} Attendees</span>
                    <span>💰 PKR {rep.financialSpent.toLocaleString()} spent</span>
                    <span>⭐ {rep.complianceScore}% KPI</span>
                  </div>
                  {rep.adminFeedback && (
                    <span className="text-emerald-400 text-[11px] italic truncate max-w-xs">
                      "{rep.adminFeedback}"
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Compliance Status & Quick Actions */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 space-y-4">
            <h3 className="font-heading text-sm font-bold text-white uppercase tracking-wider">
              Governance Checklist
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5 text-slate-300">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">August Report Cleared</p>
                  <p className="text-[11px] text-slate-400">Approved by Central Secretariat.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-slate-300">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Executive Cabinet Registered</p>
                  <p className="text-[11px] text-slate-400">6 office bearers active for 2025-2026.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-slate-300">
                <Clock className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-amber-300">September Report Due</p>
                  <p className="text-[11px] text-slate-400">Submit before October 5, 2026.</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/portal/reports/new"
                className="block w-full text-center rounded-xl bg-slate-800 hover:bg-slate-700 py-2.5 text-xs font-semibold text-brand-300 border border-slate-700 transition-colors"
              >
                Launch Activity Report Wizard
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-brand-900/60 bg-brand-950/30 p-6 border text-xs space-y-2">
            <h4 className="font-bold text-brand-300 uppercase tracking-wider">
              Central Directives
            </h4>
            <p className="text-slate-300 leading-relaxed">
              All chapters are requested to record high-resolution media drive links and obtain university administrative stamp approvals for financial vouchers.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
