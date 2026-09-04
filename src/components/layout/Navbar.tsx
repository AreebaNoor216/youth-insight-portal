'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Compass, 
  Layers, 
  Calendar, 
  Users, 
  BookOpen, 
  Mail, 
  LogIn, 
  Menu, 
  X, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // If in portal or admin view, navbar can show minimal or custom header
  const isPortal = pathname?.startsWith('/portal') || pathname?.startsWith('/admin');

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Chapters', href: '/chapters' },
    { name: 'Flagship Events', href: '/events' },
    { name: 'Alumni Network', href: '/alumni' },
    { name: 'Publications', href: '/publications' },
    { name: 'Contact & Join', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/90">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-brand-700 to-brand-500 text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-heading text-lg font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-brand-600 transition-colors">
              YOUTH INSIGHT
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
              National University Platform
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'text-brand-700 bg-brand-50 font-semibold dark:bg-brand-950/50 dark:text-brand-400'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-brand-700 transition-all dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            <LogIn className="h-4 w-4" />
            President Portal
          </Link>
          <Link
            href="/join"
            className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-700 transition-all hover:shadow-brand-500/25"
          >
            Join Movement
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Navigation"
            className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-6 space-y-3 dark:border-slate-800 dark:bg-slate-950">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-brand-600 dark:text-slate-200 dark:hover:bg-slate-900"
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="flex justify-center items-center gap-2 w-full rounded-lg border border-slate-300 py-2.5 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-200"
            >
              <LogIn className="h-4 w-4" />
              President Portal Login
            </Link>
            <Link
              href="/join"
              onClick={() => setMobileOpen(false)}
              className="flex justify-center items-center gap-2 w-full rounded-lg bg-brand-600 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
            >
              Join Movement
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
