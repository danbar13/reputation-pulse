'use client';

import React, { useState } from 'react';
import { ExtractedSourceData } from '@/types';
import { getPlatformMeta } from '@/lib/constants';
import { getScoreBadge } from '@/lib/scoring';
import { useLanguage } from '@/context/LanguageContext';
import {
  ExternalLink,
  MessageSquare,
  ThumbsUp,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Star,
  Sparkles,
} from 'lucide-react';

interface SourceBreakdownGridProps {
  sources: ExtractedSourceData[];
}

export function SourceBreakdownGrid({ sources }: SourceBreakdownGridProps) {
  const { t, language } = useLanguage();
  const [expandedReviews, setExpandedReviews] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedReviews((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="w-full max-w-7xl mx-auto mb-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white dark:text-white light:text-slate-900 tracking-tight">
            {t.sources.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 dark:text-slate-400 light:text-slate-500 mt-1">
            {t.sources.subtitle}
          </p>
        </div>
        <div className="text-xs font-semibold px-3 py-1 rounded-full bg-obsidian-850 dark:bg-obsidian-850 light:bg-slate-100 border border-slate-700 dark:border-slate-700 light:border-slate-300 text-slate-300 dark:text-slate-300 light:text-slate-700">
          {sources.length} {t.sources.activeChannelsBadge}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {sources.map((source) => {
          const meta = getPlatformMeta(source.platformId, source.platformLabel);
          const badge = getScoreBadge(source.normalizedScore);
          const isExpanded = !!expandedReviews[source.id];

          return (
            <div
              key={source.id}
              className="flex flex-col rounded-2xl bg-obsidian-850 dark:bg-obsidian-850 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 shadow-xl overflow-hidden hover:border-slate-700 transition-all duration-200"
            >
              {/* Card Header */}
              <div className="p-5 pb-4 border-b border-slate-800/80 dark:border-slate-800/80 light:border-slate-200">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: meta.color }}
                      />
                      <h3 className="font-bold text-base text-white dark:text-white light:text-slate-900 truncate">
                        {source.platformLabel}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <span className="text-[11px] text-slate-400 dark:text-slate-400 light:text-slate-500 truncate">
                        {meta.domain}
                      </span>
                      {source.isLive ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          {source.liveAttribution || (language === 'he' ? 'חיבור חי' : 'Live API')}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-800 dark:bg-slate-800 light:bg-slate-200 text-slate-400 dark:text-slate-400 light:text-slate-600 border border-slate-700/60 dark:border-slate-700/60 light:border-slate-300">
                          {t.sources.smartFallback}
                        </span>
                      )}
                    </div>
                  </div>

                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-obsidian-900 dark:bg-obsidian-900 light:bg-slate-100 hover:bg-amber-500/10 text-amber-400 border border-slate-700/60 dark:border-slate-700/60 light:border-slate-300 hover:border-amber-500/40 transition-colors shrink-0"
                  >
                    <span>{t.sources.btnViewReviews}</span>
                    <ExternalLink className="w-3 h-3 ms-1" />
                  </a>
                </div>

                {/* Score & Native Rating Block */}
                <div className="mt-4 grid grid-cols-2 gap-3 p-3 rounded-xl bg-obsidian-900/80 dark:bg-obsidian-900/80 light:bg-slate-50 border border-slate-800/80 dark:border-slate-800/80 light:border-slate-200">
                  {/* Normalized Score */}
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-slate-400 dark:text-slate-400 light:text-slate-500">
                      {t.sources.labelNormalized}
                    </span>
                    <div className="flex items-baseline gap-1 mt-0.5">
                      <span className="text-2xl font-black text-amber-400">
                        {source.normalizedScore.toFixed(1)}
                      </span>
                      <span className="text-xs text-slate-400">/ 100</span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-400">
                      {t.kpi.grade} {badge.grade}
                    </span>
                  </div>

                  {/* Native Rating */}
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-slate-400 dark:text-slate-400 light:text-slate-500">
                      {t.sources.labelNative}
                    </span>
                    <div className="flex items-baseline gap-1 mt-0.5">
                      <span className="text-xl font-bold text-white dark:text-white light:text-slate-900">
                        {source.nativeRating.toFixed(1)}
                      </span>
                      <span className="text-xs text-slate-400">
                        ({source.nativeScale})
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400">
                      {source.reviewCount.toLocaleString(language === 'he' ? 'he-IL' : 'en-US')} {language === 'he' ? 'ביקורות' : 'reviews'}
                    </span>
                  </div>
                </div>

                {/* Volume Weight Share */}
                {typeof source.weightShare === 'number' && (
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-xs text-slate-400 dark:text-slate-400 light:text-slate-500 mb-1">
                      <span>{t.sources.weightShare}</span>
                      <span className="font-semibold text-slate-200 dark:text-slate-200 light:text-slate-800">
                        {source.weightShare}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-800 dark:bg-slate-800 light:bg-slate-200 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-amber-400 h-1.5 rounded-full"
                        style={{ width: `${Math.min(100, source.weightShare)}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Sentiment Ratio Bar */}
              <div className="px-5 py-3 bg-obsidian-900/40 dark:bg-obsidian-900/40 light:bg-slate-50/50 border-b border-slate-800/80 dark:border-slate-800/80 light:border-slate-200">
                <div className="flex items-center justify-between text-[11px] mb-1.5 font-medium">
                  <span className="text-emerald-400 flex items-center gap-1">
                    <ThumbsUp className="w-3 h-3" />
                    {source.sentimentBreakdown.positive}% {t.sources.positive}
                  </span>
                  <span className="text-slate-400">
                    {source.sentimentBreakdown.neutral}% {t.sources.neutral}
                  </span>
                  <span className="text-rose-400 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    {source.sentimentBreakdown.critical}% {t.sources.critical}
                  </span>
                </div>
                <div className="flex h-1.5 w-full rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-500"
                    style={{ width: `${source.sentimentBreakdown.positive}%` }}
                  />
                  <div
                    className="bg-slate-600"
                    style={{ width: `${source.sentimentBreakdown.neutral}%` }}
                  />
                  <div
                    className="bg-rose-500"
                    style={{ width: `${source.sentimentBreakdown.critical}%` }}
                  />
                </div>
              </div>

              {/* Review Snippets */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-xs font-semibold text-slate-300 dark:text-slate-300 light:text-slate-700 flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
                      {t.sources.recentSnippets}
                    </div>
                    {source.latestReviews.length > 1 && (
                      <button
                        type="button"
                        onClick={() => toggleExpand(source.id)}
                        className="text-[11px] text-amber-400 hover:underline flex items-center gap-0.5"
                      >
                        {isExpanded ? (
                          <>
                            {t.sources.showLess} <ChevronUp className="w-3 h-3 ms-0.5" />
                          </>
                        ) : (
                          <>
                            {t.sources.viewAll} ({source.latestReviews.length}){' '}
                            <ChevronDown className="w-3 h-3 ms-0.5" />
                          </>
                        )}
                      </button>
                    )}
                  </div>

                  <div className="space-y-2.5">
                    {(isExpanded
                      ? source.latestReviews
                      : source.latestReviews.slice(0, 1)
                    ).map((rev) => (
                      <div
                        key={rev.id}
                        className="p-3 rounded-xl bg-obsidian-900/60 dark:bg-obsidian-900/60 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200 text-xs"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-slate-200 dark:text-slate-200 light:text-slate-800">
                            {rev.author}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            {rev.date}
                          </span>
                        </div>
                        <p className="text-slate-300 dark:text-slate-300 light:text-slate-600 italic line-clamp-3">
                          &quot;{rev.text}&quot;
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/60 dark:border-slate-800/60 light:border-slate-200 flex items-center justify-between text-[11px] text-slate-400">
                  <span>
                    {t.sources.indexed}: {new Date(source.lastScrapedAt).toLocaleTimeString(language === 'he' ? 'he-IL' : 'en-US')}
                  </span>
                  {source.isLive ? (
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      {t.sources.liveVerified}
                    </span>
                  ) : (
                    <span className="text-slate-400 font-medium">{t.sources.smartFallback}</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
