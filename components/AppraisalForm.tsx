'use client';

import React, { useState } from 'react';
import {
  Home,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Calendar,
  ShieldCheck,
  Building,
  User,
  Phone,
  Mail,
  MapPin,
  Loader2,
} from 'lucide-react';
import { AppraisalPayload } from '@/types';

export default function AppraisalForm() {
  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<AppraisalPayload>({
    name: '',
    email: '',
    phone: '',
    address: '',
    suburb: 'Berwick',
    propertyType: 'House',
    bedrooms: '4',
    bathrooms: '2',
    timeframe: 'Next 1-3 months',
    additionalDetails: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => {
    setError(null);
    if (step === 1 && !formData.address) {
      setError('Please enter your street address.');
      return;
    }
    setStep((prev) => Math.min(prev + 1, 3));
  };

  const prevStep = () => {
    setError(null);
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.name || !formData.phone || !formData.email) {
      setError('Please provide your name, phone number, and email.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/appraisal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setSubmitted(true);
      } else {
        setError(data.error || 'Failed to submit appraisal request. Please call (03) 9071 0280.');
      }
    } catch (err: any) {
      setError('Connection error. Please try again or call (03) 9071 0280.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 border border-slate-100 text-center max-w-2xl mx-auto">
        <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-5 ring-8 ring-emerald-50">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <span className="text-xs font-bold uppercase tracking-widest text-gold-600">
          Request Received
        </span>
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-knight-900 mt-2">
          Thank You, {formData.name}
        </h3>
        <p className="text-slate-600 mt-3 text-sm sm:text-base leading-relaxed">
          Your appraisal request for <span className="font-semibold text-knight-900">{formData.address}, {formData.suburb}</span> has been transmitted directly to Director Lushan Dons and our senior valuation specialists.
        </p>

        <div className="mt-8 p-5 rounded-xl bg-knight-900 text-white text-left flex items-start gap-4">
          <ShieldCheck className="w-6 h-6 text-gold-400 shrink-0 mt-0.5" />
          <div className="text-xs">
            <div className="font-bold text-sm text-gold-300">The Dons Premier Guarantee</div>
            <p className="text-slate-300 mt-1">
              We guarantee to contact you within one business day with preliminary comparable sales data and arrange a confidential on-site evaluation.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setStep(1);
          }}
          className="mt-8 inline-flex items-center gap-2 text-xs font-semibold text-knight-900 hover:text-gold-700 underline"
        >
          Submit another appraisal request
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden max-w-3xl mx-auto">
      {/* Form Progress Header */}
      <div className="bg-knight-900 text-white px-6 sm:px-8 py-6 border-b border-knight-800">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-gold-400 text-xs font-bold uppercase tracking-widest">
              Dons Premier Market Appraisal
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-white mt-0.5">
              Request Your Free Property Valuation
            </h2>
          </div>
          <span className="text-xs font-bold px-3 py-1 bg-knight-800 text-gold-300 rounded-full border border-knight-700">
            Step {step} of 3
          </span>
        </div>

        {/* Step Indicator Bar */}
        <div className="w-full bg-knight-800 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-gold-500 to-gold-400 h-full transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 sm:p-8">
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
            {error}
          </div>
        )}

        {/* Step 1: Property Location */}
        {step === 1 && (
          <div className="space-y-5 animate-in fade-in duration-300">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Street Address *
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="address"
                  required
                  placeholder="e.g. 16 Claremont Glen"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-gold-500 focus:outline-none"
                />
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Suburb *
                </label>
                <input
                  type="text"
                  name="suburb"
                  required
                  placeholder="e.g. Berwick, Clyde, Cranbourne"
                  value={formData.suburb}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-gold-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Estimated Selling Timeframe
                </label>
                <select
                  name="timeframe"
                  value={formData.timeframe}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-gold-500 focus:outline-none bg-white"
                >
                  <option value="Immediately / Next 30 Days">Immediately / Next 30 Days</option>
                  <option value="Next 1-3 months">Next 1-3 months</option>
                  <option value="3-6 months">3-6 months</option>
                  <option value="Just curious about market value">Just curious about market value</option>
                  <option value="Looking to lease out">Looking to lease out</option>
                </select>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={nextStep}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-knight-950 bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-300 hover:to-gold-400 rounded-xl shadow-md transition-all"
              >
                <span>Continue to Specifications</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Property Specifications */}
        {step === 2 && (
          <div className="space-y-5 animate-in fade-in duration-300">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Property Type
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {['House', 'Townhouse', 'Unit', 'Land'].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFormData({ ...formData, propertyType: type })}
                    className={`py-3 px-3 rounded-xl border text-xs font-semibold transition-all ${formData.propertyType === type
                        ? 'bg-knight-900 text-white border-knight-900 shadow-md'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Bedrooms
                </label>
                <select
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-gold-500 focus:outline-none bg-white"
                >
                  <option value="1">1 Bedroom</option>
                  <option value="2">2 Bedrooms</option>
                  <option value="3">3 Bedrooms</option>
                  <option value="4">4 Bedrooms</option>
                  <option value="5+">5+ Bedrooms</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Bathrooms
                </label>
                <select
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-gold-500 focus:outline-none bg-white"
                >
                  <option value="1">1 Bathroom</option>
                  <option value="2">2 Bathrooms</option>
                  <option value="3">3 Bathrooms</option>
                  <option value="4+">4+ Bathrooms</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Special Features or Upgrades (Optional)
              </label>
              <textarea
                name="additionalDetails"
                rows={2}
                placeholder="e.g. Recently renovated kitchen, pool, solar panels, subdivision potential..."
                value={formData.additionalDetails}
                onChange={handleChange}
                className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-gold-500 focus:outline-none"
              />
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-knight-900 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-knight-950 bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-300 hover:to-gold-400 rounded-xl shadow-md transition-all"
              >
                <span>Continue to Your Details</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Owner Details */}
        {step === 3 && (
          <div className="space-y-5 animate-in fade-in duration-300">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Your Full Name *
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. David Henderson"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-gold-500 focus:outline-none"
                />
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Mobile Number *
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="e.g. 0449 896 210"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-gold-500 focus:outline-none"
                  />
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="e.g. david@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-gold-500 focus:outline-none"
                  />
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-gold-600 shrink-0" />
              <span>
                Your privacy is strictly respected. Your valuation is 100% free, confidential, and carries zero obligation to sell.
              </span>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={prevStep}
                disabled={loading}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-knight-900 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-knight-950 bg-gradient-to-r from-gold-400 via-gold-500 to-gold-400 hover:from-gold-300 hover:to-gold-400 rounded-xl shadow-lg hover:shadow-gold-500/30 transition-all transform hover:-translate-y-0.5 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Transmitting to CRM...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Appraisal Request</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

