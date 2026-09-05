import React from 'react';
import Link from 'next/link';
import { Search, Filter, SlidersHorizontal, MapPin, Home, ArrowLeft } from 'lucide-react';
import PropertyCard from '@/components/PropertyCard';
import { getProperties } from '@/lib/crm';
import { PropertyStatus } from '@/types';

export const revalidate = 60;

interface PageProps {
  searchParams: Promise<{
    status?: string;
    suburb?: string;
    type?: string;
    bedrooms?: string;
    search?: string;
  }>;
}

export default async function PropertiesPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const status = (resolvedParams.status as PropertyStatus | 'all') || 'all';
  const suburb = resolvedParams.suburb || '';
  const type = resolvedParams.type || '';
  const bedrooms = resolvedParams.bedrooms ? Number(resolvedParams.bedrooms) : undefined;
  const searchTerm = resolvedParams.search || '';

  const properties = await getProperties({
    status: status === 'all' ? undefined : status,
    suburb: suburb || undefined,
    type: type || undefined,
    bedrooms,
    searchTerm: searchTerm || undefined,
  });

  const getPageTitle = () => {
    if (status === 'for_sale') return 'Residential Properties for Sale';
    if (status === 'for_rent') return 'Properties for Rent / Lease';
    if (status === 'sold') return 'Recently Sold Properties';
    if (suburb) return `Properties in ${suburb}`;
    return 'Property Portfolio';
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
            <Link href="/" className="hover:text-knight-900 transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-knight-900 font-medium">Properties</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-gold-600">
                Melbourne South-East Real Estate
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-knight-900 mt-1">
                {getPageTitle()}
              </h1>
              <p className="text-slate-600 text-sm mt-1">
                Showing {properties.length} {properties.length === 1 ? 'property' : 'properties'} matching your criteria
              </p>
            </div>

            <Link
              href="/appraisal"
              className="inline-flex items-center justify-center px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-knight-950 bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-300 hover:to-gold-400 rounded-xl shadow-md transition-all self-start md:self-auto"
            >
              Request Free Appraisal
            </Link>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 sm:p-6 mb-10">
          <form method="GET" action="/properties" className="space-y-4">
            {/* Status Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
              {[
                { label: 'All Properties', val: 'all' },
                { label: 'For Sale', val: 'for_sale' },
                { label: 'For Rent', val: 'for_rent' },
                { label: 'Recently Sold', val: 'sold' },
              ].map((pill) => {
                const isActive = (status || 'all') === pill.val;
                return (
                  <label
                    key={pill.val}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer whitespace-nowrap transition-all ${isActive
                        ? 'bg-knight-900 text-white shadow-md'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                  >
                    <input
                      type="radio"
                      name="status"
                      value={pill.val}
                      defaultChecked={isActive}
                      className="hidden"
                      onChange={(e) => e.target.form?.submit()}
                    />
                    <span>{pill.label}</span>
                  </label>
                );
              })}
            </div>

            {/* Filter Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 border-t border-slate-100 items-center">
              {/* Search text */}
              <div className="relative">
                <input
                  type="text"
                  name="search"
                  defaultValue={searchTerm}
                  placeholder="Street, address, keywords..."
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-gold-500 focus:outline-none bg-slate-50"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              </div>

              {/* Suburb */}
              <div className="relative">
                <input
                  type="text"
                  name="suburb"
                  defaultValue={suburb}
                  placeholder="Filter by suburb (e.g. Berwick, Clyde)..."
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-gold-500 focus:outline-none bg-slate-50"
                />
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              </div>

              {/* Property Type */}
              <div>
                <select
                  name="type"
                  defaultValue={type}
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-gold-500 focus:outline-none bg-slate-50"
                >
                  <option value="">All Types</option>
                  <option value="House">House</option>
                  <option value="Townhouse">Townhouse</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Land">Land</option>
                </select>
              </div>

              {/* Apply / Reset */}
              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-knight-950 bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-300 hover:to-gold-400 rounded-xl shadow transition-colors text-center"
                >
                  Filter
                </button>
                {(suburb || type || bedrooms || searchTerm || (status && status !== 'all')) && (
                  <Link
                    href="/properties"
                    className="px-3 py-2 text-xs text-slate-600 hover:text-knight-900 border border-slate-200 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors"
                  >
                    Reset
                  </Link>
                )}
              </div>
            </div>
          </form>
        </div>

        {/* Results Grid */}
        {properties.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 max-w-lg mx-auto">
            <Home className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="font-serif text-lg font-bold text-knight-900">No properties found</h3>
            <p className="text-xs text-slate-500 mt-1">
              Try adjusting your suburb search, property type, or view all listings.
            </p>
            <Link
              href="/properties"
              className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-knight-900 text-white text-xs font-semibold hover:bg-knight-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Reset all filters</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((prop, idx) => (
              <PropertyCard key={prop.id} property={prop} priority={idx < 3} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

