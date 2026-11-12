'use client';

import React, { useState } from 'react';
import { useThemeAndAccessibility } from '@/context/ThemeAndAccessibilityContext';
import { useLanguage } from '@/context/LanguageContext';
import { Sun, Moon, Activity, ShieldCheck, Sparkles, Key } from 'lucide-react';
import { ApiConfigModal } from '@/components/ApiConfigModal';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

interface NavbarProps {
  onSelectDemo?: (demoKey: string) => void;
  onNewScan?: () => void;
}

export function Navbar({ onSelectDemo, onNewScan }: NavbarProps) {
  const { theme, toggleTheme } = useThemeAndAccessibility();
  const { t } = useLanguage();
  const [isApiModalOpen, setIsApiModalOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 bg-obsidian-900/85 dark:bg-obsidian-900/85 light:bg-white/90 backdrop-blur-md transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onNewScan}
              className="flex items-center gap-3 text-start focus:outline-none"
            >
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-emerald-500/10 border border-amber-500/30 text-amber-400 shadow-inner">
                <Activity className="w-5 h-5 text-amber-400" />
                <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5 rtl:-left-1 rtl:right-auto">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold tracking-tight text-white dark:text-white light:text-slate-900">
                    Reputation<span className="text-amber-400">Pulse</span>
                  </span>
                  <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30">
                    {t.brand.aiBadge}
                  </span>
                </div>
                <p className="hidden sm:block text-[11px] text-slate-400 dark:text-slate-400 light:text-slate-500 tracking-wide">
                  {t.brand.tagline}
                </p>
              </div>
            </button>
          </div>

          {/* Demo Quick Select & Controls */}
          <div className="flex items-center gap-2 sm:gap-3.5">
            {onSelectDemo && (
              <div className="hidden md:flex items-center gap-1.5 text-xs">
                <span className="text-slate-400 dark:text-slate-400 light:text-slate-500 text-[11px] uppercase tracking-wider mx-1">
                  {t.navbar.demoQuickLoad}
                </span>
                <button
                  type="button"
                  onClick={() => onSelectDemo('royal-beach-hotel-eilat')}
                  className="px-2.5 py-1 rounded-lg border border-slate-700/60 dark:border-slate-700/60 light:border-slate-300 bg-obsidian-800/60 dark:bg-obsidian-800/60 light:bg-slate-100 hover:border-amber-500/50 hover:text-amber-400 dark:hover:text-amber-300 light:hover:text-amber-600 text-slate-300 dark:text-slate-300 light:text-slate-700 transition-colors"
                >
                  {t.navbar.royalBeach}
                </button>
                <button
                  type="button"
                  onClick={() => onSelectDemo('machneyuda-restaurant-jerusalem')}
                  className="px-2.5 py-1 rounded-lg border border-slate-700/60 dark:border-slate-700/60 light:border-slate-300 bg-obsidian-800/60 dark:bg-obsidian-800/60 light:bg-slate-100 hover:border-amber-500/50 hover:text-amber-400 dark:hover:text-amber-300 light:hover:text-amber-600 text-slate-300 dark:text-slate-300 light:text-slate-700 transition-colors"
                >
                  {t.navbar.machneyuda}
                </button>
              </div>
            )}

            {/* Live API Engine Status Button */}
            <button
              type="button"
              onClick={() => setIsApiModalOpen(true)}
              title={t.navbar.liveEngineStatus}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-500/30 text-emerald-400 text-xs transition-colors cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-mono text-[11px] hidden sm:inline">{t.navbar.liveEngineStatus}</span>
            </button>

            {/* Language Switcher with Flags */}
            <LanguageSwitcher />

            {/* Theme Toggle Button */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? t.navbar.switchThemeLight : t.navbar.switchThemeDark}
              className="flex items-center justify-center p-2 rounded-xl border border-slate-800 dark:border-slate-800 light:border-slate-200 bg-obsidian-800/80 dark:bg-obsidian-800/80 light:bg-slate-100 hover:bg-slate-700/50 dark:hover:bg-slate-700/50 light:hover:bg-slate-200 text-slate-300 dark:text-slate-300 light:text-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500/40"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400 transition-transform rotate-0 hover:rotate-45" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700 transition-transform -rotate-12 hover:rotate-0" />
              )}
            </button>
          </div>
        </div>
      </header>

      <ApiConfigModal
        isOpen={isApiModalOpen}
        onClose={() => setIsApiModalOpen(false)}
      />
    </>
  );
}
