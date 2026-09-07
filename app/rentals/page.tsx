import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Key,
  ShieldCheck,
  CheckCircle2,
  Phone,
  Mail,
  Wrench,
  FileText,
  Building,
  ArrowRight,
} from 'lucide-react';
import PropertyCard from '@/components/PropertyCard';
import { getProperties } from '@/lib/crm';
import { TEAM_MEMBERS } from '@/data/content';

export const revalidate = 60;

export const metadata = {
  title: 'Rental Properties & Property Management | Dons Premier Estate Agents',
  description:
    'Browse properties for rent and discover our proactive residential property management services led by Jessica Gale across Victoria.',
};

export default async function RentalsPage() {
  const allProps = await getProperties({ status: 'for_rent' });
  const pmLeader = TEAM_MEMBERS.find((m) => m.slug === 'jessica-gale');

  return (
    <div className="min-h-screen bg-white py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-600">
            Dons Premier Leasing Hub
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-knight-900 mt-1">
            Rental Properties & Management
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
            Whether you are searching for your next home or seeking proactive property management backed by our 1-business-day communication guarantee.
          </p>
        </div>

        {/* Quick Action Cards for Tenants & Landlords */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-knight-900 text-gold-400 flex items-center justify-center mb-4">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-lg text-knight-900 mb-1">
                Tenant Application
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Found a home you love? Submit your rental application, identification, and references for prompt assessment.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-slate-100">
              <a
                href="mailto:admin@donspremier.com.au?subject=Tenant%20Application%20Submission"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-knight-900 hover:text-gold-700"
              >
                <span>Submit Application via Email</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-knight-900 text-gold-400 flex items-center justify-center mb-4">
                <Wrench className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-lg text-knight-900 mb-1">
                Maintenance Request
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Existing tenants can log urgent or routine maintenance requests online for immediate dispatch of licensed trades.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-slate-100">
              <Link
                href="/maintenance"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-knight-900 hover:text-gold-700"
              >
                <span>Log Maintenance Request</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-knight-900 text-gold-400 flex items-center justify-center mb-4">
                <Building className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-lg text-knight-900 mb-1">
                Landlord Rental Appraisal
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Maximize your yield and minimize vacancy. Request a comprehensive rental market analysis from Jessica Gale.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-slate-100">
              <Link
                href="/appraisal"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-knight-900 hover:text-gold-700"
              >
                <span>Request Rental Valuation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Current Rental Listings */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-gold-600">
                Active Listings
              </span>
              <h2 className="font-serif text-2xl font-bold text-knight-900 mt-0.5">
                Available Properties for Lease
              </h2>
            </div>
            <span className="text-xs font-semibold text-slate-500">
              {allProps.length} Available
            </span>
          </div>

          {allProps.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
              <Key className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <h3 className="font-serif text-lg font-bold text-knight-900">
                All Rental Properties Currently Leased
              </h3>
              <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                Our rental portfolio boasts an exceptionally low vacancy rate. Register your tenant requirements to be notified first of upcoming listings.
              </p>
              <a
                href="mailto:admin@donspremier.com.au?subject=Tenant%20Register%20Interest"
                className="mt-4 inline-block px-5 py-2.5 rounded-xl bg-knight-900 text-white text-xs font-semibold hover:bg-knight-800 transition-colors"
              >
                Register Tenant Requirements
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allProps.map((prop) => (
                <PropertyCard key={prop.id} property={prop} />
              ))}
            </div>
          )}
        </div>

        {/* Property Management Spotlight with Jessica Gale */}
        {pmLeader && (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-4 text-center">
                <div className="w-40 h-40 rounded-3xl overflow-hidden relative shadow-xl ring-4 ring-gold-400/40 bg-slate-200 mx-auto mb-4">
                  <Image
                    src={pmLeader.image}
                    alt={pmLeader.name}
                    fill
                    sizes="160px"
                    className="object-cover"
                  />
                </div>
                <h3 className="font-serif text-xl font-bold text-knight-900">{pmLeader.name}</h3>
                <div className="text-xs font-semibold text-gold-700 mt-0.5">{pmLeader.title}</div>
                <div className="mt-3 flex justify-center gap-2">
                  <a
                    href={`tel:${pmLeader.phone.replace(/\s+/g, '')}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-knight-900 text-white text-xs font-medium"
                  >
                    <Phone className="w-3 h-3 text-gold-400" />
                    <span>{pmLeader.phone}</span>
                  </a>
                </div>
              </div>

              <div className="lg:col-span-8 space-y-4">
                <span className="text-xs font-bold uppercase tracking-widest text-gold-600">
                  Owner-First Philosophy
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-knight-900">
                  &quot;Quality is Priority — Quality Process Gets Top Results&quot;
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Jessica Gale was born and raised in Melbourne&apos;s south-eastern suburbs, giving our property management division unprecedented local knowledge. Under her leadership, our rental team guarantees same-day communication, thorough routine inspections, and full compliance with Victorian residential tenancy legislation.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0" />
                    <span>Strict 1-business-day response guarantee</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0" />
                    <span>Comprehensive digital condition reporting</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0" />
                    <span>Vetted licensed trade network</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0" />
                    <span>Zero tolerance rent arrears monitoring</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

