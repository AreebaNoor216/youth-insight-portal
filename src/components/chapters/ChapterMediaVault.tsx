'use client';

import React, { useState } from 'react';
import { Image as ImageIcon, Video, ExternalLink, Play } from 'lucide-react';

interface MediaItem {
  id: string;
  type: 'image' | 'video';
  title: string;
  url: string;
  category: string;
}

export function ChapterMediaVault({ chapterName }: { chapterName: string }) {
  const [activeCategory, setActiveCategory] = useState('ALL');

  const mediaList: MediaItem[] = [
    {
      id: '1',
      type: 'image',
      title: 'Youth Leadership Workshop 2026',
      url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=80',
      category: 'Workshops'
    },
    {
      id: '2',
      type: 'image',
      title: 'Annual Green Campus Tree Plantation',
      url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&auto=format&fit=crop&q=80',
      category: 'Campus Drives'
    },
    {
      id: '3',
      type: 'image',
      title: 'Book Circle Discussion & Dialogue',
      url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&auto=format&fit=crop&q=80',
      category: 'Book Circles'
    },
    {
      id: '4',
      type: 'video',
      title: 'Keynote by Dean on Moral Education',
      url: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&auto=format&fit=crop&q=80',
      category: 'Workshops'
    },
  ];

  const categories = ['ALL', 'Workshops', 'Campus Drives', 'Book Circles'];
  const filtered = activeCategory === 'ALL' ? mediaList : mediaList.filter(m => m.category === activeCategory);

  return (
    <div className="space-y-6">
      {/* Category filters */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeCategory === cat
                ? 'bg-brand-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="group relative overflow-hidden rounded-xl border border-slate-200 bg-slate-950 dark:border-slate-800 aspect-video shadow-sm"
          >
            <img
              src={item.url}
              alt={item.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 opacity-90 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-3">
              <span className="text-[10px] uppercase font-bold text-brand-400">{item.category}</span>
              <p className="text-xs font-semibold text-white truncate">{item.title}</p>
            </div>
            {item.type === 'video' && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-600/90 text-white shadow-lg group-hover:scale-110 transition-transform">
                  <Play className="h-5 w-5 fill-white ml-0.5" />
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
