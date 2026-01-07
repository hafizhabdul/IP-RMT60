import { useState } from 'react';
import { CheckCircle, XCircle, ChevronRight } from 'lucide-react';

export default function QuizCard({ question, index, onAnswer, selectedAnswer, showResult, isCorrect }) {
    const [localSelected, setLocalSelected] = useState(selectedAnswer);

    const handleSelect = (optionIndex) => {
        if (showResult) return; // Don't allow changes after submission
        setLocalSelected(optionIndex);
        onAnswer(question.id, optionIndex);
    };

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            {/* Question Header */}
            <div className="flex items-start gap-3 mb-4">
                <span className="flex-shrink-0 w-8 h-8 bg-orange-100 text-orange-700 rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                </span>
                <div className="flex-1">
                    <p className="text-gray-900 font-medium leading-relaxed">{question.question}</p>
                    {question.method && (
                        <span className="inline-block mt-2 px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                            {question.method} • {question.level}
                        </span>
                    )}
                </div>
            </div>

            {/* Options */}
            <div className="space-y-2 ml-11">
                {question.options.map((option, optionIndex) => {
                    const isSelected = localSelected === optionIndex;
                    const isCorrectOption = showResult && question.correctAnswer === optionIndex;
                    const isWrongSelected = showResult && isSelected && !isCorrect;

                    let optionClasses = "w-full text-left px-4 py-3 rounded-lg border-2 transition-all flex items-center gap-3";

                    if (showResult) {
                        if (isCorrectOption) {
                            optionClasses += " border-green-500 bg-green-50 text-green-900";
                        } else if (isWrongSelected) {
                            optionClasses += " border-red-500 bg-red-50 text-red-900";
                        } else {
                            optionClasses += " border-gray-200 bg-gray-50 text-gray-500";
                        }
                    } else {
                        if (isSelected) {
                            optionClasses += " border-orange-500 bg-orange-50 text-orange-900";
                        } else {
                            optionClasses += " border-gray-200 hover:border-orange-300 hover:bg-orange-50/50";
                        }
                    }

                    return (
                        <button
                            key={optionIndex}
                            onClick={() => handleSelect(optionIndex)}
                            disabled={showResult}
                            className={optionClasses}
                        >
                            <span className="w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold flex-shrink-0">
                                {String.fromCharCode(65 + optionIndex)}
                            </span>
                            <span className="flex-1">{option}</span>
                            {showResult && isCorrectOption && (
                                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                            )}
                            {showResult && isWrongSelected && (
                                <XCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Explanation (shown after submission) */}
            {showResult && question.explanation && (
                <div className="mt-4 ml-11 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <p className="text-sm text-amber-900">
                        <strong>Explanation:</strong> {question.explanation}
                    </p>
                </div>
            )}
        </div>
    );
}
