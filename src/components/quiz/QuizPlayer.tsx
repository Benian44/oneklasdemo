import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { quizService, type Quiz, type QuizAttempt } from '../../services/quizService';

interface QuizPlayerProps {
  quiz: Quiz;
  userId: string;
  onComplete?: (attempt: QuizAttempt) => void;
}

const QuizPlayer: React.FC<QuizPlayerProps> = ({ quiz, userId, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(quiz.timeLimit * 60); // Convertir en secondes
  const [isFinished, setIsFinished] = useState(false);
  const [attempt, setAttempt] = useState<QuizAttempt | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    if (!isFinished && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleFinish();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeLeft, isFinished]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (isFinished) return;

    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowExplanation(false);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setShowExplanation(false);
    }
  };

  const handleFinish = async () => {
    const filledAnswers = selectedAnswers.map((answer, index) => 
      answer === undefined ? -1 : answer
    );
    
    const quizAttempt = await quizService.submitQuizAttempt(
      quiz.id,
      userId,
      filledAnswers
    );

    setAttempt(quizAttempt);
    setIsFinished(true);
    onComplete?.(quizAttempt);
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setTimeLeft(quiz.timeLimit * 60);
    setIsFinished(false);
    setAttempt(null);
    setShowExplanation(false);
  };

  if (isFinished && attempt) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Résultats du Quiz</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-6">
            <p className="text-3xl font-bold mb-2">
              {attempt.score} / {attempt.maxScore}
            </p>
            <p className="text-xl">
              Note: {((attempt.score / attempt.maxScore) * 20).toFixed(2)}/20
            </p>
          </div>

          <div className="space-y-6">
            {quiz.questions.map((question, index) => (
              <div key={question.id} className="border rounded-lg p-4">
                <p className="font-medium mb-2">{question.question}</p>
                <div className="grid gap-2">
                  {question.options.map((option, optionIndex) => (
                    <div
                      key={optionIndex}
                      className={`p-2 rounded ${
                        optionIndex === question.correctAnswer
                          ? 'bg-green-100 border-green-500'
                          : attempt.answers[index] === optionIndex
                          ? 'bg-red-100 border-red-500'
                          : 'bg-gray-50'
                      }`}
                    >
                      {option}
                    </div>
                  ))}
                </div>
                <p className="mt-2 text-gray-600 italic">{question.explanation}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-center">
            <Button onClick={handleRetry}>Recommencer le Quiz</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentQuestionData = quiz.questions[currentQuestion];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Question {currentQuestion + 1}/{quiz.questions.length}</span>
          <span className={`${timeLeft < 60 ? 'text-red-600' : ''}`}>
            {formatTime(timeLeft)}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-lg mb-4">{currentQuestionData.question}</p>

        <div className="space-y-2">
          {currentQuestionData.options.map((option, index) => (
            <button
              key={index}
              className={`w-full text-left p-3 rounded border ${
                selectedAnswers[currentQuestion] === index
                  ? 'bg-blue-100 border-blue-500'
                  : 'hover:bg-gray-50'
              }`}
              onClick={() => handleAnswerSelect(index)}
            >
              {option}
            </button>
          ))}
        </div>

        {showExplanation && (
          <div className="mt-4 p-4 bg-gray-50 rounded">
            <p className="font-medium">Explication :</p>
            <p>{currentQuestionData.explanation}</p>
          </div>
        )}

        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            Précédent
          </Button>
          
          <div className="space-x-2">
            <Button
              variant="outline"
              onClick={() => setShowExplanation(!showExplanation)}
            >
              {showExplanation ? 'Masquer' : 'Voir'} l'explication
            </Button>
            
            {currentQuestion === quiz.questions.length - 1 ? (
              <Button onClick={handleFinish}>Terminer</Button>
            ) : (
              <Button onClick={handleNext}>Suivant</Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuizPlayer; 