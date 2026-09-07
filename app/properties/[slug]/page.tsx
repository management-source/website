import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  Bed,
  Bath,
  Car,
  Maximize2,
  MapPin,
  Calendar,
  Phone,
  Mail,
  ShieldCheck,
  CheckCircle2,
  ArrowLeft,
  Share2,
  Printer,
  Calculator,
} from 'lucide-react';
import { getPropertyBySlug, getProperties } from '@/lib/crm';
import MortgageCalculator from '@/components/MortgageCalculator';
import EnquiryForm from '@/components/EnquiryForm';
import PropertyCard from '@/components/PropertyCard';

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  const properties = await getProperties();
  return properties.map((p) => ({
    slug: p.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function PropertyDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);

  if (!property) {
    notFound();
  }

  const allProps = await getProperties();
  const similarProps = allProps
    .filter((p) => p.id !== property.id && (p.status === property.status || p.address.suburb === property.address.suburb))
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-white py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-knight-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to all properties</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">
              Ref: <span className="font-mono text-slate-600">{property.id.toUpperCase()}</span>
            </span>
          </div>
        </div>

        {/* Header Title & Price Bar */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-knight-900 text-white shadow-sm">
                  {property.status === 'for_sale' ? 'For Sale' : property.status === 'for_rent' ? 'For Lease' : 'Sold Record'}
                </span>
                <span className="px-3 py-1 rounded-full text-[11px] font-medium bg-slate-100 text-slate-700">
                  {property.type}
                </span>
                {property.landSize && (
                  <span className="px-3 py-1 rounded-full text-[11px] font-medium bg-gold-50 text-gold-800 border border-gold-200">
                    {property.landSize}
                  </span>
                )}
              </div>

              <h1 className="font-serif text-2xl sm:text-4xl font-bold text-knight-900 tracking-tight">
                {property.title}
              </h1>

              <div className="flex items-center gap-2 text-slate-600 text-sm mt-2">
                <MapPin className="w-4 h-4 text-gold-600 shrink-0" />
                <span>{property.address.fullAddress}</span>
              </div>
            </div>

            <div className="lg:text-right border-t lg:border-t-0 pt-4 lg:pt-0 border-slate-100">
              <div className="text-xs text-slate-500 uppercase font-semibold tracking-wider">
                Guide / Listed Price
              </div>
              <div className="text-2xl sm:text-4xl font-serif font-bold text-knight-900 text-gold-700 mt-0.5">
                {property.price}
              </div>
            </div>
          </div>

          {/* Quick Specs Strip */}
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-knight-50 flex items-center justify-center text-knight-900">
                <Bed className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-500">Bedrooms</div>
                <div className="font-bold text-slate-900">{property.bedrooms} Beds</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-knight-50 flex items-center justify-center text-knight-900">
                <Bath className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-500">Bathrooms</div>
                <div className="font-bold text-slate-900">{property.bathrooms} Baths</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-knight-50 flex items-center justify-center text-knight-900">
                <Car className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-500">Parking</div>
                <div className="font-bold text-slate-900">{property.carSpaces} Spaces</div>
              </div>
            </div>

            {property.landSize && (
              <div className="hidden sm:flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-knight-50 flex items-center justify-center text-knight-900">
                  <Maximize2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500">Land Area</div>
                  <div className="font-bold text-slate-900">{property.landSize}</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Photo Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="md:col-span-2 relative aspect-[16/10] rounded-2xl overflow-hidden shadow-md bg-slate-200">
            <Image
              src={property.images[0]}
              alt={property.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 66vw"
              className="object-cover hover:scale-102 transition-transform duration-500"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
            {property.images.slice(1, 3).map((img, i) => (
              <div key={i} className="relative aspect-[16/10] md:aspect-[16/9.5] rounded-2xl overflow-hidden shadow-sm bg-slate-200">
                <Image
                  src={img}
                  alt={`${property.title} detail ${i + 2}`}
                  fill
                  sizes="(max-width: 1024px) 50vw, 33vw"
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Content Layout: Main Details + Sticky Agent Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Details (8 cols) */}
          <div className="lg:col-span-8 space-y-10">
            {/* Inspection Times Card */}
            {property.inspectionTimes && property.inspectionTimes.length > 0 && (
              <div className="bg-gradient-to-r from-knight-900 to-knight-850 text-white rounded-2xl p-6 shadow-md border border-knight-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gold-400 text-knight-950 flex items-center justify-center shrink-0">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs uppercase font-bold tracking-wider text-gold-300">
                      Upcoming Open Inspections
                    </div>
                    <div className="text-base font-semibold text-white mt-0.5">
                      {property.inspectionTimes.join(' | ')}
                    </div>
                  </div>
                </div>

                <a
                  href="#enquiry-section"
                  className="inline-flex items-center justify-center px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-knight-950 bg-gold-400 hover:bg-gold-300 transition-colors shrink-0"
                >
                  Register to Inspect
                </a>
              </div>
            )}

            {/* Description Card */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-knight-900">
                {property.headline}
              </h2>
              <div className="prose prose-slate max-w-none text-slate-700 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                {property.description}
              </div>
            </div>

            {/* Property Features Checklist */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
              <h3 className="font-serif text-xl font-bold text-knight-900 mb-6">
                Property Features & Inclusions
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {property.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mortgage Calculator */}
            {property.status === 'for_sale' && (
              <MortgageCalculator initialPrice={property.priceNumeric || 850000} />
            )}

            {/* Enquiry Form Section Anchor */}
            <div id="enquiry-section">
              <EnquiryForm
                propertyId={property.id}
                propertyAddress={property.address.fullAddress}
                agentName={property.agent.name}
                defaultType={property.status === 'for_rent' ? 'rentals' : 'sales'}
              />
            </div>
          </div>

          {/* Sticky Agent Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Agent Profile Card */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-md sticky top-24">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-2xl overflow-hidden relative shadow-md ring-2 ring-gold-400/50 bg-slate-200 shrink-0">
                  <Image
                    src={property.agent.image}
                    alt={property.agent.name}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-gold-600">
                    Listing Agent
                  </div>
                  <h3 className="font-serif font-bold text-lg text-knight-900">
                    {property.agent.name}
                  </h3>
                  <p className="text-xs text-slate-500">{property.agent.role}</p>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                <a
                  href={`tel:${property.agent.phone.replace(/\s+/g, '')}`}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-knight-900 hover:bg-knight-800 text-white font-semibold rounded-xl transition-colors shadow-sm"
                >
                  <Phone className="w-4 h-4 text-gold-400" />
                  <span>Call {property.agent.phone}</span>
                </a>

                <a
                  href={`mailto:${property.agent.email}?subject=Enquiry: ${encodeURIComponent(property.address.fullAddress)}`}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-xl transition-colors"
                >
                  <Mail className="w-4 h-4 text-slate-600" />
                  <span>Email Agent Directly</span>
                </a>
              </div>

              {/* Service Guarantee Note */}
              <div className="mt-5 p-3.5 rounded-xl bg-gold-50 border border-gold-200 text-xs text-gold-900 flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-gold-700 shrink-0 mt-0.5" />
                <p className="leading-snug">
                  <strong>Service Guarantee:</strong> We return all client inquiries within one business day — every time.
                </p>
              </div>

              {/* Office Details */}
              <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-500 space-y-1">
                <div>Dons Premier Estate Agents</div>
                <div>Head Office: 24 Coral-Pea Way, Cranbourne West</div>
                <div>Office Phone: (03) 9071 0280</div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Listings */}
        {similarProps.length > 0 && (
          <div className="mt-20 pt-12 border-t border-slate-200">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-gold-600">
                  Recommended Properties
                </span>
                <h3 className="font-serif text-2xl font-bold text-knight-900 mt-0.5">
                  Similar Opportunities in South-East Melbourne
                </h3>
              </div>
              <Link
                href="/properties"
                className="text-xs font-semibold text-knight-900 hover:text-gold-700 underline"
              >
                View all properties
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {similarProps.map((simProp) => (
                <PropertyCard key={simProp.id} property={simProp} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

