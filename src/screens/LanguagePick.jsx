import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { FadeIn, FloatingCard } from '../components/ui';

export default function LanguagePick() {
  const { setLanguage } = useApp();

  const options = [
    { id: 'en', flag: '🇬🇧', name: 'English', sub: 'Learn in English' },
    { id: 'hi', flag: '🇮🇳', name: 'हिंदी', sub: 'हिंदी में सीखें' },
    { id: 'both', flag: '🌐', name: 'Both / दोनों', sub: 'English + हिंदी together' },
  ];

  return (
    <div className="screen-container no-nav">
      <FadeIn>
        <div className="logo-splash">
          <motion.div
            className="logo-3d"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 120, damping: 12, delay: 0.1 }}
          >
            Ganitam
          </motion.div>
          <motion.p
            className="tagline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Smart maths, Vedic speed
            <span className="hi-line">तेज़ गणित, वैदिक तरीका</span>
          </motion.p>
        </div>
      </FadeIn>

      <FadeIn delay={0.3}>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: 8 }}>
          Choose your language
          <span className="hi-line">अपनी भाषा चुनें</span>
        </p>
      </FadeIn>

      <div className="lang-cards">
        {options.map((opt, i) => (
          <FloatingCard key={opt.id} delay={0.2 + i * 0.1}>
            <motion.div
              className="lang-card glass-3d pressable"
              onClick={() => setLanguage(opt.id)}
              whileHover={{ scale: 1.02 }}
            >
              <motion.div
                className="lang-flag"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
              >
                {opt.flag}
              </motion.div>
              <div className="lang-name">{opt.name}</div>
              <div className="lang-sub">{opt.sub}</div>
            </motion.div>
          </FloatingCard>
        ))}
      </div>
    </div>
  );
}
