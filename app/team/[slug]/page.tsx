import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, Mail, ArrowLeft, ShieldCheck, CheckCircle2, Award, Calendar } from 'lucide-react';
import { TEAM_MEMBERS, PROPERTIES } from '@/data/content';
import PropertyCard from '@/components/PropertyCard';
import EnquiryForm from '@/components/EnquiryForm';

export async function generateStaticParams() {
  return TEAM_MEMBERS.map((m) => ({
    slug: m.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function TeamMemberPage({ params }: PageProps) {
  const { slug } = await params;
  const member = TEAM_MEMBERS.find((m) => m.slug === slug);

  if (!member) {
    notFound();
  }

  const agentListings = PROPERTIES.filter((p) =>
    p.agent.name.toLowerCase().includes(member.name.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/team"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-knight-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to all team members</span>
          </Link>
        </div>

        {/* Profile Card Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm mb-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Photo */}
            <div className="md:col-span-4 lg:col-span-3">
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden shadow-xl ring-4 ring-gold-400/30 bg-slate-200">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 300px"
                  className="object-cover"
                />
              </div>

              {/* Direct Contacts */}
              <div className="mt-6 space-y-2.5">
                <a
                  href={`tel:${member.phone.replace(/\s+/g, '')}`}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-knight-900 hover:bg-knight-800 text-white font-semibold text-xs rounded-xl shadow-md transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-gold-400" />
                  <span>Call {member.phone}</span>
                </a>

                <a
                  href={`mailto:${member.email}`}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-xl transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-slate-600" />
                  <span>{member.email}</span>
                </a>
              </div>
            </div>

            {/* Bio & Details */}
            <div className="md:col-span-8 lg:col-span-9 space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-gold-600">
                  Dons Premier Professional
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-knight-900 mt-1">
                  {member.name}
                </h1>
                <div className="text-sm font-semibold text-slate-600 mt-1">
                  {member.title}
                </div>
              </div>

              {member.motto && (
                <div className="p-4 rounded-xl bg-gold-50 border border-gold-200 text-xs sm:text-sm italic text-gold-900 font-medium">
                  &quot;{member.motto}&quot;
                </div>
              )}

              <div className="prose prose-slate max-w-none text-slate-700 text-sm sm:text-base leading-relaxed whitespace-pre-line pt-2">
                {member.bio}
              </div>

              {/* Specialties */}
              {member.specialties && member.specialties.length > 0 && (
                <div className="pt-4 border-t border-slate-100">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                    Core Areas of Expertise
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {member.specialties.map((spec, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-lg text-xs font-medium bg-knight-50 text-knight-900 border border-knight-100"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content Layout: Active Listings & Message Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Active Listings Column */}
          <div className="lg:col-span-8">
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-gold-600">
                Portfolio
              </span>
              <h2 className="font-serif text-2xl font-bold text-knight-900 mt-0.5">
                Properties Represented by {member.name}
              </h2>
            </div>

            {agentListings.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center text-xs text-slate-500">
                No active public listings currently assigned to {member.name}.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {agentListings.map((listing) => (
                  <PropertyCard key={listing.id} property={listing} />
                ))}
              </div>
            )}
          </div>

          {/* Direct Message Form Column */}
          <div className="lg:col-span-4">
            <div className="sticky top-24">
              <EnquiryForm agentName={member.name} defaultType="sales" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

