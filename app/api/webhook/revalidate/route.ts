import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { CrmWebhookPayload } from '@/types';

export async function POST(req: Request) {
  try {
    const configuredSecret = process.env.CRM_WEBHOOK_SECRET;
    const incomingSecret = req.headers.get('x-webhook-secret') || req.headers.get('X-Webhook-Secret');

    // Return 401 if secret verification fails
    if (!configuredSecret || !incomingSecret || incomingSecret !== configuredSecret) {
      return NextResponse.json(
        { error: 'Unauthorized: Invalid or missing X-Webhook-Secret header' },
        { status: 401 }
      );
    }

    let payload: CrmWebhookPayload;
    try {
      payload = await req.json();
    } catch {
      payload = { action: 'sync.all', timestamp: new Date().toISOString() };
    }

    const { action, listingId } = payload;

    // Trigger on-demand cache revalidation for main listing feeds
    revalidatePath('/');
    revalidatePath('/properties');
    revalidatePath('/rentals');

    // Revalidate specific property routes if listingId is provided
    if (listingId) {
      try {
        revalidatePath(`/properties/${listingId}`);
        revalidatePath(`/listings/${listingId}`);
      } catch (err) {
        console.warn('Path revalidation warning:', err);
      }
    }

    return NextResponse.json({
      success: true,
      revalidated: true,
      action: action || 'sync.all',
      listingId: listingId || null,
      timestamp: payload.timestamp || new Date().toISOString(),
    });
  } catch (err: any) {
    console.error('Error in webhook revalidation:', err);
    return NextResponse.json(
      { error: err?.message || 'Failed to revalidate cache.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'active',
    endpoint: '/api/webhook/revalidate',
    requiresHeader: 'X-Webhook-Secret',
  });
}
