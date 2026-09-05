'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Wrench,
  AlertTriangle,
  CheckCircle2,
  Phone,
  ShieldCheck,
  ArrowLeft,
  Loader2,
  Send,
} from 'lucide-react';

export default function MaintenancePage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    urgency: 'Routine',
    issueCategory: 'Plumbing',
    description: '',
    accessInstructions: 'Tenant will be home to provide access',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          propertyAddress: formData.address,
          type: 'rentals',
          message: `[MAINTENANCE REQUEST - ${formData.urgency.toUpperCase()}] Category: ${formData.issueCategory}. Details: ${formData.description}. Access: ${formData.accessInstructions}`,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setSubmitted(true);
      } else {
        setError(data.error || 'Failed to lodge request. Please call our property management team directly on (03) 9071 0280.');
      }
    } catch (err) {
      setError('Connection error. Please call our office on (03) 9071 0280.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link
            href="/rentals"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-knight-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Rentals Hub</span>
          </Link>
        </div>

        {/* Urgent Warning Banner */}
        <div className="mb-8 p-5 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-4">
          <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-amber-900">
            <strong>Is this an immediate emergency?</strong> (Gas leak, dangerous electrical fault, burst water main).
            Please immediately call emergency services (000) or our urgent line on{' '}
            <a href="tel:0422643451" className="font-bold underline">
              0422 643 451
            </a>{' '}
            (Jessica Gale) or{' '}
            <a href="tel:0390710280" className="font-bold underline">
              (03) 9071 0280
            </a>
            .
          </div>
        </div>

        {submitted ? (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-md text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 ring-8 ring-emerald-50">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-gold-600">
              Request Lodged
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-knight-900 mt-2">
              Maintenance Request Received
            </h2>
            <p className="text-slate-600 text-sm mt-3 leading-relaxed max-w-lg mx-auto">
              Thank you, {formData.name}. Your maintenance request for{' '}
              <strong className="text-knight-900">{formData.address}</strong> has been logged into Premier Hub CRM and dispatched to property management.
            </p>

            <div className="mt-6 p-4 rounded-xl bg-knight-900 text-gold-300 text-xs text-left max-w-md mx-auto flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-gold-400 shrink-0" />
              <span>A property manager will contact you within 24 hours to confirm contractor attendance.</span>
            </div>

            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="mt-8 text-xs font-semibold text-knight-900 underline"
            >
              Lodge another maintenance ticket
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-100">
              <div className="w-12 h-12 rounded-2xl bg-knight-900 text-gold-400 flex items-center justify-center">
                <Wrench className="w-6 h-6" />
              </div>
              <div>
                <h1 className="font-serif text-2xl font-bold text-knight-900">
                  Tenant Maintenance Request
                </h1>
                <p className="text-xs text-slate-500 mt-0.5">
                  Log routine repairs, appliance faults, or property maintenance.
                </p>
              </div>
            </div>

            {error && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Rented Property Address *
                </label>
                <input
                  type="text"
                  name="address"
                  required
                  placeholder="e.g. 231 Bangholme Road, Bangholme"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-gold-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Tenant Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-gold-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Mobile Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="0400 000 000"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-gold-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="you@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-gold-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Urgency Level
                  </label>
                  <select
                    name="urgency"
                    value={formData.urgency}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-gold-500 focus:outline-none bg-white"
                  >
                    <option value="Routine">Routine (Within 7-14 Days)</option>
                    <option value="Priority">Priority (Within 2-3 Days)</option>
                    <option value="Urgent">Urgent (Within 24-48 Hours)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Issue Category
                  </label>
                  <select
                    name="issueCategory"
                    value={formData.issueCategory}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-gold-500 focus:outline-none bg-white"
                  >
                    <option value="Plumbing">Plumbing / Hot Water / Taps</option>
                    <option value="Electrical">Electrical / Lighting / Power</option>
                    <option value="Heating & Cooling">Heating & Cooling / HVAC</option>
                    <option value="Appliance">Oven / Cooktop / Dishwasher</option>
                    <option value="Locks & Security">Locks, Windows & Doors</option>
                    <option value="Roof & Gutters">Roof, Gutters & Storm Damage</option>
                    <option value="Other">Other Maintenance</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Detailed Description of Fault *
                </label>
                <textarea
                  name="description"
                  rows={4}
                  required
                  placeholder="Please describe the issue in detail, including make and model of appliance if applicable, exact location in property, and symptoms..."
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-gold-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Tradesperson Access Instructions
                </label>
                <select
                  name="accessInstructions"
                  value={formData.accessInstructions}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-gold-500 focus:outline-none bg-white"
                >
                  <option value="Tenant will be home to provide access">
                    Tenant will be home to provide access
                  </option>
                  <option value="Tradesperson may collect office management key">
                    Tradesperson may collect office management key
                  </option>
                  <option value="Please call to negotiate suitable date/time">
                    Please call to negotiate suitable date/time
                  </option>
                </select>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-knight-950 bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-300 hover:to-gold-400 rounded-xl shadow-md transition-all disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Logging Request...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Maintenance Request</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

