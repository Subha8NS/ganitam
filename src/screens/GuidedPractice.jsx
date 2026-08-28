import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { HeaderBar, FadeIn, SparkleBurst, CorrectCelebration, PulseButton } from '../components/ui';

export default function GuidedPractice() {
  const { selectedTechnique: tech, navigate, startPractice, lang, tInline } = useApp();
  const [stepIndex, setStepIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);

  if (!tech) return null;

  const steps = tech.vedic.steps;
  const current = steps[stepIndex];
  const isLast = stepIndex === steps.length - 1;
  const savedSteps = tech.regular.steps.length - steps.length;

  const [sparkle, setSparkle] = useState(false);

  const revealStep = () => {
    setRevealed(true);
    setSparkle(true);
    setTimeout(() => setSparkle(false), 800);
  };

  const nextStep = () => {
    if (isLast) {
      startPractice(tech, 'practice');
      return;
    }
    setStepIndex((i) => i + 1);
    setRevealed(false);
  };

  return (
    <>
      <HeaderBar
        title={lang === 'hi' ? 'मेरे साथ आज़माएँ' : 'Try with me'}
        onBack={() => navigate('technique')}
      />

      <div className="progress-bar-wrap">
        <motion.div
          className="progress-bar-fill"
          animate={{ width: `${((stepIndex + 1) / steps.length) * 100}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      <p style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 16 }}>
        {lang === 'hi' ? `चरण ${stepIndex + 1} / ${steps.length}` : `Step ${stepIndex + 1} of ${steps.length}`}
      </p>

      <AnimatePresence mode="wait">
        <motion.div
          key={stepIndex}
          initial={{ opacity: 0, x: 40, rotateY: -10 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.4, type: 'spring', stiffness: 200 }}
          className="guided-step glass-3d"
          style={{ marginTop: 12, paddingTop: 24, position: 'relative' }}
        >
          <SparkleBurst active={sparkle} />
          <motion.div
            className="step-number"
            animate={revealed ? { scale: [1, 1.3, 1], rotate: [0, 360] } : {}}
            transition={{ duration: 0.6 }}
          >
            {stepIndex + 1}
          </motion.div>

          {!revealed ? (
            <motion.div
              style={{ textAlign: 'center', padding: '20px 0' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p style={{ fontSize: '1rem', color: 'var(--text-muted)', marginBottom: 16 }}>
                {lang === 'hi' ? 'अगला कदम देखने के लिए टैप करें' : 'Tap to reveal the next step'}
              </p>
              <PulseButton className="btn btn-primary" onClick={revealStep}>
                {lang === 'hi' ? 'कदम दिखाएँ' : 'Show step'} ✨
              </PulseButton>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 18 }}
            >
              <p style={{ fontSize: '1.1rem', fontWeight: 600, lineHeight: 1.5, marginBottom: 8 }}>
                {tInline(current.en, current.hi)}
              </p>
              {current.proTip && (
                <motion.div
                  className="pro-tip-bubble"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                >
                  <strong>{lang === 'hi' ? 'फायदा: ' : 'Pro tip: '}</strong>
                  {tInline(current.proTip.en, current.proTip.hi)}
                </motion.div>
              )}
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {revealed && (
        <FadeIn>
          <motion.button
            className="btn btn-teal btn-block"
            style={{ marginTop: 16 }}
            onClick={nextStep}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            {isLast
              ? (lang === 'hi' ? 'अभ्यास शुरू करें →' : 'Start practice →')
              : (lang === 'hi' ? 'अगला कदम →' : 'Next step →')}
          </motion.button>
        </FadeIn>
      )}

      {isLast && revealed && savedSteps > 0 && (
        <FadeIn delay={0.2}>
          <div className="glass" style={{ padding: 16, marginTop: 16, textAlign: 'center' }}>
            <motion.span
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{ fontSize: '1.5rem' }}
            >
              🎉
            </motion.span>
            <p style={{ fontWeight: 700, color: 'var(--success)', marginTop: 8 }}>
              {lang === 'hi'
                ? `आपने ~${savedSteps} कदम बचाए!`
                : `You saved ~${savedSteps} steps!`}
            </p>
          </div>
        </FadeIn>
      )}
    </>
  );
}
