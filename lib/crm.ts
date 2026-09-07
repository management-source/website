import fs from 'fs';
import path from 'path';
import {
  Property,
  PropertyStatus,
  PropertyType,
  EnquiryPayload,
  AppraisalPayload,
  CrmListing,
  CrmListingDetail,
  CrmListingFilter,
  CrmEnquiryPayload,
  CrmAppraisalPayload,
} from '@/types';

const CRM_STORAGE_FILE = path.join(process.cwd(), 'data', 'crm_listings.json');
const CRM_CONFIG_FILE = path.join(process.cwd(), 'data', 'crm_config.json');

export interface CrmConfig {
  baseUrl: string;
  agencySlug: string;
  apiKey: string;
  webhookSecret: string;
}

/**
 * Returns current CRM config, reading from data/crm_config.json with fallback to environment variables.
 */
export function getCrmConfig(): CrmConfig {
  let baseUrl = process.env.CRM_API_BASE_URL || 'https://crm.donspremier.com.au';
  let agencySlug = process.env.CRM_AGENCY_SLUG || 'dons-premier-estate-agents';
  let apiKey = process.env.CRM_API_KEY || '';
  let webhookSecret = process.env.CRM_WEBHOOK_SECRET || '';

  try {
    if (fs.existsSync(CRM_CONFIG_FILE)) {
      const content = fs.readFileSync(CRM_CONFIG_FILE, 'utf8');
      const clean = content.replace(/^\uFEFF/, '').trim();
      if (clean) {
        const data = JSON.parse(clean);
        if (data.baseUrl) baseUrl = data.baseUrl;
        if (data.agencySlug) agencySlug = data.agencySlug;
        if (data.apiKey) apiKey = data.apiKey;
        if (data.webhookSecret) webhookSecret = data.webhookSecret;
      }
    }
  } catch (err) {
    console.error('Error reading CRM config file:', err);
  }

  return {
    baseUrl: baseUrl.replace(/\/+$/, ''),
    agencySlug,
    apiKey,
    webhookSecret,
  };
}

/**
 * Save new CRM credentials to data/crm_config.json for dynamic runtime reconfiguration.
 */
export function saveCrmConfig(config: Partial<CrmConfig>): CrmConfig {
  const current = getCrmConfig();
  const updated: CrmConfig = {
    baseUrl: (config.baseUrl || current.baseUrl).replace(/\/+$/, ''),
    agencySlug: config.agencySlug || current.agencySlug,
    apiKey: config.apiKey !== undefined ? config.apiKey : current.apiKey,
    webhookSecret: config.webhookSecret !== undefined ? config.webhookSecret : current.webhookSecret,
  };

  try {
    const dir = path.dirname(CRM_CONFIG_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(CRM_CONFIG_FILE, JSON.stringify(updated, null, 2), 'utf8');
  } catch (err) {
    console.error('Error saving CRM config:', err);
  }

  return updated;
}

/**
 * Normalizes image URLs from CRM API.
 * Any relative image URL (e.g. /api/v1/public/.../files/...) is prefixed with CRM_API_BASE_URL.
 */
export function normalizeCrmImageUrl(url?: string): string {
  if (!url) {
    return 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80';
  }
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  const { baseUrl } = getCrmConfig();
  return `${baseUrl}${url.startsWith('/') ? '' : '/'}${url}`;
}

/**
 * Read local CRM storage listings (fallback / cache store).
 */
export function getLocalCrmListings(): Property[] {
  try {
    if (fs.existsSync(CRM_STORAGE_FILE)) {
      const content = fs.readFileSync(CRM_STORAGE_FILE, 'utf8');
      const clean = content.replace(/^\uFEFF/, '').trim();
      if (clean) {
        const parsed = JSON.parse(clean);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    }
  } catch (err) {
    console.error('Error reading CRM storage file:', err);
  }
  return [];
}

/**
 * Save listings directly to CRM local storage file.
 */
export function saveLocalCrmListings(listings: Property[]): boolean {
  try {
    const dir = path.dirname(CRM_STORAGE_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(CRM_STORAGE_FILE, JSON.stringify(listings, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Error writing CRM storage file:', err);
    return false;
  }
}

/**
 * Add or update a single listing in the local CRM storage.
 */
export function upsertLocalCrmListing(property: Property): Property[] {
  const current = getLocalCrmListings();
  const index = current.findIndex((p) => p.id === property.id || p.slug === property.slug);
  if (index >= 0) {
    current[index] = { ...current[index], ...property };
  } else {
    current.unshift(property);
  }
  saveLocalCrmListings(current);
  return current;
}

/**
 * Delete a listing by ID or Slug from local storage.
 */
export function deleteLocalCrmListing(identifier: string): Property[] {
  const current = getLocalCrmListings();
  const updated = current.filter((p) => p.id !== identifier && p.slug !== identifier);
  saveLocalCrmListings(updated);
  return updated;
}

/**
 * Clear all listings in local storage.
 */
export function clearAllLocalCrmListings(): boolean {
  return saveLocalCrmListings([]);
}

/**
 * Maps raw CRM listing payload into the rich application Property model.
 */
export function mapCrmListingToProperty(crm: any): Property {
  const id = String(crm.id || crm.listingNumber || `crm-${Date.now()}`);
  const title = crm.heading || crm.title || crm.address?.street || 'Exclusive Property';
  const slug = crm.slug || id;
  const street = crm.address?.street || '';
  const suburb = crm.address?.suburb || 'Berwick';
  const state = crm.address?.state || 'VIC';
  const postcode = crm.address?.postcode || '3806';
  const fullAddress =
    crm.address?.display ||
    (street ? `${street}, ${suburb} ${state} ${postcode}` : `${suburb} ${state} ${postcode}`);

  // Status mapping
  let status: PropertyStatus = 'for_sale';
  const stUpper = (crm.status || '').toUpperCase();
  if (stUpper === 'SOLD') {
    status = 'sold';
  } else if (stUpper === 'LEASED') {
    status = 'leased';
  } else if (
    stUpper === 'RENT' ||
    crm.type === 'RESIDENTIAL_RENT' ||
    (typeof crm.status === 'string' && crm.status.toLowerCase().includes('rent'))
  ) {
    status = 'for_rent';
  } else if (stUpper === 'ACTIVE' || stUpper === 'UNDER_CONTRACT' || stUpper === 'FOR_SALE') {
    status = 'for_sale';
  } else if (['for_sale', 'for_rent', 'sold', 'leased', 'commercial'].includes(crm.status)) {
    status = crm.status as PropertyStatus;
  }

  // Type mapping
  let propType: PropertyType = 'House';
  const cat = (crm.category || crm.type || '').toUpperCase();
  if (cat.includes('APARTMENT') || cat.includes('UNIT')) {
    propType = 'Apartment';
  } else if (cat.includes('TOWNHOUSE')) {
    propType = 'Townhouse';
  } else if (cat.includes('LAND') || cat.includes('VACANT_LAND') || cat.includes('ACREAGE')) {
    propType = 'Land';
  } else if (cat.includes('COMMERCIAL')) {
    propType = 'Commercial';
  } else if (crm.type && ['House', 'Townhouse', 'Apartment', 'Unit', 'Land', 'Commercial'].includes(crm.type)) {
    propType = crm.type as PropertyType;
  }

  // Photos & Images
  const images: string[] = [];
  if (crm.primaryPhoto?.url) {
    images.push(normalizeCrmImageUrl(crm.primaryPhoto.url));
  }
  if (Array.isArray(crm.photos)) {
    crm.photos.forEach((p: any) => {
      const u = normalizeCrmImageUrl(typeof p === 'string' ? p : p.url);
      if (u && !images.includes(u)) images.push(u);
    });
  }
  if (Array.isArray(crm.images)) {
    crm.images.forEach((img: string) => {
      const u = normalizeCrmImageUrl(img);
      if (u && !images.includes(u)) images.push(u);
    });
  }
  if (images.length === 0) {
    images.push('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80');
  }

  // Floorplans
  const floorplans = Array.isArray(crm.floorplans)
    ? crm.floorplans.map((f: any) => ({
      url: normalizeCrmImageUrl(typeof f === 'string' ? f : f.url),
      label: f.label || 'Floorplan',
    }))
    : [];

  // Inspections
  const inspectionTimes: string[] = [];
  if (Array.isArray(crm.inspections)) {
    crm.inspections.forEach((insp: any) => {
      try {
        const start = new Date(insp.startsAt);
        const end = new Date(insp.endsAt);
        if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
          const dateStr = start.toLocaleDateString('en-AU', { weekday: 'short', month: 'short', day: 'numeric' });
          const startStr = start.toLocaleTimeString('en-AU', { hour: 'numeric', minute: '2-digit' });
          const endStr = end.toLocaleTimeString('en-AU', { hour: 'numeric', minute: '2-digit' });
          inspectionTimes.push(`${dateStr} ${startStr} - ${endStr}`);
        } else if (insp.startsAt) {
          inspectionTimes.push(insp.startsAt);
        }
      } catch {
        if (insp.startsAt) inspectionTimes.push(insp.startsAt);
      }
    });
  } else if (Array.isArray(crm.inspectionTimes)) {
    crm.inspectionTimes.forEach((t: string) => inspectionTimes.push(t));
  }

  // Features
  const features: string[] = [];
  const groupedFeatures: any = {};
  if (crm.features && typeof crm.features === 'object' && !Array.isArray(crm.features)) {
    ['indoor', 'outdoor', 'heatingCooling', 'eco'].forEach((group) => {
      if (Array.isArray(crm.features[group])) {
        groupedFeatures[group] = crm.features[group];
        features.push(...crm.features[group]);
      }
    });
  }
  if (Array.isArray(crm.features)) {
    crm.features.forEach((f: string) => {
      if (!features.includes(f)) features.push(f);
    });
  }

  // Agents
  const rawAgents =
    Array.isArray(crm.agents) && crm.agents.length > 0
      ? crm.agents.map((a: any) => ({
        name: a.name || 'Lushan Dons',
        email: a.email || 'lushan@donspremier.com.au',
        phone: a.phone || '0401 849 767',
        role: a.role || 'Licensed Estate Agent & Director',
        image: a.image ? normalizeCrmImageUrl(a.image) : '/images/team/lushan-dons.jpg',
      }))
      : [
        {
          name: crm.agent?.name || 'Lushan Dons',
          email: crm.agent?.email || 'lushan@donspremier.com.au',
          phone: crm.agent?.phone || '0401 849 767',
          role: crm.agent?.role || 'Licensed Estate Agent & Director',
          image: crm.agent?.image ? normalizeCrmImageUrl(crm.agent.image) : '/images/team/lushan-dons.jpg',
        },
      ];

  return {
    id,
    slug,
    title,
    price:
      crm.price?.display ||
      (crm.price && typeof crm.price === 'string' ? crm.price : 'Contact Agent'),
    priceNumeric:
      typeof crm.priceNumeric === 'number'
        ? crm.priceNumeric
        : typeof crm.price === 'number'
          ? crm.price
          : undefined,
    status,
    type: propType,
    bedrooms: Number(crm.specifications?.bedrooms ?? crm.bedrooms ?? 0),
    bathrooms: Number(crm.specifications?.bathrooms ?? crm.bathrooms ?? 0),
    carSpaces: Number(crm.specifications?.carSpaces ?? crm.carSpaces ?? 0),
    landSize: crm.specifications?.landArea
      ? `${crm.specifications.landArea} ${crm.specifications.landAreaUnit || 'sqm'}`
      : crm.landSize,
    address: {
      street,
      suburb,
      state,
      postcode,
      fullAddress,
    },
    headline: crm.heading || crm.headline || title,
    description:
      crm.description || crm.shortDescription || 'Contact Dons Premier Estate Agents for full details.',
    features: features.length > 0 ? features : ['Modern Layout', 'Heating & Cooling', 'Prime Location'],
    images,
    inspectionTimes,
    agent: rawAgents[0],
    featured: Boolean(crm.featured),
    floorplans,
    groupedFeatures,
    inspectionsDetailed: Array.isArray(crm.inspections) ? crm.inspections : undefined,
    agents: rawAgents,
    videoUrl: crm.videoUrl,
    newConstruction: Boolean(crm.newConstruction),
    houseAndLand: Boolean(crm.houseAndLand),
    yearBuilt: crm.yearBuilt,
  };
}

/**
 * Fetch properties from Premier Hub CRM API:
 * GET ${CRM_API_BASE_URL}/api/v1/public/${CRM_AGENCY_SLUG}/listings
 */
export async function fetchCrmListings(
  filters?: CrmListingFilter
): Promise<{ listings: Property[]; total: number; page: number; totalPages: number }> {
  const { baseUrl: CRM_API_BASE_URL, agencySlug: CRM_AGENCY_SLUG, apiKey: CRM_API_KEY } = getCrmConfig();
  const isKeyConfigured = Boolean(CRM_API_KEY && !CRM_API_KEY.includes('your_api_key'));

  if (isKeyConfigured) {
    try {
      const query = new URLSearchParams();
      if (filters?.status) query.set('status', filters.status);
      if (filters?.category) query.set('category', filters.category);
      if (filters?.type) query.set('type', filters.type);
      if (filters?.suburb) query.set('suburb', filters.suburb);
      if (filters?.bedrooms !== undefined) query.set('bedrooms', String(filters.bedrooms));
      if (filters?.bathrooms !== undefined) query.set('bathrooms', String(filters.bathrooms));
      if (filters?.minPrice !== undefined) query.set('minPrice', String(filters.minPrice));
      if (filters?.maxPrice !== undefined) query.set('maxPrice', String(filters.maxPrice));
      if (filters?.page !== undefined) query.set('page', String(filters.page));
      if (filters?.limit !== undefined) query.set('limit', String(filters.limit));

      const endpoint = `${CRM_API_BASE_URL}/api/v1/public/${CRM_AGENCY_SLUG}/listings${query.toString() ? `?${query.toString()}` : ''
        }`;

      const res = await fetch(endpoint, {
        headers: {
          Authorization: `Bearer ${CRM_API_KEY}`,
          Accept: 'application/json',
        },
        next: { revalidate: 60 },
      });

      if (res.ok) {
        const json = await res.json();
        const rawListings: any[] = Array.isArray(json.data)
          ? json.data
          : Array.isArray(json.listings)
            ? json.listings
            : Array.isArray(json)
              ? json
              : [];

        const mapped = rawListings.map(mapCrmListingToProperty);
        return {
          listings: mapped,
          total: json.pagination?.total ?? mapped.length,
          page: json.pagination?.page ?? 1,
          totalPages: json.pagination?.totalPages ?? 1,
        };
      } else {
        console.warn(`CRM API listings fetch returned status ${res.status}`);
      }
    } catch (err) {
      console.warn('CRM API unreachable, using local storage fallback:', err);
    }
  }

  // Fallback to local storage
  const localListings = getLocalCrmListings();
  return {
    listings: localListings,
    total: localListings.length,
    page: 1,
    totalPages: 1,
  };
}

/**
 * Fetch a single property listing profile from Premier Hub CRM API:
 * GET ${CRM_API_BASE_URL}/api/v1/public/${CRM_AGENCY_SLUG}/listings/${listingId}
 */
export async function fetchCrmListingById(listingId: string): Promise<Property | null> {
  const { baseUrl: CRM_API_BASE_URL, agencySlug: CRM_AGENCY_SLUG, apiKey: CRM_API_KEY } = getCrmConfig();
  const isKeyConfigured = Boolean(CRM_API_KEY && !CRM_API_KEY.includes('your_api_key'));

  if (isKeyConfigured && listingId) {
    try {
      const endpoint = `${CRM_API_BASE_URL}/api/v1/public/${CRM_AGENCY_SLUG}/listings/${encodeURIComponent(listingId)}`;
      const res = await fetch(endpoint, {
        headers: {
          Authorization: `Bearer ${CRM_API_KEY}`,
          Accept: 'application/json',
        },
        next: { revalidate: 60 },
      });

      if (res.ok) {
        const json = await res.json();
        const raw = json.data || json.listing || json;
        if (raw && (raw.id || raw.heading)) {
          return mapCrmListingToProperty(raw);
        }
      }
    } catch (err) {
      console.warn(`CRM API listing profile fetch failed for ID '${listingId}':`, err);
    }
  }

  // Fallback to local storage lookup
  const localListings = getLocalCrmListings();
  const match = localListings.find((p) => p.id === listingId || p.slug === listingId);
  return match || null;
}

/**
 * General getProperties helper used across the application components.
 * Supports status, suburb, type, bedrooms, searchTerm, and inspections.
 */
export async function getProperties(filters?: {
  status?: PropertyStatus | 'all' | 'leased';
  suburb?: string;
  type?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  searchTerm?: string;
  inspections?: boolean;
}): Promise<Property[]> {
  // Convert friendly status/type to CRM filters
  let crmStatus: string | undefined;
  if (filters?.status === 'for_sale') crmStatus = 'ACTIVE';
  else if (filters?.status === 'sold') crmStatus = 'SOLD';

  let crmCategory: string | undefined;
  let crmType: string | undefined;
  if (filters?.type) {
    const t = filters.type.toUpperCase();
    if (t.includes('LAND')) {
      crmCategory = 'VACANT_LAND';
      crmType = 'RESIDENTIAL_LAND';
    } else if (t.includes('HOUSE')) {
      crmCategory = 'HOUSE';
    } else if (t.includes('TOWNHOUSE')) {
      crmCategory = 'TOWNHOUSE';
    } else if (t.includes('APARTMENT')) {
      crmCategory = 'APARTMENT';
    }
  }

  const { listings } = await fetchCrmListings({
    status: crmStatus,
    category: crmCategory,
    type: crmType,
    suburb: filters?.suburb,
    bedrooms: filters?.bedrooms,
    minPrice: filters?.minPrice,
    maxPrice: filters?.maxPrice,
  });

  let result = [...listings];

  // Client-side / filter layer refinement
  if (filters?.status && filters.status !== 'all') {
    result = result.filter((p) => p.status === filters.status);
  }

  if (filters?.suburb) {
    const s = filters.suburb.toLowerCase();
    result = result.filter((p) => p.address?.suburb?.toLowerCase().includes(s));
  }

  if (filters?.type && filters.type !== 'All Types') {
    const t = filters.type.toLowerCase();
    result = result.filter((p) => {
      if (t === 'residential') {
        return ['house', 'townhouse', 'apartment', 'villa', 'unit'].includes(p.type.toLowerCase());
      }
      return p.type.toLowerCase() === t;
    });
  }

  if (filters?.bedrooms) {
    result = result.filter((p) => (p.bedrooms || 0) >= (filters.bedrooms || 0));
  }

  if (filters?.inspections) {
    result = result.filter(
      (p) => Array.isArray(p.inspectionTimes) && p.inspectionTimes.length > 0
    );
  }

  if (filters?.searchTerm) {
    const term = filters.searchTerm.toLowerCase();
    result = result.filter(
      (p) =>
        p.title?.toLowerCase().includes(term) ||
        p.address?.fullAddress?.toLowerCase().includes(term) ||
        p.address?.suburb?.toLowerCase().includes(term) ||
        p.headline?.toLowerCase().includes(term)
    );
  }

  return result;
}

/**
 * Fetch a single property by slug or ID.
 */
export async function getPropertyBySlug(slugOrId: string): Promise<Property | null> {
  const direct = await fetchCrmListingById(slugOrId);
  if (direct) return direct;

  const all = await getProperties();
  return all.find((p) => p.slug === slugOrId || p.id === slugOrId) || null;
}

/**
 * Submit Visitor Property Inquiry & Inspection Booking to CRM:
 * POST ${CRM_API_BASE_URL}/api/v1/public/${CRM_AGENCY_SLUG}/enquiries
 * Headers: { "Content-Type": "application/json", "Authorization": "Bearer ${CRM_API_KEY}" }
 * Payload: { name, email, phone, message, listingId, enquiryType }
 */
export async function submitCrmEnquiry(payload: CrmEnquiryPayload): Promise<{
  success: boolean;
  mode: 'crm' | 'local';
  message?: string;
  data?: any;
}> {
  const { baseUrl: CRM_API_BASE_URL, agencySlug: CRM_AGENCY_SLUG, apiKey: CRM_API_KEY } = getCrmConfig();
  const isKeyConfigured = Boolean(CRM_API_KEY && !CRM_API_KEY.includes('your_api_key'));

  if (isKeyConfigured) {
    try {
      const endpoint = `${CRM_API_BASE_URL}/api/v1/public/${CRM_AGENCY_SLUG}/enquiries`;
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${CRM_API_KEY}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: payload.name,
          email: payload.email,
          phone: payload.phone,
          message: payload.message,
          listingId: payload.listingId || '',
          enquiryType: payload.enquiryType || 'GENERAL',
        }),
      });

      if (res.ok) {
        const data = await res.json();
        return { success: true, mode: 'crm', data };
      } else {
        const errText = await res.text();
        console.warn(`CRM API enquiry returned status ${res.status}: ${errText}`);
      }
    } catch (err) {
      console.error('Error forwarding enquiry to CRM API:', err);
    }
  }

  // Graceful local handling
  console.log('CRM Enquiry Logged (Local Fallback):', payload);
  return {
    success: true,
    mode: 'local',
    message:
      'Thank you. Your enquiry has been received by Dons Premier Estate Agents. We guarantee to respond within one business day.',
  };
}

/**
 * Submit Homeowner Valuation & Appraisal Request to CRM:
 * POST ${CRM_API_BASE_URL}/api/v1/public/${CRM_AGENCY_SLUG}/appraisals
 * Headers: { "Content-Type": "application/json", "Authorization": "Bearer ${CRM_API_KEY}" }
 * Payload: { ownerName, email, phone, propertyAddress, propertyType, bedrooms, bathrooms, comments }
 */
export async function submitCrmAppraisal(payload: CrmAppraisalPayload): Promise<{
  success: boolean;
  mode: 'crm' | 'local';
  message?: string;
  data?: any;
}> {
  const { baseUrl: CRM_API_BASE_URL, agencySlug: CRM_AGENCY_SLUG, apiKey: CRM_API_KEY } = getCrmConfig();
  const isKeyConfigured = Boolean(CRM_API_KEY && !CRM_API_KEY.includes('your_api_key'));

  if (isKeyConfigured) {
    try {
      const endpoint = `${CRM_API_BASE_URL}/api/v1/public/${CRM_AGENCY_SLUG}/appraisals`;
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${CRM_API_KEY}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          ownerName: payload.ownerName,
          email: payload.email,
          phone: payload.phone,
          propertyAddress: payload.propertyAddress,
          propertyType: payload.propertyType || 'House',
          bedrooms: Number(payload.bedrooms) || 0,
          bathrooms: Number(payload.bathrooms) || 0,
          comments: payload.comments || '',
        }),
      });

      if (res.ok) {
        const data = await res.json();
        return { success: true, mode: 'crm', data };
      } else {
        const errText = await res.text();
        console.warn(`CRM API appraisal returned status ${res.status}: ${errText}`);
      }
    } catch (err) {
      console.error('Error forwarding appraisal to CRM API:', err);
    }
  }

  // Graceful local handling
  console.log('CRM Appraisal Logged (Local Fallback):', payload);
  return {
    success: true,
    mode: 'local',
    message:
      'Thank you! Director Lushan Dons or one of our senior licensed sales consultants will be in touch with your comprehensive property valuation.',
  };
}

// Backward compatibility wrappers for existing routes
export async function submitEnquiryToCRM(payload: EnquiryPayload) {
  const enquiryType: CrmEnquiryPayload['enquiryType'] =
    payload.enquiryType ||
    (payload.type === 'inspection_booking' ? 'INSPECTION' : 'GENERAL');

  return submitCrmEnquiry({
    name: payload.name,
    email: payload.email,
    phone: payload.phone,
    message: payload.message,
    listingId: payload.listingId || payload.propertyId || '',
    enquiryType,
  });
}

export async function submitAppraisalToCRM(payload: AppraisalPayload) {
  return submitCrmAppraisal({
    ownerName: payload.ownerName || payload.name,
    email: payload.email,
    phone: payload.phone,
    propertyAddress: payload.propertyAddress || payload.address || `${payload.suburb || ''}`,
    propertyType: payload.propertyType || 'House',
    bedrooms: Number(payload.bedrooms) || 0,
    bathrooms: Number(payload.bathrooms) || 0,
    comments: payload.comments || payload.additionalDetails || payload.timeframe || '',
  });
}
