'use client';

import { useState } from 'react';

const questions = [
  {
    id: 'q1',
    text: 'Compliance with Requirements',
    correctCategory: 'Mandatory',
    feedback: 'This is a mandatory requirement. Bids that fail to meet legal, technical, or procedural criteria are typically disqualified immediately.'
  },
  {
    id: 'q2',
    text: 'Company Capabilities & Experience',
    correctCategory: 'Mandatory',
    feedback: "Mandatory criteria assess the bidder's experience, resources, and ability to deliver. This includes past performance and operational capacity."
  },
  {
    id: 'q3',
    text: 'Risk Management',
    correctCategory: 'Mandatory',
    feedback: 'Risk management is a core requirement. It ensures the supplier can handle disruptions and maintain performance throughout the contract.'
  },
  {
    id: 'q4',
    text: 'Value for Money',
    correctCategory: 'Value-Added',
    feedback: 'Value for Money enhances competitiveness but is not mandatory. It reflects long-term cost-effectiveness rather than lowest upfront cost.'
  },
  {
    id: 'q5',
    text: 'Innovation & Added Value',
    correctCategory: 'Value-Added',
    feedback: 'Innovation is a value-added factor that helps distinguish a proposal. It goes beyond the minimum requirements to improve outcomes.'
  },
];

export default function MultipleChoiceQuiz() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);

  const currentQuestion = questions[currentIndex];

  const handleAnswer = (category: string) => {
    const isLast = currentIndex === questions.length - 1;
    setAnswers([...answers, category]);
    if (isLast) {
      setShowResult(true);
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleRestart = () => {
    setAnswers([]);
    setCurrentIndex(0);
    setShowResult(false);
  };

  const correctCount = answers.filter((ans, i) => ans === questions[i].correctCategory).length;

  if (showResult) {
    const percentage = Math.round((correctCount / questions.length) * 100);

    return (
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Quiz Complete!</h2>
        <p className="mb-2 text-lg">
          ✅ You got <strong>{correctCount}</strong> out of{' '}
          <strong>{questions.length}</strong> correct (
          <strong>{percentage}%</strong>)
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-4">Review Your Answers:</h3>
        <ul className="space-y-4">
          {questions.map((q, i) => {
            const userAnswer = answers[i];
            const isCorrect = userAnswer === q.correctCategory;

            return (
              <li
                key={q.id}
                className={`p-4 rounded-md border ${
                  isCorrect
                    ? 'bg-green-50 border-green-400'
                    : 'bg-red-50 border-red-400'
                }`}
              >
                <p className="font-medium text-gray-800 mb-1">
                  {q.text}
                </p>
                <p>
                  Your answer: <strong>{userAnswer}</strong>{' '}
                  {!isCorrect && (
                    <span className="text-red-600 font-semibold ml-2">
                      ❌ Incorrect
                    </span>
                  )}
                  {isCorrect && (
                    <span className="text-green-600 font-semibold ml-2">
                      ✅ Correct
                    </span>
                  )}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Correct category: <strong>{q.correctCategory}</strong>
                </p>
                {!isCorrect && (
                  <p className="text-sm text-gray-700 mt-2">
                    💬 <em>{q.feedback}</em>
                  </p>
                )}
              </li>
            );
          })}
        </ul>

        <button
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handleRestart}
        >
          Retry Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">
        Question {currentIndex + 1} of {questions.length}
      </h2>
      <p className="mb-6">Which category does this belong to?</p>
      <p className="text-lg font-medium mb-6">{currentQuestion.text}</p>
      <div className="flex flex-col gap-4">
        <button
          onClick={() => handleAnswer('Mandatory')}
          className="w-full px-4 py-2 rounded-md border border-blue-500 hover:bg-blue-100"
        >
          Mandatory Evaluation Factor
        </button>
        <button
          onClick={() => handleAnswer('Value-Added')}
          className="w-full px-4 py-2 rounded-md border border-green-500 hover:bg-green-100"
        >
          Value-Added Factor
        </button>
      </div>
    </div>
  );
}
