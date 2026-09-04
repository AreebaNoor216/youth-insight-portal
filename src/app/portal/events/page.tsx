import React from 'react';
import { prisma } from '@/lib/prisma';
import { Calendar, Plus, MapPin, Users, Ticket } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function PortalEventsPage() {
  const chapter = await prisma.chapter.findFirst({
    where: { slug: 'haripur' },
    include: {
      events: {
        include: { registrations: true }
      }
    }
  });

  const events = chapter?.events || [];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-white">
            Chapter Events & RSVP Registrations
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Publish upcoming chapter activities and monitor student attendee registrations in real time.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {events.map((ev) => (
          <div
            key={ev.id}
            className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="rounded bg-brand-950 px-2 py-0.5 text-[11px] font-bold text-brand-400 border border-brand-800">
                  {ev.category}
                </span>
                <span className="text-xs text-slate-400">{ev.date}</span>
              </div>
              <h3 className="text-base font-bold text-white">{ev.title}</h3>
              <p className="text-xs text-slate-400 flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-brand-500" />
                {ev.location}
              </p>
            </div>

            <div className="flex items-center gap-6 border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0 md:pl-6">
              <div className="text-center">
                <div className="text-xl font-bold text-white">{ev.registrations.length}</div>
                <div className="text-[10px] text-slate-400 font-medium uppercase">Confirmed RSVPs</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
