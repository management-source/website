'use client';

import React, { useState, useEffect } from 'react';
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
  PlusCircle,
  Trash2,
  UploadCloud,
  Code2,
  Key,
  Eye,
  EyeOff,
  Copy,
  Check,
  Server,
  Link2,
  Save,
  SlidersHorizontal,
} from 'lucide-react';
import Logo from '@/components/Logo';
import { TEAM_MEMBERS, AGENCY_INFO } from '@/data/content';
import { Property } from '@/types';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('admin@donspremier.com.au');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [revalidating, setRevalidating] = useState(false);
  const [revalidateMsg, setRevalidateMsg] = useState<string | null>(null);

  const [listings, setListings] = useState<Property[]>([]);
  const [loadingListings, setLoadingListings] = useState(false);
  const [jsonInput, setJsonInput] = useState('');
  const [pushStatus, setPushStatus] = useState<string | null>(null);
  const [showJsonTool, setShowJsonTool] = useState(false);

  // Live CRM Configuration State
  const [crmBaseUrl, setCrmBaseUrl] = useState('https://crm.donspremier.com.au');
  const [crmAgencySlug, setCrmAgencySlug] = useState('dons-premier-estate-agents');
  const [crmApiKey, setCrmApiKey] = useState('');
  const [crmWebhookSecret, setCrmWebhookSecret] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [showSecret, setShowSecret] = useState(false);
  const [savingConfig, setSavingConfig] = useState(false);
  const [testingConnection, setTestingConnection] = useState(false);
  const [configMsg, setConfigMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [copiedWebhookUrl, setCopiedWebhookUrl] = useState(false);

  const fetchCrmConfig = async () => {
    try {
      const res = await fetch('/api/admin/crm-config');
      if (res.ok) {
        const data = await res.json();
        if (data.config) {
          setCrmBaseUrl(data.config.baseUrl || 'https://crm.donspremier.com.au');
          setCrmAgencySlug(data.config.agencySlug || 'dons-premier-estate-agents');
          setCrmApiKey(data.config.apiKey || '');
          setCrmWebhookSecret(data.config.webhookSecret || '');
        }
      }
    } catch (err) {
      console.error('Error fetching CRM config:', err);
    }
  };

  const handleSaveConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingConfig(true);
    setConfigMsg(null);
    try {
      const res = await fetch('/api/admin/crm-config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          baseUrl: crmBaseUrl,
          agencySlug: crmAgencySlug,
          apiKey: crmApiKey,
          webhookSecret: crmWebhookSecret,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setConfigMsg({ text: 'CRM API Key, Webhook Secret, and Endpoints saved successfully!', type: 'success' });
        fetchListings();
      } else {
        setConfigMsg({ text: data.error || 'Failed to save configuration.', type: 'error' });
      }
    } catch (err: any) {
      setConfigMsg({ text: err.message || 'Error saving configuration.', type: 'error' });
    } finally {
      setSavingConfig(false);
    }
  };

  const handleTestConnection = async () => {
    setTestingConnection(true);
    setConfigMsg(null);
    try {
      const res = await fetch('/api/admin/crm-config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'test_connection',
          baseUrl: crmBaseUrl,
          agencySlug: crmAgencySlug,
          apiKey: crmApiKey,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setConfigMsg({ text: data.message || 'Connection verified successfully!', type: 'success' });
        fetchListings();
      } else {
        setConfigMsg({ text: data.error || 'Connection test failed.', type: 'error' });
      }
    } catch (err: any) {
      setConfigMsg({ text: `Connection error: ${err.message}`, type: 'error' });
    } finally {
      setTestingConnection(false);
    }
  };

  const copyWebhookUrl = () => {
    const url = typeof window !== 'undefined'
      ? `${window.location.origin}/api/webhook/revalidate`
      : 'https://donspremier.com.au/api/webhook/revalidate';
    navigator.clipboard.writeText(url);
    setCopiedWebhookUrl(true);
    setTimeout(() => setCopiedWebhookUrl(false), 2500);
  };

  const fetchListings = async () => {
    try {
      setLoadingListings(true);
      const res = await fetch('/api/properties');
      if (res.ok) {
        const data = await res.json();
        setListings(data.properties || []);
      }
    } catch (err) {
      console.error('Error loading CRM listings:', err);
    } finally {
      setLoadingListings(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchListings();
      fetchCrmConfig();
    }
  }, [isAuthenticated]);

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

  const handlePushListingJson = async () => {
    try {
      setPushStatus(null);
      const parsed = JSON.parse(jsonInput);
      const res = await fetch('/api/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed),
      });
      const data = await res.json();
      if (res.ok) {
        setPushStatus(`Success: ${data.message}`);
        fetchListings();
        setJsonInput('');
      } else {
        setPushStatus(`Error: ${data.error}`);
      }
    } catch (e: any) {
      setPushStatus(`JSON Error: ${e.message}`);
    }
  };

  const handleInjectSample = async () => {
    try {
      setPushStatus(null);
      const sample = {
        title: '24 Coral-Pea Way',
        slug: '24-coral-pea-way-cranbourne-west',
        headline: 'Prestigious Family Residence in Cranbourne West',
        description: 'Immaculately presented contemporary home situated in an elite residential pocket.',
        price: '$850,000 - $920,000',
        priceNumeric: 885000,
        status: 'for_sale',
        type: 'House',
        bedrooms: 4,
        bathrooms: 2,
        carSpaces: 2,
        landSize: '512 sqm',
        address: {
          street: '24 Coral-Pea Way',
          suburb: 'Cranbourne West',
          state: 'VIC',
          postcode: '3977',
          fullAddress: '24 Coral-Pea Way, Cranbourne West VIC 3977',
        },
        features: ['Solar Panels', 'Ducted Heating', 'Evaporative Cooling', 'Double Garage', 'Alfresco'],
        images: [
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
        ],
        agent: {
          name: 'Lushan Dons',
          title: 'Licensed Estate Agent & Director',
          phone: '0401 849 767',
          email: 'lushan@donspremier.com.au',
          image: '/images/team/lushan-dons.jpg',
        },
        inspectionTimes: ['Saturday 11:00 AM - 11:30 AM'],
      };

      const res = await fetch('/api/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sample),
      });
      const data = await res.json();
      if (res.ok) {
        setPushStatus(`Sample listing pushed successfully!`);
        fetchListings();
      } else {
        setPushStatus(`Failed: ${data.error}`);
      }
    } catch (e: any) {
      setPushStatus(`Error: ${e.message}`);
    }
  };

  const handleDeleteListing = async (id: string) => {
    if (!confirm('Are you sure you want to delete this listing from the live website?')) return;
    try {
      const res = await fetch(`/api/properties?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        fetchListings();
      }
    } catch (e) {
      console.error('Failed to delete listing:', e);
    }
  };

  const handleClearAll = async () => {
    if (!confirm('Are you sure you want to remove ALL listings from the website?')) return;
    try {
      const res = await fetch('/api/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'clear_all' }),
      });
      if (res.ok) {
        fetchListings();
        setPushStatus('All listings cleared successfully.');
      }
    } catch (e) {
      console.error('Failed to clear listings:', e);
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
    <div className="min-h-screen bg-white py-10">
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

          <div className="flex flex-wrap items-center gap-3">
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
            <span className="text-xs uppercase font-bold text-slate-400">Total Live Listings</span>
            <div className="text-3xl font-bold text-knight-900 mt-1 font-serif">
              {listings.length}
            </div>
            <div className="text-xs text-emerald-600 font-semibold mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Connected via CRM</span>
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
            <div className="text-xs font-bold text-knight-900 mt-2 font-mono truncate">
              POST /api/properties
            </div>
            <div className="text-xs text-gold-700 font-semibold mt-1 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Direct Push Webhook Ready</span>
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

        {/* Live CRM API & Webhook Credentials Settings */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-8">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6 pb-6 border-b border-slate-100">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gold-50 border border-gold-300 text-gold-900 text-xs font-bold uppercase tracking-wider mb-2">
                <Key className="w-3 h-3 text-gold-600" />
                <span>Live CRM Connection</span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-knight-900">
                Premier Hub CRM API & Webhook Credentials
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
                Configure your live Premier Hub CRM API endpoint, secure bearer token, and webhook synchronization secret. These credentials dynamically link your website directly to your CRM.
              </p>
            </div>
            <button
              type="button"
              onClick={handleTestConnection}
              disabled={testingConnection}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-knight-900 text-gold-300 hover:bg-black text-xs sm:text-sm font-bold transition-all shadow-sm shrink-0 disabled:opacity-60"
            >
              <RefreshCw className={`w-4 h-4 ${testingConnection ? 'animate-spin' : ''}`} />
              <span>{testingConnection ? 'Testing Connection...' : 'Test CRM Connection'}</span>
            </button>
          </div>

          {configMsg && (
            <div
              className={`mb-6 p-4 rounded-xl text-xs sm:text-sm flex items-start gap-3 ${
                configMsg.type === 'success'
                  ? 'bg-emerald-50 border border-emerald-200 text-emerald-900'
                  : 'bg-red-50 border border-red-200 text-red-900'
              }`}
            >
              {configMsg.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              )}
              <div className="flex-1 font-medium">{configMsg.text}</div>
            </div>
          )}

          <form onSubmit={handleSaveConfig} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* CRM API Base URL */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Server className="w-3.5 h-3.5 text-gold-600" />
                  <span>CRM API Base URL</span>
                </label>
                <input
                  type="url"
                  value={crmBaseUrl}
                  onChange={(e) => setCrmBaseUrl(e.target.value)}
                  placeholder="https://crm.donspremier.com.au"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 font-mono"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  Base domain of your Premier Hub CRM instance without trailing slash.
                </p>
              </div>

              {/* Agency Slug */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-gold-600" />
                  <span>Agency Slug</span>
                </label>
                <input
                  type="text"
                  value={crmAgencySlug}
                  onChange={(e) => setCrmAgencySlug(e.target.value)}
                  placeholder="dons-premier-estate-agents"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 font-mono"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  Your agency identifier in Premier Hub (e.g. dons-premier-estate-agents).
                </p>
              </div>

              {/* CRM API Key */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Key className="w-3.5 h-3.5 text-gold-600" />
                    <span>CRM API Key / Bearer Token</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="text-slate-500 hover:text-slate-800 text-[11px] font-medium flex items-center gap-1"
                  >
                    {showApiKey ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                    <span>{showApiKey ? 'Hide' : 'Reveal'}</span>
                  </button>
                </label>
                <div className="relative">
                  <input
                    type={showApiKey ? 'text' : 'password'}
                    value={crmApiKey}
                    onChange={(e) => setCrmApiKey(e.target.value)}
                    placeholder="Enter CRM API Key or Bearer Token"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 font-mono pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Passed in Authorization: Bearer header when querying listings and syncing leads.
                </p>
              </div>

              {/* Webhook Secret */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-gold-600" />
                    <span>CRM Webhook Secret</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowSecret(!showSecret)}
                    className="text-slate-500 hover:text-slate-800 text-[11px] font-medium flex items-center gap-1"
                  >
                    {showSecret ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                    <span>{showSecret ? 'Hide' : 'Reveal'}</span>
                  </button>
                </label>
                <div className="relative">
                  <input
                    type={showSecret ? 'text' : 'password'}
                    value={crmWebhookSecret}
                    onChange={(e) => setCrmWebhookSecret(e.target.value)}
                    placeholder="Enter Webhook Shared Secret"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 font-mono pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowSecret(!showSecret)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showSecret ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Validated against the X-Webhook-Secret header when your CRM sends push events.
                </p>
              </div>
            </div>

            {/* Webhook Endpoint Box for easy copying into CRM settings */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Link2 className="w-3.5 h-3.5 text-gold-600" />
                    <span>Instant Webhook Synchronization URL</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Paste this URL into your Premier Hub CRM Webhook Notification Settings:
                  </p>
                  <code className="inline-block mt-2 font-mono text-xs font-semibold text-knight-900 bg-white px-3 py-1.5 rounded-lg border border-slate-200 break-all">
                    {typeof window !== 'undefined'
                      ? `${window.location.origin}/api/webhook/revalidate`
                      : 'https://donspremier.com.au/api/webhook/revalidate'}
                  </code>
                </div>
                <button
                  type="button"
                  onClick={copyWebhookUrl}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-xs font-bold text-slate-800 transition-colors shadow-sm self-start sm:self-center shrink-0"
                >
                  {copiedWebhookUrl ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-semibold">Copied URL</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-600" />
                      <span>Copy Webhook URL</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100">
              <div className="text-xs text-slate-500">
                Credentials are encrypted and saved securely. Overrides local defaults immediately.
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  disabled={savingConfig}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-600 text-knight-950 text-xs sm:text-sm font-bold transition-all shadow-md hover:shadow-lg disabled:opacity-60"
                >
                  <Save className={`w-4 h-4 ${savingConfig ? 'animate-spin' : ''}`} />
                  <span>{savingConfig ? 'Saving Settings...' : 'Save CRM Configuration'}</span>
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* CRM Direct Push & Sync Hub */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-gold-600">
                Integration Control
              </span>
              <h2 className="font-serif text-xl font-bold text-knight-900">
                Premier Hub CRM Direct Push & Sync
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                Push property listings directly from your external CRM via REST webhook or inject JSON manually.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleInjectSample}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gold-50 border border-gold-300 text-gold-900 text-xs font-bold hover:bg-gold-100 transition-colors"
              >
                <PlusCircle className="w-3.5 h-3.5 text-gold-700" />
                <span>Inject Sample Listing</span>
              </button>

              <button
                type="button"
                onClick={() => setShowJsonTool(!showJsonTool)}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 border border-slate-300 text-slate-800 text-xs font-bold hover:bg-slate-200 transition-colors"
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>{showJsonTool ? 'Hide JSON Push Tool' : 'Open JSON Push Tool'}</span>
              </button>

              <button
                type="button"
                onClick={handleClearAll}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold hover:bg-red-100 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All Listings</span>
              </button>
            </div>
          </div>

          {pushStatus && (
            <div className={`mb-4 p-3 rounded-xl text-xs flex items-center gap-2 ${pushStatus.startsWith('Error') || pushStatus.startsWith('Failed') ? 'bg-red-50 border border-red-200 text-red-700' : 'bg-emerald-50 border border-emerald-200 text-emerald-800'}`}>
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{pushStatus}</span>
            </div>
          )}

          {showJsonTool && (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 mb-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Paste Property JSON (Single Object or Array)
              </label>
              <textarea
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                placeholder='{"title": "123 Example Street", "price": "$700,000", "status": "for_sale", "type": "House", "bedrooms": 4, "bathrooms": 2, "carSpaces": 2, "address": {"street": "123 Example Street", "suburb": "Berwick", "state": "VIC", "postcode": "3806", "fullAddress": "123 Example Street, Berwick VIC 3806"}}'
                rows={5}
                className="w-full p-3 bg-white font-mono text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-gold-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={handlePushListingJson}
                className="px-4 py-2 bg-knight-900 hover:bg-knight-800 text-white rounded-xl text-xs font-bold transition-colors inline-flex items-center gap-1.5"
              >
                <UploadCloud className="w-3.5 h-3.5" />
                <span>Push Listing to Live Site</span>
              </button>
            </div>
          )}
        </div>

        {/* Live Property Listings Overview */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-gold-600">
                Current Catalogue
              </span>
              <h2 className="font-serif text-xl font-bold text-knight-900">
                Live CRM Listings ({listings.length})
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

          {loadingListings ? (
            <div className="py-12 text-center text-slate-400 text-xs">
              Loading active listings...
            </div>
          ) : listings.length === 0 ? (
            <div className="py-12 text-center border-2 border-dashed border-slate-200 rounded-xl">
              <Home className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <div className="font-bold text-knight-900 text-sm">No Active Listings in Website Storage</div>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                No mock dummy listings are shown. Push listings from your CRM to <code className="bg-slate-100 px-1 py-0.5 rounded">/api/properties</code> or click &apos;Inject Sample Listing&apos; above.
              </p>
            </div>
          ) : (
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
                  {listings.map((prop) => (
                    <tr key={prop.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-knight-900">{prop.title}</div>
                        <div className="text-slate-500 text-[11px]">{prop.address.fullAddress}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${prop.status === 'for_sale'
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
                      <td className="py-3.5 px-4 font-medium text-slate-800">{prop.agent?.name || 'Dons Premier'}</td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-3">
                          <Link
                            href={`/properties/${prop.slug}`}
                            target="_blank"
                            className="text-gold-700 font-semibold hover:underline inline-flex items-center gap-1"
                          >
                            <span>View</span>
                            <ExternalLink className="w-3 h-3" />
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleDeleteListing(prop.id)}
                            className="text-red-600 hover:text-red-800 p-1"
                            title="Delete listing"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
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

