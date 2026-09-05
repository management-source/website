import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, Mail, ArrowRight, ShieldCheck, Award } from 'lucide-react';
import { TEAM_MEMBERS } from '@/data/content';

export const metadata = {
  title: 'Our Team | Dons Premier Estate Agents',
  description:
    'Meet the directors, licensed auctioneers, property consultants, and property management specialists at Dons Premier Estate Agents.',
};

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-600">
            Dons Premier Professionals
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-knight-900 mt-1">
            Our Leadership & Team
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            Committed to results-driven representation, transparent communication, and safeguarding your real estate investments across Melbourne&apos;s South-East corridor.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {TEAM_MEMBERS.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Member Headshot */}
                <div className="relative aspect-square w-full overflow-hidden bg-slate-100">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="font-serif text-xl font-bold text-white">
                      {member.name}
                    </h3>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6">
                  <div className="text-xs font-semibold text-gold-700 leading-snug min-h-[32px] mb-3">
                    {member.title}
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-4">
                    {member.bio}
                  </p>

                  {/* Specialties */}
                  {member.specialties && member.specialties.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {member.specialties.slice(0, 3).map((spec, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-700"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="px-6 pb-6 pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                <a
                  href={`tel:${member.phone.replace(/\s+/g, '')}`}
                  className="flex items-center gap-1.5 font-semibold text-knight-900 hover:text-gold-700 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-gold-600" />
                  <span>{member.phone}</span>
                </a>

                <Link
                  href={`/team/${member.slug}`}
                  className="inline-flex items-center gap-1 font-semibold text-gold-700 hover:text-knight-900 transition-colors"
                >
                  <span>Profile</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

