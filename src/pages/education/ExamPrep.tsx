import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, BookOpen, FileText, CheckCircle } from 'lucide-react';
import Card, { CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const ExamPrep: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <h1 className="text-3xl font-bold mb-2">Préparation aux examens</h1>
      <p className="text-gray-600 max-w-3xl mb-8">
        Préparez-vous efficacement pour vos examens avec nos ressources complètes.
        Accédez aux sujets des années précédentes et leurs corrigés détaillés.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* BEPC Section */}
        <Card className="hover:border-blue-500 transition-all cursor-pointer"
              onClick={() => navigate('/exam-prep/bepc/subjects')}>
          <CardHeader>
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 rounded-full p-4 mr-4">
                <BookOpen className="h-8 w-8 text-blue-800" />
              </div>
              <CardTitle>Préparation BEPC</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-6">
              Sujets et corrigés du BEPC des années précédentes pour toutes les matières.
              Idéal pour les élèves de 3ème.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span>Sujets des 5 dernières années</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span>Corrigés détaillés</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span>Conseils méthodologiques</span>
              </li>
            </ul>
            <Button variant="primary" fullWidth>
              Accéder aux ressources BEPC
            </Button>
          </CardContent>
        </Card>

        {/* BAC Section */}
        <Card className="hover:border-orange-500 transition-all cursor-pointer"
              onClick={() => navigate('/exam-prep/bac/subjects')}>
          <CardHeader>
            <div className="flex items-center mb-4">
              <div className="bg-orange-100 rounded-full p-4 mr-4">
                <GraduationCap className="h-8 w-8 text-orange-500" />
              </div>
              <CardTitle>Préparation BAC</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-6">
              Sujets et corrigés du BAC des années précédentes pour toutes les séries.
              Parfait pour les élèves en Terminale.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span>Sujets par série (A, C, D, G)</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span>Corrigés types</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span>Conseils pour l'examen</span>
              </li>
            </ul>
            <Button variant="secondary" fullWidth>
              Accéder aux ressources BAC
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Study Tips Section */}
      <div className="mt-12 bg-gray-50 rounded-lg p-8 border border-gray-200">
        <h2 className="text-2xl font-bold mb-6">Conseils pour réussir vos examens</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg border border-gray-100">
            <div className="flex items-center mb-4">
              <FileText className="h-6 w-6 text-blue-800 mr-2" />
              <h3 className="font-semibold">Organisation</h3>
            </div>
            <p className="text-gray-600">
              Établissez un planning de révision équilibré. Alternez les matières
              et prévoyez des pauses régulières.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg border border-gray-100">
            <div className="flex items-center mb-4">
              <BookOpen className="h-6 w-6 text-blue-800 mr-2" />
              <h3 className="font-semibold">Méthodologie</h3>
            </div>
            <p className="text-gray-600">
              Entraînez-vous avec les annales dans les conditions d'examen.
              Chronométrez-vous régulièrement.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg border border-gray-100">
            <div className="flex items-center mb-4">
              <GraduationCap className="h-6 w-6 text-blue-800 mr-2" />
              <h3 className="font-semibold">Préparation</h3>
            </div>
            <p className="text-gray-600">
              Identifiez vos points faibles et concentrez-vous sur leur amélioration.
              N'hésitez pas à demander de l'aide.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamPrep;