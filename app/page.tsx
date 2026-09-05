import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Search,
  MapPin,
  Home,
  Key,
  TrendingUp,
  ShieldCheck,
  Award,
  ArrowRight,
  Phone,
  CheckCircle2,
  Calendar,
  Sparkles,
  Gavel,
  Clock,
  Star,
  Users,
} from 'lucide-react';
import PropertyCard from '@/components/PropertyCard';
import { getProperties } from '@/lib/crm';
import { AGENCY_INFO, TEAM_MEMBERS, TESTIMONIALS, SUBURBS_GUIDE } from '@/data/content';

export const revalidate = 60; // ISR 60 seconds

export default async function HomePage() {
  const properties = await getProperties();
  const forSale = properties.filter((p) => p.status === 'for_sale');
  const forRent = properties.filter((p) => p.status === 'for_rent');
  const recentlySold = properties.filter((p) => p.status === 'sold');

  const leadership = TEAM_MEMBERS.slice(0, 2); // Lushan & Jessica

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[640px] lg:min-h-[720px] flex items-center justify-center bg-knight-950 overflow-hidden">
        {/* Background Visual */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=85"
            alt="Dons Premier Real Estate Luxury Home"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-35 filter brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-knight-950 via-knight-950/70 to-knight-900/60" />
          <div className="absolute inset-0 bg-[radial-gradient(#c5a880_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 text-center flex flex-col items-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-knight-800/80 border border-gold-500/30 text-gold-300 text-xs font-semibold uppercase tracking-widest backdrop-blur-md mb-6 shadow-xl animate-in fade-in slide-in-from-top-4 duration-700">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span>The Knights of Real Estate</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight max-w-4xl leading-tight sm:leading-none">
            Mastering Strategy.{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gold-300 via-gold-400 to-gold-200">
              Maximizing Value.
            </span>
          </h1>

          <p className="mt-5 text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
            Welcome to Dons Premier Estate Agents. Founded in 2019 by Lushan Dons & Jessica Gale, delivering elite sales results, licensed auctioneering, and responsive property management across Melbourne&apos;s South-East.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 w-full max-w-3xl">
            {AGENCY_INFO.stats.map((st, i) => (
              <div
                key={i}
                className="bg-knight-900/80 backdrop-blur-md rounded-xl p-3 border border-knight-700/80 text-center"
              >
                <div className="text-xl sm:text-2xl font-serif font-bold text-gold-400">
                  {st.value}
                </div>
                <div className="text-[11px] text-slate-400 uppercase tracking-wider font-medium mt-0.5">
                  {st.label}
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Property Search Container */}
          <div className="w-full max-w-4xl mt-10 bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl p-4 sm:p-6 border border-white/20 text-left">
            <form action="/properties" method="GET" className="space-y-4">
              {/* Type Switcher Tabs */}
              <div className="flex items-center gap-2 border-b border-slate-200 pb-3 flex-wrap">
                <label className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold rounded-lg cursor-pointer transition-colors bg-knight-900 text-white">
                  <input type="radio" name="status" value="for_sale" defaultChecked className="hidden" />
                  <Home className="w-3.5 h-3.5 text-gold-400" />
                  <span>Buy</span>
                </label>
                <label className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg cursor-pointer transition-colors">
                  <input type="radio" name="status" value="for_rent" className="hidden" />
                  <Key className="w-3.5 h-3.5 text-slate-500" />
                  <span>Rent</span>
                </label>
                <label className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg cursor-pointer transition-colors">
                  <input type="radio" name="status" value="sold" className="hidden" />
                  <TrendingUp className="w-3.5 h-3.5 text-slate-500" />
                  <span>Sold</span>
                </label>
              </div>

              {/* Input Filters Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3 items-center">
                {/* Suburb Search */}
                <div className="relative">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Suburb / Location
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="suburb"
                      placeholder="e.g. Berwick, Clyde, Cranbourne"
                      className="w-full pl-8 pr-3 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-gold-500 focus:outline-none"
                    />
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-2.5 top-3" />
                  </div>
                </div>

                {/* Property Type */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Property Type
                  </label>
                  <select
                    name="type"
                    className="w-full px-3 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-gold-500 focus:outline-none"
                  >
                    <option value="">All Types</option>
                    <option value="House">House</option>
                    <option value="Townhouse">Townhouse</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Land">Land</option>
                  </select>
                </div>

                {/* Bedrooms */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Min Bedrooms
                  </label>
                  <select
                    name="bedrooms"
                    className="w-full px-3 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-gold-500 focus:outline-none"
                  >
                    <option value="">Any Beds</option>
                    <option value="2">2+ Bedrooms</option>
                    <option value="3">3+ Bedrooms</option>
                    <option value="4">4+ Bedrooms</option>
                    <option value="5">5+ Bedrooms</option>
                  </select>
                </div>

                {/* Submit Action */}
                <div className="sm:col-span-3 lg:col-span-1 pt-1 sm:pt-0">
                  <label className="hidden lg:block text-[10px] font-bold uppercase tracking-wider text-transparent mb-1">
                    Search
                  </label>
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-knight-950 bg-gradient-to-r from-gold-400 via-gold-500 to-gold-400 hover:from-gold-300 hover:to-gold-400 shadow-md transition-all transform hover:-translate-y-0.5"
                  >
                    <Search className="w-4 h-4" />
                    <span>Search</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* 2. THE STORY BEHIND OUR LOGO (Chess Knight Heritage) */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-50 border border-gold-200 text-gold-800 text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-gold-600" />
                <span>Our Strategic Heritage</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-knight-900 tracking-tight leading-snug">
                Why We Are Called <br />
                <span className="text-gold-700">&quot;The Knights of Real Estate&quot;</span>
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Founded in 2019 by <strong className="text-knight-900">Lushan Dons</strong>, Dons Premier Estate Agents was built on the belief that vendors and property investors deserve more than basic representation — they deserve responsive, transparent, and results-driven advocacy.
              </p>

              <div className="p-5 rounded-2xl bg-knight-50 border border-knight-100 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-knight-900 text-gold-400 flex items-center justify-center shrink-0 font-serif font-bold text-sm">
                    ♞
                  </div>
                  <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    <strong>The Knight Chess Piece:</strong> Founder Lushan Dons, a former competitive chess player, drew inspiration from the knight — the only chess piece capable of jumping over obstacles, moving in strategic L-shapes, and symbolizing tactical precision. The &apos;L&apos; movement honors the &apos;L&apos; in Lushan, while the stylized letter &apos;D&apos; embraces the knight, fusing identity with strategic intention.
                  </div>
                </div>
              </div>

              <p className="text-slate-600 text-sm leading-relaxed">
                Alongside Co-Founder and Officer in Effective Control <strong className="text-knight-900">Jessica Gale</strong>, our team treats every property not merely as a transaction, but as a prized strategic asset.
              </p>

              <div className="pt-2 flex flex-wrap gap-4 items-center">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-knight-900 hover:text-gold-700 transition-colors underline"
                >
                  <span>Read the full agency story & guarantees</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Visual Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl bg-gradient-to-br from-knight-950 via-knight-900 to-knight-850 p-8 sm:p-10 text-white shadow-2xl border border-knight-800">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 p-1 flex items-center justify-center mb-6 shadow-xl">
                  <span className="text-4xl">♞</span>
                </div>

                <span className="text-xs uppercase tracking-widest text-gold-400 font-bold">
                  The Service Guarantee
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mt-1">
                  1-Business-Day Response. Every Single Time.
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm mt-3 leading-relaxed">
                  We guarantee to return all vendor, buyer, landlord, and tenant phone calls and emails within one business day. No exceptions.
                </p>

                <div className="mt-6 pt-6 border-t border-knight-800 space-y-3 text-xs">
                  <div className="flex items-center gap-2.5 text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                    <span>In-House Licensed Auctioneers with Proven High Clearance</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                    <span>Rigorous Tenant Screening & Zero-Tolerance Arrears</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                    <span>Direct Access to Director Lushan Dons & Principal Jessica Gale</span>
                  </div>
                </div>

                <div className="mt-8">
                  <Link
                    href="/appraisal"
                    className="block w-full text-center py-3 text-xs font-bold uppercase tracking-wider text-knight-950 bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-300 hover:to-gold-400 rounded-xl transition-all shadow-lg"
                  >
                    Request Free Appraisal
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED PROPERTIES (For Sale & For Rent) */}
      <section className="py-16 sm:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-knight-100 text-knight-900 text-xs font-bold uppercase tracking-wider mb-2">
                <span>South-East Portfolio</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-knight-900">
                Featured Properties for Sale
              </h2>
              <p className="text-slate-600 text-sm mt-1 max-w-xl">
                Explore hand-selected residential properties represented by Dons Premier across Berwick, Clyde, Clyde North, and surrounding corridors.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/properties?status=for_sale"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-knight-900 hover:bg-knight-800 text-white text-xs font-semibold transition-colors"
              >
                <span>View All For Sale ({forSale.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Properties Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {forSale.slice(0, 3).map((property, idx) => (
              <PropertyCard key={property.id} property={property} priority={idx === 0} />
            ))}
          </div>

          {/* Rental Showcase Row */}
          {forRent.length > 0 && (
            <div className="mt-16 pt-12 border-t border-slate-200">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-gold-600">
                    Residential Leasing
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-knight-900 mt-1">
                    Featured Rental Opportunities
                  </h3>
                </div>
                <Link
                  href="/rentals"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-knight-900 hover:text-gold-700 transition-colors underline"
                >
                  <span>Browse All Rentals</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {forRent.map((rental) => (
                  <PropertyCard key={rental.id} property={rental} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 4. CORE SERVICES OVERVIEW */}
      <section className="py-16 sm:py-24 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-gold-600 text-xs font-bold uppercase tracking-widest">
              Comprehensive Real Estate Solutions
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-knight-900 mt-1.5">
              Built on Transparency, Driven by Results
            </h2>
            <p className="text-slate-600 text-sm mt-3 leading-relaxed">
              Whether you are listing a family residence, looking for an elite licensed auctioneer, or seeking a proactive asset manager, we provide uncompromising standard of service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service 1: Property Sales */}
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200/80 hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-knight-900 text-gold-400 flex items-center justify-center mb-6">
                  <Gavel className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-knight-900 mb-2">
                  Sales & Auction Strategies
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                  Led by Director Lushan Dons, our sales team crafts customized marketing campaigns with in-house auctioneering, bespoke photography, multi-channel buyer targeting, and fierce private treaty negotiation.
                </p>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0" />
                    <span>In-House Licensed Auctioneers</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0" />
                    <span>Extensive Pre-Approved Buyer Database</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0" />
                    <span>Tailored Private Treaty & Expressions of Interest</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200">
                <Link
                  href="/properties?status=for_sale"
                  className="text-xs font-bold text-knight-900 hover:text-gold-700 inline-flex items-center gap-1.5"
                >
                  <span>Explore Sales Campaigns</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Service 2: Property Management */}
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200/80 hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-knight-900 text-gold-400 flex items-center justify-center mb-6">
                  <Key className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-knight-900 mb-2">
                  Property Management & Leasing
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                  Directed by Co-Founder Jessica Gale, we manage every rental investment with owner-first diligence: rigorous tenant vetting, rapid emergency repairs, and full Victorian legislation compliance.
                </p>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0" />
                    <span>1-Business-Day Contact Guarantee</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0" />
                    <span>Routine Video & Photographic Inspections</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0" />
                    <span>Strict Arrears Management & Compliance</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200">
                <Link
                  href="/rentals"
                  className="text-xs font-bold text-knight-900 hover:text-gold-700 inline-flex items-center gap-1.5"
                >
                  <span>Discover Rental Management</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Service 3: Free Market Appraisals */}
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200/80 hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-knight-900 text-gold-400 flex items-center justify-center mb-6">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-knight-900 mb-2">
                  Free Market Appraisals
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                  Obtain an in-depth, data-backed assessment of your property&apos;s current market value in South-East Melbourne, including recent comparable sales, buyer demand trends, and optimization tips.
                </p>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0" />
                    <span>100% Free with Zero Obligation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0" />
                    <span>Comprehensive Suburb Sales Analysis</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0" />
                    <span>Tactical Advice on Staging & Timing</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200">
                <Link
                  href="/appraisal"
                  className="text-xs font-bold text-knight-900 hover:text-gold-700 inline-flex items-center gap-1.5"
                >
                  <span>Book Free Valuation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SUBURB GUIDE (Melbourne South-East Focus) */}
      <section className="py-16 sm:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-gold-600 text-xs font-bold uppercase tracking-widest">
                Local Area Expertise
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-knight-900 mt-1">
                South-East Melbourne Corridor
              </h2>
              <p className="text-slate-600 text-sm mt-1 max-w-xl">
                We live, work, and thrive in Melbourne&apos;s vibrant south-eastern communities. Explore suburb profiles and key price insights.
              </p>
            </div>
            <Link
              href="/properties"
              className="text-xs font-semibold text-knight-900 hover:text-gold-700 underline"
            >
              Explore all active suburbs
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SUBURBS_GUIDE.map((suburb) => (
              <Link
                key={suburb.slug}
                href={`/properties?suburb=${encodeURIComponent(suburb.name.split('&')[0].trim())}`}
                className="group relative rounded-2xl overflow-hidden bg-knight-900 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-end aspect-[4/5]"
              >
                <Image
                  src={suburb.image}
                  alt={suburb.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-knight-950 via-knight-950/40 to-transparent" />

                <div className="relative z-10 p-5 text-white">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-gold-400">
                    {suburb.region}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-white group-hover:text-gold-300 transition-colors">
                    {suburb.name}
                  </h3>
                  <div className="text-xs font-semibold text-gold-300 mt-1">
                    Median: {suburb.medianHousePrice}
                  </div>
                  <p className="text-[11px] text-slate-300 line-clamp-2 mt-2 leading-relaxed">
                    {suburb.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6. KEY LEADERSHIP SPOTLIGHT */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-gold-600 text-xs font-bold uppercase tracking-widest">
              Founding Leadership
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-knight-900 mt-1">
              Meet Lushan Dons & Jessica Gale
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              The visionary co-founders behind Dons Premier Estate Agents.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
            {leadership.map((leader) => (
              <div
                key={leader.id}
                className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-start hover:shadow-xl transition-all"
              >
                <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden relative shrink-0 shadow-md ring-2 ring-gold-400/40 bg-slate-200 mx-auto sm:mx-0">
                  <Image
                    src={leader.image}
                    alt={leader.name}
                    fill
                    sizes="144px"
                    className="object-cover"
                  />
                </div>

                <div className="space-y-2 text-center sm:text-left flex-grow">
                  <h3 className="font-serif text-xl font-bold text-knight-900">
                    {leader.name}
                  </h3>
                  <div className="text-xs text-gold-700 font-semibold leading-tight">
                    {leader.title}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 pt-1">
                    {leader.bio}
                  </p>

                  <div className="pt-3 flex flex-wrap gap-2 justify-center sm:justify-start">
                    <a
                      href={`tel:${leader.phone.replace(/\s+/g, '')}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-knight-900 text-white text-xs font-medium hover:bg-knight-800 transition-colors"
                    >
                      <Phone className="w-3 h-3 text-gold-400" />
                      <span>{leader.phone}</span>
                    </a>
                    <Link
                      href={`/team/${leader.slug}`}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
                    >
                      <span>Full Bio</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/team"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-knight-900 text-white text-xs font-semibold hover:bg-knight-800 transition-colors shadow-md"
            >
              <Users className="w-4 h-4 text-gold-400" />
              <span>Meet the Complete Dons Premier Team</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 7. CLIENT TESTIMONIALS & TRACK RECORD */}
      <section className="py-16 sm:py-24 bg-knight-950 text-white relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-gold-400 text-xs font-bold uppercase tracking-widest">
              Verified Client Feedback
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white mt-1">
              Words From Our Clients & Landlords
            </h2>
            <p className="text-slate-400 text-sm mt-2">
              Genuine testimonials from Melbourne South-East home sellers, purchasers, and property investors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TESTIMONIALS.map((test) => (
              <div
                key={test.id}
                className="bg-knight-900/90 backdrop-blur-md rounded-2xl p-6 border border-knight-800 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 mb-3 text-gold-400">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-gold-400 text-gold-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                    &quot;{test.content}&quot;
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-knight-800 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-white">{test.author}</div>
                    <div className="text-slate-400 text-[11px]">
                      {test.role} • {test.suburb}
                    </div>
                  </div>
                  <div className="text-[11px] text-gold-400 font-medium">{test.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. INSTANT APPRAISAL CTA SECTION */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 text-knight-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-knight-900">
                100% Free & Confidential
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-knight-950 mt-1">
                Curious What Your Property Is Worth Today?
              </h2>
              <p className="text-sm sm:text-base text-knight-900 font-medium mt-2 max-w-2xl">
                Get a strategic appraisal from senior licensed auctioneer Lushan Dons and our South-East market specialists. We provide verified sales data and strategic sale advice.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 items-center justify-center shrink-0">
              <Link
                href="/appraisal"
                className="px-8 py-4 text-sm font-bold uppercase tracking-wider text-white bg-knight-950 hover:bg-knight-900 rounded-xl shadow-xl transition-all transform hover:-translate-y-0.5"
              >
                Request Free Appraisal
              </Link>
              <a
                href="tel:0390710287"
                className="px-6 py-4 text-sm font-bold text-knight-950 bg-white/70 hover:bg-white rounded-xl border border-knight-950/20 transition-colors flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-knight-950" />
                <span>Call Sales: (03) 9071 0287</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

