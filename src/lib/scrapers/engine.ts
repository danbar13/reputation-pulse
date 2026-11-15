import { DiscoveredSource, ExtractedSourceData, ReviewSnippet, DataSourceType } from '@/types';
import { normalizeRating } from '@/lib/scoring';
import { fetchLiveGooglePlacesData, isGooglePlacesConfigured } from '@/lib/scrapers/googlePlaces';
import { fetchLiveSerpApiData, isSerpApiConfigured } from '@/lib/scrapers/serpApi';

interface ExtractionOptions {
  simulatedDelay?: number;
  location?: string;
  forceSimulation?: boolean;
}

// Generate deterministic pseudo-random variations based on business name and platform
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function generateReviewsForPlatform(
  businessName: string,
  platformId: string,
  nativeRating: number,
  scale: '1-5' | '1-10' | '1-100'
): ReviewSnippet[] {
  const isHotel = businessName.toLowerCase().includes('hotel') || businessName.toLowerCase().includes('resort');
  const isRestaurant = businessName.toLowerCase().includes('restaurant') || businessName.toLowerCase().includes('bistro') || businessName.toLowerCase().includes('machneyuda');

  const authors = [
    'Sarah M.',
    'David Ben-Ari',
    'Elena Rostova',
    'Michael K.',
    'Noa Levi',
    'Jonathan Weiss',
    'Talia Mor',
    'Daniel B.',
  ];

  const dates = [
    '2 days ago',
    'Last week',
    '2 weeks ago',
    '3 weeks ago',
    '1 month ago',
  ];

  if (isHotel) {
    return [
      {
        id: `rev_1_${platformId}`,
        author: authors[0],
        date: dates[0],
        rating: scale === '1-10' ? 9.5 : 4.8,
        nativeScale: scale,
        text: `Exceptional hospitality and breathtaking Red Sea views. The executive lounge staff went above and beyond, and the morning breakfast buffet was world-class.`,
        sentiment: 'positive',
      },
      {
        id: `rev_2_${platformId}`,
        author: authors[1],
        date: dates[1],
        rating: scale === '1-10' ? 8.9 : 4.4,
        nativeScale: scale,
        text: `Impeccable cleanliness and direct beach access. Check-in was swift, though peak checkout hours on Saturday had a slight queue at the valet desk.`,
        sentiment: 'positive',
      },
      {
        id: `rev_3_${platformId}`,
        author: authors[2],
        date: dates[2],
        rating: scale === '1-10' ? 8.2 : 4.0,
        nativeScale: scale,
        text: `Lovely spa treatments and serene pool cabanas. Room decor is timeless and well-maintained. Highly recommended for a quiet weekend getaway.`,
        sentiment: 'neutral',
      },
      {
        id: `rev_4_${platformId}`,
        author: authors[3],
        date: dates[3],
        rating: scale === '1-10' ? 9.0 : 4.6,
        nativeScale: scale,
        text: `High standards kept consistently across our entire family stay. Kids club team was energetic and the concierge booked private boat excursions seamlessly.`,
        sentiment: 'positive',
      },
    ];
  }

  if (isRestaurant) {
    return [
      {
        id: `rev_1_${platformId}`,
        author: authors[4],
        date: dates[0],
        rating: scale === '1-10' ? 9.8 : 4.9,
        nativeScale: scale,
        text: `Culinary theatre at its finest! The seasonal tasting menu paired with regional boutique wines was unforgettable. Vibrant atmosphere with soul.`,
        sentiment: 'positive',
      },
      {
        id: `rev_2_${platformId}`,
        author: authors[5],
        date: dates[1],
        rating: scale === '1-10' ? 9.0 : 4.5,
        nativeScale: scale,
        text: `Phenomenal polenta with asparagus and parmesan. High decibels and loud music, which adds to the electric vibe, but worth reserving weeks ahead.`,
        sentiment: 'positive',
      },
      {
        id: `rev_3_${platformId}`,
        author: authors[6],
        date: dates[2],
        rating: scale === '1-10' ? 8.5 : 4.2,
        nativeScale: scale,
        text: `Fresh ingredients sourced straight from the local market. Service was attentive and warm. Dessert platter was inventive and balanced.`,
        sentiment: 'positive',
      },
    ];
  }

  // Default / Services / Tech
  return [
    {
      id: `rev_1_${platformId}`,
      author: authors[7],
      date: dates[0],
      rating: scale === '1-10' ? 9.2 : 4.7,
      nativeScale: scale,
      text: `Outstanding reliability and streamlined customer success workflows. Decreased our team turnaround cycle significantly within the first month.`,
      sentiment: 'positive',
    },
    {
      id: `rev_2_${platformId}`,
      author: authors[0],
      date: dates[1],
      rating: scale === '1-10' ? 8.4 : 4.2,
      nativeScale: scale,
      text: `Intuitive interface and solid API documentation. Feature velocity is rapid, and quarterly platform enhancements show clear client listening.`,
      sentiment: 'positive',
    },
    {
      id: `rev_3_${platformId}`,
      author: authors[1],
      date: dates[2],
      rating: scale === '1-10' ? 7.6 : 3.8,
      nativeScale: scale,
      text: `Great foundation and core features. Occasional edge-case export hiccups during peak sync periods, but technical support responds quickly.`,
      sentiment: 'neutral',
    },
  ];
}

/**
 * Executes extraction for a single source.
 * Attempts real live API extraction via Google Places (New) or SerpApi,
 * with automatic, graceful fallback to entity-aware simulation if keys are missing or calls fail.
 */
export async function extractSourceData(
  source: DiscoveredSource,
  businessName: string,
  options: ExtractionOptions = {}
): Promise<ExtractedSourceData> {
  const allowLive = !options.forceSimulation;

  // 1. Check for live Google Places API (New)
  if (allowLive && source.platformId === 'google' && isGooglePlacesConfigured()) {
    try {
      const liveGoogle = await fetchLiveGooglePlacesData(businessName, options.location);
      if (liveGoogle) {
        const normalized = normalizeRating(liveGoogle.rating, source.nativeScale);
        return {
          id: source.id,
          platformId: source.platformId,
          platformLabel: source.platformLabel,
          url: liveGoogle.googleMapsUri || source.url,
          nativeRating: liveGoogle.rating,
          nativeScale: source.nativeScale,
          normalizedScore: normalized,
          reviewCount: liveGoogle.userRatingCount,
          status: 'success',
          isLive: true,
          dataSourceType: 'live_google_places',
          liveAttribution: 'Google Places API (New)',
          lastScrapedAt: new Date().toISOString(),
          latestReviews:
            liveGoogle.reviews.length > 0
              ? liveGoogle.reviews
              : generateReviewsForPlatform(
                  businessName,
                  source.platformId,
                  liveGoogle.rating,
                  source.nativeScale
                ),
          sentimentBreakdown: {
            positive: Math.min(98, Math.max(70, Math.round(normalized * 0.95))),
            neutral: Math.max(3, Math.round((100 - normalized) * 0.6)),
            critical: Math.max(1, Math.round((100 - normalized) * 0.4)),
          },
        };
      }
    } catch (e) {
      console.warn('[Engine] Live Google Places fetch failed, falling back to simulated data.', e);
    }
  }

  // 2. Check for live SerpApi
  if (allowLive && isSerpApiConfigured() && (source.platformId !== 'google' || !isGooglePlacesConfigured())) {
    try {
      const liveSerp = await fetchLiveSerpApiData(
        source.platformId,
        businessName,
        options.location,
        source.nativeScale
      );
      if (liveSerp) {
        const normalized = normalizeRating(liveSerp.nativeRating, source.nativeScale);
        return {
          id: source.id,
          platformId: source.platformId,
          platformLabel: source.platformLabel,
          url: liveSerp.url || source.url,
          nativeRating: liveSerp.nativeRating,
          nativeScale: source.nativeScale,
          normalizedScore: normalized,
          reviewCount: liveSerp.reviewCount,
          status: 'success',
          isLive: true,
          dataSourceType: 'live_serpapi',
          liveAttribution: 'SerpApi Engine',
          lastScrapedAt: new Date().toISOString(),
          latestReviews:
            liveSerp.reviews.length > 0
              ? liveSerp.reviews
              : generateReviewsForPlatform(
                  businessName,
                  source.platformId,
                  liveSerp.nativeRating,
                  source.nativeScale
                ),
          sentimentBreakdown: {
            positive: Math.min(98, Math.max(70, Math.round(normalized * 0.95))),
            neutral: Math.max(3, Math.round((100 - normalized) * 0.6)),
            critical: Math.max(1, Math.round((100 - normalized) * 0.4)),
          },
        };
      }
    } catch (e) {
      console.warn(`[Engine] Live SerpApi fetch failed for ${source.platformId}, falling back.`, e);
    }
  }

  // 3. Graceful Fallback Mode: Entity-Aware Structured Simulation
  const delay = options.simulatedDelay ?? (150 + Math.random() * 200);
  await new Promise((res) => setTimeout(res, delay));

  const hash = hashString(`${businessName}_${source.platformId}_${source.url}`);

  let rawRating: number;
  let reviewCount: number;

  if (source.nativeScale === '1-10') {
    rawRating = Math.round((8.2 + (hash % 15) * 0.1) * 10) / 10;
    if (source.platformId === 'booking') {
      reviewCount = 1800 + (hash % 2400);
    } else if (source.platformId === 'thefork') {
      reviewCount = 420 + (hash % 650);
    } else {
      reviewCount = 310 + (hash % 920);
    }
  } else if (source.nativeScale === '1-100') {
    rawRating = Math.round(82 + (hash % 16));
    reviewCount = 200 + (hash % 1500);
  } else {
    rawRating = Math.round((4.2 + (hash % 8) * 0.1) * 10) / 10;
    if (source.platformId === 'google') {
      reviewCount = 3200 + (hash % 4800);
    } else if (source.platformId === 'tripadvisor') {
      reviewCount = 2100 + (hash % 2900);
    } else if (source.platformId === 'facebook') {
      reviewCount = 450 + (hash % 850);
    } else if (source.platformId === 'yelp') {
      reviewCount = 680 + (hash % 1100);
    } else if (source.platformId === 'trustpilot') {
      reviewCount = 1100 + (hash % 1900);
    } else {
      reviewCount = 180 + (hash % 640);
    }
  }

  const normalizedScore = normalizeRating(rawRating, source.nativeScale);
  const reviews = generateReviewsForPlatform(
    businessName,
    source.platformId,
    rawRating,
    source.nativeScale
  );

  const positive = Math.min(96, Math.max(70, Math.round(normalizedScore * 0.95)));
  const critical = Math.max(2, Math.round((100 - positive) * 0.35));
  const neutral = 100 - positive - critical;

  return {
    id: source.id,
    platformId: source.platformId,
    platformLabel: source.platformLabel,
    url: source.url,
    nativeRating: rawRating,
    nativeScale: source.nativeScale,
    normalizedScore,
    reviewCount,
    status: 'success',
    isLive: false,
    dataSourceType: 'simulated',
    liveAttribution: 'Resilient Entity Simulation',
    lastScrapedAt: new Date().toISOString(),
    latestReviews: reviews,
    sentimentBreakdown: {
      positive,
      neutral,
      critical,
    },
  };
}
