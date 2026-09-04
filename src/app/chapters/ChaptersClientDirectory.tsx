'use client';

import React, { useState, useMemo } from 'react';
import { Search, MapPin, SlidersHorizontal, Sparkles, Building2, X } from 'lucide-react';
import { ChapterCard, type ChapterData } from '@/components/chapters/ChapterCard';

interface ChaptersClientDirectoryProps {
  initialChapters: ChapterData[];
}

export function ChaptersClientDirectory({ initialChapters }: ChaptersClientDirectoryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('ALL');

  const provinces = [
    'ALL',
    'Khyber Pakhtunkhwa',
    'Islamabad Capital Territory',
    'Punjab',
    'Sindh',
    'Balochistan',
  ];

  const filteredChapters = useMemo(() => {
    return initialChapters.filter((chapter) => {
      const matchesSearch =
        searchTerm === '' ||
        chapter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        chapter.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
        chapter.university.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        chapter.university.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        chapter.university.province.toLowerCase().includes(searchTerm.toLowerCase()) ||
        chapter.location.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesProvince =
        selectedProvince === 'ALL' ||
        chapter.university.province.toLowerCase() === selectedProvince.toLowerCase();

      return matchesSearch && matchesProvince;
    });
  }, [initialChapters, searchTerm, selectedProvince]);

  return (
    <div className="space-y-8">
      {/* Search & Filter Bar */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-4">
        
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
            <Search className="h-5 w-5" />
          </div>
          <input
            type="text"
            name="chapter-search"
            id="chapter-search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search chapters by university, city, keyword (e.g. Haripur, NUST, Islamabad, KPK)..."
            className="w-full rounded-xl border border-slate-300 bg-slate-50/50 py-3.5 pl-11 pr-10 text-sm font-medium text-slate-900 placeholder-slate-400 focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand-500/10 dark:border-slate-700 dark:bg-slate-800/80 dark:text-white dark:placeholder-slate-500 dark:focus:border-brand-500"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-slate-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Province Filter Badges */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
          <span className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider mr-2">
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Region:
          </span>
          {provinces.map((prov) => {
            const isSelected = selectedProvince === prov;
            return (
              <button
                key={prov}
                onClick={() => setSelectedProvince(prov)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-brand-600 text-white shadow-sm shadow-brand-500/20'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                }`}
              >
                {prov === 'ALL' ? 'All Regions' : prov}
              </button>
            );
          })}
        </div>

      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
        <span>Showing <strong>{filteredChapters.length}</strong> university chapters</span>
        {searchTerm && (
          <span>Filtered by keyword: <strong className="text-brand-600">"{searchTerm}"</strong></span>
        )}
      </div>

      {/* Chapter Grid */}
      {filteredChapters.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChapters.map((chapter) => (
            <ChapterCard key={chapter.id} chapter={chapter} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center dark:border-slate-800 dark:bg-slate-900">
          <Building2 className="mx-auto h-12 w-12 text-slate-400" />
          <h3 className="mt-3 text-base font-bold text-slate-900 dark:text-white">No chapters match your criteria</h3>
          <p className="mt-1 text-xs text-slate-500">
            Try adjusting your search keywords or resetting region filters.
          </p>
          <button
            onClick={() => { setSearchTerm(''); setSelectedProvince('ALL'); }}
            className="mt-4 rounded-lg bg-brand-600 px-4 py-2 text-xs font-semibold text-white hover:bg-brand-700"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
