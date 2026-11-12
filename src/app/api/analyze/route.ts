import { NextRequest, NextResponse } from 'next/server';
import { analyzeReputationReviewsWithGemini } from '@/lib/ai/analyzer';
import { ExtractedSourceData, BusinessCategory } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      businessName,
      businessLocation,
      category,
      overallScore,
      sources,
      language,
    }: {
      businessName: string;
      businessLocation?: string;
      category?: BusinessCategory;
      overallScore?: number;
      sources: ExtractedSourceData[];
      language?: 'he' | 'en';
    } = body;

    if (!businessName) {
      return NextResponse.json(
        { error: 'businessName is required' },
        { status: 400 }
      );
    }

    const analysis = await analyzeReputationReviewsWithGemini(
      businessName,
      category || 'general',
      typeof overallScore === 'number' ? overallScore : 85,
      Array.isArray(sources) ? sources : [],
      {
        language,
        location: businessLocation,
      }
    );

    return NextResponse.json({
      success: true,
      analysis,
    });
  } catch (error: any) {
    console.error('Error in /api/analyze:', error);
    return NextResponse.json(
      { error: error?.message || 'AI review analysis failed' },
      { status: 500 }
    );
  }
}
