import { useApp } from './context/AppContext';
import LanguagePick from './screens/LanguagePick';
import Home from './screens/Home';
import Learn from './screens/Learn';
import Play from './screens/Play';
import Me from './screens/Me';
import TechniqueDetail from './screens/TechniqueDetail';
import GuidedPractice from './screens/GuidedPractice';
import Practice from './screens/Practice';
import Results from './screens/Results';
import BottomNav from './components/BottomNav';
import { AppBackground } from './components/ui';

function MainTabs() {
  const { tab } = useApp();
  switch (tab) {
    case 'learn': return <Learn />;
    case 'play': return <Play />;
    case 'me': return <Me />;
    default: return <Home />;
  }
}

export default function App() {
  const { screen } = useApp();

  const isFlowScreen = ['technique', 'guided', 'practice', 'results'].includes(screen);
  const showNav = screen === 'main';

  return (
    <>
      <AppBackground />
      <div className="app-shell">
        <div className={`screen-container ${isFlowScreen || screen === 'language' ? 'no-nav' : ''}`}>
          {screen === 'language' && <LanguagePick />}
          {(screen === 'main' || screen === 'home') && <MainTabs />}
          {screen === 'technique' && <TechniqueDetail />}
          {screen === 'guided' && <GuidedPractice />}
          {screen === 'practice' && <Practice />}
          {screen === 'results' && <Results />}
        </div>
        {!isFlowScreen && screen !== 'language' && showNav && <BottomNav />}
      </div>
    </>
  );
}
