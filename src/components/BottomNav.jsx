import { useApp } from '../context/AppContext';

const TABS = [
  { id: 'home', icon: '🏠', en: 'Home', hi: 'होम' },
  { id: 'learn', icon: '📚', en: 'Learn', hi: 'सीखें' },
  { id: 'play', icon: '🎮', en: 'Play', hi: 'खेलें' },
  { id: 'me', icon: '⭐', en: 'Me', hi: 'मैं' },
];

export default function BottomNav() {
  const { tab, setTab, navigate, lang } = useApp();

  const handleTab = (id) => {
    setTab(id);
    navigate('main', { tab: id });
  };

  return (
    <nav className="bottom-nav">
      <div className="nav-glass">
        {TABS.map((t) => (
          <button
            key={t.id}
            className={`nav-item ${tab === t.id ? 'active' : ''}`}
            onClick={() => handleTab(t.id)}
          >
            <span className="nav-icon">{t.icon}</span>
            <span className="nav-label">{lang === 'hi' ? t.hi : t.en}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
