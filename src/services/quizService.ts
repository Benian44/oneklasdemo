interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface Quiz {
  id: string;
  lessonId: string;
  title: string;
  description: string;
  timeLimit: number; // en minutes
  questions: QuizQuestion[];
}

interface QuizAttempt {
  id: string;
  quizId: string;
  userId: string;
  score: number;
  maxScore: number;
  answers: number[];
  completedAt: string;
}

const STORAGE_KEY_QUIZZES = 'oneklas_quizzes';
const STORAGE_KEY_ATTEMPTS = 'oneklas_quiz_attempts';

class QuizService {
  private getStoredQuizzes(): Quiz[] {
    const stored = localStorage.getItem(STORAGE_KEY_QUIZZES);
    return stored ? JSON.parse(stored) : [];
  }

  private getStoredAttempts(): QuizAttempt[] {
    const stored = localStorage.getItem(STORAGE_KEY_ATTEMPTS);
    return stored ? JSON.parse(stored) : [];
  }

  private saveQuizzes(quizzes: Quiz[]): void {
    localStorage.setItem(STORAGE_KEY_QUIZZES, JSON.stringify(quizzes));
  }

  private saveAttempts(attempts: QuizAttempt[]): void {
    localStorage.setItem(STORAGE_KEY_ATTEMPTS, JSON.stringify(attempts));
  }

  async getAllQuizzes(): Promise<Quiz[]> {
    return this.getStoredQuizzes();
  }

  async getQuizzesByLesson(lessonId: string): Promise<Quiz[]> {
    const quizzes = this.getStoredQuizzes();
    return quizzes.filter(quiz => quiz.lessonId === lessonId);
  }

  async getQuizById(quizId: string): Promise<Quiz | null> {
    const quizzes = this.getStoredQuizzes();
    return quizzes.find(quiz => quiz.id === quizId) || null;
  }

  async addQuiz(quiz: Omit<Quiz, 'id'>): Promise<Quiz> {
    const quizzes = this.getStoredQuizzes();
    const newQuiz: Quiz = {
      id: Date.now().toString(),
      ...quiz
    };
    quizzes.push(newQuiz);
    this.saveQuizzes(quizzes);
    return newQuiz;
  }

  async updateQuiz(quizId: string, updates: Partial<Quiz>): Promise<Quiz | null> {
    const quizzes = this.getStoredQuizzes();
    const index = quizzes.findIndex(quiz => quiz.id === quizId);
    if (index === -1) return null;

    const updatedQuiz = { ...quizzes[index], ...updates };
    quizzes[index] = updatedQuiz;
    this.saveQuizzes(quizzes);
    return updatedQuiz;
  }

  async deleteQuiz(quizId: string): Promise<void> {
    const quizzes = this.getStoredQuizzes();
    const updatedQuizzes = quizzes.filter(quiz => quiz.id !== quizId);
    this.saveQuizzes(updatedQuizzes);

    // Supprimer également toutes les tentatives associées
    const attempts = this.getStoredAttempts();
    const updatedAttempts = attempts.filter(attempt => attempt.quizId !== quizId);
    this.saveAttempts(updatedAttempts);
  }

  async submitQuizAttempt(
    quizId: string,
    userId: string,
    answers: number[]
  ): Promise<QuizAttempt> {
    const quiz = await this.getQuizById(quizId);
    if (!quiz) throw new Error('Quiz non trouvé');

    // Calculer le score
    let score = 0;
    quiz.questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        score++;
      }
    });

    const attempt: QuizAttempt = {
      id: Date.now().toString(),
      quizId,
      userId,
      score,
      maxScore: quiz.questions.length,
      answers,
      completedAt: new Date().toISOString()
    };

    const attempts = this.getStoredAttempts();
    attempts.push(attempt);
    this.saveAttempts(attempts);

    return attempt;
  }

  async getUserAttempts(userId: string, quizId?: string): Promise<QuizAttempt[]> {
    const attempts = this.getStoredAttempts();
    return attempts
      .filter(attempt => attempt.userId === userId && (!quizId || attempt.quizId === quizId))
      .sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime());
  }

  async getBestAttempt(userId: string, quizId: string): Promise<QuizAttempt | null> {
    const attempts = await this.getUserAttempts(userId, quizId);
    if (attempts.length === 0) return null;

    return attempts.reduce((best, current) => 
      current.score > best.score ? current : best
    );
  }
}

export const quizService = new QuizService();
export type { Quiz, QuizQuestion, QuizAttempt }; 