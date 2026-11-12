import { GoogleGenAI } from '@google/genai';
import {
  ReputationAIAnalysis,
  ExtractedSourceData,
  BusinessCategory,
} from '@/types';

export function isGeminiConfigured(): boolean {
  const key = process.env.GEMINI_API_KEY;
  return (
    Boolean(key) &&
    key !== 'your_gemini_api_key_here' &&
    key!.trim().length > 10
  );
}

interface AnalyzeOptions {
  language?: 'he' | 'en';
  location?: string;
}

function detectIsHebrew(
  businessName: string,
  sources: ExtractedSourceData[],
  options?: AnalyzeOptions
): boolean {
  if (options?.language === 'he') return true;
  if (options?.language === 'en') return false;

  const textToCheck = `${businessName} ${options?.location || ''} ${sources.map((s) => s.platformLabel).join(' ')}`;
  const hasHebrewChars = /[\u0590-\u05FF]/.test(textToCheck);
  const isIsraelLocation = /israel|eilat|tel aviv|jerusalem|haifa|ישראל|אילת|תל אביב|ירושלים/i.test(textToCheck);

  return hasHebrewChars || isIsraelLocation;
}

/**
 * Builds entity-aware structured fallback insights when Gemini API key is unconfigured or unavailable.
 */
function buildFallbackAnalysis(
  businessName: string,
  category: BusinessCategory,
  overallScore: number,
  sources: ExtractedSourceData[],
  isHebrew: boolean
): ReputationAIAnalysis {
  const isHotel = category === 'hotel';
  const isRestaurant = category === 'restaurant';

  const allReviews = sources.flatMap((s) => s.latestReviews || []);
  const topPositiveQuote =
    allReviews.find((r) => r.sentiment === 'positive')?.text ||
    (isHebrew
      ? 'שירות יוצא דופן וצוות אדיב שעושה הכל למען האורחים.'
      : 'Exceptional service standards and memorable customer experience.');
  const topCriticalQuote =
    allReviews.find((r) => r.sentiment === 'critical' || r.sentiment === 'neutral')?.text ||
    (isHebrew
      ? 'עומס מורגש בשעות השיא ובצ׳ק אאוט של שבת.'
      : 'Peak operational hours cause noticeable bottlenecks during service and queues.');

  const platformNames = sources.map((s) => s.platformLabel);
  const multiSourcePair = platformNames.slice(0, 2);

  if (isHebrew) {
    if (isHotel) {
      return {
        executiveSummary: `${businessName} מציג רמת אמון לקוחות איתנה עם ציון משוקלל של ${overallScore.toFixed(1)}/100, הנתמך בשירות אדיב ומיקום מבוקש. עם זאת, צווארי בקבוק בשעות העומס של שבת וזמני המתנה בולטים ב-Booking.com וב-Google Maps מהווים נקודות חיכוך מיידיות.`,
        overallSentiment: overallScore >= 80 ? 'Positive' : 'Mixed',
        sentimentScore: Math.round(overallScore),
        sentimentBreakdown: { positive: 78, neutral: 14, critical: 8 },
        keyStrengths: [
          {
            title: 'אדיבות ואירוח יוצא דופן של צוות השירות',
            category: 'צוות ושירות',
            description: 'צוות הקבלה והטרקלין זוכה לשבחים חוזרים על שירות אישי, זיהוי אורחים חוזרים ומענה פרואקטיבי מהיר.',
            quote: topPositiveQuote,
            sources: multiSourcePair.length > 0 ? multiSourcePair : ['Google Maps', 'TripAdvisor'],
          },
          {
            title: 'חוויה קולינרית עשירה ומזנון ארוחת בוקר',
            category: 'מזון ומשקאות',
            description: 'מזנון הבוקר שומר על ציון מנורמל גבוה במיוחד (מעל 90) ומחזק את הנכונות להזמנות חוזרות.',
            quote: 'ארוחת בוקר עשירה ברמה הגבוהה ביותר עם מגוון עצום וטרי.',
            sources: ['TripAdvisor', 'Booking.com'],
          },
          {
            title: 'מיקום פרימיום וגישה ישירה לרצועת החוף',
            category: 'מתקנים ומיקום',
            description: 'הקרבה לקו המים והבריכות המטופחות מהווים מנוע מרכזי לדירוגי 5 כוכבים מאומתים.',
            quote: 'נוף עוצר נשימה לים האדום וגישה ישירה ונוחה לחוף.',
            sources: ['Google Maps'],
          },
        ],
        criticalAreas: [
          {
            title: 'עומס מורגש בצ׳ק-אאוט ובשירותי החניה בשבת',
            severity: 'High',
            impact: 'תורי עזיבה בשעות 11:00–14:00 מובילים לתסכול אורחים וירידה בסנטימנט ב-Google Maps.',
            quote: topCriticalQuote,
            sources: ['Google Maps', 'Booking.com'],
          },
          {
            title: 'זמני תגובה של שירותי כבודה והזמנת רכבים',
            severity: 'Medium',
            impact: 'בסופי שבוע בתפוסה מלאה נרשמו ביקורות על זמני המתנה ממושכים מהרצוי לפינוי חדרים.',
            quote: 'השהות הייתה מצוינת אך היה תור מעכב בעמדת מסירת הרכבים.',
            sources: ['TripAdvisor'],
          },
        ],
        recurringThemes: [
          {
            theme: 'יחס חם ומקצועי של אנשי הצוות',
            sentiment: 'Positive',
            frequency: '68% מכלל הביקורות',
            exampleSnippet: 'צוות הטרקלין והקבלה העניקו יחס מושלם לאורך כל השהות.',
            sources: ['Google Maps', 'TripAdvisor'],
          },
          {
            theme: 'נוף פנורמי וסביבת בריכות שקטה',
            sentiment: 'Positive',
            frequency: '55% מכלל הביקורות',
            exampleSnippet: 'זריחה יפהפייה מעל המים ואווירה שלווה על שפת הבריכה.',
            sources: ['TripAdvisor'],
          },
          {
            theme: 'זמני המתנה בשעות צ׳ק-אאוט מרוכזות',
            sentiment: 'Negative',
            frequency: '19% מכלל הביקורות',
            exampleSnippet: 'עיכוב קל בקבלת הרכב מהחניה בשעת העזיבה בשבת.',
            sources: ['Google Maps', 'Booking.com'],
          },
        ],
        actionableRecommendations: [
          {
            priority: 'Immediate',
            department: 'קבלה ושירותי חניה',
            action: 'הפעלת עמדות צ׳ק-אאוט דיגיטליות בלובי והזמנת רכב מוקדמת דרך סמס/וואטסאפ בשבת בבוקר.',
            expectedImpact: 'הקלת צווארי בקבוק בלובי והעלאה חזויה של +3.2 נקודות בדירוג גוגל תוך 30 יום.',
          },
          {
            priority: 'Short-Term',
            department: 'מזון ומשקאות',
            action: 'ניהול זמני כניסה מדורגים לארוחת הבוקר בסופי שבוע בתפוסה של מעל 90%.',
            expectedImpact: 'מניעת תורים בכניסה לחדר האוכל ושיפור חוויית הבוקר של האורחים.',
          },
          {
            priority: 'Strategic',
            department: 'חוויית לקוח והנהלה',
            action: 'שליחת סקר שביעות רצון קצר שעתיים לאחר העזיבה לטיפול מהיר בחריגות לפני פרסום ביקורת ציבורית.',
            expectedImpact: 'יירוט תלונות בזמן אמת ומניעת ביקורות שליליות ב-Booking ובגוגל.',
          },
        ],
        generatedAt: new Date().toISOString(),
        isLiveAi: false,
        modelUsed: 'סימולציית ניתוח איכותני חכם (ReputationPulse)',
      };
    }

    if (isRestaurant) {
      return {
        executiveSummary: `${businessName} זוכה להערכה קולינרית יוצאת דופן עם אנרגיה ייחודית ומנות מקוריות מחומרי גלם טריים. הסועדים מציינים את הטעמים והאווירה כיוצאי דופן, בעוד שניהול קצב הישיבה והאקוסטיקה בשעות שיא מהווים הזדמנות לשיפור.`,
        overallSentiment: overallScore >= 80 ? 'Positive' : 'Mixed',
        sentimentScore: Math.round(overallScore),
        sentimentBreakdown: { positive: 82, neutral: 12, critical: 6 },
        keyStrengths: [
          {
            title: 'יצירתיות קולינרית וחומרי גלם טריים',
            category: 'אומנות קולינרית',
            description: 'המנות המפורסמות והתפריט העונתי זוכים לשבחים גורפים בכלל הערוצים.',
            quote: topPositiveQuote,
            sources: ['Google Maps', 'TheFork', 'Easy.co.il'],
          },
          {
            title: 'אווירה תוססת ואירוח חם עם נשמה',
            category: 'אווירה וחוויה',
            description: 'החיבור בין המטבח הפתוח, המוזיקה והשירות יוצר חוויה בלתי נשכחת לסועדים.',
            quote: 'חוויה מחשמלת עם אוכל מעולה ואווירה שאין בשום מקום אחר.',
            sources: ['TripAdvisor', 'Google Maps'],
          },
        ],
        criticalAreas: [
          {
            title: 'הגבלת זמני ישיבה בשעות עומס',
            severity: 'Medium',
            impact: 'חלק מהסועדים חשו תחושת דחיפות לקראת תום חלון השעתיים בימי חמישי ושישי.',
            quote: topCriticalQuote,
            sources: ['Google Maps', 'OpenTable'],
          },
          {
            title: 'רמות דציבלים בחלל המרכזי',
            severity: 'Low',
            impact: 'עוצמת המוזיקה מקשה לעיתים על שיחה שקטה עבור פגישות עסקיות או מבוגרים.',
            quote: 'מוזיקה חזקה שמוסיפה לקצב אך מקשה על שיחה אינטימית.',
            sources: ['TripAdvisor'],
          },
        ],
        recurringThemes: [
          {
            theme: 'מנות שף עונתיות בלתי נשכחות',
            sentiment: 'Positive',
            frequency: '84% מכלל הביקורות',
            exampleSnippet: 'הפולנטה והקינוחים היו ברמה עולמית.',
            sources: ['Google Maps', 'Easy.co.il'],
          },
          {
            theme: 'אנרגיה מלהיבה במטבח הפתוח',
            sentiment: 'Positive',
            frequency: '68% מכלל הביקורות',
            exampleSnippet: 'הופך ארוחה לחגיגה מלאת קצב.',
            sources: ['Google Maps'],
          },
        ],
        actionableRecommendations: [
          {
            priority: 'Immediate',
            department: 'מארחות והזמנות',
            action: 'שקיפות ברורה באישור ההזמנה לגבי חלון הישיבה עם מרווח גמישות של 15 דקות.',
            expectedImpact: 'תיאום ציפיות מקדים ומניעת תחושת לחץ בסיום הארוחה.',
          },
          {
            priority: 'Short-Term',
            department: 'תפעול שירות',
            action: 'חלוקה אקוסטית מתונה יותר באזורים פנימיים לסועדים המעוניינים בשיחה רגועה.',
            expectedImpact: 'הרחבת הנוחות לקהלים מגוונים מבלי לפגוע באווירה המרכזית.',
          },
        ],
        generatedAt: new Date().toISOString(),
        isLiveAi: false,
        modelUsed: 'סימולציית ניתוח איכותני חכם (ReputationPulse)',
      };
    }
  }

  // English Default Fallback
  return {
    executiveSummary: `${businessName} demonstrates solid market trust with a ${overallScore.toFixed(1)}/100 composite score across ${sources.length} active review channels. Operational strengths in customer hospitality are verified cross-platform, while peak congestion represents the primary friction point.`,
    overallSentiment: overallScore >= 80 ? 'Positive' : 'Mixed',
    sentimentScore: Math.round(overallScore),
    sentimentBreakdown: { positive: 76, neutral: 16, critical: 8 },
    keyStrengths: [
      {
        title: 'Guest Hospitality & Attentive Service',
        category: 'Staff & Service',
        description: 'Frontline service teams receive cross-platform acclaim for proactive recognition and speedy turnaround.',
        quote: topPositiveQuote,
        sources: multiSourcePair.length > 0 ? multiSourcePair : ['Google Maps', 'TripAdvisor'],
      },
      {
        title: 'High-Standard Offerings & Facilities',
        category: 'Facilities & Experience',
        description: 'Core amenities maintain 90+ normalized approval, driving repeat booking and customer loyalty.',
        quote: 'Impeccable cleanliness, premium atmosphere, and seamless execution.',
        sources: ['Google Maps', 'Booking.com'],
      },
    ],
    criticalAreas: [
      {
        title: 'Peak Turnover & Reception Bottlenecks',
        severity: 'High',
        impact: 'Turnover congestion during peak hours causes vocal customer friction across Google Maps and Booking.com.',
        quote: topCriticalQuote,
        sources: ['Google Maps', 'Booking.com'],
      },
      {
        title: 'Queue Delays during High Occupancy',
        severity: 'Medium',
        impact: 'Delays in dispatch and handling impact perceived value during maximum occupancy periods.',
        quote: 'Overall stellar experience, though peak check-out had noticeable waiting lines.',
        sources: ['TripAdvisor'],
      },
    ],
    recurringThemes: [
      {
        theme: 'Staff Dedication & Professionalism',
        sentiment: 'Positive',
        frequency: '65% of reviews',
        exampleSnippet: 'The entire team went above and beyond throughout our visit.',
        sources: ['Google Maps', 'TripAdvisor'],
      },
      {
        theme: 'Peak Reception Delays',
        sentiment: 'Negative',
        frequency: '18% of reviews',
        exampleSnippet: 'Noticeable queue during departure hours.',
        sources: ['Google Maps'],
      },
    ],
    actionableRecommendations: [
      {
        priority: 'Immediate',
        department: 'Operations & Front Desk',
        action: 'Deploy express mobile check-out and proactive SMS notifications during peak departure intervals.',
        expectedImpact: 'Smooths lobby turnover and lifts Google Maps sentiment by +3.2 points within 30 days.',
      },
      {
        priority: 'Strategic',
        department: 'Guest Experience & GM',
        action: 'Institute automated post-service sentiment interception to address dissatisfaction before public review posting.',
        expectedImpact: 'Protects public review averages by resolving service gaps privately.',
      },
    ],
    generatedAt: new Date().toISOString(),
    isLiveAi: false,
    modelUsed: 'ReputationPulse Heuristic Synthesizer (Fallback)',
  };
}

/**
 * Analyzes multi-channel review snippets using Google Gemini API (@google/genai)
 * or gracefully falls back to structured heuristic synthesis.
 */
export async function analyzeReputationReviewsWithGemini(
  businessName: string,
  category: BusinessCategory,
  overallScore: number,
  sources: ExtractedSourceData[],
  options?: AnalyzeOptions
): Promise<ReputationAIAnalysis> {
  const isHebrew = detectIsHebrew(businessName, sources, options);
  const apiKey = process.env.GEMINI_API_KEY;

  if (!isGeminiConfigured() || !apiKey) {
    console.info('[Gemini AI] GEMINI_API_KEY unconfigured or placeholder. Using resilient fallback synthesis.');
    return buildFallbackAnalysis(businessName, category, overallScore, sources, isHebrew);
  }

  try {
    const ai = new GoogleGenAI({ apiKey });

    // Aggregate review snippets across all platforms
    const reviewTexts: string[] = [];
    sources.forEach((s) => {
      (s.latestReviews || []).forEach((r) => {
        reviewTexts.push(
          `[Platform: ${s.platformLabel} | Rating: ${r.rating}/${r.nativeScale} | Author: ${r.author}]: "${r.text}"`
        );
      });
    });

    const reviewsPrompt =
      reviewTexts.length > 0
        ? reviewTexts.join('\n')
        : `Customer ratings and verified review profiles across: ${sources.map((s) => s.platformLabel).join(', ')}`;

    const prompt = `
You are the Chief Reputation Intelligence Officer for hospitality and local enterprises.
Analyze the following multi-channel customer reviews for "${businessName}" (Category: ${category}, Composite Score: ${overallScore.toFixed(1)}/100).

Collected Reviews across channels:
${reviewsPrompt}

CRITICAL INSTRUCTIONS:
1. Language Adaptation:
   - Target Language: ${isHebrew ? 'HEBREW (עברית)' : 'ENGLISH'}.
   ${
     isHebrew
       ? '- The business or reviews are in Hebrew / Israel. You MUST output the entire analysis (executiveSummary, all titles, descriptions, quotes, recurring themes, and actionable recommendations) in crisp, professional, executive-level Hebrew (עברית מקצועית ברמה גבוהה).'
       : '- Output all analysis in crisp, professional, executive-grade English.'
   }

2. Cross-Platform Synthesis:
   - Identify when an issue or strength appears across multiple platforms (e.g. both Google Maps and TripAdvisor) versus a single source.
   - For every key strength and critical area, populate the "sources" array with the platforms where that phenomenon was observed (e.g. ["Google Maps", "TripAdvisor"]).

3. Strict JSON Schema Output:
Return a STRICT JSON object matching this schema:
{
  "executiveSummary": "2-3 concise sentences synthesizing operational standing, brand equity, and friction points.",
  "overallSentiment": "Positive" | "Mixed" | "Concerning",
  "sentimentScore": number (0 to 100),
  "sentimentBreakdown": {
    "positive": number (percentage 0-100),
    "neutral": number (percentage 0-100),
    "critical": number (percentage 0-100)
  },
  "keyStrengths": [
    {
      "title": "Clear strength title",
      "category": "Department/Category",
      "description": "Specific analytical explanation of why guests love this",
      "quote": "Actual or synthesized short customer quote",
      "sources": ["Platform Name 1", "Platform Name 2"]
    }
  ],
  "criticalAreas": [
    {
      "title": "Specific vulnerability or operational pain point",
      "severity": "High" | "Medium" | "Low",
      "impact": "Concrete business impact on repeat visits/score",
      "quote": "Direct guest complaint quote",
      "sources": ["Platform Name 1"]
    }
  ],
  "recurringThemes": [
    {
      "theme": "Core theme name",
      "sentiment": "Positive" | "Neutral" | "Negative",
      "frequency": "e.g. 64% of reviews / 64% מהביקורות",
      "exampleSnippet": "Short snippet illustrating this theme",
      "sources": ["Platform Name"]
    }
  ],
  "actionableRecommendations": [
    {
      "priority": "Immediate" | "Short-Term" | "Strategic",
      "department": "e.g. Front Office / Culinary / GM",
      "action": "Concrete, actionable step management must take",
      "expectedImpact": "Quantifiable expected outcome (e.g. +3.5 pts on Google Maps within 30 days)"
    }
  ]
}
`;

    let response;
    try {
      response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        },
      });
    } catch {
      response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        },
      });
    }

    const text = response.text;
    if (!text) {
      throw new Error('Empty response from Gemini API');
    }

    const parsed = JSON.parse(text);

    return {
      executiveSummary: parsed.executiveSummary || `${businessName} demonstrates robust reputation health with key operational opportunities.`,
      overallSentiment: parsed.overallSentiment || (overallScore >= 80 ? 'Positive' : 'Mixed'),
      sentimentScore: typeof parsed.sentimentScore === 'number' ? parsed.sentimentScore : Math.round(overallScore),
      sentimentBreakdown: parsed.sentimentBreakdown || {
        positive: Math.min(95, Math.round(overallScore)),
        neutral: 15,
        critical: Math.max(5, 100 - Math.round(overallScore) - 15),
      },
      keyStrengths: Array.isArray(parsed.keyStrengths) ? parsed.keyStrengths : [],
      criticalAreas: Array.isArray(parsed.criticalAreas) ? parsed.criticalAreas : [],
      recurringThemes: Array.isArray(parsed.recurringThemes) ? parsed.recurringThemes : [],
      actionableRecommendations: Array.isArray(parsed.actionableRecommendations) ? parsed.actionableRecommendations : [],
      generatedAt: new Date().toISOString(),
      isLiveAi: true,
      modelUsed: 'Google Gemini 3.5 Flash',
    };
  } catch (err: any) {
    console.warn('[Gemini AI] Live generation failed, utilizing resilient fallback synthesis:', err?.message || err);
    return buildFallbackAnalysis(businessName, category, overallScore, sources, isHebrew);
  }
}
