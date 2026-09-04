export const dynamic = 'force-dynamic';
import React from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  ArrowRight, 
  MapPin, 
  Users, 
  Calendar, 
  Award, 
  BookOpen, 
  ShieldCheck, 
  TrendingUp,
  CheckCircle2,
  Globe2
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { prisma } from '@/lib/prisma';
import { ChapterCard } from '@/components/chapters/ChapterCard';
import { EventCard } from '@/components/events/EventCard';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const chapters = await prisma.chapter.findMany({
    take: 3,
    include: { university: true },
    orderBy: { impactScore: 'desc' }
  });

  const events = await prisma.event.findMany({
    take: 3,
    orderBy: { createdAt: 'desc' }
  });

  return (
    <>
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-slate-950 text-white pt-20 pb-28">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#22c55e_1px,transparent_1px)] [background-size:24px_24px]"></div>
          <div className="absolute -top-40 right-1/4 h-96 w-96 rounded-full bg-brand-600/20 blur-3xl pointer-events-none"></div>

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-950/60 px-4 py-1.5 text-xs font-semibold text-brand-300 backdrop-blur-md mb-8">
              <Sparkles className="h-3.5 w-3.5 text-brand-400" />
              <span>The Premier Multi-University Leadership Network of Pakistan</span>
            </div>

            <h1 className="font-heading text-4xl sm:text-6xl font-extrabold tracking-tight max-w-4xl mx-auto leading-tight">
              Igniting <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-emerald-200">Character, Intellect</span> & Civic Impact Nationwide.
            </h1>

            <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Uniting university chapters from Haripur to Karachi. Fostering ethical leaders, Model UN delegations, intellectual soul talks, and measurable campus transformations.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/chapters"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand-600/30 hover:bg-brand-500 transition-all"
              >
                <span>Explore University Chapters</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/login"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 px-6 py-3.5 text-sm font-semibold text-slate-200 hover:bg-slate-800 transition-all"
              >
                <ShieldCheck className="h-4 w-4 text-brand-400" />
                <span>Chapter President Portal</span>
              </Link>
            </div>

            {/* Impact Metrics Bar */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur-sm">
                <div className="text-2xl font-extrabold text-brand-400 font-heading">50+</div>
                <div className="text-xs text-slate-400 font-medium mt-0.5">Active Campus Chapters</div>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur-sm">
                <div className="text-2xl font-extrabold text-white font-heading">15,000+</div>
                <div className="text-xs text-slate-400 font-medium mt-0.5">Student Volunteers</div>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur-sm">
                <div className="text-2xl font-extrabold text-brand-400 font-heading">320+</div>
                <div className="text-xs text-slate-400 font-medium mt-0.5">Flagship Events Held</div>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur-sm">
                <div className="text-2xl font-extrabold text-white font-heading">98.4%</div>
                <div className="text-xs text-slate-400 font-medium mt-0.5">Governance Compliance</div>
              </div>
            </div>

          </div>
        </section>

        {/* Featured Chapters Section */}
        <section className="py-20 bg-slate-50 dark:bg-slate-950">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                  Nationwide Footprint
                </span>
                <h2 className="font-heading text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
                  Leading University Chapters
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-xl">
                  Each chapter operates with autonomous student leadership, verified monthly KPI accountability, and vibrant campus ecosystems.
                </p>
              </div>
              <Link
                href="/chapters"
                className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-bold text-brand-600 hover:text-brand-700 dark:text-brand-400"
              >
                <span>View Full Directory</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {chapters.map((chapter) => (
                <ChapterCard key={chapter.id} chapter={chapter as any} />
              ))}
            </div>
          </div>
        </section>

        {/* Flagship Events Section */}
        <section className="py-20 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                  Conferences & Retrospectives
                </span>
                <h2 className="font-heading text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
                  Flagship Catalogs & RSVP Engine
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-xl">
                  Reserve delegate credentials for upcoming leadership bootcamps, Model UN assemblies, and intellectual soul talks.
                </p>
              </div>
              <Link
                href="/events"
                className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-bold text-brand-600 hover:text-brand-700 dark:text-brand-400"
              >
                <span>Browse All Events</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {events.map((event) => (
                <EventCard key={event.id} event={event as any} />
              ))}
            </div>
          </div>
        </section>

        {/* Pillars / Values Section */}
        <section className="py-20 bg-slate-900 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-400">
                The Youth Insight Philosophy
              </span>
              <h2 className="font-heading text-3xl font-extrabold text-white mt-2">
                Four Pillars of Student Excellence
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="rounded-2xl border border-slate-800 bg-slate-800/40 p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-white mb-4">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h4 className="text-base font-bold text-white">Moral Character</h4>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Cultivating steadfast ethical grounding, integrity in decision making, and servant leadership across student bodies.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-800/40 p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-600 text-white mb-4">
                  <BookOpen className="h-5 w-5" />
                </div>
                <h4 className="text-base font-bold text-white">Intellectual Circles</h4>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Engaging in critical literature reviews, soul talks, and deep dialogues that transcend superficial campus routines.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-800/40 p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-600 text-white mb-4">
                  <Globe2 className="h-5 w-5" />
                </div>
                <h4 className="text-base font-bold text-white">Civic Engagement</h4>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Executing concrete grassroots community projects, tree plantation drives, and educational empowerment initiatives.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-800/40 p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white mb-4">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <h4 className="text-base font-bold text-white">Audited Governance</h4>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Standardized monthly KPI reporting, financial transparency, and peer review for continuous operational excellence.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
