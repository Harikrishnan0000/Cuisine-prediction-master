import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SUGGESTIONS = [
  'pasta, tomato, basil, garlic',
  'soy sauce, ginger, noodles, sesame',
  'chicken, turmeric, garam masala, yogurt',
  'beef, kimchi, sesame oil, gochujang',
  'saffron, chorizo, rice, paprika',
];

export default function SearchSection({ onPredict, loading }) {
  const [value, setValue] = useState('');
  const [focused, setFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);

  const filtered = SUGGESTIONS.filter(s =>
    value === '' || s.toLowerCase().includes(value.toLowerCase())
  );

  function handleSubmit() {
    if (!value.trim() || loading) return;
    setShowSuggestions(false);
    onPredict(value.trim());
  }

  function handleKey(e) {
    if (e.key === 'Enter') handleSubmit();
    if (e.key === 'Escape') {
      setShowSuggestions(false);
      inputRef.current?.blur();
    }
  }

  function pickSuggestion(s) {
    setValue(s);
    setShowSuggestions(false);
    inputRef.current?.focus();
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      style={{ position: 'relative', width: '100%', maxWidth: 560 }}
    >
      {/* ── Input shell ── */}
      <motion.div
        animate={{
          boxShadow: focused
            ? '0 0 0 2px #111, 0 8px 32px rgba(0,0,0,.10)'
            : '0 2px 8px rgba(0,0,0,.08), 0 1px 3px rgba(0,0,0,.04)',
        }}
        transition={{ duration: 0.2 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          background: '#fff',
          border: `1.5px solid ${focused ? '#111' : '#e0e0e0'}`,
          borderRadius: 16,
          padding: '0 6px 0 18px',
          height: 58,
          gap: 10,
          transition: 'border-color 0.2s',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Leaf icon */}
        <motion.span
          animate={{ rotate: focused ? [0, -15, 10, 0] : 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          style={{ fontSize: 20, flexShrink: 0, userSelect: 'none' }}
        >
          🥗
        </motion.span>

        {/* Input */}
        <input
          ref={inputRef}
          value={value}
          onChange={e => { setValue(e.target.value); setShowSuggestions(true); }}
          onFocus={() => { setFocused(true); setShowSuggestions(true); }}
          onBlur={() => { setFocused(false); setTimeout(() => setShowSuggestions(false), 150); }}
          onKeyDown={handleKey}
          placeholder="Enter ingredients (e.g. chicken, rice, garlic)"
          style={{
            flex: 1,
            border: 'none',
            outline: 'none',
            fontFamily: 'Inter, sans-serif',
            fontSize: 15,
            fontWeight: 400,
            color: '#111',
            background: 'transparent',
            letterSpacing: '-0.1px',
          }}
          aria-label="Ingredient input"
          id="ingredient-input"
          autoComplete="off"
          spellCheck="false"
        />

        {/* Clear */}
        <AnimatePresence>
          {value && (
            <motion.button
              key="clear"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.15 }}
              onClick={() => { setValue(''); inputRef.current?.focus(); }}
              style={{
                background: '#f0f0f0',
                border: 'none',
                borderRadius: '50%',
                width: 24, height: 24,
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#888',
                fontSize: 12,
                flexShrink: 0,
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#e0e0e0'}
              onMouseLeave={e => e.currentTarget.style.background = '#f0f0f0'}
              aria-label="Clear input"
            >
              ✕
            </motion.button>
          )}
        </AnimatePresence>

        {/* Predict Button */}
        <PredictButton onClick={handleSubmit} loading={loading} />
      </motion.div>

      {/* ── Suggestions dropdown ── */}
      <AnimatePresence>
        {showSuggestions && filtered.length > 0 && !loading && (
          <motion.div
            key="suggestions"
            initial={{ opacity: 0, y: -8, scaleY: 0.9 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -8, scaleY: 0.9 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              top: 'calc(100% + 8px)',
              left: 0, right: 0,
              background: '#fff',
              border: '1.5px solid #e8e8e8',
              borderRadius: 14,
              boxShadow: '0 8px 32px rgba(0,0,0,.10)',
              overflow: 'hidden',
              zIndex: 50,
              transformOrigin: 'top',
            }}
          >
            <div style={{ padding: '6px 0' }}>
              <p style={{ fontSize: 10.5, fontWeight: 600, color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.8px', padding: '6px 16px 4px' }}>
                Try these
              </p>
              {filtered.map((s, i) => (
                <motion.div
                  key={s}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => pickSuggestion(s)}
                  style={{
                    padding: '9px 16px',
                    fontSize: 13.5,
                    color: '#444',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    transition: 'background 0.1s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = '#f8f8f8'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <span style={{ fontSize: 14, opacity: 0.5 }}>↗</span>
                  {s}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Hint text ── */}
      <AnimatePresence>
        {!focused && !value && (
          <motion.p
            key="hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ textAlign: 'center', fontSize: 12.5, color: '#bbb', marginTop: 12, letterSpacing: '0.1px' }}
          >
            Press <kbd style={{ fontFamily: 'Inter', background: '#f0f0f0', border: '1px solid #e0e0e0', borderRadius: 4, padding: '1px 6px', fontSize: 11, color: '#666' }}>Enter</kbd> to predict
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Predict Button (inner) ──────────────────────────────────────────────
function PredictButton({ onClick, loading }) {
  return (
    <motion.button
      id="predict-btn"
      onClick={onClick}
      disabled={loading}
      whileHover={!loading ? { scale: 1.04 } : {}}
      whileTap={!loading ? { scale: 0.96 } : {}}
      transition={{ type: 'spring', stiffness: 400, damping: 22 }}
      style={{
        background: loading ? '#555' : '#111',
        color: '#fff',
        border: 'none',
        borderRadius: 10,
        padding: '0 22px',
        height: 44,
        fontFamily: 'Inter, sans-serif',
        fontSize: 14,
        fontWeight: 600,
        cursor: loading ? 'not-allowed' : 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        letterSpacing: '-0.1px',
        flexShrink: 0,
        transition: 'background 0.2s',
        position: 'relative',
        overflow: 'hidden',
      }}
      aria-label="Predict cuisine"
    >
      {loading ? (
        <>
          <Spinner />
          <span>Analysing…</span>
        </>
      ) : (
        <>
          <span>Predict</span>
          <motion.span
            animate={{ x: [0, 3, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            style={{ fontSize: 14 }}
          >
            ✦
          </motion.span>
        </>
      )}
    </motion.button>
  );
}

function Spinner() {
  return (
    <motion.span
      animate={{ rotate: 360 }}
      transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
      style={{
        display: 'inline-block',
        width: 14, height: 14,
        border: '2px solid rgba(255,255,255,.3)',
        borderTopColor: '#fff',
        borderRadius: '50%',
      }}
    />
  );
}
