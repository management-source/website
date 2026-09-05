import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, ShieldCheck, Clock, ArrowRight } from 'lucide-react';
import Logo from './Logo';
import { AGENCY_INFO, OFFICES } from '@/data/content';

export default function Footer() {
  return (
    <footer className="bg-knight-950 text-slate-400 border-t border-knight-800">
      {/* Top Banner inside Footer */}
      <div className="border-b border-knight-900 bg-knight-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-gold-400 text-xs font-semibold uppercase tracking-widest">
                Service Guarantee
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mt-1">
                Thinking of Selling or Leasing in Melbourne's South-East?
              </h3>
              <p className="text-sm text-slate-300 mt-1 max-w-2xl">
                Experience the Knight standard. We guarantee direct response within 24 hours and strategic marketing campaigns engineered for top dollar.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/appraisal"
                className="px-6 py-3 text-sm font-semibold uppercase tracking-wider text-knight-950 bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-300 hover:to-gold-400 rounded-lg shadow-lg hover:shadow-gold-500/20 transition-all"
              >
                Request Free Appraisal
              </Link>
              <Link
                href="/contact"
                className="px-5 py-3 text-sm font-semibold text-slate-200 hover:text-white bg-knight-850 hover:bg-knight-800 border border-knight-700 rounded-lg transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: Agency Brand */}
          <div className="space-y-4">
            <Logo lightMode={true} size="md" />
            <p className="text-sm text-slate-400 leading-relaxed">
              Founded in 2019 by Lushan Dons and Jessica Gale. Known as &quot;The Knights of Real Estate&quot;, we embody tactical intelligence, strength, and unwavering client advocacy across Victoria.
            </p>
            <div className="pt-2 text-xs space-y-1.5 text-slate-300">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                <span>General: (03) 9071 0280</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                <span>Sales Hotline: (03) 9071 0287</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gold-400 shrink-0" />
                <span>admin@donspremier.com.au</span>
              </div>
            </div>
          </div>

          {/* Column 2: Our 3 Strategic Office Hubs */}
          <div>
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-knight-800 pb-2">
              Our Strategic Offices
            </h4>
            <div className="space-y-4 text-xs">
              {OFFICES.map((office) => (
                <div key={office.id} className="space-y-1">
                  <div className="font-semibold text-gold-400 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span>{office.name}</span>
                  </div>
                  <p className="text-slate-300 pl-5">
                    {office.address}, {office.suburb} {office.state} {office.postcode}
                  </p>
                  <p className="text-slate-500 pl-5 text-[11px]">{office.hours}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Quick Navigation */}
          <div>
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-knight-800 pb-2">
              Explore & Services
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/properties?status=for_sale" className="hover:text-gold-300 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-gold-400" />
                  <span>Residential for Sale</span>
                </Link>
              </li>
              <li>
                <Link href="/properties?status=sold" className="hover:text-gold-300 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-gold-400" />
                  <span>Recently Sold Properties</span>
                </Link>
              </li>
              <li>
                <Link href="/rentals" className="hover:text-gold-300 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-gold-400" />
                  <span>Rental Properties</span>
                </Link>
              </li>
              <li>
                <Link href="/appraisal" className="hover:text-gold-300 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-gold-400" />
                  <span>Request Free Market Appraisal</span>
                </Link>
              </li>
              <li>
                <Link href="/maintenance" className="hover:text-gold-300 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-gold-400" />
                  <span>Tenant Maintenance Request</span>
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-gold-300 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-gold-400" />
                  <span>The Knight Chess Story</span>
                </Link>
              </li>
              <li>
                <Link href="/team" className="hover:text-gold-300 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-gold-400" />
                  <span>Our Leadership & Team</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Primary Suburbs & Legal */}
          <div>
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-knight-800 pb-2">
              Melbourne South-East Focus
            </h4>
            <div className="flex flex-wrap gap-1.5 mb-6">
              {[
                'Berwick',
                'Clyde',
                'Clyde North',
                'Cranbourne',
                'Cranbourne West',
                'Officer',
                'Pakenham',
                'Scoresby',
                'Hampton Park',
                'Dandenong',
                'Craigieburn',
              ].map((suburb) => (
                <Link
                  key={suburb}
                  href={`/properties?suburb=${encodeURIComponent(suburb)}`}
                  className="px-2.5 py-1 text-xs bg-knight-900 hover:bg-knight-800 text-slate-300 hover:text-gold-300 rounded border border-knight-800 transition-colors"
                >
                  {suburb}
                </Link>
              ))}
            </div>

            <div className="text-xs text-slate-400 space-y-1">
              <div className="font-semibold text-slate-300">Licensing & Compliance:</div>
              <p>Licensed Estate Agents Victoria • REIV Standards • Corporate Entity Reg. 2019</p>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="mt-12 pt-8 border-t border-knight-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>&copy; {new Date().getFullYear()} Dons Premier Estate Agents. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Powered by Premier Hub CRM</span>
            <span className="text-slate-700">•</span>
            <Link href="/contact" className="hover:text-gold-400 transition-colors">
              Privacy & Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

