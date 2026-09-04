import React from 'react';
import { prisma } from '@/lib/prisma';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ChaptersClientDirectory } from './ChaptersClientDirectory';

export const dynamic = 'force-dynamic';

export default async function ChaptersPage() {
  const chapters = await prisma.chapter.findMany({
    include: {
      university: true,
      cabinetMembers: true,
    },
    orderBy: { impactScore: 'desc' }
  });

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Header Banner */}
          <div className="mb-10 text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              Interactive Nationwide Directory
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2">
              University Chapters Network
            </h1>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Explore Youth Insight’s university chapters across Pakistan. Search by institution name, city, province, or keyword to inspect cabinet hierarchies, impact statistics, and local media galleries.
            </p>
          </div>

          {/* Interactive Client Search & Filterable Grid */}
          <ChaptersClientDirectory initialChapters={chapters as any} />

        </div>
      </main>

      <Footer />
    </>
  );
}
