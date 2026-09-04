import React from 'react';
import { getCurrentSession } from '@/lib/auth';
import { PortalSidebar } from '@/components/layout/PortalSidebar';
import Link from 'next/link';
import { Sparkles, ShieldCheck } from 'lucide-react';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getCurrentSession();

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      {/* Admin Top Bar */}
      <header className="sticky top-0 z-40 h-16 border-b border-slate-800 bg-slate-900/90 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-600 to-brand-600 text-white">
              <Sparkles className="h-5 w-5" />
            </div>
            <span className="font-heading text-base font-bold text-white tracking-tight hidden sm:inline-block">
              YOUTH INSIGHT
            </span>
          </Link>
          <span className="text-slate-600 hidden sm:inline-block">/</span>
          <span className="text-xs font-bold text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded-md border border-cyan-800/40">
            Central Executive Super-Admin
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-300 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700">
            <ShieldCheck className="h-4 w-4 text-cyan-400" />
            <span className="font-semibold">{session?.name || 'Syed Hamza Ali (Central President)'}</span>
          </div>
        </div>
      </header>

      {/* Main Admin Viewport */}
      <div className="flex-1 flex flex-col md:flex-row">
        <PortalSidebar
          isAdmin={true}
          userEmail={session?.email || 'admin@youthinsight.pk'}
          userName={session?.name || 'Syed Hamza Ali'}
          chapterName="Central Executive Secretariat"
        />
        <main className="flex-1 bg-slate-900/50 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
