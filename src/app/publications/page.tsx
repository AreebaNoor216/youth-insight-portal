import React from 'react';
import { prisma } from '@/lib/prisma';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { BookOpen, Clock, User, ArrowRight, Sparkles } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function PublicationsPage() {
  const publications = await prisma.publication.findMany({
    orderBy: { publishedAt: 'desc' }
  });

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              Thought Leadership & Intellectual Discourse
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2">
              Knowledge Hub & Publications
            </h1>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Curated essays, character-building treatises, book circle reviews, and governance whitepapers published by Youth Insight thinkers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {publications.map((pub) => (
              <article
                key={pub.id}
                className="flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 hover:shadow-lg transition-all"
              >
                <div>
                  <div className="aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <img
                      src={pub.coverImage || 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600'}
                      alt={pub.title}
                      className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between text-[11px] text-brand-600 font-bold uppercase tracking-wider mb-2">
                      <span>{pub.category}</span>
                      <span className="flex items-center gap-1 text-slate-400 font-normal">
                        <Clock className="h-3 w-3" />
                        {pub.readTime}
                      </span>
                    </div>

                    <h2 className="font-heading text-base font-bold text-slate-900 dark:text-white line-clamp-2">
                      {pub.title}
                    </h2>

                    <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                      {pub.summary}
                    </p>

                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500">
                      <p className="font-semibold text-slate-800 dark:text-slate-200">{pub.authorName}</p>
                      <p className="text-[11px] text-slate-400">{pub.authorRole}</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <div className="rounded-xl bg-slate-50 p-3 text-xs text-slate-700 dark:bg-slate-800/60 dark:text-slate-300 italic border border-slate-100 dark:border-slate-800">
                    "{pub.content.slice(0, 120)}..."
                  </div>
                </div>
              </article>
            ))}
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
