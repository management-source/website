import { NextResponse } from 'next/server';
import { getProperties } from '@/lib/crm';
import { PropertyStatus } from '@/types';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status') as PropertyStatus | 'all' | null;
    const suburb = searchParams.get('suburb') || undefined;
    const type = searchParams.get('type') || undefined;
    const bedrooms = searchParams.get('bedrooms') ? Number(searchParams.get('bedrooms')) : undefined;
    const searchTerm = searchParams.get('search') || undefined;

    const properties = await getProperties({
      status: status || undefined,
      suburb,
      type,
      bedrooms,
      searchTerm,
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
