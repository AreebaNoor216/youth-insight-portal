'use client';

import React, { useState } from 'react';
import { Search, Briefcase, GraduationCap, Building, Mail, Sparkles, Award, MessageSquare, CheckCircle2, X } from 'lucide-react';

interface AlumniData {
  id: string;
  fullName: string;
  email: string;
  currentRole: string;
  currentCompany: string;
  industry: string;
  graduationYear: number;
  universityName: string;
  pastCabinetRoles: string;
  bio: string;
  avatarUrl?: string | null;
  availableForMentorship: boolean;
}

export function AlumniClientDirectory({ alumniList }: { alumniList: AlumniData[] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAlumni, setSelectedAlumni] = useState<AlumniData | null>(null);
  const [mentorshipSent, setMentorshipSent] = useState(false);
  const [mentorshipMessage, setMentorshipMessage] = useState('');

  const filtered = alumniList.filter(
    (a) =>
      a.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.currentCompany.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.universityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.pastCabinetRoles.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleSendMentorship(e: React.FormEvent) {
    e.preventDefault();
    setMentorshipSent(true);
  }

  return (
    <div className="space-y-8">
      {/* Search Bar */}
      <div className="relative max-w-xl mx-auto">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
          <Search className="h-4 w-4" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name, company, industry, or university..."
          className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-4 text-xs font-medium text-slate-900 placeholder-slate-400 focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
        />
      </div>

      {/* Alumni Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filtered.map((alumnus) => (
          <div
            key={alumnus.id}
            className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 hover:shadow-lg transition-all"
          >
            <div>
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={alumnus.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200'}
                  alt={alumnus.fullName}
                  className="h-16 w-16 rounded-full object-cover border-2 border-brand-500 shadow-sm"
                />
                <div>
                  <h3 className="font-heading text-base font-bold text-slate-900 dark:text-white">
                    {alumnus.fullName}
                  </h3>
                  <p className="text-xs font-semibold text-brand-600 dark:text-brand-400 flex items-center gap-1">
                    <Briefcase className="h-3 w-3" />
                    {alumnus.currentRole}
                  </p>
                  <p className="text-[11px] text-slate-500 font-medium">
                    {alumnus.currentCompany}
                  </p>
                </div>
              </div>

              {/* Past Role & Uni */}
              <div className="space-y-1.5 py-3 border-y border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-2">
                  <Award className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                  <span className="truncate">{alumnus.pastCabinetRoles}</span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-3.5 w-3.5 text-brand-600 shrink-0" />
                  <span>{alumnus.universityName} (Class of {alumnus.graduationYear})</span>
                </div>
              </div>

              <p className="mt-3 text-xs text-slate-500 line-clamp-3 leading-relaxed">
                {alumnus.bio}
              </p>
            </div>

            {/* Action */}
            <div className="mt-6 pt-2">
              <button
                onClick={() => { setSelectedAlumni(alumnus); setMentorshipSent(false); }}
                className="flex items-center justify-center gap-1.5 w-full rounded-xl bg-brand-600 py-2.5 text-xs font-bold text-white hover:bg-brand-700 transition-colors shadow-sm"
              >
                <MessageSquare className="h-3.5 w-3.5" />
                <span>Request Mentorship Session</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Mentorship Modal */}
      {selectedAlumni && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setSelectedAlumni(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700"
            >
              <X className="h-5 w-5" />
            </button>

            {mentorshipSent ? (
              <div className="text-center py-6 space-y-3">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <CheckCircle2 className="h-7 w-7" />
                </div>
                <h4 className="font-heading text-lg font-bold text-slate-900 dark:text-white">
                  Mentorship Request Dispatched!
                </h4>
                <p className="text-xs text-slate-500">
                  Your inquiry has been forwarded to <strong>{selectedAlumni.fullName}</strong>. They will reply via email within 48 hours.
                </p>
                <button
                  onClick={() => setSelectedAlumni(null)}
                  className="rounded-lg bg-brand-600 px-4 py-2 text-xs font-semibold text-white"
                >
                  Close
                </button>
              </div>
            ) : (
              <div>
                <h3 className="font-heading text-base font-bold text-slate-900 dark:text-white">
                  Connect with {selectedAlumni.fullName}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {selectedAlumni.currentRole} at {selectedAlumni.currentCompany}
                </p>

                <form onSubmit={handleSendMentorship} className="mt-4 space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Daniyal Khan"
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Your University & Chapter *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. University of Haripur Chapter"
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      What career advice or mentorship do you seek? *
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={mentorshipMessage}
                      onChange={(e) => setMentorshipMessage(e.target.value)}
                      placeholder="Share your goals, questions, or guidance needed..."
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-xl bg-brand-600 py-2.5 text-xs font-bold text-white hover:bg-brand-700 shadow-sm"
                  >
                    Submit Mentorship Request
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
