'use client';

import React, { useState } from 'react';
import { CheckCircle2, XCircle, Clock, FileText, AlertCircle, Loader2 } from 'lucide-react';
import { updateReportStatusAction } from '@/server/actions';

interface ReportWithChapter {
  id: string;
  reportNumber: string;
  month: string;
  year: number;
  title: string;
  eventSummary: string;
  attendanceCount: number;
  targetAchievements: string;
  financialBudget: number;
  financialSpent: number;
  complianceScore: number;
  status: string;
  adminFeedback?: string | null;
  chapter: {
    name: string;
    university: {
      name: string;
      city: string;
    }
  }
}

export function AdminReportReviewClient({ initialReports }: { initialReports: ReportWithChapter[] }) {
  const [reports, setReports] = useState(initialReports);
  const [selectedReport, setSelectedReport] = useState<ReportWithChapter | null>(null);
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleStatusChange(status: 'APPROVED' | 'REVISION_REQUESTED') {
    if (!selectedReport) return;
    setLoading(true);

    const res = await updateReportStatusAction(
      selectedReport.id,
      status,
      feedback || (status === 'APPROVED' ? 'Approved and cleared by Central Secretariat.' : 'Please revise attendance and financial vouchers.')
    );

    setLoading(false);
    if (res.success) {
      setReports((prev) =>
        prev.map((r) => (r.id === selectedReport.id ? { ...r, status, adminFeedback: feedback } : r))
      );
      setSelectedReport(null);
      setFeedback('');
    }
  }

  return (
    <div className="space-y-4">
      {reports.map((report) => (
        <div
          key={report.id}
          className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 space-y-4 hover:border-slate-700 transition-all"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <span className="text-xs font-bold text-cyan-400 font-mono">
                {report.reportNumber}
              </span>
              <span className="text-slate-600 mx-2">•</span>
              <span className="text-sm font-bold text-white">
                {report.chapter.name} ({report.month} {report.year})
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
            <h4 className="text-base font-bold text-white">{report.title}</h4>
            <p className="text-xs text-slate-300 mt-1">{report.eventSummary}</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-800/40 p-3 rounded-xl text-xs text-slate-400">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Attendance</span>
              <span className="font-bold text-white">{report.attendanceCount}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Reconciled Spent</span>
              <span className="font-bold text-white">PKR {report.financialSpent.toLocaleString()}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Compliance</span>
              <span className="font-bold text-emerald-400">{report.complianceScore}%</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Institution</span>
              <span className="font-bold text-white truncate block">{report.chapter.university.name}</span>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => {
                setSelectedReport(report);
                setFeedback(report.adminFeedback || '');
              }}
              className="rounded-xl bg-slate-800 hover:bg-slate-700 px-4 py-2 text-xs font-semibold text-white border border-slate-700 transition-colors"
            >
              Audit & Review Report
            </button>
          </div>
        </div>
      ))}

      {/* Review Modal */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-800 p-6 text-white space-y-4">
            <h3 className="font-heading text-lg font-bold">
              Audit Report: {selectedReport.reportNumber}
            </h3>
            <p className="text-xs text-slate-400">
              {selectedReport.chapter.name} • {selectedReport.month} {selectedReport.year}
            </p>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Central Secretariat Review Notes / Instructions
              </label>
              <textarea
                rows={3}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="e.g. Approved and cleared for nationwide archive."
                className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-xs text-white placeholder-slate-500 focus:border-brand-500 focus:outline-none"
              />
            </div>

            <div className="flex gap-2 justify-end pt-2">
              <button
                onClick={() => setSelectedReport(null)}
                className="rounded-xl border border-slate-700 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                disabled={loading}
                onClick={() => handleStatusChange('REVISION_REQUESTED')}
                className="rounded-xl bg-amber-600 px-4 py-2 text-xs font-bold text-white hover:bg-amber-700"
              >
                Request Revision
              </button>
              <button
                disabled={loading}
                onClick={() => handleStatusChange('APPROVED')}
                className="rounded-xl bg-brand-600 px-5 py-2 text-xs font-bold text-white hover:bg-brand-500"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Approve Report'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
