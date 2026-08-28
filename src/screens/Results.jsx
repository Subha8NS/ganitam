import { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { Confetti, FadeIn } from '../components/ui';
import { GainedPanel } from '../components/ProDisplay';

export default function Results() {
  const { results, selectedTechnique: tech, navigate, lang, tInline } = useApp();
  const [showConfetti] = useState(results?.accuracy >= 60);

  if (!results || !tech) return null;

  const isMastered = results.accuracy >= 80;

  return (
    <>
      <Confetti active={showConfetti} />

      <FadeIn>
        <div className="results-hero glass-3d">
          <motion.div
            className="results-score"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 150, damping: 12 }}
          >
            {results.accuracy}%
          </motion.div>
          <p style={{ fontWeight: 600, marginTop: 8 }}>
            {results.correct}/{results.total} {lang === 'hi' ? 'सही' : 'correct'}
          </p>
          {isMastered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              style={{ marginTop: 12, color: 'var(--success)', fontWeight: 700 }}
            >
              ★ {tInline(tech.masteredText.en, tech.masteredText.hi)}
            </motion.div>
          )}
        </div>
      </FadeIn>

      <FadeIn delay={0.2}>
        <GainedPanel results={results} technique={tech} />
      </FadeIn>

      <FadeIn delay={0.3}>
        <div className="why-vedic glass" style={{ marginBottom: 16 }}>
          <div className="why-vedic-title">
            {lang === 'hi' ? 'वैदिक फायदे जो आपने इस्तेमाल किए' : 'Vedic pros you used'}
          </div>
          <div className="pro-chips">
            {tech.vedic.pros?.map((p) => {
              const labels = {
                speed: { en: '⚡ Faster solving', hi: '⚡ तेज़ हल' },
                steps: { en: '📉 Fewer steps', hi: '📉 कम कदम' },
                mental: { en: '🧠 Mental maths', hi: '🧠 दिमागी गणित' },
                pattern: { en: '🔁 Pattern power', hi: '🔁 पैटर्न शक्ति' },
                exam: { en: '📝 Exam ready', hi: '📝 परीक्षा तैयार' },
                verify: { en: '✓ Quick verify', hi: '✓ जल्दी जाँच' },
                confidence: { en: '💪 Confidence boost', hi: '💪 आत्मविश्वास' },
              };
              const l = labels[p];
              return (
                <span key={p} className={`pro-chip ${p}`}>
                  {lang === 'hi' ? l.hi : l.en}
                </span>
              );
            })}
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.4}>
        <motion.button
          className="btn btn-primary btn-block"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate('main', { tab: 'home' })}
        >
          {lang === 'hi' ? 'होम पर जाएँ' : 'Back to Home'}
        </motion.button>
        <motion.button
          className="btn btn-ghost btn-block"
          style={{ marginTop: 10 }}
          whileHover={{ scale: 1.02 }}
          onClick={() => navigate('technique')}
        >
          {lang === 'hi' ? 'फिर से अभ्यास' : 'Practice again'}
        </motion.button>
      </FadeIn>
    </>
  );
}
