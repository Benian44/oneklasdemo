import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, FileText } from 'lucide-react';
import { useContent } from '../../contexts/ContentContext';
import Card from '../../components/ui/Card';

const ExamSubjects: React.FC = () => {
  const { examType } = useParams<{ examType: string }>();
  const { subjects } = useContent();
  const navigate = useNavigate();

  // Filter subjects based on exam type and series
  const getExamSubjects = () => {
    if (examType === 'bepc') {
      // BEPC subjects
      return subjects.filter(subject => 
        ['Français', 'Anglais', 'Mathématiques', 'Physique-Chimie', 'SVT', 'Histoire', 'Géographie'].includes(subject.name)
      );
    } else {
      // BAC subjects - show all and filter by series in the UI
      return subjects;
    }
  };

  const examSubjects = getExamSubjects();

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
        {examType === 'bac' && ' Les sujets sont organisés par série.'}
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
                <span className="text-sm">
                  {examType === 'bepc' 
                    ? 'Sujets par zone'
                    : 'Sujets par série'
                  }
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {examType === 'bac' && (
        <div className="mt-8 bg-gray-50 rounded-lg p-6 border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Séries disponibles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg border border-gray-200">
              <h3 className="font-semibold mb-2">Série A</h3>
              <p className="text-sm text-gray-600">Littéraire</p>
            </div>
            <div className="p-4 bg-white rounded-lg border border-gray-200">
              <h3 className="font-semibold mb-2">Série B</h3>
              <p className="text-sm text-gray-600">Économique</p>
            </div>
            <div className="p-4 bg-white rounded-lg border border-gray-200">
              <h3 className="font-semibold mb-2">Série C</h3>
              <p className="text-sm text-gray-600">Mathématiques et Sciences Physiques</p>
            </div>
            <div className="p-4 bg-white rounded-lg border border-gray-200">
              <h3 className="font-semibold mb-2">Série D</h3>
              <p className="text-sm text-gray-600">Sciences de la Vie et de la Terre</p>
            </div>
            <div className="p-4 bg-white rounded-lg border border-gray-200">
              <h3 className="font-semibold mb-2">Série G1</h3>
              <p className="text-sm text-gray-600">Techniques Administratives</p>
            </div>
            <div className="p-4 bg-white rounded-lg border border-gray-200">
              <h3 className="font-semibold mb-2">Série G2</h3>
              <p className="text-sm text-gray-600">Techniques Quantitatives de Gestion</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamSubjects;