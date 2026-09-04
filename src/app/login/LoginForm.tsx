'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogIn, KeyRound, Mail, AlertCircle, Loader2, UserCheck } from 'lucide-react';
import { loginAction } from '@/server/actions';

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('president@haripur.youthinsight.pk');
  const [password, setPassword] = useState('SecurePassword123!');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    const res = await loginAction(null, formData);
    setLoading(false);

    if (res.success && res.redirectUrl) {
      router.push(res.redirectUrl);
    } else {
      setError(res.error || 'Authentication failed. Please check your credentials.');
    }
  }

  function setDemoCredentials(e: string, p: string) {
    setEmail(e);
    setPassword(p);
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="flex items-center gap-2 rounded-xl bg-rose-950/60 p-3.5 text-xs text-rose-300 border border-rose-800">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5" htmlFor="email">
            Official Email Address
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
              <Mail className="h-4 w-4" />
            </div>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="president@haripur.youthinsight.pk"
              className="w-full rounded-xl border border-slate-700 bg-slate-800/80 py-2.5 pl-10 pr-3.5 text-xs text-white placeholder-slate-500 focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-500/10"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5" htmlFor="password">
            Password
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
              <KeyRound className="h-4 w-4" />
            </div>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full rounded-xl border border-slate-700 bg-slate-800/80 py-2.5 pl-10 pr-3.5 text-xs text-white placeholder-slate-500 focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-500/10"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-brand-600 py-3 text-xs font-bold text-white hover:bg-brand-500 transition-all shadow-lg shadow-brand-600/30 disabled:opacity-50"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogIn className="h-4 w-4" />}
          <span>Sign In to Governance Portal</span>
        </button>
      </form>

      {/* Quick Demo Fillers */}
      <div className="pt-4 border-t border-slate-800 text-xs">
        <p className="text-[11px] font-semibold text-slate-400 mb-2 uppercase tracking-wider text-center">
          Quick Demo Credentials
        </p>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setDemoCredentials('president@haripur.youthinsight.pk', 'SecurePassword123!')}
            className="p-2 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-[11px] text-slate-300 border border-slate-700 text-left transition-colors truncate"
          >
            <div className="font-bold text-brand-400 truncate">Chapter President</div>
            <div className="text-[10px] text-slate-400 truncate">Haripur Chapter</div>
          </button>

          <button
            type="button"
            onClick={() => setDemoCredentials('admin@youthinsight.pk', 'AdminPass123!')}
            className="p-2 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-[11px] text-slate-300 border border-slate-700 text-left transition-colors truncate"
          >
            <div className="font-bold text-cyan-400 truncate">Central SuperAdmin</div>
            <div className="text-[10px] text-slate-400 truncate">Executive Board</div>
          </button>
        </div>
      </div>
    </div>
  );
}
