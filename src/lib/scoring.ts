import { ExtractedSourceData, NativeScale } from '@/types';

/**
 * Normalizes a raw rating score to a unified 0-100 scale based on the native platform scale.
 * e.g., 4.5/5 -> 90, 8.8/10 -> 88.
 */
export function normalizeRating(rawScore: number, scale: NativeScale): number {
  if (typeof rawScore !== 'number' || isNaN(rawScore)) return 0;

  let normalized = 0;
  switch (scale) {
    case '1-5':
      normalized = (rawScore / 5) * 100;
      break;
    case '1-10':
      normalized = (rawScore / 10) * 100;
      break;
    case '1-100':
      normalized = rawScore;
      break;
    default:
      normalized = (rawScore / 5) * 100;
  }

  return Math.min(100, Math.max(0, Math.round(normalized * 10) / 10));
}

/**
 * Calculates Simple Average and Volume-Weighted Scores across sources.
 */
export function calculateAggregateScores(sources: ExtractedSourceData[]): {
  simpleAverage: number;
  weightedScore: number;
  totalReviews: number;
  enrichedSources: ExtractedSourceData[];
} {
  const validSources = sources.filter(
    (s) => s.status !== 'error' && typeof s.normalizedScore === 'number' && !isNaN(s.normalizedScore)
  );

  if (validSources.length === 0) {
    return {
      simpleAverage: 0,
      weightedScore: 0,
      totalReviews: 0,
      enrichedSources: sources,
    };
  }

  const totalReviews = validSources.reduce((acc, s) => acc + (s.reviewCount || 0), 0);

  // Simple Average
  const sumScores = validSources.reduce((acc, s) => acc + s.normalizedScore, 0);
  const simpleAverage = Math.round((sumScores / validSources.length) * 10) / 10;

  // Volume-Weighted Score
  let weightedScore = simpleAverage;
  if (totalReviews > 0) {
    const sumWeighted = validSources.reduce(
      (acc, s) => acc + s.normalizedScore * (s.reviewCount || 0),
      0
    );
    weightedScore = Math.round((sumWeighted / totalReviews) * 10) / 10;
  }

  // Enrich sources with their percentage weight contribution
  const enrichedSources = sources.map((source) => {
    const weightShare =
      totalReviews > 0 && source.status !== 'error'
        ? Math.round(((source.reviewCount || 0) / totalReviews) * 1000) / 10
        : 0;
    return {
      ...source,
      weightShare,
    };
  });

  return {
    simpleAverage,
    weightedScore,
    totalReviews,
    enrichedSources,
  };
}

export function getScoreBadge(score: number): {
  label: string;
  colorClass: string;
  bgClass: string;
  borderClass: string;
  grade: string;
} {
  if (score >= 90) {
    return {
      label: 'Exceptional',
      grade: 'A+',
      colorClass: 'text-emerald-600 dark:text-emerald-400',
      bgClass: 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300',
      borderClass: 'border-emerald-300 dark:border-emerald-500/30',
    };
  }
  if (score >= 82) {
    return {
      label: 'Strong & Resilient',
      grade: 'A',
      colorClass: 'text-emerald-600 dark:text-emerald-400',
      bgClass: 'bg-emerald-50 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300',
      borderClass: 'border-emerald-200 dark:border-emerald-500/25',
    };
  }
  if (score >= 75) {
    return {
      label: 'Healthy / Moderate',
      grade: 'B+',
      colorClass: 'text-amber-600 dark:text-amber-400',
      bgClass: 'bg-amber-50 text-amber-900 dark:bg-amber-950/50 dark:text-amber-300',
      borderClass: 'border-amber-300 dark:border-amber-500/30',
    };
  }
  if (score >= 65) {
    return {
      label: 'Mixed Feedback',
      grade: 'C',
      colorClass: 'text-amber-600 dark:text-amber-500',
      bgClass: 'bg-amber-50 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
      borderClass: 'border-amber-200 dark:border-amber-500/25',
    };
  }
  return {
    label: 'Reputation Vulnerability',
    grade: 'D',
    colorClass: 'text-rose-600 dark:text-rose-400',
    bgClass: 'bg-rose-50 text-rose-800 dark:bg-rose-950/50 dark:text-rose-300',
    borderClass: 'border-rose-300 dark:border-rose-500/30',
  };
}
