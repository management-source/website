import fs from 'fs';
import path from 'path';
import { Property, PropertyStatus, EnquiryPayload, AppraisalPayload } from '@/types';

const CRM_API_BASE_URL = process.env.CRM_API_BASE_URL || '';
const CRM_API_KEY = process.env.CRM_API_KEY || '';
const CRM_AGENCY_SLUG = process.env.CRM_AGENCY_SLUG || 'dons-premier';

const CRM_STORAGE_FILE = path.join(process.cwd(), 'data', 'crm_listings.json');

/**
 * Read local CRM-pushed listings from storage.
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
 * Save listings directly to CRM storage file.
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
 * Delete a listing by ID or Slug.
 */
export function deleteLocalCrmListing(identifier: string): Property[] {
  const current = getLocalCrmListings();
  const updated = current.filter((p) => p.id !== identifier && p.slug !== identifier);
  saveLocalCrmListings(updated);
  return updated;
}

/**
 * Clear all listings.
 */
export function clearAllLocalCrmListings(): boolean {
  return saveLocalCrmListings([]);
}

interface PropertyFilters {
  status?: PropertyStatus | 'all' | 'leased';
  suburb?: string;
  type?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  searchTerm?: string;
  inspections?: boolean;
}

/**
 * Fetch live properties either from Premier Hub CRM API or from local CRM storage.
 * NOTE: Dummy placeholder listings have been completely eliminated.
 */
export async function getProperties(filters?: PropertyFilters): Promise<Property[]> {
  let properties: Property[] = [];

  // 1. If live CRM credentials exist, fetch from remote CRM REST API
  if (CRM_API_BASE_URL && CRM_API_KEY && !CRM_API_KEY.includes('secret_key')) {
    try {
      const query = new URLSearchParams({
        agency: CRM_AGENCY_SLUG,
        ...(filters?.status && filters.status !== 'all' ? { status: filters.status } : {}),
        ...(filters?.suburb ? { suburb: filters.suburb } : {}),
        ...(filters?.type ? { type: filters.type } : {}),
        ...(filters?.bedrooms ? { bedrooms: String(filters.bedrooms) } : {}),
      });

      const res = await fetch(`${CRM_API_BASE_URL}/properties?${query.toString()}`, {
        headers: {
          Authorization: `Bearer ${CRM_API_KEY}`,
          Accept: 'application/json',
        },
        next: { revalidate: 60 },
      });

      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.properties)) {
          properties = data.properties;
        }
      }
    } catch (err) {
      console.warn('CRM API unreachable, falling back to local CRM store:', err);
    }
  }

  // 2. If remote returned empty or wasn't configured, read from local CRM storage
  if (properties.length === 0) {
    properties = getLocalCrmListings();
  }

  // 3. Apply requested filters
  let result = [...properties];

  if (filters?.status && filters.status !== 'all') {
    result = result.filter((p) => p.status === filters.status);
  }

  if (filters?.suburb) {
    const s = filters.suburb.toLowerCase();
    result = result.filter((p) => p.address?.suburb?.toLowerCase().includes(s));
  }

  if (filters?.type && filters.type !== 'All Types') {
    const t = filters.type.toLowerCase();
    result = result.filter((p) => p.type?.toLowerCase() === t);
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
 * Fetch a single property by its slug from CRM.
 */
export async function getPropertyBySlug(slug: string): Promise<Property | null> {
  if (CRM_API_BASE_URL && CRM_API_KEY && !CRM_API_KEY.includes('secret_key')) {
    try {
      const res = await fetch(`${CRM_API_BASE_URL}/properties/${slug}?agency=${CRM_AGENCY_SLUG}`, {
        headers: {
          Authorization: `Bearer ${CRM_API_KEY}`,
          Accept: 'application/json',
        },
        next: { revalidate: 60 },
      });

      if (res.ok) {
        const data = await res.json();
        if (data.property) return data.property;
      }
    } catch (err) {
      console.warn(`CRM API fetch failed for slug ${slug}, using local store:`, err);
    }
  }

  const localListings = getLocalCrmListings();
  return localListings.find((p) => p.slug === slug) || null;
}

/**
 * Submit client enquiry to CRM.
 */
export async function submitEnquiryToCRM(payload: EnquiryPayload) {
  if (CRM_API_BASE_URL && CRM_API_KEY && !CRM_API_KEY.includes('secret_key')) {
    try {
      const res = await fetch(`${CRM_API_BASE_URL}/enquiries`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${CRM_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...payload,
          agencySlug: CRM_AGENCY_SLUG,
          timestamp: new Date().toISOString(),
        }),
      });

      if (res.ok) {
        return { success: true, mode: 'crm', data: await res.json() };
      }
    } catch (err) {
      console.error('Error forwarding enquiry to CRM API:', err);
    }
  }

  console.log('CRM Enquiry Logged (Local Delivery):', payload);
  return {
    success: true,
    mode: 'local',
    message: 'Thank you. Your enquiry has been received by Dons Premier Estate Agents. We guarantee to respond within one business day.',
  };
}

/**
 * Submit property market appraisal request to CRM.
 */
export async function submitAppraisalToCRM(payload: AppraisalPayload) {
  if (CRM_API_BASE_URL && CRM_API_KEY && !CRM_API_KEY.includes('secret_key')) {
    try {
      const res = await fetch(`${CRM_API_BASE_URL}/appraisals`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${CRM_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...payload,
          agencySlug: CRM_AGENCY_SLUG,
          submittedAt: new Date().toISOString(),
        }),
      });

      if (res.ok) {
        return { success: true, mode: 'crm', data: await res.json() };
      }
    } catch (err) {
      console.error('Error forwarding appraisal to CRM API:', err);
    }
  }

  console.log('CRM Appraisal Logged (Local Delivery):', payload);
  return {
    success: true,
    mode: 'local',
    message: 'Thank you! Lushan Dons or one of our senior licensed sales consultants will be in touch with your comprehensive property valuation.',
  };
}
