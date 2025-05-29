interface Subject {
  id: string;
  name: string;
  cycleId: string;
  classId: string;
}

interface CourseContent {
  id: string;
  subjectId: string;
  title: string;
  pdfUrl: string;
  youtubeUrl: string;
  exercisePdfUrl: string;
  homeworkPdfUrl: string;
  createdAt: string;
}

const SUBJECTS_KEY = 'oneklas_subjects';
const COURSE_CONTENTS_KEY = 'oneklas_course_contents';

class SubjectService {
  private getSubjects(): Subject[] {
    const stored = localStorage.getItem(SUBJECTS_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  private saveSubjects(subjects: Subject[]): void {
    localStorage.setItem(SUBJECTS_KEY, JSON.stringify(subjects));
  }

  private getCourseContents(): CourseContent[] {
    const stored = localStorage.getItem(COURSE_CONTENTS_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  private saveCourseContents(contents: CourseContent[]): void {
    localStorage.setItem(COURSE_CONTENTS_KEY, JSON.stringify(contents));
  }

  async addSubject(data: Omit<Subject, 'id'>): Promise<Subject> {
    const subjects = this.getSubjects();
    const newSubject: Subject = {
      id: Date.now().toString(),
      ...data
    };
    subjects.push(newSubject);
    this.saveSubjects(subjects);
    return newSubject;
  }

  async addCourseContent(data: Omit<CourseContent, 'id' | 'createdAt'>): Promise<CourseContent> {
    const contents = this.getCourseContents();
    const newContent: CourseContent = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      ...data
    };
    contents.push(newContent);
    this.saveCourseContents(contents);
    return newContent;
  }

  async getSubjectsByClass(cycleId: string, classId: string): Promise<Subject[]> {
    const subjects = this.getSubjects();
    return subjects.filter(s => s.cycleId === cycleId && s.classId === classId);
  }

  async getCourseContentsBySubject(subjectId: string): Promise<CourseContent[]> {
    const contents = this.getCourseContents();
    return contents.filter(c => c.subjectId === subjectId);
  }
}

export const subjectService = new SubjectService();
export type { Subject, CourseContent }; 