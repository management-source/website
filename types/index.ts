export type PropertyStatus = 'for_sale' | 'for_rent' | 'sold' | 'leased' | 'commercial';

export type PropertyType = 'House' | 'Townhouse' | 'Apartment' | 'Unit' | 'Land' | 'Commercial';

export interface Property {
  id: string;
  slug: string;
  title: string;
  price: string;
  priceNumeric?: number;
  status: PropertyStatus;
  type: PropertyType;
  bedrooms: number;
  bathrooms: number;
  carSpaces: number;
  landSize?: string;
  address: {
    street: string;
    suburb: string;
    state: string;
    postcode: string;
    fullAddress: string;
  };
  headline: string;
  description: string;
  features: string[];
  images: string[];
  inspectionTimes?: string[];
  auctionDate?: string;
  agent: {
    name: string;
    role: string;
    phone: string;
    email: string;
    image: string;
  };
  featured?: boolean;
  // Extended CRM Fields
  floorplans?: { url: string; label?: string }[];
  photos?: { url: string; label?: string; position?: number }[];
  groupedFeatures?: {
    indoor?: string[];
    outdoor?: string[];
    heatingCooling?: string[];
    eco?: string[];
  };
  inspectionsDetailed?: {
    id?: string;
    startsAt: string;
    endsAt: string;
  }[];
  agents?: {
    name: string;
    email: string;
    phone: string;
    role?: string;
    image?: string;
  }[];
  videoUrl?: string;
  newConstruction?: boolean;
  houseAndLand?: boolean;
  yearBuilt?: number | string;
}

export interface TeamMember {
  id: string;
  slug: string;
  name: string;
  title: string;
  phone: string;
  email: string;
  image: string;
  bio: string;
  motto?: string;
  specialties: string[];
}

export interface OfficeLocation {
  id: string;
  name: string;
  type: 'Head Office' | 'Branch';
  address: string;
  suburb: string;
  state: string;
  postcode: string;
  phone: string;
  email: string;
  hours: string;
  lat?: number;
  lng?: number;
}

export interface Testimonial {
  id: string;
  author: string;
  role: 'Vendor' | 'Buyer' | 'Landlord' | 'Tenant';
  suburb: string;
  rating: number;
  content: string;
  agentMentioned?: string;
  date: string;
}

export interface SuburbGuide {
  name: string;
  slug: string;
  region: string;
  description: string;
  medianHousePrice: string;
  highlights: string[];
  image: string;
}

export interface EnquiryPayload {
  name: string;
  email: string;
  phone: string;
  propertyId?: string;
  propertyAddress?: string;
  type?: 'general' | 'sales' | 'rentals' | 'inspection_booking';
  message: string;
  enquiryType?: 'INSPECTION' | 'GENERAL' | 'OFFER' | 'APPRAISAL';
  listingId?: string;
}

export interface AppraisalPayload {
  name: string;
  email: string;
  phone: string;
  address: string;
  suburb: string;
  propertyType: string;
  bedrooms: string | number;
  bathrooms: string | number;
  timeframe?: string;
  additionalDetails?: string;
  ownerName?: string;
  propertyAddress?: string;
  comments?: string;
}

// CRM Live API Schema Types
export type CrmListingStatus = 'ACTIVE' | 'UNDER_CONTRACT' | 'SOLD';
export type CrmListingCategory = 'HOUSE' | 'APARTMENT' | 'TOWNHOUSE' | 'VILLA' | 'DUPLEX' | 'VACANT_LAND' | 'ACREAGE';
export type CrmListingType = 'RESIDENTIAL_SALE' | 'RESIDENTIAL_LAND';

export interface CrmListingFilter {
  status?: CrmListingStatus | string;
  category?: CrmListingCategory | string;
  type?: CrmListingType | string;
  suburb?: string;
  bedrooms?: number;
  bathrooms?: number;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
}

export interface CrmListing {
  id: string;
  listingNumber?: string;
  heading?: string;
  shortDescription?: string;
  address?: {
    street?: string;
    suburb?: string;
    state?: string;
    postcode?: string;
    display?: string;
  };
  price?: {
    display?: string;
    underOffer?: boolean;
  };
  specifications?: {
    bedrooms?: number;
    bathrooms?: number;
    carSpaces?: number;
    buildingSizeSqm?: number;
    landArea?: number | string;
    landAreaUnit?: string;
  };
  primaryPhoto?: {
    url?: string;
    label?: string;
  };
  updatedAt?: string;
}

export interface CrmListingDetail extends CrmListing {
  description?: string;
  newConstruction?: boolean;
  houseAndLand?: boolean;
  yearBuilt?: number | string;
  videoUrl?: string;
  photos?: {
    url: string;
    label?: string;
    position?: number;
  }[];
  floorplans?: {
    url: string;
    label?: string;
  }[];
  features?: {
    indoor?: string[];
    outdoor?: string[];
    heatingCooling?: string[];
    eco?: string[];
  };
  inspections?: {
    id?: string;
    startsAt: string;
    endsAt: string;
  }[];
  agents?: {
    name: string;
    email: string;
    phone: string;
    role?: string;
    image?: string;
  }[];
}

export interface CrmEnquiryPayload {
  name: string;
  email: string;
  phone: string;
  message: string;
  listingId: string;
  enquiryType: 'INSPECTION' | 'GENERAL' | 'OFFER' | 'APPRAISAL';
}

export interface CrmAppraisalPayload {
  ownerName: string;
  email: string;
  phone: string;
  propertyAddress: string;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  comments: string;
}

export interface CrmWebhookPayload {
  action: 'listing.published' | 'listing.sold' | 'sync.all';
  listingId?: string;
  timestamp: string;
}


