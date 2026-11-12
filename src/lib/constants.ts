import { PlatformMetadata, BusinessCategory } from '@/types';

export const SUPPORTED_PLATFORMS: Record<string, PlatformMetadata> = {
  google: {
    id: 'google',
    name: 'Google Maps & Reviews',
    domain: 'google.com/maps',
    defaultScale: '1-5',
    category: 'all',
    color: '#4285F4',
    badgeBg: 'rgba(66, 133, 244, 0.15)',
    description: 'Global authority for local discovery and real-time customer ratings.',
  },
  tripadvisor: {
    id: 'tripadvisor',
    name: 'TripAdvisor',
    domain: 'tripadvisor.com',
    defaultScale: '1-5',
    category: ['hotel', 'restaurant'],
    color: '#34E0A1',
    badgeBg: 'rgba(52, 224, 161, 0.15)',
    description: 'Premier travel and hospitality community with verified guest travel reviews.',
  },
  facebook: {
    id: 'facebook',
    name: 'Facebook Recommendations',
    domain: 'facebook.com',
    defaultScale: '1-5',
    category: 'all',
    color: '#1877F2',
    badgeBg: 'rgba(24, 119, 242, 0.15)',
    description: 'Social graph trust, peer recommendations, and community ratings.',
  },
  booking: {
    id: 'booking',
    name: 'Booking.com',
    domain: 'booking.com',
    defaultScale: '1-10',
    category: ['hotel'],
    color: '#003580',
    badgeBg: 'rgba(0, 53, 128, 0.18)',
    description: 'Strictly verified stay guest reviews with 10-point scale granularity.',
  },
  expedia: {
    id: 'expedia',
    name: 'Expedia',
    domain: 'expedia.com',
    defaultScale: '1-5',
    category: ['hotel'],
    color: '#FFCC00',
    badgeBg: 'rgba(255, 204, 0, 0.15)',
    description: 'North American and worldwide hotel reservation & flight bundle feedback.',
  },
  yelp: {
    id: 'yelp',
    name: 'Yelp',
    domain: 'yelp.com',
    defaultScale: '1-5',
    category: ['restaurant', 'retail', 'services'],
    color: '#FF1A1A',
    badgeBg: 'rgba(255, 26, 26, 0.15)',
    description: 'Strictly moderated dining, hospitality, and local trades feedback.',
  },
  thefork: {
    id: 'thefork',
    name: 'TheFork',
    domain: 'thefork.com',
    defaultScale: '1-10',
    category: ['restaurant'],
    color: '#00594C',
    badgeBg: 'rgba(0, 89, 76, 0.2)',
    description: 'European dining reservations network with certified diner scores out of 10.',
  },
  opentable: {
    id: 'opentable',
    name: 'OpenTable',
    domain: 'opentable.com',
    defaultScale: '1-5',
    category: ['restaurant'],
    color: '#DA3743',
    badgeBg: 'rgba(218, 55, 67, 0.15)',
    description: 'Verified reservation diner ratings and culinary accolades.',
  },
  easy_il: {
    id: 'easy_il',
    name: 'Easy.co.il',
    domain: 'easy.co.il',
    defaultScale: '1-10',
    category: 'all',
    color: '#00B0FF',
    badgeBg: 'rgba(0, 176, 255, 0.15)',
    description: 'Leading Israeli local business directory, navigation, and user sentiments.',
  },
  trustpilot: {
    id: 'trustpilot',
    name: 'Trustpilot',
    domain: 'trustpilot.com',
    defaultScale: '1-5',
    category: ['services', 'retail', 'general'],
    color: '#00B67A',
    badgeBg: 'rgba(0, 182, 122, 0.15)',
    description: 'Global standard for consumer trust in e-commerce, software, and services.',
  },
  g2: {
    id: 'g2',
    name: 'G2 Reviews',
    domain: 'g2.com',
    defaultScale: '1-5',
    category: ['services'],
    color: '#FF492C',
    badgeBg: 'rgba(255, 73, 44, 0.15)',
    description: 'B2B software, corporate tools, and technology peer feedback.',
  },
};

export function getPlatformMeta(platformId: string, customLabel?: string) {
  if (SUPPORTED_PLATFORMS[platformId]) {
    return SUPPORTED_PLATFORMS[platformId];
  }
  return {
    id: platformId,
    name: customLabel || platformId.charAt(0).toUpperCase() + platformId.slice(1),
    domain: 'custom-source.org',
    defaultScale: '1-5' as const,
    category: 'all' as const,
    color: '#F59E0B',
    badgeBg: 'rgba(245, 158, 11, 0.15)',
    description: 'User-specified custom verification source.',
  };
}

export function detectCategory(query: string): BusinessCategory {
  const lower = query.toLowerCase();
  if (
    lower.includes('hotel') ||
    lower.includes('resort') ||
    lower.includes('beach') ||
    lower.includes('inn') ||
    lower.includes('suites') ||
    lower.includes('spa') ||
    lower.includes('hostel') ||
    lower.includes('palace') ||
    lower.includes('hilton') ||
    lower.includes('dan ') ||
    lower.includes('isrotel')
  ) {
    return 'hotel';
  }
  if (
    lower.includes('restaurant') ||
    lower.includes('bistro') ||
    lower.includes('cafe') ||
    lower.includes('bar') ||
    lower.includes('bakery') ||
    lower.includes('grill') ||
    lower.includes('machneyuda') ||
    lower.includes('pizza') ||
    lower.includes('kitchen') ||
    lower.includes('diner')
  ) {
    return 'restaurant';
  }
  if (
    lower.includes('tech') ||
    lower.includes('software') ||
    lower.includes('saas') ||
    lower.includes('app') ||
    lower.includes('cloud') ||
    lower.includes('consulting') ||
    lower.includes('agency') ||
    lower.includes('monday.com') ||
    lower.includes('wix') ||
    lower.includes('services')
  ) {
    return 'services';
  }
  return 'general';
}
