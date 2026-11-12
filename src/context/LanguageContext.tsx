'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Language, TranslationDictionary, translations } from '@/lib/i18n/translations';

interface LanguageContextType {
  language: Language;
  dir: 'ltr' | 'rtl';
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: TranslationDictionary;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('he');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('rp_lang') as Language | null;
    if (saved === 'en' || saved === 'he') {
      setLanguageState(saved);
    } else {
      // Default to Hebrew as requested
      setLanguageState('he');
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const dir = language === 'he' ? 'rtl' : 'ltr';
    document.documentElement.dir = dir;
    document.documentElement.lang = language;
    localStorage.setItem('rp_lang', language);
  }, [language, mounted]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const toggleLanguage = () => {
    setLanguageState((prev) => (prev === 'he' ? 'en' : 'he'));
  };

  const dir: 'ltr' | 'rtl' = language === 'he' ? 'rtl' : 'ltr';
  const t = translations[language];

  return (
    <LanguageContext.Provider
      value={{
        language,
        dir,
        setLanguage,
        toggleLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
