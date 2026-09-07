import React from 'react';
import { ShieldCheck, CheckCircle2, TrendingUp, Award, Clock, Phone, HelpCircle } from 'lucide-react';
import AppraisalForm from '@/components/AppraisalForm';

export const metadata = {
  title: 'Free Market Appraisal | Dons Premier Estate Agents',
  description:
    'Request a free, confidential property valuation from Director Lushan Dons and senior South-East Melbourne sales specialists.',
};

export default function AppraisalPage() {
  return (
    <div className="min-h-screen bg-white py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-50 border border-gold-200 text-gold-800 text-xs font-bold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-gold-600" />
            <span>100% Free & Confidential</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-knight-900 tracking-tight">
            Discover What Your Property Is Truly Worth
          </h1>

          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            Obtain an authoritative, data-backed market valuation conducted by Licensed Director Lushan Dons and our South-East Melbourne sales analysts.
          </p>
        </div>

        {/* The Multi-Step Interactive Form */}
        <div className="mb-20">
          <AppraisalForm />
        </div>

        {/* Why Choose Dons Premier for Appraisals */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white rounded-2xl p-7 border border-slate-200 shadow-sm text-center">
            <div className="w-12 h-12 rounded-2xl bg-knight-900 text-gold-400 flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-knight-900 mb-2">
              Precise Comparative Sales Data
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We look beyond automated algorithms, studying real-time street-level buyer demand, recent auction clearance benchmarks, and off-market transactions.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-7 border border-slate-200 shadow-sm text-center">
            <div className="w-12 h-12 rounded-2xl bg-knight-900 text-gold-400 flex items-center justify-center mx-auto mb-4">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-knight-900 mb-2">
              1-Business-Day Delivery Guarantee
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We value your time. Your appraisal report and personalized market insights are prepared and delivered within one business day.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-7 border border-slate-200 shadow-sm text-center">
            <div className="w-12 h-12 rounded-2xl bg-knight-900 text-gold-400 flex items-center justify-center mx-auto mb-4">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-knight-900 mb-2">
              Zero Obligation to Sell
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Whether you are planning to sell next week, refinancing your mortgage, or simply curious about capital growth, our appraisal is completely pressure-free.
            </p>
          </div>
        </div>

        {/* FAQs */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <HelpCircle className="w-6 h-6 text-gold-600" />
            <h2 className="font-serif text-2xl font-bold text-knight-900">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-6 text-xs sm:text-sm">
            <div>
              <h4 className="font-bold text-knight-900 text-sm mb-1">
                How is my property valuation calculated?
              </h4>
              <p className="text-slate-600 leading-relaxed">
                We combine historical sales data from the REIV and CoreLogic with our direct knowledge of current buyer registrations in Berwick, Clyde, Cranbourne, Officer, and surrounding suburbs. We also factor in unique property attributes such as land orientation, interior finishings, and recent renovations.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <h4 className="font-bold text-knight-900 text-sm mb-1">
                Do I need to invite an agent into my home?
              </h4>
              <p className="text-slate-600 leading-relaxed">
                Not necessarily. We can start with a preliminary desktop appraisal based on recent comparative sales and local data. If you decide to explore a sale, a brief 15-minute walkthrough allows us to pinpoint the exact pricing range and identify high-ROI presentation tips.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <h4 className="font-bold text-knight-900 text-sm mb-1">
                Can you appraise rental yields for investors?
              </h4>
              <p className="text-slate-600 leading-relaxed">
                Yes. Led by Co-Founder & Senior Property Manager Jessica Gale, our leasing department provides thorough rental appraisals indicating weekly rental value, tenant vacancy forecasts, and yield estimates.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

