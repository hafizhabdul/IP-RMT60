import { useState, useRef } from 'react';
import { Check, X, RotateCcw, ChevronDown, ChevronUp, AlertTriangle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PASSING_SCORE } from '@/config/elearning';

// QuizRunner is PRESENTATIONAL ONLY. It never scores locally and never sees the
// answer key until the server returns it inside `review` after submission.
//   props.questions : [{ id, question, options, difficulty }]  (no correctAnswer)
//   props.onSubmit  : (answers) => Promise<{ score, passed, passingScore, review, certificate? }>
//                       review: [{ id, correctAnswer, explanation, yourAnswer, isCorrect }]
//   props.onComplete: ({ score, passed, certificate }) => void  (called after result shown)
export default function QuizRunner({
  questions,
  onSubmit,
  onComplete,
  passingScore = PASSING_SCORE,
  className,
}) {
  const list = Array.isArray(questions) ? questions : [];

  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [reviewMode, setReviewMode] = useState(false);
  const [status, setStatus] = useState('idle'); // idle | submitting | done | error
  const [result, setResult] = useState(null); // server result
  const [errorMsg, setErrorMsg] = useState('');

  // Refs to the radio option buttons for roving-tabindex keyboard navigation.
  const optionRefs = useRef([]);

  // —— Fail-closed: no questions => never grade, never issue a certificate ——
  if (list.length === 0) {
    return (
      <div className={cn('rounded-xl border-2 border-amber-300 bg-amber-50 p-6 sm:p-8', className)}>
        <div className="flex items-start gap-3">
          <span className="inline-grid h-9 w-9 place-items-center rounded-full bg-amber-100 text-amber-700 shrink-0">
            <AlertTriangle className="h-5 w-5" />
          </span>
          <div>
            <h3 className="text-[18px] font-bold leading-snug text-slate-900">Asesmen belum tersedia</h3>
            <p className="mt-1.5 text-[14px] leading-relaxed text-slate-700">
              Bank soal untuk asesmen ini sedang disiapkan. Tidak ada penilaian atau
              sertifikat yang diterbitkan dari halaman ini sampai soal tersedia.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const current = list[idx];
  const userAnswer = answers[current.id];
  const isLast = idx === list.length - 1;

  // Drop stale option refs when the option count shrinks between questions.
  optionRefs.current.length = current.options?.length ?? 0;

  function selectOption(optIndex) {
    if (status === 'submitting' || status === 'done') return;
    setAnswers((prev) => ({ ...prev, [current.id]: optIndex }));
  }

  // Roving-tabindex keyboard handling for the radiogroup. Arrow keys move and
  // select (native radio behaviour); Space/Enter select the focused option.
  function focusOption(optIndex) {
    const node = optionRefs.current[optIndex];
    if (node) node.focus();
  }

  function onOptionKeyDown(e, i) {
    if (status === 'submitting' || status === 'done') return;
    const count = current.options.length;
    switch (e.key) {
      case 'ArrowDown':
      case 'ArrowRight': {
        e.preventDefault();
        const nextIdx = (i + 1) % count;
        selectOption(nextIdx);
        focusOption(nextIdx);
        break;
      }
      case 'ArrowUp':
      case 'ArrowLeft': {
        e.preventDefault();
        const prevIdx = (i - 1 + count) % count;
        selectOption(prevIdx);
        focusOption(prevIdx);
        break;
      }
      case ' ':
      case 'Enter': {
        e.preventDefault();
        selectOption(i);
        break;
      }
      default:
        break;
    }
  }

  async function submit() {
    setStatus('submitting');
    setErrorMsg('');
    try {
      const res = await onSubmit?.(answers);
      if (!res || typeof res.score !== 'number') {
        throw new Error('invalid_result');
      }
      setResult(res);
      setStatus('done');
      const passed =
        typeof res.passed === 'boolean'
          ? res.passed
          : res.score >= (res.passingScore ?? passingScore);
      onComplete?.({ score: res.score, passed, certificate: res.certificate });
    } catch {
      // Never fabricate a score — surface an error and let the user retry.
      setStatus('error');
      setErrorMsg('Gagal menilai, coba lagi');
    }
  }

  function next() {
    if (!isLast) {
      setIdx(idx + 1);
    } else {
      submit();
    }
  }

  // 'Coba ulang' — reset answers to retry (only offered when not passed).
  function retry() {
    setIdx(0);
    setAnswers({});
    setReviewMode(false);
    setStatus('idle');
    setResult(null);
    setErrorMsg('');
  }

  // —— Submitting state ——
  if (status === 'submitting') {
    return (
      <div className={cn('rounded-xl border-2 border-slate-200 bg-white p-8 text-center', className)}>
        <Loader2 className="mx-auto h-7 w-7 animate-spin text-orange-600" />
        <p className="mt-3 text-[14px] text-slate-600">Menilai jawaban…</p>
      </div>
    );
  }

  // —— Error state ——
  if (status === 'error') {
    return (
      <div className={cn('rounded-xl border-2 border-rose-300 bg-rose-50 p-6 sm:p-8 text-center', className)}>
        <div className="flex flex-col items-center gap-3">
          <span className="inline-grid h-10 w-10 place-items-center rounded-full bg-rose-100 text-rose-700">
            <X className="h-5 w-5" strokeWidth={2.5} />
          </span>
          <div>
            <h3 className="text-[17px] font-bold text-slate-900">{errorMsg || 'Gagal menilai, coba lagi'}</h3>
            <p className="mt-1 text-[13.5px] text-slate-600">Terjadi kendala saat mengirim jawaban ke server.</p>
          </div>
          <button
            type="button"
            onClick={submit}
            className="inline-flex items-center gap-2 rounded-md bg-slate-900 px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-orange-600"
          >
            <RotateCcw className="h-4 w-4" />
            Coba lagi
          </button>
        </div>
      </div>
    );
  }

  // —— Result + review (from server) ——
  if (status === 'done' && result) {
    const score = result.score;
    const effPassing = result.passingScore ?? passingScore;
    const passed =
      typeof result.passed === 'boolean' ? result.passed : score >= effPassing;
    const review = Array.isArray(result.review) ? result.review : [];
    const reviewById = review.reduce((acc, r) => {
      acc[r.id] = r;
      return acc;
    }, {});
    const correctCount = review.filter((r) => r.isCorrect).length;

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
            <b className="text-slate-900">{correctCount}</b> dari <b className="text-slate-900">{review.length || list.length}</b> jawaban benar
            {!passed && <> · butuh ≥{effPassing}% untuk lulus</>}
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

        {/* Review per-question — join props.questions with server review entries */}
        {reviewMode && (
          <div className="space-y-3">
            <div className="font-plexMono text-[11px] uppercase tracking-[0.12em] text-slate-500 px-1">
              Review · {list.length} questions
            </div>
            {list.map((q, qi) => {
              const r = reviewById[q.id] || {};
              const userIdx = r.yourAnswer ?? null;
              const correctIdx = r.correctAnswer;
              const isCorrect = r.isCorrect === true;
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

                  {r.explanation && (
                    <div className="ml-9 mt-3 rounded-md bg-slate-50 border-l-4 border-orange-amber p-3 text-[13px] text-slate-700">
                      <div className="font-plexMono text-[10.5px] uppercase tracking-[0.12em] text-orange-700 font-bold mb-1">
                        ◉ Explanation
                      </div>
                      <p className="leading-relaxed">{r.explanation}</p>
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

      <div
        role="radiogroup"
        aria-label={current.question}
        className="space-y-2.5"
      >
        {current.options.map((opt, i) => {
          const selected = userAnswer === i;
          // Roving tabindex: the selected option is tabbable; if none selected
          // yet, the first option is the tab stop so keyboard users can enter.
          const isTabStop = userAnswer === undefined ? i === 0 : selected;
          return (
            <button
              key={i}
              type="button"
              role="radio"
              aria-checked={selected}
              tabIndex={isTabStop ? 0 : -1}
              ref={(el) => { optionRefs.current[i] = el; }}
              onClick={() => selectOption(i)}
              onKeyDown={(e) => onOptionKeyDown(e, i)}
              className={cn(
                'w-full grid grid-cols-[20px_1fr] items-center gap-3 rounded-md border-2 px-4 py-3 text-left text-[14.5px] transition-all',
                selected ? 'border-orange-500 bg-orange-50' : 'border-slate-200 hover:border-slate-400'
              )}
            >
              <span
                aria-hidden="true"
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
