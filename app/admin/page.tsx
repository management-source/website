'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Lock,
  User,
  LogOut,
  Building,
  Users,
  FileCheck,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  ExternalLink,
  Phone,
  Mail,
  Home,
} from 'lucide-react';
import Logo from '@/components/Logo';
import { PROPERTIES, TEAM_MEMBERS, AGENCY_INFO } from '@/data/content';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('admin@donspremier.com.au');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [revalidating, setRevalidating] = useState(false);
  const [revalidateMsg, setRevalidateMsg] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      (username.trim().toLowerCase() === 'admin@donspremier.com.au' ||
        username.trim().toLowerCase() === 'lushan@donspremier.com.au') &&
      password === 'PremierKnight2026!'
    ) {
      setIsAuthenticated(true);
      setError(null);
    } else {
      setError('Invalid credentials. Hint: admin@donspremier.com.au / PremierKnight2026!');
    }
  };

  const handleRevalidate = async () => {
    setRevalidating(true);
    setRevalidateMsg(null);
    try {
      const res = await fetch('/api/webhook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-crm-signature': 'webhook_shared_secret',
        },
        body: JSON.stringify({ event: 'manual_revalidate', data: { id: 'admin' } }),
      });
      if (res.ok) {
        setRevalidateMsg('Cache revalidated successfully across all pages!');
      } else {
        setRevalidateMsg('Revalidation triggered locally.');
      }
    } catch {
      setRevalidateMsg('Revalidation triggered locally.');
    } finally {
      setRevalidating(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-knight-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
          <div className="flex justify-center mb-4">
            <Logo lightMode={true} size="lg" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-white">
            Staff & Director Portal
          </h2>
          <p className="mt-2 text-xs text-slate-400">
            Dons Premier Estate Agents • Premier Hub CRM Gateway
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
          <div className="bg-knight-900 py-8 px-6 shadow-2xl rounded-2xl sm:px-10 border border-knight-800">
            <form onSubmit={handleLogin} className="space-y-5">
              {error && (
                <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-800 text-red-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{error}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Staff Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-knight-950 border border-knight-700 text-white rounded-xl text-sm focus:ring-2 focus:ring-gold-500 focus:outline-none"
                  />
                  <User className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-knight-950 border border-knight-700 text-white rounded-xl text-sm focus:ring-2 focus:ring-gold-500 focus:outline-none"
                  />
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
                </div>
              </div>

              <div className="p-3 rounded-lg bg-knight-950 border border-knight-800 text-[11px] text-slate-400">
                <span className="font-semibold text-gold-400 block mb-0.5">Demo Access:</span>
                <div>Email: <code className="text-white">admin@donspremier.com.au</code></div>
                <div>Password: <code className="text-white">PremierKnight2026!</code></div>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-knight-950 bg-gradient-to-r from-gold-400 via-gold-500 to-gold-400 hover:from-gold-300 hover:to-gold-400 shadow-lg transition-all"
              >
                Sign In to Admin Portal
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link href="/" className="text-xs text-slate-400 hover:text-gold-400 transition-colors">
                ← Return to Public Website
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header Bar */}
        <div className="bg-knight-900 text-white rounded-2xl p-6 shadow-md border border-knight-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-gold-400 text-xs font-bold uppercase tracking-widest">
              Dons Premier Management Suite
            </span>
            <h1 className="font-serif text-2xl font-bold text-white mt-0.5">
              Portal Overview & CRM Gateway
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Logged in as <strong className="text-white">{username}</strong> (Director / Admin Session)
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleRevalidate}
              disabled={revalidating}
              className="inline-flex items-center gap-2 px-4 py-2 bg-knight-800 hover:bg-knight-700 text-white rounded-xl text-xs font-semibold border border-knight-700 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${revalidating ? 'animate-spin' : ''}`} />
              <span>{revalidating ? 'Revalidating...' : 'Sync & Revalidate'}</span>
            </button>

            <button
              onClick={() => setIsAuthenticated(false)}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-red-900/40 hover:bg-red-900/60 text-red-200 rounded-xl text-xs font-semibold border border-red-800 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {revalidateMsg && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{revalidateMsg}</span>
          </div>
        )}

        {/* Status & KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <span className="text-xs uppercase font-bold text-slate-400">Total Portfolio</span>
            <div className="text-3xl font-bold text-knight-900 mt-1 font-serif">
              {PROPERTIES.length}
            </div>
            <div className="text-xs text-emerald-600 font-semibold mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Live on Site & ISR</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <span className="text-xs uppercase font-bold text-slate-400">Active Staff</span>
            <div className="text-3xl font-bold text-knight-900 mt-1 font-serif">
              {TEAM_MEMBERS.length}
            </div>
            <div className="text-xs text-slate-500 font-medium mt-1">
              Directors, Consultants & PMs
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <span className="text-xs uppercase font-bold text-slate-400">CRM Endpoint</span>
            <div className="text-sm font-bold text-knight-900 mt-2 font-mono truncate">
              Premier Hub REST
            </div>
            <div className="text-xs text-gold-700 font-semibold mt-1 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Zero-Downtime Fallback Active</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <span className="text-xs uppercase font-bold text-slate-400">Response SLA</span>
            <div className="text-3xl font-bold text-knight-900 mt-1 font-serif">
              100%
            </div>
            <div className="text-xs text-slate-500 font-medium mt-1">
              Within 1 Business Day
            </div>
          </div>
        </div>

        {/* Live Property Listings Overview */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-gold-600">
                Current Catalogue
              </span>
              <h2 className="font-serif text-xl font-bold text-knight-900">
                Managed Properties
              </h2>
            </div>
            <Link
              href="/properties"
              target="_blank"
              className="text-xs font-semibold text-knight-900 hover:text-gold-700 flex items-center gap-1"
            >
              <span>View Live Public Search</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Property</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4">Specs</th>
                  <th className="py-3 px-4">Assigned Agent</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {PROPERTIES.map((prop) => (
                  <tr key={prop.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-knight-900">{prop.title}</div>
                      <div className="text-slate-500 text-[11px]">{prop.address.fullAddress}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        prop.status === 'for_sale'
                          ? 'bg-emerald-100 text-emerald-800'
                          : prop.status === 'for_rent'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {prop.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-900">{prop.price}</td>
                    <td className="py-3.5 px-4 text-slate-600">
                      {prop.bedrooms}b • {prop.bathrooms}ba • {prop.carSpaces}c
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-800">{prop.agent.name}</td>
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        href={`/properties/${prop.slug}`}
                        target="_blank"
                        className="text-gold-700 font-semibold hover:underline inline-flex items-center gap-1"
                      >
                        <span>View</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Office & Operations Directory */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <h3 className="font-serif text-xl font-bold text-knight-900 mb-4">
            Office Hotlines & Lead Routers
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="font-bold text-knight-900 text-sm">Head Office (Cranbourne West)</div>
              <div className="text-slate-600 mt-1">24 Coral-Pea Way, Cranbourne West VIC 3977</div>
              <div className="font-semibold text-knight-900 mt-2">Phone: (03) 9071 0280</div>
              <div className="text-slate-500">Email: admin@donspremier.com.au</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="font-bold text-knight-900 text-sm">Chadstone Branch</div>
              <div className="text-slate-600 mt-1">Suite 797, Level 2 UL40, Chadstone VIC 3148</div>
              <div className="font-semibold text-knight-900 mt-2">Sales Direct: (03) 9071 0287</div>
              <div className="text-slate-500">Email: lushan@donspremier.com.au</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="font-bold text-knight-900 text-sm">Bundoora Branch</div>
              <div className="text-slate-600 mt-1">Suite 279, Level 2, Bundoora VIC 3083</div>
              <div className="font-semibold text-knight-900 mt-2">Management: (03) 9071 0280</div>
              <div className="text-slate-500">Email: management@donspremier.com.au</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
