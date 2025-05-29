import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { quizService, type Quiz, type QuizAttempt } from '../../services/quizService';
import QuizPlayer from './QuizPlayer';

interface LessonQuizzesProps {
  lessonId: string;
  userId: string;
}

const LessonQuizzes: React.FC<LessonQuizzesProps> = ({ lessonId, userId }) => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [attempts, setAttempts] = useState<Record<string, QuizAttempt[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadQuizzes();
  }, [lessonId]);

  const loadQuizzes = async () => {
    try {
      const data = await quizService.getQuizzesByLesson(lessonId);
      setQuizzes(data);

      // Charger les tentatives pour chaque quiz
      const attemptsData: Record<string, QuizAttempt[]> = {};
      for (const quiz of data) {
        const quizAttempts = await quizService.getUserAttempts(userId, quiz.id);
        attemptsData[quiz.id] = quizAttempts;
      }
      setAttempts(attemptsData);
    } catch (error) {
      console.error('Erreur lors du chargement des quiz:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleQuizComplete = async (attempt: QuizAttempt) => {
    // Mettre à jour les tentatives localement
    setAttempts(prev => ({
      ...prev,
      [attempt.quizId]: [attempt, ...(prev[attempt.quizId] || [])]
    }));
  };

  if (loading) {
    return (
      <div className="w-full p-4 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-800"></div>
      </div>
    );
  }

  if (selectedQuiz) {
    return (
      <div className="space-y-4">
        <Button
          variant="outline"
          onClick={() => setSelectedQuiz(null)}
        >
          Retour aux quiz
        </Button>
        <QuizPlayer
          quiz={selectedQuiz}
          userId={userId}
          onComplete={handleQuizComplete}
        />
      </div>
    );
  }

  if (quizzes.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Aucun quiz disponible pour cette leçon.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {quizzes.map((quiz) => {
        const quizAttempts = attempts[quiz.id] || [];
        const bestAttempt = quizAttempts.length > 0
          ? quizAttempts.reduce((best, current) => 
              current.score > best.score ? current : best
            )
          : null;

        return (
          <Card key={quiz.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>{quiz.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">{quiz.description}</p>
              <div className="text-sm text-gray-500 space-y-1">
                <p>Temps limite : {quiz.timeLimit} minutes</p>
                <p>Questions : {quiz.questions.length}</p>
                {bestAttempt && (
                  <p className="font-medium text-blue-600">
                    Meilleur score : {((bestAttempt.score / bestAttempt.maxScore) * 20).toFixed(2)}/20
                  </p>
                )}
                <p>Tentatives : {quizAttempts.length}</p>
              </div>
              <Button
                className="mt-4 w-full"
                onClick={() => setSelectedQuiz(quiz)}
              >
                {quizAttempts.length > 0 ? 'Recommencer' : 'Commencer'} le quiz
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default LessonQuizzes; 