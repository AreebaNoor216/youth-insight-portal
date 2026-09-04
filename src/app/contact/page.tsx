import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ContactClientForm } from './ContactClientForm';
import { Mail, Phone, MapPin, Building, Sparkles } from 'lucide-react';

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              Secretariat & Department Inquiries
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2">
              Contact & Strategic Partnerships
            </h1>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Connect with Youth Insight’s Central Executive Board, campus expansion coordinators, or corporate sponsorship leads.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            
            {/* Info Col */}
            <div className="space-y-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-4">
                <h3 className="font-heading text-base font-bold text-slate-900 dark:text-white">
                  Central Secretariat
                </h3>
                <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 text-brand-600 shrink-0 mt-0.5" />
                    <span>Youth Insight National HQ, Blue Area, Islamabad, Pakistan</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-brand-600 shrink-0" />
                    <span>central@youthinsight.pk</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-brand-600 shrink-0" />
                    <span>+92 51 848 1947</span>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-brand-200 bg-brand-50/60 p-6 dark:border-brand-800 dark:bg-brand-950/40 text-xs">
                <h4 className="font-bold text-brand-900 dark:text-brand-300 uppercase tracking-wider mb-1">
                  Automated Team Routing
                </h4>
                <p className="text-brand-800 dark:text-brand-200 leading-relaxed">
                  Your inquiry is automatically dispatched to the relevant department lead (PR, Marketing, Human Resources, or Chapter Expansion).
                </p>
              </div>
            </div>

            {/* Form Col */}
            <div className="lg:col-span-2">
              <ContactClientForm />
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
