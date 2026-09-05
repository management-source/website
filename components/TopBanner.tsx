import React from 'react';
import { Phone, MapPin, ShieldCheck, Clock } from 'lucide-react';
import { AGENCY_INFO } from '@/data/content';

export default function TopBanner() {
  return (
    <div className="bg-knight-950 text-slate-300 text-xs border-b border-knight-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center justify-between gap-3">
        {/* Left: Office & Contact */}
        <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
          <div className="flex items-center gap-1.5 text-slate-300">
            <MapPin className="w-3.5 h-3.5 text-gold-400 shrink-0" />
            <span className="hidden sm:inline">Head Office:</span>
            <span>24 Coral-Pea Way, Cranbourne West VIC 3977</span>
          </div>

          <a
            href="tel:0390710280"
            className="flex items-center gap-1.5 text-slate-300 hover:text-gold-300 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-gold-400 shrink-0" />
            <span className="font-medium text-white">{AGENCY_INFO.phone}</span>
          </a>
        </div>

        {/* Right: Service Guarantee */}
        <div className="flex items-center gap-2 text-gold-300">
          <ShieldCheck className="w-3.5 h-3.5 text-gold-400 shrink-0" />
          <span className="font-medium">1-Business-Day Communication Guarantee</span>
          <span className="hidden md:inline text-slate-500">•</span>
          <span className="hidden md:inline text-slate-400">Victoria-Wide Sales & Property Management</span>
        </div>
      </div>
    </div>
  );
}

