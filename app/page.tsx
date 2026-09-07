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
import SolutionsSection from '@/components/SolutionsSection';
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
        {/* Background Visual Walkthrough Video */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=85"
            className="w-full h-full object-cover opacity-45 scale-105 filter brightness-95"
          >
            <source src="/videos/hero-walkthrough.webm" type="video/webm" />
            <source src="https://upload.wikimedia.org/wikipedia/commons/transcoded/f/fa/UE4Arch.com_-_Viennese_apartment.webm/UE4Arch.com_-_Viennese_apartment.webm.720p.vp9.webm" type="video/webm" />
          </video>
          {/* Elegant Cinematic Gradient for High Contrast & Legibility (Dot overlay removed) */}
          <div className="absolute inset-0 bg-gradient-to-t from-knight-950 via-knight-950/65 to-knight-900/40" />
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

      {/* 2. COMPREHENSIVE REAL ESTATE SOLUTIONS (Moved to slot 2 with scroll animations) */}
      <SolutionsSection />

      {/* 3. FEATURED PROPERTIES (For Sale & For Rent) */}
      <section className="py-16 sm:py-24 bg-white border-t border-neutral-100">
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

          {/* Properties Grid or Elegant Off-Market / CRM Empty State */}
          {forSale.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {forSale.slice(0, 3).map((property, idx) => (
                <PropertyCard key={property.id} property={property} priority={idx === 0} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-gold-200/80 bg-gradient-to-br from-knight-950 via-knight-900 to-knight-950 p-8 sm:p-12 text-center text-white relative overflow-hidden shadow-xl">
              <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="max-w-2xl mx-auto space-y-4 relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-gold-400/20 text-gold-400 border border-gold-400/30 flex items-center justify-center mx-auto text-2xl">
                  ♞
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                  Exclusive & Upcoming Listings Coming Soon
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  We are currently synchronizing our live property portfolio directly with our Premier Hub CRM. We have pre-market and off-market opportunities available across Berwick, Clyde, and Narre Warren.
                </p>
                <div className="pt-4 flex flex-wrap justify-center gap-4">
                  <Link
                    href="/appraisal"
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-300 hover:to-gold-400 text-knight-950 font-bold text-xs uppercase tracking-wider shadow-lg transition-all"
                  >
                    Request Free Appraisal
                  </Link>
                  <a
                    href="tel:0401849767"
                    className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-all flex items-center gap-2"
                  >
                    <Phone className="w-3.5 h-3.5 text-gold-400" />
                    <span>Call Director Lushan Dons</span>
                  </a>
                </div>
              </div>
            </div>
          )}

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

      {/* 5. SUBURB GUIDE (Melbourne South-East Focus) */}
      <section className="py-16 sm:py-24 bg-white border-t border-neutral-100">
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
                className="bg-white rounded-2xl overflow-hidden border border-neutral-200 shadow-sm p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-start hover:shadow-xl transition-all"
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

