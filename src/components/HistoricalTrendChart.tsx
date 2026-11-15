'use client';

import React, { useState, useMemo } from 'react';
import { ScanSnapshot } from '@/types';
import { useThemeAndAccessibility } from '@/context/ThemeAndAccessibilityContext';
import { useLanguage } from '@/context/LanguageContext';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import { TrendingUp, SlidersHorizontal, CheckSquare, Square } from 'lucide-react';

interface HistoricalTrendChartProps {
  snapshots: ScanSnapshot[];
}

const PALETTE = [
  '#F59E0B', // Amber Gold (Overall)
  '#2563EB', // Google Blue
  '#10B981', // Emerald Teal
  '#003580', // Booking Deep Blue
  '#E11D48', // Yelp Red
  '#00B0FF', // Easy Cyan
  '#EC4899', // Pink
  '#8B5CF6', // Purple
  '#14B8A6', // Teal
];

export function HistoricalTrendChart({ snapshots }: HistoricalTrendChartProps) {
  const { accessibility, theme } = useThemeAndAccessibility();
  const { t, language } = useLanguage();

  // Extract all unique platform labels from all snapshots
  const allPlatforms = useMemo(() => {
    const set = new Set<string>();
    snapshots.forEach((snap) => {
      snap.sources.forEach((s) => set.add(s.platformLabel));
    });
    return Array.from(set);
  }, [snapshots]);

  // Active line toggles state (default: overall + first 3 platforms active)
  const [activeLines, setActiveLines] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = { overall: true };
    allPlatforms.forEach((p, idx) => {
      initial[p] = idx < 4; // enable up to 4 by default
    });
    return initial;
  });

  const toggleLine = (key: string) => {
    setActiveLines((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const toggleAll = (enable: boolean) => {
    const updated: Record<string, boolean> = { overall: enable };
    allPlatforms.forEach((p) => {
      updated[p] = enable;
    });
    setActiveLines(updated);
  };

  // Transform snapshot data for Recharts
  const chartData = useMemo(() => {
    return snapshots.map((snap) => {
      const date = new Date(snap.timestamp);
      const formattedDate = date.toLocaleDateString(language === 'he' ? 'he-IL' : 'en-US', {
        month: 'short',
        day: 'numeric',
      });

      const entry: Record<string, any> = {
        date: formattedDate,
        fullDate: snap.timestamp,
        overall: snap.overallWeightedScore,
        simpleAvg: snap.simpleAverageScore,
      };

      snap.sources.forEach((s) => {
        entry[s.platformLabel] = s.normalizedScore;
      });

      return entry;
    });
  }, [snapshots, language]);

  const isDark = theme === 'dark';
  const gridColor = isDark ? '#1F2937' : '#E2E8F0';
  const textColor = isDark ? '#9CA3AF' : '#475569';

  return (
    <div className="w-full max-w-7xl mx-auto mb-8">
      <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-obsidian-850 border border-slate-200 dark:border-slate-800 shadow-xl">
        {/* Header & Controls - Centered on Mobile */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800 text-center lg:text-start">
          <div className="flex flex-col items-center lg:items-start">
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-1">
              <TrendingUp className="w-4 h-4 text-amber-500" />
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                {t.trend.title}
              </h2>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              {t.trend.subtitle}
            </p>
          </div>

          <div className="flex items-center justify-center lg:justify-end gap-2">
            <button
              type="button"
              onClick={() => toggleAll(true)}
              className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-obsidian-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold border border-slate-300 dark:border-slate-700 transition-colors shadow-sm"
            >
              {t.trend.btnSelectAll}
            </button>
            <button
              type="button"
              onClick={() => toggleAll(false)}
              className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-obsidian-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold border border-slate-300 dark:border-slate-700 transition-colors shadow-sm"
            >
              {t.trend.btnClear}
            </button>
          </div>
        </div>

        {/* Source Toggle Controls (Pills) - Centered on Mobile */}
        <div className="my-4 flex flex-wrap items-center justify-center lg:justify-start gap-2">
          <span className="text-xs font-bold text-slate-600 dark:text-slate-400 me-1 flex items-center gap-1 w-full lg:w-auto text-center justify-center lg:justify-start mb-1 lg:mb-0">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            {t.trend.toggleSeries}
          </span>

          {/* Overall Weighted Score Pill */}
          <button
            type="button"
            onClick={() => toggleLine('overall')}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border transition-all ${
              activeLines['overall']
                ? 'bg-amber-100 dark:bg-amber-500/15 border-amber-400 dark:border-amber-500 text-amber-900 dark:text-amber-400 shadow-sm'
                : 'bg-slate-100 dark:bg-obsidian-900 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            {t.trend.overallSeries}
          </button>

          {/* Individual Platform Pills */}
          {allPlatforms.map((platform, idx) => {
            const color = PALETTE[(idx + 1) % PALETTE.length];
            const isActive = !!activeLines[platform];

            return (
              <button
                key={platform}
                type="button"
                onClick={() => toggleLine(platform)}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
                  isActive
                    ? 'bg-slate-100 dark:bg-obsidian-800 border-slate-400 dark:border-slate-600 text-slate-900 dark:text-slate-200 shadow-sm'
                    : 'bg-slate-50 dark:bg-obsidian-900 border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-500 opacity-60'
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: color }}
                />
                {platform}
              </button>
            );
          })}
        </div>

        {/* Recharts Line Chart */}
        <div className="w-full h-72 sm:h-84 mt-2">
          {chartData.length === 0 ? (
            <div className="w-full h-full flex items-center justify-center text-slate-500 text-sm">
              {t.trend.noSnapshots}
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{ top: 10, right: 20, left: -10, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                <XAxis
                  dataKey="date"
                  stroke={textColor}
                  fontSize={11}
                  tickLine={false}
                  axisLine={{ stroke: gridColor }}
                />
                <YAxis
                  domain={[60, 100]}
                  stroke={textColor}
                  fontSize={11}
                  tickLine={false}
                  axisLine={{ stroke: gridColor }}
                  tickFormatter={(val) => `${val}`}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="p-3 rounded-xl bg-white dark:bg-obsidian-900 border border-slate-200 dark:border-slate-700 shadow-2xl text-xs space-y-1">
                          <div className="font-bold text-slate-900 dark:text-white pb-1 border-b border-slate-200 dark:border-slate-800">
                            {t.trend.snapshotLabel}: {label}
                          </div>
                          {payload.map((entry: any, i: number) => (
                            <div key={i} className="flex items-center justify-between gap-4">
                              <span
                                className="flex items-center gap-1.5"
                                style={{ color: entry.color }}
                              >
                                <span
                                  className="w-2 h-2 rounded-full"
                                  style={{ backgroundColor: entry.color }}
                                />
                                {entry.name === 'overall' || entry.name === 'Overall Weighted Score'
                                  ? t.trend.overallSeries
                                  : entry.name}:
                              </span>
                              <span className="font-mono font-bold text-slate-900 dark:text-white">
                                {Number(entry.value).toFixed(1)}
                              </span>
                            </div>
                          ))}
                        </div>
                      );
                    }
                    return null;
                  }}
                />

                {/* Overall Score Line */}
                {activeLines['overall'] && (
                  <Line
                    type="monotone"
                    dataKey="overall"
                    name={t.trend.overallSeries}
                    stroke="#F59E0B"
                    strokeWidth={3}
                    dot={{ fill: '#F59E0B', r: 4, strokeWidth: 2, stroke: isDark ? '#0B0F14' : '#FFFFFF' }}
                    activeDot={{ r: 6, fill: '#FBBF24' }}
                    isAnimationActive={!accessibility.reduceMotion}
                  />
                )}

                {/* Individual Platform Lines */}
                {allPlatforms.map((platform, idx) => {
                  if (!activeLines[platform]) return null;
                  const color = PALETTE[(idx + 1) % PALETTE.length];

                  return (
                    <Line
                      key={platform}
                      type="monotone"
                      dataKey={platform}
                      name={platform}
                      stroke={color}
                      strokeWidth={1.75}
                      strokeDasharray="4 2"
                      dot={{ fill: color, r: 3 }}
                      activeDot={{ r: 5 }}
                      isAnimationActive={!accessibility.reduceMotion}
                    />
                  );
                })}
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}
