import React from 'react';
import { prisma } from '@/lib/prisma';
import { getCurrentSession } from '@/lib/auth';
import { ActivityReportWizard } from '@/components/reports/ActivityReportWizard';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function NewMonthlyReportPage() {
  const session = await getCurrentSession();

  // Find user's chapter
  const chapter = await prisma.chapter.findFirst({
    where: {
      OR: [
        { slug: session?.chapterSlug || 'haripur' },
        { id: session?.chapterId || '' },
        { slug: 'haripur' }
      ]
    }
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Link
          href="/portal/dashboard"
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Dashboard</span>
        </Link>
      </div>

      <ActivityReportWizard
        chapterId={chapter?.id || 'haripur-id'}
        chapterName={chapter?.name || 'Youth Insight Haripur Chapter'}
      />
    </div>
  );
}
