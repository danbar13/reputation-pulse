'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Globe, Check } from 'lucide-react';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Flag Selector Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Change Language / החלף שפה"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-slate-700/80 dark:border-slate-700/80 light:border-slate-300 bg-obsidian-800/80 dark:bg-obsidian-800/80 light:bg-slate-100 hover:bg-slate-700/50 dark:hover:bg-slate-700/50 light:hover:bg-slate-200 text-slate-200 dark:text-slate-200 light:text-slate-800 text-xs font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-amber-500/40"
      >
        <span className="text-base leading-none select-none">
          {language === 'he' ? '🇮🇱' : '🇺🇸'}
        </span>
        <span className="font-medium text-[11px] uppercase tracking-wider hidden sm:inline">
          {language === 'he' ? 'עברית' : 'EN'}
        </span>
      </button>

      {/* Language Dropdown Menu */}
      {isOpen && (
        <div
          role="listbox"
          aria-label="Select Language"
          className="absolute mt-1.5 z-50 w-36 rounded-xl bg-obsidian-850 dark:bg-obsidian-850 light:bg-white border border-slate-700 dark:border-slate-700 light:border-slate-200 shadow-2xl p-1.5 text-xs text-slate-200 dark:text-slate-200 light:text-slate-900 right-0 rtl:right-auto rtl:left-0 transition-all animate-in fade-in zoom-in-95 duration-150"
        >
          {/* Hebrew Option */}
          <button
            type="button"
            role="option"
            aria-selected={language === 'he'}
            onClick={() => {
              setLanguage('he');
              setIsOpen(false);
            }}
            className={`w-full flex items-center justify-between gap-2 px-2.5 py-2 rounded-lg font-medium transition-colors ${
              language === 'he'
                ? 'bg-amber-500/15 text-amber-400 font-bold'
                : 'hover:bg-slate-700/40 dark:hover:bg-slate-700/40 light:hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-base leading-none select-none">🇮🇱</span>
              <span>עברית (IL)</span>
            </div>
            {language === 'he' && <Check className="w-3.5 h-3.5 text-amber-400" />}
          </button>

          {/* English Option */}
          <button
            type="button"
            role="option"
            aria-selected={language === 'en'}
            onClick={() => {
              setLanguage('en');
              setIsOpen(false);
            }}
            className={`w-full flex items-center justify-between gap-2 px-2.5 py-2 rounded-lg font-medium transition-colors ${
              language === 'en'
                ? 'bg-amber-500/15 text-amber-400 font-bold'
                : 'hover:bg-slate-700/40 dark:hover:bg-slate-700/40 light:hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-base leading-none select-none">🇺🇸</span>
              <span>English (US)</span>
            </div>
            {language === 'en' && <Check className="w-3.5 h-3.5 text-amber-400" />}
          </button>
        </div>
      )}
    </div>
  );
}
