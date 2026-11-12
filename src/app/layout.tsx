import type { Metadata } from 'next';
import './globals.css';
import { ThemeAndAccessibilityProvider } from '@/context/ThemeAndAccessibilityContext';
import { LanguageProvider } from '@/context/LanguageContext';
import { AccessibilityWidget } from '@/components/AccessibilityWidget';

export const metadata: Metadata = {
  title: 'ReputationPulse AI — Multi-Source Business Reputation Intelligence Platform',
  description:
    'Autonomous reputation scoring, cross-platform normalization (0-100), and historical tracking across Google Maps, TripAdvisor, Booking.com, Yelp, Facebook, and custom review channels.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl" className="dark">
      <body className="antialiased selection:bg-amber-500 selection:text-obsidian-950">
        <LanguageProvider>
          <ThemeAndAccessibilityProvider>
            {children}
            <AccessibilityWidget />
          </ThemeAndAccessibilityProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
