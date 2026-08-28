import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AppContext = createContext(null);

const STORAGE_KEY = 'ganitam-progress';

const defaultProgress = {
  streak: 5,
  lastPlayed: new Date().toISOString().split('T')[0],
  mastered: [],
  continueId: 'multiply-11',
  continueStep: 1,
  totalSolved: 42,
  personalBests: {},
  dailyDone: false,
};

export function AppProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('ganitam-lang') || null);
  const [screen, setScreen] = useState(lang ? 'home' : 'language');
  const [tab, setTab] = useState('home');
  const [selectedTechnique, setSelectedTechnique] = useState(null);
  const [mode, setMode] = useState(null); // 'learn' | 'guided' | 'practice' | 'speed' | 'daily'
  const [progress, setProgress] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? { ...defaultProgress, ...JSON.parse(saved) } : { ...defaultProgress };
    } catch {
      return { ...defaultProgress };
    }
  });
  const [practiceState, setPracticeState] = useState(null);
  const [results, setResults] = useState(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const setLanguage = useCallback((l) => {
    setLang(l);
    localStorage.setItem('ganitam-lang', l);
    setScreen('home');
  }, []);

  const t = useCallback(
    (en, hi) => {
      if (lang === 'hi') return hi;
      if (lang === 'both') return `${en}\n${hi}`;
      return en;
    },
    [lang]
  );

  const tInline = useCallback(
    (en, hi) => {
      if (lang === 'hi') return hi;
      if (lang === 'both') return (
        <>
          <span>{en}</span>
          <span className="hi-line">{hi}</span>
        </>
      );
      return en;
    },
    [lang]
  );

  const navigate = useCallback((newScreen, opts = {}) => {
    if (newScreen === 'main') {
      setScreen('main');
    } else if (newScreen === 'home') {
      setScreen('main');
      setTab('home');
    } else if (newScreen === 'learn') {
      setScreen('main');
      setTab('learn');
    } else {
      setScreen(newScreen);
    }
    if (opts.tab) setTab(opts.tab);
    if (opts.technique) setSelectedTechnique(opts.technique);
    if (opts.mode) setMode(opts.mode);
  }, []);

  const openTechnique = useCallback((technique, learnMode = 'learn') => {
    setSelectedTechnique(technique);
    setMode(learnMode);
    setScreen('technique');
  }, []);

  const startPractice = useCallback((technique, practiceMode = 'practice') => {
    setSelectedTechnique(technique);
    setMode(practiceMode);
    setPracticeState({
      index: 0,
      correct: 0,
      hints: 0,
      startTime: Date.now(),
      answers: [],
    });
    setScreen('practice');
  }, []);

  const finishSession = useCallback((sessionResults) => {
    setResults(sessionResults);
    setProgress((p) => {
      const mastered = sessionResults.accuracy >= 80 && !p.mastered.includes(sessionResults.techniqueId)
        ? [...p.mastered, sessionResults.techniqueId]
        : p.mastered;
      return {
        ...p,
        mastered,
        totalSolved: p.totalSolved + sessionResults.total,
        continueId: sessionResults.techniqueId,
        dailyDone: sessionResults.mode === 'daily' ? true : p.dailyDone,
        personalBests: {
          ...p.personalBests,
          [sessionResults.techniqueId]: Math.min(
            p.personalBests[sessionResults.techniqueId] || Infinity,
            sessionResults.avgTime
          ),
        },
      };
    });
    setScreen('results');
  }, []);

  const value = {
    lang,
    setLanguage,
    screen,
    tab,
    setTab,
    navigate,
    selectedTechnique,
    openTechnique,
    mode,
    setMode,
    progress,
    setProgress,
    practiceState,
    setPracticeState,
    startPractice,
    finishSession,
    results,
    t,
    tInline,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
