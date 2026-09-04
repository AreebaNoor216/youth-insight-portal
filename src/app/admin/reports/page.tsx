import React from 'react';
import { prisma } from '@/lib/prisma';
import { AdminReportReviewClient } from './AdminReportReviewClient';

export const dynamic = 'force-dynamic';

export default async function AdminReportsPage() {
  const reports = await prisma.monthlyReport.findMany({
    include: { chapter: { include: { university: true } } },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="font-heading text-2xl font-bold text-white">
          Monthly Activity Report Approvals
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Review, approve, or request revisions for chapter monthly submissions, attendance counts, and financial balances.
        </p>
      </div>

      <AdminReportReviewClient initialReports={reports as any} />
    </div>
  );
}
