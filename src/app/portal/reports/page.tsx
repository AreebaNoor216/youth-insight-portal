import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { PlusCircle, FileText, CheckCircle2, Clock, AlertTriangle, ExternalLink } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function ReportsHistoryPage() {
  const chapter = await prisma.chapter.findFirst({
    where: { slug: 'haripur' },
    include: {
      monthlyReports: {
        orderBy: { createdAt: 'desc' }
      }
    }
  });

  const reports = chapter?.monthlyReports || [];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-white">
            Monthly Activity Reports
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Complete historical archive of submitted monthly reports and Central Cabinet audit status.
          </p>
        </div>

        <Link
          href="/portal/reports/new"
          className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-brand-500 transition-colors shadow-sm"
        >
          <PlusCircle className="h-4 w-4" />
          <span>New Monthly Report</span>
        </Link>
      </div>

      <div className="space-y-4">
        {reports.map((report) => (
          <div
            key={report.id}
            className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-brand-400 bg-brand-950/60 px-2.5 py-1 rounded border border-brand-800/40">
                  {report.reportNumber}
                </span>
                <span className="text-sm font-bold text-white">
                  {report.month} {report.year}
                </span>
              </div>

              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                report.status === 'APPROVED' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                report.status === 'SUBMITTED' ? 'bg-cyan-950 text-cyan-300 border border-cyan-800' :
                'bg-amber-950 text-amber-300 border border-amber-800'
              }`}>
                {report.status}
              </span>
            </div>

            <div>
              <h3 className="text-base font-bold text-white">{report.title}</h3>
              <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">{report.eventSummary}</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-800/40 p-3.5 rounded-xl text-xs text-slate-400">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Attendance</span>
                <span className="font-bold text-white">{report.attendanceCount} Attendees</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Reconciled Expenses</span>
                <span className="font-bold text-white">PKR {report.financialSpent.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Compliance Score</span>
                <span className="font-bold text-emerald-400">{report.complianceScore}%</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Media Links</span>
                {report.mediaDriveLinks ? (
                  <a href={report.mediaDriveLinks} target="_blank" rel="noreferrer" className="text-brand-400 hover:underline truncate block">
                    Drive Vault ↗
                  </a>
                ) : (
                  <span>N/A</span>
                )}
              </div>
            </div>

            {report.adminFeedback && (
              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/40 text-xs text-emerald-300">
                <strong>Central Cabinet Feedback:</strong> "{report.adminFeedback}"
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
