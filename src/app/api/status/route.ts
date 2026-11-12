import { NextResponse } from 'next/server';
import { isGooglePlacesConfigured } from '@/lib/scrapers/googlePlaces';
import { isSerpApiConfigured } from '@/lib/scrapers/serpApi';
import { isGeminiConfigured } from '@/lib/ai/analyzer';

export async function GET() {
  const googlePlaces = isGooglePlacesConfigured();
  const serpApi = isSerpApiConfigured();
  const gemini = isGeminiConfigured();
  const liveScrapingEnabled = process.env.ENABLE_LIVE_SCRAPING !== 'false';

  return NextResponse.json({
    googlePlacesConfigured: googlePlaces,
    serpApiConfigured: serpApi,
    geminiConfigured: gemini,
    liveScrapingEnabled,
    environmentKeysDetected: {
      GOOGLE_PLACES_API_KEY: Boolean(process.env.GOOGLE_PLACES_API_KEY),
      SERPAPI_API_KEY: Boolean(process.env.SERPAPI_API_KEY),
      GEMINI_API_KEY: Boolean(process.env.GEMINI_API_KEY),
      ENABLE_LIVE_SCRAPING: process.env.ENABLE_LIVE_SCRAPING || 'true',
    },
  });
}
