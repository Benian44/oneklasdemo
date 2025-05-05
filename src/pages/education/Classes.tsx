import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { GraduationCap, ArrowLeft, ArrowRight } from 'lucide-react';
import { useContent } from '../../contexts/ContentContext';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Logo from '../components/common/Logo';

// Sans tagline
<Logo />

// Avec tagline
<Logo showTagline />


const Classes: React.FC = () => {
  const { cycleId } = useParams<{ cycleId: string }>();
  const { getCycleById, getClassesByCycle } = useContent();
  const navigate = useNavigate();

  // Get cycle data
  const cycle = cycleId ? getCycleById(cycleId) : undefined;
  
  // Get classes for this cycle
  const classes = cycleId ? getClassesByCycle(cycleId) : [];

  if (!cycle) {
    return (
      <div className="page-container">
        <p>Cycle non trouvé</p>
        <Link to="/cycles">Retour aux cycles</Link>
      </div>
    );
  }

  return (
    <div className="page-container">
      {/* Breadcrumb */}
      <nav className="flex items-center text-sm text-gray-500 mb-6">
        <Link to="/cycles" className="hover:text-blue-800 flex items-center">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Cycles
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 font-medium">{cycle.name}</span>
      </nav>

      <h1 className="text-3xl font-bold mb-2">{cycle.name}</h1>
      <p className="text-gray-600 mb-8">{cycle.description}</p>

      <div className="mb-8">
        <h2 className="section-title">Classes disponibles</h2>
        <p className="text-gray-600 mt-4 mb-6">
          Sélectionnez votre classe pour accéder aux matières et aux leçons correspondantes.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {classes.map((classItem) => (
          <Card 
            key={classItem.id} 
            className="class-card"
            hoverable
            onClick={() => navigate(`/classes/${classItem.id}/subjects`)}
          >
            <div className="flex flex-col items-center justify-center">
              <div className={`w-16 h-16 rounded-full ${cycleId === '1' ? 'bg-blue-100' : 'bg-orange-100'} flex items-center justify-center mb-3`}>
                <GraduationCap className={`h-8 w-8 ${cycleId === '1' ? 'text-blue-800' : 'text-orange-500'}`} />
              </div>
              <h3 className="text-lg font-semibold text-center">{classItem.name}</h3>
              <p className="text-sm text-gray-500 text-center mt-1 line-clamp-2">{classItem.description}</p>
            </div>
            <div className="mt-4 w-full">
              <Button 
                variant="outline"
                size="sm"
                fullWidth
                rightIcon={<ArrowRight className="h-4 w-4" />}
              >
                Matières
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-12 bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h3 className="text-xl font-semibold mb-3">À propos de {cycle.name}</h3>
        {cycleId === '1' ? (
          <div>
            <p className="text-gray-700 mb-3">
              Le collège en Côte d'Ivoire correspond au premier cycle de l'enseignement secondaire, 
              réparti sur quatre années : la 6ème, la 5ème, la 4ème et la 3ème.
            </p>
            <p className="text-gray-700">
              Cette étape est sanctionnée par le Brevet d'Études du Premier Cycle (BEPC), 
              qui permet d'accéder au second cycle (lycée).
            </p>
          </div>
        ) : (
          <div>
            <p className="text-gray-700 mb-3">
              Le lycée en Côte d'Ivoire correspond au second cycle de l'enseignement secondaire, 
              avec plusieurs filières disponibles :
            </p>
            <ul className="list-disc pl-5 text-gray-700 space-y-1">
              <li>L'enseignement général propose les séries A, C et D.</li>
              <li>L'enseignement technique propose les séries B, G1, G2 et autres filières professionnelles.</li>
              <li>Le cycle se termine par l'obtention du Baccalauréat, diplôme donnant accès à l'enseignement supérieur.</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Classes;