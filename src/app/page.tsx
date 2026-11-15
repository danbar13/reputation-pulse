'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { SearchInput } from '@/components/SearchInput';
import { ScanStepper } from '@/components/ScanStepper';
import { SourceVerificationCard } from '@/components/SourceVerificationCard';
import { KPISummaryHeader } from '@/components/KPISummaryHeader';
import { HistoricalTrendChart } from '@/components/HistoricalTrendChart';
import { SourceBreakdownGrid } from '@/components/SourceBreakdownGrid';
import { AiInsightsSection } from '@/components/insights/AiInsightsSection';
import { AiInsightsSkeleton } from '@/components/insights/AiInsightsSkeleton';
import { useLanguage } from '@/context/LanguageContext';
import {
  DiscoveredSource,
  ScanSnapshot,
  BusinessCategory,
  ScanStep,
  HistoricalBusinessData,
  ReputationAIAnalysis,
} from '@/types';
import { discoverBusinessSources } from '@/lib/scrapers/discovery';
import { extractSourceData } from '@/lib/scrapers/engine';
import { calculateAggregateScores } from '@/lib/scoring';
import {
  getStoredBusinesses,
  saveSnapshot,
  getBusinessByKey,
  INITIAL_STORAGE,
} from '@/lib/storage';
import {
  Sparkles,
  Download,
  Share2,
  FileText,
  Building2,
  CheckCircle,
  HelpCircle,
  Shield,
} from 'lucide-react';

export default function Home() {
  const { t, language } = useLanguage();
  const [scanStep, setScanStep] = useState<ScanStep>('completed');
  const [businessName, setBusinessName] = useState('Royal Beach Hotel Eilat');
  const [businessLocation, setBusinessLocation] = useState<string | undefined>('Eilat, Israel');
  const [businessWebsite, setBusinessWebsite] = useState<string | undefined>(
    'https://www.isrotel.com/royal-beach-eilat'
  );
  const [category, setCategory] = useState<BusinessCategory>('hotel');

  const [discoveredSources, setDiscoveredSources] = useState<DiscoveredSource[]>([]);
  const [currentSnapshot, setCurrentSnapshot] = useState<ScanSnapshot | null>(null);
  const [historyData, setHistoryData] = useState<HistoricalBusinessData | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<ReputationAIAnalysis | null>(null);
  const [isAnalyzingAi, setIsAnalyzingAi] = useState(false);

  const runAiAnalysis = async (
    name: string,
    cat: BusinessCategory,
    score: number,
    srcs: any[],
    targetSnapshot?: ScanSnapshot
  ) => {
    setIsAnalyzingAi(true);
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessName: name,
          businessLocation,
          category: cat,
          overallScore: score,
          sources: srcs,
          language,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        const analysis: ReputationAIAnalysis = data.analysis;
        setAiAnalysis(analysis);

        // Snapshot Persistence: Store the generated QualitativeAnalysis object inside the snapshot
        setCurrentSnapshot((prev) => {
          const base = targetSnapshot || prev;
          if (!base) return null;
          const updated: ScanSnapshot = {
            ...base,
            aiAnalysis: analysis,
          };
          saveSnapshot(updated);
          setHistoryData((prevHist) => {
            if (!prevHist) return null;
            return {
              ...prevHist,
              snapshots: prevHist.snapshots.map((s) =>
                s.id === updated.id ? updated : s
              ),
            };
          });
          return updated;
        });

        return analysis;
      }
    } catch (e) {
      console.error('Failed to run AI analysis:', e);
    } finally {
      setIsAnalyzingAi(false);
    }
  };

  // Initialize with Royal Beach Hotel Eilat demo on load
  useEffect(() => {
    const defaultData = INITIAL_STORAGE['royal-beach-hotel-eilat'];
    if (defaultData && defaultData.snapshots.length > 0) {
      setHistoryData(defaultData);
      const latest = defaultData.snapshots[defaultData.snapshots.length - 1];
      setCurrentSnapshot(latest);
      runAiAnalysis(
        latest.businessName,
        latest.category,
        latest.overallWeightedScore,
        latest.sources
      );
    }
  }, []);

  // Handler for demo selection from Navbar
  const handleSelectDemo = (demoKey: string) => {
    const all = getStoredBusinesses();
    const demo = all[demoKey] || INITIAL_STORAGE[demoKey];
    if (demo && demo.snapshots.length > 0) {
      setHistoryData(demo);
      const latest = demo.snapshots[demo.snapshots.length - 1];
      setCurrentSnapshot(latest);
      setBusinessName(demo.businessName);
      setBusinessLocation(demo.businessLocation);
      setBusinessWebsite(demo.businessWebsite);
      setCategory(demo.category);
      setScanStep('completed');
      if (latest.aiAnalysis) {
        setAiAnalysis(latest.aiAnalysis);
      } else {
        runAiAnalysis(
          demo.businessName,
          demo.category,
          latest.overallWeightedScore,
          latest.sources,
          latest
        );
      }
    }
  };

  const handleResetToNewScan = () => {
    setScanStep('idle');
    setBusinessName('');
    setBusinessLocation('');
    setBusinessWebsite('');
    setDiscoveredSources([]);
    setCurrentSnapshot(null);
    setHistoryData(null);
    setAiAnalysis(null);
  };

  // Step 1: Automated Discovery Trigger
  const handleStartDiscovery = async ({
    businessName: inputName,
    location,
    website,
  }: {
    businessName: string;
    location?: string;
    website?: string;
  }) => {
    setBusinessName(inputName);
    setBusinessLocation(location);
    setBusinessWebsite(website);
    setScanStep('discovering');
    setIsScanning(true);

    try {
      // Fast realistic discovery delay (400ms)
      await new Promise((res) => setTimeout(res, 450));

      const { category: detectedCat, sources } = discoverBusinessSources(
        inputName,
        location,
        website
      );

      setCategory(detectedCat);
      setDiscoveredSources(sources);
      setScanStep('verifying'); // Human-in-the-loop verification step
    } catch (e) {
      console.error('Discovery error:', e);
      setScanStep('error');
    } finally {
      setIsScanning(false);
    }
  };

  // Step 2 & 3: User Confirmed Sources (and optional custom sources) -> Extract & Normalize
  const handleConfirmSourcesAndExtract = async (verifiedSources: DiscoveredSource[]) => {
    setScanStep('extracting');
    setIsScanning(true);

    try {
      let newSnapshot: ScanSnapshot;

      // Priority: Execute server-side live extraction API (with access to SERPAPI and live scrapers)
      try {
        const res = await fetch('/api/extract', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            businessName,
            location: businessLocation,
            website: businessWebsite,
            category,
            sources: verifiedSources,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          newSnapshot = data.snapshot;
        } else {
          throw new Error(`Server returned ${res.status}`);
        }
      } catch (serverErr) {
        console.warn('Falling back to local extraction:', serverErr);
        // Graceful fallback to client-side extraction
        const extractionPromises = verifiedSources.map((s) =>
          extractSourceData(s, businessName, { location: businessLocation })
        );
        const extractedResults = await Promise.all(extractionPromises);
        const { simpleAverage, weightedScore, totalReviews, enrichedSources } =
          calculateAggregateScores(extractedResults);

        newSnapshot = {
          id: `snap_${Date.now()}`,
          businessName,
          businessLocation,
          businessWebsite,
          category,
          timestamp: new Date().toISOString(),
          overallWeightedScore: weightedScore,
          simpleAverageScore: simpleAverage,
          totalReviews,
          sources: enrichedSources,
        };
      }

      setScanStep('normalizing');
      await new Promise((res) => setTimeout(res, 350));

      // Persist snapshot to local history
      const updatedBusiness = saveSnapshot(newSnapshot);
      setHistoryData(updatedBusiness);
      setCurrentSnapshot(newSnapshot);
      setScanStep('completed');

      // Synthesize AI Qualitative Review Analysis with live data
      runAiAnalysis(businessName, category, newSnapshot.overallWeightedScore, newSnapshot.sources, newSnapshot);
    } catch (e) {
      console.error('Extraction error:', e);
      setScanStep('error');
    } finally {
      setIsScanning(false);
    }
  };

  // Re-run Scan: creates a fresh snapshot with small simulated live delta and appends to history
  const handleRerunScan = async () => {
    if (!currentSnapshot) return;
    setIsScanning(true);

    try {
      // Re-extract using current sources
      const sourcesToRun: DiscoveredSource[] = currentSnapshot.sources.map((s) => ({
        id: s.id,
        platformId: s.platformId,
        platformLabel: s.platformLabel,
        url: s.url,
        verified: true,
        nativeScale: s.nativeScale,
        status: 'verified',
        confidence: 95,
      }));

      let newSnapshot: ScanSnapshot;
      try {
        const res = await fetch('/api/extract', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            businessName: currentSnapshot.businessName,
            location: currentSnapshot.businessLocation,
            website: currentSnapshot.businessWebsite,
            category: currentSnapshot.category,
            sources: sourcesToRun,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          newSnapshot = data.snapshot;
        } else {
          throw new Error(`Server returned ${res.status}`);
        }
      } catch (serverErr) {
        console.warn('Falling back to local extraction:', serverErr);
        const extractionPromises = sourcesToRun.map((s) =>
          extractSourceData(s, currentSnapshot.businessName, {
            location: currentSnapshot.businessLocation,
          })
        );
        const extractedResults = await Promise.all(extractionPromises);

        const { simpleAverage, weightedScore, totalReviews, enrichedSources } =
          calculateAggregateScores(extractedResults);

        newSnapshot = {
          id: `snap_${Date.now()}`,
          businessName: currentSnapshot.businessName,
          businessLocation: currentSnapshot.businessLocation,
          businessWebsite: currentSnapshot.businessWebsite,
          category: currentSnapshot.category,
          timestamp: new Date().toISOString(),
          overallWeightedScore: weightedScore,
          simpleAverageScore: simpleAverage,
          totalReviews,
          sources: enrichedSources,
        };
      }

      const updated = saveSnapshot(newSnapshot);
      setHistoryData(updated);
      setCurrentSnapshot(newSnapshot);

      // Re-synthesize AI Qualitative Review Analysis
      runAiAnalysis(
        newSnapshot.businessName,
        newSnapshot.category,
        newSnapshot.overallWeightedScore,
        newSnapshot.sources,
        newSnapshot
      );
    } catch (e) {
      console.error('Rerun scan failed', e);
    } finally {
      setIsScanning(false);
    }
  };

  const handleExportJSON = () => {
    if (!currentSnapshot) return;
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(historyData || currentSnapshot, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${businessName.toLowerCase().replace(/\s+/g, '_')}_reputation_dossier.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-obsidian-900 transition-colors">
      <Navbar onSelectDemo={handleSelectDemo} onNewScan={handleResetToNewScan} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Input Section */}
        <div className="mb-6">
          <SearchInput onStartScan={handleStartDiscovery} isLoading={isScanning} />
        </div>

        {/* Stepper Status Indicator */}
        <ScanStepper currentStep={scanStep} />

        {/* Human-in-the-Loop Source Verification Step */}
        {scanStep === 'verifying' && (
          <SourceVerificationCard
            businessName={businessName}
            sources={discoveredSources}
            onConfirmSources={handleConfirmSourcesAndExtract}
            onCancel={() => setScanStep('idle')}
            isExtracting={isScanning}
          />
        )}

        {/* Completed View: Dashboard & Analytics */}
        {currentSnapshot && scanStep === 'completed' && (
          <div>
            {/* Header with KPI cards & Re-run button */}
            <KPISummaryHeader
              snapshot={currentSnapshot}
              onRerunScan={handleRerunScan}
              isScanning={isScanning}
            />

            {/* Quick Export / Utility Bar - Centered on Mobile */}
            <div className="flex flex-col sm:flex-row items-center justify-between py-3 px-4 mb-6 rounded-xl bg-white dark:bg-obsidian-850 border border-slate-200 dark:border-slate-800 shadow-sm text-xs text-center sm:text-start gap-3">
              <div className="flex items-center justify-center sm:justify-start gap-2 text-slate-700 dark:text-slate-300">
                <Shield className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>
                  {t.exportBar.normalizedNotice.includes('{channels}')
                    ? t.exportBar.normalizedNotice.replace('{channels}', String(currentSnapshot.sources.length))
                    : `${t.exportBar.normalizedNotice} (${currentSnapshot.sources.length})`}
                </span>
              </div>
              <div className="flex items-center justify-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleExportJSON}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-obsidian-800 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-semibold transition-colors shrink-0 shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{t.exportBar.btnExport}</span>
                </button>
              </div>
            </div>

            {/* AI Qualitative Review Analysis Section */}
            {aiAnalysis ? (
              <AiInsightsSection
                analysis={aiAnalysis}
                businessName={businessName}
                onRegenerate={() =>
                  runAiAnalysis(
                    currentSnapshot.businessName,
                    currentSnapshot.category,
                    currentSnapshot.overallWeightedScore,
                    currentSnapshot.sources,
                    currentSnapshot
                  )
                }
                isRegenerating={isAnalyzingAi}
              />
            ) : isAnalyzingAi ? (
              <AiInsightsSkeleton />
            ) : null}

            {/* Historical Trend Line Chart with Interactive Source Toggles */}
            {historyData && historyData.snapshots.length > 0 && (
              <HistoricalTrendChart snapshots={historyData.snapshots} />
            )}

            {/* Source Breakdown Cards & Reviews Grid */}
            <SourceBreakdownGrid sources={currentSnapshot.sources} />
          </div>
        )}
      </main>

      {/* Footer - Centered on Mobile */}
      <footer className="border-t border-slate-200 dark:border-slate-800/80 py-8 bg-white dark:bg-obsidian-950 text-xs text-slate-600 dark:text-slate-400 text-center transition-colors">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <span className="font-bold text-slate-900 dark:text-white">
              {t.brand.name}
            </span>
            <span>—</span>
            <span>{t.brand.tagline}</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-slate-500 dark:text-slate-400">
            <span>{t.footer.scaleTag}</span>
            <span>•</span>
            <span>{t.footer.weightedTag}</span>
            <span>•</span>
            <span>{t.footer.a11yTag}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
