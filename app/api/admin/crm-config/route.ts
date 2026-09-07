import { NextResponse } from 'next/server';
import { getCrmConfig, saveCrmConfig } from '@/lib/crm';

export async function GET() {
  const config = getCrmConfig();
  return NextResponse.json({
    success: true,
    config,
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Test connection action
    if (body.action === 'test_connection') {
      const baseUrl = (body.baseUrl || getCrmConfig().baseUrl).replace(/\/+$/, '');
      const agencySlug = body.agencySlug || getCrmConfig().agencySlug;
      const apiKey = body.apiKey !== undefined ? body.apiKey : getCrmConfig().apiKey;

      if (!apiKey || apiKey.includes('your_api_key')) {
        return NextResponse.json({
          success: false,
          error: 'Please enter a valid CRM API Key before testing.',
        }, { status: 400 });
      }

      const endpoint = `${baseUrl}/api/v1/public/${agencySlug}/listings`;
      try {
        const res = await fetch(endpoint, {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            Accept: 'application/json',
          },
        });

        if (res.ok) {
          const json = await res.json();
          const count = Array.isArray(json.data)
            ? json.data.length
            : Array.isArray(json.listings)
            ? json.listings.length
            : 0;

          return NextResponse.json({
            success: true,
            message: `Successfully connected to Premier Hub CRM! Found ${count} live listings.`,
            count,
            agency: json.agency || agencySlug,
          });
        } else {
          const errorText = await res.text().catch(() => '');
          return NextResponse.json({
            success: false,
            error: `CRM API responded with HTTP ${res.status}: ${errorText || 'Authentication failed or endpoint not found.'}`,
          }, { status: res.status });
        }
      } catch (networkErr: any) {
        return NextResponse.json({
          success: false,
          error: `Network error connecting to ${endpoint}: ${networkErr.message}`,
        }, { status: 502 });
      }
    }

    // Save configuration action
    const updated = saveCrmConfig({
      baseUrl: body.baseUrl,
      agencySlug: body.agencySlug,
      apiKey: body.apiKey,
      webhookSecret: body.webhookSecret,
    });

    return NextResponse.json({
      success: true,
      message: 'Premier Hub CRM settings and Webhook Secret saved successfully!',
      config: updated,
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      error: err?.message || 'Failed to save CRM configuration.',
    }, { status: 500 });
  }
}
