import { NextResponse } from 'next/server';
import { submitEnquiryToCRM } from '@/lib/crm';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required fields.' },
        { status: 400 }
      );
    }

    const response = await submitEnquiryToCRM(body);
    return NextResponse.json(response);
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || 'Failed to process enquiry.' },
      { status: 500 }
    );
  }
}
