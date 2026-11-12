import { HistoricalBusinessData, ScanSnapshot, BusinessCategory } from '@/types';
import { calculateAggregateScores } from '@/lib/scoring';

const STORAGE_KEY = 'reputation_pulse_data_v1';

// Seed realistic demo history for Royal Beach Hotel Eilat
const ROYAL_BEACH_DEMO: HistoricalBusinessData = {
  businessKey: 'royal-beach-hotel-eilat',
  businessName: 'Royal Beach Hotel Eilat',
  businessLocation: 'Eilat, Israel',
  businessWebsite: 'https://www.isrotel.com/royal-beach-eilat',
  category: 'hotel',
  lastUpdated: '2026-11-10T14:30:00Z',
  snapshots: [
    {
      id: 'snap_rb_1',
      businessName: 'Royal Beach Hotel Eilat',
      businessLocation: 'Eilat, Israel',
      businessWebsite: 'https://www.isrotel.com/royal-beach-eilat',
      category: 'hotel',
      timestamp: '2026-06-15T10:00:00Z',
      overallWeightedScore: 88.4,
      simpleAverageScore: 89.1,
      totalReviews: 8420,
      sources: [
        {
          id: 'src_rb_g_1',
          platformId: 'google',
          platformLabel: 'Google Maps & Reviews',
          url: 'https://www.google.com/maps/place/Royal+Beach+Eilat',
          nativeRating: 4.4,
          nativeScale: '1-5',
          normalizedScore: 88.0,
          reviewCount: 4210,
          status: 'success',
          lastScrapedAt: '2026-06-15T10:00:00Z',
          weightShare: 50.0,
          sentimentBreakdown: { positive: 85, neutral: 10, critical: 5 },
          latestReviews: [],
        },
        {
          id: 'src_rb_ta_1',
          platformId: 'tripadvisor',
          platformLabel: 'TripAdvisor',
          url: 'https://www.tripadvisor.com/Hotel_Review-Royal_Beach_Eilat',
          nativeRating: 4.5,
          nativeScale: '1-5',
          normalizedScore: 90.0,
          reviewCount: 2150,
          status: 'success',
          lastScrapedAt: '2026-06-15T10:00:00Z',
          weightShare: 25.5,
          sentimentBreakdown: { positive: 88, neutral: 8, critical: 4 },
          latestReviews: [],
        },
        {
          id: 'src_rb_bk_1',
          platformId: 'booking',
          platformLabel: 'Booking.com',
          url: 'https://www.booking.com/hotel/il/royal-beach-eilat.html',
          nativeRating: 8.8,
          nativeScale: '1-10',
          normalizedScore: 88.0,
          reviewCount: 1680,
          status: 'success',
          lastScrapedAt: '2026-06-15T10:00:00Z',
          weightShare: 20.0,
          sentimentBreakdown: { positive: 86, neutral: 9, critical: 5 },
          latestReviews: [],
        },
        {
          id: 'src_rb_fb_1',
          platformId: 'facebook',
          platformLabel: 'Facebook Page Reviews',
          url: 'https://www.facebook.com/royalbeacheilat/reviews',
          nativeRating: 4.6,
          nativeScale: '1-5',
          normalizedScore: 92.0,
          reviewCount: 380,
          status: 'success',
          lastScrapedAt: '2026-06-15T10:00:00Z',
          weightShare: 4.5,
          sentimentBreakdown: { positive: 91, neutral: 6, critical: 3 },
          latestReviews: [],
        },
      ],
    },
    {
      id: 'snap_rb_2',
      businessName: 'Royal Beach Hotel Eilat',
      businessLocation: 'Eilat, Israel',
      businessWebsite: 'https://www.isrotel.com/royal-beach-eilat',
      category: 'hotel',
      timestamp: '2026-08-01T10:00:00Z',
      overallWeightedScore: 89.6,
      simpleAverageScore: 90.3,
      totalReviews: 8950,
      sources: [
        {
          id: 'src_rb_g_2',
          platformId: 'google',
          platformLabel: 'Google Maps & Reviews',
          url: 'https://www.google.com/maps/place/Royal+Beach+Eilat',
          nativeRating: 4.5,
          nativeScale: '1-5',
          normalizedScore: 90.0,
          reviewCount: 4520,
          status: 'success',
          lastScrapedAt: '2026-08-01T10:00:00Z',
          weightShare: 50.5,
          sentimentBreakdown: { positive: 88, neutral: 8, critical: 4 },
          latestReviews: [],
        },
        {
          id: 'src_rb_ta_2',
          platformId: 'tripadvisor',
          platformLabel: 'TripAdvisor',
          url: 'https://www.tripadvisor.com/Hotel_Review-Royal_Beach_Eilat',
          nativeRating: 4.5,
          nativeScale: '1-5',
          normalizedScore: 90.0,
          reviewCount: 2280,
          status: 'success',
          lastScrapedAt: '2026-08-01T10:00:00Z',
          weightShare: 25.5,
          sentimentBreakdown: { positive: 89, neutral: 7, critical: 4 },
          latestReviews: [],
        },
        {
          id: 'src_rb_bk_2',
          platformId: 'booking',
          platformLabel: 'Booking.com',
          url: 'https://www.booking.com/hotel/il/royal-beach-eilat.html',
          nativeRating: 8.9,
          nativeScale: '1-10',
          normalizedScore: 89.0,
          reviewCount: 1740,
          status: 'success',
          lastScrapedAt: '2026-08-01T10:00:00Z',
          weightShare: 19.4,
          sentimentBreakdown: { positive: 87, neutral: 8, critical: 5 },
          latestReviews: [],
        },
        {
          id: 'src_rb_fb_2',
          platformId: 'facebook',
          platformLabel: 'Facebook Page Reviews',
          url: 'https://www.facebook.com/royalbeacheilat/reviews',
          nativeRating: 4.7,
          nativeScale: '1-5',
          normalizedScore: 94.0,
          reviewCount: 410,
          status: 'success',
          lastScrapedAt: '2026-08-01T10:00:00Z',
          weightShare: 4.6,
          sentimentBreakdown: { positive: 93, neutral: 5, critical: 2 },
          latestReviews: [],
        },
      ],
    },
    {
      id: 'snap_rb_3',
      businessName: 'Royal Beach Hotel Eilat',
      businessLocation: 'Eilat, Israel',
      businessWebsite: 'https://www.isrotel.com/royal-beach-eilat',
      category: 'hotel',
      timestamp: '2026-09-20T10:00:00Z',
      overallWeightedScore: 90.8,
      simpleAverageScore: 91.2,
      totalReviews: 9460,
      sources: [
        {
          id: 'src_rb_g_3',
          platformId: 'google',
          platformLabel: 'Google Maps & Reviews',
          url: 'https://www.google.com/maps/place/Royal+Beach+Eilat',
          nativeRating: 4.5,
          nativeScale: '1-5',
          normalizedScore: 90.0,
          reviewCount: 4800,
          status: 'success',
          lastScrapedAt: '2026-09-20T10:00:00Z',
          weightShare: 50.7,
          sentimentBreakdown: { positive: 89, neutral: 7, critical: 4 },
          latestReviews: [],
        },
        {
          id: 'src_rb_ta_3',
          platformId: 'tripadvisor',
          platformLabel: 'TripAdvisor',
          url: 'https://www.tripadvisor.com/Hotel_Review-Royal_Beach_Eilat',
          nativeRating: 4.6,
          nativeScale: '1-5',
          normalizedScore: 92.0,
          reviewCount: 2390,
          status: 'success',
          lastScrapedAt: '2026-09-20T10:00:00Z',
          weightShare: 25.3,
          sentimentBreakdown: { positive: 91, neutral: 6, critical: 3 },
          latestReviews: [],
        },
        {
          id: 'src_rb_bk_3',
          platformId: 'booking',
          platformLabel: 'Booking.com',
          url: 'https://www.booking.com/hotel/il/royal-beach-eilat.html',
          nativeRating: 9.1,
          nativeScale: '1-10',
          normalizedScore: 91.0,
          reviewCount: 1820,
          status: 'success',
          lastScrapedAt: '2026-09-20T10:00:00Z',
          weightShare: 19.2,
          sentimentBreakdown: { positive: 90, neutral: 6, critical: 4 },
          latestReviews: [],
        },
        {
          id: 'src_rb_fb_3',
          platformId: 'facebook',
          platformLabel: 'Facebook Page Reviews',
          url: 'https://www.facebook.com/royalbeacheilat/reviews',
          nativeRating: 4.8,
          nativeScale: '1-5',
          normalizedScore: 96.0,
          reviewCount: 450,
          status: 'success',
          lastScrapedAt: '2026-09-20T10:00:00Z',
          weightShare: 4.8,
          sentimentBreakdown: { positive: 95, neutral: 3, critical: 2 },
          latestReviews: [],
        },
      ],
    },
    {
      id: 'snap_rb_4',
      businessName: 'Royal Beach Hotel Eilat',
      businessLocation: 'Eilat, Israel',
      businessWebsite: 'https://www.isrotel.com/royal-beach-eilat',
      category: 'hotel',
      timestamp: '2026-11-10T14:30:00Z',
      overallWeightedScore: 92.2,
      simpleAverageScore: 92.8,
      totalReviews: 10120,
      sources: [
        {
          id: 'src_rb_g_4',
          platformId: 'google',
          platformLabel: 'Google Maps & Reviews',
          url: 'https://www.google.com/maps/place/Royal+Beach+Eilat',
          nativeRating: 4.6,
          nativeScale: '1-5',
          normalizedScore: 92.0,
          reviewCount: 5120,
          status: 'success',
          lastScrapedAt: '2026-11-10T14:30:00Z',
          weightShare: 50.6,
          sentimentBreakdown: { positive: 92, neutral: 5, critical: 3 },
          latestReviews: [
            {
              id: 'rev_rb_1',
              author: 'Sarah M.',
              date: '2 days ago',
              rating: 5,
              nativeScale: '1-5',
              text: 'Exceptional hospitality and breathtaking Red Sea views. Executive lounge staff went above and beyond.',
              sentiment: 'positive',
            },
            {
              id: 'rev_rb_2',
              author: 'David Ben-Ari',
              date: 'Last week',
              rating: 4.5,
              nativeScale: '1-5',
              text: 'Impeccable cleanliness and direct beach access. Check-in was swift and valet courteous.',
              sentiment: 'positive',
            },
          ],
        },
        {
          id: 'src_rb_ta_4',
          platformId: 'tripadvisor',
          platformLabel: 'TripAdvisor',
          url: 'https://www.tripadvisor.com/Hotel_Review-Royal_Beach_Eilat',
          nativeRating: 4.6,
          nativeScale: '1-5',
          normalizedScore: 92.0,
          reviewCount: 2540,
          status: 'success',
          lastScrapedAt: '2026-11-10T14:30:00Z',
          weightShare: 25.1,
          sentimentBreakdown: { positive: 92, neutral: 5, critical: 3 },
          latestReviews: [],
        },
        {
          id: 'src_rb_bk_4',
          platformId: 'booking',
          platformLabel: 'Booking.com',
          url: 'https://www.booking.com/hotel/il/royal-beach-eilat.html',
          nativeRating: 9.2,
          nativeScale: '1-10',
          normalizedScore: 92.0,
          reviewCount: 1980,
          status: 'success',
          lastScrapedAt: '2026-11-10T14:30:00Z',
          weightShare: 19.6,
          sentimentBreakdown: { positive: 91, neutral: 6, critical: 3 },
          latestReviews: [],
        },
        {
          id: 'src_rb_fb_4',
          platformId: 'facebook',
          platformLabel: 'Facebook Page Reviews',
          url: 'https://www.facebook.com/royalbeacheilat/reviews',
          nativeRating: 4.8,
          nativeScale: '1-5',
          normalizedScore: 96.0,
          reviewCount: 480,
          status: 'success',
          lastScrapedAt: '2026-11-10T14:30:00Z',
          weightShare: 4.7,
          sentimentBreakdown: { positive: 95, neutral: 3, critical: 2 },
          latestReviews: [],
        },
      ],
    },
  ],
};

// Seed Machneyuda Restaurant Jerusalem
const MACHNEYUDA_DEMO: HistoricalBusinessData = {
  businessKey: 'machneyuda-restaurant-jerusalem',
  businessName: 'Machneyuda Restaurant Jerusalem',
  businessLocation: 'Jerusalem, Israel',
  businessWebsite: 'https://www.machneyuda.co.il',
  category: 'restaurant',
  lastUpdated: '2026-11-08T19:00:00Z',
  snapshots: [
    {
      id: 'snap_mny_1',
      businessName: 'Machneyuda Restaurant Jerusalem',
      businessLocation: 'Jerusalem, Israel',
      businessWebsite: 'https://www.machneyuda.co.il',
      category: 'restaurant',
      timestamp: '2026-07-10T19:00:00Z',
      overallWeightedScore: 91.2,
      simpleAverageScore: 90.6,
      totalReviews: 4120,
      sources: [
        {
          id: 'src_mny_g_1',
          platformId: 'google',
          platformLabel: 'Google Maps & Reviews',
          url: 'https://www.google.com/maps/place/Machneyuda',
          nativeRating: 4.6,
          nativeScale: '1-5',
          normalizedScore: 92.0,
          reviewCount: 2600,
          status: 'success',
          lastScrapedAt: '2026-07-10T19:00:00Z',
          weightShare: 63.1,
          sentimentBreakdown: { positive: 93, neutral: 4, critical: 3 },
          latestReviews: [],
        },
        {
          id: 'src_mny_ta_1',
          platformId: 'tripadvisor',
          platformLabel: 'TripAdvisor',
          url: 'https://www.tripadvisor.com/Restaurant_Review-Machneyuda',
          nativeRating: 4.5,
          nativeScale: '1-5',
          normalizedScore: 90.0,
          reviewCount: 1100,
          status: 'success',
          lastScrapedAt: '2026-07-10T19:00:00Z',
          weightShare: 26.7,
          sentimentBreakdown: { positive: 89, neutral: 7, critical: 4 },
          latestReviews: [],
        },
        {
          id: 'src_mny_ez_1',
          platformId: 'easy_il',
          platformLabel: 'Easy.co.il',
          url: 'https://easy.co.il/he/page/machneyuda',
          nativeRating: 9.1,
          nativeScale: '1-10',
          normalizedScore: 91.0,
          reviewCount: 420,
          status: 'success',
          lastScrapedAt: '2026-07-10T19:00:00Z',
          weightShare: 10.2,
          sentimentBreakdown: { positive: 92, neutral: 5, critical: 3 },
          latestReviews: [],
        },
      ],
    },
    {
      id: 'snap_mny_2',
      businessName: 'Machneyuda Restaurant Jerusalem',
      businessLocation: 'Jerusalem, Israel',
      businessWebsite: 'https://www.machneyuda.co.il',
      category: 'restaurant',
      timestamp: '2026-11-08T19:00:00Z',
      overallWeightedScore: 93.4,
      simpleAverageScore: 92.8,
      totalReviews: 4890,
      sources: [
        {
          id: 'src_mny_g_2',
          platformId: 'google',
          platformLabel: 'Google Maps & Reviews',
          url: 'https://www.google.com/maps/place/Machneyuda',
          nativeRating: 4.7,
          nativeScale: '1-5',
          normalizedScore: 94.0,
          reviewCount: 3100,
          status: 'success',
          lastScrapedAt: '2026-11-08T19:00:00Z',
          weightShare: 63.4,
          sentimentBreakdown: { positive: 95, neutral: 3, critical: 2 },
          latestReviews: [],
        },
        {
          id: 'src_mny_ta_2',
          platformId: 'tripadvisor',
          platformLabel: 'TripAdvisor',
          url: 'https://www.tripadvisor.com/Restaurant_Review-Machneyuda',
          nativeRating: 4.6,
          nativeScale: '1-5',
          normalizedScore: 92.0,
          reviewCount: 1280,
          status: 'success',
          lastScrapedAt: '2026-11-08T19:00:00Z',
          weightShare: 26.2,
          sentimentBreakdown: { positive: 92, neutral: 5, critical: 3 },
          latestReviews: [],
        },
        {
          id: 'src_mny_ez_2',
          platformId: 'easy_il',
          platformLabel: 'Easy.co.il',
          url: 'https://easy.co.il/he/page/machneyuda',
          nativeRating: 9.3,
          nativeScale: '1-10',
          normalizedScore: 93.0,
          reviewCount: 510,
          status: 'success',
          lastScrapedAt: '2026-11-08T19:00:00Z',
          weightShare: 10.4,
          sentimentBreakdown: { positive: 94, neutral: 4, critical: 2 },
          latestReviews: [],
        },
      ],
    },
  ],
};

export const INITIAL_STORAGE: Record<string, HistoricalBusinessData> = {
  'royal-beach-hotel-eilat': ROYAL_BEACH_DEMO,
  'machneyuda-restaurant-jerusalem': MACHNEYUDA_DEMO,
};

export function getStoredBusinesses(): Record<string, HistoricalBusinessData> {
  if (typeof window === 'undefined') {
    return INITIAL_STORAGE;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_STORAGE));
      return INITIAL_STORAGE;
    }
    const parsed = JSON.parse(raw);
    return { ...INITIAL_STORAGE, ...parsed };
  } catch (e) {
    console.error('Failed to parse stored reputation pulse data:', e);
    return INITIAL_STORAGE;
  }
}

export function saveSnapshot(snapshot: ScanSnapshot): HistoricalBusinessData {
  const key = snapshot.businessName.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-');
  const stored = getStoredBusinesses();

  const existing = stored[key] || {
    businessKey: key,
    businessName: snapshot.businessName,
    businessLocation: snapshot.businessLocation,
    businessWebsite: snapshot.businessWebsite,
    category: snapshot.category,
    lastUpdated: snapshot.timestamp,
    snapshots: [],
  };

  const existingIdx = existing.snapshots.findIndex((s) => s.id === snapshot.id);
  const updatedSnapshots =
    existingIdx >= 0
      ? existing.snapshots.map((s, idx) => (idx === existingIdx ? snapshot : s))
      : [...existing.snapshots, snapshot];
  const updatedBusiness: HistoricalBusinessData = {
    ...existing,
    lastUpdated: snapshot.timestamp,
    snapshots: updatedSnapshots,
  };

  stored[key] = updatedBusiness;

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  }

  return updatedBusiness;
}

export function getBusinessByKey(key: string): HistoricalBusinessData | null {
  const stored = getStoredBusinesses();
  return stored[key] || null;
}
