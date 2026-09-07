import React from 'react';
import Image from 'next/image';
import { Phone, Mail, MapPin, Clock, ShieldCheck, User, MessageSquare } from 'lucide-react';
import EnquiryForm from '@/components/EnquiryForm';
import { AGENCY_INFO, OFFICES } from '@/data/content';

export const metadata = {
  title: 'Contact Us & Office Locations | Dons Premier Estate Agents',
  description:
    'Contact Dons Premier Estate Agents across our Cranbourne West, Chadstone, and Bundoora offices. Guaranteed 1-day response.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-50 border border-gold-200 text-gold-800 text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-gold-600" />
            <span>Guaranteed 24-Hour Response</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-knight-900 mt-1">
            Get in Touch With Us
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Our team is at your disposal across Melbourne&apos;s South-East corridor. Reach out directly to our sales, rental, or administrative divisions.
          </p>
        </div>

        {/* Department Direct Contacts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Sales Card */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl overflow-hidden relative mb-4 ring-2 ring-gold-400/40 bg-slate-200">
                <Image
                  src="https://donspremier.com.au/database/images/agent_1.jpg"
                  alt="Lushan Dons"
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-gold-600">
                Sales & Auctions
              </span>
              <h3 className="font-serif text-xl font-bold text-knight-900 mt-0.5">
                Lushan Dons
              </h3>
              <p className="text-xs text-slate-500 mb-4">Founder / Director / Senior Auctioneer</p>
            </div>

            <div className="space-y-2 pt-4 border-t border-slate-100 text-xs">
              <a
                href="tel:0390710287"
                className="flex items-center gap-2 text-knight-900 font-semibold hover:text-gold-700"
              >
                <Phone className="w-3.5 h-3.5 text-gold-600" />
                <span>Sales Direct: (03) 9071 0287</span>
              </a>
              <a
                href="tel:0449896210"
                className="flex items-center gap-2 text-slate-600 hover:text-gold-700"
              >
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>Mobile: 0449 896 210</span>
              </a>
              <a
                href="mailto:lushan@donspremier.com.au?subject=New%20Enquiries%20-%20Sales"
                className="flex items-center gap-2 text-slate-600 hover:text-gold-700 truncate"
              >
                <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">lushan@donspremier.com.au</span>
              </a>
            </div>
          </div>

          {/* Rental Card */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl overflow-hidden relative mb-4 ring-2 ring-gold-400/40 bg-slate-200">
                <Image
                  src="https://donspremier.com.au/database/images/agent_2.jpg"
                  alt="Jessica Gale"
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-gold-600">
                Property Management
              </span>
              <h3 className="font-serif text-xl font-bold text-knight-900 mt-0.5">
                Jessica Gale
              </h3>
              <p className="text-xs text-slate-500 mb-4">Co-Founder & Officer in Effective Control</p>
            </div>

            <div className="space-y-2 pt-4 border-t border-slate-100 text-xs">
              <a
                href="tel:0390710280"
                className="flex items-center gap-2 text-knight-900 font-semibold hover:text-gold-700"
              >
                <Phone className="w-3.5 h-3.5 text-gold-600" />
                <span>Rentals Desk: (03) 9071 0280</span>
              </a>
              <a
                href="tel:0422643451"
                className="flex items-center gap-2 text-slate-600 hover:text-gold-700"
              >
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>Mobile: 0422 643 451</span>
              </a>
              <a
                href="mailto:admin@donspremier.com.au?subject=New%20Enquiries%20-%20Rental"
                className="flex items-center gap-2 text-slate-600 hover:text-gold-700 truncate"
              >
                <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">admin@donspremier.com.au</span>
              </a>
            </div>
          </div>

          {/* Staff Team Card */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-knight-900 text-gold-400 flex items-center justify-center mb-4 text-2xl font-serif">
                ♞
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-gold-600">
                General Administration
              </span>
              <h3 className="font-serif text-xl font-bold text-knight-900 mt-0.5">
                Staff Team
              </h3>
              <p className="text-xs text-slate-500 mb-4">Operations, Compliance & Client Support</p>
            </div>

            <div className="space-y-2 pt-4 border-t border-slate-100 text-xs">
              <a
                href="tel:0390710280"
                className="flex items-center gap-2 text-knight-900 font-semibold hover:text-gold-700"
              >
                <Phone className="w-3.5 h-3.5 text-gold-600" />
                <span>Office Switchboard: (03) 9071 0280</span>
              </a>
              <a
                href="mailto:management@donspremier.com.au?subject=New%20Enquiries%20-%20Team"
                className="flex items-center gap-2 text-slate-600 hover:text-gold-700 truncate"
              >
                <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">management@donspremier.com.au</span>
              </a>
              <div className="text-slate-400 text-[11px] pt-1">
                Mon - Sat: 9:00 AM - 6:00 PM
              </div>
            </div>
          </div>
        </div>

        {/* 3 Office Hubs Grid */}
        <div className="mb-16">
          <div className="mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-gold-600">
              Our Locations
            </span>
            <h2 className="font-serif text-2xl font-bold text-knight-900 mt-0.5">
              Visit One of Our 3 Office Hubs
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {OFFICES.map((office) => (
              <div
                key={office.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-knight-100 text-knight-900 mb-2">
                    {office.type}
                  </div>
                  <h3 className="font-serif text-lg font-bold text-knight-900">
                    {office.name}
                  </h3>
                  <div className="flex items-start gap-2 text-xs text-slate-600 mt-2">
                    <MapPin className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                    <span>{office.address}, {office.suburb} {office.state} {office.postcode}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{office.hours}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <a
                    href={`tel:${office.phone.replace(/\s+/g, '')}`}
                    className="font-bold text-knight-900 hover:text-gold-700 flex items-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5 text-gold-600" />
                    <span>{office.phone}</span>
                  </a>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(
                      `${office.address}, ${office.suburb} VIC`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold-700 font-semibold hover:underline"
                  >
                    Google Maps
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Message Form Box */}
        <div className="max-w-2xl mx-auto">
          <EnquiryForm defaultType="general" />
        </div>
      </div>
    </div>
  );
}

