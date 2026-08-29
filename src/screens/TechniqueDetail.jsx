import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { HeaderBar, FadeIn, FloatingCard } from '../components/ui';
import { WhyVedicPanel, CompareGrid, WhenToUseStrip } from '../components/ProDisplay';

export default function TechniqueDetail() {
  const { selectedTechnique: tech, navigate, startPractice, lang, tInline } = useApp();

  if (!tech) return null;

  return (
    <>
      <HeaderBar
        title={lang === 'hi' ? tech.hi : tech.en}
        onBack={() => navigate('main', { tab: 'learn' })}
      />

      <FadeIn>
        <motion.div
          className="tech-icon-3d"
          style={{ width: 64, height: 64, fontSize: '1.2rem', margin: '0 auto 16px' }}
          animate={{ rotateY: [0, 15, 0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          {tech.icon}
        </motion.div>
        <h2 style={{ textAlign: 'center', fontWeight: 800, fontSize: '1.3rem', marginBottom: 12 }}>
          {tInline(tech.en, tech.hi)}
        </h2>
        {tech.sutra && (
          <div className="sutra-badge glass" style={{ marginBottom: 16, textAlign: 'center', padding: '12px 14px' }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              {lang === 'hi' ? 'सूत्र' : 'Sutra'}
            </div>
            <div style={{ fontWeight: 700, color: 'var(--primary-dark)', marginTop: 4 }}>
              {tInline(tech.sutra.en, tech.sutra.hi)}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 2 }}>
              {tInline(tech.sutra.meaning.en, tech.sutra.meaning.hi)}
            </div>
            {tech.selinaTag && (
              <div style={{ fontSize: '0.75rem', marginTop: 8, color: 'var(--saffron)' }}>
                📘 {tInline(tech.selinaTag.en, tech.selinaTag.hi)}
                {tech.grades ? ` · ${tech.grades}` : ''}
              </div>
            )}
          </div>
        )}
      </FadeIn>

      <FadeIn delay={0.1}>
        <WhyVedicPanel pros={tech.whyVedic} />
      </FadeIn>

      <FadeIn delay={0.15}>
        <WhenToUseStrip whenToUse={tech.whenToUse} whenNotToUse={tech.whenNotToUse} />
      </FadeIn>

      <FadeIn delay={0.2}>
        <div className="section-label">
          {lang === 'hi' ? 'सामान्य बनाम वैदिक' : 'Regular vs Vedic'}
        </div>
        <AnimatePresence>
          <CompareGrid regular={tech.regular} vedic={tech.vedic} />
        </AnimatePresence>
      </FadeIn>

      <FadeIn delay={0.3}>
        <div className="gap-row" style={{ marginBottom: 12 }}>
          <motion.button
            className="btn btn-primary btn-block"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('guided')}
          >
            {lang === 'hi' ? 'मेरे साथ आज़माएँ' : 'Try with me'}
          </motion.button>
        </div>
        <motion.button
          className="btn btn-ghost btn-block"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => startPractice(tech, 'practice')}
        >
          {lang === 'hi' ? 'अभ्यास शुरू करें' : 'Start practice'}
        </motion.button>
        <motion.button
          className="btn btn-saffron btn-block mt-8"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => startPractice(tech, 'speed')}
          style={{ marginTop: 10 }}
        >
          ⚡ {lang === 'hi' ? 'स्पीड राउंड' : 'Speed round'}
        </motion.button>
      </FadeIn>
    </>
  );
}
