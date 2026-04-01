import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BackgroundOrbs from './components/BackgroundOrbs';
import HeroSection from './components/HeroSection';
import SearchSection from './components/SearchSection';
import ResultCard from './components/ResultCard';
import RecipeChips from './components/RecipeChips';
import ModelStatsPanel from './components/ModelStatsPanel';
import { predictCuisine } from './data/cuisineDB';

// ── App State Machine ────────────────────────────────────────────────────
// 'idle'    → initial centered homepage
// 'loading' → spinner in button
// 'result'  → two-column results layout

export default function App() {
  const [phase, setPhase]   = useState('idle');
  const [result, setResult] = useState(null);

  const handlePredict = useCallback((input) => {
    if (phase === 'loading') return;
    setPhase('loading');
    // Simulate async ML inference
    const delay = 900 + Math.random() * 600;
    setTimeout(() => {
      const prediction = predictCuisine(input);
      setResult(prediction);
      setPhase('result');
    }, delay);
  }, [phase]);

  const handleReset = useCallback(() => {
    setPhase('idle');
    setResult(null);
  }, []);

  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
      <BackgroundOrbs />

      {/* ── Noise texture overlay ── */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        opacity: 0.4,
      }} />

      {/* ═══════════════════════════════════════════════════════════
          IDLE PHASE — Centered hero + search
          ═══════════════════════════════════════════════════════════ */}
      <AnimatePresence mode="wait">
        {phase === 'idle' && (
          <motion.div
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.97, filter: 'blur(4px)' }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            style={{
              position: 'relative', zIndex: 10,
              minHeight: '100vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '32px 20px',
              gap: 28,
            }}
          >
            <HeroSection />
            <SearchSection onPredict={handlePredict} loading={false} />

            {/* Bottom watermark */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              style={{
                position: 'absolute',
                bottom: 24,
                left: '50%',
                transform: 'translateX(-50%)',
                fontSize: 11.5,
                color: '#ccc',
                whiteSpace: 'nowrap',
                letterSpacing: '0.2px',
              }}
            >
              Cuisine Predictor · Multi-class classification · Yummly dataset
            </motion.p>
          </motion.div>
        )}

        {/* ═══════════════════════════════════════════════════════════
            LOADING PHASE
            ═══════════════════════════════════════════════════════════ */}
        {phase === 'loading' && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'relative', zIndex: 10,
              minHeight: '100vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '32px 20px',
              gap: 28,
            }}
          >
            <HeroSection compact />
            <SearchSection onPredict={handlePredict} loading={true} />
            <LoadingIndicator />
          </motion.div>
        )}

        {/* ═══════════════════════════════════════════════════════════
            RESULT PHASE — Two-column layout
            ═══════════════════════════════════════════════════════════ */}
        {phase === 'result' && result && (
          <motion.div
            key="result"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ position: 'relative', zIndex: 10, minHeight: '100vh' }}
          >
            {/* Top bar */}
            <TopBar onReset={handleReset} onNewPredict={handlePredict} />

            {/* Main grid */}
            <div style={{
              maxWidth: 900,
              margin: '0 auto',
              padding: '24px 20px 60px',
              display: 'flex',
              gap: 24,
              alignItems: 'flex-start',
              flexWrap: 'wrap',
            }}>
              {/* Left: result + chips */}
              <div style={{
                flex: 1,
                minWidth: 300,
                display: 'flex',
                flexDirection: 'column',
                gap: 18,
              }}>
                <ResultCard result={result} onReset={handleReset} />
                <RecipeChips cuisine={result.cuisine} />
              </div>

              {/* Right: model stats */}
              <ModelStatsPanel />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Loading Indicator ───────────────────────────────────────────────────
function LoadingIndicator() {
  const dots = [0, 1, 2];
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}
    >
      <div style={{ display: 'flex', gap: 6 }}>
        {dots.map(i => (
          <motion.div
            key={i}
            animate={{ y: [0, -8, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 0.8, delay: i * 0.16, repeat: Infinity, ease: 'easeInOut' }}
            style={{ width: 7, height: 7, borderRadius: '50%', background: '#333' }}
          />
        ))}
      </div>
      <motion.p
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.6, repeat: Infinity }}
        style={{ fontSize: 13, color: '#aaa', letterSpacing: '0.2px' }}
      >
        Identifying your cuisine…
      </motion.p>
    </motion.div>
  );
}

// ── Top Navigation Bar (results phase) ─────────────────────────────────
function TopBar({ onReset, onNewPredict }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 28px',
        borderBottom: '1px solid #f0f0f0',
        background: 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(12px)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      {/* Logo */}
      <motion.button
        onClick={onReset}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '4px 0',
        }}
        aria-label="Go to home"
      >
        <span style={{ fontSize: 22 }}>🍽️</span>
        <span style={{ fontSize: 15, fontWeight: 700, color: '#111', letterSpacing: '-0.4px' }}>
          Cuisine Predictor
        </span>
      </motion.button>

      {/* Inline mini search */}
      <MiniSearch onPredict={onNewPredict} />
    </motion.div>
  );
}

// ── Inline mini search bar in top bar ──────────────────────────────────
function MiniSearch({ onPredict }) {
  const [val, setVal] = useState('');
  const [focused, setFocused] = useState(false);

  function submit() {
    if (!val.trim()) return;
    onPredict(val.trim());
    setVal('');
  }

  return (
    <motion.div
      animate={{
        width: focused ? 320 : 240,
        boxShadow: focused
          ? '0 0 0 2px #111, 0 4px 16px rgba(0,0,0,.08)'
          : '0 1px 4px rgba(0,0,0,.06)',
      }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      style={{
        display: 'flex',
        alignItems: 'center',
        background: '#f8f8f8',
        border: `1.5px solid ${focused ? '#111' : '#e8e8e8'}`,
        borderRadius: 10,
        padding: '0 8px 0 12px',
        height: 38,
        gap: 8,
        transition: 'border-color 0.2s',
        overflow: 'hidden',
      }}
    >
      <span style={{ fontSize: 14, opacity: 0.5, flexShrink: 0 }}>🔍</span>
      <input
        value={val}
        onChange={e => setVal(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onKeyDown={e => e.key === 'Enter' && submit()}
        placeholder="New ingredients…"
        style={{
          flex: 1,
          border: 'none',
          outline: 'none',
          background: 'transparent',
          fontFamily: 'Inter, sans-serif',
          fontSize: 13,
          color: '#111',
          minWidth: 0,
        }}
        aria-label="Search new ingredients"
        id="mini-search-input"
      />
      <AnimatePresence>
        {val && (
          <motion.button
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            onClick={submit}
            style={{
              background: '#111',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              padding: '3px 10px',
              fontFamily: 'Inter, sans-serif',
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
              flexShrink: 0,
            }}
            aria-label="Submit new search"
          >
            Go
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
