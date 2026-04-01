import { motion } from 'framer-motion';

// Stagger container + child variants
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

// Animated dot that pulses
function PulseDot() {
  return (
    <motion.span
      style={{
        display: 'inline-block',
        width: 8, height: 8,
        borderRadius: '50%',
        background: '#111',
        marginRight: 8,
        verticalAlign: 'middle',
      }}
      animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

export default function HeroSection({ compact = false }) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      style={{
        textAlign: 'center',
        marginBottom: compact ? 0 : 8,
      }}
    >
      {/* Icon */}
      <motion.div
        variants={item}
        style={{ marginBottom: 16 }}
      >
        <motion.span
          style={{ fontSize: compact ? 36 : 52, display: 'inline-block', lineHeight: 1 }}
          animate={{
            rotate: [0, -4, 4, -4, 0],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', repeatDelay: 3 }}
        >
          🍽️
        </motion.span>
      </motion.div>

      {/* Title */}
      <motion.h1
        variants={item}
        style={{
          fontSize: compact ? 'clamp(22px, 4vw, 30px)' : 'clamp(32px, 6vw, 54px)',
          fontWeight: 800,
          letterSpacing: '-1.5px',
          lineHeight: 1.05,
          color: '#111',
          marginBottom: 10,
        }}
      >
        Cuisine Predictor
      </motion.h1>

      {/* Subtitle */}
      {!compact && (
        <motion.p
          variants={item}
          style={{
            fontSize: 15,
            color: '#888',
            fontWeight: 400,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4,
            letterSpacing: '0.1px',
          }}
        >
          <PulseDot />
          ML-powered · 20 cuisines · 71% accuracy
        </motion.p>
      )}
    </motion.div>
  );
}
