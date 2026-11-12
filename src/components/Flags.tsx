'use client';

import React from 'react';

interface FlagProps {
  className?: string;
}

/**
 * High-definition vector SVG Flag of Israel (🇮🇱)
 * Guarantees visual rendering on Windows, macOS, Linux, iOS, and Android
 * where OS emoji fonts (like Windows Segoe UI) render flag emojis as plain letters "IL".
 */
export function IsraelFlag({ className = 'w-5 h-3.5' }: FlagProps) {
  return (
    <svg
      viewBox="0 0 220 160"
      className={`inline-block shrink-0 ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Flag of Israel"
      role="img"
    >
      <rect width="220" height="160" fill="#FFFFFF" rx="4" />
      {/* Top blue stripe */}
      <rect y="15" width="220" height="25" fill="#0038B8" />
      {/* Bottom blue stripe */}
      <rect y="120" width="220" height="25" fill="#0038B8" />
      {/* Magen David (Star of David) */}
      <g
        fill="none"
        stroke="#0038B8"
        strokeWidth="5.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        {/* Upward triangle */}
        <polygon points="110,50 82,98 138,98" />
        {/* Downward triangle */}
        <polygon points="110,110 82,62 138,62" />
      </g>
    </svg>
  );
}

/**
 * High-definition vector SVG Flag of the United States (🇺🇸)
 * Guarantees visual rendering across all operating systems.
 */
export function UsaFlag({ className = 'w-5 h-3.5' }: FlagProps) {
  return (
    <svg
      viewBox="0 0 220 160"
      className={`inline-block shrink-0 ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Flag of the United States"
      role="img"
    >
      {/* 13 Red and white stripes */}
      <rect width="220" height="160" fill="#B22234" rx="4" />
      <rect y="12.3" width="220" height="12.3" fill="#FFFFFF" />
      <rect y="36.9" width="220" height="12.3" fill="#FFFFFF" />
      <rect y="61.5" width="220" height="12.3" fill="#FFFFFF" />
      <rect y="86.1" width="220" height="12.3" fill="#FFFFFF" />
      <rect y="110.7" width="220" height="12.3" fill="#FFFFFF" />
      <rect y="135.3" width="220" height="12.3" fill="#FFFFFF" />
      {/* Blue canton */}
      <rect width="88" height="86.1" fill="#3C3B6E" />
      {/* Stars pattern representation */}
      <g fill="#FFFFFF" fontSize="10" fontFamily="sans-serif" textAnchor="middle">
        <text x="18" y="22">★</text>
        <text x="44" y="22">★</text>
        <text x="70" y="22">★</text>
        <text x="31" y="38">★</text>
        <text x="57" y="38">★</text>
        <text x="18" y="54">★</text>
        <text x="44" y="54">★</text>
        <text x="70" y="54">★</text>
        <text x="31" y="70">★</text>
        <text x="57" y="70">★</text>
      </g>
    </svg>
  );
}
