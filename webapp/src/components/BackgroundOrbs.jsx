// Animated background orbs — pure CSS with subtle motion
import { motion } from 'framer-motion';

const orbs = [
  { size: 520, x: '-10%', y: '-15%', color: 'rgba(0,87,255,0.04)', duration: 18 },
  { size: 400, x: '65%',  y: '50%',  color: 'rgba(0,0,0,0.025)',   duration: 24 },
  { size: 300, x: '20%',  y: '65%',  color: 'rgba(0,87,255,0.03)', duration: 20 },
];

export default function BackgroundOrbs() {
  return (
    <div style={{
      position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden',
    }}>
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: orb.size,
            height: orb.size,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            left: orb.x,
            top: orb.y,
          }}
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -20, 30, 0],
            scale: [1, 1.06, 0.96, 1],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 2,
          }}
        />
      ))}
    </div>
  );
}
