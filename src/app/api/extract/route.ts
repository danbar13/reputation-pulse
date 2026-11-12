import { NextRequest, NextResponse } from 'next/server';
import { extractSourceData } from '@/lib/scrapers/engine';
import { calculateAggregateScores } from '@/lib/scoring';
import { DiscoveredSource, ScanSnapshot, BusinessCategory } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      businessName,
      location,
      website,
      category,
      sources,
    }: {
      businessName: string;
      location?: string;
      website?: string;
      category?: BusinessCategory;
      sources: DiscoveredSource[];
    } = body;

    if (!businessName || !Array.isArray(sources) || sources.length === 0) {
      return NextResponse.json(
        { error: 'Invalid payload: businessName and at least one source required.' },
        { status: 400 }
      );
    }

    // Execute extraction concurrently for all verified sources
    const extractedPromises = sources.map((source) =>
      extractSourceData(source, businessName, { location })
    );
    const rawExtracted = await Promise.all(extractedPromises);

    // Calculate aggregated scores
    const { simpleAverage, weightedScore, totalReviews, enrichedSources } =
      calculateAggregateScores(rawExtracted);

    const snapshot: ScanSnapshot = {
      id: `snap_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      businessName,
      businessLocation: location,
      businessWebsite: website,
      category: category || 'general',
      timestamp: new Date().toISOString(),
      overallWeightedScore: weightedScore,
      simpleAverageScore: simpleAverage,
      totalReviews,
      sources: enrichedSources,
    };

    return NextResponse.json({
      success: true,
      snapshot,
    });
  } catch (error: any) {
    console.error('Error in /api/extract:', error);
    return NextResponse.json(
      { error: error?.message || 'Extraction failed.' },
      { status: 500 }
    );
  }
}
