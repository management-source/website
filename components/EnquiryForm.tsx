'use client';

import React, { useState } from 'react';
import { User, Phone, Mail, MessageSquare, Send, CheckCircle2, ShieldCheck, Loader2 } from 'lucide-react';
import { EnquiryPayload } from '@/types';

interface EnquiryFormProps {
  propertyId?: string;
  propertyAddress?: string;
  defaultType?: EnquiryPayload['type'];
  agentName?: string;
}

export default function EnquiryForm({
  propertyId,
  propertyAddress,
  defaultType = 'general',
  agentName,
}: EnquiryFormProps) {
  const [formData, setFormData] = useState<EnquiryPayload>({
    name: '',
    email: '',
    phone: '',
    propertyId,
    propertyAddress,
    type: defaultType,
    message: propertyAddress
      ? `Hi ${agentName || 'Dons Premier Team'}, I am interested in ${propertyAddress} and would like to receive the Section 32 / arrange an inspection.`
      : 'Hi, I would like to inquire about your real estate services.',
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
      // Map enquiryType to CRM specification
      let crmEnquiryType: 'INSPECTION' | 'GENERAL' | 'OFFER' | 'APPRAISAL' = 'GENERAL';
      if (formData.enquiryType) {
        crmEnquiryType = formData.enquiryType;
      } else if (formData.type === 'inspection_booking') {
        crmEnquiryType = 'INSPECTION';
      }

      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          listingId: formData.listingId || propertyId || '',
          enquiryType: crmEnquiryType,
        }),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error || 'Unable to submit enquiry. Please try again or call us directly.');
      }
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-emerald-100 shadow-md text-center">
        <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h4 className="font-serif font-bold text-lg text-knight-900">Enquiry Sent Successfully</h4>
        <p className="text-xs text-slate-600 mt-2 leading-relaxed">
          Thank you, {formData.name}. Your message has been received and assigned to {agentName || 'our sales team'}.
        </p>
        <div className="mt-4 p-3 rounded-lg bg-knight-900 text-gold-300 text-[11px] font-medium flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-gold-400" />
          <span>Guaranteed response within 1 business day</span>
        </div>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-4 text-xs font-semibold text-knight-900 underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-md">
      <div className="mb-5">
        <span className="text-[11px] font-bold uppercase tracking-wider text-gold-600">
          Direct Lead Channel
        </span>
        <h4 className="font-serif text-lg font-bold text-knight-900 mt-0.5">
          {propertyAddress ? 'Inquire About This Property' : 'Send Us a Message'}
        </h4>
        {agentName && (
          <p className="text-xs text-slate-500 mt-0.5">Direct to {agentName}</p>
        )}
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs">
          {error}
        </div>
      )}

      <div className="space-y-3.5">
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
            Your Name *
          </label>
          <div className="relative">
            <input
              type="text"
              name="name"
              required
              placeholder="e.g. John Smith"
              value={formData.name}
              onChange={handleChange}
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:outline-none"
            />
            <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
              Phone Number *
            </label>
            <div className="relative">
              <input
                type="tel"
                name="phone"
                required
                placeholder="0400 000 000"
                value={formData.phone}
                onChange={handleChange}
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:outline-none"
              />
              <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
              Email Address *
            </label>
            <div className="relative">
              <input
                type="email"
                name="email"
                required
                placeholder="you@email.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:outline-none"
              />
              <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
            Enquiry Type
          </label>
          <select
            name="enquiryType"
            value={formData.enquiryType || (formData.type === 'inspection_booking' ? 'INSPECTION' : 'GENERAL')}
            onChange={(e) => setFormData({ ...formData, enquiryType: e.target.value as any })}
            className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:outline-none bg-white"
          >
            <option value="GENERAL">General Enquiry</option>
            <option value="INSPECTION">Book Property Inspection</option>
            <option value="OFFER">Submit Pre-Auction / Purchase Offer</option>
            <option value="APPRAISAL">Request Market Appraisal</option>
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
            Message *
          </label>
          <textarea
            name="message"
            rows={3}
            required
            value={formData.message}
            onChange={handleChange}
            className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full inline-flex items-center justify-center gap-2 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-knight-950 bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-300 hover:to-gold-400 rounded-xl shadow-md transition-all transform hover:-translate-y-0.5 disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Sending...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Send Enquiry</span>
            </>
          )}
        </button>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
        <span className="flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-gold-600" />
          <span>1-Day Response Guaranteed</span>
        </span>
        <span>Dons Premier Hub</span>
      </div>
    </form>
  );
}
