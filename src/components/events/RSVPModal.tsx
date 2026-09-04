'use client';

import React, { useState } from 'react';
import { X, CheckCircle2, QrCode, Calendar, Download, AlertCircle, Loader2 } from 'lucide-react';
import { registerForEventAction } from '@/server/actions';
import type { EventData } from './EventCard';

export function RSVPModal({ event, onClose }: { event: EventData; onClose: () => void }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    universityName: 'University of Haripur',
    department: 'Computer Science',
  });
  const [loading, setLoading] = useState(false);
  const [ticketCode, setTicketCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await registerForEventAction({
      eventId: event.id,
      ...formData,
    });

    setLoading(false);
    if (res.success && res.ticketCode) {
      setTicketCode(res.ticketCode);
    } else {
      setError(res.error || 'Failed to submit RSVP');
    }
  }

  function downloadIcs() {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Youth Insight//Event Registration//EN
BEGIN:VEVENT
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.location}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${event.slug}-invite.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/80 px-6 py-4 dark:border-slate-800 dark:bg-slate-800/50">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              Registration Pass
            </span>
            <h3 className="font-heading text-base font-bold text-slate-900 dark:text-white truncate max-w-xs">
              {event.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-700 dark:hover:bg-slate-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {ticketCode ? (
            /* Success confirmation screen with QR code and .ics download */
            <div className="text-center space-y-4">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                RSVP Confirmed & Verified!
              </h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Your delegate pass for <strong>{event.title}</strong> is active. Present this digital ticket code at the entrance reception.
              </p>

              {/* QR Code Pass Box */}
              <div className="mx-auto max-w-xs rounded-xl border-2 border-dashed border-brand-400 bg-brand-50/50 p-4 dark:bg-brand-950/30">
                <div className="flex justify-center mb-2">
                  <div className="h-24 w-24 bg-white dark:bg-slate-800 p-2 rounded-lg shadow-sm flex items-center justify-center border border-slate-200">
                    <QrCode className="h-20 w-20 text-slate-800 dark:text-white" />
                  </div>
                </div>
                <div className="text-[11px] font-mono font-bold text-brand-800 dark:text-brand-300">
                  {ticketCode}
                </div>
                <div className="text-[10px] text-slate-500 mt-1">
                  Attendee: {formData.fullName} ({formData.universityName})
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 justify-center pt-2">
                <button
                  onClick={downloadIcs}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                >
                  <Calendar className="h-4 w-4 text-brand-600" />
                  <span>Download .ics Invite</span>
                </button>
                <button
                  onClick={onClose}
                  className="rounded-lg bg-brand-600 px-4 py-2 text-xs font-semibold text-white hover:bg-brand-700"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            /* Registration Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-xs text-red-700 dark:bg-red-950/50 dark:text-red-300">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Daniyal Khan"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs focus:border-brand-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="you@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs focus:border-brand-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+92 300 0000000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs focus:border-brand-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    University / Institution *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.universityName}
                    onChange={(e) => setFormData({ ...formData, universityName: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs focus:border-brand-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Academic Major
                  </label>
                  <input
                    type="text"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs focus:border-brand-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-brand-600 py-2.5 text-xs font-bold text-white hover:bg-brand-700 disabled:opacity-50 transition-colors shadow-sm"
                >
                  {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                  <span>Generate Free Delegate Pass & QR</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
