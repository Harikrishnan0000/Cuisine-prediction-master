import { motion } from 'framer-motion';
import { CUISINE_DB } from '../data/cuisineDB';

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.6,
    },
  },
};

const chip = {
  hidden: { opacity: 0, scale: 0.78, y: 16 },
  show: {
    opacity: 1, scale: 1, y: 0,
    transition: { type: 'spring', stiffness: 380, damping: 22 },
  },
};

export default function RecipeChips({ cuisine }) {
  const meta = CUISINE_DB[cuisine];
  if (!meta) return null;

  return (
    <div style={{ width: '100%', maxWidth: 520 }}>
      {/* Section label */}
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: '#bbb',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          marginBottom: 12,
        }}
      >
        Signature Dishes
      </motion.p>

      {/* Chips */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 8,
        }}
      >
        {meta.recipes.map((recipe, i) => (
          <Chip key={recipe} recipe={recipe} accent={meta.accent} index={i} />
        ))}
      </motion.div>
    </div>
  );
}

function Chip({ recipe, accent, index }) {
  const icons = ['🍜', '🍕', '🥘', '🫕', '🍱'];
  const icon = icons[index % icons.length];

  return (
    <motion.div
      variants={chip}
      whileHover={{
        scale: 1.06,
        y: -3,
        boxShadow: '0 6px 20px rgba(0,0,0,.10)',
        borderColor: accent + 'aa',
      }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 420, damping: 22 }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 7,
        background: '#fff',
        border: '1.5px solid #ebebeb',
        borderRadius: 999,
        padding: '7px 16px 7px 12px',
        fontSize: 13,
        fontWeight: 500,
        color: '#333',
        cursor: 'default',
        userSelect: 'none',
        boxShadow: '0 1px 4px rgba(0,0,0,.04)',
        transition: 'border-color 0.2s',
      }}
    >
      <span style={{ fontSize: 15 }}>{icon}</span>
      {recipe}
    </motion.div>
  );
}
