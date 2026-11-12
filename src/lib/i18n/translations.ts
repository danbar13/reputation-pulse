export type Language = 'en' | 'he';

export interface TranslationDictionary {
  brand: {
    name: string;
    tagline: string;
    aiBadge: string;
  };
  navbar: {
    demoQuickLoad: string;
    royalBeach: string;
    machneyuda: string;
    liveEngineStatus: string;
    switchThemeDark: string;
    switchThemeLight: string;
    selectLanguage: string;
    langName: string;
  };
  search: {
    badge: string;
    heading: string;
    subtitle: string;
    tabNameLoc: string;
    tabUrl: string;
    placeholderName: string;
    placeholderLoc: string;
    placeholderUrl: string;
    btnDiscover: string;
    btnDiscovering: string;
    popularPresets: string;
    sampleRoyalBeach: string;
    sampleMachneyuda: string;
    sampleNorman: string;
    sampleMonday: string;
  };
  stepper: {
    step1Label: string;
    step1Desc: string;
    step2Label: string;
    step2Desc: string;
    step3Label: string;
    step3Desc: string;
    step4Label: string;
    step4Desc: string;
  };
  verification: {
    badge: string;
    title: string;
    subtitle: string;
    btnAddCustom: string;
    customTitle: string;
    customLabel: string;
    customLabelPlaceholder: string;
    customUrl: string;
    customScale: string;
    scale1_5: string;
    scale1_10: string;
    scale0_100: string;
    btnIncludeCustom: string;
    btnCancel: string;
    customAddedBadge: string;
    matchConfidence: string;
    btnSave: string;
    btnBackSearch: string;
    btnConfirmScan: string;
    btnExtracting: string;
    activeChannelsCount: string;
    scaleLabel: string;
    editUrlTitle: string;
    excludeTitle: string;
    errorLabel: string;
    errorUrl: string;
  };
  kpi: {
    dossierTitle: string;
    lastIndexed: string;
    btnRerun: string;
    btnRerunning: string;
    kpiWeighted: string;
    kpiWeightedDesc: string;
    kpiSimple: string;
    kpiSimpleDesc: string;
    kpiReviews: string;
    kpiReviewsDesc: string;
    kpiChannels: string;
    kpiChannelsDesc: string;
    grade: string;
    platforms: string;
    verified: string;
  };
  ai: {
    badge: string;
    title: string;
    subtitle: string;
    btnRegenerate: string;
    btnRegenerating: string;
    diagnosisTitle: string;
    sentiment: string;
    sentimentIndex: string;
    tabAll: string;
    tabActions: string;
    tabStrengths: string;
    tabVulnerabilities: string;
    actionPlanTitle: string;
    expectedImpact: string;
    preserveTitle: string;
    improveTitle: string;
    severity: string;
    recurringThemesTitle: string;
    loadingAi: string;
    loadingAiDesc: string;
    liveAiBadge: string;
    modelPrefix: string;
  };
  trend: {
    title: string;
    subtitle: string;
    btnSelectAll: string;
    btnClear: string;
    toggleSeries: string;
    overallSeries: string;
    noSnapshots: string;
    snapshotLabel: string;
  };
  sources: {
    title: string;
    subtitle: string;
    activeChannelsBadge: string;
    btnViewReviews: string;
    labelNormalized: string;
    labelNative: string;
    weightShare: string;
    positive: string;
    neutral: string;
    critical: string;
    recentSnippets: string;
    viewAll: string;
    showLess: string;
    liveVerified: string;
    smartFallback: string;
    indexed: string;
  };
  a11y: {
    title: string;
    textSize: string;
    normalSize: string;
    largeSize: string;
    xlargeSize: string;
    highContrast: string;
    highContrastDesc: string;
    highlightControls: string;
    highlightControlsDesc: string;
    reduceMotion: string;
    reduceMotionDesc: string;
    btnResetA11y: string;
    close: string;
  };
  apiModal: {
    title: string;
    subtitle: string;
    liveEngine: string;
    controlledBy: string;
    active: string;
    disabled: string;
    googlePlacesTitle: string;
    googlePlacesDesc: string;
    serpApiTitle: string;
    serpApiDesc: string;
    geminiTitle: string;
    geminiDesc: string;
    connected: string;
    fallbackActive: string;
    docs: string;
    fallbackNoticeTitle: string;
    fallbackNoticeDesc: string;
    btnRefresh: string;
    btnDone: string;
  };
  exportBar: {
    normalizedNotice: string;
    btnExport: string;
  };
  footer: {
    scaleTag: string;
    weightedTag: string;
    a11yTag: string;
  };
}

export const translations: Record<Language, TranslationDictionary> = {
  en: {
    brand: {
      name: 'ReputationPulse',
      tagline: 'Multi-Source Hospitality & Business Intelligence',
      aiBadge: 'AI',
    },
    navbar: {
      demoQuickLoad: 'Demo Quick Load:',
      royalBeach: 'Royal Beach Eilat',
      machneyuda: 'Machneyuda Jerusalem',
      liveEngineStatus: 'Live Engine Status',
      switchThemeDark: 'Switch to Dark mode',
      switchThemeLight: 'Switch to Light mode',
      selectLanguage: 'Language',
      langName: 'English',
    },
    search: {
      badge: 'Autonomous Multi-Channel Reputation Crawler',
      heading: 'Real-Time Reputation & Score Normalization',
      subtitle:
        'Aggregate reviews across Google Maps, TripAdvisor, Booking.com, Facebook, Yelp & custom review sites on a unified 0–100 scale.',
      tabNameLoc: 'Business Name & Location',
      tabUrl: 'Website URL Discovery',
      placeholderName: 'e.g. Royal Beach Hotel or Machneyuda',
      placeholderLoc: 'Location (e.g. Eilat or Jerusalem)',
      placeholderUrl: 'https://www.isrotel.com/royal-beach-eilat',
      btnDiscover: 'Discover & Verify Channels',
      btnDiscovering: 'Discovering Review Channels...',
      popularPresets: 'Popular Presets:',
      sampleRoyalBeach: '🏨 Royal Beach Hotel Eilat',
      sampleMachneyuda: '🍽️ Machneyuda Restaurant Jerusalem',
      sampleNorman: '🍸 The Norman Tel Aviv',
      sampleMonday: '💻 Monday.com SaaS',
    },
    stepper: {
      step1Label: 'Profile Discovery',
      step1Desc: 'Scanning online directories & maps',
      step2Label: 'Human Verification',
      step2Desc: 'Confirm & add custom sources',
      step3Label: 'Source Extraction',
      step3Desc: 'Scraping scores & reviews volume',
      step4Label: 'Unified Scoring',
      step4Desc: 'Normalizing 0–100 & snapshots',
    },
    verification: {
      badge: 'Human-in-the-Loop Review',
      title: 'Verify Channels for',
      subtitle:
        'Confirm discovered review listings, correct URLs, or inject custom industry review links before running extraction.',
      btnAddCustom: '+ Add Custom Source',
      customTitle: 'Add Custom Reputation Channel',
      customLabel: 'Platform Label',
      customLabelPlaceholder: 'e.g. Michelin Guide, Rest.co.il',
      customUrl: 'Listing / Reviews URL',
      customScale: 'Native Rating Scale',
      scale1_5: '1–5 Scale (e.g. stars)',
      scale1_10: '1–10 Scale (e.g. booking)',
      scale0_100: '0–100 Scale (percentage)',
      btnIncludeCustom: 'Include Channel in Extraction',
      btnCancel: 'Cancel',
      customAddedBadge: 'Custom Added',
      matchConfidence: 'match confidence',
      btnSave: 'Save',
      btnBackSearch: 'Back to Search',
      btnConfirmScan: 'Confirm & Run Intelligence Scan',
      btnExtracting: 'Extracting Scores...',
      activeChannelsCount: 'of sources active for score normalization.',
      scaleLabel: 'Scale',
      editUrlTitle: 'Edit URL',
      excludeTitle: 'Exclude source',
      errorLabel: 'Please provide a platform name or label.',
      errorUrl: 'Please provide a valid URL starting with http:// or https://',
    },
    kpi: {
      dossierTitle: 'REPUTATION DOSSIER',
      lastIndexed: 'Last indexed',
      btnRerun: 'Re-run Scan Snapshot',
      btnRerunning: 'Refreshing...',
      kpiWeighted: 'Overall Weighted Score',
      kpiWeightedDesc: 'Volume-weighted cross-platform composite',
      kpiSimple: 'Simple Average Score',
      kpiSimpleDesc: 'Unweighted cross-platform benchmark',
      kpiReviews: 'Aggregated Reviews',
      kpiReviewsDesc: 'Total feedback sample across all sources',
      kpiChannels: 'Connected Channels',
      kpiChannelsDesc: 'Including auto-discovered & custom sources',
      grade: 'Grade',
      platforms: 'Platforms',
      verified: 'Verified',
    },
    ai: {
      badge: 'AI Qualitative Intelligence',
      title: 'Operational Review Synthesis & Action Items',
      subtitle:
        'Cross-platform guest sentiment synthesized into executive operational priorities: what to preserve, critical vulnerabilities, and departmental action plans.',
      btnRegenerate: 'Regenerate Analysis',
      btnRegenerating: 'Synthesizing...',
      diagnosisTitle: 'Executive Reputation Diagnosis',
      sentiment: 'Sentiment',
      sentimentIndex: 'Index',
      tabAll: 'All Insights',
      tabActions: 'Action Plan',
      tabStrengths: 'What to Preserve',
      tabVulnerabilities: 'What to Improve',
      actionPlanTitle: 'Concrete Departmental Action Plan',
      expectedImpact: 'Expected Impact:',
      preserveTitle: 'What to Preserve (Core Strengths)',
      improveTitle: 'What to Improve (Operational Vulnerabilities)',
      severity: 'Severity',
      recurringThemesTitle: 'Recurring Feedback Themes Across Platforms',
      loadingAi: 'Synthesizing Multi-Source Feedback with Google Gemini...',
      loadingAiDesc:
        'Extracting core strengths to preserve, critical vulnerabilities, and departmental action items.',
      liveAiBadge: 'Gemini API Live',
      modelPrefix: 'Model:',
    },
    trend: {
      title: 'Historical Reputation Trajectory',
      subtitle:
        'Normalized score trajectory (0–100) across scan intervals. Compare multi-channel variance.',
      btnSelectAll: 'Select All',
      btnClear: 'Clear',
      toggleSeries: 'Toggle Series:',
      overallSeries: 'Overall Weighted Score',
      noSnapshots: 'No historical snapshots available yet.',
      snapshotLabel: 'Snapshot',
    },
    sources: {
      title: 'Multi-Channel Source Intelligence',
      subtitle:
        'Breakdown of native ratings, normalized 0–100 scale, volume weighting share, and customer sentiment highlights.',
      activeChannelsBadge: 'Active Channels',
      btnViewReviews: 'View Reviews',
      labelNormalized: 'Normalized',
      labelNative: 'Native Rating',
      weightShare: 'Volume Weight Share:',
      positive: 'Positive',
      neutral: 'Neutral',
      critical: 'Critical',
      recentSnippets: 'Recent Verified Snippets',
      viewAll: 'View All',
      showLess: 'Show Less',
      liveVerified: 'Live Verified',
      smartFallback: 'Smart Fallback',
      indexed: 'Indexed',
    },
    a11y: {
      title: 'Accessibility Options',
      textSize: 'Text Size Scaling',
      normalSize: 'Normal (100%)',
      largeSize: 'Large (115%)',
      xlargeSize: 'X-Large (130%)',
      highContrast: 'High Contrast Mode',
      highContrastDesc: 'Enhance text legibility & border definition',
      highlightControls: 'Highlight Controls',
      highlightControlsDesc: 'High-visibility outlines around buttons & links',
      reduceMotion: 'Reduce Motion',
      reduceMotionDesc: 'Disable animations and chart transitions',
      btnResetA11y: 'Reset Accessibility Settings',
      close: 'Close accessibility panel',
    },
    apiModal: {
      title: 'Live Data Extraction Status',
      subtitle: 'Google Places API (New), SerpApi & Google Gemini API',
      liveEngine: 'Live Scraping Engine',
      controlledBy: 'Controlled by',
      active: 'ACTIVE (TRUE)',
      disabled: 'DISABLED',
      googlePlacesTitle: 'Google Places API (New)',
      googlePlacesDesc:
        'Extracts real-time Google Maps ratings, exact verified review counts, and fresh user review snippets via the New Places API.',
      serpApiTitle: 'SerpApi Multi-Channel Search',
      serpApiDesc:
        'Scrapes live review data from TripAdvisor, Booking.com, Yelp, Facebook, Trustpilot, and G2 using SerpApi engines.',
      geminiTitle: 'Google Gemini API (@google/genai)',
      geminiDesc:
        'Synthesizes customer feedback into structured operational action plans, departmental recommendations, and core strengths to preserve.',
      connected: 'Live Key Connected',
      fallbackActive: 'Fallback Simulation Active',
      docs: 'Docs',
      fallbackNoticeTitle: 'Automatic Fallback Guarantee:',
      fallbackNoticeDesc:
        'Whenever API keys are absent or hit quota limits, ReputationPulse AI automatically falls back to entity-aware deterministic structured simulation so scans always complete smoothly.',
      btnRefresh: 'Refresh Status',
      btnDone: 'Done',
    },
    exportBar: {
      normalizedNotice:
        'Normalized with volume-weighted bias compensation across active channels.',
      btnExport: 'Export Dossier (JSON)',
    },
    footer: {
      scaleTag: 'Unified 0–100 Scale',
      weightedTag: 'Volume Weighted',
      a11yTag: 'Accessibility Compliant',
    },
  },
  he: {
    brand: {
      name: 'ReputationPulse',
      tagline: 'מודיעין מוניטין רב-ערוצי למלונאות ועסקים',
      aiBadge: 'בינה מלאכותית',
    },
    navbar: {
      demoQuickLoad: 'טעינת דמו מהירה:',
      royalBeach: 'רויאל ביץ׳ אילת',
      machneyuda: 'מחניודה ירושלים',
      liveEngineStatus: 'סטטוס מנוע חי',
      switchThemeDark: 'מעבר למצב כהה',
      switchThemeLight: 'מעבר למצב בהיר',
      selectLanguage: 'שפה',
      langName: 'עברית',
    },
    search: {
      badge: 'סורק מוניטין רב-ערוצי אוטונומי',
      heading: 'ניטור מוניטין ונרמול ציונים בזמן אמת',
      subtitle:
        'איגוד וניתוח ביקורות מ-Google Maps, TripAdvisor, Booking.com, פייסבוק, Yelp וערוצים מותאמים אישית בסקאלה אחידה של 0–100.',
      tabNameLoc: 'שם עסק ומיקום',
      tabUrl: 'איתור לפי כתובת אתר (URL)',
      placeholderName: 'לדוגמה: מלון רויאל ביץ׳ או מסעדת מחניודה',
      placeholderLoc: 'מיקום (למשל: אילת, ירושלים)',
      placeholderUrl: 'https://www.isrotel.com/royal-beach-eilat',
      btnDiscover: 'גלה ואמת ערוצי ביקורת',
      btnDiscovering: 'מאתר פרופילי ביקורת ברשת...',
      popularPresets: 'דוגמאות מהירות:',
      sampleRoyalBeach: '🏨 מלון רויאל ביץ׳ אילת',
      sampleMachneyuda: '🍽️ מסעדת מחניודה ירושלים',
      sampleNorman: '🍸 מלון דה נורמן תל אביב',
      sampleMonday: '💻 מאנדיי (Monday.com)',
    },
    stepper: {
      step1Label: 'איתור ערוצים',
      step1Desc: 'סריקת אינדקסים, מפות ומאגרי תיירות',
      step2Label: 'אימות משתמש',
      step2Desc: 'אישור קישורים והוספת מקורות מותאמים',
      step3Label: 'חילוץ ביקורות',
      step3Desc: 'משיכת ציונים, נפח ביקורות וציטוטים',
      step4Label: 'שקלול ונרמול',
      step4Desc: 'נרמול לסקאלת 0–100 ותיעוד היסטורי',
    },
    verification: {
      badge: 'אימות ואישור משתמש (Human-in-the-Loop)',
      title: 'אימות ערוצי ביקורת עבור',
      subtitle:
        'אשר את ערוצי הביקורת שאותרו, ערוך כתובות URL, או הוסף מקורות ספציפיים לתחום לפני הפעלת מנוע החילוץ.',
      btnAddCustom: '+ הוסף ערוץ מותאם אישית',
      customTitle: 'הוספת ערוץ מוניטין מותאם אישית',
      customLabel: 'שם / תווית הפלטפורמה',
      customLabelPlaceholder: 'למשל: מדריך מישלן, Rest.co.il, איזי',
      customUrl: 'כתובת עמוד הביקורות (URL)',
      customScale: 'סקאלת דירוג מקורית',
      scale1_5: 'סקאלה 1–5 (כוכבים / Google / Yelp)',
      scale1_10: 'סקאלה 1–10 (בוקינג / דה-פורק / איזי)',
      scale0_100: 'סקאלה 0–100 (אחוזים)',
      btnIncludeCustom: 'כלול ערוץ זה בחילוץ',
      btnCancel: 'ביטול',
      customAddedBadge: 'הוסף עצמאית',
      matchConfidence: 'רמת אמינות התאמה',
      btnSave: 'שמור',
      btnBackSearch: 'חזרה לחיפוש',
      btnConfirmScan: 'אשר והרץ סריקת מודיעין',
      btnExtracting: 'מחלץ ציונים וביקורות...',
      activeChannelsCount: 'ערוצים פעילים מתוך ערוצי הסריקה לנרמול.',
      scaleLabel: 'סקאלה',
      editUrlTitle: 'ערוך כתובת URL',
      excludeTitle: 'החרג ערוץ זה',
      errorLabel: 'אנא הזן שם או תווית עבור הפלטפורמה.',
      errorUrl: 'אנא הזן כתובת אינטרנט תקינה המתחילה ב-http:// או https://',
    },
    kpi: {
      dossierTitle: 'תיק מוניטין עסקי',
      lastIndexed: 'עודכן לאחרונה',
      btnRerun: 'הרצת סריקה חוזרת',
      btnRerunning: 'מרענן נתונים...',
      kpiWeighted: 'ציון משוקלל כולל',
      kpiWeightedDesc: 'מחושב לפי נפח הביקורות המאומתות בכל ערוץ',
      kpiSimple: 'ציון ממוצע פשוט',
      kpiSimpleDesc: 'ממוצע אריתמטי ללא תלות בכמות הביקורות',
      kpiReviews: 'סך ביקורות מאומתות',
      kpiReviewsDesc: 'מדגם משוב כולל מכלל הפלטפורמות',
      kpiChannels: 'ערוצים מחוברים',
      kpiChannelsDesc: 'כולל ערוצים שאותרו אוטומטית וערוצים מותאמים',
      grade: 'דרגה',
      platforms: 'ערוצים',
      verified: 'מאומת',
    },
    ai: {
      badge: 'מודיעין איכותני מבוסס AI',
      title: 'סינתזת ביקורות תפעולית ותוכנית פעולה',
      subtitle:
        'עיבוד סנטימנט האורחים והביקורות מכלל הפלטפורמות לתוכנית פעולה ניהולית: מה לשמר, נקודות תורפה קריטיות והמלצות לפי מחלקות.',
      btnRegenerate: 'צור ניתוח מחדש',
      btnRegenerating: 'מעבד נתונים...',
      diagnosisTitle: 'אבחון מוניטין ניהולי',
      sentiment: 'סנטימנט',
      sentimentIndex: 'מדד',
      tabAll: 'כל התובנות',
      tabActions: 'תוכנית פעולה',
      tabStrengths: 'מה לשמר',
      tabVulnerabilities: 'מה לשפר',
      actionPlanTitle: 'תוכנית פעולה תפעולית לפי מחלקות',
      expectedImpact: 'השפעה עסקית צפויה:',
      preserveTitle: 'מה לשמר (חוזקות ליבה)',
      improveTitle: 'מה לשפר (נקודות תורפה תפעוליות)',
      severity: 'רמת חומרה',
      recurringThemesTitle: 'נושאים חוזרים בביקורות האורחים',
      loadingAi: 'מעבד ומנתח ביקורות באמצעות Google Gemini...',
      loadingAiDesc:
        'מחלץ חוזקות מובילות לשימור, נקודות תורפה קריטיות והמלצות תפעוליות קונקרטיות.',
      liveAiBadge: 'Gemini חי פעיל',
      modelPrefix: 'מודל:',
    },
    trend: {
      title: 'מסלול מוניטין היסטורי',
      subtitle:
        'מעקב ציונים מנורמלים (0–100) על פני סבבי סריקה. השוואה בזמן אמת בין ערוצי הביקורת.',
      btnSelectAll: 'בחר הכל',
      btnClear: 'נקה הכל',
      toggleSeries: 'הצג סדרות:',
      overallSeries: 'ציון משוקלל כולל',
      noSnapshots: 'אין עדיין נתוני סריקות קודמות.',
      snapshotLabel: 'סריקה',
    },
    sources: {
      title: 'מודיעין ערוצים רב-פלטפורמי',
      subtitle:
        'פירוט ציוני המקור, נרמול ל-0–100, משקל יחסי בציון הכולל ודגשי סנטימנט אורחים.',
      activeChannelsBadge: 'ערוצים פעילים',
      btnViewReviews: 'צפה בביקורות',
      labelNormalized: 'מנורמל',
      labelNative: 'דירוג מקור',
      weightShare: 'חלק ממשקל הציון:',
      positive: 'חיובי',
      neutral: 'ניטרלי',
      critical: 'ביקורתי',
      recentSnippets: 'ציטוטים מאומתים אחרונים',
      viewAll: 'צפה בהכל',
      showLess: 'הצג פחות',
      liveVerified: 'אימות חי',
      smartFallback: 'סימולציה חכמה',
      indexed: 'אונדקס בשעה',
    },
    a11y: {
      title: 'אפשרויות נגישות',
      textSize: 'שינוי גודל טקסט',
      normalSize: 'רגיל (100%)',
      largeSize: 'גדול (115%)',
      xlargeSize: 'גדול מאוד (130%)',
      highContrast: 'מצב ניגודיות גבוהה',
      highContrastDesc: 'שיפור קריאות הטקסט והדגשת קווי מתאר',
      highlightControls: 'הדגשת פקדים ולחצנים',
      highlightControlsDesc: 'מסגרת בולטת סביב כפתורים וקישורים',
      reduceMotion: 'הפחתת תנועה ואנימציות',
      reduceMotionDesc: 'ביטול תנועות ומעברי תרשימים',
      btnResetA11y: 'איפוס כל הגדרות הנגישות',
      close: 'סגור לוח נגישות',
    },
    apiModal: {
      title: 'סטטוס חילוץ נתונים חי ומנועי AI',
      subtitle: 'Google Places API (New), SerpApi ו-Google Gemini API',
      liveEngine: 'מנוע חילוץ חי',
      controlledBy: 'מוגדר ע"י משתנה',
      active: 'פעיל (TRUE)',
      disabled: 'מושבת',
      googlePlacesTitle: 'Google Places API (New)',
      googlePlacesDesc:
        'מחלץ בזמן אמת ציוני מפות גוגל, כמות ביקורות מאומתת וציטוטי ביקורות אחרונים דרך ה-API החדש של גוגל.',
      serpApiTitle: 'חיפוש רב-ערוצי דרך SerpApi',
      serpApiDesc:
        'סורק ביקורות חיות מ-TripAdvisor, Booking.com, Yelp, פייסבוק ו-Trustpilot דרך מנועי SerpApi.',
      geminiTitle: 'Google Gemini API (@google/genai)',
      geminiDesc:
        'מנתח ומסנתז משוב לקוחות לתוכנית פעולה תפעולית מובנית, המלצות מחלקתיות וחוזקות לשימור.',
      connected: 'מפתח חי מחובר',
      fallbackActive: 'סימולציית גיבוי פעילה',
      docs: 'תיעוד',
      fallbackNoticeTitle: 'הבטחת פעולה רציפה:',
      fallbackNoticeDesc:
        'גם ללא הגדרת מפתחות API או במקרה של חריגה במכסות, המערכת פועלת באופן חלק עם סימולציה מציאותית מובנית.',
      btnRefresh: 'רענן סטטוס',
      btnDone: 'סיום',
    },
    exportBar: {
      normalizedNotice:
        'מנורמל עם שקלול נפח סטטיסטי למניעת הטיות בין פלטפורמות שונות.',
      btnExport: 'ייצוא תיק נתונים (JSON)',
    },
    footer: {
      scaleTag: 'סקאלה אחידה 0–100',
      weightedTag: 'שקלול נפח ביקורות',
      a11yTag: 'תאימות נגישות מלאה',
    },
  },
};
