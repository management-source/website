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
  type: 'general' | 'sales' | 'rentals' | 'inspection_booking';
  message: string;
}

export interface AppraisalPayload {
  name: string;
  email: string;
  phone: string;
  address: string;
  suburb: string;
  propertyType: string;
  bedrooms: string;
  bathrooms: string;
  timeframe: string;
  additionalDetails?: string;
}

