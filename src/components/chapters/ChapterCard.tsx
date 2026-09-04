'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, Users, Calendar, Award, ArrowRight, Sparkles } from 'lucide-react';

export interface ChapterData {
  id: string;
  slug: string;
  name: string;
  status: string;
  volunteerCount: number;
  eventsCount: number;
  impactScore: number;
  complianceScore: number;
  bio: string;
  location: string;
  coverImage?: string | null;
  university: {
    name: string;
    shortName: string;
    city: string;
    province: string;
    logoUrl?: string | null;
  };
}

export function ChapterCard({ chapter }: { chapter: ChapterData }) {
  return (
    <div 
      className="chapter-card-animated transition-all duration-300 ease-in-out group flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm hover:shadow-xl hover:border-brand-500/50 dark:border-slate-800 dark:bg-slate-900"
      data-testid={`chapter-card-${chapter.slug}`}
    >
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700 dark:bg-brand-950/60 dark:text-brand-300 border border-brand-200 dark:border-brand-800">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-500"></span>
            {chapter.university.province}
          </span>
          <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md dark:bg-amber-950/40 dark:text-amber-300">
            <Award className="h-3.5 w-3.5" />
            {chapter.impactScore}% Impact
          </span>
        </div>

        {/* Chapter Title & Institution */}
        <h3 className="font-heading text-lg font-bold text-slate-900 group-hover:text-brand-600 transition-colors dark:text-white line-clamp-1">
          {chapter.name}
        </h3>
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5 text-brand-600 shrink-0" />
          {chapter.university.name} ({chapter.university.city})
        </p>

        {/* Bio */}
        <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 mt-3 leading-relaxed">
          {chapter.bio}
        </p>
      </div>

      {/* Metrics Row & Action */}
      <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
        <div className="grid grid-cols-3 gap-2 text-center mb-4">
          <div className="rounded-lg bg-slate-50 py-1.5 px-1 dark:bg-slate-800/60">
            <div className="text-xs font-bold text-slate-800 dark:text-white">{chapter.volunteerCount}</div>
            <div className="text-[10px] text-slate-500 font-medium">Volunteers</div>
          </div>
          <div className="rounded-lg bg-slate-50 py-1.5 px-1 dark:bg-slate-800/60">
            <div className="text-xs font-bold text-slate-800 dark:text-white">{chapter.eventsCount}</div>
            <div className="text-[10px] text-slate-500 font-medium">Events</div>
          </div>
          <div className="rounded-lg bg-slate-50 py-1.5 px-1 dark:bg-slate-800/60">
            <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{chapter.complianceScore}%</div>
            <div className="text-[10px] text-slate-500 font-medium">Compliance</div>
          </div>
        </div>

        <Link
          href={`/chapters/${chapter.slug}`}
          className="flex items-center justify-center gap-1.5 w-full rounded-xl bg-slate-100 px-4 py-2.5 text-xs font-bold text-slate-700 group-hover:bg-brand-600 group-hover:text-white transition-all dark:bg-slate-800 dark:text-slate-200 dark:group-hover:bg-brand-600"
        >
          <span>Explore Chapter Profile & Cabinet</span>
          <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
