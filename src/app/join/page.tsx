'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Sparkles, Heart, CheckCircle2, Award, Users } from 'lucide-react';
import Link from 'next/link';

export default function JoinPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    university: 'University of Haripur',
    department: 'Outreach & Partnerships',
    reason: ''
  });

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              Nationwide Student Volunteer Drive
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2">
              Join the Youth Insight Movement
            </h1>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Step into an empowering ecosystem that refines your leadership, unlocks certified national events experience, and connects you with industry mentors.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 text-xs">
              <div className="p-4 rounded-xl bg-brand-50 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800 text-center">
                <Users className="h-5 w-5 text-brand-600 mx-auto mb-1.5" />
                <h4 className="font-bold text-slate-900 dark:text-white">Campus Cabinets</h4>
                <p className="text-slate-500 mt-0.5">Direct entry into local university chapter departments.</p>
              </div>
              <div className="p-4 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800 text-center">
                <Award className="h-5 w-5 text-cyan-600 mx-auto mb-1.5" />
                <h4 className="font-bold text-slate-900 dark:text-white">Certified Credential</h4>
                <p className="text-slate-500 mt-0.5">Official leadership credentials and letters of recommendation.</p>
              </div>
              <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-center">
                <Sparkles className="h-5 w-5 text-amber-600 mx-auto mb-1.5" />
                <h4 className="font-bold text-slate-900 dark:text-white">National Summits</h4>
                <p className="text-slate-500 mt-0.5">Priority delegate passes for national bootcamps and Model UNs.</p>
              </div>
            </div>

            {submitted ? (
              <div className="text-center py-8 space-y-3">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Volunteer Application Submitted!
                </h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Thank you for applying. Your campus chapter leadership at <strong>{formData.university}</strong> has received your profile and will invite you to the upcoming orientation.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="rounded-xl bg-brand-600 px-5 py-2.5 text-xs font-semibold text-white"
                >
                  Submit Another
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="space-y-4 text-xs"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Daniyal Khan"
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs focus:border-brand-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@email.com"
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs focus:border-brand-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      University / College *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.university}
                      onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                      placeholder="e.g. University of Haripur"
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs focus:border-brand-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Preferred Department *
                    </label>
                    <select
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs focus:border-brand-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    >
                      <option>Outreach & Partnerships</option>
                      <option>Media, Graphics & Videography</option>
                      <option>Logistics & Event Coordination</option>
                      <option>Publications & Content Strategy</option>
                      <option>Human Resources & Volunteer Engagement</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Why do you want to volunteer with Youth Insight? *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formData.reason}
                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                    placeholder="Share what motivates you and what skills you want to develop..."
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs focus:border-brand-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-brand-600 py-3 text-xs font-bold text-white hover:bg-brand-700 transition-colors shadow-sm"
                >
                  Submit Volunteer Application
                </button>
              </form>
            )}
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
