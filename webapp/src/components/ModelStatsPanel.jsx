import { motion } from 'framer-motion';
import { MODEL_STATS } from '../data/cuisineDB';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const row = {
  hidden: { opacity: 0, x: -14 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
};

export default function ModelStatsPanel() {
  const top = MODEL_STATS.slice(0, 8);

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
      style={{
        background: '#fff',
        border: '1.5px solid #e8e8e8',
        borderRadius: 18,
        padding: '22px 20px',
        boxShadow: '0 4px 20px rgba(0,0,0,.06)',
        width: 220,
        flexShrink: 0,
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 18 }}>
        <p style={{
          fontSize: 10.5,
          fontWeight: 700,
          color: '#bbb',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          marginBottom: 2,
        }}>
          Model Accuracy
        </p>
        <p style={{ fontSize: 11, color: '#ccc' }}>F1 Score by cuisine</p>
      </div>

      {/* Rows */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        style={{ display: 'flex', flexDirection: 'column', gap: 11 }}
      >
        {top.map(({ cuisine, f1 }) => (
          <motion.div key={cuisine} variants={row}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <span style={{ fontSize: 11.5, color: '#555', fontWeight: 500 }}>{cuisine}</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: f1 >= 0.75 ? '#111' : '#aaa' }}>
                {Math.round(f1 * 100)}%
              </span>
            </div>
            <div style={{ height: 3, background: '#f0f0f0', borderRadius: 2, overflow: 'hidden' }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${f1 * 100}%` }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                style={{
                  height: '100%',
                  borderRadius: 2,
                  background: f1 >= 0.8
                    ? 'linear-gradient(90deg, #111, #555)'
                    : f1 >= 0.65
                    ? 'linear-gradient(90deg, #555, #888)'
                    : 'linear-gradient(90deg, #aaa, #ccc)',
                }}
              />
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        style={{
          marginTop: 18,
          paddingTop: 14,
          borderTop: '1px solid #f0f0f0',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 10.5, color: '#ccc' }}>Overall accuracy</span>
          <span style={{ fontSize: 13, fontWeight: 800, color: '#111' }}>71%</span>
        </div>
        <div style={{ fontSize: 10, color: '#ddd', marginTop: 4 }}>
          Trained on 39,774 recipes
        </div>
      </motion.div>
    </motion.div>
  );
}
