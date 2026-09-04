import React from 'react';
import { LoginForm } from './LoginForm';
import { Sparkles, ShieldCheck, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      
      {/* Background ambient light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-brand-600/10 blur-[120px] pointer-events-none" />

      {/* Top bar */}
      <div className="mx-auto w-full max-w-7xl flex items-center justify-between z-10">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white group-hover:scale-105 transition-transform">
            <Sparkles className="h-5 w-5" />
          </div>
          <span className="font-heading text-lg font-bold text-white tracking-tight">
            YOUTH INSIGHT
          </span>
        </Link>

        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Public Platform</span>
        </Link>
      </div>

      {/* Center login card */}
      <div className="my-auto mx-auto w-full max-w-md z-10 py-8">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-8 shadow-2xl backdrop-blur-xl">
          
          <div className="text-center mb-8">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-600/20 text-brand-400 border border-brand-500/30">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h1 className="font-heading text-2xl font-bold text-white">
              Leadership Portal Login
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Secure governance access for Chapter Presidents & Central Cabinet.
            </p>
          </div>

          <LoginForm />

        </div>
      </div>

      {/* Footer */}
      <div className="mx-auto w-full max-w-7xl text-center text-xs text-slate-600 z-10">
        Youth Insight Organization • Secure RBAC Portal • 2026
      </div>
    </div>
  );
}
