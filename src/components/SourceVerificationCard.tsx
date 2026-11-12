'use client';

import React, { useState } from 'react';
import { DiscoveredSource, NativeScale } from '@/types';
import { getPlatformMeta, SUPPORTED_PLATFORMS } from '@/lib/constants';
import { useLanguage } from '@/context/LanguageContext';
import {
  Check,
  Plus,
  Trash2,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Edit2,
  AlertCircle,
  ArrowRight,
  Globe,
  Sliders,
} from 'lucide-react';

interface SourceVerificationCardProps {
  businessName: string;
  sources: DiscoveredSource[];
  onConfirmSources: (sources: DiscoveredSource[]) => void;
  onCancel?: () => void;
  isExtracting?: boolean;
}

export function SourceVerificationCard({
  businessName,
  sources: initialSources,
  onConfirmSources,
  onCancel,
  isExtracting,
}: SourceVerificationCardProps) {
  const { t, dir } = useLanguage();
  const [sources, setSources] = useState<DiscoveredSource[]>(initialSources);
  const [isAddingCustom, setIsAddingCustom] = useState(false);

  // New custom source form state
  const [customLabel, setCustomLabel] = useState('');
  const [customUrl, setCustomUrl] = useState('');
  const [customScale, setCustomScale] = useState<NativeScale>('1-5');
  const [formError, setFormError] = useState('');

  // Editing state for an existing source URL
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedUrl, setEditedUrl] = useState('');

  const handleToggleVerified = (id: string) => {
    setSources((prev) =>
      prev.map((s) => (s.id === id ? { ...s, verified: !s.verified } : s))
    );
  };

  const handleRemoveSource = (id: string) => {
    setSources((prev) => prev.filter((s) => s.id !== id));
  };

  const handleScaleChange = (id: string, scale: NativeScale) => {
    setSources((prev) =>
      prev.map((s) => (s.id === id ? { ...s, nativeScale: scale } : s))
    );
  };

  const startEditUrl = (source: DiscoveredSource) => {
    setEditingId(source.id);
    setEditedUrl(source.url);
  };

  const saveEditedUrl = (id: string) => {
    setSources((prev) =>
      prev.map((s) => (s.id === id ? { ...s, url: editedUrl } : s))
    );
    setEditingId(null);
  };

  const handleAddCustomSource = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customLabel.trim()) {
      setFormError(t.verification.errorLabel);
      return;
    }
    if (!customUrl.trim() || !customUrl.startsWith('http')) {
      setFormError(t.verification.errorUrl);
      return;
    }

    const newSource: DiscoveredSource = {
      id: `custom_${Date.now()}`,
      platformId: `custom_${customLabel.toLowerCase().replace(/\s+/g, '_')}`,
      platformLabel: customLabel.trim(),
      url: customUrl.trim(),
      verified: true,
      isCustom: true,
      nativeScale: customScale,
      status: 'verified',
      confidence: 100,
      note: 'User-specified custom verification source.',
    };

    setSources((prev) => [...prev, newSource]);
    setCustomLabel('');
    setCustomUrl('');
    setCustomScale('1-5');
    setFormError('');
    setIsAddingCustom(false);
  };

  const activeCount = sources.filter((s) => s.verified).length;

  return (
    <div className="w-full max-w-4xl mx-auto my-6">
      <div className="rounded-2xl bg-obsidian-850 dark:bg-obsidian-850 light:bg-white border border-slate-700/80 dark:border-slate-700/80 light:border-slate-200 shadow-2xl p-6 sm:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800 dark:border-slate-800 light:border-slate-200">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              {t.verification.badge}
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white dark:text-white light:text-slate-900">
              {t.verification.title} &quot;{businessName}&quot;
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 dark:text-slate-400 light:text-slate-600 mt-1">
              {t.verification.subtitle}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsAddingCustom((prev) => !prev)}
            className="inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-obsidian-800 dark:bg-obsidian-800 light:bg-slate-100 hover:bg-slate-700/50 dark:hover:bg-slate-700/50 light:hover:bg-slate-200 border border-slate-700 dark:border-slate-700 light:border-slate-300 text-amber-400 font-semibold text-xs transition-colors shrink-0"
          >
            <Plus className="w-4 h-4" />
            {t.verification.btnAddCustom}
          </button>
        </div>

        {/* Add Custom Source Card / Form */}
        {isAddingCustom && (
          <form
            onSubmit={handleAddCustomSource}
            className="my-5 p-5 rounded-xl bg-obsidian-900/90 dark:bg-obsidian-900/90 light:bg-amber-50/50 border border-amber-500/40 shadow-inner"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-sm font-bold text-amber-400">
                <Sparkles className="w-4 h-4" />
                {t.verification.customTitle}
              </div>
              <button
                type="button"
                onClick={() => setIsAddingCustom(false)}
                className="text-slate-400 hover:text-white dark:hover:text-white light:hover:text-slate-900 text-xs"
              >
                {t.verification.btnCancel}
              </button>
            </div>

            {formError && (
              <div className="mb-3 p-2 rounded bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {formError}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
              <div className="sm:col-span-4">
                <label className="block text-xs font-medium text-slate-300 dark:text-slate-300 light:text-slate-700 mb-1">
                  {t.verification.customLabel}
                </label>
                <input
                  type="text"
                  required
                  placeholder={t.verification.customLabelPlaceholder}
                  value={customLabel}
                  onChange={(e) => setCustomLabel(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-obsidian-850 dark:bg-obsidian-850 light:bg-white border border-slate-700 dark:border-slate-700 light:border-slate-300 text-white dark:text-white light:text-slate-900 text-xs focus:ring-1 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-5">
                <label className="block text-xs font-medium text-slate-300 dark:text-slate-300 light:text-slate-700 mb-1">
                  {t.verification.customUrl}
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://..."
                  value={customUrl}
                  onChange={(e) => setCustomUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-obsidian-850 dark:bg-obsidian-850 light:bg-white border border-slate-700 dark:border-slate-700 light:border-slate-300 text-white dark:text-white light:text-slate-900 text-xs focus:ring-1 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-3">
                <label className="block text-xs font-medium text-slate-300 dark:text-slate-300 light:text-slate-700 mb-1">
                  {t.verification.customScale}
                </label>
                <select
                  value={customScale}
                  onChange={(e) => setCustomScale(e.target.value as NativeScale)}
                  className="w-full px-3 py-2 rounded-lg bg-obsidian-850 dark:bg-obsidian-850 light:bg-white border border-slate-700 dark:border-slate-700 light:border-slate-300 text-white dark:text-white light:text-slate-900 text-xs focus:ring-1 focus:ring-amber-500 focus:outline-none"
                >
                  <option value="1-5">{t.verification.scale1_5}</option>
                  <option value="1-10">{t.verification.scale1_10}</option>
                  <option value="1-100">{t.verification.scale0_100}</option>
                </select>
              </div>
            </div>

            <div className="mt-3 flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-obsidian-950 font-bold text-xs shadow transition-colors"
              >
                {t.verification.btnIncludeCustom}
              </button>
            </div>
          </form>
        )}

        {/* Source List */}
        <div className="mt-6 space-y-3">
          {sources.map((source) => {
            const meta = getPlatformMeta(source.platformId, source.platformLabel);
            const isEditing = editingId === source.id;

            return (
              <div
                key={source.id}
                className={`p-4 rounded-xl border transition-all ${
                  source.verified
                    ? 'bg-obsidian-900/70 dark:bg-obsidian-900/70 light:bg-slate-50 border-slate-700/80 dark:border-slate-700/80 light:border-slate-200 shadow-sm'
                    : 'bg-obsidian-950/40 dark:bg-obsidian-950/40 light:bg-slate-100 border-slate-800 dark:border-slate-800 light:border-slate-200 opacity-60'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  {/* Left: Platform & URL */}
                  <div className="flex items-start gap-3 min-w-0 flex-1">
                    <button
                      type="button"
                      onClick={() => handleToggleVerified(source.id)}
                      className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center shrink-0 border transition-colors ${
                        source.verified
                          ? 'bg-emerald-500 border-emerald-400 text-obsidian-950'
                          : 'border-slate-600 bg-obsidian-800 dark:bg-obsidian-800 light:bg-white text-transparent'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </button>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-sm text-white dark:text-white light:text-slate-900">
                          {source.platformLabel}
                        </span>

                        {source.isCustom && (
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30">
                            {t.verification.customAddedBadge}
                          </span>
                        )}

                        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-obsidian-800 dark:bg-obsidian-800 light:bg-slate-200 text-slate-300 dark:text-slate-300 light:text-slate-700">
                          {t.verification.scaleLabel}: {source.nativeScale}
                        </span>

                        {source.confidence && !source.isCustom && (
                          <span className="text-[10px] text-emerald-400">
                            {source.confidence}% {t.verification.matchConfidence}
                          </span>
                        )}
                      </div>

                      {/* URL Display / Edit */}
                      <div className="mt-1">
                        {isEditing ? (
                          <div className="flex items-center gap-2 mt-1">
                            <input
                              type="text"
                              value={editedUrl}
                              onChange={(e) => setEditedUrl(e.target.value)}
                              className="flex-1 px-2.5 py-1 text-xs rounded bg-obsidian-850 dark:bg-obsidian-850 light:bg-white border border-slate-600 text-white dark:text-white light:text-slate-900"
                            />
                            <button
                              type="button"
                              onClick={() => saveEditedUrl(source.id)}
                              className="px-2.5 py-1 rounded bg-amber-500 text-obsidian-950 font-bold text-xs"
                            >
                              {t.verification.btnSave}
                            </button>
                            <button
                              type="button"
                              onClick={() => setEditingId(null)}
                              className="px-2 py-1 text-xs text-slate-400 hover:text-white"
                            >
                              {t.verification.btnCancel}
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-400 light:text-slate-500">
                            <span className="truncate max-w-md sm:max-w-lg font-mono">
                              {source.url}
                            </span>
                            <a
                              href={source.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-amber-400 hover:underline inline-flex items-center shrink-0"
                            >
                              <ExternalLink className="w-3 h-3 mx-0.5" />
                            </a>
                            <button
                              type="button"
                              onClick={() => startEditUrl(source)}
                              className="text-slate-400 hover:text-amber-400 p-0.5 transition-colors"
                              title={t.verification.editUrlTitle}
                            >
                              <Edit2 className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right: Scale selector & delete */}
                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    <select
                      value={source.nativeScale}
                      onChange={(e) =>
                        handleScaleChange(source.id, e.target.value as NativeScale)
                      }
                      className="px-2 py-1 text-xs rounded bg-obsidian-800 dark:bg-obsidian-800 light:bg-slate-100 border border-slate-700 dark:border-slate-700 light:border-slate-300 text-slate-200 dark:text-slate-200 light:text-slate-800 focus:outline-none"
                    >
                      <option value="1-5">{t.verification.scale1_5}</option>
                      <option value="1-10">{t.verification.scale1_10}</option>
                      <option value="1-100">{t.verification.scale0_100}</option>
                    </select>

                    <button
                      type="button"
                      onClick={() => handleRemoveSource(source.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-950/30 transition-colors"
                      title={t.verification.excludeTitle}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Confirmation Footer */}
        <div className="mt-8 pt-5 border-t border-slate-800 dark:border-slate-800 light:border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600">
            <span className="font-semibold text-white dark:text-white light:text-slate-900">
              {activeCount}
            </span>{' '}
            {t.verification.activeChannelsCount}
          </div>

          <div className="flex items-center gap-3">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2.5 rounded-xl border border-slate-700 dark:border-slate-700 light:border-slate-300 text-slate-300 dark:text-slate-300 light:text-slate-700 text-xs font-medium hover:bg-slate-800/50"
              >
                {t.verification.btnBackSearch}
              </button>
            )}

            <button
              type="button"
              disabled={activeCount === 0 || isExtracting}
              onClick={() => onConfirmSources(sources.filter((s) => s.verified))}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-obsidian-950 font-bold text-xs sm:text-sm shadow-lg hover:shadow-amber-500/20 disabled:opacity-50 transition-all"
            >
              {isExtracting ? (
                <>
                  <span className="w-4 h-4 border-2 border-obsidian-950 border-t-transparent rounded-full animate-spin" />
                  <span>{t.verification.btnExtracting}</span>
                </>
              ) : (
                <>
                  <span>{t.verification.btnConfirmScan}</span>
                  <ArrowRight className={`w-4 h-4 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
