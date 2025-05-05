import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Book, GraduationCap, ArrowRight } from 'lucide-react';
import { useContent } from '../../contexts/ContentContext';
import Button from '../../components/ui/Button';
import Card, { CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import Logo from '../components/common/Logo';

// Sans tagline
<Logo />

// Avec tagline
<Logo showTagline />


const Cycles: React.FC = () => {
  const { cycles } = useContent();
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <h1 className="text-3xl font-bold mb-6">Cycles d'études</h1>

      <div className="mb-8">
        <p className="text-gray-600 max-w-3xl">
          Choisissez votre cycle d'études pour accéder aux classes et matières correspondantes.
          OneKlas propose des ressources pédagogiques adaptées à chaque niveau.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        {cycles.map((cycle) => (
          <Card 
            key={cycle.id} 
            className="cycle-card h-full"
            hoverable
            onClick={() => navigate(`/cycles/${cycle.id}/classes`)}
          >
            <CardHeader>
              <div className="flex items-center mb-4">
                {cycle.icon === 'school' ? (
                  <div className="bg-blue-100 rounded-full p-4 mr-4">
                    <Book className="h-8 w-8 text-blue-800" />
                  </div>
                ) : (
                  <div className="bg-orange-100 rounded-full p-4 mr-4">
                    <GraduationCap className="h-8 w-8 text-orange-500" />
                  </div>
                )}
                <CardTitle className="text-2xl">{cycle.name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-6 min-h-[50px]">{cycle.description}</p>
              <Button 
                variant={cycle.id === '1' ? 'primary' : 'secondary'}
                className="mt-2"
                fullWidth
                rightIcon={<ArrowRight className="h-4 w-4" />}
              >
                Voir les classes
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-blue-50 p-6 rounded-lg mt-12">
        <h2 className="text-xl font-semibold text-blue-800 mb-3">Comment utiliser les ressources pédagogiques</h2>
        <ol className="list-decimal pl-6 text-gray-700 space-y-2">
          <li>Sélectionnez votre cycle d'études (Collège ou Lycée)</li>
          <li>Choisissez votre classe</li>
          <li>Naviguez parmi les matières disponibles pour votre niveau</li>
          <li>Accédez aux leçons et aux exercices en format PDF</li>
          <li>Téléchargez les documents pour les consulter hors ligne</li>
        </ol>
      </div>
    </div>
  );
};

export default Cycles;