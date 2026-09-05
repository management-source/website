import { NextResponse } from 'next/server';
import { submitAppraisalToCRM } from '@/lib/crm';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.name || !body.phone || !body.address) {
      return NextResponse.json(
        { error: 'Name, phone, and property address are required.' },
        { status: 400 }
      );
    }

    const response = await submitAppraisalToCRM(body);
    return NextResponse.json(response);
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || 'Failed to process appraisal request.' },
      { status: 500 }
    );
  }
}
