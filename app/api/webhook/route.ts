import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

const WEBHOOK_SECRET = process.env.CRM_WEBHOOK_SECRET || '';

export async function POST(req: Request) {
  try {
    const signature = req.headers.get('x-crm-signature');

    if (WEBHOOK_SECRET && WEBHOOK_SECRET !== 'webhook_shared_secret' && signature !== WEBHOOK_SECRET) {
      return NextResponse.json({ error: 'Unauthorized webhook request.' }, { status: 401 });
    }

    const payload = await req.json();
    console.log('CRM Webhook received event:', payload.event, payload.data?.id);

    // Revalidate affected routes
    revalidatePath('/');
    revalidatePath('/properties');
    if (payload.data?.slug) {
      revalidatePath(`/properties/${payload.data.slug}`);
    }

    return NextResponse.json({ success: true, revalidated: true, timestamp: Date.now() });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Webhook failed.' }, { status: 500 });
  }
}

