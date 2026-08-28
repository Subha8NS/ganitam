import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { HeaderBar } from '../components/ui';

export default function Practice() {
  const {
    selectedTechnique: tech,
    practiceState,
    setPracticeState,
    finishSession,
    navigate,
    mode,
    lang,
    tInline,
  } = useApp();

  const [answer, setAnswer] = useState('');
  const [hintLevel, setHintLevel] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [yesNo, setYesNo] = useState(null);

  if (!tech || !practiceState) return null;

  const questions = tech.practice;
  const current = questions[practiceState.index];
  const progress = ((practiceState.index) / questions.length) * 100;

  const checkAnswer = () => {
    let correct = false;
    if (current.isYesNo) {
      correct = yesNo === current.a;
    } else {
      correct = parseInt(answer, 10) === current.a;
    }

    const newState = {
      ...practiceState,
      correct: practiceState.correct + (correct ? 1 : 0),
      hints: practiceState.hints + (hintLevel > 0 ? 1 : 0),
      answers: [...practiceState.answers, { q: current.q, correct, time: Date.now() - practiceState.startTime }],
    };

    if (correct) {
      setFeedback('correct');
    } else {
      setFeedback('wrong');
    }

    setTimeout(() => {
      if (practiceState.index + 1 >= questions.length) {
        const elapsed = (Date.now() - practiceState.startTime) / 1000;
        finishSession({
          techniqueId: tech.id,
          total: questions.length,
          correct: newState.correct,
          hints: newState.hints,
          avgTime: Math.round(elapsed / questions.length),
          mode,
          accuracy: Math.round((newState.correct / questions.length) * 100),
        });
      } else {
        setPracticeState({ ...newState, index: practiceState.index + 1, startTime: Date.now() });
        setAnswer('');
        setYesNo(null);
        setHintLevel(0);
        setFeedback(null);
      }
    }, correct ? 800 : 1200);
  };

  const showHint = () => {
    if (hintLevel < 1) setHintLevel(1);
  };

  return (
    <>
      <HeaderBar
        title={mode === 'speed' ? (lang === 'hi' ? '⚡ स्पीड' : '⚡ Speed') : mode === 'daily' ? (lang === 'hi' ? 'चुनौती' : 'Challenge') : (lang === 'hi' ? 'अभ्यास' : 'Practice')}
        onBack={() => navigate('technique')}
      />

      <div className="when-strip glass" style={{ marginBottom: 12 }}>
        {tInline(tech.whenToUse.en, tech.whenToUse.hi)}
      </div>

      <div className="progress-bar-wrap">
        <motion.div
          className="progress-bar-fill"
          animate={{ width: `${progress}%` }}
        />
      </div>

      <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 8 }}>
        {practiceState.index + 1} / {questions.length}
      </p>

      <AnimatePresence mode="wait">
        <motion.div
          key={practiceState.index}
          initial={{ opacity: 0, scale: 0.9, rotateX: 10 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="practice-question glass-3d"
        >
          <div className="question-text">{current.q}</div>
        </motion.div>
      </AnimatePresence>

      {hintLevel > 0 && (
        <motion.div
          className="hint-card"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          💡 {tInline(current.hint.en, current.hint.hi)}
        </motion.div>
      )}

      <AnimatePresence>
        {feedback === 'correct' && (
          <motion.div className="feedback-correct" initial={{ scale: 0 }} animate={{ scale: 1 }}>
            ✓ {lang === 'hi' ? 'शाबाश!' : 'Great job!'}
          </motion.div>
        )}
        {feedback === 'wrong' && (
          <motion.div className="feedback-wrong" initial={{ scale: 0 }} animate={{ scale: 1 }}>
            {lang === 'hi' ? 'कोशिश जारी रखें!' : 'Keep trying!'} {lang === 'hi' ? 'सही जवाब' : 'Answer'}: {current.isYesNo ? (current.a ? (lang === 'hi' ? 'हाँ' : 'Yes') : (lang === 'hi' ? 'नहीं' : 'No')) : current.a}
          </motion.div>
        )}
      </AnimatePresence>

      {current.isYesNo ? (
        <div className="yesno-btns">
          <button
            className={`yesno-btn ${yesNo === 1 ? 'selected-yes' : ''}`}
            onClick={() => setYesNo(1)}
            disabled={!!feedback}
          >
            {lang === 'hi' ? 'हाँ' : 'Yes'}
          </button>
          <button
            className={`yesno-btn ${yesNo === 0 ? 'selected-no' : ''}`}
            onClick={() => setYesNo(0)}
            disabled={!!feedback}
          >
            {lang === 'hi' ? 'नहीं' : 'No'}
          </button>
        </div>
      ) : (
        <input
          className="answer-input"
          type="number"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="?"
          disabled={!!feedback}
          autoFocus
        />
      )}

      <div className="gap-row">
        <motion.button
          className="btn btn-ghost"
          onClick={showHint}
          disabled={hintLevel > 0 || !!feedback}
          whileTap={{ scale: 0.95 }}
        >
          💡 {lang === 'hi' ? 'संकेत' : 'Hint'}
        </motion.button>
        <motion.button
          className="btn btn-primary"
          onClick={checkAnswer}
          disabled={!!feedback || (current.isYesNo ? yesNo === null : !answer)}
          whileTap={{ scale: 0.95 }}
        >
          {lang === 'hi' ? 'जाँचें' : 'Check'}
        </motion.button>
      </div>
    </>
  );
}
