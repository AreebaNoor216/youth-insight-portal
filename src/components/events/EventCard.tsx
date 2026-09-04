'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Calendar, Clock, MapPin, Sparkles, ArrowRight, Ticket } from 'lucide-react';
import { RSVPModal } from './RSVPModal';

export interface EventData {
  id: string;
  slug: string;
  title: string;
  scope: string;
  category: string;
  description: string;
  themeStatement?: string | null;
  date: string;
  time: string;
  location: string;
  venue?: string | null;
  coverImage?: string | null;
  status: string;
}

export function EventCard({ event }: { event: EventData }) {
  const [rsvpOpen, setRsvpOpen] = useState(false);

  return (
    <>
      <div className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-xl hover:border-brand-400 dark:border-slate-800 dark:bg-slate-900">
        <div>
          {/* Cover image container */}
          <div className="relative aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
            <img
              src={event.coverImage || 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800'}
              alt={event.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute top-3 left-3 flex gap-2">
              <span className="rounded-md bg-brand-600/90 backdrop-blur-md px-2.5 py-1 text-[11px] font-bold text-white uppercase tracking-wider">
                {event.category}
              </span>
              {event.scope === 'NATIONAL' && (
                <span className="rounded-md bg-amber-500/90 backdrop-blur-md px-2.5 py-1 text-[11px] font-bold text-slate-950 uppercase tracking-wider">
                  National Flagship
                </span>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="p-5">
            <h3 className="font-heading text-lg font-bold text-slate-900 group-hover:text-brand-600 transition-colors dark:text-white line-clamp-1">
              {event.title}
            </h3>
            {event.themeStatement && (
              <p className="mt-1 text-xs italic text-brand-600 dark:text-brand-400">
                "{event.themeStatement}"
              </p>
            )}

            <p className="mt-2.5 text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
              {event.description}
            </p>

            <div className="mt-4 space-y-1.5 border-t border-slate-100 pt-3 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <Calendar className="h-3.5 w-3.5 text-brand-600 shrink-0" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-3.5 w-3.5 text-brand-600 shrink-0" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-brand-600 shrink-0" />
                <span className="truncate">{event.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="p-5 pt-0 flex gap-2">
          <button
            onClick={() => setRsvpOpen(true)}
            className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-brand-600 px-3.5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-brand-700 transition-colors"
          >
            <Ticket className="h-4 w-4" />
            <span>RSVP & Pass</span>
          </button>
          <Link
            href={`/events/${event.id}`}
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <span>Details</span>
            <ArrowRight className="ml-1 h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {rsvpOpen && (
        <RSVPModal
          event={event}
          onClose={() => setRsvpOpen(false)}
        />
      )}
    </>
  );
}
