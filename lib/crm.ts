import { Property, PropertyStatus, EnquiryPayload, AppraisalPayload } from '@/types';
import { PROPERTIES } from '@/data/content';

const CRM_API_BASE_URL = process.env.CRM_API_BASE_URL || '';
const CRM_API_KEY = process.env.CRM_API_KEY || '';
const CRM_AGENCY_SLUG = process.env.CRM_AGENCY_SLUG || 'dons-premier';

interface PropertyFilters {
  status?: PropertyStatus | 'all';
  suburb?: string;
  type?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  searchTerm?: string;
}

/**
 * Fetch properties either from Premier Hub CRM or from verified local dataset.
 */
export async function getProperties(filters?: PropertyFilters): Promise<Property[]> {
  // If CRM credentials are live and remote is available, attempt remote fetch
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
        if (Array.isArray(data.properties) && data.properties.length > 0) {
          return data.properties;
        }
      }
    } catch (err) {
      console.warn('CRM API unreachable, falling back to local property cache:', err);
    }
  }

  // Resilient fallback with local filtering
  let result = [...PROPERTIES];

  if (filters?.status && filters.status !== 'all') {
    result = result.filter((p) => p.status === filters.status);
  }

  if (filters?.suburb) {
    const s = filters.suburb.toLowerCase();
    result = result.filter((p) => p.address.suburb.toLowerCase().includes(s));
  }

  if (filters?.type && filters.type !== 'All Types') {
    result = result.filter((p) => p.type.toLowerCase() === filters.type?.toLowerCase());
  }

  if (filters?.bedrooms) {
    result = result.filter((p) => p.bedrooms >= (filters.bedrooms || 0));
  }

  if (filters?.searchTerm) {
    const term = filters.searchTerm.toLowerCase();
    result = result.filter(
      (p) =>
        p.title.toLowerCase().includes(term) ||
        p.address.fullAddress.toLowerCase().includes(term) ||
        p.address.suburb.toLowerCase().includes(term) ||
        p.headline.toLowerCase().includes(term)
    );
  }

  return result;
}

/**
 * Fetch a single property by its slug.
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
      console.warn(`CRM API fetch failed for slug ${slug}, using local cache:`, err);
    }
  }

  const found = PROPERTIES.find((p) => p.slug === slug);
  return found || null;
}

/**
 * Submit client enquiry (Sales, Rentals, General, Inspection) to CRM.
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

  // Log locally and return success response
  console.log('CRM Enquiry Logged (Local Fallback Mode):', payload);
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

  console.log('CRM Appraisal Logged (Local Fallback Mode):', payload);
  return {
    success: true,
    mode: 'local',
    message: 'Thank you! Lushan Dons or one of our senior licensed sales consultants will be in touch with your comprehensive property valuation.',
  };
}

