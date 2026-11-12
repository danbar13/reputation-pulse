import { ReviewSnippet, NativeScale } from '@/types';

export interface GooglePlacesResult {
  placeId: string;
  displayName: string;
  formattedAddress?: string;
  rating: number;
  userRatingCount: number;
  googleMapsUri: string;
  websiteUri?: string;
  reviews: ReviewSnippet[];
}

/**
 * Checks whether Google Places API (New) is configured and active.
 */
export function isGooglePlacesConfigured(): boolean {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  const isEnabled = process.env.ENABLE_LIVE_SCRAPING !== 'false';
  return (
    isEnabled &&
    Boolean(key) &&
    key !== 'your_google_places_api_key_here' &&
    key!.trim().length > 10
  );
}

/**
 * Live search and extraction using Google Places API (New)
 * Endpoint: https://places.googleapis.com/v1/places:searchText
 */
export async function fetchLiveGooglePlacesData(
  businessName: string,
  location?: string
): Promise<GooglePlacesResult | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;

  if (!isGooglePlacesConfigured() || !apiKey) {
    return null;
  }

  const query = `${businessName} ${location || ''}`.trim();

  try {
    const url = 'https://places.googleapis.com/v1/places:searchText';
    const fieldMask = [
      'places.id',
      'places.displayName',
      'places.formattedAddress',
      'places.rating',
      'places.userRatingCount',
      'places.googleMapsUri',
      'places.websiteUri',
      'places.reviews',
    ].join(',');

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': fieldMask,
      },
      body: JSON.stringify({
        textQuery: query,
        languageCode: 'en',
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.warn(
        `[GooglePlacesAPI] Request failed with status ${response.status}: ${errText.substring(0, 200)}`
      );
      return null;
    }

    const data = await response.json();
    if (!data.places || data.places.length === 0) {
      console.info(`[GooglePlacesAPI] No matching places found for query: "${query}"`);
      return null;
    }

    const place = data.places[0];

    // Format live review snippets
    const reviews: ReviewSnippet[] = (place.reviews || []).slice(0, 5).map((r: any, idx: number) => {
      const score = typeof r.rating === 'number' ? r.rating : 5;
      let sentiment: 'positive' | 'neutral' | 'critical' = 'positive';
      if (score <= 2) sentiment = 'critical';
      else if (score === 3) sentiment = 'neutral';

      return {
        id: r.name || `gp_rev_${idx}`,
        author: r.authorAttribution?.displayName || 'Google Local Guide',
        date: r.relativePublishTimeDescription || 'Recently',
        rating: score,
        nativeScale: '1-5' as NativeScale,
        text: r.originalText?.text || r.text?.text || 'Review posted on Google Maps.',
        sentiment,
      };
    });

    return {
      placeId: place.id,
      displayName: place.displayName?.text || businessName,
      formattedAddress: place.formattedAddress,
      rating: typeof place.rating === 'number' ? place.rating : 4.5,
      userRatingCount: typeof place.userRatingCount === 'number' ? place.userRatingCount : 0,
      googleMapsUri: place.googleMapsUri || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`,
      websiteUri: place.websiteUri,
      reviews,
    };
  } catch (err: any) {
    console.error('[GooglePlacesAPI] Network/Execution error:', err?.message || err);
    return null;
  }
}
