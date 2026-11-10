/**
 * PrayTime Smart TV OS & Ambient Big-Screen Dashboard (src/dashboard.js)
 * Version 5.5 - Permanent Pure Dark Monochromatic UI, Multi-Workspace System & Built-in Minimal Glance Screen
 * - Complete removal of light mode: Always pure black/charcoal with PrayTime Emerald (#00ac89)
 * - Independent Workspace Gallery in Settings & Header with 1-Click Screen Switching
 * - Built-in "Minimal Glance" Workspace (Just Giant Clock, Next Prayer Countdown & Open-Meteo Weather)
 * - Accurate Islamic Timetable Current Prayer (Emerald glow) & Next Prayer (Pulsing amber countdown)
 * - Free-Canvas 24-Column Assist Grid with Infinite Downward Expansion & Zero-Clutter Hidden Scrollbars
 * - Full 114-Surah Auto-Advancing Quran Audio Player & Interactive Quran Reader/Catalog Modal
 * - Full Integration: Open-Meteo Weather, AlAdhan Timings, Qibla Compass, Tasbih & Spiritual Suite
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'praytime_dashboard_master_v7';
  const GRID_COLS = 24;

  // Complete 114 Surahs Metadata (Instant Offline Catalog + API Enrichment)
  const ALL_114_SURAHS = [
    [1, "الفاتحة", "Al-Fatihah", "The Opener", 7, "Meccan"], [2, "البقرة", "Al-Baqarah", "The Cow", 286, "Medinan"], [3, "آل عمران", "Ali 'Imran", "Family of Imran", 200, "Medinan"], [4, "النساء", "An-Nisa", "The Women", 176, "Medinan"], [5, "المائدة", "Al-Ma'idah", "The Table Spread", 120, "Medinan"], [6, "الأنعام", "Al-An'am", "The Cattle", 165, "Meccan"], [7, "الأعراف", "Al-A'raf", "The Heights", 206, "Meccan"], [8, "الأنفال", "Al-Anfal", "The Spoils of War", 75, "Medinan"], [9, "التوبة", "At-Tawbah", "The Repentance", 129, "Medinan"], [10, "يونس", "Yunus", "Jonah", 109, "Meccan"],
    [11, "هود", "Hud", "Hud", 123, "Meccan"], [12, "يوسف", "Yusuf", "Joseph", 111, "Meccan"], [13, "الرعد", "Ar-Ra'd", "The Thunder", 43, "Medinan"], [14, "إبراهيم", "Ibrahim", "Abraham", 52, "Meccan"], [15, "الحجر", "Al-Hijr", "The Rocky Tract", 99, "Meccan"], [16, "النحل", "An-Nahl", "The Bee", 128, "Meccan"], [17, "الإسراء", "Al-Isra", "The Night Journey", 111, "Meccan"], [18, "الكهف", "Al-Kahf", "The Cave", 110, "Meccan"], [19, "مريم", "Maryam", "Mary", 98, "Meccan"], [20, "طه", "Taha", "Ta-Ha", 135, "Meccan"],
    [21, "الأنبياء", "Al-Anbiya", "The Prophets", 112, "Meccan"], [22, "الحج", "Al-Hajj", "The Pilgrimage", 78, "Medinan"], [23, "المؤمنون", "Al-Mu'minun", "The Believers", 118, "Meccan"], [24, "النور", "An-Nur", "The Light", 64, "Medinan"], [25, "الفرقان", "Al-Furqan", "The Criterion", 77, "Meccan"], [26, "الشعراء", "Ash-Shu'ara", "The Poets", 227, "Meccan"], [27, "النمل", "An-Naml", "The Ant", 93, "Meccan"], [28, "القصص", "Al-Qasas", "The Stories", 88, "Meccan"], [29, "العنكبوت", "Al-'Ankabut", "The Spider", 69, "Meccan"], [30, "الروم", "Ar-Rum", "The Romans", 60, "Meccan"],
    [31, "لقمان", "Luqman", "Luqman", 34, "Meccan"], [32, "السجدة", "As-Sajdah", "The Prostration", 30, "Meccan"], [33, "الأحزاب", "Al-Ahzab", "The Combined Forces", 73, "Medinan"], [34, "سبأ", "Saba", "Sheba", 54, "Meccan"], [35, "فاطر", "Fatir", "Originator", 45, "Meccan"], [36, "يس", "Ya-Sin", "Ya Sin", 83, "Meccan"], [37, "الصافات", "As-Saffat", "Those who set the Ranks", 182, "Meccan"], [38, "ص", "Sad", "The Letter Sad", 88, "Meccan"], [39, "الزمر", "Az-Zumar", "The Troops", 75, "Meccan"], [40, "غافر", "Ghafir", "The Forgiver", 85, "Meccan"],
    [41, "فصلت", "Fussilat", "Explained in Detail", 54, "Meccan"], [42, "الشورى", "Ash-Shuraa", "The Consultation", 53, "Meccan"], [43, "الزخرف", "Az-Zukhruf", "The Ornaments of Gold", 89, "Meccan"], [44, "الدخان", "Ad-Dukhan", "The Smoke", 59, "Meccan"], [45, "الجاثية", "Al-Jathiyah", "The Crouching", 37, "Meccan"], [46, "الأحقاف", "Al-Ahqaf", "The Wind-Curved Sandhills", 35, "Meccan"], [47, "محمد", "Muhammad", "Muhammad", 38, "Medinan"], [48, "الفتح", "Al-Fath", "The Victory", 29, "Medinan"], [49, "الحجرات", "Al-Hujurat", "The Rooms", 18, "Medinan"], [50, "ق", "Qaf", "The Letter Qaf", 45, "Meccan"],
    [51, "الذاريات", "Adh-Dhariyat", "The Winnowing Winds", 60, "Meccan"], [52, "الطور", "At-Tur", "The Mount", 49, "Meccan"], [53, "النجم", "An-Najm", "The Star", 62, "Meccan"], [54, "القمر", "Al-Qamar", "The Moon", 55, "Meccan"], [55, "الرحمن", "Ar-Rahman", "The Beneficent", 78, "Medinan"], [56, "الواقعة", "Al-Waqi'ah", "The Inevitable", 96, "Meccan"], [57, "الحديد", "Al-Hadid", "The Iron", 29, "Medinan"], [58, "المجادلة", "Al-Mujadila", "The Pleading Woman", 22, "Medinan"], [59, "الحشر", "Al-Hashr", "The Exile", 24, "Medinan"], [60, "الممتحنة", "Al-Mumtahanah", "She that is to be examined", 13, "Medinan"],
    [61, "الصف", "As-Saf", "The Ranks", 14, "Medinan"], [62, "الجمعة", "Al-Jumu'ah", "The Congregation", 11, "Medinan"], [63, "المنافقون", "Al-Munafiqun", "The Hypocrites", 11, "Medinan"], [64, "التغابن", "At-Taghabun", "The Mutual Disillusion", 18, "Medinan"], [65, "الطلاق", "At-Talaq", "The Divorce", 12, "Medinan"], [66, "التحريم", "At-Tahrim", "The Prohibition", 12, "Medinan"], [67, "الملك", "Al-Mulk", "The Sovereignty", 30, "Meccan"], [68, "القلم", "Al-Qalam", "The Pen", 52, "Meccan"], [69, "الحاقة", "Al-Haqqah", "The Reality", 52, "Meccan"], [70, "المعارج", "Al-Ma'arij", "The Ascending Stairways", 44, "Meccan"],
    [71, "نوح", "Nuh", "Noah", 28, "Meccan"], [72, "الجن", "Al-Jinn", "The Jinn", 28, "Meccan"], [73, "المزمل", "Al-Muzzammil", "The Enshrouded One", 20, "Meccan"], [74, "المدثر", "Al-Muddaththir", "The Cloaked One", 56, "Meccan"], [75, "القيامة", "Al-Qiyamah", "The Resurrection", 40, "Meccan"], [76, "الإنسان", "Al-Insan", "The Man", 31, "Medinan"], [77, "المرسلات", "Al-Mursalat", "The Emissaries", 50, "Meccan"], [78, "النبأ", "An-Naba", "The Tidings", 40, "Meccan"], [79, "النازعات", "An-Nazi'at", "Those who drag forth", 46, "Meccan"], [80, "عبس", "'Abasa", "He Frowned", 42, "Meccan"],
    [81, "التكوير", "At-Takwir", "The Overthrowing", 29, "Meccan"], [82, "الانفطار", "Al-Infitar", "The Cleaving", 19, "Meccan"], [83, "المطففين", "Al-Mutaffifin", "The Defrauding", 36, "Meccan"], [84, "الانشقاق", "Al-Inshiqaq", "The Sundering", 25, "Meccan"], [85, "البروج", "Al-Buruj", "The Mansions of the Stars", 22, "Meccan"], [86, "الطارق", "At-Tariq", "The Nightcommer", 17, "Meccan"], [87, "الأعلى", "Al-A'la", "The Most High", 19, "Meccan"], [88, "الغاشية", "Al-Ghashiyah", "The Overwhelming", 26, "Meccan"], [89, "الفجر", "Al-Fajr", "The Dawn", 30, "Meccan"], [90, "البلد", "Al-Balad", "The City", 20, "Meccan"],
    [91, "الشمس", "Ash-Shams", "The Sun", 15, "Meccan"], [92, "الليل", "Al-Layl", "The Night", 21, "Meccan"], [93, "الضحى", "Ad-Duhaa", "The Morning Hours", 11, "Meccan"], [94, "الشرح", "Ash-Sharh", "The Relief", 8, "Meccan"], [95, "التين", "At-Tin", "The Fig", 8, "Meccan"], [96, "العلق", "Al-'Alaq", "The Clot", 19, "Meccan"], [97, "القدر", "Al-Qadr", "The Power", 5, "Meccan"], [98, "البينة", "Al-Bayyinah", "The Clear Proof", 8, "Medinan"], [99, "الزلزلة", "Az-Zalzalah", "The Earthquake", 8, "Medinan"], [100, "العاديات", "Al-'Adiyat", "The Courser", 11, "Meccan"],
    [101, "القارعة", "Al-Qari'ah", "The Calamity", 11, "Meccan"], [102, "التكاثر", "At-Takathur", "The Rivalry in world increase", 8, "Meccan"], [103, "العصر", "Al-'Asr", "The Declining Day", 3, "Meccan"], [104, "الهمزة", "Al-Humazah", "The Traducer", 9, "Meccan"], [105, "الفيل", "Al-Fil", "The Elephant", 5, "Meccan"], [106, "قريش", "Quraysh", "Quraysh", 4, "Meccan"], [107, "الماعون", "Al-Ma'un", "The Small Kindnesses", 7, "Meccan"], [108, "الكوثر", "Al-Kawthar", "The Abundance", 3, "Meccan"], [109, "الكافرون", "Al-Kafirun", "The Disbelievers", 6, "Meccan"], [110, "النصر", "An-Nasr", "The Divine Support", 3, "Medinan"],
    [111, "المسد", "Al-Masad", "The Palm Fibre", 5, "Meccan"], [112, "الإخلاص", "Al-Ikhlas", "The Sincerity", 4, "Meccan"], [113, "الفلق", "Al-Falaq", "The Daybreak", 5, "Meccan"], [114, "الناس", "An-Nas", "Mankind", 6, "Meccan"]
  ].map(s => ({
    number: s[0],
    name: s[1],
    englishName: s[2],
    englishNameTranslation: s[3],
    numberOfAyahs: s[4],
    revelationType: s[5]
  }));

  const ALL_WIDGET_IDS = [
    'clock', 'left-stack', 'right-stack', 'prayer-dock', 'weather',
    'next-gauge', 'qibla', 'tasbih', 'quran-player', 'ayah',
    'asma', 'azkar', 'hijri-events', 'notes'
  ];

  const DEFAULT_BOXES = {
    'clock': { col: 7, row: 2, w: 12, h: 6 },
    'left-stack': { col: 2, row: 2, w: 4, h: 8 },
    'right-stack': { col: 20, row: 2, w: 4, h: 8 },
    'prayer-dock': { col: 2, row: 11, w: 22, h: 5 },
    'weather': { col: 14, row: 2, w: 9, h: 6 },
    'next-gauge': { col: 7, row: 8, w: 6, h: 3 },
    'qibla': { col: 13, row: 8, w: 6, h: 3 },
    'tasbih': { col: 2, row: 8, w: 5, h: 3 },
    'quran-player': { col: 14, row: 8, w: 9, h: 3 },
    'ayah': { col: 7, row: 8, w: 12, h: 3 },
    'asma': { col: 2, row: 8, w: 5, h: 3 },
    'azkar': { col: 19, row: 8, w: 5, h: 3 },
    'hijri-events': { col: 2, row: 8, w: 5, h: 3 },
    'notes': { col: 19, row: 8, w: 5, h: 3 }
  };

  function createSkinsMap(defaultSkin, overrides = {}) {
    const res = {};
    ALL_WIDGET_IDS.forEach(k => { res[k] = overrides[k] || defaultSkin; });
    return res;
  }

  // =========================================================================
  // PROCEDURAL & CURATED WALLPAPERS ENGINE (SVG & DYNAMIC NATURE)
  // =========================================================================

  // Procedural SVG Backgrounds Generator (Zero-latency vector graphics - Exact match for screenshots)
  function generateProceduralWallpaper(theme = 'signature-sage') {
    let bgColor = '#a3b5a6';
    let pills = [
      { x: 160, w: 220, fill: '#9eb0a1' },
      { x: 360, w: 220, fill: '#8aa08e' },
      { x: 560, w: 220, fill: '#758f79' },
      { x: 760, w: 220, fill: '#5f7f65' },
      { x: 960, w: 220, fill: '#486e4f' },
      { x: 1160, w: 220, fill: '#315d39' },
      { x: 1360, w: 220, fill: '#1b4a24' },
      { x: 1560, w: 280, fill: '#0f3216' }
    ];

    if (theme === 'midnight-sapphire') {
      bgColor = '#111827';
      pills = [
        { x: 160, w: 220, fill: '#19263e' },
        { x: 360, w: 220, fill: '#1d3356' },
        { x: 560, w: 220, fill: '#1b3f6f' },
        { x: 760, w: 220, fill: '#154c87' },
        { x: 960, w: 220, fill: '#0c529e' },
        { x: 1160, w: 220, fill: '#074589' },
        { x: 1360, w: 220, fill: '#043467' },
        { x: 1560, w: 280, fill: '#021f3d' }
      ];
    } else if (theme === 'dunes-amber') {
      bgColor = '#cfb08f';
      pills = [
        { x: 160, w: 220, fill: '#c29d78' },
        { x: 360, w: 220, fill: '#b48a60' },
        { x: 560, w: 220, fill: '#a57648' },
        { x: 760, w: 220, fill: '#946131' },
        { x: 960, w: 220, fill: '#814c1d' },
        { x: 1160, w: 220, fill: '#6e390c' },
        { x: 1360, w: 220, fill: '#572803' },
        { x: 1560, w: 280, fill: '#3d1800' }
      ];
    } else if (theme === 'obsidian-amoled') {
      bgColor = '#1f2327';
      pills = [
        { x: 160, w: 220, fill: '#252a2f' },
        { x: 360, w: 220, fill: '#202428' },
        { x: 560, w: 220, fill: '#1a1d21' },
        { x: 760, w: 220, fill: '#14161a' },
        { x: 960, w: 220, fill: '#0f1114' },
        { x: 1160, w: 220, fill: '#0a0c0e' },
        { x: 1360, w: 220, fill: '#060708' },
        { x: 1560, w: 280, fill: '#010202' }
      ];
    }

    const rects = pills.map(p => `
      <rect x="${p.x}" y="35" width="${p.w}" height="1010" rx="110" fill="${p.fill}" filter="url(#drop-shadow)"/>
    `).join('');

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      <defs>
        <filter id="drop-shadow" x="-30%" y="-15%" width="170%" height="140%">
          <feDropShadow dx="-16" dy="10" stdDeviation="24" flood-color="rgba(0,0,0,0.34)"/>
        </filter>
      </defs>
      <rect width="1920" height="1080" fill="${bgColor}"/>
      ${rects}
    </svg>`;

    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  }

  // Curated High-Resolution Nature & Scenic Wallpapers
  const CURATED_WALLPAPERS = [
    {
      id: 'img_sage',
      name: 'Signature Sage (Default)',
      type: 'local',
      url: 'images/signature-sage.svg',
      thumb: 'images/signature-sage.svg'
    },
    {
      id: 'img_sapphire',
      name: 'Midnight Sapphire',
      type: 'local',
      url: 'images/midnight-sapphire.svg',
      thumb: 'images/midnight-sapphire.svg'
    },
    {
      id: 'img_dunes',
      name: 'Golden Dunes',
      type: 'local',
      url: 'images/golden-dunes.svg',
      thumb: 'images/golden-dunes.svg'
    },
    {
      id: 'img_obsidian',
      name: 'Obsidian AMOLED',
      type: 'local',
      url: 'images/obsidian-amoled.svg',
      thumb: 'images/obsidian-amoled.svg'
    },
    {
      id: 'img_islamic',
      name: 'Emerald Geometric',
      type: 'local',
      url: 'images/islamic-geometric.svg',
      thumb: 'images/islamic-geometric.svg'
    },
    {
      id: 'img_mosque',
      name: 'Night Mosque',
      type: 'local',
      url: 'images/night-mosque.svg',
      thumb: 'images/night-mosque.svg'
    },
    {
      id: 'usp_mountains',
      name: 'Misty Alpine Pines',
      type: 'url',
      url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2400&q=85',
      thumb: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=300&q=60'
    },
    {
      id: 'usp_lake',
      name: 'Emerald Mountain Lake',
      type: 'url',
      url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=2400&q=85',
      thumb: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=300&q=60'
    },
    {
      id: 'usp_aurora',
      name: 'Starry Sky & Northern Lights',
      type: 'url',
      url: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=2400&q=85',
      thumb: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=300&q=60'
    }
  ];

  // Dynamic Unsplash Nature Engine Collections & Rotator
  const UNSPLASH_TOPIC_POOLS = {
    'all': [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2560&q=85',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=2560&q=85',
      'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=2560&q=85',
      'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=2560&q=85',
      'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=2560&q=85'
    ],
    'mountains': [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2560&q=85',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2560&q=85',
      'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=2560&q=85'
    ],
    'forest': [
      'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=2560&q=85',
      'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=2560&q=85',
      'https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=2560&q=85'
    ],
    'desert': [
      'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=2560&q=85',
      'https://images.unsplash.com/photo-1513077202514-c511b41bd4c7?auto=format&fit=crop&w=2560&q=85'
    ],
    'ocean': [
      'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=2560&q=85',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2560&q=85'
    ],
    'night': [
      'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=2560&q=85',
      'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=2560&q=85'
    ],
    'abstract': [
      'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=2560&q=85',
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=2560&q=85'
    ]
  };

  // =========================================================================
  // THE 2 SIGNATURE DESIGNS (Exact Match for User Uploaded Images)
  // =========================================================================
  const CORE_DESIGNS = {
    'design_tv_stage': {
      id: 'design_tv_stage',
      name: 'Living Room TV Stage',
      badge: 'Design 1',
      icon: 'ph-television',
      description: 'Full prayer stage with center digital clock, 114-surah Quran audio, sun & night side stacks, and bottom 6-prayer horizontal dock with Iqamah times',
      features: 'Center Clock • Quran 1-114 • Sun/Night Stacks • 6-Prayer Dock',
      layoutType: 'stage',
      bgType: 'procedural',
      bgPreset: 'signature-sage',
      bgImage: '',
      solidColor: '#1c2822',
      bgBlur: 0,
      bgDim: 25,
      bgVignette: true,
      cardBlur: 20,
      cardOpacity: 88,
      cardRadius: 22,
      accent: '#00ac89',
      clockColor: '#ffffff',
      clockFont: "'JetBrains Mono', monospace",
      clockScale: 100,
      transparentAll: false,
      borderlessAll: false,
      globalSkin: 'matte-dark',
      widgets: {
        'clock': true, 'left-stack': true, 'right-stack': true,
        'prayer-dock': true, 'weather': false, 'next-gauge': false,
        'qibla': false, 'tasbih': false, 'quran-player': true, 'ayah': false,
        'asma': false, 'azkar': false, 'hijri-events': false, 'notes': false
      },
      skins: createSkinsMap('matte-dark', { 'clock': 'matte-dark' }),
      boxes: {
        'left-stack': { col: 2, row: 2, w: 4, h: 9 },
        'clock': { col: 7, row: 2, w: 12, h: 6 },
        'quran-player': { col: 7, row: 8, w: 12, h: 3 },
        'right-stack': { col: 20, row: 2, w: 4, h: 9 },
        'prayer-dock': { col: 2, row: 11, w: 22, h: 5 }
      }
    },
    'design_minimal_glance': {
      id: 'design_minimal_glance',
      name: 'Minimal Glance & Weather',
      badge: 'Design 2',
      icon: 'ph-clock',
      description: 'Clean split screen with giant digital clock on the left, next prayer radial progress ring (31%), and detailed 5-day Open-Meteo weather forecast on the right',
      features: 'Giant Clock • Radial Progress Ring • 5-Day Forecast',
      layoutType: 'minimal',
      bgType: 'procedural',
      bgPreset: 'signature-sage',
      bgImage: '',
      solidColor: '#1c2822',
      bgBlur: 0,
      bgDim: 25,
      bgVignette: true,
      cardBlur: 20,
      cardOpacity: 88,
      cardRadius: 22,
      accent: '#00ac89',
      clockColor: '#ffffff',
      clockFont: "'JetBrains Mono', monospace",
      clockScale: 105,
      transparentAll: false,
      borderlessAll: false,
      globalSkin: 'matte-dark',
      widgets: {
        'clock': true, 'left-stack': false, 'right-stack': false,
        'prayer-dock': false, 'weather': true, 'next-gauge': true,
        'qibla': false, 'tasbih': false, 'quran-player': false, 'ayah': false,
        'asma': false, 'azkar': false, 'hijri-events': false, 'notes': false
      },
      skins: createSkinsMap('matte-dark', { 'clock': 'transparent' }),
      boxes: {
        'clock': { col: 2, row: 3, w: 12, h: 8 },
        'next-gauge': { col: 15, row: 3, w: 8, h: 4 },
        'weather': { col: 15, row: 7, w: 8, h: 6 }
      }
    }
  };

  // Preset Themes Catalog (Extensible in code & UI)
  const PRESET_THEMES = {
    'theme_sage_tv': {
      id: 'theme_sage_tv',
      name: 'Signature Sage • TV Stage',
      badge: 'Design 1',
      icon: 'ph-television',
      designId: 'design_tv_stage',
      bgType: 'procedural',
      bgPreset: 'signature-sage',
      bgBlur: 0,
      bgDim: 25,
      cardSkin: 'matte-dark',
      accent: '#00ac89'
    },
    'theme_sage_glance': {
      id: 'theme_sage_glance',
      name: 'Signature Sage • Minimal Glance',
      badge: 'Design 2',
      icon: 'ph-clock',
      designId: 'design_minimal_glance',
      bgType: 'procedural',
      bgPreset: 'signature-sage',
      bgBlur: 0,
      bgDim: 25,
      cardSkin: 'matte-dark',
      accent: '#00ac89'
    },
    'theme_midnight_glance': {
      id: 'theme_midnight_glance',
      name: 'Midnight Sapphire Glance',
      badge: 'Design 2',
      icon: 'ph-moon-stars',
      designId: 'design_minimal_glance',
      bgType: 'procedural',
      bgPreset: 'midnight-sapphire',
      bgBlur: 4,
      bgDim: 30,
      cardSkin: 'glass',
      accent: '#38bdf8'
    },
    'theme_dunes_tv': {
      id: 'theme_dunes_tv',
      name: 'Golden Sahara TV Stage',
      badge: 'Design 1',
      icon: 'ph-sun',
      designId: 'design_tv_stage',
      bgType: 'procedural',
      bgPreset: 'dunes-amber',
      bgBlur: 0,
      bgDim: 20,
      cardSkin: 'matte-dark',
      accent: '#f59e0b'
    },
    'theme_alpine_tv': {
      id: 'theme_alpine_tv',
      name: 'Misty Alpine Pines TV Stage',
      badge: 'Design 1',
      icon: 'ph-mountains',
      designId: 'design_tv_stage',
      bgType: 'preset',
      bgImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2560&q=85',
      bgBlur: 6,
      bgDim: 35,
      cardSkin: 'glass',
      accent: '#00ac89'
    },
    'theme_amoled_pure': {
      id: 'theme_amoled_pure',
      name: 'AMOLED Pure Pitch Black',
      badge: 'Design 2',
      icon: 'ph-circle',
      designId: 'design_minimal_glance',
      bgType: 'solid',
      solidColor: '#000000',
      bgBlur: 0,
      bgDim: 0,
      cardSkin: 'pitch-black',
      accent: '#00ac89'
    }
  };

  // Seed Workspaces (Backwards-compatible bridge)
  const SEED_WORKSPACES = {
    'ws_living_room': JSON.parse(JSON.stringify(CORE_DESIGNS['design_tv_stage'])),
    'ws_minimal_glance': JSON.parse(JSON.stringify(CORE_DESIGNS['design_minimal_glance']))
  };
  SEED_WORKSPACES['ws_living_room'].id = 'ws_living_room';
  SEED_WORKSPACES['ws_minimal_glance'].id = 'ws_minimal_glance';

  const ASMA_LIST = [
    { ar: 'الرَّحْمَنُ', en: 'Ar-Rahman', meaning: 'The Most Gracious' },
    { ar: 'الرَّحِيمُ', en: 'Ar-Rahim', meaning: 'The Most Merciful' },
    { ar: 'المَلِكُ', en: 'Al-Malik', meaning: 'The Sovereign Lord' },
    { ar: 'القُدُّوسُ', en: 'Al-Quddus', meaning: 'The Most Sacred' },
    { ar: 'السَّلَامُ', en: 'As-Salam', meaning: 'The Source of Peace' },
    { ar: 'المُؤْمِنُ', en: 'Al-Mu’min', meaning: 'The Inspirer of Faith' },
    { ar: 'العَزِيزُ', en: 'Al-Aziz', meaning: 'The Almighty' },
    { ar: 'الغَفَّارُ', en: 'Al-Ghaffar', meaning: 'The Ever-Forgiving' },
    { ar: 'الرَّزَّاقُ', en: 'Ar-Razzaq', meaning: 'The Total Provider' }
  ];

  const AZKAR_LIST = [
    { ar: 'سُبْحَانَ اللهِ وَبِحَمْدِهِ ، سُبْحَانَ اللهِ الْعَظِيمِ', en: 'Glory be to Allah and His praise, Glory be to Allah the Supreme.', count: '100x' },
    { ar: 'لَا إِلَهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ', en: 'There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers.', count: 'Dua' },
    { ar: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ خَلَقْتَنِي وَأَنَا عَبْدُكَ', en: 'O Allah, You are my Lord, none has the right to be worshipped but You.', count: 'Sayyid al-Istighfar' },
    { ar: 'اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى نَبِيِّنَا مُحَمَّدٍ', en: 'O Allah, send peace and blessings upon our Prophet Muhammad.', count: '10x' }
  ];

  const AYAH_LIST = [
    { ar: 'إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَّوْقُوتًا', en: 'Indeed, prayer has been decreed upon the believers a decree of specified times.', ref: '— Surah An-Nisa 4:103' },
    { ar: 'أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ', en: 'Unquestionably, by the remembrance of Allah hearts are assured.', ref: '— Surah Ar-Ra’d 13:28' },
    { ar: 'فَإِنَّ مَعَ الْعُسْرِ يُسْرًا ۝ إِنَّ مَعَ الْعُسْرِ يُسْرًا', en: 'For indeed, with hardship [will be] ease.', ref: '— Surah Ash-Sharh 94:5-6' },
    { ar: 'وَاسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ', en: 'And seek help through patience and prayer.', ref: '— Surah Al-Baqarah 2:45' }
  ];

  // Master State Structure
  let masterState = loadMasterState();
  let editBackupWorkspace = null;
  let isEditMode = false;
  let prayerTimings = null;
  let prayerTimingsTomorrow = null;
  let lastAdhanTrigger = '';
  let surahCatalog = [...ALL_114_SURAHS];
  let currentQuranTab = 'qpane-catalog';

  // Audio Instances
  const quranAudio = new Audio();
  quranAudio.preload = 'none';
  let isQuranPlaying = false;

  const adhanAudio = new Audio('https://www.islamcan.com/audio/adhan/azan1.mp3');
  adhanAudio.preload = 'none';

  function loadMasterState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return createDefaultMasterState();
      const parsed = JSON.parse(raw);
      if (!parsed.version || parsed.version < 7 || !parsed.workspaces) {
        return createDefaultMasterState();
      }
      if (!parsed.activeDesignId) {
        parsed.activeDesignId = (parsed.activeWorkspaceId === 'ws_minimal_glance') ? 'design_minimal_glance' : 'design_tv_stage';
      }
      return parsed;
    } catch (_) {
      return createDefaultMasterState();
    }
  }

  function createDefaultMasterState() {
    return {
      version: 7,
      activeWorkspaceId: 'ws_living_room',
      activeDesignId: 'design_tv_stage',
      activeThemeId: 'theme_sage_tv',
      customThemes: {},
      unsplashConfig: {
        interval: 'off',
        topic: 'all'
      },
      workspaces: JSON.parse(JSON.stringify(SEED_WORKSPACES)),
      timeFormat: '12h',
      showSeconds: true,
      clockScale: 100,
      tempUnit: 'C',
      calcMethod: 5,
      asrMethod: 0,
      hijriOffset: 0,
      iqamahOffset: 15,
      adhanAudio: true,
      autoFullscreen: false,
      city: null,
      country: null,
      lat: null,
      lon: null,
      tasbihCount: 0,
      tasbihPhraseIdx: 0,
      asmaIdx: 0,
      azkarIdx: 0,
      ayahIdx: 0,
      noteText: '',
      quranSurahNum: 1,
      quranReciter: 'ar.alafasy',
      quranAutoNext: true,
      showTomorrow: false
    };
  }

  function getCurrentWorkspace() {
    return masterState.workspaces[masterState.activeWorkspaceId] || masterState.workspaces['ws_living_room'] || Object.values(masterState.workspaces)[0];
  }

  function saveMasterState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(masterState));
    } catch (err) {
      console.warn('Storage save failed:', err);
    }
  }

  // =========================================================================
  // 1. TOAST NOTIFICATIONS & HUD FEEDBACK
  // =========================================================================
  function showHudToast(msg) {
    let toast = document.getElementById('hud-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'hud-toast';
      toast.style.cssText = 'position:fixed; bottom:26px; left:50%; transform:translateX(-50%) translateY(100px); background:rgba(18,20,19,0.96); backdrop-filter:blur(24px); -webkit-backdrop-filter:blur(24px); border:1.5px solid var(--accent); color:#ffffff; padding:10px 24px; border-radius:999px; font-size:0.86rem; font-weight:700; z-index:99999; box-shadow:0 14px 40px rgba(0,0,0,0.65); transition:transform 0.3s cubic-bezier(0.22,1,0.36,1), opacity 0.3s ease; opacity:0; pointer-events:none; display:flex; align-items:center; gap:8px;';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<i class="ph-bold ph-sparkle" style="color:var(--accent);"></i> <span>${escapeHtml(msg)}</span>`;
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(100px)';
    }, 2800);
  }

  // =========================================================================
  // 2. THEME & DESIGN ARCHITECTURE (EXTENSIBLE DEVELOPER API & LIVE UI)
  // =========================================================================

  function applyDesign(designKey) {
    const core = CORE_DESIGNS[designKey] || CORE_DESIGNS['design_tv_stage'];
    masterState.activeDesignId = core.id;

    const targetWsId = (core.id === 'design_minimal_glance') ? 'ws_minimal_glance' : 'ws_living_room';
    let ws = masterState.workspaces[targetWsId];
    if (!ws) {
      ws = JSON.parse(JSON.stringify(core));
      ws.id = targetWsId;
      masterState.workspaces[targetWsId] = ws;
    } else {
      ws.widgets = JSON.parse(JSON.stringify(core.widgets));
      ws.boxes = JSON.parse(JSON.stringify(core.boxes));
      ws.skins = JSON.parse(JSON.stringify(core.skins));
      ws.layoutType = core.layoutType;
      // Default to signature sage if background not set
      if (!ws.bgImage && ws.bgType !== 'procedural') {
        ws.bgType = 'procedural';
        ws.bgPreset = 'signature-sage';
      }
    }

    masterState.activeWorkspaceId = targetWsId;
    saveMasterState();
    applyVisualState();
    renderPrayerDock();
    updatePrayerCountdown(new Date());

    // Sync header toggle buttons
    const isD1 = (core.id === 'design_tv_stage');
    document.getElementById('btn-design-1')?.classList.toggle('active', isD1);
    document.getElementById('btn-design-2')?.classList.toggle('active', !isD1);

    // Sync settings modal cards
    document.getElementById('card-design-tv-stage')?.classList.toggle('active', isD1);
    document.getElementById('card-design-minimal-glance')?.classList.toggle('active', !isD1);

    showHudToast(`Switched to ${core.name}`);
  }

  function applyTheme(themeKey) {
    const preset = PRESET_THEMES[themeKey] || masterState.customThemes?.[themeKey];
    if (!preset) return;

    masterState.activeThemeId = themeKey;

    if (preset.designId) {
      applyDesign(preset.designId);
    }

    const ws = getCurrentWorkspace();
    if (preset.bgType) ws.bgType = preset.bgType;
    if (preset.bgPreset) ws.bgPreset = preset.bgPreset;
    if (preset.bgImage !== undefined) ws.bgImage = preset.bgImage;
    if (preset.solidColor) ws.solidColor = preset.solidColor;
    if (preset.bgBlur !== undefined) ws.bgBlur = preset.bgBlur;
    if (preset.bgDim !== undefined) ws.bgDim = preset.bgDim;
    if (preset.bgVignette !== undefined) ws.bgVignette = preset.bgVignette;
    if (preset.cardSkin) {
      ws.globalSkin = preset.cardSkin;
      ALL_WIDGET_IDS.forEach(k => { ws.skins[k] = preset.cardSkin; });
    }
    if (preset.cardBlur !== undefined) ws.cardBlur = preset.cardBlur;
    if (preset.cardOpacity !== undefined) ws.cardOpacity = preset.cardOpacity;
    if (preset.cardRadius !== undefined) ws.cardRadius = preset.cardRadius;
    if (preset.accent) ws.accent = preset.accent;
    if (preset.clockColor) ws.clockColor = preset.clockColor;
    if (preset.clockFont) ws.clockFont = preset.clockFont;

    saveMasterState();
    applyVisualState();
    syncSettingsUI();
    showHudToast(`Theme "${preset.name}" Applied`);
  }

  function saveCurrentAsCustomTheme(customName = '') {
    const ws = getCurrentWorkspace();
    const count = Object.keys(masterState.customThemes || {}).length + 1;
    const name = customName.trim() || `Custom Theme #${count}`;
    const id = `custom_${Date.now()}`;

    if (!masterState.customThemes) masterState.customThemes = {};

    masterState.customThemes[id] = {
      id,
      name,
      badge: 'Custom',
      icon: 'ph-palette',
      description: `Saved setup from ${ws.name}`,
      designId: masterState.activeDesignId || 'design_tv_stage',
      bgType: ws.bgType,
      bgPreset: ws.bgPreset,
      bgImage: ws.bgImage,
      solidColor: ws.solidColor,
      bgBlur: ws.bgBlur,
      bgDim: ws.bgDim,
      bgVignette: ws.bgVignette,
      cardSkin: ws.globalSkin || 'matte-dark',
      cardBlur: ws.cardBlur,
      cardOpacity: ws.cardOpacity,
      cardRadius: ws.cardRadius,
      accent: ws.accent,
      clockColor: ws.clockColor,
      clockFont: ws.clockFont,
      clockScale: masterState.clockScale,
      widgets: JSON.parse(JSON.stringify(ws.widgets)),
      boxes: JSON.parse(JSON.stringify(ws.boxes))
    };

    masterState.activeThemeId = id;
    saveMasterState();
    
    showHudToast(`Saved "${name}" as new Theme!`);
  }

  function exportCurrentThemeJSON() {
    const ws = getCurrentWorkspace();
    const exportData = {
      version: '5.6',
      name: ws.name,
      designId: masterState.activeDesignId || 'design_tv_stage',
      workspace: ws,
      clockScale: masterState.clockScale,
      exportDate: new Date().toISOString()
    };
    const jsonStr = JSON.stringify(exportData, null, 2);
    if (navigator.clipboard) {
      navigator.clipboard.writeText(jsonStr).then(() => {
        showHudToast('Theme JSON copied to clipboard!');
      }).catch(() => {
        prompt('Copy your Theme JSON:', jsonStr);
      });
    } else {
      prompt('Copy your Theme JSON:', jsonStr);
    }
  }

  function importThemeJSON() {
    const input = prompt('Paste your Theme JSON string here:');
    if (!input) return;
    try {
      const parsed = JSON.parse(input);
      if (!parsed || (!parsed.workspace && !parsed.boxes && !parsed.id)) {
        alert('Invalid Theme JSON structure.');
        return;
      }

      const id = `imported_${Date.now()}`;
      const name = parsed.name || `Imported Theme`;
      if (!masterState.customThemes) masterState.customThemes = {};

      const wsData = parsed.workspace || parsed;
      masterState.customThemes[id] = {
        id,
        name,
        badge: 'Imported',
        icon: 'ph-download-simple',
        description: 'Imported theme configuration',
        designId: parsed.designId || wsData.designPreset || 'design_tv_stage',
        bgType: wsData.bgType || 'procedural',
        bgPreset: wsData.bgPreset || 'signature-sage',
        bgImage: wsData.bgImage || '',
        solidColor: wsData.solidColor || '#000000',
        bgBlur: wsData.bgBlur || 0,
        bgDim: wsData.bgDim ?? 25,
        bgVignette: wsData.bgVignette ?? true,
        cardSkin: wsData.globalSkin || 'matte-dark',
        cardBlur: wsData.cardBlur || 20,
        cardOpacity: wsData.cardOpacity || 88,
        cardRadius: wsData.cardRadius || 22,
        accent: wsData.accent || '#00ac89',
        clockColor: wsData.clockColor || '#ffffff',
        clockFont: wsData.clockFont || "'JetBrains Mono', monospace",
        widgets: wsData.widgets || DEFAULT_BOXES,
        boxes: wsData.boxes || DEFAULT_BOXES
      };

      saveMasterState();
      applyTheme(id);
      
      showHudToast(`Imported & Applied "${name}"!`);
    } catch (e) {
      alert('Error parsing Theme JSON: ' + e.message);
    }
  }

  // Developer API attached to window for easy programmatic theme creation
  window.PrayTimeThemes = {
    applyDesign,
    applyTheme,
    saveCurrentAsCustomTheme,
    exportThemeJSON: exportCurrentThemeJSON,
    importThemeJSON,
    getAvailableDesigns: () => Object.values(CORE_DESIGNS),
    getAvailableThemes: () => ({ ...PRESET_THEMES, ...(masterState.customThemes || {}) }),
    registerTheme: (themeObj) => {
      if (!themeObj || !themeObj.id || !themeObj.name) return false;
      if (!masterState.customThemes) masterState.customThemes = {};
      masterState.customThemes[themeObj.id] = themeObj;
      saveMasterState();
      
      return true;
    }
  };

  // =========================================================================
  // 3. DYNAMIC UNSPLASH ENGINE & SCHEDULER
  // =========================================================================
  let dynamicUnsplashTimer = null;

  function initDynamicUnsplash() {
    if (dynamicUnsplashTimer) {
      clearInterval(dynamicUnsplashTimer);
      dynamicUnsplashTimer = null;
    }

    const cfg = masterState.unsplashConfig || { interval: 'off', topic: 'all' };
    const interval = cfg.interval || 'off';
    if (interval === 'off') return;

    if (interval === 'tod') {
      applyTimeOfDayUnsplash();
      dynamicUnsplashTimer = setInterval(applyTimeOfDayUnsplash, 5 * 60 * 1000);
      return;
    }

    const mins = parseInt(interval, 10);
    if (!isNaN(mins) && mins > 0) {
      dynamicUnsplashTimer = setInterval(() => {
        fetchFreshUnsplashPhoto(cfg.topic || 'all', false);
      }, mins * 60 * 1000);
    }
  }

  function applyTimeOfDayUnsplash() {
    const hr = new Date().getHours();
    let topic = 'forest';
    if (hr >= 4 && hr < 7) topic = 'mountains'; // Dawn / Fajr
    else if (hr >= 7 && hr < 17) topic = 'all'; // Daytime
    else if (hr >= 17 && hr < 19) topic = 'desert'; // Sunset / Maghrib
    else topic = 'night'; // Night / Isha

    fetchFreshUnsplashPhoto(topic, false);
  }

  function fetchFreshUnsplashPhoto(topic = 'all', notify = true) {
    const pool = UNSPLASH_TOPIC_POOLS[topic] || UNSPLASH_TOPIC_POOLS['all'];
    const randomUrl = pool[Math.floor(Math.random() * pool.length)] + `&sig=${Date.now()}`;

    const img = new Image();
    img.onload = () => {
      const ws = getCurrentWorkspace();
      ws.bgType = 'unsplash';
      ws.bgImage = randomUrl;
      applyVisualState();
      saveMasterState();
      renderCuratedWallpapersGrid();
      if (notify) {
        showHudToast(`Loaded fresh ${topic} nature wallpaper`);
      }
    };
    img.src = randomUrl;
  }

  // =========================================================================
  // 4. WORKSPACE BRIDGES & LEGACY COMPATIBILITY
  // =========================================================================
  function switchWorkspace(targetId) {
    if (!masterState.workspaces[targetId]) return;
    masterState.activeWorkspaceId = targetId;
    masterState.activeDesignId = (targetId === 'ws_minimal_glance') ? 'design_minimal_glance' : 'design_tv_stage';
    saveMasterState();
    applyVisualState();
    renderWorkspaceTabs();
    renderPrayerDock();
    updatePrayerCountdown(new Date());
    renderCoreDesignsGrid();
  }

  function renderWorkspaceTabs() {
    // Sync Clean Header Quick 2-Design Switcher
    const isD1 = (masterState.activeDesignId === 'design_tv_stage' || masterState.activeWorkspaceId === 'ws_living_room');
    document.getElementById('btn-design-1')?.classList.toggle('active', isD1);
    document.getElementById('btn-design-2')?.classList.toggle('active', !isD1);
  }

  function renderCoreDesignsGrid() {
    const isD1 = (masterState.activeDesignId === 'design_tv_stage' || masterState.activeWorkspaceId === 'ws_living_room');
    
    // Sync top header toggle buttons
    document.getElementById('btn-design-1')?.classList.toggle('active', isD1);
    document.getElementById('btn-design-2')?.classList.toggle('active', !isD1);

    // Sync settings modal cards
    const c1 = document.getElementById('card-design-tv-stage');
    const c2 = document.getElementById('card-design-minimal-glance');
    if (c1) c1.classList.toggle('active', isD1);
    if (c2) c2.classList.toggle('active', !isD1);
  }

  function renderBuiltinWallpapersGrid() {
    const grid = document.getElementById('builtin-wallpapers-grid');
    if (!grid) return;
    const ws = getCurrentWorkspace();

    grid.innerHTML = CURATED_WALLPAPERS.map(w => {
      const isSelected = (w.url && ws.bgImage === w.url) ||
                         (w.type === 'procedural' && ws.bgType === 'procedural' && ws.bgPreset === w.preset);
      return `
        <div class="bw-card ${isSelected ? 'active' : ''}" data-wall-id="${w.id}" title="${escapeHtml(w.name)}">
          <img class="bw-thumb" src="${w.thumb}" alt="${escapeHtml(w.name)}" loading="lazy" />
          <div class="bw-title">${escapeHtml(w.name)}</div>
        </div>
      `;
    }).join('');

    grid.querySelectorAll('.bw-card').forEach(el => {
      el.addEventListener('click', () => {
        const item = CURATED_WALLPAPERS.find(x => x.id === el.dataset.wallId);
        if (!item) return;
        const curWs = getCurrentWorkspace();
        if (item.type === 'procedural') {
          curWs.bgType = 'procedural';
          curWs.bgPreset = item.preset;
          curWs.bgImage = '';
        } else {
          curWs.bgType = 'image';
          curWs.bgImage = item.url;
        }
        applyVisualState();
        saveMasterState();
        renderBuiltinWallpapersGrid();
        showHudToast(`Applied "${item.name}"`);
      });
    });
  }

  // Alias for backwards compatibility
  function renderCuratedWallpapersGrid() {
    renderBuiltinWallpapersGrid();
  }

  function computeAndApplyStageRows() {
    const ws = getCurrentWorkspace();
    const stage = document.getElementById('canvas-stage');
    if (!stage) return;

    let maxRow = 16;
    ALL_WIDGET_IDS.forEach(k => {
      if (ws.widgets[k] && ws.boxes[k]) {
        const bottom = Number(ws.boxes[k].row) + Number(ws.boxes[k].h);
        if (bottom > maxRow) maxRow = bottom;
      }
    });

    stage.style.setProperty('--stage-rows', Math.max(16, maxRow + 1));
  }

  // =========================================================================
  // 6. APPLY VISUAL STATE, REAL-TIME BLUR & SKINS
  // =========================================================================
  function applyVisualState() {
    const root = document.documentElement;
    const body = document.body;
    const ws = getCurrentWorkspace();

    // Permanent Dark Monochromatic Mode
    body.classList.remove('light');
    body.classList.add('dark');

    // Global transparent & borderless options
    body.classList.toggle('transparent-widgets-all', Boolean(ws.transparentAll));
    body.classList.toggle('borderless-widgets-all', Boolean(ws.borderlessAll));

    // Accent Highlights
    root.style.setProperty('--accent', ws.accent);
    root.style.setProperty('--accent-glow', `${ws.accent}44`);
    root.style.setProperty('--accent-soft', `${ws.accent}25`);

    // Clock Typography & Scale
    root.style.setProperty('--clock-color', ws.clockColor || '#ffffff');
    root.style.setProperty('--clock-font', ws.clockFont || "'JetBrains Mono', monospace");
    root.style.setProperty('--clock-scale', (Number(masterState.clockScale) || 100) / 100);

    // Live Blur & Opacity CSS Variables
    const bgBlur = Math.max(0, Number(ws.bgBlur) || 0);
    const bgDim = Math.max(0, Math.min(0.95, (Number(ws.bgDim) || 0) / 100));
    const cardBlur = Math.max(0, Number(ws.cardBlur) ?? 20);
    const cardOpacity = Math.max(0, Math.min(0.98, (Number(ws.cardOpacity) ?? 88) / 100));
    const cardRadius = Math.max(4, Number(ws.cardRadius) || 22);

    root.style.setProperty('--bg-blur', `${bgBlur}px`);
    root.style.setProperty('--bg-dim', `${bgDim}`);
    root.style.setProperty('--card-blur', `${cardBlur}px`);
    root.style.setProperty('--card-opacity', `${cardOpacity}`);
    root.style.setProperty('--card-radius', `${cardRadius}px`);

    // Real-Time Background Layer
    const bgImageLayer = document.getElementById('bg-image-layer');
    const bgStage = document.getElementById('bg-stage');
    const bgDimOverlay = document.getElementById('bg-dim-overlay');

    if (bgImageLayer) {
      bgImageLayer.style.filter = `blur(${bgBlur}px)`;
      bgImageLayer.style.webkitFilter = `blur(${bgBlur}px)`;
      bgImageLayer.style.transform = bgBlur > 0 ? 'scale(1.08)' : 'scale(1.01)';

      if (ws.bgType === 'solid') {
        bgImageLayer.style.backgroundImage = 'none';
        bgImageLayer.style.backgroundColor = ws.solidColor || '#000000';
        bgStage?.classList.remove('has-image');
      } else if (ws.bgType === 'procedural') {
        const svgUrl = generateProceduralWallpaper(ws.bgPreset || 'signature-sage');
        bgImageLayer.style.backgroundColor = 'transparent';
        bgImageLayer.style.backgroundImage = `url("${svgUrl}")`;
        bgStage?.classList.add('has-image');
      } else {
        bgImageLayer.style.backgroundColor = '#050507';
        bgImageLayer.style.backgroundImage = ws.bgImage ? `url("${ws.bgImage}")` : 'none';
        bgStage?.classList.add('has-image');
      }
    }

    if (bgDimOverlay) {
      bgDimOverlay.style.background = `rgba(0, 0, 0, ${bgDim})`;
    }

    bgStage?.classList.toggle('has-vignette', Boolean(ws.bgVignette));

    computeAndApplyStageRows();

    // Coordinates, Visibility & Appearance Skin for all widgets
    document.querySelectorAll('.tv-widget').forEach(widgetEl => {
      const id = widgetEl.dataset.widgetId;
      if (!id) return;

      const visible = Boolean(ws.widgets[id]);
      widgetEl.classList.toggle('hidden-widget', !visible);
      widgetEl.classList.toggle('widget-hidden', !visible);

      const skin = ws.transparentAll ? 'transparent' : (ws.skins[id] || ws.globalSkin || 'matte-dark');
      widgetEl.setAttribute('data-skin', skin);

      const box = ws.boxes[id] || DEFAULT_BOXES[id];
      if (box) {
        widgetEl.style.setProperty('--col', box.col);
        widgetEl.style.setProperty('--row', box.row);
        widgetEl.style.setProperty('--w', box.w);
        widgetEl.style.setProperty('--h', box.h);
      }
    });

    renderWorkspaceTabs();
    syncSettingsUI();
  }

  // =========================================================================
  // 4. SMART NON-OVERLAPPING PLACEMENT & AUTO-PACK
  // =========================================================================
  function boxesOverlap(a, b) {
    return !(
      a.col + a.w <= b.col ||
      b.col + b.w <= a.col ||
      a.row + a.h <= b.row ||
      b.row + b.h <= a.row
    );
  }

  function findSmartNonOverlappingBox(targetId) {
    const ws = getCurrentWorkspace();
    const def = ws.boxes[targetId] || DEFAULT_BOXES[targetId] || { col: 2, row: 2, w: 6, h: 4 };
    const w = clamp(def.w, 4, GRID_COLS);
    const h = clamp(def.h, 2, 8);

    const activeBoxes = [];
    ALL_WIDGET_IDS.forEach(k => {
      if (k !== targetId && ws.widgets[k] && ws.boxes[k]) {
        activeBoxes.push(ws.boxes[k]);
      }
    });

    const cand0 = { col: clamp(def.col, 1, GRID_COLS - w + 1), row: Math.max(1, def.row), w, h };
    if (!activeBoxes.some(b => boxesOverlap(cand0, b))) return cand0;

    for (let r = 2; r <= 35; r++) {
      for (let c = 2; c <= GRID_COLS - w + 1; c++) {
        const cand = { col: c, row: r, w, h };
        if (!activeBoxes.some(b => boxesOverlap(cand, b))) return cand;
      }
    }

    return cand0;
  }

  function smartAutoPackWidgets() {
    const ws = getCurrentWorkspace();
    const activeIds = ALL_WIDGET_IDS.filter(k => ws.widgets[k]);
    if (!activeIds.length) return;

    const placed = [];

    if (ws.widgets['prayer-dock']) {
      const dockBox = { col: 2, row: 11, w: 22, h: 5 };
      ws.boxes['prayer-dock'] = dockBox;
      placed.push(dockBox);
    }

    const others = activeIds.filter(k => k !== 'prayer-dock');
    others.forEach(key => {
      const def = ws.boxes[key] || DEFAULT_BOXES[key] || { w: 6, h: 4 };
      const w = clamp(def.w, 4, 12);
      const h = clamp(def.h, 3, 7);

      let best = null;
      for (let r = 2; r <= 35; r++) {
        for (let c = 2; c <= GRID_COLS - w + 1; c++) {
          const cand = { col: c, row: r, w, h };
          if (!placed.some(b => boxesOverlap(cand, b))) {
            best = cand;
            break;
          }
        }
        if (best) break;
      }

      if (!best) best = { col: 2, row: 2, w, h };
      ws.boxes[key] = best;
      placed.push(best);
    });

    applyVisualState();
    saveMasterState();

    const statusEl = document.getElementById('assist-status-text');
    if (statusEl) statusEl.textContent = `Auto-Packed ${activeIds.length} widgets with clean spacing`;
  }

  // =========================================================================
  // 5. FREE-CANVAS TOUCH/MOUSE DRAG, RESIZE & LASER ALIGNMENT
  // =========================================================================
  function initCanvasEditor() {
    const stage = document.getElementById('canvas-stage');
    const ghost = document.getElementById('assist-snap-ghost');
    const laserVc = document.getElementById('laser-vc');
    const laserHc = document.getElementById('laser-hc');
    const statusText = document.getElementById('assist-status-text');
    const drawer = document.getElementById('edit-widgets-drawer');

    let activeDrag = null;

    function setEditMode(enable, restoreBackup = false) {
      const ws = getCurrentWorkspace();
      if (enable && !isEditMode) {
        editBackupWorkspace = JSON.parse(JSON.stringify(ws));
      } else if (!enable && restoreBackup && editBackupWorkspace) {
        masterState.workspaces[masterState.activeWorkspaceId] = editBackupWorkspace;
        applyVisualState();
      }

      isEditMode = enable;
      document.body.classList.toggle('is-editing', isEditMode);
      document.body.classList.toggle('edit-mode', isEditMode);

      if (!isEditMode) {
        hideAssist();
        drawer?.classList.remove('open');
      } else {
        renderEditWidgetsDrawer();
        if (statusText) statusText.textContent = `Editing "${ws.name}" • Drag to move • Scroll down to add below`;
      }
    }

    function hideAssist() {
      if (ghost) ghost.classList.remove('visible');
      if (laserVc) laserVc.classList.remove('visible');
      if (laserHc) laserHc.classList.remove('visible');
    }

    document.getElementById('toggle-edit-btn')?.addEventListener('click', () => setEditMode(!isEditMode, false));
    document.getElementById('s-btn-start-free-edit')?.addEventListener('click', () => {
      document.getElementById('dashboard-settings-dialog')?.close();
      setEditMode(true, false);
    });

    document.getElementById('btn-save-edit')?.addEventListener('click', () => {
      saveMasterState();
      setEditMode(false, false);
    });

    document.getElementById('btn-cancel-edit')?.addEventListener('click', () => {
      setEditMode(false, true);
    });

    document.getElementById('btn-smart-pack')?.addEventListener('click', () => smartAutoPackWidgets());
    document.getElementById('s-btn-smart-pack')?.addEventListener('click', () => smartAutoPackWidgets());
    document.getElementById('quick-pack-top-btn')?.addEventListener('click', () => smartAutoPackWidgets());

    document.getElementById('btn-toggle-transparent-all')?.addEventListener('click', () => {
      const ws = getCurrentWorkspace();
      ws.transparentAll = !ws.transparentAll;
      applyVisualState();
      saveMasterState();
    });

    document.getElementById('btn-open-widgets-drawer')?.addEventListener('click', () => {
      drawer?.classList.toggle('open');
    });

    // Widget Action Buttons
    stage?.addEventListener('click', e => {
      const btn = e.target.closest('.w-mini-btn');
      if (!btn) return;
      const widget = btn.closest('.tv-widget');
      if (!widget) return;
      const id = widget.dataset.widgetId;
      const action = btn.dataset.action;
      const ws = getCurrentWorkspace();

      if (action === 'hide') {
        ws.widgets[id] = false;
        applyVisualState();
        renderEditWidgetsDrawer();
      } else if (action === 'center-h') {
        const box = ws.boxes[id] || DEFAULT_BOXES[id];
        if (box) {
          box.col = Math.max(1, Math.round((GRID_COLS - box.w) / 2) + 1);
          ws.boxes[id] = box;
          applyVisualState();
          if (statusText) statusText.textContent = `Centered ${id.toUpperCase()} horizontally`;
        }
      } else if (action === 'skin') {
        const order = ['glass', 'transparent', 'solid-dark', 'emerald', 'gold', 'pitch-black'];
        const cur = ws.skins[id] || 'glass';
        const nextSkin = order[(order.indexOf(cur) + 1) % order.length];
        ws.skins[id] = nextSkin;
        ws.transparentAll = false;
        applyVisualState();
      }
    });

    // Drag & Resize Pointer Events
    stage?.addEventListener('pointerdown', e => {
      if (!isEditMode) return;
      if (e.target.closest('.w-mini-btn') || e.target.closest('input, textarea, select')) return;

      const resizeCorner = e.target.closest('.w-resize-corner');
      const widget = e.target.closest('.tv-widget');
      if (!widget) return;

      const id = widget.dataset.widgetId;
      const rect = widget.getBoundingClientRect();
      const stageRect = stage.getBoundingClientRect();
      const ws = getCurrentWorkspace();
      const curBox = ws.boxes[id] || { ...DEFAULT_BOXES[id] };

      e.preventDefault();
      const captureEl = resizeCorner || widget;
      try { captureEl.setPointerCapture?.(e.pointerId); } catch (_) { }

      activeDrag = {
        type: resizeCorner ? 'resize' : 'move',
        id,
        widget,
        pointerId: e.pointerId,
        startX: e.clientX,
        startY: e.clientY,
        offsetX: e.clientX - rect.left,
        offsetY: e.clientY - rect.top,
        stageRect,
        startBox: { ...curBox },
        liveBox: { ...curBox }
      };

      widget.classList.add(resizeCorner ? 'is-resizing' : 'is-dragging');
      if (ghost) {
        ghost.classList.add('visible');
        updateGhostPosition(activeDrag.liveBox, stageRect);
      }
    });

    stage?.addEventListener('pointermove', e => {
      if (!activeDrag || e.pointerId !== activeDrag.pointerId) return;

      const { type, id, widget, stageRect, offsetX, offsetY, startX, startY, startBox } = activeDrag;
      const stageRows = parseFloat(getComputedStyle(stage).getPropertyValue('--stage-rows')) || 16;
      const colW = stageRect.width / GRID_COLS;
      const rowH = stageRect.height / stageRows;

      let nextCol = startBox.col;
      let nextRow = startBox.row;
      let nextW = startBox.w;
      let nextH = startBox.h;

      if (type === 'move') {
        const relX = e.clientX - stageRect.left - offsetX;
        const relY = e.clientY - stageRect.top - offsetY;

        nextCol = clamp(Math.round(relX / colW) + 1, 1, GRID_COLS - nextW + 1);
        nextRow = Math.max(1, Math.round(relY / rowH) + 1);
      } else {
        const deltaC = Math.round((e.clientX - startX) / colW);
        const deltaR = Math.round((e.clientY - startY) / rowH);

        nextW = clamp(startBox.w + deltaC, 3, GRID_COLS - startBox.col + 1);
        nextH = Math.max(2, startBox.h + deltaR);
      }

      if (nextRow + nextH > stageRows) {
        stage.style.setProperty('--stage-rows', nextRow + nextH + 2);
      }

      if (e.clientY > window.innerHeight - 60) {
        window.scrollBy({ top: 18, behavior: 'instant' });
      } else if (e.clientY < 70) {
        window.scrollBy({ top: -18, behavior: 'instant' });
      }

      activeDrag.liveBox = { col: nextCol, row: nextRow, w: nextW, h: nextH };

      widget.style.setProperty('--col', nextCol);
      widget.style.setProperty('--row', nextRow);
      widget.style.setProperty('--w', nextW);
      widget.style.setProperty('--h', nextH);

      if (statusText) {
        statusText.textContent = `${id.toUpperCase()} → Col ${nextCol}, Row ${nextRow} • Size ${nextW}×${nextH}`;
      }

      updateGhostPosition(activeDrag.liveBox, stageRect);
      updateLaserGuides(activeDrag.liveBox, stageRect);
    });

    function endDrag(e) {
      if (!activeDrag) return;
      if (e && e.pointerId !== undefined && e.pointerId !== activeDrag.pointerId) return;

      const { id, widget, liveBox } = activeDrag;
      widget.classList.remove('is-dragging', 'is-resizing');
      const ws = getCurrentWorkspace();
      ws.boxes[id] = { ...liveBox };
      computeAndApplyStageRows();
      hideAssist();
      activeDrag = null;
    }

    stage?.addEventListener('pointerup', endDrag);
    stage?.addEventListener('pointercancel', endDrag);

    function updateGhostPosition(box, stageRect) {
      if (!ghost) return;
      const stageRows = parseFloat(getComputedStyle(stage).getPropertyValue('--stage-rows')) || 16;
      const colW = stageRect.width / GRID_COLS;
      const rowH = stageRect.height / stageRows;

      const left = (box.col - 1) * colW + 6;
      const top = (box.row - 1) * rowH + 6;
      const width = box.w * colW - 12;
      const height = box.h * rowH - 12;

      ghost.style.left = `${left}px`;
      ghost.style.top = `${top}px`;
      ghost.style.width = `${width}px`;
      ghost.style.height = `${height}px`;
      ghost.textContent = `Col ${box.col}:${box.col + box.w - 1} • Row ${box.row}:${box.row + box.h - 1}`;
    }

    function updateLaserGuides(box, stageRect) {
      if (!laserVc || !laserHc) return;
      const centerCol = (box.col - 1) + box.w / 2;
      const stageRows = parseFloat(getComputedStyle(stage).getPropertyValue('--stage-rows')) || 16;
      const centerRow = (box.row - 1) + box.h / 2;

      if (Math.abs(centerCol - GRID_COLS / 2) <= 0.6) {
        laserVc.classList.add('visible');
        laserVc.style.left = `${stageRect.width / 2}px`;
      } else {
        laserVc.classList.remove('visible');
      }

      if (Math.abs(centerRow - stageRows / 2) <= 0.6) {
        laserHc.classList.add('visible');
        laserHc.style.top = `${stageRect.height / 2}px`;
      } else {
        laserHc.classList.remove('visible');
      }
    }

    function renderEditWidgetsDrawer() {
      if (!drawer) return;
      const ws = getCurrentWorkspace();
      drawer.innerHTML = ALL_WIDGET_IDS.map(k => {
        const on = Boolean(ws.widgets[k]);
        return `
          <button type="button" class="w-toggle-chip ${on ? 'active' : ''}" data-drawer-widget="${k}">
            <i class="ph ${on ? 'ph-check-circle' : 'ph-plus-circle'}"></i>
            <span>${k}</span>
          </button>
        `;
      }).join('');

      drawer.querySelectorAll('[data-drawer-widget]').forEach(chip => {
        chip.addEventListener('click', () => {
          const k = chip.dataset.drawerWidget;
          const turnOn = !ws.widgets[k];
          ws.widgets[k] = turnOn;
          if (turnOn) ws.boxes[k] = findSmartNonOverlappingBox(k);
          applyVisualState();
          renderEditWidgetsDrawer();
        });
      });
    }
  }

  // =========================================================================
  // 6. ACCURATE CURRENT & NEXT PRAYER CALCULATION & HIGHLIGHTING
  // =========================================================================
  function getCalculatedPrayersSchedule(now = new Date()) {
    if (!prayerTimings) return null;

    const timings = masterState.showTomorrow && prayerTimingsTomorrow ? prayerTimingsTomorrow : prayerTimings;
    const names = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

    const items = names.map(name => {
      const d = parseTimeString(timings[name], now);
      return { name, date: d };
    }).filter(x => x.date);

    if (items.length < 6) return null;

    let currentPrayer = null;
    let nextPrayer = null;
    let prevPrayer = null;

    const [fajr, sunrise, dhuhr, asr, maghrib, isha] = items.map(x => x.date);

    if (now < fajr) {
      currentPrayer = 'Isha';
      nextPrayer = 'Fajr';
      prevPrayer = 'Isha';
    } else if (now >= fajr && now < sunrise) {
      currentPrayer = 'Fajr';
      nextPrayer = 'Sunrise';
      prevPrayer = 'Fajr';
    } else if (now >= sunrise && now < dhuhr) {
      currentPrayer = 'Sunrise';
      nextPrayer = 'Dhuhr';
      prevPrayer = 'Sunrise';
    } else if (now >= dhuhr && now < asr) {
      currentPrayer = 'Dhuhr';
      nextPrayer = 'Asr';
      prevPrayer = 'Dhuhr';
    } else if (now >= asr && now < maghrib) {
      currentPrayer = 'Asr';
      nextPrayer = 'Maghrib';
      prevPrayer = 'Asr';
    } else if (now >= maghrib && now < isha) {
      currentPrayer = 'Maghrib';
      nextPrayer = 'Isha';
      prevPrayer = 'Maghrib';
    } else {
      currentPrayer = 'Isha';
      nextPrayer = 'Fajr';
      prevPrayer = 'Isha';
    }

    return { items, currentPrayer, nextPrayer, prevPrayer, timings };
  }

  function renderPrayerDock() {
    const dock = document.getElementById('prayer-horizon-dock');
    if (!dock || !prayerTimings) return;

    const now = new Date();
    const sched = getCalculatedPrayersSchedule(now);
    if (!sched) return;

    const { currentPrayer, nextPrayer, timings } = sched;
    const prayers = [
      { name: 'Fajr', ar: 'الفجر' },
      { name: 'Sunrise', ar: 'الشروق' },
      { name: 'Dhuhr', ar: 'الظهر' },
      { name: 'Asr', ar: 'العصر' },
      { name: 'Maghrib', ar: 'المغرب' },
      { name: 'Isha', ar: 'العشاء' }
    ];

    dock.innerHTML = prayers.map(p => {
      const raw = timings[p.name];
      const d = parseTimeString(raw, now);
      const timeStr = d ? formatClock(d) : '--:--';
      const offset = masterState.iqamahOffset || 15;
      const iqStr = (d && p.name !== 'Sunrise') ? `Iqamah ${formatClock(new Date(d.getTime() + offset * 60000))}` : '';

      const isCurrent = (p.name === currentPrayer);
      const isNext = (p.name === nextPrayer);
      const isPassed = (d && now > d && !isCurrent);

      let cardClass = 'dock-prayer-item';
      if (isCurrent) cardClass += ' current';
      else if (isNext) cardClass += ' next';
      else if (isPassed) cardClass += ' passed';

      let badgeHtml = '';
      if (isCurrent) badgeHtml = `<span class="dpi-tag tag-current">CURRENT • الآن</span>`;
      else if (isNext) badgeHtml = `<span class="dpi-tag tag-next">NEXT • القادمة</span>`;

      return `
        <div class="${cardClass}" data-prayer="${p.name}">
          <span class="dpi-name">${p.name} <span class="dpi-ar">${p.ar}</span></span>
          <span class="dpi-time">${timeStr}</span>
          ${iqStr ? `<span class="dpi-sub">${iqStr}</span>` : ''}
          ${badgeHtml}
        </div>
      `;
    }).join('');

    // Side Stacks
    const fDate = parseTimeString(timings.Fajr);
    const sDate = parseTimeString(timings.Sunrise);
    const mDate = parseTimeString(timings.Maghrib);

    if (fDate) {
      const tahajjud = new Date(fDate.getTime() - 75 * 60000);
      const imsak = new Date(fDate.getTime() - 10 * 60000);
      setText('st-tahajjud', formatClock(tahajjud));
      setText('st-imsak', formatClock(imsak));
    }
    if (sDate) {
      const duha = new Date(sDate.getTime() + 25 * 60000);
      setText('st-sunrise', formatClock(sDate));
      setText('st-duha', formatClock(duha));
    }
    if (mDate) {
      setText('st-sunset', formatClock(mDate));
      setText('st-iftar', formatClock(mDate));
    }
  }

  function updatePrayerCountdown(now = new Date()) {
    if (!prayerTimings) return;
    const sched = getCalculatedPrayersSchedule(now);
    if (!sched) return;

    const { items, currentPrayer, nextPrayer } = sched;
    const nextItem = items.find(x => x.name === nextPrayer);
    if (!nextItem) return;

    let targetDate = nextItem.date;
    if (now > targetDate) {
      targetDate = new Date(targetDate.getTime() + 86400000);
    }

    const diff = Math.max(0, Math.floor((targetDate - now) / 1000));
    const h = String(Math.floor(diff / 3600)).padStart(2, '0');
    const m = String(Math.floor((diff % 3600) / 60)).padStart(2, '0');
    const s = String(diff % 60).padStart(2, '0');
    const countdownStr = `${h}:${m}:${s}`;

    // Giant Clock Subtitle
    setText('clock-next-label', `NEXT: ${nextPrayer.toUpperCase()} • CURRENT: ${currentPrayer.toUpperCase()}`);
    setText('clock-next-timer', countdownStr);

    // Radial Gauge Widget
    setText('cp-active-tag', `CURRENT: ${currentPrayer.toUpperCase()}`);
    setText('np-gauge-title', `Next: ${nextPrayer}`);

    const iqDate = new Date(targetDate.getTime() + (masterState.iqamahOffset || 15) * 60000);
    setText('np-target-time', `Adhan ${formatClock(targetDate)} • Iqamah ${formatClock(iqDate)}`);

    const ringFill = document.getElementById('gauge-ring-fill');
    const pctVal = document.getElementById('gauge-pct-val');

    const prevItem = items.find(x => x.name === currentPrayer);
    let prevDate = prevItem ? prevItem.date : new Date(targetDate.getTime() - 4 * 3600000);
    if (prevDate > now) prevDate = new Date(prevDate.getTime() - 86400000);

    const totalSpan = Math.max(1, targetDate - prevDate);
    const elapsed = Math.max(0, now - prevDate);
    const ratio = clamp(elapsed / totalSpan, 0, 1);
    const pct = Math.round(ratio * 100);

    if (pctVal) pctVal.textContent = `${pct}%`;
    if (ringFill) {
      const circ = 264;
      ringFill.style.strokeDashoffset = `${circ * (1 - ratio)}`;
    }

    // Adhan audio chime trigger at exact prayer time
    if (masterState.adhanAudio && diff === 0) {
      const triggerKey = `${nextPrayer}_${now.getHours()}_${now.getMinutes()}`;
      if (lastAdhanTrigger !== triggerKey) {
        lastAdhanTrigger = triggerKey;
        adhanAudio.play().catch(() => { });
      }
    }
  }

  // =========================================================================
  // 7. FULL 114-SURAH QURAN PLAYER & INTERACTIVE MODAL
  // =========================================================================
  function getSurah(num) {
    return surahCatalog.find(s => s.number === Number(num)) || ALL_114_SURAHS[0];
  }

  function updateQuranWidgetDisplay() {
    const s = getSurah(masterState.quranSurahNum);
    setText('qp-current-surah-title', `${s.number}. ${s.englishName} (${s.name})`);
    setText('qp-status-badge', isQuranPlaying ? 'Playing' : (masterState.quranAutoNext ? 'Auto 1→114' : 'Paused'));

    const playIcon = document.getElementById('qp-play-icon');
    if (playIcon) playIcon.className = isQuranPlaying ? 'ph-fill ph-pause' : 'ph-fill ph-play';

    document.querySelectorAll('.surah-card-item').forEach(c => {
      c.classList.toggle('active-surah', Number(c.dataset.surahNum) === Number(masterState.quranSurahNum));
    });
  }

  function playSurah(num, autoStart = true) {
    const validNum = clamp(Number(num) || 1, 1, 114);
    masterState.quranSurahNum = validNum;
    saveMasterState();
    updateQuranWidgetDisplay();

    if (!autoStart) return;

    const primaryUrl = `https://cdn.islamic.network/quran/audio-surah/128/${masterState.quranReciter}/${validNum}.mp3`;
    const fallbackUrl = `https://server8.mp3quran.net/afs/${String(validNum).padStart(3, '0')}.mp3`;

    quranAudio.pause();
    quranAudio.src = primaryUrl;
    quranAudio.dataset.fallbackTried = '0';

    quranAudio.play().then(() => {
      isQuranPlaying = true;
      updateQuranWidgetDisplay();
    }).catch(() => {
      if (quranAudio.dataset.fallbackTried !== '1') {
        quranAudio.dataset.fallbackTried = '1';
        quranAudio.src = fallbackUrl;
        quranAudio.play().then(() => {
          isQuranPlaying = true;
          updateQuranWidgetDisplay();
        }).catch(() => {
          isQuranPlaying = false;
          updateQuranWidgetDisplay();
        });
      }
    });
  }

  function toggleQuranPlay() {
    if (!quranAudio.src) {
      playSurah(masterState.quranSurahNum, true);
      return;
    }
    if (isQuranPlaying) {
      quranAudio.pause();
      isQuranPlaying = false;
      updateQuranWidgetDisplay();
    } else {
      quranAudio.play().then(() => {
        isQuranPlaying = true;
        updateQuranWidgetDisplay();
      }).catch(() => playSurah(masterState.quranSurahNum, true));
    }
  }

  function stepSurah(delta) {
    let next = Number(masterState.quranSurahNum) + delta;
    if (next > 114) next = 1;
    if (next < 1) next = 114;
    playSurah(next, true);
    if (currentQuranTab === 'qpane-reader') loadSurahVerses(next);
  }

  quranAudio.addEventListener('ended', () => {
    if (masterState.quranAutoNext) {
      const next = masterState.quranSurahNum >= 114 ? 1 : masterState.quranSurahNum + 1;
      playSurah(next, true);
    } else {
      isQuranPlaying = false;
      updateQuranWidgetDisplay();
    }
  });

  quranAudio.addEventListener('error', () => {
    if (quranAudio.dataset.fallbackTried !== '1' && masterState.quranSurahNum) {
      quranAudio.dataset.fallbackTried = '1';
      quranAudio.src = `https://server8.mp3quran.net/afs/${String(masterState.quranSurahNum).padStart(3, '0')}.mp3`;
      quranAudio.play().catch(() => { });
    }
  });

  function renderQuranCatalog(filterQuery = '', isJuzAmma = false) {
    const container = document.getElementById('qpane-catalog');
    if (!container) return;

    const q = (filterQuery || '').trim().toLowerCase();
    const list = surahCatalog.filter(s => {
      if (isJuzAmma && s.number < 78) return false;
      if (!q) return true;
      return (
        String(s.number).includes(q) ||
        s.englishName.toLowerCase().includes(q) ||
        s.englishNameTranslation.toLowerCase().includes(q) ||
        s.name.includes(q)
      );
    });

    container.innerHTML = list.map(s => `
      <div class="surah-card-item ${Number(s.number) === Number(masterState.quranSurahNum) ? 'active-surah' : ''}" data-surah-num="${s.number}">
        <div class="sci-number">${s.number}</div>
        <div class="sci-meta">
          <div class="sci-en">${s.englishName}</div>
          <div class="sci-trans">${s.englishNameTranslation} • ${s.numberOfAyahs} Ayahs</div>
        </div>
        <div class="sci-ar" dir="rtl">${s.name}</div>
      </div>
    `).join('');

    container.querySelectorAll('.surah-card-item').forEach(card => {
      card.addEventListener('click', () => {
        playSurah(Number(card.dataset.surahNum), true);
      });
    });
  }

  async function loadSurahVerses(surahNum) {
    const pane = document.getElementById('qpane-reader');
    if (!pane) return;
    const s = getSurah(surahNum);

    pane.innerHTML = `
      <div style="text-align:center; padding:16px;">
        <h3 style="font-size:1.3rem;">Surah ${s.englishName} (${s.name})</h3>
        <p style="color:var(--text-muted); font-size:0.8rem;">${s.numberOfAyahs} Verses • ${s.revelationType}</p>
        <p style="color:var(--accent); margin-top:8px;">Loading verses...</p>
      </div>
    `;

    try {
      const [arRes, enRes] = await Promise.all([
        fetch(`https://api.alquran.cloud/v1/surah/${surahNum}/quran-uthmani`).then(r => r.json()),
        fetch(`https://api.alquran.cloud/v1/surah/${surahNum}/en.sahih`).then(r => r.json())
      ]);

      if (arRes?.data?.ayahs && enRes?.data?.ayahs) {
        pane.innerHTML = `
          <div style="text-align:center; margin-bottom:14px;">
            <h3 style="font-size:1.3rem;">Surah ${s.englishName} • <span style="font-family:'Amiri',serif; color:var(--accent);">${s.name}</span></h3>
            <p style="color:var(--text-muted); font-size:0.8rem;">${s.numberOfAyahs} Verses • ${s.revelationType} • ${s.englishNameTranslation}</p>
          </div>
          <div class="verses-list">
            ${arRes.data.ayahs.map((ayah, i) => `
              <div class="q-verse-box" style="padding:12px; margin-bottom:10px; border-radius:12px; background:rgba(255,255,255,0.04); border:1px solid var(--border-color);">
                <div style="font-family:'Amiri',serif; font-size:1.25rem; color:var(--text-main); line-height:1.7;" dir="rtl">${ayah.text} ﴿${ayah.numberInSurah}﴾</div>
                <div style="font-size:0.8rem; color:var(--text-secondary); margin-top:6px;">${ayah.numberInSurah}. ${enRes.data.ayahs[i]?.text || ''}</div>
              </div>
            `).join('')}
          </div>
        `;
      }
    } catch (_) {
      pane.innerHTML = `<div style="text-align:center; padding:20px; color:var(--text-muted);">Audio playback active. Offline text unavailable.</div>`;
    }
  }

  function initQuranEngine() {
    const qDialog = document.getElementById('quran-picker-dialog');
    setupDialogLightDismiss(qDialog);

    fetch('https://api.alquran.cloud/v1/surah')
      .then(r => r.json())
      .then(res => {
        if (Array.isArray(res?.data) && res.data.length === 114) {
          surahCatalog = res.data;
          renderQuranCatalog(document.getElementById('q-modal-search')?.value || '', currentQuranTab === 'qpane-juzamma');
        }
      })
      .catch(() => { });

    renderQuranCatalog('');
    updateQuranWidgetDisplay();

    document.getElementById('qp-play-toggle')?.addEventListener('click', toggleQuranPlay);
    document.getElementById('qp-prev-btn')?.addEventListener('click', () => stepSurah(-1));
    document.getElementById('qp-next-btn')?.addEventListener('click', () => stepSurah(1));

    function openQuranModal() {
      renderQuranCatalog(document.getElementById('q-modal-search')?.value || '', currentQuranTab === 'qpane-juzamma');
      updateQuranWidgetDisplay();
      if (!qDialog?.open) qDialog?.showModal();
    }

    document.getElementById('qp-open-modal-btn')?.addEventListener('click', openQuranModal);
    document.getElementById('open-quran-modal-top-btn')?.addEventListener('click', openQuranModal);

    document.getElementById('q-modal-search')?.addEventListener('input', e => {
      renderQuranCatalog(e.target.value, currentQuranTab === 'qpane-juzamma');
    });

    document.getElementById('q-modal-reciter')?.addEventListener('change', e => {
      masterState.quranReciter = e.target.value;
      saveMasterState();
      if (isQuranPlaying) playSurah(masterState.quranSurahNum, true);
    });

    document.getElementById('q-modal-autonext')?.addEventListener('change', e => {
      masterState.quranAutoNext = e.target.checked;
      saveMasterState();
      updateQuranWidgetDisplay();
    });

    document.querySelectorAll('[data-qtab]').forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.qtab;
        currentQuranTab = target;
        document.querySelectorAll('[data-qtab]').forEach(b => b.classList.toggle('active', b === tab));

        const catalogEl = document.getElementById('qpane-catalog');
        const readerEl = document.getElementById('qpane-reader');

        if (target === 'qpane-catalog') {
          if (catalogEl) catalogEl.style.display = 'grid';
          if (readerEl) readerEl.style.display = 'none';
          renderQuranCatalog(document.getElementById('q-modal-search')?.value || '', false);
        } else if (target === 'qpane-juzamma') {
          if (catalogEl) catalogEl.style.display = 'grid';
          if (readerEl) readerEl.style.display = 'none';
          renderQuranCatalog(document.getElementById('q-modal-search')?.value || '', true);
        } else if (target === 'qpane-reader') {
          if (catalogEl) catalogEl.style.display = 'none';
          if (readerEl) readerEl.style.display = 'block';
          loadSurahVerses(masterState.quranSurahNum);
        }
      });
    });
  }

  // =========================================================================
  // 8. SETTINGS MODAL & ACCENT/COLOR SWATCHES
  // =========================================================================
  function setupDialogLightDismiss(dialog) {
    if (!dialog) return;
    if (!('closedBy' in dialog)) {
      let downOnBackdrop = false;
      dialog.addEventListener('pointerdown', e => { downOnBackdrop = (e.target === dialog); });
      dialog.addEventListener('pointerup', e => {
        if (downOnBackdrop && e.target === dialog) dialog.close();
        downOnBackdrop = false;
      });
    }
  }

  function syncSettingsUI() {
    const ws = getCurrentWorkspace();

    renderCoreDesignsGrid();
    renderBuiltinWallpapersGrid();

    // Vignette
    const vignetteSw = document.getElementById('s-bg-vignette');
    if (vignetteSw) vignetteSw.checked = Boolean(ws.bgVignette);

    // Sliders
    syncSlider('s-bg-blur', 's-bg-blur-val', ws.bgBlur || 0, 'px');
    syncSlider('s-bg-dim', 's-bg-dim-val', ws.bgDim ?? 25, '%');

    // Auto wallpaper interval
    const autoWpSel = document.getElementById('s-auto-wallpaper-interval');
    if (autoWpSel) autoWpSel.value = masterState.autoWallpaperInterval || 'off';

    // Accent swatch active state
    document.querySelectorAll('#accent-swatches-row .swatch-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.color.toLowerCase() === (ws.accent || '#00ac89').toLowerCase());
    });

    // Clock & Weather options
    const fmtSel = document.getElementById('s-time-format');
    if (fmtSel) fmtSel.value = masterState.timeFormat || '12h';

    const secSw = document.getElementById('s-show-seconds');
    if (secSw) secSw.checked = Boolean(masterState.showSeconds);

    const tempSel = document.getElementById('s-temp-unit');
    if (tempSel) tempSel.value = masterState.tempUnit || 'C';

    const adhanSw = document.getElementById('s-adhan-alert');
    if (adhanSw) adhanSw.checked = Boolean(masterState.adhanAudio);

    const calcSel = document.getElementById('s-calc-method');
    if (calcSel) calcSel.value = String(masterState.calcMethod || 5);

    const asrSel = document.getElementById('s-asr-method');
    if (asrSel) asrSel.value = String(masterState.asrMethod || 0);

    const hijriSel = document.getElementById('s-hijri-offset');
    if (hijriSel) hijriSel.value = String(masterState.hijriOffset || 0);

    const iqamahSel = document.getElementById('s-iqamah-offset');
    if (iqamahSel) iqamahSel.value = String(masterState.iqamahOffset || 15);

    // City HUD
    const cityLabel = document.getElementById('s-current-city-label');
    const hudCity = document.getElementById('hud-city-name');
    const cityStr = masterState.city ? `${masterState.city}${masterState.country ? ', ' + masterState.country : ''}` : 'Location Syncing...';
    if (cityLabel) cityLabel.textContent = cityStr;
    if (hudCity) hudCity.textContent = masterState.city || 'My City';
  }

  function syncSlider(sliderId, valLabelId, val, unit) {
    const sl = document.getElementById(sliderId);
    const lb = document.getElementById(valLabelId);
    if (sl) sl.value = val;
    if (lb) lb.textContent = `${val}${unit}`;
  }

  // =========================================================================
  // 8. LOCAL WALLPAPER UPLOAD & AUTOMATIC ROTATION
  // =========================================================================
  let wallpaperIntervalTimer = null;
  let currentWallpaperCycleIdx = 0;

  function cycleNextBuiltinWallpaper() {
    const ws = getCurrentWorkspace();
    currentWallpaperCycleIdx = (currentWallpaperCycleIdx + 1) % CURATED_WALLPAPERS.length;
    const item = CURATED_WALLPAPERS[currentWallpaperCycleIdx];
    if (item.type === 'procedural') {
      ws.bgType = 'procedural';
      ws.bgPreset = item.preset;
      ws.bgImage = '';
    } else {
      ws.bgType = 'image';
      ws.bgImage = item.url;
    }
    applyVisualState();
    saveMasterState();
    renderBuiltinWallpapersGrid();
    showHudToast(`Wallpaper Rotated: ${item.name}`);
  }

  function initAutoWallpaperRotation() {
    if (wallpaperIntervalTimer) {
      clearInterval(wallpaperIntervalTimer);
      wallpaperIntervalTimer = null;
    }

    const intervalVal = masterState.autoWallpaperInterval || 'off';
    const selectEl = document.getElementById('s-auto-wallpaper-interval');
    if (selectEl) selectEl.value = intervalVal;

    if (intervalVal === 'off') return;

    if (intervalVal === '15m') {
      wallpaperIntervalTimer = setInterval(cycleNextBuiltinWallpaper, 15 * 60 * 1000);
    } else if (intervalVal === '1h') {
      wallpaperIntervalTimer = setInterval(cycleNextBuiltinWallpaper, 60 * 60 * 1000);
    } else if (intervalVal === '6h') {
      wallpaperIntervalTimer = setInterval(cycleNextBuiltinWallpaper, 6 * 60 * 60 * 1000);
    } else if (intervalVal.startsWith('unsplash')) {
      initDynamicUnsplash();
    }
  }

  function initLocalWallpaperUpload() {
    const fileInput = document.getElementById('s-wallpaper-upload-input');
    const uploadBtn = document.getElementById('btn-trigger-upload');
    const clearBtn = document.getElementById('btn-clear-uploaded');

    uploadBtn?.addEventListener('click', () => fileInput?.click());

    fileInput?.addEventListener('change', e => {
      const file = e.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = ev => {
        const dataUrl = ev.target.result;
        masterState.uploadedWallpaper = dataUrl;
        const ws = getCurrentWorkspace();
        ws.bgType = 'uploaded';
        ws.bgImage = dataUrl;
        applyVisualState();
        saveMasterState();
        renderBuiltinWallpapersGrid();
        if (clearBtn) clearBtn.style.display = 'inline-flex';
        showHudToast('Custom Local Wallpaper Applied!');
      };
      reader.readAsDataURL(file);
    });

    clearBtn?.addEventListener('click', () => {
      masterState.uploadedWallpaper = null;
      const ws = getCurrentWorkspace();
      ws.bgType = 'procedural';
      ws.bgPreset = 'signature-sage';
      ws.bgImage = '';
      applyVisualState();
      saveMasterState();
      renderBuiltinWallpapersGrid();
      if (clearBtn) clearBtn.style.display = 'none';
      showHudToast('Reset to Signature Sage Wallpaper');
    });

    if (masterState.uploadedWallpaper && clearBtn) {
      clearBtn.style.display = 'inline-flex';
    }
  }

  function setupDialogLightDismiss(dialog) {
    if (!dialog) return;
    let downOnBackdrop = false;
    dialog.addEventListener('pointerdown', e => {
      downOnBackdrop = (e.target === dialog);
    });
    dialog.addEventListener('pointerup', e => {
      if (downOnBackdrop && e.target === dialog) dialog.close();
      downOnBackdrop = false;
    });
  }

  function initSettingsModal() {
    const dialog = document.getElementById('dashboard-settings-dialog');
    setupDialogLightDismiss(dialog);

    // Clean Header Quick 2-Design Switcher Buttons
    document.getElementById('btn-design-1')?.addEventListener('click', () => applyDesign('design_tv_stage'));
    document.getElementById('btn-design-2')?.addEventListener('click', () => applyDesign('design_minimal_glance'));

    // Design Cards & Apply Buttons in Settings Dialog
    document.getElementById('card-design-tv-stage')?.addEventListener('click', () => applyDesign('design_tv_stage'));
    document.getElementById('btn-apply-d1')?.addEventListener('click', (e) => {
      e.stopPropagation();
      applyDesign('design_tv_stage');
    });

    document.getElementById('card-design-minimal-glance')?.addEventListener('click', () => applyDesign('design_minimal_glance'));
    document.getElementById('btn-apply-d2')?.addEventListener('click', (e) => {
      e.stopPropagation();
      applyDesign('design_minimal_glance');
    });

    // Open Settings dialog
    document.getElementById('open-settings-btn')?.addEventListener('click', () => {
      syncSettingsUI();
      dialog?.showModal();
    });

    document.getElementById('top-location-btn')?.addEventListener('click', () => {
      syncSettingsUI();
      document.querySelectorAll('.s-tab-pill[data-tab]').forEach(b => b.classList.toggle('active', b.dataset.tab === 'pane-location'));
      document.querySelectorAll('.s-section-pane').forEach(p => p.classList.toggle('active', p.id === 'pane-location'));
      dialog?.showModal();
    });

    // 3 Clean Navigation Tabs
    document.querySelectorAll('.s-tab-pill[data-tab]').forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.tab;
        document.querySelectorAll('.s-tab-pill[data-tab]').forEach(b => b.classList.toggle('active', b === tab));
        document.querySelectorAll('.s-section-pane').forEach(p => p.classList.toggle('active', p.id === target));
      });
    });

    // Local Wallpaper Upload & Builtin Library
    initLocalWallpaperUpload();
    initAutoWallpaperRotation();

    // Automatic Wallpaper Interval
    document.getElementById('s-auto-wallpaper-interval')?.addEventListener('change', e => {
      masterState.autoWallpaperInterval = e.target.value;
      saveMasterState();
      initAutoWallpaperRotation();
      showHudToast(`Wallpaper rotation: ${e.target.options[e.target.selectedIndex].text}`);
    });

    // Wallpaper Blur Slider
    const blurSl = document.getElementById('s-bg-blur');
    blurSl?.addEventListener('input', e => {
      const val = Number(e.target.value);
      const ws = getCurrentWorkspace();
      ws.bgBlur = val;
      const lb = document.getElementById('s-bg-blur-val');
      if (lb) lb.textContent = `${val}px`;
      applyVisualState();
      saveMasterState();
    });

    // Wallpaper Dim Slider
    const dimSl = document.getElementById('s-bg-dim');
    dimSl?.addEventListener('input', e => {
      const val = Number(e.target.value);
      const ws = getCurrentWorkspace();
      ws.bgDim = val;
      const lb = document.getElementById('s-bg-dim-val');
      if (lb) lb.textContent = `${val}%`;
      applyVisualState();
      saveMasterState();
    });

    // Vignette Toggle
    document.getElementById('s-bg-vignette')?.addEventListener('change', e => {
      const ws = getCurrentWorkspace();
      ws.bgVignette = Boolean(e.target.checked);
      applyVisualState();
      saveMasterState();
    });

    // Accent Color Swatches
    document.querySelectorAll('#accent-swatches-row .swatch-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const color = btn.dataset.color;
        if (!color) return;
        const ws = getCurrentWorkspace();
        ws.accent = color;
        document.querySelectorAll('#accent-swatches-row .swatch-btn').forEach(b => b.classList.toggle('active', b === btn));
        applyVisualState();
        saveMasterState();
        showHudToast('Accent color updated');
      });
    });

    // GPS & City Search
    document.getElementById('s-use-gps-btn')?.addEventListener('click', () => {
      detectLocation(true);
    });

    const searchInput = document.getElementById('s-city-search');
    const searchBtn = document.getElementById('s-city-search-btn');
    const handleSearch = () => {
      const q = searchInput?.value.trim();
      if (q) searchCity(q);
    };
    searchBtn?.addEventListener('click', handleSearch);
    searchInput?.addEventListener('keydown', e => {
      if (e.key === 'Enter') handleSearch();
    });

    // Calculation Method
    document.getElementById('s-calc-method')?.addEventListener('change', e => {
      masterState.calcMethod = Number(e.target.value);
      saveMasterState();
      fetchPrayerTimes(true);
      showHudToast('Calculation Method Updated');
    });

    // Asr Method
    document.getElementById('s-asr-method')?.addEventListener('change', e => {
      masterState.asrMethod = Number(e.target.value);
      saveMasterState();
      fetchPrayerTimes(true);
      showHudToast('Asr Method Updated');
    });

    // Hijri Offset
    document.getElementById('s-hijri-offset')?.addEventListener('change', e => {
      masterState.hijriOffset = Number(e.target.value);
      saveMasterState();
      syncHijriDate();
      showHudToast('Hijri Date Offset Adjusted');
    });

    // Iqamah Offset Delay
    document.getElementById('s-iqamah-offset')?.addEventListener('change', e => {
      masterState.iqamahOffset = Number(e.target.value);
      saveMasterState();
      renderPrayerDock();
      showHudToast(`Iqamah delay set to +${masterState.iqamahOffset}m`);
    });

    // 12h / 24h Clock
    document.getElementById('s-time-format')?.addEventListener('change', e => {
      masterState.timeFormat = e.target.value;
      saveMasterState();
      tickClock();
      renderPrayerDock();
      showHudToast(`Clock format: ${masterState.timeFormat.toUpperCase()}`);
    });

    // Show Seconds
    document.getElementById('s-show-seconds')?.addEventListener('change', e => {
      masterState.showSeconds = Boolean(e.target.checked);
      saveMasterState();
      tickClock();
    });

    // Temperature Unit
    document.getElementById('s-temp-unit')?.addEventListener('change', e => {
      masterState.tempUnit = e.target.value;
      saveMasterState();
      fetchWeatherData();
    });

    // Adhan Alert Audio
    document.getElementById('s-adhan-alert')?.addEventListener('change', e => {
      masterState.adhanAudio = Boolean(e.target.checked);
      saveMasterState();
      showHudToast(masterState.adhanAudio ? 'Adhan alert sound enabled' : 'Adhan alert sound muted');
    });

    // Test Chime Sound
    document.getElementById('btn-test-chime')?.addEventListener('click', () => {
      adhanAudio.currentTime = 0;
      adhanAudio.play().then(() => {
        showHudToast('Playing Adhan Test Audio...');
        setTimeout(() => { adhanAudio.pause(); adhanAudio.currentTime = 0; }, 7000);
      }).catch(err => {
        console.warn('Audio play blocked:', err);
        showHudToast('Audio playback requires user interaction');
      });
    });

    // Fullscreen toggle
    const toggleFullscreen = () => {
      if (!document.fullscreenElement) document.documentElement.requestFullscreen?.().catch(() => { });
      else document.exitFullscreen?.().catch(() => { });
    };
    document.getElementById('fullscreen-toggle-btn')?.addEventListener('click', toggleFullscreen);

    // Factory Reset Button
    document.getElementById('btn-reset-dashboard')?.addEventListener('click', () => {
      if (confirm('Reset dashboard settings to original defaults?')) {
        localStorage.removeItem(STORAGE_KEY);
        masterState = createDefaultMasterState();
        applyDesign('design_tv_stage');
        location.reload();
      }
    });

    // Smart TV Remote & Keyboard Shortcuts (1=Design 1, 2=Design 2, S=Settings, Q=Quran, F=Fullscreen)
    window.addEventListener('keydown', e => {
      const tag = e.target?.tagName?.toLowerCase();
      if (tag === 'input' || tag === 'textarea' || tag === 'select') return;

      const k = e.key.toLowerCase();
      if (k === '1') {
        applyDesign('design_tv_stage');
      } else if (k === '2') {
        applyDesign('design_minimal_glance');
      } else if (k === 's') {
        syncSettingsUI();
        if (dialog?.open) dialog.close();
        else dialog?.showModal();
      } else if (k === 'q') {
        const qDialog = document.getElementById('quran-picker-dialog');
        if (qDialog?.open) qDialog.close();
        else qDialog?.showModal();
      } else if (k === 'f') {
        toggleFullscreen();
      }
    });
  }

  // =========================================================================
  // 9. CLOCK & TICK TIMER
  // =========================================================================
  function tickClock() {
    const now = new Date();
    let hrs = now.getHours();
    const mins = String(now.getMinutes()).padStart(2, '0');
    const secs = String(now.getSeconds()).padStart(2, '0');
    const is24 = masterState.timeFormat === '24h';
    const ampm = hrs >= 12 ? 'PM' : 'AM';

    if (!is24) hrs = hrs % 12 || 12;

    const timeStr = masterState.showSeconds
      ? `${hrs}:${mins}:${secs}`
      : `${hrs}:${mins}`;

    setText('giant-digits', timeStr);
    const ampmEl = document.getElementById('giant-ampm');
    if (ampmEl) {
      ampmEl.style.display = is24 ? 'none' : 'inline';
      ampmEl.textContent = ampm;
    }

    const gDate = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
    setText('top-gregorian-date', gDate);
    setText('clock-inline-date', gDate);

    updatePrayerCountdown(now);
  }

  document.getElementById('btn-toggle-tomorrow')?.addEventListener('click', () => {
    masterState.showTomorrow = !masterState.showTomorrow;
    const btn = document.getElementById('btn-toggle-tomorrow');
    if (btn) btn.textContent = masterState.showTomorrow ? 'Today' : 'Tmrw';
    renderPrayerDock();
  });

  // =========================================================================
  // 10. LOCATION, ALADHAN & WEATHER
  // =========================================================================
  async function detectLocation(forceGps = false) {
    if (!forceGps && masterState.lat && masterState.lon) {
      fetchPrayers(masterState.lat, masterState.lon);
      fetchWeather(masterState.lat, masterState.lon);
      updateQibla(masterState.lat, masterState.lon);
      return;
    }

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async pos => {
          masterState.lat = pos.coords.latitude;
          masterState.lon = pos.coords.longitude;
          try {
            const r = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${masterState.lat}&longitude=${masterState.lon}&localityLanguage=en`);
            const d = await r.json();
            masterState.city = d.city || d.locality || 'My Location';
            masterState.country = d.countryName || '';
          } catch (_) {
            masterState.city = 'GPS Location';
          }
          saveMasterState();
          syncSettingsUI();
          fetchPrayers(masterState.lat, masterState.lon);
          fetchWeather(masterState.lat, masterState.lon);
          updateQibla(masterState.lat, masterState.lon);
        },
        () => fallbackIpLocation(),
        { timeout: 7000 }
      );
    } else {
      fallbackIpLocation();
    }
  }

  async function fallbackIpLocation() {
    try {
      const res = await fetch('https://ipapi.co/json/');
      const data = await res.json();
      if (data?.latitude && data?.longitude) {
        masterState.lat = data.latitude;
        masterState.lon = data.longitude;
        masterState.city = data.city || 'Cairo';
        masterState.country = data.country_name || '';
        saveMasterState();
        syncSettingsUI();
        fetchPrayers(masterState.lat, masterState.lon);
        fetchWeather(masterState.lat, masterState.lon);
        updateQibla(masterState.lat, masterState.lon);
        return;
      }
    } catch (_) { }

    masterState.lat = 21.4225;
    masterState.lon = 39.8262;
    masterState.city = 'Makkah';
    masterState.country = 'Saudi Arabia';
    saveMasterState();
    syncSettingsUI();
    fetchPrayers(masterState.lat, masterState.lon);
    fetchWeather(masterState.lat, masterState.lon);
    updateQibla(masterState.lat, masterState.lon);
  }

  async function searchCity(query) {
    try {
      const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1&language=en&format=json`);
      const data = await res.json();
      if (data.results && data.results.length > 0) {
        const hit = data.results[0];
        masterState.lat = hit.latitude;
        masterState.lon = hit.longitude;
        masterState.city = hit.name;
        masterState.country = hit.country || '';
        saveMasterState();
        syncSettingsUI();
        fetchPrayers(masterState.lat, masterState.lon);
        fetchWeather(masterState.lat, masterState.lon);
        updateQibla(masterState.lat, masterState.lon);
      }
    } catch (err) {
      console.warn('City error:', err);
    }
  }

  async function fetchPrayers(lat, lon) {
    try {
      const now = new Date();
      const tsToday = Math.floor(now.getTime() / 1000);
      const tsTomorrow = tsToday + 86400;

      const [resToday, resTmrw] = await Promise.all([
        fetch(`https://api.aladhan.com/v1/timings/${tsToday}?latitude=${lat}&longitude=${lon}&method=${masterState.calcMethod}&school=${masterState.asrMethod}`).then(r => r.json()),
        fetch(`https://api.aladhan.com/v1/timings/${tsTomorrow}?latitude=${lat}&longitude=${lon}&method=${masterState.calcMethod}&school=${masterState.asrMethod}`).then(r => r.json())
      ]);

      if (resToday.code === 200 && resToday.data) {
        prayerTimings = resToday.data.timings;
        if (resToday.data.date?.hijri) {
          const h = resToday.data.date.hijri;
          setText('top-hijri-date', `${h.day} ${h.month.en} ${h.year} AH`);
        }
      }

      if (resTmrw.code === 200 && resTmrw.data) {
        prayerTimingsTomorrow = resTmrw.data.timings;
      }

      renderPrayerDock();
      updatePrayerCountdown(new Date());
    } catch (err) {
      console.warn('AlAdhan fetch error:', err);
    }
  }

  async function fetchWeather(lat, lon) {
    try {
      const isF = masterState.tempUnit === 'F';
      const unitParam = isF ? '&temperature_unit=fahrenheit' : '';
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto${unitParam}`;
      const res = await fetch(url);
      const data = await res.json();
      if (!data?.current) return;

      const temp = Math.round(data.current.temperature_2m);
      const code = data.current.weather_code;
      const info = decodeWMO(code);
      const max0 = Math.round(data.daily.temperature_2m_max[0]);
      const min0 = Math.round(data.daily.temperature_2m_min[0]);

      setText('inline-w-text', `${temp}°${masterState.tempUnit} • ${info.label}`);
      setText('w-main-temp', `${temp}°`);
      setText('w-main-cond', info.label);
      setText('w-hi-lo', `H:${max0}° L:${min0}°`);
      setText('w-aqi-pill', `Humid ${data.current.relative_humidity_2m}%`);
      setText('w-wind-label', `Wind: ${Math.round(data.current.wind_speed_10m)} km/h`);

      const strip = document.getElementById('w-forecast-strip');
      if (strip && data.daily?.time) {
        strip.innerHTML = data.daily.time.slice(0, 5).map((iso, i) => {
          const d = new Date(iso + 'T12:00:00');
          const day = i === 0 ? 'Today' : d.toLocaleDateString('en-US', { weekday: 'short' });
          const dInfo = decodeWMO(data.daily.weather_code[i]);
          const hi = Math.round(data.daily.temperature_2m_max[i]);
          const lo = Math.round(data.daily.temperature_2m_min[i]);
          return `
            <div class="tv-w-day-col">
              <span class="w-day-name">${day}</span>
              <span class="w-day-icon">${dInfo.icon}</span>
              <span class="w-day-hi">${hi}°</span>
              <span class="w-day-lo">${lo}°</span>
            </div>
          `;
        }).join('');
      }
    } catch (err) {
      console.warn('Weather error:', err);
    }
  }

  function updateQibla(lat, lon) {
    const kaabaLat = 21.422487 * Math.PI / 180;
    const kaabaLon = 39.826206 * Math.PI / 180;
    const phi = lat * Math.PI / 180;
    const lam = lon * Math.PI / 180;

    const y = Math.sin(kaabaLon - lam);
    const x = Math.cos(phi) * Math.tan(kaabaLat) - Math.sin(phi) * Math.cos(kaabaLon - lam);
    let brng = (Math.atan2(y, x) * 180 / Math.PI + 360) % 360;
    const deg = Math.round(brng);

    setText('qibla-deg-val', `${deg}°`);
    const arrow = document.getElementById('qibla-compass-arrow');
    if (arrow) arrow.style.transform = `rotate(${deg}deg)`;

    const R = 6371;
    const dLat = kaabaLat - phi;
    const dLon = kaabaLon - lam;
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(phi) * Math.cos(kaabaLat) * Math.sin(dLon / 2) ** 2;
    const dist = Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
    setText('qibla-distance-km', `${dist.toLocaleString()} km`);
  }

  // =========================================================================
  // 11. SPIRITUAL WIDGETS (TASBIH, ASMA, AZKAR, AYAH, NOTES)
  // =========================================================================
  function initSpiritualWidgets() {
    const phrases = [
      { ar: 'سُبْحَانَ اللَّهِ', en: 'SubhanAllah', target: 33 },
      { ar: 'الْحَمْدُ لِلَّهِ', en: 'Alhamdulillah', target: 33 },
      { ar: 'اللَّهُ أَكْبَرُ', en: 'Allahu Akbar', target: 34 },
      { ar: 'أَسْتَغْفِرُ اللَّهَ', en: 'Astaghfirullah', target: 100 }
    ];

    const syncTasbih = () => {
      const cur = phrases[masterState.tasbihPhraseIdx % phrases.length];
      setText('tasbih-count', String(masterState.tasbihCount));
      setText('tasbih-ar', cur.ar);
      setText('tasbih-phrase', cur.en);
      setText('tasbih-total', String(masterState.tasbihCount));
    };
    syncTasbih();

    document.getElementById('tasbih-widget-btn')?.addEventListener('click', () => {
      masterState.tasbihCount += 1;
      const cur = phrases[masterState.tasbihPhraseIdx % phrases.length];
      if (masterState.tasbihCount % cur.target === 0) {
        masterState.tasbihPhraseIdx = (masterState.tasbihPhraseIdx + 1) % phrases.length;
      }
      syncTasbih();
      saveMasterState();
    });

    document.getElementById('tasbih-reset-btn')?.addEventListener('click', () => {
      masterState.tasbihCount = 0;
      syncTasbih();
      saveMasterState();
    });

    // 99 Names
    const syncAsma = () => {
      const item = ASMA_LIST[masterState.asmaIdx % ASMA_LIST.length];
      setText('asma-ar', item.ar);
      setText('asma-en', item.en);
      setText('asma-meaning', item.meaning);
    };
    syncAsma();
    document.getElementById('next-asma-btn')?.addEventListener('click', () => {
      masterState.asmaIdx = (masterState.asmaIdx + 1) % ASMA_LIST.length;
      syncAsma();
      saveMasterState();
    });

    // Azkar
    const syncAzkar = () => {
      const item = AZKAR_LIST[masterState.azkarIdx % AZKAR_LIST.length];
      setText('azkar-ar', item.ar);
      setText('azkar-en', item.en);
      setText('azkar-count-badge', item.count);
    };
    syncAzkar();
    document.getElementById('next-azkar-btn')?.addEventListener('click', () => {
      masterState.azkarIdx = (masterState.azkarIdx + 1) % AZKAR_LIST.length;
      syncAzkar();
      saveMasterState();
    });

    // Ayah
    const syncAyah = () => {
      const item = AYAH_LIST[masterState.ayahIdx % AYAH_LIST.length];
      setText('ayah-arabic', item.ar);
      setText('ayah-translation', item.en);
      setText('ayah-ref', item.ref);
    };
    syncAyah();
    document.getElementById('next-ayah-btn')?.addEventListener('click', () => {
      masterState.ayahIdx = (masterState.ayahIdx + 1) % AYAH_LIST.length;
      syncAyah();
      saveMasterState();
    });

    // Notes
    const noteArea = document.getElementById('dashboard-sticky-note');
    if (noteArea) {
      noteArea.value = masterState.noteText || '';
      noteArea.addEventListener('input', () => {
        masterState.noteText = noteArea.value;
        saveMasterState();
      });
    }
  }

  // =========================================================================
  // 12. HELPERS
  // =========================================================================
  function parseTimeString(raw, ref = new Date()) {
    if (!raw) return null;
    const clean = raw.replace(/\s*\(.*?\)\s*/g, '').trim();
    const parts = clean.split(':');
    if (parts.length < 2) return null;
    const d = new Date(ref);
    d.setHours(Number(parts[0]), Number(parts[1]), 0, 0);
    return d;
  }

  function formatClock(d) {
    let h = d.getHours();
    const m = String(d.getMinutes()).padStart(2, '0');
    if (masterState.timeFormat === '24h') return `${String(h).padStart(2, '0')}:${m}`;
    const ap = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    return `${h}:${m} ${ap}`;
  }

  function decodeWMO(code) {
    if (code === 0) return { label: 'Clear Sky', icon: '☀️' };
    if (code === 1 || code === 2) return { label: 'Mostly Clear', icon: '🌤️' };
    if (code === 3) return { label: 'Overcast', icon: '☁️' };
    if (code === 45 || code === 48) return { label: 'Foggy', icon: '🌫️' };
    if (code >= 51 && code <= 67) return { label: 'Rain', icon: '🌧️' };
    if (code >= 71 && code <= 77) return { label: 'Snow', icon: '❄️' };
    if (code >= 80 && code <= 82) return { label: 'Showers', icon: '🌦️' };
    if (code >= 95) return { label: 'Thunderstorm', icon: '⛈️' };
    return { label: 'Partly Cloudy', icon: '⛅' };
  }

  function setText(id, val) {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  }

  function clamp(val, min, max) {
    return Math.max(min, Math.min(max, val));
  }

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, s => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[s]));
  }

  // =========================================================================
  // BOOTSTRAP
  // =========================================================================
  document.addEventListener('DOMContentLoaded', () => {
    applyVisualState();
    initCanvasEditor();
    initSettingsModal();
    initQuranEngine();
    initSpiritualWidgets();
    initDynamicUnsplash();
    tickClock();
    setInterval(tickClock, 1000);
    detectLocation(false);

    // Safe offline service worker check
    if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
      navigator.serviceWorker.register('./sw.js').catch(() => { });
    }
  });
})();
