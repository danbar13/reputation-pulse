import { NextRequest, NextResponse } from 'next/server';
import { discoverBusinessSources } from '@/lib/scrapers/discovery';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { businessName, location, website } = body;

    if (!businessName && !website) {
      return NextResponse.json(
        { error: 'Business name or website URL is required.' },
        { status: 400 }
      );
    }

    const { category, sources } = discoverBusinessSources(
      businessName || 'Business',
      location,
      website
    );

    return NextResponse.json({
      success: true,
      category,
      sources,
    });
  } catch (error: any) {
    console.error('Error in /api/discover:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to discover business sources.' },
      { status: 500 }
    );
  }
}
