import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, FileText, Download, BookOpen, Dumbbell } from 'lucide-react';
import { useContent } from '../../contexts/ContentContext';
import Button from '../../components/ui/Button';

const LessonDetail: React.FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const { getLessonById, getSubjectById } = useContent();
  
  // State to track active tab
  const [activeTab, setActiveTab] = useState<'course' | 'exercises'>('course');

  // Get lesson data
  const lesson = lessonId ? getLessonById(lessonId) : undefined;
  
  // Get subject data
  const subject = lesson?.subjectId ? getSubjectById(lesson.subjectId) : undefined;

  if (!lesson || !subject) {
    return (
      <div className="page-container">
        <p>Leçon non trouvée</p>
        <Link to="/cycles">Retour aux cycles</Link>
      </div>
    );
  }

  return (
    <div className="page-container">
      {/* Breadcrumb - simplified for this demo */}
      <Link to="#" onClick={() => window.history.back()} className="text-blue-700 hover:text-blue-800 flex items-center mb-6">
        <ArrowLeft className="h-4 w-4 mr-1" />
        Retour aux leçons
      </Link>

      <div className="mb-6">
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <span>{subject.name}</span>
        </div>
        <h1 className="text-3xl font-bold mb-2">{lesson.title}</h1>
        <p className="text-gray-600">{lesson.description}</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`py-3 px-5 border-b-2 ${
            activeTab === 'course' 
              ? 'border-blue-500 text-blue-600' 
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          } font-medium`}
          onClick={() => setActiveTab('course')}
        >
          <div className="flex items-center">
            <BookOpen className="h-4 w-4 mr-2" />
            Cours
          </div>
        </button>
        <button
          className={`py-3 px-5 border-b-2 ${
            activeTab === 'exercises' 
              ? 'border-blue-500 text-blue-600' 
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          } font-medium`}
          onClick={() => setActiveTab('exercises')}
        >
          <div className="flex items-center">
            <Dumbbell className="h-4 w-4 mr-2" />
            Exercices
          </div>
        </button>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
          <h2 className="font-semibold text-gray-900">
            {activeTab === 'course' ? 'Contenu du cours' : 'Exercices et devoirs'}
          </h2>
          <a
            href={activeTab === 'course' ? lesson.courseUrl : lesson.exercisesUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline text-blue-700 border-blue-200 hover:bg-blue-50"
          >
            <Download className="h-4 w-4 mr-2" />
            Télécharger le PDF
          </a>
        </div>

        <div className="p-6">
          {/* PDF Viewer (placeholder) */}
          <div className="pdf-container flex flex-col items-center justify-center bg-gray-100">
            <div className="mb-4">
              <FileText className="h-16 w-16 text-gray-400" />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">
                {activeTab === 'course' ? 'Aperçu du cours' : 'Aperçu des exercices'}
              </h3>
              <p className="text-gray-600 mb-4">
                Le contenu PDF serait affiché ici dans un environnement de production.
              </p>
              <Button variant="primary">
                <Download className="h-4 w-4 mr-2" />
                Télécharger le PDF
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation to next/previous lessons would be added here */}
    </div>
  );
};

export default LessonDetail;