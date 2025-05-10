import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, FileText } from 'lucide-react';
import { useContent } from '../../contexts/ContentContext';
import Card from '../../components/ui/Card';

const ExamSubjects: React.FC = () => {
  const { examType } = useParams<{ examType: string }>();
  const { subjects } = useContent();
  const navigate = useNavigate();

  // Filter subjects based on exam type
  const examSubjects = subjects.filter(subject => {
    if (examType === 'bepc') {
      return ['1', '2', '3', '4', '5', '6', '7'].includes(subject.id); // IDs for BEPC subjects
    } else {
      return true; // Show all subjects for BAC
    }
  });

  return (
    <div className="page-container">
      <Link to="/exam-prep" className="text-blue-700 hover:text-blue-800 flex items-center mb-6">
        <ArrowLeft className="h-4 w-4 mr-1" />
        Retour à la préparation des examens
      </Link>

      <h1 className="text-3xl font-bold mb-2">
        Préparation {examType.toUpperCase()}
      </h1>
      <p className="text-gray-600 mb-8">
        Sélectionnez une matière pour accéder aux sujets et corrigés des années précédentes.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {examSubjects.map((subject) => (
          <Card
            key={subject.id}
            className="hover:border-blue-500 transition-all cursor-pointer"
            onClick={() => navigate(`/exam-prep/${examType}/${subject.id}`)}
          >
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 rounded-full p-3 mr-3">
                  <BookOpen className="h-6 w-6 text-blue-800" />
                </div>
                <h2 className="text-xl font-semibold">{subject.name}</h2>
              </div>
              <p className="text-gray-600 mb-4">{subject.description}</p>
              <div className="flex items-center text-blue-700">
                <FileText className="h-4 w-4 mr-1" />
                <span className="text-sm">Voir les sujets</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ExamSubjects;