import { useApp } from '../context/AppContext';
import { TECHNIQUES } from '../data/techniques';
import { FadeIn } from '../components/ui';

export default function Me() {
  const { progress, lang, setLanguage } = useApp();

  const langOptions = [
    { id: 'en', label: 'English' },
    { id: 'hi', label: 'हिंदी' },
    { id: 'both', label: 'Both / दोनों' },
  ];

  return (
    <>
      <FadeIn>
        <h1 className="page-title" style={{ marginBottom: 20 }}>
          {lang === 'hi' ? 'मैं' : 'Me'}
        </h1>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="glass-3d" style={{ padding: 20, marginBottom: 16, textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: 8 }}>🔥</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--saffron)' }}>
            {progress.streak}
          </div>
          <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            {lang === 'hi' ? 'दिन की स्ट्रीक' : 'day streak'}
          </div>
          <div style={{ marginTop: 12, fontSize: '0.85rem' }}>
            {progress.totalSolved} {lang === 'hi' ? 'सवाल हल किए' : 'problems solved'}
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.15}>
        <div className="section-label">{lang === 'hi' ? 'मास्टर की तकनीकें' : 'Techniques mastered'}</div>
        <div className="mastered-grid" style={{ marginBottom: 20 }}>
          {TECHNIQUES.map((tech) => {
            const done = progress.mastered.includes(tech.id);
            return (
              <div key={tech.id} className={`mastered-item glass ${done ? 'done' : 'locked'}`}>
                <span className="star">{done ? '★' : tech.icon}</span>
                <span>{lang === 'hi' ? tech.hi.split(' ').slice(0, 2).join(' ') : tech.en.split(' ').slice(0, 2).join(' ')}</span>
              </div>
            );
          })}
        </div>
      </FadeIn>

      <FadeIn delay={0.2}>
        <div className="section-label">{lang === 'hi' ? 'भाषा' : 'Language'}</div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          {langOptions.map((opt) => (
            <button
              key={opt.id}
              className={`category-chip ${lang === opt.id ? 'active' : ''}`}
              onClick={() => setLanguage(opt.id)}
              style={{ flex: 1, textAlign: 'center' }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </FadeIn>

      <FadeIn delay={0.25}>
        <div className="glass" style={{ padding: 16, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          <strong style={{ color: 'var(--text)' }}>Ganitam</strong>
          <p style={{ marginTop: 6 }}>
            {lang === 'hi'
              ? 'बच्चों के लिए वैदिक गणित — तेज़ और स्मार्ट तरीके सीखें।'
              : 'Vedic maths for kids — learn faster, smarter techniques.'}
          </p>
        </div>
      </FadeIn>
    </>
  );
}
