import { useState } from 'react';
import { Check, X } from 'lucide-react';
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

  if (submitted) {
    const correctCount = list.filter((q) => answers[q.id] === q.correctAnswer).length;
    const score = Math.round((correctCount / list.length) * 100);
    const passed = score >= 75;
    return (
      <div className={cn('rounded border-2 p-6 sm:p-8 text-center', passed ? 'border-emerald-500 bg-emerald-50' : 'border-rose-500 bg-rose-50', className)}>
        <div className={cn('font-plexMono text-[11px] uppercase tracking-[0.14em] mb-2', passed ? 'text-emerald-700' : 'text-rose-700')}>
          {passed ? '✓ Passed' : '✕ Try again'}
        </div>
        <div className="text-[48px] font-bold tabular-nums tracking-tight">{score}<span className="text-2xl text-slate-500">%</span></div>
        <div className="mt-1 text-[14px] text-slate-600">
          {correctCount} dari {list.length} jawaban benar
        </div>
        {!passed && (
          <button
            type="button"
            onClick={() => { setIdx(0); setAnswers({}); setSubmitted(false); }}
            className="mt-5 inline-flex items-center gap-2 rounded-md bg-slate-900 px-4 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-orange-600"
          >
            Coba ulang
          </button>
        )}
      </div>
    );
  }

  return (
    <div className={cn('rounded border border-slate-200 bg-white p-6 sm:p-8', className)}>
      <div className="font-plexMono text-[11px] uppercase tracking-[0.14em] text-slate-500 mb-3">
        Question {idx + 1} / {list.length}
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
              <span className={cn(
                'inline-grid h-4 w-4 place-items-center rounded-full border-2',
                selected ? 'border-orange-600 bg-orange-600' : 'border-slate-300'
              )}>
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
