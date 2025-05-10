import MultipleChoiceQuiz from '@/components/MultipleChoiceQuiz';

export default function QuizPage() {
  return (
    <main className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold mb-6">Quiz Page</h1>
      <MultipleChoiceQuiz />
    </main>
  );
}