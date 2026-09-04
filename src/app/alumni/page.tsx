import React from 'react';
import { prisma } from '@/lib/prisma';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AlumniClientDirectory } from './AlumniClientDirectory';

export const dynamic = 'force-dynamic';

export default async function AlumniPage() {
  const alumni = await prisma.alumniProfile.findMany({
    orderBy: { graduationYear: 'desc' }
  });

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              Legacy & Mentorship
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2">
              Alumni Network & Hall of Fame
            </h1>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Connecting current university chapter leaders with accomplished alumni across global tech giants, civil services, development sectors, and academia.
            </p>
          </div>

          <AlumniClientDirectory alumniList={alumni as any} />

        </div>
      </main>

      <Footer />
    </>
  );
}
