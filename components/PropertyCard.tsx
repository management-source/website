import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Bed, Bath, Car, Maximize2, Calendar, MapPin, ArrowUpRight } from 'lucide-react';
import { Property } from '@/types';

interface PropertyCardProps {
  property: Property;
  priority?: boolean;
}

export default function PropertyCard({ property, priority = false }: PropertyCardProps) {
  const getBadgeDetails = (status: Property['status']) => {
    switch (status) {
      case 'for_sale':
        return { label: 'For Sale', bg: 'bg-emerald-600 text-white' };
      case 'for_rent':
        return { label: 'For Lease', bg: 'bg-blue-600 text-white' };
      case 'sold':
        return { label: 'Sold Record', bg: 'bg-red-600 text-white' };
      case 'leased':
        return { label: 'Leased', bg: 'bg-indigo-600 text-white' };
      case 'commercial':
        return { label: 'Commercial', bg: 'bg-amber-600 text-white' };
      default:
        return { label: 'Property', bg: 'bg-slate-700 text-white' };
    }
  };

  const badge = getBadgeDetails(property.status);

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-slate-100 flex flex-col h-full transform hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
        <Image
          src={property.images[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80'}
          alt={property.title}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Status Badge */}
        <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider shadow-md ${badge.bg}`}>
            {badge.label}
          </span>
          {property.type && (
            <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-black/60 backdrop-blur-md text-white">
              {property.type}
            </span>
          )}
        </div>

        {/* Inspection Time or Tag on Image */}
        {property.inspectionTimes && property.inspectionTimes.length > 0 && (
          <div className="absolute bottom-3 left-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/75 backdrop-blur-md text-white text-xs">
            <Calendar className="w-3.5 h-3.5 text-gold-400 shrink-0" />
            <span className="truncate font-medium">Insp: {property.inspectionTimes[0]}</span>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-5 flex flex-col flex-grow justify-between">
        <div>
          {/* Price */}
          <div className="flex items-baseline justify-between mb-1.5">
            <span className="text-xl font-bold text-knight-900 font-serif tracking-tight">
              {property.price}
            </span>
          </div>

          {/* Title / Headline */}
          <Link href={`/properties/${property.slug}`}>
            <h3 className="font-semibold text-slate-900 group-hover:text-gold-700 transition-colors line-clamp-1 text-base">
              {property.title}
            </h3>
          </Link>

          {/* Address */}
          <div className="flex items-center gap-1 text-slate-500 text-xs mt-1.5 mb-4">
            <MapPin className="w-3.5 h-3.5 text-gold-600 shrink-0" />
            <span className="truncate">{property.address.fullAddress}</span>
          </div>
        </div>

        <div>
          {/* Property Specifications */}
          <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-slate-700 text-xs mb-4">
            <div className="flex items-center gap-1.5 font-medium" title="Bedrooms">
              <Bed className="w-4 h-4 text-knight-700" />
              <span>{property.bedrooms} Beds</span>
            </div>
            <div className="flex items-center gap-1.5 font-medium" title="Bathrooms">
              <Bath className="w-4 h-4 text-knight-700" />
              <span>{property.bathrooms} Baths</span>
            </div>
            <div className="flex items-center gap-1.5 font-medium" title="Car Spaces">
              <Car className="w-4 h-4 text-knight-700" />
              <span>{property.carSpaces} Cars</span>
            </div>
            {property.landSize && (
              <div className="flex items-center gap-1 font-medium text-slate-500" title="Land Size">
                <Maximize2 className="w-3.5 h-3.5 text-slate-400" />
                <span>{property.landSize}</span>
              </div>
            )}
          </div>

          {/* Agent Footnote & Action */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full overflow-hidden relative ring-1 ring-gold-400/50 bg-slate-200">
                <Image
                  src={property.agent.image}
                  alt={property.agent.name}
                  fill
                  sizes="28px"
                  className="object-cover"
                />
              </div>
              <span className="font-medium text-slate-700">{property.agent.name}</span>
            </div>

            <Link
              href={`/properties/${property.slug}`}
              className="inline-flex items-center gap-1 text-xs font-semibold text-knight-900 group-hover:text-gold-700 transition-colors"
            >
              <span>View Details</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

