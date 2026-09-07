import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import {
  getProperties,
  upsertLocalCrmListing,
  saveLocalCrmListings,
  deleteLocalCrmListing,
  clearAllLocalCrmListings,
  getLocalCrmListings,
} from '@/lib/crm';
import { Property, PropertyStatus } from '@/types';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status') as PropertyStatus | 'all' | null;
    const category = searchParams.get('category') || undefined;
    const suburb = searchParams.get('suburb') || undefined;
    const type = searchParams.get('type') || undefined;
    const bedrooms = searchParams.get('bedrooms') ? Number(searchParams.get('bedrooms')) : undefined;
    const bathrooms = searchParams.get('bathrooms') ? Number(searchParams.get('bathrooms')) : undefined;
    const minPrice = searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined;
    const maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined;
    const searchTerm = searchParams.get('search') || undefined;
    const inspections = searchParams.get('inspections') === 'true';

    const properties = await getProperties({
      status: status || undefined,
      suburb,
      type: category || type,
      bedrooms,
      minPrice,
      maxPrice,
      searchTerm,
      inspections,
    });

    return NextResponse.json({
      success: true,
      count: properties.length,
      properties,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || 'Failed to fetch properties.' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Check if bulk action or single property push
    if (body.action === 'clear_all') {
      clearAllLocalCrmListings();
      try {
        revalidatePath('/');
        revalidatePath('/properties');
        revalidatePath('/rentals');
      } catch { }
      return NextResponse.json({
        success: true,
        message: 'All CRM listings cleared successfully.',
        count: 0,
      });
    }

    if (body.action === 'bulk_sync' && Array.isArray(body.properties)) {
      saveLocalCrmListings(body.properties);
      try {
        revalidatePath('/');
        revalidatePath('/properties');
        revalidatePath('/rentals');
      } catch { }
      return NextResponse.json({
        success: true,
        message: `Bulk synchronized ${body.properties.length} CRM listings.`,
        count: body.properties.length,
      });
    }

    // Single or array property push
    const items: Property[] = Array.isArray(body)
      ? body
      : body.property
        ? [body.property]
        : Array.isArray(body.properties)
          ? body.properties
          : [body];

    for (const item of items) {
      if (!item.title || !item.address) {
        return NextResponse.json(
          { error: 'Invalid property payload. Title and address are required.' },
          { status: 400 }
        );
      }
      // Ensure id and slug exist
      if (!item.id) {
        item.id = 'crm-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7);
      }
      if (!item.slug) {
        item.slug = item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      }
      upsertLocalCrmListing(item);
    }

    try {
      revalidatePath('/');
      revalidatePath('/properties');
      revalidatePath('/rentals');
    } catch { }

    const updated = getLocalCrmListings();
    return NextResponse.json({
      success: true,
      message: `Successfully upserted ${items.length} listing(s).`,
      count: updated.length,
      properties: updated,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || 'Failed to upsert CRM property listing.' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    let identifier = searchParams.get('id') || searchParams.get('slug');

    if (!identifier) {
      try {
        const body = await req.json();
        identifier = body?.id || body?.slug;
      } catch { }
    }

    if (!identifier) {
      return NextResponse.json(
        { error: 'Property ID or slug is required to delete.' },
        { status: 400 }
      );
    }

    const updated = deleteLocalCrmListing(identifier);

    try {
      revalidatePath('/');
      revalidatePath('/properties');
      revalidatePath('/rentals');
    } catch { }

    return NextResponse.json({
      success: true,
      message: `Listing '${identifier}' deleted successfully.`,
      count: updated.length,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || 'Failed to delete CRM listing.' },
      { status: 500 }
    );
  }
}

