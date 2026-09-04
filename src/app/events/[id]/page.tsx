import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  ArrowLeft, 
  Ticket, 
  Sparkles, 
  UserCheck, 
  CheckCircle2,
  Share2
} from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { EventCard } from '@/components/events/EventCard';

export const dynamic = 'force-dynamic';

export default async function EventDetailPage({ params }: { params: { id: string } }) {
  const event = await prisma.event.findUnique({
    where: { id: params.id },
    include: { chapter: true }
  });

  if (!event) {
    notFound();
  }

  const speakers = event.speakersJson ? JSON.parse(event.speakersJson) : [];
  const agenda = event.agendaJson ? JSON.parse(event.agendaJson) : [];

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
        
        {/* Banner */}
        <div className="relative bg-slate-900 text-white">
          <div className="h-64 sm:h-80 w-full overflow-hidden relative">
            <img
              src={event.coverImage || 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200'}
              alt={event.title}
              className="h-full w-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />
          </div>

          <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 -mt-24 sm:-mt-32 pb-8">
            <Link
              href="/events"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 px-3 py-1.5 rounded-lg backdrop-blur-md mb-6 transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Events Catalog</span>
            </Link>

            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="rounded-md bg-brand-600 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                {event.category}
              </span>
              {event.scope === 'NATIONAL' && (
                <span className="rounded-md bg-amber-500 text-slate-950 px-3 py-1 text-xs font-bold uppercase tracking-wider">
                  National Flagship
                </span>
              )}
            </div>

            <h1 className="font-heading text-2xl sm:text-4xl font-extrabold text-white">
              {event.title}
            </h1>
            {event.themeStatement && (
              <p className="mt-2 text-sm sm:text-base italic text-brand-300">
                "{event.themeStatement}"
              </p>
            )}

            {/* Quick meta chips */}
            <div className="mt-6 flex flex-wrap gap-4 text-xs sm:text-sm text-slate-300">
              <div className="flex items-center gap-2 bg-slate-800/80 px-3.5 py-2 rounded-xl border border-slate-700">
                <Calendar className="h-4 w-4 text-brand-400" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-800/80 px-3.5 py-2 rounded-xl border border-slate-700">
                <Clock className="h-4 w-4 text-brand-400" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-800/80 px-3.5 py-2 rounded-xl border border-slate-700">
                <MapPin className="h-4 w-4 text-brand-400" />
                <span>{event.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content body */}
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Col */}
            <div className="lg:col-span-2 space-y-8">
              
              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <h2 className="font-heading text-lg font-bold text-slate-900 dark:text-white">
                  Event Overview & Description
                </h2>
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {event.description}
                </p>

                {event.keyTakeaways && (
                  <div className="mt-6 p-4 rounded-xl bg-brand-50/60 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-brand-800 dark:text-brand-300 mb-1">
                      Key Delegate Takeaways
                    </h4>
                    <p className="text-xs text-brand-900 dark:text-brand-200 leading-relaxed">
                      {event.keyTakeaways}
                    </p>
                  </div>
                )}
              </section>

              {/* Keynote Speakers */}
              {speakers.length > 0 && (
                <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <h3 className="font-heading text-lg font-bold text-slate-900 dark:text-white mb-4">
                    Distinguished Speakers & Mentors
                  </h3>
                  <div className="space-y-3">
                    {speakers.map((sp: any, idx: number) => (
                      <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 text-brand-700 font-bold dark:bg-brand-950 dark:text-brand-300 shrink-0">
                          <UserCheck className="h-5 w-5" />
                        </div>
                        <div>
                          <h5 className="text-sm font-bold text-slate-900 dark:text-white">{sp.name}</h5>
                          <p className="text-xs text-brand-600 dark:text-brand-400 font-medium">{sp.role}</p>
                          {sp.topic && <p className="text-xs text-slate-500 mt-0.5">Topic: <em>"{sp.topic}"</em></p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Agenda */}
              {agenda.length > 0 && (
                <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <h3 className="font-heading text-lg font-bold text-slate-900 dark:text-white mb-4">
                    Conference Schedule & Program Agenda
                  </h3>
                  <div className="space-y-3">
                    {agenda.map((item: any, idx: number) => (
                      <div key={idx} className="flex items-center gap-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40">
                        <span className="px-2.5 py-1 rounded-md bg-brand-600 text-white font-mono text-xs font-bold shrink-0">
                          {item.time}
                        </span>
                        <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                          {item.title}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

            </div>

            {/* Right Col: Registration Card */}
            <div>
              <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-6 shadow-lg dark:border-slate-800 dark:bg-slate-900 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-600 text-white mx-auto mb-4 shadow-md shadow-brand-500/20">
                  <Ticket className="h-6 w-6" />
                </div>
                <h4 className="font-heading text-lg font-bold text-slate-900 dark:text-white">
                  Delegate Registration Open
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Free admission for verified university students and chapter members.
                </p>

                <div className="my-6 space-y-2 text-xs text-slate-600 dark:text-slate-300 text-left border-y border-slate-100 dark:border-slate-800 py-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-brand-600 shrink-0" />
                    <span>Instant digital QR entry pass</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-brand-600 shrink-0" />
                    <span>Downloadable .ics calendar invite</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-brand-600 shrink-0" />
                    <span>Official certificate of participation</span>
                  </div>
                </div>

                <Link
                  href={`/events`}
                  className="block w-full rounded-xl bg-brand-600 py-3 text-xs font-bold text-white hover:bg-brand-700 transition-colors shadow-sm"
                >
                  Return to Event Catalog & RSVP
                </Link>
              </div>
            </div>

          </div>
        </div>

      </main>

      <Footer />
    </>
  );
}
