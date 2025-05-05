import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Languages, Calculator, FlaskRound as Flask, Microscope, Landmark, Globe, Brain, TrendingUp, DollarSign, PieChart, Briefcase, ArrowRight } from 'lucide-react';
import { useContent } from '../../contexts/ContentContext';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Logo from '../components/common/Logo';

// Sans tagline
<Logo />

// Avec tagline
<Logo showTagline />


const Subjects: React.FC = () => {
  const { classId } = useParams<{ classId: string }>();
  const { getClassById, getSubjectsByClass } = useContent();
  const navigate = useNavigate();

  // Get class data
  const classData = classId ? getClassById(classId) : undefined;
  
  // Get subjects for this class
  const subjects = classId ? getSubjectsByClass(classId) : [];

  if (!classData) {
    return (
      <div className="page-container">
        <p>Classe non trouvée</p>
        <Link to="/cycles">Retour aux cycles</Link>
      </div>
    );
  }

  // Function to get icon component based on subject icon string
  const getSubjectIcon = (iconName: string) => {
    const iconProps = { className: 'h-6 w-6' };
    
    switch (iconName) {
      case 'book-open': return <BookOpen {...iconProps} />;
      case 'languages': return <Languages {...iconProps} />;
      case 'calculator': return <Calculator {...iconProps} />;
      case 'flask': return <Flask {...iconProps} />;
      case 'microscope': return <Microscope {...iconProps} />;
      case 'landmark': return <Landmark {...iconProps} />;
      case 'globe': return <Globe {...iconProps} />;
      case 'brain': return <Brain {...iconProps} />;
      case 'trending-up': return <TrendingUp {...iconProps} />;
      case 'dollar-sign': return <DollarSign {...iconProps} />;
      case 'pie-chart': return <PieChart {...iconProps} />;
      case 'briefcase': return <Briefcase {...iconProps} />;
      default: return <BookOpen {...iconProps} />;
    }
  };

  // Group subjects by category
  const groupedSubjects = subjects.reduce((groups: Record<string, typeof subjects>, subject) => {
    const category = getSubjectCategory(subject.name);
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(subject);
    return groups;
  }, {});

  // Function to determine subject category
  function getSubjectCategory(subjectName: string): string {
    const scienceSubjects = ['Physique-Chimie', 'SVT', 'Mathématiques'];
    const languageSubjects = ['Français', 'Anglais'];
    const humanitiesSubjects = ['Histoire', 'Géographie', 'Philosophie', 'Économie'];
    const technicalSubjects = ['Comptabilité Générale', 'Comptabilité Analytique', 'Comptabilité Société'];
    
    if (scienceSubjects.includes(subjectName)) return 'Sciences';
    if (languageSubjects.includes(subjectName)) return 'Langues';
    if (humanitiesSubjects.includes(subjectName)) return 'Sciences Humaines';
    if (technicalSubjects.includes(subjectName)) return 'Enseignement Technique';
    
    return 'Autres';
  }

  return (
    <div className="page-container">
      {/* Breadcrumb */}
      <nav className="flex items-center text-sm text-gray-500 mb-6">
        <Link to="/cycles" className="hover:text-blue-800">
          Cycles
        </Link>
        <span className="mx-2">/</span>
        <Link to={`/cycles/${classData.cycleId}/classes`} className="hover:text-blue-800">
          Classes
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 font-medium">{classData.name}</span>
      </nav>

      <div className="flex items-center justify-between mb-6">
        <div>
          <Link to={`/cycles/${classData.cycleId}/classes`} className="text-blue-700 hover:text-blue-800 flex items-center mb-2">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Retour aux classes
          </Link>
          <h1 className="text-3xl font-bold">{classData.name}</h1>
          <p className="text-gray-600 mt-1">{classData.description}</p>
        </div>
      </div>

      {Object.keys(groupedSubjects).map((category) => (
        <div key={category} className="mb-10">
          <h2 className="section-title mb-6">{category}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {groupedSubjects[category].map((subject) => (
              <Card 
                key={subject.id} 
                className="subject-card"
                hoverable
                onClick={() => navigate(`/subjects/${subject.id}/lessons`)}
              >
                <div className={`w-12 h-12 rounded-full ${
                  category === 'Sciences' ? 'bg-blue-100' : 
                  category === 'Langues' ? 'bg-green-100' : 
                  category === 'Sciences Humaines' ? 'bg-purple-100' : 
                  'bg-orange-100'
                } flex items-center justify-center mr-4 flex-shrink-0`}>
                  {getSubjectIcon(subject.icon)}
                </div>
                <div className="flex-grow">
                  <h3 className="font-semibold text-lg">{subject.name}</h3>
                  <p className="text-sm text-gray-500">{subject.description}</p>
                  <div className="mt-2">
                    <Button 
                      variant="outline"
                      size="sm"
                      className="text-xs"
                      rightIcon={<ArrowRight className="h-3 w-3" />}
                    >
                      Voir les leçons
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      ))}
      
      {subjects.length === 0 && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                Aucune matière disponible pour cette classe actuellement.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Subjects;