'use client';

import React from 'react';
import { ScanSnapshot } from '@/types';
import { getScoreBadge } from '@/lib/scoring';
import { useLanguage } from '@/context/LanguageContext';
import {
  Award,
  Layers,
  MessageSquare,
  Clock,
  RotateCw,
  Building,
  MapPin,
  Globe,
  Share2,
} from 'lucide-react';

interface KPISummaryHeaderProps {
  snapshot: ScanSnapshot;
  onRerunScan: () => void;
  isScanning?: boolean;
}

export function KPISummaryHeader({
  snapshot,
  onRerunScan,
  isScanning,
}: KPISummaryHeaderProps) {
  const { t, language } = useLanguage();
  const badge = getScoreBadge(snapshot.overallWeightedScore);

  const formattedDate = new Date(snapshot.timestamp).toLocaleString(
    language === 'he' ? 'he-IL' : 'en-US',
    {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }
  );

  return (
    <div className="w-full max-w-7xl mx-auto mb-8">
      {/* Business Meta Banner - Centered on Mobile */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 text-center md:text-start">
        <div className="flex flex-col items-center md:items-start">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-2 flex-wrap">
            <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/30">
              {snapshot.category.toUpperCase()} {t.kpi.dossierTitle}
            </span>
            <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
              <Clock className="w-3.5 h-3.5 mx-1" />
              {t.kpi.lastIndexed}: {formattedDate}
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {snapshot.businessName}
          </h1>

          <div className="flex items-center justify-center md:justify-start gap-4 mt-2 text-xs text-slate-600 dark:text-slate-400 flex-wrap">
            {snapshot.businessLocation && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-500" />
                {snapshot.businessLocation}
              </span>
            )}
            {snapshot.businessWebsite && (
              <a
                href={snapshot.businessWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-amber-600 dark:text-amber-400 hover:underline font-medium"
              >
                <Globe className="w-3.5 h-3.5" />
                {snapshot.businessWebsite.replace(/^https?:\/\//, '')}
              </a>
            )}
          </div>
        </div>

        {/* Action Button - Centered on Mobile */}
        <div className="flex items-center justify-center md:justify-end gap-3 w-full md:w-auto">
          <button
            type="button"
            onClick={onRerunScan}
            disabled={isScanning}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-obsidian-950 font-bold text-xs sm:text-sm shadow-md hover:shadow-amber-500/20 disabled:opacity-50 transition-all"
          >
            <RotateCw className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
            <span>{isScanning ? t.kpi.btnRerunning : t.kpi.btnRerun}</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid - Centered & Balanced on Mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Overall Weighted Score */}
        <div className="relative p-5 rounded-2xl bg-white dark:bg-obsidian-850 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden text-center sm:text-start">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {t.kpi.kpiWeighted}
            </span>
            <div className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${badge.bgClass} ${badge.borderClass}`}>
              {t.kpi.grade} {badge.grade}
            </div>
          </div>

          <div className="mt-3 flex items-baseline justify-center sm:justify-start gap-2">
            <span className="text-4xl sm:text-5xl font-black text-amber-500 dark:text-amber-400 tracking-tight">
              {snapshot.overallWeightedScore.toFixed(1)}
            </span>
            <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
              / 100
            </span>
          </div>

          <div className="mt-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center justify-center sm:justify-start gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            {badge.label}
          </div>

          {/* Progress bar */}
          <div className="mt-3 w-full bg-slate-200 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-amber-500 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, snapshot.overallWeightedScore)}%` }}
            />
          </div>
        </div>

        {/* KPI 2: Simple Average */}
        <div className="p-5 rounded-2xl bg-white dark:bg-obsidian-850 border border-slate-200 dark:border-slate-800 shadow-xl text-center sm:text-start">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {t.kpi.kpiSimple}
            </span>
            <Award className="w-4 h-4 text-slate-400" />
          </div>

          <div className="mt-3 flex items-baseline justify-center sm:justify-start gap-2">
            <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {snapshot.simpleAverageScore.toFixed(1)}
            </span>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              / 100
            </span>
          </div>

          <p className="mt-2 text-xs text-slate-600 dark:text-slate-400">
            {t.kpi.kpiSimpleDesc}
          </p>
        </div>

        {/* KPI 3: Total Reviews */}
        <div className="p-5 rounded-2xl bg-white dark:bg-obsidian-850 border border-slate-200 dark:border-slate-800 shadow-xl text-center sm:text-start">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {t.kpi.kpiReviews}
            </span>
            <MessageSquare className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
          </div>

          <div className="mt-3 flex items-baseline justify-center sm:justify-start gap-2">
            <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {snapshot.totalReviews.toLocaleString()}
            </span>
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              {t.kpi.verified}
            </span>
          </div>

          <p className="mt-2 text-xs text-slate-600 dark:text-slate-400">
            {t.kpi.kpiReviewsDesc}
          </p>
        </div>

        {/* KPI 4: Active Channels */}
        <div className="p-5 rounded-2xl bg-white dark:bg-obsidian-850 border border-slate-200 dark:border-slate-800 shadow-xl text-center sm:text-start">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {t.kpi.kpiChannels}
            </span>
            <Layers className="w-4 h-4 text-amber-500 dark:text-amber-400" />
          </div>

          <div className="mt-3 flex items-baseline justify-center sm:justify-start gap-2">
            <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {snapshot.sources.length}
            </span>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              {t.kpi.platforms}
            </span>
          </div>

          <p className="mt-2 text-xs text-slate-600 dark:text-slate-400">
            {t.kpi.kpiChannelsDesc}
          </p>
        </div>
      </div>
    </div>
  );
}
