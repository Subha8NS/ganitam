import { motion } from 'framer-motion';

export function AppBackground() {
  return (
    <div className="app-bg">
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
      <div className="orb orb-4" />
    </div>
  );
}

export function Confetti({ active }) {
  if (!active) return null;
  const colors = ['#6366f1', '#f59e0b', '#14b8a6', '#ec4899', '#8b5cf6'];
  const pieces = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 0.5,
    color: colors[i % colors.length],
    size: 6 + Math.random() * 8,
  }));

  return (
    <div className="confetti-container">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="confetti-piece"
          style={{
            left: p.left,
            background: p.color,
            width: p.size,
            height: p.size,
            animationDelay: `${p.delay}s`,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
          }}
        />
      ))}
    </div>
  );
}

export function FadeIn({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.34, 1.56, 0.64, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function ScaleIn({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay, type: 'spring', stiffness: 200, damping: 15 }}
    >
      {children}
    </motion.div>
  );
}

export function SlideUp({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function FloatingCard({ children, className = '', onClick, delay = 0 }) {
  return (
    <motion.div
      className={className}
      onClick={onClick}
      initial={{ opacity: 0, y: 30, rotateX: 10 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.5, delay, type: 'spring', stiffness: 150 }}
      whileHover={{ y: -4, scale: 1.02, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.97 }}
      style={{ transformPerspective: 800 }}
    >
      {children}
    </motion.div>
  );
}

export function PulseGlow({ children, className = '' }) {
  return (
    <motion.div
      className={className}
      animate={{
        boxShadow: [
          '0 8px 32px rgba(99, 102, 241, 0.15)',
          '0 12px 40px rgba(245, 158, 11, 0.2)',
          '0 8px 32px rgba(99, 102, 241, 0.15)',
        ],
      }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
}

export function HeaderBar({ title, onBack, right }) {
  return (
    <div className="header-bar">
      {onBack ? (
        <button className="back-btn" onClick={onBack} aria-label="Back">←</button>
      ) : (
        <div style={{ width: 40 }} />
      )}
      <span style={{ fontWeight: 700, fontSize: '1rem' }}>{title}</span>
      {right || <div style={{ width: 40 }} />}
    </div>
  );
}
