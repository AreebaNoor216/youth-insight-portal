import React from 'react';
import { getCurrentSession } from '@/lib/auth';
import { PortalSidebar } from '@/components/layout/PortalSidebar';
import { Navbar } from '@/components/layout/Navbar';
import Link from 'next/link';
import { Sparkles, Bell, UserCircle, ShieldCheck } from 'lucide-react';

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getCurrentSession();

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      {/* Portal Top Bar */}
      <header className="sticky top-0 z-40 h-16 border-b border-slate-800 bg-slate-900/90 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white">
              <Sparkles className="h-5 w-5" />
            </div>
            <span className="font-heading text-base font-bold text-white tracking-tight hidden sm:inline-block">
              YOUTH INSIGHT
            </span>
          </Link>
          <span className="text-slate-600 hidden sm:inline-block">/</span>
          <span className="text-xs font-bold text-brand-400 bg-brand-950/60 px-2.5 py-1 rounded-md border border-brand-800/40">
            President Governance Portal
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-300 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700">
            <span className="h-2 w-2 rounded-full bg-brand-400 animate-pulse" />
            <span className="font-semibold">{session?.chapterName || 'Haripur Chapter'}</span>
          </div>

          <div className="h-8 w-8 rounded-full bg-brand-700 text-white flex items-center justify-center font-bold text-xs">
            {session?.name ? session.name[0] : 'P'}
          </div>
        </div>
      </header>

      {/* Main Portal Viewport */}
      <div className="flex-1 flex flex-col md:flex-row">
        <PortalSidebar
          userEmail={session?.email || 'president@haripur.youthinsight.pk'}
          userName={session?.name || 'Daniyal Khan'}
          chapterName={session?.chapterName || 'Youth Insight Haripur Chapter'}
        />
        <main className="flex-1 bg-slate-900/50 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
