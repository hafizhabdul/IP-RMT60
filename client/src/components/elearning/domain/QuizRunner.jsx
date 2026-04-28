import { useState } from 'react';
import { Check, X, RotateCcw, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

const SAMPLE_QUESTIONS = [
  {
    id: 'sample-1',
    question: 'Which property of a couplant is most directly responsible for efficient ultrasonic energy transfer into the test piece?',
    options: ['Color', 'Acoustic impedance close to the specimen', 'Smell', 'Density alone'],
    correctAnswer: 1,
    explanation: 'Couplant must have acoustic impedance roughly halfway between the probe and specimen to minimize reflection at the interface.'
  },
  {
    id: 'sample-2',
    question: 'In a DAC curve construction, you typically use reflectors at multiple known depths. Why?',
    options: ['To make the test piece heavier', 'To create reference amplitudes that compensate for attenuation with depth', 'To disable the gate', 'For decoration'],
    correctAnswer: 1,
    explanation: 'DAC compensates the operator for the natural amplitude drop with increasing distance.'
  }
];

export default function QuizRunner({ questions, onComplete, className }) {
  const list = questions && questions.length > 0 ? questions : SAMPLE_QUESTIONS;
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);

  const current = list[idx];
  const userAnswer = answers[current.id];
  const isLast = idx === list.length - 1;

  function selectOption(optIndex) {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [current.id]: optIndex }));
  }

  function next() {
    if (!isLast) {
      setIdx(idx + 1);
    } else {
      setSubmitted(true);
      const correctCount = list.filter((q) => answers[q.id] === q.correctAnswer).length;
      const score = Math.round((correctCount / list.length) * 100);
      onComplete?.({ score, answers });
    }
  }

  function retry() {
    setIdx(0);
    setAnswers({});
    setSubmitted(false);
    setReviewMode(false);
  }

  // —— Submitted state: result + review toggle ——
  if (submitted) {
    const correctCount = list.filter((q) => answers[q.id] === q.correctAnswer).length;
    const score = Math.round((correctCount / list.length) * 100);
    const passed = score >= 75;

    return (
      <div className={cn('space-y-5', className)}>
        {/* Result card */}
        <div
          className={cn(
            'rounded-xl border-2 p-6 sm:p-8 text-center',
            passed ? 'border-emerald-500 bg-emerald-50' : 'border-rose-500 bg-rose-50'
          )}
        >
          <div
            className={cn(
              'font-plexMono text-[11px] uppercase tracking-[0.14em] mb-2 font-bold',
              passed ? 'text-emerald-700' : 'text-rose-700'
            )}
          >
            {passed ? '✓ Passed' : '✕ Try again'}
          </div>
          <div className="text-[48px] sm:text-[56px] font-bold tabular-nums tracking-tight leading-none">
            {score}
            <span className="text-2xl text-slate-500">%</span>
          </div>
          <div className="mt-2 text-[14px] text-slate-700">
            <b className="text-slate-900">{correctCount}</b> dari <b className="text-slate-900">{list.length}</b> jawaban benar
            {!passed && <> · butuh ≥75% untuk lulus</>}
          </div>

          <div className="mt-5 flex flex-wrap justify-center gap-2">
            <button
              type="button"
              onClick={() => setReviewMode((r) => !r)}
              className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-4 py-2.5 text-[13px] font-semibold text-slate-700 hover:bg-slate-50"
            >
              {reviewMode ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              {reviewMode ? 'Sembunyikan review' : 'Lihat review jawaban'}
            </button>
            {!passed && (
              <button
                type="button"
                onClick={retry}
                className="inline-flex items-center gap-2 rounded-md bg-slate-900 px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-orange-600"
              >
                <RotateCcw className="h-4 w-4" />
                Coba ulang
              </button>
            )}
          </div>
        </div>

        {/* Review per-question */}
        {reviewMode && (
          <div className="space-y-3">
            <div className="font-plexMono text-[11px] uppercase tracking-[0.12em] text-slate-500 px-1">
              Review · {list.length} questions
            </div>
            {list.map((q, qi) => {
              const userIdx = answers[q.id];
              const correctIdx = q.correctAnswer;
              const isCorrect = userIdx === correctIdx;
              return (
                <div
                  key={q.id}
                  className={cn(
                    'rounded-lg border-l-4 bg-white p-5',
                    isCorrect ? 'border-emerald-500' : 'border-rose-500'
                  )}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <span
                      className={cn(
                        'inline-grid h-6 w-6 place-items-center rounded-full font-plexMono text-[11px] font-bold tabular-nums shrink-0',
                        isCorrect ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
                      )}
                    >
                      {isCorrect ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : <X className="h-3.5 w-3.5" strokeWidth={3} />}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="font-plexMono text-[10.5px] uppercase tracking-[0.1em] text-slate-500 mb-0.5">
                        Question {qi + 1} {q.difficulty && `· ${q.difficulty}`}
                      </div>
                      <div className="text-[15px] font-semibold leading-snug text-slate-900">{q.question}</div>
                    </div>
                  </div>

                  <div className="space-y-1.5 ml-9">
                    {q.options.map((opt, oi) => {
                      const isUserPick = oi === userIdx;
                      const isCorrectPick = oi === correctIdx;
                      return (
                        <div
                          key={oi}
                          className={cn(
                            'flex items-center gap-2.5 rounded-md px-3 py-2 text-[13.5px]',
                            isCorrectPick && 'bg-emerald-50 text-emerald-900 ring-1 ring-emerald-200',
                            isUserPick && !isCorrectPick && 'bg-rose-50 text-rose-900 ring-1 ring-rose-200',
                            !isUserPick && !isCorrectPick && 'text-slate-600'
                          )}
                        >
                          {isCorrectPick && <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0" strokeWidth={3} />}
                          {isUserPick && !isCorrectPick && <X className="h-3.5 w-3.5 text-rose-600 shrink-0" strokeWidth={3} />}
                          {!isUserPick && !isCorrectPick && (
                            <span className="inline-block h-3.5 w-3.5 rounded-full border border-slate-300 shrink-0" />
                          )}
                          <span className={cn(isCorrectPick && 'font-semibold')}>{opt}</span>
                          {isUserPick && (
                            <span className="ml-auto font-plexMono text-[10px] uppercase tracking-[0.08em] opacity-70">
                              Your pick
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {q.explanation && (
                    <div className="ml-9 mt-3 rounded-md bg-slate-50 border-l-4 border-orange-amber p-3 text-[13px] text-slate-700">
                      <div className="font-plexMono text-[10.5px] uppercase tracking-[0.12em] text-orange-700 font-bold mb-1">
                        ◉ Explanation
                      </div>
                      <p className="leading-relaxed">{q.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  // —— Active question ——
  return (
    <div className={cn('rounded border border-slate-200 bg-white p-6 sm:p-8', className)}>
      <div className="font-plexMono text-[11px] uppercase tracking-[0.14em] text-slate-500 mb-3">
        Question {idx + 1} / {list.length}
        {current.difficulty && <span className="ml-2 text-orange-600">· {current.difficulty}</span>}
      </div>
      <div className="text-[18px] sm:text-[20px] font-semibold leading-tight text-slate-900 mb-5">
        {current.question}
      </div>

      <div className="space-y-2.5">
        {current.options.map((opt, i) => {
          const selected = userAnswer === i;
          return (
            <button
              key={i}
              type="button"
              onClick={() => selectOption(i)}
              className={cn(
                'w-full grid grid-cols-[20px_1fr] items-center gap-3 rounded-md border-2 px-4 py-3 text-left text-[14.5px] transition-all',
                selected ? 'border-orange-500 bg-orange-50' : 'border-slate-200 hover:border-slate-400'
              )}
            >
              <span
                className={cn(
                  'inline-grid h-4 w-4 place-items-center rounded-full border-2',
                  selected ? 'border-orange-600 bg-orange-600' : 'border-slate-300'
                )}
              >
                {selected && <span className="block h-2 w-2 rounded-full bg-white" />}
              </span>
              <span className={cn(selected && 'font-semibold')}>{opt}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
        <div className="font-plexMono text-[11px] uppercase tracking-[0.1em] text-slate-500">
          {Object.keys(answers).length} dari {list.length} terjawab
        </div>
        <button
          type="button"
          onClick={next}
          disabled={userAnswer === undefined}
          className="inline-flex items-center gap-2 rounded-md bg-orange-amber px-5 py-2.5 text-[13px] font-semibold text-white shadow-el-orange transition-opacity disabled:opacity-40 hover:opacity-90"
        >
          {isLast ? 'Selesai' : 'Soal berikutnya →'}
        </button>
      </div>
    </div>
  );
}
