# ReputationPulse AI — Multi-Source Business Reputation Intelligence Platform

**ReputationPulse AI** is an enterprise-grade reputation aggregation, score normalization, and historical intelligence platform engineered for hospitality, restaurants, local venues, and SaaS/services businesses.

---

## 🌟 Key Architecture & Capabilities

### 1. AI Qualitative Review Analysis & Operational Insights (Phase 3 Upgrade)
- **Google Gen AI SDK (`@google/genai`):**
  - Synthesizes unstructured customer feedback and snippets across Google Maps, TripAdvisor, Booking.com, Yelp, etc. into decision-grade operational intelligence.
  - Powered by **Gemini 2.5 Flash** with JSON Schema enforcement.
- **Synthesized Strategic Pillars:**
  - **Executive Reputation Diagnosis:** High-level strategic overview and composite sentiment index (0–100).
  - **What to Preserve (Core Strengths):** Departmental advantages driving 5-star ratings with real guest quotes.
  - **What to Improve (Critical Vulnerabilities):** Operational bottlenecks categorized by severity (`High`, `Medium`, `Low`) with guest friction evidence.
  - **Prioritized Departmental Action Plan:** Action items ranked by timeframe (`Immediate`, `Short-Term`, `Strategic`) assigned to specific departments (e.g., Front Office, F&B, Valet, GM) with expected quantitative impact.
  - **Recurring Cross-Platform Themes:** Quantified sentiment frequencies (e.g. *"68% of reviews cite exemplary concierge service"*).
- **Graceful Fallback Synthesis:**
  - If `GEMINI_API_KEY` is not provided or quota limits are reached, the platform cascades to the built-in deterministic heuristic synthesis engine so the dashboard is always functional.

### 2. Live Data Extraction (Phase 2 Upgrade)
- **Google Places API (New):**
  - Live query endpoint: `https://places.googleapis.com/v1/places:searchText`
  - Retrieves real-time Google Maps ratings, verified total user review counts, official Google Maps URIs, and live review snippets with author attributions.
- **SerpApi Multi-Channel Real-World Search:**
  - Queries Google search and platform engines for live review metrics on TripAdvisor, Booking.com, Yelp, Facebook, and Trustpilot.
  - Extracts rich snippets, star ratings, and review snippets directly from organic web indices.
- **Graceful Fallback Mode:**
  - If API keys are not provided, rate-limited, or encounter network errors, the engine automatically cascades to the deterministic, entity-aware structured simulation engine.
  - Transparent badges on every source card display whether data was fetched live (`● Google Places API (New)`, `● SerpApi Engine`) or via `Simulated Fallback`.

### 2. Entity Discovery & Channel Indexing
- **Search Modalities:** Support for **Business Name + Location** (e.g. *"Royal Beach Hotel Eilat"*, *"Machneyuda Jerusalem"*) OR **Direct Website URL** (e.g. `https://www.isrotel.com/royal-beach-eilat`).
- **Context-Aware Discovery Agent:**
  - **Always Checked:** Google Maps & Reviews, TripAdvisor, Facebook Page Recommendations.
  - **Hospitality & Hotels:** Booking.com (1–10 scale), Expedia.
  - **Dining & Restaurants:** Yelp, TheFork (1–10 scale), OpenTable, Easy.co.il (1–10 scale).
  - **Services & Tech:** Trustpilot, G2 Reviews.

### 2. Critical Feature: Human-in-the-Loop Review & Custom Sources
- Interactive pre-extraction modal/card displaying discovered URLs with confidence scores.
- **"+ Add Custom Source"** mechanism allowing users to inject any niche directory, regional critic, or branch link with custom platform labels and native scales (`1-5`, `1-10`, `0-100`).
- Seamless dynamic inclusion in the extraction pipeline alongside auto-discovered channels.

### 3. Score Normalization & Volume-Weighting Engine
- Unified **0–100 Scale Normalization**:
  - Scale 1–5: `(raw / 5) * 100` (e.g. `4.5 / 5 -> 90.0`)
  - Scale 1–10: `(raw / 10) * 100` (e.g. `8.8 / 10 -> 88.0`)
  - Scale 0–100: `raw`
- **Scoring Formulas:**
  - **Simple Average:** Arithmetic mean across all active channels.
  - **Volume-Weighted Score:** $\frac{\sum (\text{normalizedScore}_i \times \text{reviewCount}_i)}{\sum \text{reviewCount}_i}$ (sources with higher review counts carry proportionally higher weight).
  - **Weight Share (%):** Real-time breakdown of each channel's contribution to the composite score.

### 4. Interactive Historical Analytics & Recharts Trend Chart
- Multi-step Live Stepper (`Discovering` -> `Human Verification` -> `Extracting` -> `Unified Scoring`).
- **Recharts Line Chart:**
  - X-Axis: Historical scan timestamps.
  - Y-Axis: Normalized scores (0–100).
  - **Series Filter Pills:** Interactive toggle controls to compare the Overall Weighted Score alongside individual platform trajectories.
- **"Re-run Scan" Snapshot Action:** Appends a new verified data point to the business history with instant persistence.
- Pre-seeded rich demo histories for immediate exploration.

### 5. Design System & Accessibility Compliance
- **Editorial Hospitality-Tech Aesthetic (No default purple/indigo):**
  - **Dark Mode (Default):** Deep Obsidian (`#0B0F14`, `#131922`), slate borders (`#1F2937`), Warm Amber/Gold accents (`#F59E0B`), and Emerald Teal (`#10B981`) for positive sentiment.
  - **Light Mode:** Warm Alabaster/Stone (`#F8FAFC`, `#FFFFFF`) with crisp slate typography (`#0F172A`).
  - Seamless toggle in top navigation with `localStorage` persistence.
- **Persistent Floating Accessibility Widget (`aria-label="Accessibility Options"`):**
  - Text Size Scaling: Normal (100%), Large (115%), X-Large (130%).
  - High Contrast Mode.
  - Highlight Links & Interactive Controls.
  - Reduce Motion (disables CSS animations & Recharts transitions).
  - Reset All Settings button.
  - Full keyboard navigation (`Tab`, `Esc`, ARIA roles).

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (tested with v20 & v26)
- npm or pnpm

### Running Locally
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Or build and launch production server
npm run build
npm start
```

Navigate to `http://localhost:3000`.

---

## 🛠 Project Structure
```
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── discover/route.ts   # Modular discovery agent API
│   │   │   └── extract/route.ts    # Parallel extraction & scoring API
│   │   ├── globals.css             # Obsidian theme & A11y scaling tokens
│   │   ├── layout.tsx              # Root HTML, Providers, Floating A11y widget
│   │   └── page.tsx                # Main application orchestrator & dashboard
│   ├── components/
│   │   ├── AccessibilityWidget.tsx # Floating accessible settings popover
│   │   ├── HistoricalTrendChart.tsx# Recharts multi-line comparison with toggle pills
│   │   ├── KPISummaryHeader.tsx    # Overall weighted score, simple avg, volume stats
│   │   ├── Navbar.tsx              # Brand logo, dark/light toggle, demo selectors
│   │   ├── ScanStepper.tsx         # 4-stage live scanning stepper
│   │   ├── SearchInput.tsx         # Name/Location & URL discovery inputs
│   │   ├── SourceBreakdownGrid.tsx # Source cards, native ratings & review snippets
│   │   └── SourceVerificationCard.tsx # Human-in-the-loop review & custom source creator
│   ├── context/
│   │   └── ThemeAndAccessibilityContext.tsx
│   ├── lib/
│   │   ├── constants.ts            # Platform registry & category detector
│   │   ├── scoring.ts              # 0-100 normalization & volume-weighted math
│   │   ├── storage.ts              # LocalStorage repository & demo seed data
│   │   └── scrapers/
│   │       ├── discovery.ts        # Search & channel discovery logic
│   │       └── engine.ts           # Resilient multi-source extraction engine
│   └── types/
│       └── index.ts                # TypeScript domain models
└── tailwind.config.ts
```
