'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  FileCheck2, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Save, 
  Send, 
  UploadCloud, 
  DollarSign, 
  Users, 
  CheckCircle2,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { submitMonthlyReportAction } from '@/server/actions';

interface WizardProps {
  chapterId: string;
  chapterName: string;
}

export function ActivityReportWizard({ chapterId, chapterName }: WizardProps) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submittedReport, setSubmittedReport] = useState<any | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    chapterId: chapterId,
    month: 'September',
    year: 2026,
    title: 'Haripur Youth Dialogue & Civic Engagement Forum',
    eventSummary: 'Conducted a 2-day interactive workshop on ethical youth leadership, campus character building, and community service projects with 250+ university students and faculty leads.',
    attendanceCount: 250,
    speakerDetails: '1. Dr. Farooq Khan (Keynote Speaker)\n2. Ms. Ayesha Noor (Leadership Mentor)\n3. Prof. Tariq Mansoor (Youth Civic Duty)',
    targetAchievements: 'Trained 250 students in moral reasoning; Formed 5 campus volunteer circles; Collected 45 mentorship inquiries.',
    feedbackRating: 4.9,
    complianceScore: 98,
    financialBudget: 45000,
    financialSpent: 42000,
    financialNotes: 'All venue setup, sound system, and refreshment expenses reconciled. PKR 3,000 balance remaining.',
    mediaDriveLinks: 'https://drive.google.com/drive/folders/youthinsight-haripur-sep-2026',
    status: 'SUBMITTED',
  });

  const stepsList = [
    { num: 1, name: 'Activity Overview' },
    { num: 2, name: 'KPI & Compliance' },
    { num: 3, name: 'Financials & Media' },
    { num: 4, name: 'Review & Submit' },
  ];

  async function handleSubmit(status: 'DRAFT' | 'SUBMITTED') {
    setSubmitting(true);
    setError(null);

    const payload = {
      ...formData,
      status,
      attendanceCount: Number(formData.attendanceCount),
      financialBudget: Number(formData.financialBudget),
      financialSpent: Number(formData.financialSpent),
      complianceScore: Number(formData.complianceScore),
      feedbackRating: Number(formData.feedbackRating),
    };

    const res = await submitMonthlyReportAction(payload);
    setSubmitting(false);

    if (res.success) {
      setSubmittedReport(res);
    } else {
      setError(res.error || 'Failed to submit monthly report');
    }
  }

  if (submittedReport) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-lg dark:border-slate-800 dark:bg-slate-900 max-w-xl mx-auto">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <h3 className="mt-4 text-xl font-bold text-slate-900 dark:text-white font-heading">
          Monthly Activity Report Submitted!
        </h3>
        <p className="mt-2 text-xs text-slate-500 max-w-md mx-auto">
          Report <strong>{submittedReport.reportNumber}</strong> for {formData.month} {formData.year} has been routed to the Central Cabinet for review and compliance verification.
        </p>

        <div className="mt-6 flex justify-center gap-3">
          <button
            onClick={() => router.push('/portal/dashboard')}
            className="rounded-xl bg-brand-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-brand-700 transition-colors shadow-sm"
          >
            Go to Dashboard
          </button>
          <button
            onClick={() => router.push('/portal/reports')}
            className="rounded-xl border border-slate-300 px-5 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            View All Reports
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200/90 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900 overflow-hidden">
      
      {/* Wizard Header (Strict h2 for Playwright validation) */}
      <div className="border-b border-slate-100 bg-gradient-to-r from-slate-900 to-slate-800 px-6 py-5 text-white dark:border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-400">
              President Governance Portal • {chapterName}
            </span>
            <h2 className="text-xl font-bold text-white font-heading">
              Activity Report Wizard
            </h2>
            <p className="text-xs text-slate-300 mt-0.5">
              Structured monthly KPI submission, financial reconciliation, and multimedia logging.
            </p>
          </div>

          {/* Steps Indicator */}
          <div className="flex items-center gap-2">
            {stepsList.map((s) => (
              <div key={s.num} className="flex items-center gap-1">
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-all ${
                    step === s.num
                      ? 'bg-brand-500 text-slate-950 ring-4 ring-brand-500/20 font-extrabold'
                      : step > s.num
                      ? 'bg-emerald-800 text-emerald-100'
                      : 'bg-slate-700 text-slate-400'
                  }`}
                >
                  {s.num}
                </div>
                {s.num < stepsList.length && (
                  <div className={`h-0.5 w-4 ${step > s.num ? 'bg-emerald-600' : 'bg-slate-700'}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Error alert */}
      {error && (
        <div className="m-6 mb-0 flex items-center gap-2 rounded-xl bg-rose-50 p-4 text-xs text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Wizard Step Content */}
      <div className="p-6 md:p-8">
        {step === 1 && (
          <div className="space-y-5">
            <div className="border-b border-slate-100 pb-3 dark:border-slate-800">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Step 1: Activity & Attendance Overview
              </h3>
              <p className="text-xs text-slate-500">Provide core details of the flagship event or monthly activities conducted.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Reporting Month *
                </label>
                <select
                  value={formData.month}
                  onChange={(e) => setFormData({ ...formData, month: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                >
                  {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Reporting Year *
                </label>
                <input
                  type="number"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) || 2026 })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Activity / Event Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Event Executive Summary & Key Highlights *
              </label>
              <textarea
                rows={3}
                required
                value={formData.eventSummary}
                onChange={(e) => setFormData({ ...formData, eventSummary: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Verified Total Attendance Count *
                </label>
                <input
                  type="number"
                  required
                  min={0}
                  value={formData.attendanceCount}
                  onChange={(e) => setFormData({ ...formData, attendanceCount: parseInt(e.target.value) || 0 })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Keynote Speakers & Guest Dignitaries
                </label>
                <textarea
                  rows={2}
                  value={formData.speakerDetails}
                  onChange={(e) => setFormData({ ...formData, speakerDetails: e.target.value })}
                  placeholder="e.g. Dr. Farooq Khan, Ms. Ayesha Noor"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <div className="border-b border-slate-100 pb-3 dark:border-slate-800">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Step 2: KPI & Society Compliance Targets
              </h3>
              <p className="text-xs text-slate-500">Log qualitative target achievements and student feedback scores.</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Target Achievements & Milestone Deliverables *
              </label>
              <textarea
                rows={3}
                required
                value={formData.targetAchievements}
                onChange={(e) => setFormData({ ...formData, targetAchievements: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Participant Satisfaction Rating (out of 5.0)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="1"
                  max="5"
                  value={formData.feedbackRating}
                  onChange={(e) => setFormData({ ...formData, feedbackRating: parseFloat(e.target.value) || 4.8 })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Self-Assessed Compliance Score (0 - 100%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.complianceScore}
                  onChange={(e) => setFormData({ ...formData, complianceScore: parseInt(e.target.value) || 95 })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5">
            <div className="border-b border-slate-100 pb-3 dark:border-slate-800">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Step 3: Financial Reconciliations & Media Vault Links
              </h3>
              <p className="text-xs text-slate-500">Ensure transparent financial accounting and link high-res photos/video archives.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Allocated Budget (PKR)
                </label>
                <input
                  type="number"
                  min={0}
                  value={formData.financialBudget}
                  onChange={(e) => setFormData({ ...formData, financialBudget: parseFloat(e.target.value) || 0 })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Actual Total Spent (PKR)
                </label>
                <input
                  type="number"
                  min={0}
                  value={formData.financialSpent}
                  onChange={(e) => setFormData({ ...formData, financialSpent: parseFloat(e.target.value) || 0 })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Financial Audit Notes & Surplus/Deficit Explanation
              </label>
              <textarea
                rows={2}
                value={formData.financialNotes}
                onChange={(e) => setFormData({ ...formData, financialNotes: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                High-Resolution Media Cloud Link (Google Drive / OneDrive / Dropbox)
              </label>
              <input
                type="url"
                value={formData.mediaDriveLinks}
                onChange={(e) => setFormData({ ...formData, mediaDriveLinks: e.target.value })}
                placeholder="https://drive.google.com/..."
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-5">
            <div className="border-b border-slate-100 pb-3 dark:border-slate-800">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Step 4: Final Summary & Verification
              </h3>
              <p className="text-xs text-slate-500">Review the report ledger before official Central Cabinet submission.</p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4 border border-slate-200 dark:bg-slate-800/60 dark:border-slate-700 text-xs space-y-2">
              <div className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
                <span className="text-slate-500 font-semibold">Report Title:</span>
                <span className="font-bold text-slate-900 dark:text-white">{formData.title}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
                <span className="text-slate-500 font-semibold">Tenure Period:</span>
                <span className="font-bold text-brand-600">{formData.month} {formData.year}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
                <span className="text-slate-500 font-semibold">Attendance Verified:</span>
                <span className="font-bold text-slate-900 dark:text-white">{formData.attendanceCount} delegates</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
                <span className="text-slate-500 font-semibold">Financial Reconciliation:</span>
                <span className="font-bold text-slate-900 dark:text-white">PKR {formData.financialSpent.toLocaleString()} / PKR {formData.financialBudget.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-semibold">Self Compliance Rating:</span>
                <span className="font-bold text-emerald-600">{formData.complianceScore}%</span>
              </div>
            </div>
          </div>
        )}

        {/* Wizard Controls */}
        <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-2">
            {step < 4 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-bold text-white hover:bg-slate-800 dark:bg-brand-600 dark:hover:bg-brand-700"
              >
                <span>Continue</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <>
                <button
                  type="button"
                  disabled={submitting}
                  onClick={() => handleSubmit('DRAFT')}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 disabled:opacity-50"
                >
                  <Save className="h-4 w-4" />
                  <span>Save as Draft</span>
                </button>

                <button
                  type="button"
                  disabled={submitting}
                  onClick={() => handleSubmit('SUBMITTED')}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-brand-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-brand-700 transition-colors shadow-sm disabled:opacity-50"
                >
                  {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  <span>Submit to Central Cabinet</span>
                </button>
              </>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
