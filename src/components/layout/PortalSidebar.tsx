'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  FileText, 
  PlusCircle, 
  Calendar, 
  Users, 
  Award, 
  LogOut, 
  Sparkles,
  ShieldAlert,
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import { logoutAction } from '@/server/actions';

interface SidebarLink {
  name: string;
  href: string;
  icon: any;
  highlight?: boolean;
}

interface PortalSidebarProps {
  isAdmin?: boolean;
  userEmail?: string;
  userName?: string;
  chapterName?: string;
}

export function PortalSidebar({ isAdmin = false, userEmail, userName, chapterName }: PortalSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const presidentLinks: SidebarLink[] = [
    { name: 'Chapter Dashboard', href: '/portal/dashboard', icon: LayoutDashboard },
    { name: 'Monthly Reports', href: '/portal/reports', icon: FileText },
    { name: 'Submit Report Wizard', href: '/portal/reports/new', icon: PlusCircle, highlight: true },
    { name: 'Event Management', href: '/portal/events', icon: Calendar },
    { name: 'Cabinet & Roster', href: '/portal/members', icon: Users },
  ];

  const adminLinks: SidebarLink[] = [
    { name: 'Executive Overview', href: '/admin', icon: LayoutDashboard },
    { name: 'Report Approvals', href: '/admin/reports', icon: FileText },
    { name: 'Manage Chapters', href: '/admin/chapters', icon: Users },
  ];

  const links = isAdmin ? adminLinks : presidentLinks;

  async function handleLogout() {
    await logoutAction();
    router.push('/login');
  }

  return (
    <aside className="w-64 shrink-0 bg-slate-900 border-r border-slate-800 text-slate-300 flex flex-col justify-between min-h-[calc(100vh-4rem)] p-4">
      <div className="space-y-6">
        
        {/* Chapter/User Badge Header */}
        <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/60 shadow-inner">
          <div className="flex items-center gap-2 text-xs font-semibold text-brand-400 uppercase tracking-wider mb-1">
            <span className="h-2 w-2 rounded-full bg-brand-400 animate-pulse"></span>
            {isAdmin ? 'Central Executive' : 'Chapter President'}
          </div>
          <h3 className="text-sm font-bold text-white truncate">
            {chapterName || (isAdmin ? 'Central Cabinet' : 'Haripur Chapter')}
          </h3>
          <p className="text-xs text-slate-400 truncate mt-0.5">
            {userEmail || 'president@haripur.youthinsight.pk'}
          </p>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1.5">
          {links.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-brand-600 text-white font-semibold shadow-md shadow-brand-600/30'
                    : link.highlight
                    ? 'text-brand-300 bg-brand-950/40 hover:bg-brand-900/50 border border-brand-800/50'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-4 w-4" />
                  <span>{link.name}</span>
                </div>
                {link.highlight && (
                  <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-brand-500 text-slate-950">
                    New
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* KPI Mini Status */}
        {!isAdmin && (
          <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-800/40 text-emerald-200 text-xs space-y-1.5">
            <div className="flex items-center justify-between font-semibold">
              <span className="flex items-center gap-1.5"><TrendingUp className="h-3.5 w-3.5 text-brand-400" /> KPI Streak</span>
              <span className="text-brand-400 font-bold">6 Months 🔥</span>
            </div>
            <p className="text-[11px] text-emerald-300/80">Compliance Score: 98/100</p>
          </div>
        )}
      </div>

      {/* Footer Controls */}
      <div className="pt-4 border-t border-slate-800 space-y-2">
        <Link
          href="/chapters"
          className="flex items-center justify-between px-3 py-2 text-xs text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
        >
          <span>View Public Directory</span>
          <ChevronRight className="h-3.5 w-3.5" />
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2.5 w-full px-3 py-2 text-xs font-semibold text-rose-400 hover:bg-rose-950/40 hover:text-rose-300 rounded-lg transition-colors"
        >
          <LogOut className="h-4 w-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
