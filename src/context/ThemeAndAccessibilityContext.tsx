'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { AccessibilitySettings } from '@/types';

type ThemeMode = 'dark' | 'light';

interface ThemeAndAccessibilityContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
  accessibility: AccessibilitySettings;
  updateAccessibility: (partial: Partial<AccessibilitySettings>) => void;
  resetAccessibility: () => void;
}

const DEFAULT_A11Y: AccessibilitySettings = {
  textSize: 'normal',
  highContrast: false,
  highlightControls: false,
  reduceMotion: false,
};

const ThemeAndAccessibilityContext = createContext<ThemeAndAccessibilityContextType | undefined>(undefined);

export function ThemeAndAccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const [accessibility, setAccessibility] = useState<AccessibilitySettings>(DEFAULT_A11Y);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Load persisted theme
    const savedTheme = localStorage.getItem('rp_theme') as ThemeMode | null;
    if (savedTheme === 'light' || savedTheme === 'dark') {
      setTheme(savedTheme);
    } else {
      setTheme('dark'); // Default is dark
    }

    // Load persisted accessibility
    const savedA11y = localStorage.getItem('rp_a11y');
    if (savedA11y) {
      try {
        setAccessibility({ ...DEFAULT_A11Y, ...JSON.parse(savedA11y) });
      } catch (e) {
        console.error('Failed to parse a11y settings', e);
      }
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;

    // Apply theme class
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    localStorage.setItem('rp_theme', theme);

    // Apply font size scale
    root.classList.remove('text-scale-normal', 'text-scale-large', 'text-scale-xlarge');
    root.classList.add(`text-scale-${accessibility.textSize}`);

    // Apply high contrast
    if (accessibility.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    // Apply highlight controls
    if (accessibility.highlightControls) {
      root.classList.add('highlight-controls');
    } else {
      root.classList.remove('highlight-controls');
    }

    // Apply reduce motion
    if (accessibility.reduceMotion) {
      root.classList.add('reduce-motion');
    } else {
      root.classList.remove('reduce-motion');
    }

    localStorage.setItem('rp_a11y', JSON.stringify(accessibility));
  }, [theme, accessibility, mounted]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const updateAccessibility = (partial: Partial<AccessibilitySettings>) => {
    setAccessibility((prev) => ({ ...prev, ...partial }));
  };

  const resetAccessibility = () => {
    setAccessibility(DEFAULT_A11Y);
  };

  return (
    <ThemeAndAccessibilityContext.Provider
      value={{
        theme,
        toggleTheme,
        accessibility,
        updateAccessibility,
        resetAccessibility,
      }}
    >
      {children}
    </ThemeAndAccessibilityContext.Provider>
  );
}

export function useThemeAndAccessibility() {
  const context = useContext(ThemeAndAccessibilityContext);
  if (!context) {
    throw new Error('useThemeAndAccessibility must be used within ThemeAndAccessibilityProvider');
  }
  return context;
}
