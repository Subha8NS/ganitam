import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { HeaderBar, CorrectCelebration, SparkleBurst } from '../components/ui';
import { checkPracticeAnswer } from '../utils/vedicMath';

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
  const [answerDen, setAnswerDen] = useState('');
  const [hintLevel, setHintLevel] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [yesNo, setYesNo] = useState(null);
  const [sparkle, setSparkle] = useState(false);

  if (!tech || !practiceState) return null;

  const questions = tech.practice;
  const current = questions[practiceState.index];
  const progress = (practiceState.index / questions.length) * 100;
  const isFraction = current.answerType === 'fraction';

  const canCheck = () => {
    if (current.isYesNo) return yesNo !== null;
    if (isFraction) return answer !== '' && answerDen !== '';
    return answer !== '';
  };

  const formatAnswer = () => {
    if (current.isYesNo) {
      return current.a
        ? (lang === 'hi' ? 'हाँ' : 'Yes')
        : (lang === 'hi' ? 'नहीं' : 'No');
    }
    if (isFraction) return `${current.a.n}/${current.a.d}`;
    return current.a;
  };

  const checkAnswer = () => {
    const correct = checkPracticeAnswer(
      current,
      current.isYesNo ? yesNo : answer,
      isFraction ? answerDen : null
    );

    const newState = {
      ...practiceState,
      correct: practiceState.correct + (correct ? 1 : 0),
      hints: practiceState.hints + (hintLevel > 0 ? 1 : 0),
      answers: [...practiceState.answers, { q: current.q, correct, time: Date.now() - practiceState.startTime }],
    };

    if (correct) {
      setFeedback('correct');
      setSparkle(true);
      setTimeout(() => setSparkle(false), 800);
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
        setAnswerDen('');
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
          transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        />
      </div>

      <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 8 }}>
        {practiceState.index + 1} / {questions.length}
      </p>

      <AnimatePresence mode="wait">
        <motion.div
          key={practiceState.index}
          initial={{ opacity: 0, scale: 0.85, rotateX: 15, y: 20 }}
          animate={
            feedback === 'wrong'
              ? { opacity: 1, scale: 1, rotateX: 0, y: 0, x: [0, -8, 8, -6, 6, 0] }
              : { opacity: 1, scale: 1, rotateX: 0, y: 0, x: 0 }
          }
          exit={{ opacity: 0, scale: 0.85, y: -20 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="practice-question glass-3d"
          style={{ position: 'relative' }}
        >
          <SparkleBurst active={sparkle} />
          <motion.div
            className="question-text"
            style={{ fontSize: current.q.length > 18 ? '1.6rem' : undefined }}
            animate={feedback === 'correct' ? { scale: [1, 1.08, 1] } : {}}
            transition={{ duration: 0.4 }}
          >
            {current.q}
          </motion.div>
          {isFraction && (
            <p style={{ marginTop: 8, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              {lang === 'hi' ? 'अंश / हर लिखें' : 'Enter numerator / denominator'}
            </p>
          )}
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

      <CorrectCelebration
        show={feedback === 'correct'}
        message={lang === 'hi' ? 'शाबाश! 🎉' : 'Great job! 🎉'}
      />

      <AnimatePresence>
        {feedback === 'wrong' && (
          <motion.div
            className="feedback-wrong"
            initial={{ scale: 0, x: -10 }}
            animate={{ scale: 1, x: 0 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            💪 {lang === 'hi' ? 'कोशिश जारी रखें!' : 'Keep trying!'}{' '}
            {lang === 'hi' ? 'सही जवाब' : 'Answer'}: {formatAnswer()}
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
      ) : isFraction ? (
        <div className="fraction-input">
          <input
            className="answer-input"
            type="number"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder={lang === 'hi' ? 'अंश' : 'num'}
            disabled={!!feedback}
            autoFocus
          />
          <span className="fraction-slash">/</span>
          <input
            className="answer-input"
            type="number"
            value={answerDen}
            onChange={(e) => setAnswerDen(e.target.value)}
            placeholder={lang === 'hi' ? 'हर' : 'den'}
            disabled={!!feedback}
          />
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
          disabled={!!feedback || !canCheck()}
          whileTap={{ scale: 0.95 }}
        >
          {lang === 'hi' ? 'जाँचें' : 'Check'}
        </motion.button>
      </div>
    </>
  );
}
