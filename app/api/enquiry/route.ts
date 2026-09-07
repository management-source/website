import { NextResponse } from 'next/server';
import { submitCrmEnquiry } from '@/lib/crm';
import { CrmEnquiryPayload } from '@/types';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required fields.' },
        { status: 400 }
      );
    }

    const payload: CrmEnquiryPayload = {
      name: body.name,
      email: body.email,
      phone: body.phone || '',
      message: body.message,
      listingId: body.listingId || body.propertyId || '',
      enquiryType: (body.enquiryType || (body.type === 'inspection_booking' ? 'INSPECTION' : 'GENERAL')) as CrmEnquiryPayload['enquiryType'],
    };

    const response = await submitCrmEnquiry(payload);
    return NextResponse.json(response);
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || 'Failed to process enquiry.' },
      { status: 500 }
    );
  }
}

