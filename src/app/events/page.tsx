import React from 'react';
import { prisma } from '@/lib/prisma';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { EventCard } from '@/components/events/EventCard';
import { Sparkles, Calendar, Search } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function EventsCatalogPage() {
  const events = await prisma.event.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              National & Regional Assemblies
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2">
              Flagship Events & Retrospectives
            </h1>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Explore national leadership bootcamps, Model UN summits, soul talks, and book circle symposia. Reserve delegate credentials with instant digital QR passes.
            </p>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard key={event.id} event={event as any} />
            ))}
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
