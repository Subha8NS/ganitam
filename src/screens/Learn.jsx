import { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { TECHNIQUES, CATEGORIES } from '../data/techniques';
import { FadeIn, FloatingCard } from '../components/ui';
import { BenefitChip } from '../components/ProDisplay';

export default function Learn() {
  const { openTechnique, lang, tInline, progress } = useApp();
  const [activeCat, setActiveCat] = useState('all');

  const filtered =
    activeCat === 'all' ? TECHNIQUES : TECHNIQUES.filter((t) => t.category === activeCat);

  return (
    <>
      <FadeIn>
        <h1 className="page-title" style={{ marginBottom: 16 }}>
          {lang === 'hi' ? 'सीखें' : 'Learn'}
        </h1>
      </FadeIn>

      <div className="category-scroll">
        <button
          className={`category-chip ${activeCat === 'all' ? 'active' : ''}`}
          onClick={() => setActiveCat('all')}
        >
          {lang === 'hi' ? 'सभी' : 'All'}
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            className={`category-chip ${activeCat === cat.id ? 'active' : ''}`}
            onClick={() => setActiveCat(cat.id)}
          >
            {cat.icon} {lang === 'hi' ? cat.hi : cat.en}
          </button>
        ))}
      </div>

      {filtered.map((tech, i) => {
        const mastered = progress.mastered.includes(tech.id);
        const locked = false;

        return (
          <FloatingCard key={tech.id} delay={i * 0.06}>
            <motion.div
              className={`tech-card glass-3d pressable ${locked ? 'locked' : ''}`}
              onClick={() => !locked && openTechnique(tech)}
              style={{ opacity: locked ? 0.5 : 1, cursor: locked ? 'not-allowed' : 'pointer' }}
            >
              <div className="tech-card-header">
                <motion.div
                  className="tech-icon-3d"
                  whileHover={{ rotateY: 15, scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {locked ? '🔒' : tech.icon}
                </motion.div>
                <div className="tech-card-body">
                  <div className="tech-card-title">{tInline(tech.en, tech.hi)}</div>
                  <BenefitChip en={tech.benefitChip.en} hi={tech.benefitChip.hi} />
                  <div className="tech-card-meta">
                    <div className="difficulty-dots">
                      {[1, 2, 3].map((d) => (
                        <span key={d} className={d <= tech.difficulty ? 'filled' : ''} />
                      ))}
                    </div>
                    <span className="duration-tag">~{tech.duration}</span>
                    {mastered && <span style={{ color: 'var(--success)', fontWeight: 700, fontSize: '0.75rem' }}>★ {lang === 'hi' ? 'मास्टर' : 'Mastered'}</span>}
                  </div>
                </div>
              </div>
            </motion.div>
          </FloatingCard>
        );
      })}
    </>
  );
}
