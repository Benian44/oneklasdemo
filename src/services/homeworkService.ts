interface Homework {
  id: string;
  title: string;
  subject: string;
  level: string;
  trimester: number;
  uploadDate: string;
  fileUrl: string;
}

const STORAGE_KEY = 'oneklas_homeworks';

class HomeworkService {
  private getStoredHomeworks(): Homework[] {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  private saveHomeworks(homeworks: Homework[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(homeworks));
  }

  async getAllHomeworks(): Promise<Homework[]> {
    return this.getStoredHomeworks();
  }

  async getHomeworksByLevel(level: string): Promise<Homework[]> {
    const homeworks = this.getStoredHomeworks();
    return homeworks.filter(hw => hw.level === level);
  }

  async getHomeworksByTrimester(level: string, trimester: number): Promise<Homework[]> {
    const homeworks = this.getStoredHomeworks();
    return homeworks.filter(hw => hw.level === level && hw.trimester === trimester);
  }

  async addHomework(homework: Omit<Homework, 'id' | 'uploadDate' | 'fileUrl'>, file: File): Promise<Homework> {
    const homeworks = this.getStoredHomeworks();
    
    // Simuler le stockage du fichier (dans un environnement réel, cela serait fait sur un serveur)
    const fileUrl = URL.createObjectURL(file);
    
    const newHomework: Homework = {
      id: Date.now().toString(),
      uploadDate: new Date().toISOString(),
      fileUrl,
      ...homework
    };

    homeworks.push(newHomework);
    this.saveHomeworks(homeworks);

    return newHomework;
  }

  async deleteHomework(id: string): Promise<void> {
    const homeworks = this.getStoredHomeworks();
    const updatedHomeworks = homeworks.filter(hw => hw.id !== id);
    this.saveHomeworks(updatedHomeworks);
  }
}

export const homeworkService = new HomeworkService();
export type { Homework }; 