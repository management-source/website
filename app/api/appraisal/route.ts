import { NextResponse } from 'next/server';
import { submitCrmAppraisal } from '@/lib/crm';
import { CrmAppraisalPayload } from '@/types';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const name = body.ownerName || body.name;
    const phone = body.phone;
    const address = body.propertyAddress || body.address;

    if (!name || !phone || !address) {
      return NextResponse.json(
        { error: 'Name, phone, and property address are required.' },
        { status: 400 }
      );
    }

    const payload: CrmAppraisalPayload = {
      ownerName: name,
      email: body.email || '',
      phone: phone,
      propertyAddress: address,
      propertyType: body.propertyType || 'House',
      bedrooms: Number(body.bedrooms) || 0,
      bathrooms: Number(body.bathrooms) || 0,
      comments: body.comments || body.additionalDetails || body.timeframe || '',
    };

    const response = await submitCrmAppraisal(payload);
    return NextResponse.json(response);
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || 'Failed to process appraisal request.' },
      { status: 500 }
    );
  }
}

