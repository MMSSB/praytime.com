/* ==========================================================================
   PRAYTIME SMART TV OS & AMBIENT DASHBOARD ENGINE (src/dashboard.js)
   - 4 Smart TV Designs (Image 1/2 Ambient TV, Image 3 Masjid Center Stage, Cockpit, Classic)
   - 24x16 Responsive Magnetic Assist Grid with Automatic Gaps & Ghost Preview
   - Touch & Mouse Grab Anywhere in Edit Mode + Save or Cancel Confirmation Workflow
   - Per-Widget Color / Blur Skin Switcher + Open-Meteo + Adhan.js Sync
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // --------------------------------------------------------------------------
  // 1. PRESETS: SCENIC UNSPLASH WALLPAPERS, ACCENTS & TV LAYOUT DESIGNS
  // --------------------------------------------------------------------------
  const UNSPLASH_NATURE_PRESETS = [
    { id: 'mountain-lake', name: 'Twilight Lake (TV)', url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=85' },
    { id: 'desert-sunset', name: 'Atacama Desert (TV)', url: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=2000&q=85' },
    { id: 'alpine-glow', name: 'Alpine Sunset', url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=85' },
    { id: 'aurora-sky', name: 'Emerald Aurora', url: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=2000&q=85' },
    { id: 'misty-forest', name: 'Misty Pines', url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=2000&q=85' },
    { id: 'golden-valley', name: 'Golden Valley', url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=2000&q=85' },
    { id: 'starry-night', name: 'Starry Night', url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=2000&q=85' },
    { id: 'emerald-coast', name: 'Serene Coast', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=85' }
  ];

  const ACCENT_THEMES = {
    praytime: { name: 'PrayTime Emerald (#00ac89)', color: '#00ac89', soft: 'rgba(0, 172, 137, 0.18)', glow: 'rgba(0, 172, 137, 0.38)' },
    mint:     { name: 'Masjid Mint (#4ade80)', color: '#4ade80', soft: 'rgba(74, 222, 128, 0.18)', glow: 'rgba(74, 222, 128, 0.38)' },
    gold:     { name: 'Desert Gold (#f59e0b)', color: '#f59e0b', soft: 'rgba(245, 158, 11, 0.18)', glow: 'rgba(245, 158, 11, 0.38)' },
    coral:    { name: 'Warm Coral (#f43f5e)', color: '#f43f5e', soft: 'rgba(244, 63, 94, 0.18)', glow: 'rgba(244, 63, 94, 0.38)' },
    silver:   { name: 'Pure Silver (#e4e4e7)', color: '#e4e4e7', soft: 'rgba(228, 228, 231, 0.18)', glow: 'rgba(228, 228, 231, 0.35)' }
  };

  const SOLID_BG_PRESETS = [
    { name: 'Pitch Black (Image 3 & index.html)', color: '#000000' },
    { name: 'iOS Dark Charcoal (#1c1c1e)', color: '#1c1c1e' },
    { name: 'Warm Obsidian (#121210)', color: '#121210' },
    { name: 'Deep Forest (#091411)', color: '#091411' },
    { name: 'iOS Light (#f2f2f7)', color: '#f2f2f7' }
  ];

  const WIDGET_SKINS = ['glass', 'transparent', 'solid-dark', 'emerald', 'gold', 'pitch-black'];

  const ALL_WIDGETS = [
    { id: 'clock', title: 'Giant TV Clock', icon: 'ph-clock' },
    { id: 'left-stack', title: 'Sun & Tahajjud Stack', icon: 'ph-sun-horizon' },
    { id: 'right-stack', title: 'Sehri & Iftar Stack', icon: 'ph-moon-stars' },
    { id: 'prayer-dock', title: 'Prayer Times Dock', icon: 'ph-mosque' },
    { id: 'weather', title: 'Open-Meteo Weather', icon: 'ph-cloud-sun' },
    { id: 'next-gauge', title: 'Prayer Radial Gauge', icon: 'ph-timer' },
    { id: 'qibla', title: 'Qibla Compass', icon: 'ph-compass' },
    { id: 'tasbih', title: 'Digital Tasbih', icon: 'ph-fingerprint' },
    { id: 'quran-player', title: 'Quran Audio Stream', icon: 'ph-disc' },
    { id: 'ayah', title: 'Daily Quran Ayah', icon: 'ph-book-open-text' },
    { id: 'asma', title: '99 Names of Allah', icon: 'ph-star-four' },
    { id: 'notes', title: 'Personal Notes', icon: 'ph-note-pencil' }
  ];

  // 24 Columns x 16 Rows Responsive TV Designs
  const TV_DESIGN_PRESETS = {
    // Design 1: Matches Image 3 (Giant Center Clock + Left/Right Small Blurred Stacks + Bottom Prayer Row)
    'masjid-center': {
      bgMode: 'unsplash',
      bgBlur: 8,
      bgDim: 48,
      enabled: {
        'clock': true, 'left-stack': true, 'right-stack': true, 'prayer-dock': true,
        'weather': false, 'next-gauge': false, 'qibla': false, 'tasbih': false,
        'quran-player': false, 'ayah': false, 'asma': false, 'notes': false
      },
      skins: {
        'clock': 'transparent',
        'left-stack': 'glass',
        'right-stack': 'glass',
        'prayer-dock': 'glass'
      },
      boxes: {
        'left-stack':   { col: 0,  row: 1,  w: 4,  h: 10 },
        'clock':        { col: 5,  row: 1,  w: 14, h: 10 },
        'right-stack':  { col: 20, row: 1,  w: 4,  h: 10 },
        'prayer-dock':  { col: 1,  row: 12, w: 22, h: 4 }
      }
    },

    // Design 2: Matches Image 1 & 2 (Ambient TV Launcher: Left Clock + Top-Right Open-Meteo Card + Small Widgets + Floating Glass Dock)
    'ambient-tv': {
      bgMode: 'unsplash',
      bgBlur: 2,
      bgDim: 28,
      enabled: {
        'clock': true, 'weather': true, 'qibla': true, 'quran-player': true, 'prayer-dock': true,
        'left-stack': false, 'right-stack': false, 'next-gauge': false, 'tasbih': false,
        'ayah': false, 'asma': false, 'notes': false
      },
      skins: {
        'clock': 'transparent',
        'weather': 'glass',
        'qibla': 'glass',
        'quran-player': 'glass',
        'prayer-dock': 'glass'
      },
      boxes: {
        'clock':        { col: 1,  row: 1,  w: 11, h: 9 },
        'weather':      { col: 14, row: 1,  w: 9,  h: 6 },
        'qibla':        { col: 14, row: 7,  w: 4,  h: 4 },
        'quran-player': { col: 18, row: 7,  w: 5,  h: 4 },
        'prayer-dock':  { col: 2,  row: 12, w: 20, h: 4 }
      }
    },

    // Design 3: Tablet / Car Cockpit (Rich Multi-Widget Dashboard)
    'cockpit-pro': {
      bgMode: 'unsplash',
      bgBlur: 14,
      bgDim: 50,
      enabled: {
        'clock': true, 'next-gauge': true, 'weather': true, 'qibla': true,
        'tasbih': true, 'quran-player': true, 'ayah': true, 'prayer-dock': true,
        'left-stack': false, 'right-stack': false, 'asma': false, 'notes': false
      },
      skins: {
        'clock': 'glass', 'next-gauge': 'emerald', 'weather': 'glass',
        'qibla': 'glass', 'tasbih': 'glass', 'quran-player': 'glass',
        'ayah': 'glass', 'prayer-dock': 'glass'
      },
      boxes: {
        'clock':        { col: 0,  row: 0,  w: 9,  h: 7 },
        'next-gauge':   { col: 9,  row: 0,  w: 7,  h: 4 },
        'quran-player': { col: 9,  row: 4,  w: 7,  h: 3 },
        'weather':      { col: 16, row: 0,  w: 8,  h: 7 },
        'qibla':        { col: 0,  row: 7,  w: 5,  h: 4 },
        'tasbih':       { col: 5,  row: 7,  w: 6,  h: 4 },
        'ayah':         { col: 11, row: 7,  w: 13, h: 4 },
        'prayer-dock':  { col: 0,  row: 11, w: 24, h: 5 }
      }
    },

    // Design 4: PrayTime Classic (Matches index.html Pitch Black & Solid Charcoal)
    'praytime-classic': {
      bgMode: 'solid',
      bgBlur: 0,
      bgDim: 0,
      enabled: {
        'clock': true, 'left-stack': true, 'right-stack': true, 'prayer-dock': true, 'weather': true,
        'next-gauge': false, 'qibla': false, 'tasbih': false, 'quran-player': false,
        'ayah': false, 'asma': false, 'notes': false
      },
      skins: {
        'clock': 'solid-dark',
        'left-stack': 'solid-dark',
        'right-stack': 'solid-dark',
        'weather': 'solid-dark',
        'prayer-dock': 'solid-dark'
      },
      boxes: {
        'left-stack':   { col: 0,  row: 0,  w: 4,  h: 11 },
        'clock':        { col: 4,  row: 0,  w: 11, h: 11 },
        'weather':      { col: 15, row: 0,  w: 5,  h: 11 },
        'right-stack':  { col: 20, row: 0,  w: 4,  h: 11 },
        'prayer-dock':  { col: 0,  row: 11, w: 24, h: 5 }
      }
    }
  };

  // Fallback default boxes for any extra widget enabled by the user
  const DEFAULT_WIDGET_BOXES = {
    'clock':        { col: 5,  row: 1,  w: 14, h: 10 },
    'left-stack':   { col: 0,  row: 1,  w: 4,  h: 10 },
    'right-stack':  { col: 20, row: 1,  w: 4,  h: 10 },
    'prayer-dock':  { col: 1,  row: 12, w: 22, h: 4 },
    'weather':      { col: 14, row: 1,  w: 9,  h: 6 },
    'next-gauge':   { col: 9,  row: 0,  w: 7,  h: 4 },
    'qibla':        { col: 0,  row: 7,  w: 5,  h: 4 },
    'tasbih':       { col: 5,  row: 7,  w: 5,  h: 4 },
    'quran-player': { col: 10, row: 7,  w: 6,  h: 4 },
    'ayah':         { col: 16, row: 7,  w: 8,  h: 4 },
    'asma':         { col: 0,  row: 0,  w: 4,  h: 4 },
    'notes':        { col: 20, row: 0,  w: 4,  h: 4 }
  };

  const AYAHS = [
    { arabic: 'إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَّوْقُوتًا', translation: 'Indeed, prayer has been decreed upon the believers a decree of specified times.', ref: 'Surah An-Nisa 4:103' },
    { arabic: 'أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ', translation: 'Unquestionably, by the remembrance of Allah hearts are assured.', ref: 'Surah Ar-Ra’d 13:28' },
    { arabic: 'وَاسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ', translation: 'And seek help through patience and prayer.', ref: 'Surah Al-Baqarah 2:45' },
    { arabic: 'فَاذْكُرُونِي أَذْكُرْكُمْ وَاشْكُرُوا لِي وَلَا تَكْفُرُونِ', translation: 'So remember Me; I will remember you.', ref: 'Surah Al-Baqarah 2:152' }
  ];

  const ASMA_LIST = [
    { ar: 'الرَّحْمَنُ', en: 'Ar-Rahman', meaning: 'The Most Gracious' },
    { ar: 'الرَّحِيمُ', en: 'Ar-Rahim', meaning: 'The Most Merciful' },
    { ar: 'الْمَلِكُ', en: 'Al-Malik', meaning: 'The Sovereign Lord' },
    { ar: 'الْقُدُّوسُ', en: 'Al-Quddus', meaning: 'The Most Pure' },
    { ar: 'السَّلَامُ', en: 'As-Salam', meaning: 'The Source of Peace' },
    { ar: 'الْعَزِيزُ', en: 'Al-Aziz', meaning: 'The Almighty' },
    { ar: 'الْغَفَّارُ', en: 'Al-Ghaffar', meaning: 'The Ever-Forgiving' },
    { ar: 'الرَّزَّاقُ', en: 'Ar-Razzaq', meaning: 'The Sustainer' }
  ];

  const TASBIH_LIST = [
    { ar: 'سُبْحَانَ اللَّهِ', en: 'SubhanAllah', target: 33 },
    { ar: 'الْحَمْدُ لِلَّهِ', en: 'Alhamdulillah', target: 33 },
    { ar: 'اللَّهُ أَكْبَرُ', en: 'Allahu Akbar', target: 34 }
  ];

  // --------------------------------------------------------------------------
  // 2. STATE MANAGEMENT & SAVE / CANCEL SNAPSHOT ENGINE
  // --------------------------------------------------------------------------
  function buildDefaultState() {
    const preset = TV_DESIGN_PRESETS['masjid-center'];
    return {
      tvDesign: 'masjid-center',
      bgMode: preset.bgMode,
      bgUrl: UNSPLASH_NATURE_PRESETS[0].url,
      solidColor: '#000000',
      bgBlur: preset.bgBlur,
      bgDim: preset.bgDim,
      cardOpacity: 65,
      cardBlur: 22,
      accentTheme: 'praytime',
      clockScale: 100,
      clockColor: '#ffffff',
      clockFont: "'JetBrains Mono', monospace",
      showSeconds: true,
      hijriOffset: 0,
      iqamahOffset: 15,
      tempUnit: 'C',
      forecastType: 'daily',
      adhanAlert: true,
      autoFullscreen: true,
      enabledWidgets: { ...preset.enabled },
      widgetSkins: { ...DEFAULT_WIDGET_BOXES, ...preset.skins },
      gridBoxes: JSON.parse(JSON.stringify({ ...DEFAULT_WIDGET_BOXES, ...preset.boxes }))
    };
  }

  let state = buildDefaultState();
  try {
    const raw = localStorage.getItem('praytimeTVDashboardV3');
    if (raw) {
      const parsed = JSON.parse(raw);
      state = {
        ...state,
        ...parsed,
        enabledWidgets: { ...state.enabledWidgets, ...(parsed.enabledWidgets || {}) },
        widgetSkins: { ...state.widgetSkins, ...(parsed.widgetSkins || {}) },
        gridBoxes: { ...state.gridBoxes, ...(parsed.gridBoxes || {}) }
      };
    }
  } catch (e) {}

  let stateSnapshotBeforeEdit = null;

  function persistState() {
    localStorage.setItem('praytimeTVDashboardV3', JSON.stringify(state));
  }

  function announceSR(msg) {
    const el = document.getElementById('sr-live-announcer');
    if (!el) return;
    el.textContent = msg;
    setTimeout(() => { if (el.textContent === msg) el.textContent = ''; }, 1000);
  }

  // --------------------------------------------------------------------------
  // 3. APPLY VISUAL APPEARANCE, THEME & WALLPAPER
  // --------------------------------------------------------------------------
  const bgStage = document.getElementById('bg-stage');
  const bgImageLayer = document.getElementById('bg-image-layer');
  const rootStyle = document.documentElement.style;

  function applyThemeAndVisuals() {
    // 1. Dark / Light mode synced with index.html
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.body.classList.remove('dark', 'light');
    const isDark = savedTheme === 'system'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
      : savedTheme === 'dark';
    document.body.classList.add(isDark ? 'dark' : 'light');

    const themeIcon = document.getElementById('quick-theme-icon');
    if (themeIcon) themeIcon.className = isDark ? 'ph ph-sun' : 'ph ph-moon';

    // 2. CSS Custom Properties
    rootStyle.setProperty('--bg-blur', `${state.bgBlur}px`);
    rootStyle.setProperty('--bg-dim', (state.bgDim / 100).toFixed(2));
    rootStyle.setProperty('--card-opacity', (state.cardOpacity / 100).toFixed(2));
    rootStyle.setProperty('--card-blur', `${state.cardBlur}px`);
    rootStyle.setProperty('--clock-scale', (state.clockScale / 100).toFixed(2));
    rootStyle.setProperty('--clock-color', state.clockColor || (isDark ? '#ffffff' : '#000000'));
    rootStyle.setProperty('--clock-font', state.clockFont || "'JetBrains Mono', monospace");

    const acc = ACCENT_THEMES[state.accentTheme] || ACCENT_THEMES.praytime;
    rootStyle.setProperty('--accent', acc.color);
    rootStyle.setProperty('--accent-soft', acc.soft);
    rootStyle.setProperty('--accent-glow', acc.glow);

    // 3. Wallpaper Mode
    bgStage.classList.remove('has-image', 'mode-default-blur');
    bgStage.style.backgroundColor = '';

    if (state.bgMode === 'unsplash') {
      bgStage.classList.add('has-image');
      bgImageLayer.style.backgroundImage = `url("${state.bgUrl}")`;
    } else if (state.bgMode === 'upload') {
      const up = localStorage.getItem('praytimeDashboardCustomBg');
      if (up) {
        bgStage.classList.add('has-image');
        bgImageLayer.style.backgroundImage = `url("${up}")`;
      }
    } else if (state.bgMode === 'default') {
      bgStage.classList.add('mode-default-blur');
    } else {
      bgStage.style.backgroundColor = state.solidColor || (isDark ? '#000000' : '#f2f2f7');
    }

    // Highlight active TV Design card in Settings
    document.querySelectorAll('.tv-design-card').forEach(card => {
      card.classList.toggle('active', card.dataset.design === state.tvDesign);
    });
    document.querySelectorAll('.unsplash-card').forEach(c => {
      c.classList.toggle('active', state.bgMode === 'unsplash' && c.dataset.url === state.bgUrl);
    });
    document.querySelectorAll('.accent-dot').forEach(d => {
      d.classList.toggle('active', d.dataset.accent === state.accentTheme);
    });
    document.querySelectorAll('.solid-dot').forEach(d => {
      d.classList.toggle('active', state.bgMode === 'solid' && d.dataset.color === state.solidColor);
    });
  }

  // --------------------------------------------------------------------------
  // 4. 24x16 RESPONSIVE MAGNETIC ASSIST GRID ENGINE (WITH AUTOMATIC GAPS!)
  // --------------------------------------------------------------------------
  const COLS = 24;
  const ROWS = 16;
  const GAP_PX = 12; // Automatic responsive gap between grid slots

  const canvasStage = document.getElementById('canvas-stage');
  const snapGhost = document.getElementById('assist-snap-ghost');
  const laserVC = document.getElementById('laser-vc');
  const laserHC = document.getElementById('laser-hc');
  const laserVE = document.getElementById('laser-ve');
  const laserHE = document.getElementById('laser-he');
  const laserVETag = document.getElementById('laser-ve-tag');
  const laserHETag = document.getElementById('laser-he-tag');

  function gridBoxToPixels(box) {
    const stageW = canvasStage.clientWidth || window.innerWidth - 52;
    const stageH = Math.max(540, canvasStage.clientHeight || window.innerHeight - 100);
    const cellW = stageW / COLS;
    const cellH = stageH / ROWS;

    const left = Math.round(box.col * cellW + GAP_PX / 2);
    const top = Math.round(box.row * cellH + GAP_PX / 2);
    const width = Math.round(Math.max(cellW * 2, box.w * cellW - GAP_PX));
    const height = Math.round(Math.max(cellH * 2, box.h * cellH - GAP_PX));
    return { left, top, width, height, cellW, cellH, stageW, stageH };
  }

  function renderAllWidgetsOnGrid() {
    const isMobileStack = window.innerWidth <= 920;

    ALL_WIDGETS.forEach(w => {
      const el = document.getElementById(`widget-${w.id}`);
      if (!el) return;

      const enabled = !!state.enabledWidgets[w.id];
      el.classList.toggle('hidden-widget', !enabled);

      const skin = typeof state.widgetSkins[w.id] === 'string' ? state.widgetSkins[w.id] : 'glass';
      el.setAttribute('data-skin', skin);

      if (!enabled || isMobileStack) {
        el.style.left = '';
        el.style.top = '';
        el.style.width = '';
        el.style.height = '';
        return;
      }

      const box = state.gridBoxes[w.id] || DEFAULT_WIDGET_BOXES[w.id];
      const px = gridBoxToPixels(box);
      el.style.left = `${px.left}px`;
      el.style.top = `${px.top}px`;
      el.style.width = `${px.width}px`;
      el.style.height = `${px.height}px`;
    });

    renderWidgetsChecklists();
  }

  function applyTVDesignPreset(designKey) {
    const preset = TV_DESIGN_PRESETS[designKey];
    if (!preset) return;
    state.tvDesign = designKey;
    state.bgMode = preset.bgMode;
    state.bgBlur = preset.bgBlur;
    state.bgDim = preset.bgDim;
    state.enabledWidgets = { ...preset.enabled };
    Object.entries(preset.skins).forEach(([k, v]) => { state.widgetSkins[k] = v; });
    Object.entries(preset.boxes).forEach(([k, v]) => {
      state.gridBoxes[k] = { ...v };
    });
    persistState();
    applyThemeAndVisuals();
    renderAllWidgetsOnGrid();
  }

  // --------------------------------------------------------------------------
  // 5. TOUCH & MOUSE GRAB ANYWHERE + ASSIST MOVING HELP + SAVE / CANCEL
  // --------------------------------------------------------------------------
  function hideLasersAndGhost() {
    [laserVC, laserHC, laserVE, laserHE].forEach(l => l && l.classList.remove('visible'));
    if (snapGhost) snapGhost.classList.remove('visible');
  }

  function showAlignmentLasersForBox(activeId, candidateBox) {
    [laserVC, laserHC, laserVE, laserHE].forEach(l => l && l.classList.remove('visible'));
    const px = gridBoxToPixels(candidateBox);

    // 1. Center X / Center Y of TV Screen
    if (candidateBox.col + candidateBox.w / 2 === COLS / 2) {
      laserVC.style.left = `${px.stageW / 2}px`;
      laserVC.classList.add('visible');
    }
    if (candidateBox.row + candidateBox.h / 2 === ROWS / 2) {
      laserHC.style.top = `${px.stageH / 2}px`;
      laserHC.classList.add('visible');
    }

    // 2. Edge & Gap Alignment with other active widgets
    for (const w of ALL_WIDGETS) {
      if (w.id === activeId || !state.enabledWidgets[w.id]) continue;
      const other = state.gridBoxes[w.id];
      if (!other) continue;

      if (candidateBox.col === other.col || candidateBox.col + candidateBox.w === other.col + other.w || candidateBox.col === other.col + other.w || candidateBox.col + candidateBox.w === other.col) {
        const edgeCol = (candidateBox.col === other.col || candidateBox.col === other.col + other.w)
          ? candidateBox.col
          : candidateBox.col + candidateBox.w;
        laserVE.style.left = `${Math.round(edgeCol * px.cellW)}px`;
        if (laserVETag) laserVETag.textContent = `Snap Col ${edgeCol}`;
        laserVE.classList.add('visible');
      }

      if (candidateBox.row === other.row || candidateBox.row + candidateBox.h === other.row + other.h || candidateBox.row === other.row + other.h || candidateBox.row + candidateBox.h === other.row) {
        const edgeRow = (candidateBox.row === other.row || candidateBox.row === other.row + other.h)
          ? candidateBox.row
          : candidateBox.row + candidateBox.h;
        laserHE.style.top = `${Math.round(edgeRow * px.cellH)}px`;
        if (laserHETag) laserHETag.textContent = `Snap Row ${edgeRow}`;
        laserHE.classList.add('visible');
      }
    }

    // 3. Position the Glowing Assist Snap Ghost with exact gap!
    if (snapGhost) {
      snapGhost.style.left = `${px.left}px`;
      snapGhost.style.top = `${px.top}px`;
      snapGhost.style.width = `${px.width}px`;
      snapGhost.style.height = `${px.height}px`;
      snapGhost.classList.add('visible');
    }
  }

  function setupTouchAndMouseGrab() {
    document.querySelectorAll('.tv-widget').forEach(widget => {
      const wId = widget.dataset.widgetId;
      const wTitle = widget.dataset.title || wId;
      const grabHandle = widget.querySelector('.w-grab-pill');
      const resizeCorner = widget.querySelector('.w-resize-corner');

      // Mini Buttons inside Widget Floating Toolbar (Skin Color Cycle & Hide)
      widget.querySelectorAll('.w-mini-btn[data-action]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const act = btn.dataset.action;
          if (act === 'skin') {
            const cur = widget.getAttribute('data-skin') || 'glass';
            const next = WIDGET_SKINS[(WIDGET_SKINS.indexOf(cur) + 1) % WIDGET_SKINS.length];
            state.widgetSkins[wId] = next;
            widget.setAttribute('data-skin', next);
            announceSR(`${wTitle} appearance changed to ${next}`);
          } else if (act === 'hide') {
            state.enabledWidgets[wId] = false;
            renderAllWidgetsOnGrid();
            announceSR(`${wTitle} hidden`);
          }
        });
      });

      // DRAG BY TOUCH OR MOUSE (Grab anywhere on the widget card in Edit Mode, or via handle!)
      let dragOffsetX = 0;
      let dragOffsetY = 0;
      let startClientX = 0;
      let startClientY = 0;
      let hasMoved = false;
      let pendingBox = null;

      widget.addEventListener('pointerdown', (e) => {
        if (!document.body.classList.contains('is-editing')) return;
        if (e.button !== 0 && e.pointerType === 'mouse') return;

        // Ignore clicks on action buttons, resize handle, selects, or inputs
        if (e.target.closest('.w-mini-btn') || e.target.closest('.w-resize-corner') || e.target.closest('select, input, textarea')) {
          return;
        }

        if (window.innerWidth <= 920) return;

        const rect = widget.getBoundingClientRect();
        dragOffsetX = e.clientX - rect.left;
        dragOffsetY = e.clientY - rect.top;
        startClientX = e.clientX;
        startClientY = e.clientY;
        hasMoved = false;

        const curBox = state.gridBoxes[wId] || DEFAULT_WIDGET_BOXES[wId];
        pendingBox = { ...curBox };

        widget.setPointerCapture(e.pointerId);
      });

      widget.addEventListener('pointermove', (e) => {
        if (!widget.hasPointerCapture(e.pointerId)) return;

        const dist = Math.hypot(e.clientX - startClientX, e.clientY - startClientY);
        if (dist < 4 && !hasMoved) return;
        hasMoved = true;

        widget.classList.add('is-dragging');

        const stageRect = canvasStage.getBoundingClientRect();
        const rawLeft = e.clientX - stageRect.left - dragOffsetX;
        const rawTop = e.clientY - stageRect.top - dragOffsetY;

        // Move widget smoothly under finger/cursor
        const curBox = state.gridBoxes[wId] || DEFAULT_WIDGET_BOXES[wId];
        const pxInfo = gridBoxToPixels(curBox);

        const clampedLeft = Math.max(0, Math.min(rawLeft, pxInfo.stageW - pxInfo.width));
        const clampedTop = Math.max(0, Math.min(rawTop, pxInfo.stageH - pxInfo.height));

        widget.style.left = `${clampedLeft}px`;
        widget.style.top = `${clampedTop}px`;

        // Calculate nearest Magnetic Assist Grid cell (col, row)
        let snapCol = Math.round(clampedLeft / pxInfo.cellW);
        let snapRow = Math.round(clampedTop / pxInfo.cellH);
        snapCol = Math.max(0, Math.min(COLS - curBox.w, snapCol));
        snapRow = Math.max(0, Math.min(ROWS - curBox.h, snapRow));

        pendingBox = { col: snapCol, row: snapRow, w: curBox.w, h: curBox.h };
        showAlignmentLasersForBox(wId, pendingBox);
      });

      widget.addEventListener('lostpointercapture', () => {
        if (!widget.classList.contains('is-dragging')) return;
        widget.classList.remove('is-dragging');
        hideLasersAndGhost();

        if (hasMoved && pendingBox) {
          state.gridBoxes[wId] = { ...pendingBox };
          renderAllWidgetsOnGrid();
          announceSR(`${wTitle} snapped to column ${pendingBox.col + 1}, row ${pendingBox.row + 1}`);
        }
      });

      // Keyboard Arrow-Key Movement on Handle (Compliant with modern-web-guidance 'drag')
      if (grabHandle) {
        grabHandle.addEventListener('keydown', (e) => {
          const keys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];
          if (!keys.includes(e.key)) return;
          e.preventDefault();
          if (!document.body.classList.contains('is-editing')) return;

          const box = state.gridBoxes[wId] || { ...DEFAULT_WIDGET_BOXES[wId] };
          if (e.key === 'ArrowLeft') box.col = Math.max(0, box.col - 1);
          if (e.key === 'ArrowRight') box.col = Math.min(COLS - box.w, box.col + 1);
          if (e.key === 'ArrowUp') box.row = Math.max(0, box.row - 1);
          if (e.key === 'ArrowDown') box.row = Math.min(ROWS - box.h, box.row + 1);

          state.gridBoxes[wId] = box;
          renderAllWidgetsOnGrid();
          grabHandle.focus();
          announceSR(`${wTitle} moved`);
        });
      }

      // Corner Resize by Touch or Mouse with Assist Grid Snapping
      if (resizeCorner) {
        let startX = 0;
        let startY = 0;
        let origBox = null;
        let candidateResizeBox = null;

        resizeCorner.addEventListener('pointerdown', (e) => {
          if (e.button !== 0 && e.pointerType === 'mouse') return;
          e.stopPropagation();
          startX = e.clientX;
          startY = e.clientY;
          origBox = { ...(state.gridBoxes[wId] || DEFAULT_WIDGET_BOXES[wId]) };
          candidateResizeBox = { ...origBox };
          resizeCorner.setPointerCapture(e.pointerId);
          widget.classList.add('is-resizing');
        });

        resizeCorner.addEventListener('pointermove', (e) => {
          if (!resizeCorner.hasPointerCapture(e.pointerId)) return;
          const pxInfo = gridBoxToPixels(origBox);
          const dCols = Math.round((e.clientX - startX) / pxInfo.cellW);
          const dRows = Math.round((e.clientY - startY) / pxInfo.cellH);

          const newW = Math.max(3, Math.min(COLS - origBox.col, origBox.w + dCols));
          const newH = Math.max(3, Math.min(ROWS - origBox.row, origBox.h + dRows));

          candidateResizeBox = { col: origBox.col, row: origBox.row, w: newW, h: newH };
          const livePx = gridBoxToPixels(candidateResizeBox);
          widget.style.width = `${livePx.width}px`;
          widget.style.height = `${livePx.height}px`;
          showAlignmentLasersForBox(wId, candidateResizeBox);
        });

        resizeCorner.addEventListener('lostpointercapture', () => {
          widget.classList.remove('is-resizing');
          hideLasersAndGhost();
          if (candidateResizeBox) {
            state.gridBoxes[wId] = { ...candidateResizeBox };
            renderAllWidgetsOnGrid();
            announceSR(`${wTitle} resized`);
          }
        });
      }
    });
  }

  // Enter / Save / Cancel Edit Mode Workflow
  const toggleEditBtn = document.getElementById('toggle-edit-btn');
  const btnSaveEdit = document.getElementById('btn-save-edit');
  const btnCancelEdit = document.getElementById('btn-cancel-edit');
  const btnOpenWidgetsDrawer = document.getElementById('btn-open-widgets-drawer');
  const editWidgetsDrawer = document.getElementById('edit-widgets-drawer');
  const btnSnapTidy = document.getElementById('btn-snap-tidy');

  function startEditMode() {
    stateSnapshotBeforeEdit = JSON.parse(JSON.stringify(state));
    document.body.classList.add('is-editing');
    toggleEditBtn?.classList.add('active');
  }

  function commitSaveEditMode() {
    persistState();
    stateSnapshotBeforeEdit = null;
    document.body.classList.remove('is-editing');
    toggleEditBtn?.classList.remove('active');
    editWidgetsDrawer?.classList.remove('open');
    announceSR('Dashboard layout saved');
  }

  function cancelEditModeAndRevert() {
    if (stateSnapshotBeforeEdit) {
      state = JSON.parse(JSON.stringify(stateSnapshotBeforeEdit));
      stateSnapshotBeforeEdit = null;
      applyThemeAndVisuals();
      renderAllWidgetsOnGrid();
    }
    document.body.classList.remove('is-editing');
    toggleEditBtn?.classList.remove('active');
    editWidgetsDrawer?.classList.remove('open');
    announceSR('Changes canceled and previous layout restored');
  }

  toggleEditBtn?.addEventListener('click', () => {
    if (document.body.classList.contains('is-editing')) {
      commitSaveEditMode();
    } else {
      startEditMode();
    }
  });

  btnSaveEdit?.addEventListener('click', commitSaveEditMode);
  btnCancelEdit?.addEventListener('click', cancelEditModeAndRevert);

  btnOpenWidgetsDrawer?.addEventListener('click', () => {
    editWidgetsDrawer?.classList.toggle('open');
  });

  btnSnapTidy?.addEventListener('click', () => {
    const preset = TV_DESIGN_PRESETS[state.tvDesign] || TV_DESIGN_PRESETS['masjid-center'];
    Object.entries(preset.boxes).forEach(([k, v]) => {
      state.gridBoxes[k] = { ...v };
    });
    renderAllWidgetsOnGrid();
    announceSR('Widgets aligned with clean gaps');
  });

  function renderWidgetsChecklists() {
    if (editWidgetsDrawer) {
      editWidgetsDrawer.innerHTML = '';
      ALL_WIDGETS.forEach(w => {
        const on = !!state.enabledWidgets[w.id];
        const chip = document.createElement('button');
        chip.type = 'button';
        chip.className = `w-toggle-chip ${on ? 'active' : ''}`;
        chip.innerHTML = `<i class="ph ${w.icon}"></i><span>${w.title}</span>`;
        chip.addEventListener('click', () => {
          state.enabledWidgets[w.id] = !state.enabledWidgets[w.id];
          renderAllWidgetsOnGrid();
        });
        editWidgetsDrawer.appendChild(chip);
      });
    }

    const checklist = document.getElementById('settings-widgets-checklist');
    if (checklist) {
      checklist.innerHTML = '';
      ALL_WIDGETS.forEach(w => {
        const on = !!state.enabledWidgets[w.id];
        const row = document.createElement('div');
        row.className = 's-card-row';
        row.innerHTML = `
          <div class="s-label-group">
            <span class="s-label-title"><i class="ph ${w.icon}" style="color:var(--accent); margin-right:6px;"></i>${w.title}</span>
            <span class="s-label-sub">Show on TV / Tablet Dashboard</span>
          </div>
          <input type="checkbox" class="ios-switch" ${on ? 'checked' : ''} />
        `;
        row.querySelector('input').addEventListener('change', (e) => {
          state.enabledWidgets[w.id] = e.target.checked;
          persistState();
          renderAllWidgetsOnGrid();
        });
        checklist.appendChild(row);
      });
    }
  }

  window.addEventListener('resize', renderAllWidgetsOnGrid);

  // --------------------------------------------------------------------------
  // 6. PRAYER TIMES, SUNNAH STACKS & GIANT CLOCK ENGINE
  // --------------------------------------------------------------------------
  function getSavedLocation() {
    try {
      return JSON.parse(localStorage.getItem('savedLocation') || '{"lat":30.0167,"lon":30.9833,"name":"El Sheikh Zayed City"}');
    } catch (e) {
      return { lat: 30.0167, lon: 30.9833, name: 'El Sheikh Zayed City' };
    }
  }

  let currentLocation = getSavedLocation();
  let todaySchedule = [];
  let tomorrowSchedule = [];
  let showTomorrowDock = false;
  let lastWeatherRaw = null;
  let lastNotifiedKey = '';

  function computePrayers(lat, lon) {
    if (typeof adhan === 'undefined') return;

    const method = localStorage.getItem('calcMethod') || 'Egyptian';
    let params = adhan.CalculationMethod.Egyptian();
    if (method === 'MuslimWorldLeague') params = adhan.CalculationMethod.MuslimWorldLeague();
    else if (method === 'ISNA') params = adhan.CalculationMethod.NorthAmerica();
    else if (method === 'Mecca') params = adhan.CalculationMethod.UmmAlQura();
    else if (method === 'Karachi') params = adhan.CalculationMethod.Karachi();
    else if (method === 'Dubai' && adhan.CalculationMethod.Dubai) params = adhan.CalculationMethod.Dubai();
    else if (method === 'Kuwait' && adhan.CalculationMethod.Kuwait) params = adhan.CalculationMethod.Kuwait();
    else if (method === 'Qatar' && adhan.CalculationMethod.Qatar) params = adhan.CalculationMethod.Qatar();

    const asr = localStorage.getItem('asrMethod') || 'Shafi';
    params.madhab = asr === 'Hanafi' ? adhan.Madhab.Hanafi : adhan.Madhab.Shafi;

    const coords = new adhan.Coordinates(lat, lon);
    const now = new Date();
    const tmrw = new Date(now);
    tmrw.setDate(tmrw.getDate() + 1);

    const ptToday = new adhan.PrayerTimes(coords, now, params);
    const ptTmrw = new adhan.PrayerTimes(coords, tmrw, params);

    const makeList = (pt) => [
      { key: 'fajr', name: 'FAJR', arabic: 'الفجر', time: pt.fajr, isFard: true },
      { key: 'sunrise', name: 'SUNRISE', arabic: 'الشروق', time: pt.sunrise, isFard: false },
      { key: 'dhuhr', name: 'DHUHR', arabic: 'الظهر', time: pt.dhuhr, isFard: true },
      { key: 'asr', name: 'ASR', arabic: 'العصر', time: pt.asr, isFard: true },
      { key: 'maghrib', name: 'MAGHRIB', arabic: 'المغرب', time: pt.maghrib, isFard: true },
      { key: 'isha', name: 'ISHA', arabic: 'العشاء', time: pt.isha, isFard: true }
    ];

    todaySchedule = makeList(ptToday);
    tomorrowSchedule = makeList(ptTmrw);

    // Populate Left & Right Small Blur Stacks (Like Image 3!)
    const nightLen = ptTmrw.fajr.getTime() - ptToday.maghrib.getTime();
    const tahajjud = new Date(ptToday.maghrib.getTime() + (nightLen * 2) / 3);
    const imsak = new Date(ptToday.fajr.getTime() - 10 * 60000);
    const duha = new Date(ptToday.sunrise.getTime() + 20 * 60000);

    const setT = (id, d) => {
      const el = document.getElementById(id);
      if (el) el.textContent = fmtClock(d, true);
    };
    setT('st-tahajjud', tahajjud);
    setT('st-sunrise', ptToday.sunrise);
    setT('st-sunset', ptToday.maghrib);
    setT('st-imsak', imsak);
    setT('st-iftar', ptToday.maghrib);
    setT('st-duha', duha);

    // Qibla & Distance
    let qDeg = 136;
    if (typeof adhan.Qibla === 'function') {
      try { qDeg = Math.round(adhan.Qibla(coords)); } catch (e) {}
    }
    const toRad = d => (d * Math.PI) / 180;
    const dLat = toRad(21.4225 - lat);
    const dLon = toRad(39.8262 - lon);
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat)) * Math.cos(toRad(21.4225)) * Math.sin(dLon / 2) ** 2;
    const distKm = Math.round(6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));

    const qVal = document.getElementById('qibla-deg-val');
    const qDist = document.getElementById('qibla-distance-km');
    const qArr = document.getElementById('qibla-compass-arrow');
    if (qVal) qVal.textContent = `${qDeg}°`;
    if (qDist) qDist.textContent = `${distKm.toLocaleString()} km`;
    if (qArr) qArr.style.transform = `rotate(${qDeg}deg)`;

    const cityHud = document.getElementById('hud-city-name');
    if (cityHud) cityHud.textContent = currentLocation.name || 'Current Location';

    renderPrayerDockAndCountdown();
  }

  function fmtClock(dateObj, withAmPm = true) {
    if (!dateObj) return '--:--';
    const is12h = (localStorage.getItem('timeFormat') || '12h') === '12h';
    let h = dateObj.getHours();
    const m = String(dateObj.getMinutes()).padStart(2, '0');
    if (!is12h) return `${String(h).padStart(2, '0')}:${m}`;
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    return withAmPm ? `${h}:${m} ${ampm}` : `${h}:${m}`;
  }

  document.getElementById('btn-toggle-tomorrow')?.addEventListener('click', (e) => {
    e.stopPropagation();
    showTomorrowDock = !showTomorrowDock;
    e.currentTarget.textContent = showTomorrowDock ? 'Today' : 'Tmrw';
    renderPrayerDockAndCountdown();
  });

  function renderPrayerDockAndCountdown() {
    if (!todaySchedule.length) return;
    const now = new Date();

    let curIdx = -1;
    let nextIdx = -1;
    for (let i = 0; i < todaySchedule.length; i++) {
      if (now >= todaySchedule[i].time) curIdx = i;
      else if (nextIdx === -1 && now < todaySchedule[i].time) nextIdx = i;
    }

    const curPrayer = curIdx === -1
      ? { ...todaySchedule[5], time: new Date(todaySchedule[5].time.getTime() - 86400000) }
      : todaySchedule[curIdx];
    const nextPrayer = nextIdx === -1 ? tomorrowSchedule[0] : todaySchedule[nextIdx];

    // Adhan Chime Notification
    if (curPrayer && state.adhanAlert) {
      const diffSec = Math.floor((now - curPrayer.time) / 1000);
      const key = `${curPrayer.key}-${curPrayer.time.getDate()}`;
      if (diffSec >= 0 && diffSec <= 3 && lastNotifiedKey !== key) {
        lastNotifiedKey = key;
        playSereneAdhanChime();
      }
    }

    // Countdown under Giant Clock (Image 3 style: "NEXT PRAYER: ASR" + "03:07:44")
    const remMs = Math.max(0, nextPrayer.time - now);
    const remSec = Math.floor(remMs / 1000);
    const rH = String(Math.floor(remSec / 3600)).padStart(2, '0');
    const rM = String(Math.floor((remSec % 3600) / 60)).padStart(2, '0');
    const rS = String(remSec % 60).padStart(2, '0');

    const nextLbl = document.getElementById('clock-next-label');
    const nextTmr = document.getElementById('clock-next-timer');
    if (nextLbl) nextLbl.textContent = `NEXT PRAYER: ${nextPrayer.name} • ${nextPrayer.arabic} (NOW: ${curPrayer.name})`;
    if (nextTmr) nextTmr.textContent = `${rH}:${rM}:${rS}`;

    // Update Radial Gauge Widget
    const totalMs = Math.max(1, nextPrayer.time - curPrayer.time);
    const elapsedMs = Math.min(totalMs, Math.max(0, now - curPrayer.time));
    const pct = Math.min(100, Math.max(0, Math.round((elapsedMs / totalMs) * 100)));

    const cpTag = document.getElementById('cp-active-tag');
    const npTitle = document.getElementById('np-gauge-title');
    const npTarget = document.getElementById('np-target-time');
    const ringFill = document.getElementById('gauge-ring-fill');
    const ringPct = document.getElementById('gauge-pct-val');

    if (cpTag) cpTag.textContent = `CURRENT: ${curPrayer.name} (${curPrayer.arabic})`;
    if (npTitle) npTitle.textContent = `Next: ${nextPrayer.name} in ${rH}:${rM}`;
    if (npTarget) {
      const iq = new Date(nextPrayer.time.getTime() + (Number(state.iqamahOffset) || 15) * 60000);
      npTarget.textContent = `Adhan ${fmtClock(nextPrayer.time)} • Iqamah ${fmtClock(iq)}`;
    }
    if (ringFill) ringFill.style.strokeDashoffset = (264 - (pct / 100) * 264).toFixed(1);
    if (ringPct) ringPct.textContent = `${pct}%`;

    // Render Bottom Floating Prayer Dock
    const dockEl = document.getElementById('prayer-horizon-dock');
    if (dockEl) {
      dockEl.innerHTML = '';
      const list = showTomorrowDock ? tomorrowSchedule : todaySchedule;
      list.forEach((slot, idx) => {
        let cls = '';
        if (!showTomorrowDock) {
          if (idx === nextIdx || (nextIdx === -1 && idx === 0)) cls = 'next';
          else if (idx === curIdx) cls = 'current';
          else if (now > slot.time) cls = 'passed';
        }
        const iqTime = new Date(slot.time.getTime() + (Number(state.iqamahOffset) || 15) * 60000);
        const subLabel = slot.isFard ? `Iqamah ${fmtClock(iqTime)}` : slot.arabic;

        const item = document.createElement('div');
        item.className = `dock-prayer-item ${cls}`;
        item.innerHTML = `
          <span class="dpi-name">${slot.name}</span>
          <span class="dpi-time">${fmtClock(slot.time)}</span>
          <span class="dpi-sub">${subLabel}</span>
        `;
        dockEl.appendChild(item);
      });
    }
  }

  function tickClock() {
    const now = new Date();
    const is12h = (localStorage.getItem('timeFormat') || '12h') === '12h';

    let hrs = now.getHours();
    const ampm = hrs >= 12 ? 'PM' : 'AM';
    if (is12h) hrs = hrs % 12 || 12;

    const hStr = is12h ? String(hrs) : String(hrs).padStart(2, '0');
    const mStr = String(now.getMinutes()).padStart(2, '0');
    const sStr = String(now.getSeconds()).padStart(2, '0');

    const digitsEl = document.getElementById('giant-digits');
    const ampmEl = document.getElementById('giant-ampm');

    if (digitsEl) {
      if (state.showSeconds) {
        digitsEl.innerHTML = `${hStr}<span class="colon">:</span>${mStr}<span class="colon">:</span>${sStr}`;
      } else {
        digitsEl.innerHTML = `${hStr}<span class="colon">:</span>${mStr}`;
      }
    }
    if (ampmEl) {
      ampmEl.style.display = is12h ? 'inline-block' : 'none';
      ampmEl.textContent = ampm;
    }

    const gregStr = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
    const shortGreg = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

    const topGreg = document.getElementById('top-gregorian-date');
    const inlineGreg = document.getElementById('clock-inline-date');
    if (topGreg) topGreg.textContent = gregStr;
    if (inlineGreg) inlineGreg.textContent = shortGreg;

    const topHijri = document.getElementById('top-hijri-date');
    if (topHijri) {
      try {
        const adj = new Date(now.getTime() + (Number(state.hijriOffset) || 0) * 86400000);
        topHijri.textContent = new Intl.DateTimeFormat('en-US-u-ca-islamic', {
          day: 'numeric', month: 'long', year: 'numeric'
        }).format(adj);
      } catch (e) {}
    }

    renderPrayerDockAndCountdown();
  }

  // --------------------------------------------------------------------------
  // 7. OPEN-METEO WEATHER STATION (Matches Image 1 Inline & Image 2 Card)
  // --------------------------------------------------------------------------
  function getWeatherIcon(code, isDay = 1) {
    const base = './src/set/';
    let desc = 'Clear', icon = isDay ? 'sunny.svg' : 'clear.svg';
    switch (code) {
      case 0: desc = 'Clear'; icon = isDay ? 'sunny.svg' : 'clear.svg'; break;
      case 1: desc = 'Mostly clear'; icon = isDay ? 'mostly_sunny.svg' : 'mostly_clear.svg'; break;
      case 2: desc = 'Partly cloudy'; icon = isDay ? 'partly_cloudy.svg' : 'partly_clear.svg'; break;
      case 3: desc = 'Overcast'; icon = 'cloudy.svg'; break;
      case 45: case 48: desc = 'Fog'; icon = 'fog.svg'; break;
      case 51: case 53: case 55: desc = 'Drizzle'; icon = 'drizzle.svg'; break;
      case 61: case 63: case 65: desc = 'Rain'; icon = 'showers.svg'; break;
      case 71: case 73: case 75: desc = 'Snow'; icon = 'heavy_snow.svg'; break;
      case 80: case 81: case 82: desc = 'Showers'; icon = 'scattered_showers.svg'; break;
      case 95: case 96: case 99: desc = 'Storm'; icon = 'isolated_tstorms.svg'; break;
    }
    return { desc, url: base + icon };
  }

  function cvtTemp(c) {
    if (c == null) return '--';
    return state.tempUnit === 'F' ? Math.round((c * 9) / 5 + 32) : Math.round(c);
  }

  async function fetchOpenMeteo(lat, lon) {
    try {
      const params = 'current=temperature_2m,relativehumidity_2m,is_day,weathercode,windspeed_10m&hourly=temperature_2m,weathercode,is_day&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto';
      const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&${params}`);
      if (res.ok) {
        lastWeatherRaw = await res.json();
        renderWeatherUI();
      }
    } catch (e) {}
  }

  function renderWeatherUI() {
    if (!lastWeatherRaw?.current) return;
    const cur = lastWeatherRaw.current;
    const daily = lastWeatherRaw.daily;
    const hourly = lastWeatherRaw.hourly;
    const { desc, url } = getWeatherIcon(cur.weathercode, cur.is_day);

    const hi = daily?.temperature_2m_max ? cvtTemp(daily.temperature_2m_max[0]) : '--';
    const lo = daily?.temperature_2m_min ? cvtTemp(daily.temperature_2m_min[0]) : '--';
    const nowT = cvtTemp(cur.temperature_2m);

    // 1. Inline Weather under Clock (Image 1 style: "15° Clear H:24° L:13°")
    const inIcon = document.getElementById('inline-w-icon');
    const inText = document.getElementById('inline-w-text');
    if (inIcon) inIcon.src = url;
    if (inText) inText.textContent = `${nowT}° ${desc} • H:${hi}° L:${lo}°`;

    // 2. Frosted Weather Card (Image 2 style)
    const mIcon = document.getElementById('w-main-icon');
    const mTemp = document.getElementById('w-main-temp');
    const mCond = document.getElementById('w-main-cond');
    const mHiLo = document.getElementById('w-hi-lo');
    const mHum = document.getElementById('w-aqi-pill');
    const mWind = document.getElementById('w-wind-label');

    if (mIcon) mIcon.src = url;
    if (mTemp) mTemp.textContent = `${nowT}°`;
    if (mCond) mCond.textContent = desc;
    if (mHiLo) mHiLo.textContent = `H:${hi}°  L:${lo}°`;
    if (mHum) mHum.textContent = `Humidity ${cur.relativehumidity_2m}%`;
    if (mWind) mWind.textContent = `Wind: ${Math.round(cur.windspeed_10m)} km/h • ${currentLocation.name}`;

    const strip = document.getElementById('w-forecast-strip');
    if (!strip) return;
    strip.innerHTML = '';

    if (state.forecastType === 'hourly' && hourly?.time) {
      const nowH = new Date().getHours();
      let st = hourly.time.findIndex(t => new Date(t).getHours() === nowH);
      if (st < 0) st = 0;
      for (let i = 0; i < 6; i++) {
        const idx = st + i;
        if (idx >= hourly.time.length) break;
        const h = new Date(hourly.time[idx]).getHours();
        const { url: hUrl } = getWeatherIcon(hourly.weathercode[idx], hourly.is_day[idx]);
        const col = document.createElement('div');
        col.className = `tv-w-col ${i === 0 ? 'active' : ''}`;
        col.innerHTML = `
          <span class="tv-w-day">${i === 0 ? 'Now' : `${h}:00`}</span>
          <img src="${hUrl}" alt="" />
          <span class="tv-w-hi">${cvtTemp(hourly.temperature_2m[idx])}°</span>
        `;
        strip.appendChild(col);
      }
    } else if (daily?.time) {
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      for (let i = 0; i < Math.min(6, daily.time.length); i++) {
        const d = new Date(daily.time[i]);
        const { url: dUrl } = getWeatherIcon(daily.weathercode[i], 1);
        const col = document.createElement('div');
        col.className = `tv-w-col ${i === 0 ? 'active' : ''}`;
        col.innerHTML = `
          <span class="tv-w-day">${i === 0 ? 'Today' : days[d.getUTCDay()]}</span>
          <img src="${dUrl}" alt="" />
          <span class="tv-w-hi">${cvtTemp(daily.temperature_2m_max[i])}°</span>
          <span class="tv-w-lo">${cvtTemp(daily.temperature_2m_min[i])}°</span>
        `;
        strip.appendChild(col);
      }
    }
  }

  // --------------------------------------------------------------------------
  // 8. COMPACT WIDGETS: TASBIH, QURAN STREAM, AYAH, 99 NAMES, NOTES & CHIME
  // --------------------------------------------------------------------------
  let tasbihIdx = 0;
  let tasbihCount = 0;
  let tasbihTotal = Number(localStorage.getItem('praytimeTasbihTotal') || 0);

  function renderTasbih() {
    const item = TASBIH_LIST[tasbihIdx % TASBIH_LIST.length];
    const ar = document.getElementById('tasbih-ar');
    const en = document.getElementById('tasbih-phrase');
    const cnt = document.getElementById('tasbih-count');
    const tot = document.getElementById('tasbih-total');
    if (ar) ar.textContent = item.ar;
    if (en) en.textContent = `${item.en} (${tasbihCount}/${item.target})`;
    if (cnt) cnt.textContent = tasbihCount;
    if (tot) tot.textContent = tasbihTotal;
  }

  document.getElementById('tasbih-widget-btn')?.addEventListener('click', (e) => {
    e.stopPropagation();
    const item = TASBIH_LIST[tasbihIdx % TASBIH_LIST.length];
    tasbihCount++;
    tasbihTotal++;
    localStorage.setItem('praytimeTasbihTotal', String(tasbihTotal));
    if (tasbihCount >= item.target) {
      tasbihCount = 0;
      tasbihIdx = (tasbihIdx + 1) % TASBIH_LIST.length;
    }
    renderTasbih();
  });

  document.getElementById('tasbih-reset-btn')?.addEventListener('click', (e) => {
    e.stopPropagation();
    tasbihCount = 0;
    tasbihTotal = 0;
    localStorage.setItem('praytimeTasbihTotal', '0');
    renderTasbih();
  });

  let ayahIdx = 0;
  function renderAyah() {
    const a = AYAHS[ayahIdx % AYAHS.length];
    const ar = document.getElementById('ayah-arabic');
    const tr = document.getElementById('ayah-translation');
    const rf = document.getElementById('ayah-ref');
    if (ar) ar.textContent = a.arabic;
    if (tr) tr.textContent = a.translation;
    if (rf) rf.textContent = `— ${a.ref}`;
  }
  document.getElementById('next-ayah-btn')?.addEventListener('click', (e) => {
    e.stopPropagation();
    ayahIdx = (ayahIdx + 1) % AYAHS.length;
    renderAyah();
  });

  let asmaIdx = 0;
  function renderAsma() {
    const n = ASMA_LIST[asmaIdx % ASMA_LIST.length];
    const ar = document.getElementById('asma-ar');
    const en = document.getElementById('asma-en');
    const mn = document.getElementById('asma-meaning');
    if (ar) ar.textContent = n.ar;
    if (en) en.textContent = n.en;
    if (mn) mn.textContent = n.meaning;
  }
  document.getElementById('next-asma-btn')?.addEventListener('click', (e) => {
    e.stopPropagation();
    asmaIdx = (asmaIdx + 1) % ASMA_LIST.length;
    renderAsma();
  });

  const qpAudio = document.getElementById('qp-audio-el');
  const qpPlay = document.getElementById('qp-play-toggle');
  const qpIcon = document.getElementById('qp-play-icon');
  const qpSel = document.getElementById('qp-surah-select');
  const qpBadge = document.getElementById('qp-status-badge');

  qpPlay?.addEventListener('click', (e) => {
    e.stopPropagation();
    if (!qpAudio || !qpSel) return;
    if (qpAudio.paused) {
      if (!qpAudio.src || qpAudio.src !== qpSel.value) qpAudio.src = qpSel.value;
      qpAudio.play().then(() => {
        if (qpIcon) qpIcon.className = 'ph-fill ph-pause';
        if (qpBadge) qpBadge.textContent = 'Playing';
      }).catch(() => {});
    } else {
      qpAudio.pause();
      if (qpIcon) qpIcon.className = 'ph-fill ph-play';
      if (qpBadge) qpBadge.textContent = 'Paused';
    }
  });

  qpSel?.addEventListener('change', () => {
    if (!qpAudio) return;
    const playing = !qpAudio.paused;
    qpAudio.src = qpSel.value;
    if (playing) qpAudio.play();
  });

  const noteEl = document.getElementById('dashboard-sticky-note');
  if (noteEl) {
    noteEl.value = localStorage.getItem('praytimeStickyNote') || '';
    noteEl.addEventListener('input', (e) => localStorage.setItem('praytimeStickyNote', e.target.value));
  }

  function playSereneAdhanChime() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      [440, 554.37, 659.25, 880].forEach((f, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, ctx.currentTime + i * 0.25);
        gain.gain.setValueAtTime(0.001, ctx.currentTime + i * 0.25);
        gain.gain.exponentialRampToValueAtTime(0.16, ctx.currentTime + i * 0.25 + 0.06);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + i * 0.25 + 2.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.25);
        osc.stop(ctx.currentTime + i * 0.25 + 2.3);
      });
    } catch (e) {}
  }

  // --------------------------------------------------------------------------
  // 9. SETTINGS DIALOG (<dialog closedby="any">) WITH TOP QUICK CONTROLS
  // --------------------------------------------------------------------------
  const settingsDialog = document.getElementById('dashboard-settings-dialog');

  // Mandatory fallback per modern-web-guidance for browsers without closedBy
  if (settingsDialog && !('closedBy' in HTMLDialogElement.prototype)) {
    const outside = (e, d) => {
      const r = d.getBoundingClientRect();
      return e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom;
    };
    let pressedOut = false;
    settingsDialog.addEventListener('pointerdown', (e) => { pressedOut = outside(e, settingsDialog); });
    settingsDialog.addEventListener('pointerup', (e) => { if (pressedOut && outside(e, settingsDialog)) settingsDialog.close(); });
  }

  function switchPane(paneId) {
    document.querySelectorAll('.s-tab-pill').forEach(b => b.classList.toggle('active', b.dataset.tab === paneId));
    document.querySelectorAll('.s-section-pane').forEach(p => p.classList.toggle('active', p.id === paneId));
    const sc = document.querySelector('.s-scroll-content');
    if (sc) sc.scrollTop = 0;
  }

  document.querySelectorAll('.s-tab-pill').forEach(b => {
    b.addEventListener('click', () => switchPane(b.dataset.tab));
  });

  function openSettings(paneId = null) {
    if (!settingsDialog) return;
    syncSettingsUI();
    if (paneId) switchPane(paneId);
    settingsDialog.showModal();
  }

  document.getElementById('open-settings-btn')?.addEventListener('click', () => openSettings());
  document.getElementById('top-location-btn')?.addEventListener('click', () => openSettings('pane-location'));

  document.getElementById('quick-theme-btn')?.addEventListener('click', () => {
    const isDark = document.body.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
    applyThemeAndVisuals();
  });

  // Top Quick Controls inside Settings Modal
  document.getElementById('s-btn-start-free-edit')?.addEventListener('click', () => {
    settingsDialog?.close();
    startEditMode();
  });

  document.getElementById('s-btn-random-bg')?.addEventListener('click', () => {
    const pool = UNSPLASH_NATURE_PRESETS.filter(p => p.url !== state.bgUrl);
    const pick = pool[Math.floor(Math.random() * pool.length)] || UNSPLASH_NATURE_PRESETS[0];
    state.bgMode = 'unsplash';
    state.bgUrl = pick.url;
    persistState();
    syncSettingsUI();
    applyThemeAndVisuals();
  });

  document.getElementById('s-btn-fullscreen')?.addEventListener('click', () => {
    toggleFullscreen();
  });

  function buildSettingsSwatches() {
    const wpGrid = document.getElementById('unsplash-presets-grid');
    if (wpGrid) {
      wpGrid.innerHTML = '';
      UNSPLASH_NATURE_PRESETS.forEach(p => {
        const div = document.createElement('div');
        div.className = 'unsplash-card';
        div.dataset.url = p.url;
        div.style.backgroundImage = `url("${p.url}")`;
        div.innerHTML = `<span>${p.name}</span>`;
        div.addEventListener('click', () => {
          state.bgMode = 'unsplash';
          state.bgUrl = p.url;
          persistState();
          syncSettingsUI();
          applyThemeAndVisuals();
        });
        wpGrid.appendChild(div);
      });
    }

    const accRow = document.getElementById('accent-presets-row');
    if (accRow) {
      accRow.innerHTML = '';
      Object.entries(ACCENT_THEMES).forEach(([k, v]) => {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'swatch-dot accent-dot';
        b.dataset.accent = k;
        b.title = v.name;
        b.style.backgroundColor = v.color;
        b.addEventListener('click', () => {
          state.accentTheme = k;
          persistState();
          applyThemeAndVisuals();
        });
        accRow.appendChild(b);
      });
    }

    const solRow = document.getElementById('solid-presets-row');
    if (solRow) {
      solRow.innerHTML = '';
      SOLID_BG_PRESETS.forEach(s => {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'swatch-dot solid-dot';
        b.dataset.color = s.color;
        b.title = s.name;
        b.style.backgroundColor = s.color;
        b.addEventListener('click', () => {
          state.bgMode = 'solid';
          state.solidColor = s.color;
          persistState();
          syncSettingsUI();
          applyThemeAndVisuals();
        });
        solRow.appendChild(b);
      });
    }

    document.querySelectorAll('.tv-design-card').forEach(card => {
      card.addEventListener('click', () => {
        applyTVDesignPreset(card.dataset.design);
        syncSettingsUI();
      });
    });
  }

  function syncSettingsUI() {
    const val = (id, v) => { const el = document.getElementById(id); if (el) el.value = v; };
    const chk = (id, v) => { const el = document.getElementById(id); if (el) el.checked = !!v; };
    const txt = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };

    val('s-theme-mode', localStorage.getItem('theme') || 'dark');
    val('s-clock-color', state.clockColor || '#ffffff');
    val('s-clock-font', state.clockFont || "'JetBrains Mono', monospace");
    val('s-bg-mode', state.bgMode);
    val('s-bg-blur', state.bgBlur);
    txt('s-bg-blur-val', `${state.bgBlur}px`);
    val('s-bg-dim', state.bgDim);
    txt('s-bg-dim-val', `${state.bgDim}%`);
    val('s-card-opacity', state.cardOpacity);
    txt('s-card-opacity-val', `${state.cardOpacity}%`);
    val('s-card-blur', state.cardBlur);
    txt('s-card-blur-val', `${state.cardBlur}px`);

    txt('s-current-city-label', `${currentLocation.name} (${Number(currentLocation.lat).toFixed(2)}, ${Number(currentLocation.lon).toFixed(2)})`);
    val('s-calc-method', localStorage.getItem('calcMethod') || 'Egyptian');
    val('s-asr-method', localStorage.getItem('asrMethod') || 'Shafi');
    val('s-hijri-offset', state.hijriOffset);
    val('s-iqamah-offset', state.iqamahOffset);

    val('s-time-format', localStorage.getItem('timeFormat') || '12h');
    chk('s-show-seconds', state.showSeconds);
    val('s-clock-scale', state.clockScale);
    txt('s-clock-scale-val', `${state.clockScale}%`);
    val('s-temp-unit', state.tempUnit);
    val('s-forecast-type', state.forecastType);
    chk('s-adhan-alert', state.adhanAlert);
    chk('s-auto-fullscreen', state.autoFullscreen);
  }

  function bindSettingsControls() {
    const onC = (id, fn) => document.getElementById(id)?.addEventListener('change', fn);
    const onI = (id, fn) => document.getElementById(id)?.addEventListener('input', fn);

    onC('s-theme-mode', (e) => {
      localStorage.setItem('theme', e.target.value);
      state.clockColor = e.target.value === 'light' ? '#000000' : '#ffffff';
      persistState();
      applyThemeAndVisuals();
    });

    onC('s-global-skin', (e) => {
      const skin = e.target.value;
      ALL_WIDGETS.forEach(w => { state.widgetSkins[w.id] = skin; });
      persistState();
      renderAllWidgetsOnGrid();
    });

    onI('s-clock-color', (e) => {
      state.clockColor = e.target.value;
      persistState();
      applyThemeAndVisuals();
    });

    onC('s-clock-font', (e) => {
      state.clockFont = e.target.value;
      persistState();
      applyThemeAndVisuals();
    });

    onC('s-bg-mode', (e) => {
      state.bgMode = e.target.value;
      persistState();
      applyThemeAndVisuals();
    });

    onI('s-solid-picker', (e) => {
      state.bgMode = 'solid';
      state.solidColor = e.target.value;
      persistState();
      syncSettingsUI();
      applyThemeAndVisuals();
    });

    document.getElementById('btn-apply-bg-url')?.addEventListener('click', () => {
      const u = document.getElementById('s-custom-bg-url')?.value.trim();
      if (u) {
        state.bgMode = 'unsplash';
        state.bgUrl = u;
        persistState();
        syncSettingsUI();
        applyThemeAndVisuals();
      }
    });

    onC('s-upload-bg-file', (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          localStorage.setItem('praytimeDashboardCustomBg', ev.target.result);
          state.bgMode = 'upload';
          persistState();
          syncSettingsUI();
          applyThemeAndVisuals();
        } catch (err) {
          alert('Image is too large for local storage. Please choose a smaller image.');
        }
      };
      reader.readAsDataURL(file);
    });

    onI('s-bg-blur', (e) => {
      state.bgBlur = Number(e.target.value);
      document.getElementById('s-bg-blur-val').textContent = `${state.bgBlur}px`;
      persistState();
      applyThemeAndVisuals();
    });

    onI('s-bg-dim', (e) => {
      state.bgDim = Number(e.target.value);
      document.getElementById('s-bg-dim-val').textContent = `${state.bgDim}%`;
      persistState();
      applyThemeAndVisuals();
    });

    onI('s-card-opacity', (e) => {
      state.cardOpacity = Number(e.target.value);
      document.getElementById('s-card-opacity-val').textContent = `${state.cardOpacity}%`;
      persistState();
      applyThemeAndVisuals();
    });

    onI('s-card-blur', (e) => {
      state.cardBlur = Number(e.target.value);
      document.getElementById('s-card-blur-val').textContent = `${state.cardBlur}px`;
      persistState();
      applyThemeAndVisuals();
    });

    onC('s-calc-method', (e) => {
      localStorage.setItem('calcMethod', e.target.value);
      computePrayers(currentLocation.lat, currentLocation.lon);
    });

    onC('s-asr-method', (e) => {
      localStorage.setItem('asrMethod', e.target.value);
      computePrayers(currentLocation.lat, currentLocation.lon);
    });

    onC('s-hijri-offset', (e) => {
      state.hijriOffset = Number(e.target.value);
      persistState();
      tickClock();
    });

    onC('s-iqamah-offset', (e) => {
      state.iqamahOffset = Number(e.target.value);
      persistState();
      renderPrayerDockAndCountdown();
    });

    // City Search
    const searchInput = document.getElementById('s-city-search');
    const searchResults = document.getElementById('s-city-results');
    let timer = null;
    if (searchInput && searchResults) {
      searchInput.addEventListener('input', (e) => {
        clearTimeout(timer);
        const q = e.target.value.trim();
        if (q.length < 2) { searchResults.innerHTML = ''; return; }
        timer = setTimeout(async () => {
          try {
            const r = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}&limit=5`);
            const data = await r.json();
            searchResults.innerHTML = '';
            data.forEach(p => {
              const li = document.createElement('li');
              li.textContent = p.display_name.split(',').slice(0, 3).join(', ');
              li.addEventListener('click', () => {
                const name = p.display_name.split(',')[0].trim();
                currentLocation = { lat: parseFloat(p.lat), lon: parseFloat(p.lon), name, type: 'manual' };
                localStorage.setItem('savedLocation', JSON.stringify(currentLocation));
                searchResults.innerHTML = '';
                searchInput.value = '';
                syncSettingsUI();
                computePrayers(currentLocation.lat, currentLocation.lon);
                fetchOpenMeteo(currentLocation.lat, currentLocation.lon);
              });
              searchResults.appendChild(li);
            });
          } catch (err) {}
        }, 400);
      });
    }

    document.getElementById('s-use-gps-btn')?.addEventListener('click', (e) => {
      const btn = e.currentTarget;
      if (!navigator.geolocation) return;
      btn.textContent = 'Locating...';
      navigator.geolocation.getCurrentPosition(async (pos) => {
        const { latitude, longitude } = pos.coords;
        let name = 'My Location';
        try {
          const r = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10`);
          const d = await r.json();
          name = d.address?.city || d.address?.town || d.address?.suburb || 'My Location';
        } catch (err) {}
        currentLocation = { lat: latitude, lon: longitude, name, type: 'gps' };
        localStorage.setItem('savedLocation', JSON.stringify(currentLocation));
        btn.innerHTML = '<i class="ri-gps-line"></i> Use Current GPS';
        syncSettingsUI();
        computePrayers(latitude, longitude);
        fetchOpenMeteo(latitude, longitude);
      }, () => {
        btn.innerHTML = '<i class="ri-gps-line"></i> GPS Denied';
      });
    });

    onC('s-time-format', (e) => {
      localStorage.setItem('timeFormat', e.target.value);
      computePrayers(currentLocation.lat, currentLocation.lon);
      tickClock();
    });

    onC('s-show-seconds', (e) => {
      state.showSeconds = e.target.checked;
      persistState();
      tickClock();
    });

    onI('s-clock-scale', (e) => {
      state.clockScale = Number(e.target.value);
      document.getElementById('s-clock-scale-val').textContent = `${state.clockScale}%`;
      persistState();
      applyThemeAndVisuals();
    });

    onC('s-temp-unit', (e) => {
      state.tempUnit = e.target.value;
      persistState();
      renderWeatherUI();
    });

    onC('s-forecast-type', (e) => {
      state.forecastType = e.target.value;
      persistState();
      renderWeatherUI();
    });

    onC('s-adhan-alert', (e) => { state.adhanAlert = e.target.checked; persistState(); });
    onC('s-auto-fullscreen', (e) => { state.autoFullscreen = e.target.checked; persistState(); });

    document.getElementById('btn-test-chime')?.addEventListener('click', playSereneAdhanChime);

    document.getElementById('btn-reset-dashboard')?.addEventListener('click', () => {
      localStorage.removeItem('praytimeTVDashboardV3');
      localStorage.removeItem('praytimeDashboardCustomBg');
      state = buildDefaultState();
      applyThemeAndVisuals();
      renderAllWidgetsOnGrid();
      syncSettingsUI();
    });
  }

  // --------------------------------------------------------------------------
  // 10. FULLSCREEN, KEYBOARD SHORTCUTS & EXIT BUTTON
  // --------------------------------------------------------------------------
  const fsBtn = document.getElementById('fullscreen-toggle-btn');
  const exitBtn = document.getElementById('exit-dashboard-btn');

  async function toggleFullscreen() {
    try {
      if (!document.fullscreenElement) await document.documentElement.requestFullscreen();
      else if (document.exitFullscreen) await document.exitFullscreen();
    } catch (e) {}
  }

  fsBtn?.addEventListener('click', toggleFullscreen);

  exitBtn?.addEventListener('click', async (e) => {
    e.preventDefault();
    if (document.fullscreenElement && document.exitFullscreen) {
      try { await document.exitFullscreen(); } catch (err) {}
    }
    window.location.href = 'index.html';
  });

  if (state.autoFullscreen && document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen().catch(() => {});
  }

  if ('wakeLock' in navigator) {
    navigator.wakeLock.request('screen').catch(() => {});
  }

  // --------------------------------------------------------------------------
  // 11. BOOTSTRAP
  // --------------------------------------------------------------------------
  buildSettingsSwatches();
  applyThemeAndVisuals();
  renderAllWidgetsOnGrid();
  setupTouchAndMouseGrab();
  bindSettingsControls();

  computePrayers(currentLocation.lat, currentLocation.lon);
  fetchOpenMeteo(currentLocation.lat, currentLocation.lon);
  renderTasbih();
  renderAyah();
  renderAsma();
  tickClock();

  setInterval(tickClock, 1000);
  setInterval(() => fetchOpenMeteo(currentLocation.lat, currentLocation.lon), 15 * 60 * 1000);
});
