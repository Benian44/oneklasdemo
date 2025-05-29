import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { quizService, type Quiz, type QuizQuestion } from '../../services/quizService';

const QuizManager: React.FC = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    lessonId: '',
    timeLimit: 30,
    questions: [] as QuizQuestion[]
  });

  useEffect(() => {
    loadQuizzes();
  }, []);

  const loadQuizzes = async () => {
    const data = await quizService.getAllQuizzes();
    setQuizzes(data);
  };

  const handleAddQuestion = () => {
    const newQuestion: QuizQuestion = {
      id: Date.now().toString(),
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      explanation: ''
    };

    setFormData({
      ...formData,
      questions: [...formData.questions, newQuestion]
    });
  };

  const handleQuestionChange = (index: number, field: keyof QuizQuestion, value: any) => {
    const updatedQuestions = [...formData.questions];
    if (field === 'options') {
      updatedQuestions[index] = {
        ...updatedQuestions[index],
        options: value
      };
    } else {
      updatedQuestions[index] = {
        ...updatedQuestions[index],
        [field]: value
      };
    }
    
    setFormData({
      ...formData,
      questions: updatedQuestions
    });
  };

  const handleOptionChange = (questionIndex: number, optionIndex: number, value: string) => {
    const updatedQuestions = [...formData.questions];
    const updatedOptions = [...updatedQuestions[questionIndex].options];
    updatedOptions[optionIndex] = value;
    
    updatedQuestions[questionIndex] = {
      ...updatedQuestions[questionIndex],
      options: updatedOptions
    };
    
    setFormData({
      ...formData,
      questions: updatedQuestions
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (selectedQuiz) {
        await quizService.updateQuiz(selectedQuiz.id, formData);
      } else {
        await quizService.addQuiz(formData);
      }
      
      await loadQuizzes();
      setIsAddModalOpen(false);
      setSelectedQuiz(null);
      setFormData({
        title: '',
        description: '',
        lessonId: '',
        timeLimit: 30,
        questions: []
      });
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement du quiz:', error);
    }
  };

  const handleDelete = async (quizId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce quiz ?')) {
      try {
        await quizService.deleteQuiz(quizId);
        await loadQuizzes();
      } catch (error) {
        console.error('Erreur lors de la suppression du quiz:', error);
      }
    }
  };

  const handleEdit = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setFormData({
      title: quiz.title,
      description: quiz.description,
      lessonId: quiz.lessonId,
      timeLimit: quiz.timeLimit,
      questions: quiz.questions
    });
    setIsAddModalOpen(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Gestion des Quiz</h2>
        <Button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Ajouter un quiz
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes.map((quiz) => (
          <Card key={quiz.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{quiz.title}</span>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(quiz)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(quiz.id)}
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-2">{quiz.description}</p>
              <div className="text-sm text-gray-500">
                <p>Temps limite : {quiz.timeLimit} minutes</p>
                <p>Questions : {quiz.questions.length}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">
              {selectedQuiz ? 'Modifier le quiz' : 'Ajouter un quiz'}
            </h3>
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Titre
                  </label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <Input
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    ID de la leçon
                  </label>
                  <Input
                    value={formData.lessonId}
                    onChange={(e) => setFormData({ ...formData, lessonId: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Temps limite (minutes)
                  </label>
                  <Input
                    type="number"
                    value={formData.timeLimit}
                    onChange={(e) => setFormData({ ...formData, timeLimit: parseInt(e.target.value) })}
                    min="1"
                    required
                  />
                </div>

                <div>
                  <h4 className="font-medium text-lg mb-2">Questions</h4>
                  {formData.questions.map((question, questionIndex) => (
                    <div key={question.id} className="border rounded-lg p-4 mb-4">
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                          Question {questionIndex + 1}
                        </label>
                        <Input
                          value={question.question}
                          onChange={(e) => handleQuestionChange(questionIndex, 'question', e.target.value)}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        {question.options.map((option, optionIndex) => (
                          <div key={optionIndex} className="flex items-center gap-2">
                            <Input
                              value={option}
                              onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
                              placeholder={`Option ${optionIndex + 1}`}
                              required
                            />
                            <input
                              type="radio"
                              name={`correct-${question.id}`}
                              checked={question.correctAnswer === optionIndex}
                              onChange={() => handleQuestionChange(questionIndex, 'correctAnswer', optionIndex)}
                              required
                            />
                          </div>
                        ))}
                      </div>

                      <div className="mt-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Explication
                        </label>
                        <Input
                          value={question.explanation}
                          onChange={(e) => handleQuestionChange(questionIndex, 'explanation', e.target.value)}
                          required
                        />
                      </div>

                      <Button
                        type="button"
                        variant="outline"
                        className="mt-2"
                        onClick={() => {
                          const updatedQuestions = formData.questions.filter((_, i) => i !== questionIndex);
                          setFormData({
                            ...formData,
                            questions: updatedQuestions
                          });
                        }}
                      >
                        Supprimer la question
                      </Button>
                    </div>
                  ))}

                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleAddQuestion}
                  >
                    Ajouter une question
                  </Button>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setSelectedQuiz(null);
                    setFormData({
                      title: '',
                      description: '',
                      lessonId: '',
                      timeLimit: 30,
                      questions: []
                    });
                  }}
                >
                  Annuler
                </Button>
                <Button type="submit">
                  {selectedQuiz ? 'Modifier' : 'Ajouter'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizManager; 