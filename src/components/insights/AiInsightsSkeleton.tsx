'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export function AiInsightsSkeleton() {
  const { t } = useLanguage();

  return (
    <div className="w-full max-w-7xl mx-auto mb-10">
      <div className="rounded-2xl bg-obsidian-850 dark:bg-obsidian-850 light:bg-white border border-slate-700/80 dark:border-slate-700/80 light:border-slate-200 shadow-2xl p-6 sm:p-8 overflow-hidden relative animate-pulse">
        {/* Shimmer backdrop */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800 dark:border-slate-800 light:border-slate-200">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 animate-spin" />
                {t.ai.badge}
              </span>
              <div className="h-5 w-32 bg-slate-800 dark:bg-slate-800 light:bg-slate-200 rounded-full" />
            </div>
            <div className="h-7 w-72 sm:w-96 bg-slate-800 dark:bg-slate-800 light:bg-slate-200 rounded-lg" />
            <div className="h-4 w-60 sm:w-80 bg-slate-800/60 dark:bg-slate-800/60 light:bg-slate-200/60 rounded" />
          </div>
          <div className="h-9 w-36 bg-slate-800 dark:bg-slate-800 light:bg-slate-200 rounded-xl" />
        </div>

        {/* Executive summary skeleton */}
        <div className="my-6 p-5 sm:p-6 rounded-xl bg-obsidian-900/90 dark:bg-obsidian-900/90 light:bg-slate-50 border-s-4 border-s-amber-500 border border-slate-800 dark:border-slate-800 light:border-slate-200 space-y-3">
          <div className="flex items-center justify-between">
            <div className="h-4 w-40 bg-amber-500/20 rounded" />
            <div className="h-5 w-24 bg-slate-800 dark:bg-slate-800 light:bg-slate-200 rounded-full" />
          </div>
          <div className="space-y-2">
            <div className="h-4 w-full bg-slate-800/80 dark:bg-slate-800/80 light:bg-slate-200 rounded" />
            <div className="h-4 w-11/12 bg-slate-800/80 dark:bg-slate-800/80 light:bg-slate-200 rounded" />
            <div className="h-4 w-4/5 bg-slate-800/80 dark:bg-slate-800/80 light:bg-slate-200 rounded" />
          </div>
          {/* Segmented bar skeleton */}
          <div className="h-3 w-full bg-slate-800 dark:bg-slate-800 light:bg-slate-200 rounded-full mt-3" />
        </div>

        {/* Action recommendations skeleton grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="p-5 rounded-xl bg-obsidian-900/70 dark:bg-obsidian-900/70 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200 space-y-3"
            >
              <div className="flex justify-between items-center">
                <div className="h-4 w-16 bg-slate-800 dark:bg-slate-800 light:bg-slate-200 rounded-full" />
                <div className="h-4 w-20 bg-slate-800 dark:bg-slate-800 light:bg-slate-200 rounded" />
              </div>
              <div className="h-5 w-4/5 bg-slate-800 dark:bg-slate-800 light:bg-slate-200 rounded" />
              <div className="h-10 w-full bg-slate-800/50 dark:bg-slate-800/50 light:bg-slate-200/50 rounded" />
            </div>
          ))}
        </div>

        {/* Two-column comparison grid skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-5 rounded-xl bg-obsidian-900/50 dark:bg-obsidian-900/50 light:bg-slate-50 border border-emerald-500/20 space-y-3">
            <div className="h-5 w-44 bg-emerald-500/20 rounded" />
            <div className="h-16 w-full bg-slate-800/60 dark:bg-slate-800/60 light:bg-slate-200 rounded-lg" />
            <div className="h-16 w-full bg-slate-800/60 dark:bg-slate-800/60 light:bg-slate-200 rounded-lg" />
          </div>
          <div className="p-5 rounded-xl bg-obsidian-900/50 dark:bg-obsidian-900/50 light:bg-slate-50 border border-rose-500/20 space-y-3">
            <div className="h-5 w-44 bg-rose-500/20 rounded" />
            <div className="h-16 w-full bg-slate-800/60 dark:bg-slate-800/60 light:bg-slate-200 rounded-lg" />
            <div className="h-16 w-full bg-slate-800/60 dark:bg-slate-800/60 light:bg-slate-200 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}
