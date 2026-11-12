export type BusinessCategory = 'hotel' | 'restaurant' | 'services' | 'retail' | 'general';

export type NativeScale = '1-5' | '1-10' | '1-100';

export interface PlatformMetadata {
  id: string;
  name: string;
  domain: string;
  defaultScale: NativeScale;
  category: BusinessCategory[] | 'all';
  color: string;
  badgeBg: string;
  description: string;
}

export interface ReviewSnippet {
  id: string;
  author: string;
  date: string;
  rating: number;
  nativeScale: NativeScale;
  text: string;
  sentiment: 'positive' | 'neutral' | 'critical';
}

export interface DiscoveredSource {
  id: string;
  platformId: string;
  platformLabel: string;
  url: string;
  verified: boolean;
  isCustom?: boolean;
  nativeScale: NativeScale;
  status: 'discovered' | 'verified' | 'excluded';
  confidence: number; // 0 - 100
  note?: string;
}

export type DataSourceType = 'live_google_places' | 'live_serpapi' | 'simulated' | 'custom_live';

export interface ExtractedSourceData {
  id: string;
  platformId: string;
  platformLabel: string;
  url: string;
  nativeRating: number;
  nativeScale: NativeScale;
  normalizedScore: number; // 0 to 100
  reviewCount: number;
  status: 'success' | 'simulated' | 'error';
  isLive?: boolean;
  dataSourceType?: DataSourceType;
  liveAttribution?: string;
  lastScrapedAt: string;
  latestReviews: ReviewSnippet[];
  sentimentBreakdown: {
    positive: number; // percentage
    neutral: number;
    critical: number;
  };
  weightShare?: number; // % of total weighted score
}

export interface AiStrengthItem {
  title: string;
  description: string;
  category: string;
  quote?: string;
  sources?: string[]; // Platforms where this strength was verified (e.g. Google Maps, TripAdvisor)
}

export interface AiVulnerabilityItem {
  title: string;
  description?: string;
  severity: 'Critical' | 'Moderate' | 'Minor' | 'High' | 'Medium' | 'Low';
  impact: string;
  quote?: string;
  sources?: string[]; // Platforms where this issue was observed
}

export interface AiRecurringTheme {
  theme: string;
  sentiment: 'Positive' | 'Neutral' | 'Negative';
  frequency: string;
  exampleSnippet?: string;
  sources?: string[];
}

export interface AiActionRecommendation {
  priority: 'Immediate' | 'Short-Term' | 'Strategic';
  department: string;
  action: string;
  expectedImpact: string;
}

export interface ReputationAIAnalysis {
  executiveSummary: string;
  overallSentiment: 'Positive' | 'Mixed' | 'Concerning';
  sentimentScore: number; // 0 - 100
  sentimentBreakdown?: {
    positive: number;
    neutral: number;
    critical: number;
  };
  keyStrengths: AiStrengthItem[]; // What to preserve
  criticalAreas: AiVulnerabilityItem[]; // What to improve
  recurringThemes: AiRecurringTheme[];
  actionableRecommendations: AiActionRecommendation[];
  generatedAt: string;
  isLiveAi: boolean;
  modelUsed: string;
}

export interface ApiConfigStatus {
  googlePlacesConfigured: boolean;
  serpApiConfigured: boolean;
  geminiConfigured: boolean;
  liveScrapingEnabled: boolean;
}

export interface ScanSnapshot {
  id: string;
  businessName: string;
  businessLocation?: string;
  businessWebsite?: string;
  category: BusinessCategory;
  timestamp: string; // ISO date string
  overallWeightedScore: number; // 0 - 100
  simpleAverageScore: number; // 0 - 100
  totalReviews: number;
  sources: ExtractedSourceData[];
  aiAnalysis?: ReputationAIAnalysis;
}

export interface HistoricalBusinessData {
  businessKey: string;
  businessName: string;
  businessLocation?: string;
  businessWebsite?: string;
  category: BusinessCategory;
  lastUpdated: string;
  snapshots: ScanSnapshot[];
}

export type ScanStep =
  | 'idle'
  | 'discovering'
  | 'verifying'
  | 'extracting'
  | 'normalizing'
  | 'completed'
  | 'error';

export interface AccessibilitySettings {
  textSize: 'normal' | 'large' | 'xlarge';
  highContrast: boolean;
  highlightControls: boolean;
  reduceMotion: boolean;
}
