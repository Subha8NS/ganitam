import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { TECHNIQUES } from '../data/techniques';
import { FadeIn, FloatingCard } from '../components/ui';

export default function Play() {
  const { startPractice, navigate, lang, progress } = useApp();
  const masteredTechs = TECHNIQUES.filter((t) => progress.mastered.includes(t.id));

  const modes = [
    {
      id: 'speed',
      icon: '⚡',
      en: 'Speed Round',
      hi: 'स्पीड राउंड',
      descEn: '10 questions, beat the clock',
      descHi: '10 सवाल, घड़ी से आगे',
      wide: false,
      action: () => {
        const tech = masteredTechs[0] || TECHNIQUES[0];
        startPractice(tech, 'speed');
      },
    },
    {
      id: 'mixed',
      icon: '🎲',
      en: 'Mixed Bag',
      hi: 'मिश्रित',
      descEn: 'Random mastered techniques',
      descHi: 'यादृच्छिक तकनीकें',
      wide: false,
      action: () => {
        const pool = masteredTechs.length ? masteredTechs : TECHNIQUES.slice(0, 3);
        const tech = pool[Math.floor(Math.random() * pool.length)];
        startPractice(tech, 'practice');
      },
    },
    {
      id: 'daily',
      icon: '🏆',
      en: 'Daily 5',
      hi: 'रोज़ के 5',
      descEn: '5 questions, earn streak',
      descHi: '5 सवाल, स्ट्रीक कमाएँ',
      wide: false,
      action: () => startPractice(TECHNIQUES[0], 'daily'),
    },
    {
      id: 'best',
      icon: '🎯',
      en: 'Beat Your Best',
      hi: 'अपना रिकॉर्ड तोड़ें',
      descEn: 'Personal record challenge',
      descHi: 'व्यक्तिगत रिकॉर्ड चुनौती',
      wide: true,
      action: () => {
        const tech = TECHNIQUES.find((t) => progress.personalBests[t.id]) || TECHNIQUES[0];
        startPractice(tech, 'speed');
      },
    },
  ];

  return (
    <>
      <FadeIn>
        <h1 className="page-title" style={{ marginBottom: 8 }}>
          {lang === 'hi' ? 'खेलें' : 'Play'}
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: 20 }}>
          {lang === 'hi' ? 'वैदिक तेज़ी की चुनौती लें!' : 'Challenge your Vedic speed!'}
        </p>
      </FadeIn>

      <div className="play-modes">
        {modes.map((m, i) => (
          <FloatingCard key={m.id} delay={i * 0.08} className={m.wide ? 'wide' : ''}>
            <motion.div
              className={`play-mode-card glass-3d pressable ${m.wide ? 'wide' : ''}`}
              onClick={m.action}
              style={m.wide ? { gridColumn: '1 / -1' } : {}}
            >
              <motion.span
                className="mode-icon"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
              >
                {m.icon}
              </motion.span>
              <h4>{lang === 'hi' ? m.hi : m.en}</h4>
              <p>{lang === 'hi' ? m.descHi : m.descEn}</p>
            </motion.div>
          </FloatingCard>
        ))}
      </div>

      <FadeIn delay={0.3}>
        <div className="glass" style={{ padding: 18, marginTop: 20 }}>
          <div className="section-label">{lang === 'hi' ? 'आपके रिकॉर्ड' : 'Your records'}</div>
          {Object.entries(progress.personalBests).length === 0 ? (
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              {lang === 'hi' ? 'अभ्यास करें और रिकॉर्ड बनाएँ!' : 'Practice to set records!'}
            </p>
          ) : (
            Object.entries(progress.personalBests).map(([id, time]) => {
              const tech = TECHNIQUES.find((t) => t.id === id);
              return (
                <div key={id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', fontSize: '0.85rem' }}>
                  <span>{lang === 'hi' ? tech?.hi : tech?.en}</span>
                  <strong style={{ color: 'var(--primary)' }}>{time}s ⚡</strong>
                </div>
              );
            })
          )}
        </div>
      </FadeIn>
    </>
  );
}
