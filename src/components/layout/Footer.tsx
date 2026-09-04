import React from 'react';
import Link from 'next/link';
import { Sparkles, Heart, Globe, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-300 dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-white">
                <Sparkles className="h-5 w-5" />
              </div>
              <span className="font-heading text-lg font-bold text-white tracking-tight">
                YOUTH INSIGHT
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Empowering university students nationwide through moral leadership, civic responsibility, intellectual discourse, and character-building ecosystems.
            </p>
            <div className="flex items-center gap-2 text-xs text-brand-400">
              <span className="inline-block h-2 w-2 rounded-full bg-brand-500 animate-ping" />
              Active in 50+ Universities Across Pakistan
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/chapters" className="hover:text-brand-400 transition-colors">University Chapters</Link></li>
              <li><Link href="/events" className="hover:text-brand-400 transition-colors">Flagship Events & Summits</Link></li>
              <li><Link href="/alumni" className="hover:text-brand-400 transition-colors">Alumni Mentorship</Link></li>
              <li><Link href="/publications" className="hover:text-brand-400 transition-colors">Knowledge Hub & Books</Link></li>
              <li><Link href="/join" className="hover:text-brand-400 transition-colors">Volunteer Intake</Link></li>
            </ul>
          </div>

          {/* Col 3: Governance */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Governance</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/login" className="hover:text-brand-400 transition-colors">Chapter President Portal</Link></li>
              <li><Link href="/portal/dashboard" className="hover:text-brand-400 transition-colors">Monthly KPI Reporting</Link></li>
              <li><Link href="/admin" className="hover:text-brand-400 transition-colors">Central Executive Board</Link></li>
              <li><Link href="/contact" className="hover:text-brand-400 transition-colors">Partnerships & Sponsorships</Link></li>
            </ul>
          </div>

          {/* Col 4: Contact info */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Central Secretariat</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-brand-500 shrink-0" />
                <span>Islamabad Capital Territory, Pakistan</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-brand-500 shrink-0" />
                <span>central@youthinsight.pk</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-brand-500 shrink-0" />
                <span>+92 51 848 1947</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Youth Insight Organization. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Engineered with <Heart className="h-3 w-3 text-red-500 fill-red-500" /> for the Youth of Pakistan
          </p>
        </div>
      </div>
    </footer>
  );
}
