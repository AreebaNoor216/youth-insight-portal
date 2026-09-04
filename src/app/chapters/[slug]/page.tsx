import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { 
  MapPin, 
  Users, 
  Calendar, 
  Award, 
  Clock, 
  Mail, 
  ExternalLink, 
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Share2
} from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ChapterHierarchyTree } from '@/components/chapters/ChapterHierarchyTree';
import { ChapterMediaVault } from '@/components/chapters/ChapterMediaVault';
import { EventCard } from '@/components/events/EventCard';

export const dynamic = 'force-dynamic';

export default async function ChapterProfilePage({ params }: { params: { slug: string } }) {
  const chapter = await prisma.chapter.findUnique({
    where: { slug: params.slug },
    include: {
      university: true,
      cabinetMembers: {
        orderBy: { order: 'asc' }
      },
      events: true,
      monthlyReports: {
        where: { status: 'APPROVED' },
        orderBy: { year: 'desc' }
      }
    }
  });

  if (!chapter) {
    notFound();
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
        
        {/* Hero Header with Banner */}
        <div className="relative bg-slate-900 text-white">
          <div className="h-64 sm:h-80 w-full overflow-hidden relative">
            <img
              src={chapter.coverImage || chapter.university.bannerUrl || 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200'}
              alt={chapter.name}
              className="h-full w-full object-cover opacity-35"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
          </div>

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-24 sm:-mt-32 pb-8">
            <Link
              href="/chapters"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 px-3 py-1.5 rounded-lg backdrop-blur-md mb-6 transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Directory</span>
            </Link>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="flex items-start sm:items-center gap-4">
                <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-2xl bg-white p-2 shadow-2xl border-2 border-brand-500 shrink-0">
                  <img
                    src={chapter.university.logoUrl || 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=150'}
                    alt={chapter.university.name}
                    className="h-full w-full object-cover rounded-xl"
                  />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="rounded-md bg-brand-600 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-white">
                      {chapter.university.province}
                    </span>
                    <span className="rounded-md bg-emerald-950/80 text-emerald-300 border border-emerald-700/50 px-2.5 py-0.5 text-xs font-bold">
                      Verified Chapter
                    </span>
                  </div>
                  <h1 className="font-heading text-2xl sm:text-4xl font-extrabold text-white">
                    {chapter.name}
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-300 flex items-center gap-1.5 mt-1">
                    <MapPin className="h-4 w-4 text-brand-400 shrink-0" />
                    {chapter.university.name} • {chapter.location}
                  </p>
                </div>
              </div>

              {/* Action */}
              <div className="flex gap-2">
                <Link
                  href="/login"
                  className="rounded-xl bg-brand-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-brand-500 shadow-md shadow-brand-500/20 transition-all"
                >
                  President Login
                </Link>
                <Link
                  href="/join"
                  className="rounded-xl bg-slate-800 border border-slate-700 px-4 py-2.5 text-xs font-semibold text-slate-200 hover:bg-slate-700"
                >
                  Join Chapter
                </Link>
              </div>
            </div>

            {/* Impact Metric Cards Bar */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="rounded-xl bg-slate-800/90 border border-slate-700/80 p-3.5 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold">
                  <Users className="h-4 w-4 text-brand-400" />
                  <span>Active Volunteers</span>
                </div>
                <div className="mt-1 text-2xl font-bold text-white font-heading">{chapter.volunteerCount}</div>
              </div>

              <div className="rounded-xl bg-slate-800/90 border border-slate-700/80 p-3.5 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold">
                  <Calendar className="h-4 w-4 text-brand-400" />
                  <span>Events Organized</span>
                </div>
                <div className="mt-1 text-2xl font-bold text-white font-heading">{chapter.eventsCount}</div>
              </div>

              <div className="rounded-xl bg-slate-800/90 border border-slate-700/80 p-3.5 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold">
                  <Award className="h-4 w-4 text-amber-400" />
                  <span>Community Impact</span>
                </div>
                <div className="mt-1 text-2xl font-bold text-amber-400 font-heading">{chapter.impactScore}%</div>
              </div>

              <div className="rounded-xl bg-slate-800/90 border border-slate-700/80 p-3.5 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  <span>Society Compliance</span>
                </div>
                <div className="mt-1 text-2xl font-bold text-emerald-400 font-heading">{chapter.complianceScore}%</div>
              </div>
            </div>

          </div>
        </div>

        {/* Profile Body */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Col: Overview, Cabinet Hierarchy, Media Vault */}
            <div className="lg:col-span-2 space-y-12">
              
              {/* About Chapter */}
              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <h3 className="font-heading text-lg font-bold text-slate-900 dark:text-white">
                  Chapter Mission & Overview
                </h3>
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {chapter.bio}
                </p>
                {chapter.meetingSchedule && (
                  <div className="mt-4 flex items-center gap-2 text-xs font-medium text-brand-700 bg-brand-50 dark:bg-brand-950/50 dark:text-brand-300 p-3 rounded-xl border border-brand-200 dark:border-brand-800">
                    <Clock className="h-4 w-4 shrink-0 text-brand-600" />
                    <span><strong>Meeting Schedule:</strong> {chapter.meetingSchedule}</span>
                  </div>
                )}
              </section>

              {/* Hierarchy & Executive Cabinet */}
              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="mb-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                    Leadership Structure
                  </span>
                  <h3 className="font-heading text-xl font-bold text-slate-900 dark:text-white mt-1">
                    Executive Cabinet & Hierarchy
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Authorized office-bearers governing chapter activities, society compliance, and student welfare.
                  </p>
                </div>

                <ChapterHierarchyTree members={chapter.cabinetMembers as any} />
              </section>

              {/* Chapter Gallery & Media Vault */}
              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="mb-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                    Multimedia Archive
                  </span>
                  <h3 className="font-heading text-xl font-bold text-slate-900 dark:text-white mt-1">
                    Chapter Gallery & Media Vault
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Categorized photo and video archives from local workshops, webinars, and campus drives.
                  </p>
                </div>

                <ChapterMediaVault chapterName={chapter.name} />
              </section>

            </div>

            {/* Right Col: Chapter Events & Audited Reports */}
            <div className="space-y-8">
              
              {/* Upcoming / Local Events */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <h4 className="font-heading text-base font-bold text-slate-900 dark:text-white mb-4">
                  Chapter Events
                </h4>
                {chapter.events.length > 0 ? (
                  <div className="space-y-4">
                    {chapter.events.map((ev) => (
                      <EventCard key={ev.id} event={ev as any} />
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-500">No scheduled upcoming events at this campus.</p>
                )}
              </div>

              {/* Verified Monthly Reports Archive */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <h4 className="font-heading text-base font-bold text-slate-900 dark:text-white mb-3">
                  Verified Monthly Reports Ledger
                </h4>
                <p className="text-xs text-slate-500 mb-4">
                  Public ledger of approved KPI activity reports audited by the Central Executive Cabinet.
                </p>

                {chapter.monthlyReports.length > 0 ? (
                  <div className="space-y-3">
                    {chapter.monthlyReports.map((rep) => (
                      <div key={rep.id} className="rounded-xl border border-slate-100 bg-slate-50 p-3.5 dark:border-slate-800 dark:bg-slate-800/60">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-slate-900 dark:text-white">{rep.month} {rep.year}</span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                            {rep.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-300 font-medium mt-1 truncate">{rep.title}</p>
                        <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-500">
                          <span>👥 {rep.attendanceCount} Attendees</span>
                          <span>⭐ {rep.complianceScore}% Score</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-500">No archived reports yet.</p>
                )}
              </div>

            </div>

          </div>
        </div>

      </main>

      <Footer />
    </>
  );
}
