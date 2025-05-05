import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, FileText, Download, CheckCircle } from 'lucide-react';
import { useContent } from '../../contexts/ContentContext';
import Button from '../../components/ui/Button';
import Logo from '../components/common/Logo';

// Sans tagline
<Logo />

// Avec tagline
<Logo showTagline />


const Lessons: React.FC = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
  const { getSubjectById, getLessonsBySubject } = useContent();
  const navigate = useNavigate();

  // Track completed lessons (would come from a database in a real app)
  const [completedLessons, setCompletedLessons] = React.useState<string[]>([]);

  // Get subject data
  const subject = subjectId ? getSubjectById(subjectId) : undefined;
  
  // Get lessons for this subject
  const lessons = subjectId ? getLessonsBySubject(subjectId) : [];

  if (!subject) {
    return (
      <div className="page-container">
        <p>Matière non trouvée</p>
        <Link to="/cycles">Retour aux cycles</Link>
      </div>
    );
  }

  // Toggle completion status (demo only)
  const toggleCompletion = (lessonId: string) => {
    if (completedLessons.includes(lessonId)) {
      setCompletedLessons(completedLessons.filter(id => id !== lessonId));
    } else {
      setCompletedLessons([...completedLessons, lessonId]);
    }
  };

  // Function to get icon for subject
  const getSubjectIcon = () => {
    switch (subject.icon) {
      case 'book-open': return <FileText className="h-8 w-8 text-blue-800" />;
      default: return <FileText className="h-8 w-8 text-blue-800" />;
    }
  };

  return (
    <div className="page-container">
      {/* Breadcrumb - simplified for this demo */}
      <Link to="#" onClick={() => window.history.back()} className="text-blue-700 hover:text-blue-800 flex items-center mb-6">
        <ArrowLeft className="h-4 w-4 mr-1" />
        Retour aux matières
      </Link>

      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center">
          <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mr-4">
            {getSubjectIcon()}
          </div>
          <div>
            <h1 className="text-3xl font-bold">{subject.name}</h1>
            <p className="text-gray-600">{subject.description}</p>
          </div>
        </div>
      </div>

      {/* Progress indicator */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-8 border border-gray-200">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold">Progression</h3>
          <span className="text-sm text-gray-500">
            {completedLessons.length}/{lessons.length} leçons complétées
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-green-500 h-2.5 rounded-full" 
            style={{ width: `${(completedLessons.length / lessons.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Lessons list */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200 bg-gray-50 px-4 py-3">
          <h2 className="font-semibold">Liste des leçons</h2>
        </div>
        <ul className="divide-y divide-gray-100">
          {lessons.map((lesson) => (
            <li 
              key={lesson.id} 
              className="lesson-item"
            >
              <div className="flex items-center">
                <button 
                  onClick={() => toggleCompletion(lesson.id)}
                  className="mr-3 text-gray-400 hover:text-green-500 transition-colors"
                >
                  <CheckCircle 
                    className={`h-5 w-5 ${completedLessons.includes(lesson.id) ? 'text-green-500 fill-green-500' : ''}`} 
                  />
                </button>
                <div>
                  <h3 
                    className="font-medium cursor-pointer hover:text-blue-700"
                    onClick={() => navigate(`/lessons/${lesson.id}`)}
                  >
                    {lesson.title}
                  </h3>
                  <p className="text-sm text-gray-500">{lesson.description}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button 
                  variant="ghost"
                  size="sm"
                  className="text-xs"
                  leftIcon={<FileText className="h-4 w-4" />}
                  onClick={() => navigate(`/lessons/${lesson.id}`)}
                >
                  Voir
                </Button>
                <a 
                  href={lesson.courseUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-ghost text-xs h-8 px-3 inline-flex items-center"
                >
                  <Download className="h-4 w-4 mr-1" />
                  PDF
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {lessons.length === 0 && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                Aucune leçon disponible pour cette matière actuellement.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Lessons;