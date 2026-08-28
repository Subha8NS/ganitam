import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { TECHNIQUES, DAILY_CHALLENGE, getTechnique } from '../data/techniques';
import { FadeIn, FloatingCard, PulseGlow } from '../components/ui';
import { BenefitChip } from '../components/ProDisplay';

export default function Home() {
  const { progress, openTechnique, startPractice, navigate, lang, tInline } = useApp();
  const continueTech = getTechnique(progress.continueId);
  const newTechs = TECHNIQUES.filter((t) => !progress.mastered.includes(t.id)).slice(0, 3);

  return (
    <>
      <FadeIn>
        <div className="header-bar" style={{ marginBottom: 12 }}>
          <div>
            <h1 className="page-title" style={{ fontSize: '1.5rem' }}>Ganitam</h1>
          </div>
          <motion.div
            className="streak-badge"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="fire">🔥</span>
            {progress.streak} {lang === 'hi' ? 'दिन' : 'day streak'}
          </motion.div>
        </div>
      </FadeIn>

      {continueTech && (
        <FloatingCard delay={0.1}>
          <PulseGlow>
            <div
              className="glass-3d pressable"
              style={{ padding: 20, marginBottom: 16, cursor: 'pointer' }}
              onClick={() => openTechnique(continueTech, 'learn')}
            >
              <div className="section-label">{lang === 'hi' ? 'जारी रखें' : 'Continue'}</div>
              <h3 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: 4 }}>
                {tInline(continueTech.en, continueTech.hi)}
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                {lang === 'hi' ? 'चरण 2 में — वैदिक तरीका सीखें' : 'Step 2 — learn the Vedic way'}
              </p>
              <motion.div
                style={{ marginTop: 12 }}
                whileHover={{ x: 4 }}
              >
                <span style={{ color: 'var(--primary)', fontWeight: 700 }}>
                  {lang === 'hi' ? 'जारी रखें →' : 'Resume →'}
                </span>
              </motion.div>
            </div>
          </PulseGlow>
        </FloatingCard>
      )}

      <FloatingCard delay={0.2}>
        <div
          className="daily-banner glass-3d pressable"
          onClick={() => {
            const tech = getTechnique(DAILY_CHALLENGE.techniques[0]);
            startPractice(tech, 'daily');
          }}
        >
          <div className="daily-timer">⏱ 3 min</div>
          <h3>{lang === 'hi' ? 'आज की चुनौती' : "Today's Challenge"}</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 8 }}>
            {tInline(DAILY_CHALLENGE.pro.en, DAILY_CHALLENGE.pro.hi)}
          </p>
          {!progress.dailyDone ? (
            <motion.span
              className="btn btn-saffron btn-sm"
              whileHover={{ scale: 1.05 }}
              style={{ display: 'inline-flex' }}
            >
              {lang === 'hi' ? 'शुरू करें →' : 'Start →'}
            </motion.span>
          ) : (
            <span style={{ color: 'var(--success)', fontWeight: 700 }}>✓ {lang === 'hi' ? 'पूरा!' : 'Done!'}</span>
          )}
        </div>
      </FloatingCard>

      <FadeIn delay={0.3}>
        <div className="section-label">{lang === 'hi' ? 'नया आज़माएँ' : 'New to try'}</div>
        <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 8 }}>
          {newTechs.map((tech, i) => (
            <motion.div
              key={tech.id}
              className="glass-3d pressable"
              style={{
                minWidth: 140,
                padding: 16,
                cursor: 'pointer',
                textAlign: 'center',
              }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.08 }}
              onClick={() => openTechnique(tech)}
              whileHover={{ y: -4, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <div className="tech-icon-3d" style={{ margin: '0 auto 10px', width: 44, height: 44, fontSize: '0.85rem' }}>
                {tech.icon}
              </div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700 }}>
                {lang === 'hi' ? tech.hi : tech.en}
              </div>
              <div style={{ marginTop: 6 }}>
                <BenefitChip en={tech.benefitChip.en} hi={tech.benefitChip.hi} />
              </div>
            </motion.div>
          ))}
        </div>
      </FadeIn>

      <FadeIn delay={0.4}>
        <div
          className="glass pressable"
          style={{ padding: 16, marginTop: 16, cursor: 'pointer', textAlign: 'center' }}
          onClick={() => navigate('learn', { tab: 'learn' })}
        >
          <span style={{ fontWeight: 600, color: 'var(--primary)' }}>
            {lang === 'hi' ? 'सभी तकनीकें देखें →' : 'Browse all techniques →'}
          </span>
        </div>
      </FadeIn>
    </>
  );
}
