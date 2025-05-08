import React, { createContext, useState, useContext } from 'react';
import { educationalContent } from '../data/educationalContent';

// Types
export interface Cycle {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface Class {
  id: string;
  cycleId: string;
  name: string;
  description: string;
}

export interface Subject {
  id: string;
  classIds: string[];
  name: string;
  description: string;
  icon: string;
}

export interface Lesson {
  id: string;
  subjectId: string;
  title: string;
  description: string;
  courseUrl: string;
  exercisesUrl: string;
  videoUrl: string; // Added video URL
}

interface ContentContextType {
  cycles: Cycle[];
  classes: Class[];
  subjects: Subject[];
  lessons: Lesson[];
  getCycleById: (id: string) => Cycle | undefined;
  getClassById: (id: string) => Class | undefined;
  getSubjectById: (id: string) => Subject | undefined;
  getLessonById: (id: string) => Lesson | undefined;
  getClassesByCycle: (cycleId: string) => Class[];
  getSubjectsByClass: (classId: string) => Subject[];
  getLessonsBySubject: (subjectId: string) => Lesson[];
}

// Create context
const ContentContext = createContext<ContentContextType | undefined>(undefined);

// Provider component
export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content] = useState(educationalContent);

  // Helper functions
  const getCycleById = (id: string) => {
    return content.cycles.find(cycle => cycle.id === id);
  };

  const getClassById = (id: string) => {
    return content.classes.find(cls => cls.id === id);
  };

  const getSubjectById = (id: string) => {
    return content.subjects.find(subject => subject.id === id);
  };

  const getLessonById = (id: string) => {
    return content.lessons.find(lesson => lesson.id === id);
  };

  const getClassesByCycle = (cycleId: string) => {
    return content.classes.filter(cls => cls.cycleId === cycleId);
  };

  const getSubjectsByClass = (classId: string) => {
    const currentClass = getClassById(classId);
    if (!currentClass) return [];
    
    return content.subjects.filter(subject => 
      subject.classIds.includes(classId)
    );
  };

  const getLessonsBySubject = (subjectId: string) => {
    return content.lessons.filter(lesson => lesson.subjectId === subjectId);
  };

  const value = {
    cycles: content.cycles,
    classes: content.classes,
    subjects: content.subjects,
    lessons: content.lessons,
    getCycleById,
    getClassById,
    getSubjectById,
    getLessonById,
    getClassesByCycle,
    getSubjectsByClass,
    getLessonsBySubject
  };

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
};

// Custom hook
export const useContent = (): ContentContextType => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};