'use client';

import React, { useState, useEffect } from 'react';
import { ApiConfigStatus } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import {
  ShieldCheck,
  Key,
  Globe,
  CheckCircle2,
  AlertCircle,
  X,
  ExternalLink,
  RefreshCw,
  Cpu,
} from 'lucide-react';

interface ApiConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ApiConfigModal({ isOpen, onClose }: ApiConfigModalProps) {
  const { t } = useLanguage();
  const [config, setConfig] = useState<ApiConfigStatus | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchStatus = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/status');
      if (res.ok) {
        const data = await res.json();
        setConfig(data);
      }
    } catch (e) {
      console.error('Failed to fetch status:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchStatus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="api-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-950/80 backdrop-blur-sm"
    >
      <div className="relative w-full max-w-xl rounded-2xl bg-obsidian-850 dark:bg-obsidian-850 light:bg-white border border-slate-700/80 dark:border-slate-700/80 light:border-slate-200 shadow-2xl p-6 text-slate-100 dark:text-slate-100 light:text-slate-900 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 dark:border-slate-800 light:border-slate-200">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h2 id="api-modal-title" className="text-base sm:text-lg font-bold">
                {t.apiModal.title}
              </h2>
              <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-500">
                {t.apiModal.subtitle}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.a11y.close}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white dark:hover:text-white light:hover:text-slate-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="mt-5 space-y-4 text-xs sm:text-sm">
          {/* Master Switch Status */}
          <div className="p-3.5 rounded-xl bg-obsidian-900/80 dark:bg-obsidian-900/80 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <span className="font-semibold text-white dark:text-white light:text-slate-900">
                  {t.apiModal.liveEngine}
                </span>
                <p className="text-[11px] text-slate-400">
                  {t.apiModal.controlledBy} <code className="text-amber-400">ENABLE_LIVE_SCRAPING</code> in .env.local
                </p>
              </div>
            </div>
            <span
              className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                config?.liveScrapingEnabled !== false
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                  : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
              }`}
            >
              {config?.liveScrapingEnabled !== false ? t.apiModal.active : t.apiModal.disabled}
            </span>
          </div>

          {/* Provider 1: Google Places API (New) */}
          <div className="p-4 rounded-xl bg-obsidian-900/80 dark:bg-obsidian-900/80 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                <span className="font-bold text-white dark:text-white light:text-slate-900">
                  {t.apiModal.googlePlacesTitle}
                </span>
              </div>
              {config?.googlePlacesConfigured ? (
                <span className="flex items-center gap-1 text-xs font-semibold text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {t.apiModal.connected}
                </span>
              ) : (
                <span className="flex items-center gap-1 text-xs font-medium text-amber-400">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {t.apiModal.fallbackActive}
                </span>
              )}
            </div>
            <p className="mt-2 text-xs text-slate-400 dark:text-slate-400 light:text-slate-600">
              {t.apiModal.googlePlacesDesc}
            </p>
            <div className="mt-2.5 flex items-center justify-between text-[11px] font-mono text-slate-500">
              <span>Variable: GOOGLE_PLACES_API_KEY</span>
              <a
                href="https://developers.google.com/maps/documentation/places/web-service/overview"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 hover:underline flex items-center gap-0.5"
              >
                {t.apiModal.docs} <ExternalLink className="w-2.5 h-2.5 ms-0.5" />
              </a>
            </div>
          </div>

          {/* Provider 2: SerpApi */}
          <div className="p-4 rounded-xl bg-obsidian-900/80 dark:bg-obsidian-900/80 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="font-bold text-white dark:text-white light:text-slate-900">
                  {t.apiModal.serpApiTitle}
                </span>
              </div>
              {config?.serpApiConfigured ? (
                <span className="flex items-center gap-1 text-xs font-semibold text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {t.apiModal.connected}
                </span>
              ) : (
                <span className="flex items-center gap-1 text-xs font-medium text-amber-400">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {t.apiModal.fallbackActive}
                </span>
              )}
            </div>
            <p className="mt-2 text-xs text-slate-400 dark:text-slate-400 light:text-slate-600">
              {t.apiModal.serpApiDesc}
            </p>
            <div className="mt-2.5 flex items-center justify-between text-[11px] font-mono text-slate-500">
              <span>Variable: SERPAPI_API_KEY</span>
              <a
                href="https://serpapi.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 hover:underline flex items-center gap-0.5"
              >
                {t.apiModal.docs} <ExternalLink className="w-2.5 h-2.5 ms-0.5" />
              </a>
            </div>
          </div>

          {/* Provider 3: Google Gemini API */}
          <div className="p-4 rounded-xl bg-obsidian-900/80 dark:bg-obsidian-900/80 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span className="font-bold text-white dark:text-white light:text-slate-900">
                  {t.apiModal.geminiTitle}
                </span>
              </div>
              {config?.geminiConfigured ? (
                <span className="flex items-center gap-1 text-xs font-semibold text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {t.apiModal.connected}
                </span>
              ) : (
                <span className="flex items-center gap-1 text-xs font-medium text-amber-400">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {t.apiModal.fallbackActive}
                </span>
              )}
            </div>
            <p className="mt-2 text-xs text-slate-400 dark:text-slate-400 light:text-slate-600">
              {t.apiModal.geminiDesc}
            </p>
            <div className="mt-2.5 flex items-center justify-between text-[11px] font-mono text-slate-500">
              <span>Variable: GEMINI_API_KEY</span>
              <a
                href="https://ai.google.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 hover:underline flex items-center gap-0.5"
              >
                {t.apiModal.docs} <ExternalLink className="w-2.5 h-2.5 ms-0.5" />
              </a>
            </div>
          </div>

          {/* Graceful Fallback Guarantee Notice */}
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs">
            <span className="font-semibold">{t.apiModal.fallbackNoticeTitle}:</span> {t.apiModal.fallbackNoticeDesc}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-6 pt-4 border-t border-slate-800 dark:border-slate-800 light:border-slate-200 flex items-center justify-between">
          <button
            type="button"
            onClick={fetchStatus}
            disabled={loading}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 dark:border-slate-700 light:border-slate-300 text-xs text-slate-300 dark:text-slate-300 light:text-slate-700 hover:bg-slate-800"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            {t.apiModal.btnRefresh}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-obsidian-950 font-bold text-xs"
          >
            {t.apiModal.btnDone}
          </button>
        </div>
      </div>
    </div>
  );
}
