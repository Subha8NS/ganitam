import { PRO_TYPES } from '../data/techniques';
import { useApp } from '../context/AppContext';

export function ProChip({ type, small }) {
  const { lang } = useApp();
  const pro = PRO_TYPES[type];
  if (!pro) return null;
  const label = lang === 'hi' ? pro.hi : pro.en;
  return (
    <span className={`pro-chip ${type}`}>
      {pro.icon} {label}
    </span>
  );
}

export function ProChips({ types }) {
  return (
    <div className="pro-chips">
      {types.map((t) => (
        <ProChip key={t} type={t} />
      ))}
    </div>
  );
}

export function BenefitChip({ en, hi }) {
  const { lang } = useApp();
  const text = lang === 'hi' ? hi : en;
  return <span className="benefit-chip">⚡ {text}</span>;
}

export function WhyVedicPanel({ pros }) {
  const { lang, tInline } = useApp();
  return (
    <div className="why-vedic glass-3d">
      <div className="why-vedic-title">
        ✦ {lang === 'hi' ? 'क्यों सीखें?' : 'Why learn this?'}
        {lang === 'both' && <span className="hi-line">क्यों सीखें?</span>}
      </div>
      <ul className="pro-list">
        {pros.map((pro, i) => (
          <li key={i} className="pro-item">
            <span className="check">✓</span>
            <div>
              {tInline(pro.en, pro.hi)}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function WhenToUseStrip({ whenToUse, whenNotToUse }) {
  const { tInline, lang } = useApp();
  return (
    <>
      <div className="when-strip glass">
        <strong>{lang === 'hi' ? 'कब उपयोग करें: ' : 'When to use: '}</strong>
        {tInline(whenToUse.en, whenToUse.hi)}
      </div>
      {whenNotToUse && (
        <div className="when-strip" style={{ opacity: 0.85, fontSize: '0.75rem' }}>
          {tInline(whenNotToUse.en, whenNotToUse.hi)}
        </div>
      )}
    </>
  );
}

export function CompareGrid({ regular, vedic }) {
  const { lang, tInline } = useApp();
  const vedicPros = vedic.pros || [];

  return (
    <div className="compare-grid">
      <div className="compare-col regular">
        <div className="compare-label">
          {lang === 'hi' ? 'सामान्य तरीका' : 'Regular way'}
        </div>
        <ol className="compare-steps">
          {regular.steps.map((s, i) => (
            <li key={i}>{tInline(s.en, s.hi)}</li>
          ))}
        </ol>
        <div className="compare-time">
          ~{regular.timeEstimate}s
        </div>
      </div>
      <div className="compare-col vedic">
        <div className="compare-label">
          {lang === 'hi' ? 'वैदिक तरीका' : 'Vedic way'} ⭐
        </div>
        <ol className="compare-steps">
          {vedic.steps.map((s, i) => (
            <li key={i}>
              {tInline(s.en, s.hi)}
              {i === vedic.steps.length - 1 && vedicPros.includes('steps') && (
                <div className="vedic-pro-tag">✓ {lang === 'hi' ? 'कम कदम' : 'Fewer steps'}</div>
              )}
            </li>
          ))}
        </ol>
        <div className="compare-time">
          ~{vedic.timeEstimate}s ⚡
        </div>
        <div className="pro-chips" style={{ marginTop: 10 }}>
          {vedicPros.map((p) => (
            <ProChip key={p} type={p} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function GainedPanel({ results, technique }) {
  const { lang } = useApp();
  const saved = technique.regular.timeEstimate - results.avgTime;

  return (
    <div className="gained-panel glass-3d">
      <div className="section-label">
        {lang === 'hi' ? 'आज आपने क्या पाया' : 'What you gained today'}
      </div>
      <div className="gained-stat">
        <div className="icon speed">⚡</div>
        <div>
          <strong>{lang === 'hi' ? 'औसत समय' : 'Avg time'}: {results.avgTime}s</strong>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            {lang === 'hi'
              ? `(सामान्य तरीके में ~${technique.regular.timeEstimate}s)`
              : `(regular way ~${technique.regular.timeEstimate}s)`}
            {saved > 0 && ` — ${lang === 'hi' ? 'बचाया' : 'saved'} ~${saved}s!`}
          </div>
        </div>
      </div>
      <div className="gained-stat">
        <div className="icon steps">📉</div>
        <div>
          <strong>
            {lang === 'hi'
              ? `${results.correct}/${results.total} सही — कम कदम`
              : `${results.correct}/${results.total} correct — fewer steps`}
          </strong>
        </div>
      </div>
      <div className="gained-stat">
        <div className="icon mental">🧠</div>
        <div>
          <strong>
            {lang === 'hi' ? 'दिमागी गणित का अभ्यास' : 'Mental maths practice'}
          </strong>
        </div>
      </div>
    </div>
  );
}
