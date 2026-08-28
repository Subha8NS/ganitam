import { motion, AnimatePresence } from 'framer-motion';

const CELEBRATION_EMOJIS = ['⭐', '✨', '🎉', '💫', '🌟'];

export function AppBackground() {
  const symbols = ['+', '−', '×', '÷', '%', '²'];
  return (
    <div className="app-bg">
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
      <div className="orb orb-4" />
      {symbols.map((sym, i) => (
        <motion.span
          key={sym}
          className="float-symbol"
          style={{ left: `${12 + i * 14}%`, top: `${20 + (i % 3) * 25}%` }}
          animate={{
            y: [0, -18, 0],
            opacity: [0.08, 0.18, 0.08],
            rotate: [0, 10, -10, 0],
          }}
          transition={{ duration: 4 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
        >
          {sym}
        </motion.span>
      ))}
    </div>
  );
}

export function SparkleBurst({ active }) {
  if (!active) return null;
  const sparks = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    angle: (i / 12) * 360,
    dist: 40 + Math.random() * 50,
    emoji: CELEBRATION_EMOJIS[i % CELEBRATION_EMOJIS.length],
  }));

  return (
    <div className="sparkle-burst" aria-hidden>
      {sparks.map((s) => (
        <motion.span
          key={s.id}
          className="sparkle-particle"
          initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
          animate={{
            scale: [0, 1.2, 0.8],
            x: Math.cos((s.angle * Math.PI) / 180) * s.dist,
            y: Math.sin((s.angle * Math.PI) / 180) * s.dist,
            opacity: [1, 1, 0],
          }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          {s.emoji}
        </motion.span>
      ))}
    </div>
  );
}

export function Confetti({ active }) {
  if (!active) return null;
  const colors = ['#6366f1', '#f59e0b', '#14b8a6', '#ec4899', '#8b5cf6', '#fbbf24'];
  const pieces = Array.from({ length: 55 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 0.6,
    color: colors[i % colors.length],
    size: 6 + Math.random() * 10,
    rotate: Math.random() * 360,
    isEmoji: i % 7 === 0,
    emoji: CELEBRATION_EMOJIS[i % CELEBRATION_EMOJIS.length],
  }));

  return (
    <div className="confetti-container">
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          className="confetti-piece"
          style={{
            left: `${p.left}%`,
            background: p.isEmoji ? 'transparent' : p.color,
            width: p.isEmoji ? 'auto' : p.size,
            height: p.isEmoji ? 'auto' : p.size,
            fontSize: p.isEmoji ? '1.2rem' : undefined,
            borderRadius: p.isEmoji ? 0 : Math.random() > 0.5 ? '50%' : '2px',
          }}
          initial={{ y: -30, opacity: 1, rotate: 0 }}
          animate={{ y: '110vh', opacity: [1, 1, 0], rotate: p.rotate + 720 }}
          transition={{ duration: 2.2 + Math.random(), delay: p.delay, ease: 'easeIn' }}
        >
          {p.isEmoji ? p.emoji : null}
        </motion.div>
      ))}
    </div>
  );
}

export function CorrectCelebration({ show, message }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="correct-celebration"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 15 }}
        >
          <motion.span
            className="celebration-emoji"
            animate={{ rotate: [0, -12, 12, -8, 0], scale: [1, 1.3, 1] }}
            transition={{ duration: 0.5 }}
          >
            ⭐
          </motion.span>
          <motion.span
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 0.4, repeat: 2 }}
          >
            {message}
          </motion.span>
          <SparkleBurst active />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function TrophyPop({ show, label }) {
  if (!show) return null;
  return (
    <motion.div
      className="trophy-pop"
      initial={{ scale: 0, rotate: -20 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.3 }}
    >
      <motion.span
        style={{ fontSize: '3rem', display: 'block' }}
        animate={{ y: [0, -8, 0], rotate: [0, 5, -5, 0] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        🏆
      </motion.span>
      {label && <p className="trophy-label">{label}</p>}
    </motion.div>
  );
}

export function PulseButton({ children, className = '', onClick, ...props }) {
  return (
    <motion.button
      className={className}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.92 }}
      animate={{
        boxShadow: [
          '0 4px 20px rgba(99, 102, 241, 0.35)',
          '0 8px 32px rgba(245, 158, 11, 0.45)',
          '0 4px 20px rgba(99, 102, 241, 0.35)',
        ],
      }}
      transition={{ boxShadow: { duration: 2, repeat: Infinity } }}
      {...props}
    >
      {children}
    </motion.button>
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
