'use client';

import React, { useState } from 'react';
import { Search, MapPin, Globe, Sparkles, Building2, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface SearchInputProps {
  onStartScan: (params: { businessName: string; location?: string; website?: string }) => void;
  isLoading?: boolean;
}

export function SearchInput({ onStartScan, isLoading }: SearchInputProps) {
  const { t, dir } = useLanguage();
  const [activeTab, setActiveTab] = useState<'name_loc' | 'url'>('name_loc');
  const [businessName, setBusinessName] = useState('');
  const [location, setLocation] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'name_loc') {
      if (!businessName.trim()) return;
      onStartScan({
        businessName: businessName.trim(),
        location: location.trim() || undefined,
      });
    } else {
      if (!websiteUrl.trim()) return;
      let derivedName = websiteUrl
        .replace(/^https?:\/\//, '')
        .replace(/^www\./, '')
        .split('/')[0]
        .split('.')[0];
      derivedName = derivedName.charAt(0).toUpperCase() + derivedName.slice(1);

      onStartScan({
        businessName: derivedName,
        website: websiteUrl.trim(),
      });
    }
  };

  const handleQuickSample = (name: string, loc?: string, site?: string) => {
    setActiveTab('name_loc');
    setBusinessName(name);
    setLocation(loc || '');
    if (site) setWebsiteUrl(site);
    onStartScan({ businessName: name, location: loc, website: site });
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Container Card */}
      <div className="relative rounded-2xl bg-white dark:bg-obsidian-850 border border-slate-200 dark:border-slate-800 shadow-xl p-6 sm:p-8 overflow-hidden">
        {/* Subtle decorative gradient flare */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header Text */}
        <div className="text-center max-w-2xl mx-auto mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 text-xs font-bold tracking-wide uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            {t.search.badge}
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {t.search.heading}
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            {t.search.subtitle}
          </p>
        </div>

        {/* Input Mode Selector Tabs */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex p-1 rounded-xl bg-slate-100 dark:bg-obsidian-900 border border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setActiveTab('name_loc')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'name_loc'
                  ? 'bg-amber-500 text-obsidian-950 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Building2 className="w-4 h-4" />
              {t.search.tabNameLoc}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('url')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'url'
                  ? 'bg-amber-500 text-obsidian-950 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Globe className="w-4 h-4" />
              {t.search.tabUrl}
            </button>
          </div>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {activeTab === 'name_loc' ? (
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
              <div className="sm:col-span-7 relative">
                <div className="absolute inset-y-0 start-0 ps-3.5 flex items-center pointer-events-none text-slate-400">
                  <Search className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder={t.search.placeholderName}
                  className="w-full ps-10 pe-4 py-3 rounded-xl bg-slate-50 dark:bg-obsidian-900 border border-slate-300 dark:border-slate-700/80 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all"
                />
              </div>
              <div className="sm:col-span-5 relative">
                <div className="absolute inset-y-0 start-0 ps-3.5 flex items-center pointer-events-none text-slate-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder={t.search.placeholderLoc}
                  className="w-full ps-10 pe-4 py-3 rounded-xl bg-slate-50 dark:bg-obsidian-900 border border-slate-300 dark:border-slate-700/80 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all"
                />
              </div>
            </div>
          ) : (
            <div className="relative">
              <div className="absolute inset-y-0 start-0 ps-3.5 flex items-center pointer-events-none text-slate-400">
                <Globe className="w-4 h-4" />
              </div>
              <input
                type="url"
                required
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                placeholder={t.search.placeholderUrl}
                className="w-full ps-10 pe-4 py-3 rounded-xl bg-slate-50 dark:bg-obsidian-900 border border-slate-300 dark:border-slate-700/80 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all"
              />
            </div>
          )}

          {/* Submit Action Button - Full width on Mobile */}
          <div className="flex items-center justify-center sm:justify-end pt-1">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-obsidian-950 font-bold text-sm shadow-md hover:shadow-amber-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-obsidian-950 border-t-transparent rounded-full animate-spin" />
                  <span>{t.search.btnDiscovering}</span>
                </>
              ) : (
                <>
                  <span>{t.search.btnDiscover}</span>
                  <ArrowRight className={`w-4 h-4 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Suggested Quick Exploration Chips - Centered on Mobile */}
        <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800/80">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs text-center">
            <span className="text-slate-500 dark:text-slate-400 font-semibold w-full sm:w-auto text-center sm:text-start mb-1 sm:mb-0">
              {t.search.popularPresets}
            </span>
            <button
              type="button"
              onClick={() => handleQuickSample('Royal Beach Hotel Eilat', 'Eilat, Israel')}
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-amber-50 dark:bg-obsidian-900/80 dark:hover:bg-amber-500/10 border border-slate-200 dark:border-slate-700/60 hover:border-amber-500/40 text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 font-medium transition-colors"
            >
              {t.search.sampleRoyalBeach}
            </button>
            <button
              type="button"
              onClick={() => handleQuickSample('Machneyuda Restaurant', 'Jerusalem, Israel')}
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-amber-50 dark:bg-obsidian-900/80 dark:hover:bg-amber-500/10 border border-slate-200 dark:border-slate-700/60 hover:border-amber-500/40 text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 font-medium transition-colors"
            >
              {t.search.sampleMachneyuda}
            </button>
            <button
              type="button"
              onClick={() => handleQuickSample('The Norman', 'Tel Aviv, Israel')}
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-amber-50 dark:bg-obsidian-900/80 dark:hover:bg-amber-500/10 border border-slate-200 dark:border-slate-700/60 hover:border-amber-500/40 text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 font-medium transition-colors"
            >
              {t.search.sampleNorman}
            </button>
            <button
              type="button"
              onClick={() => handleQuickSample('Monday.com HQ', 'Tel Aviv', 'https://monday.com')}
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-amber-50 dark:bg-obsidian-900/80 dark:hover:bg-amber-500/10 border border-slate-200 dark:border-slate-700/60 hover:border-amber-500/40 text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 font-medium transition-colors"
            >
              {t.search.sampleMonday}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
