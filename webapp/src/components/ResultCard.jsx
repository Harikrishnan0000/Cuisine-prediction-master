import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CUISINE_DB } from '../data/cuisineDB';

// Animated number counter
function CountUp({ to, duration = 1.2 }) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    let start = null;
    const step = ts => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / (duration * 1000), 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setVal(Math.floor(ease * to));
      if (progress < 1) requestAnimationFrame(step);
      else setVal(to);
    };
    const raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [to, duration]);

  return <>{val}</>;
}

// Animated character reveal for cuisine name
function CharReveal({ text }) {
  const chars = text.split('');
  return (
    <span style={{ display: 'inline-flex', flexWrap: 'wrap' }}>
      {chars.map((ch, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{
            delay: 0.3 + i * 0.04,
            duration: 0.4,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{ display: 'inline-block', whiteSpace: ch === ' ' ? 'pre' : 'normal' }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

export default function ResultCard({ result, onReset }) {
  const { cuisine, confidence, runnerUp } = result;
  const meta = CUISINE_DB[cuisine] || CUISINE_DB['italian'];
  const label = cuisine.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

  return (
    <motion.div
      key={cuisine}
      initial={{ opacity: 0, y: 32, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.96 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: '#fff',
        border: '1.5px solid #e8e8e8',
        borderRadius: 20,
        padding: '28px 28px 24px',
        boxShadow: '0 12px 40px rgba(0,0,0,.09), 0 2px 8px rgba(0,0,0,.04)',
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        maxWidth: 520,
      }}
    >
      {/* Subtle tinted top stripe */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: 3,
          background: `linear-gradient(90deg, ${meta.accent}, ${meta.accent}88)`,
          transformOrigin: 'left',
        }}
      />

      {/* Badge + flag row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          style={{
            fontSize: 10.5,
            fontWeight: 700,
            color: '#aaa',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <span style={{
            display: 'inline-block',
            width: 6, height: 6,
            borderRadius: '50%',
            background: meta.accent,
          }} />
          Detected Cuisine
        </motion.div>

        {/* Flag */}
        <motion.span
          initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: 0.4, type: 'spring', stiffness: 300, damping: 18 }}
          style={{ fontSize: 28 }}
        >
          {meta.flag}
        </motion.span>
      </div>

      {/* Cuisine name */}
      <div style={{ marginBottom: 20 }}>
        <h2 style={{
          fontSize: 'clamp(28px, 5vw, 38px)',
          fontWeight: 800,
          letterSpacing: '-1.5px',
          lineHeight: 1.05,
          color: '#111',
        }}>
          <CharReveal text={label} />
        </h2>
      </div>

      {/* Confidence bar */}
      <ConfidenceBar confidence={confidence} accent={meta.accent} />

      {/* Runner-up */}
      {runnerUp && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.4 }}
          style={{
            marginTop: 14,
            padding: '8px 12px',
            background: '#fafafa',
            border: '1px solid #f0f0f0',
            borderRadius: 10,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            fontSize: 12.5,
            color: '#888',
          }}
        >
          <span style={{ fontSize: 14 }}>
            {CUISINE_DB[runnerUp.cuisine]?.flag || '🌍'}
          </span>
          Runner-up: {' '}
          <strong style={{ color: '#555', fontWeight: 600 }}>
            {runnerUp.cuisine.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
          </strong>
          <span style={{ marginLeft: 'auto', fontWeight: 600, color: '#bbb' }}>
            {runnerUp.confidence}%
          </span>
        </motion.div>
      )}

      {/* Reset link */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        style={{ marginTop: 18, textAlign: 'right' }}
      >
        <motion.button
          onClick={onReset}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          style={{
            background: 'none',
            border: '1px solid #e0e0e0',
            borderRadius: 8,
            padding: '6px 14px',
            fontFamily: 'Inter, sans-serif',
            fontSize: 12.5,
            color: '#888',
            cursor: 'pointer',
            transition: 'border-color 0.15s, color 0.15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = '#111'; e.currentTarget.style.color = '#111'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = '#e0e0e0'; e.currentTarget.style.color = '#888'; }}
          aria-label="Try again"
        >
          ↺ Try again
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

// ── Confidence Bar ──────────────────────────────────────────────────────
function ConfidenceBar({ confidence, accent }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: '#bbb', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
          Confidence
        </span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          style={{ fontSize: 26, fontWeight: 800, color: '#111', letterSpacing: '-1px' }}
        >
          <CountUp to={confidence} />%
        </motion.span>
      </div>

      {/* Track */}
      <div style={{
        height: 6, borderRadius: 3,
        background: '#f0f0f0',
        overflow: 'hidden',
      }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${confidence}%` }}
          transition={{ delay: 0.5, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            height: '100%',
            borderRadius: 3,
            background: `linear-gradient(90deg, ${accent}bb, ${accent})`,
          }}
        />
      </div>

      {/* Scale labels */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5 }}>
        {['Low', 'Medium', 'High'].map(l => (
          <span key={l} style={{ fontSize: 10, color: '#ccc', letterSpacing: '0.3px' }}>{l}</span>
        ))}
      </div>
    </div>
  );
}
