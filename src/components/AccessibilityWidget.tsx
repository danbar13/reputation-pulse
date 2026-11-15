'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useThemeAndAccessibility } from '@/context/ThemeAndAccessibilityContext';
import { useLanguage } from '@/context/LanguageContext';
import {
  Eye,
  Type,
  Contrast,
  Sparkles,
  RotateCcw,
  X,
  Check,
  MousePointerClick,
  Sliders,
} from 'lucide-react';

export function AccessibilityWidget() {
  const { accessibility, updateAccessibility, resetAccessibility } = useThemeAndAccessibility();
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isOpen &&
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div className="fixed bottom-4 end-4 sm:bottom-6 sm:end-6 z-50">
      {/* Floating Action Button */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={t.a11y.title}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        className="group relative flex items-center justify-center w-11 h-11 sm:w-13 sm:h-13 p-2.5 sm:p-3.5 rounded-full bg-amber-500 hover:bg-amber-400 text-obsidian-950 font-semibold shadow-xl hover:shadow-amber-500/30 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-amber-500/50"
      >
        <Eye className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:scale-110" />
        <span className="sr-only">{t.a11y.title}</span>
        {/* Subtle pulsing indicator ring */}
        <span className="absolute -inset-1 rounded-full border border-amber-400/40 animate-ping opacity-25 pointer-events-none" />
      </button>

      {/* Accessibility Popover Panel */}
      {isOpen && (
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="a11y-title"
          className="absolute bottom-14 end-0 w-[calc(100vw-2rem)] sm:w-96 max-w-sm rounded-2xl bg-white dark:bg-obsidian-850 border border-slate-200 dark:border-slate-700/80 shadow-2xl p-5 text-slate-900 dark:text-slate-100 transition-all duration-200"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-700/50 dark:border-slate-700/50 light:border-slate-200">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
                <Sliders className="w-4 h-4" />
              </div>
              <h2 id="a11y-title" className="text-base font-semibold tracking-wide">
                {t.a11y.title}
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label={t.a11y.close}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 dark:hover:bg-slate-800/60 light:hover:bg-slate-100 light:hover:text-slate-700 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-4 space-y-4 text-xs sm:text-sm">
            {/* 1. Text Size Scaling */}
            <div>
              <label className="flex items-center gap-2 font-medium mb-2 text-slate-300 dark:text-slate-300 light:text-slate-700">
                <Type className="w-4 h-4 text-amber-400" />
                {t.a11y.textSize}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'normal', label: t.a11y.normalSize },
                  { id: 'large', label: t.a11y.largeSize },
                  { id: 'xlarge', label: t.a11y.xlargeSize },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() =>
                      updateAccessibility({ textSize: opt.id as 'normal' | 'large' | 'xlarge' })
                    }
                    className={`py-2 px-1 text-center rounded-lg border font-medium transition-all ${
                      accessibility.textSize === opt.id
                        ? 'bg-amber-500 text-obsidian-950 border-amber-400 font-semibold shadow-sm'
                        : 'bg-obsidian-800/60 dark:bg-obsidian-800/60 light:bg-slate-100 border-slate-700 dark:border-slate-700 light:border-slate-200 hover:bg-slate-700/50 light:hover:bg-slate-200'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. High Contrast Mode */}
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-obsidian-800/50 dark:bg-obsidian-800/50 light:bg-slate-50 border border-slate-700/50 dark:border-slate-700/50 light:border-slate-200">
              <div className="flex items-center gap-2.5">
                <Contrast className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <div className="font-medium text-slate-200 dark:text-slate-200 light:text-slate-800">
                    {t.a11y.highContrast}
                  </div>
                  <div className="text-[11px] text-slate-400 dark:text-slate-400 light:text-slate-500">
                    {t.a11y.highContrastDesc}
                  </div>
                </div>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={accessibility.highContrast}
                onClick={() =>
                  updateAccessibility({ highContrast: !accessibility.highContrast })
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                  accessibility.highContrast ? 'bg-amber-500' : 'bg-slate-700 dark:bg-slate-700 light:bg-slate-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    accessibility.highContrast ? 'translate-x-6 rtl:-translate-x-6' : 'translate-x-1 rtl:-translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* 3. Highlight Links & Interactive Controls */}
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-obsidian-800/50 dark:bg-obsidian-800/50 light:bg-slate-50 border border-slate-700/50 dark:border-slate-700/50 light:border-slate-200">
              <div className="flex items-center gap-2.5">
                <MousePointerClick className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <div className="font-medium text-slate-200 dark:text-slate-200 light:text-slate-800">
                    {t.a11y.highlightControls}
                  </div>
                  <div className="text-[11px] text-slate-400 dark:text-slate-400 light:text-slate-500">
                    {t.a11y.highlightControlsDesc}
                  </div>
                </div>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={accessibility.highlightControls}
                onClick={() =>
                  updateAccessibility({ highlightControls: !accessibility.highlightControls })
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                  accessibility.highlightControls ? 'bg-amber-500' : 'bg-slate-700 dark:bg-slate-700 light:bg-slate-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    accessibility.highlightControls ? 'translate-x-6 rtl:-translate-x-6' : 'translate-x-1 rtl:-translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* 4. Reduce Motion */}
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-obsidian-800/50 dark:bg-obsidian-800/50 light:bg-slate-50 border border-slate-700/50 dark:border-slate-700/50 light:border-slate-200">
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <div className="font-medium text-slate-200 dark:text-slate-200 light:text-slate-800">
                    {t.a11y.reduceMotion}
                  </div>
                  <div className="text-[11px] text-slate-400 dark:text-slate-400 light:text-slate-500">
                    {t.a11y.reduceMotionDesc}
                  </div>
                </div>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={accessibility.reduceMotion}
                onClick={() =>
                  updateAccessibility({ reduceMotion: !accessibility.reduceMotion })
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                  accessibility.reduceMotion ? 'bg-amber-500' : 'bg-slate-700 dark:bg-slate-700 light:bg-slate-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    accessibility.reduceMotion ? 'translate-x-6 rtl:-translate-x-6' : 'translate-x-1 rtl:-translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Reset All Settings Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={resetAccessibility}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg border border-slate-700 dark:border-slate-700 light:border-slate-300 bg-obsidian-800 dark:bg-obsidian-800 light:bg-slate-100 hover:bg-slate-700/60 dark:hover:bg-slate-700/60 light:hover:bg-slate-200 text-slate-300 dark:text-slate-300 light:text-slate-700 font-medium transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                {t.a11y.btnResetA11y}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
