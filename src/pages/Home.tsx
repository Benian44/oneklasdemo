import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Book, GraduationCap, Users, Award, Clock, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useContent } from '../contexts/ContentContext';
import Button from '../components/ui/Button';
import Card, { CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Logo from '../components/common/Logo';

// Sans tagline
<Logo />

// Avec tagline
<Logo showTagline />


const Home: React.FC = () => {
  const { currentUser } = useAuth();
  const { cycles, classes, getClassById } = useContent();
  const navigate = useNavigate();

  // Get user's class info
  const userClass = currentUser?.classId ? getClassById(currentUser.classId) : null;

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Bienvenue, {currentUser?.firstName}!
              </h1>
              <p className="text-blue-100 text-lg mb-6">
                Continuez votre parcours éducatif avec OneKlas.
                Accédez à des cours de qualité pour votre niveau scolaire.
              </p>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => navigate('/cycles')}
                  leftIcon={<Book className="h-5 w-5" />}
                >
                  Accéder aux cours
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-white text-blue-800 hover:bg-blue-50"
                  onClick={() => navigate('/tutoring')}
                  leftIcon={<GraduationCap className="h-5 w-5" />}
                >
                  Services de tutorat
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img
                src="https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Étudiants apprenant"
                className="rounded-lg shadow-lg max-w-full h-auto"
                style={{ maxHeight: '350px' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Current Class Section */}
      {userClass && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="section-title mb-8">Votre classe actuelle</h2>
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 mb-8">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="flex items-center mb-4 md:mb-0">
                  <div className="bg-blue-100 rounded-full p-3 mr-4">
                    <GraduationCap className="h-8 w-8 text-blue-800" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{userClass.name}</h3>
                    <p className="text-gray-600">{userClass.description}</p>
                  </div>
                </div>
                <Button
                  variant="primary"
                  onClick={() => navigate(`/classes/${userClass.id}/subjects`)}
                >
                  Voir mes matières
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Cycles Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="section-title mb-8">Cycles d'études</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {cycles.map((cycle) => (
              <Card 
                key={cycle.id} 
                className="cycle-card"
                hoverable
                onClick={() => navigate(`/cycles/${cycle.id}/classes`)}
              >
                <CardHeader>
                  <div className="flex items-center mb-4">
                    {cycle.icon === 'school' ? (
                      <Book className="h-8 w-8 text-blue-800 mr-3" />
                    ) : (
                      <GraduationCap className="h-8 w-8 text-blue-800 mr-3" />
                    )}
                    <CardTitle>{cycle.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{cycle.description}</p>
                  <Button 
                    variant="outline"
                    className="mt-2"
                    fullWidth
                  >
                    Découvrir les classes
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="section-title mb-8">Pourquoi choisir OneKlas?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 border border-gray-100 rounded-lg hover:shadow-md transition-shadow">
              <div className="bg-blue-100 rounded-full p-3 mb-4">
                <Book className="h-6 w-6 text-blue-800" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Contenus de Qualité</h3>
              <p className="text-gray-600">
                Accédez à des cours et exercices de qualité, conformes au programme national ivoirien.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 border border-gray-100 rounded-lg hover:shadow-md transition-shadow">
              <div className="bg-orange-100 rounded-full p-3 mb-4">
                <Clock className="h-6 w-6 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Apprentissage Flexible</h3>
              <p className="text-gray-600">
                Étudiez à votre propre rythme, n'importe où et n'importe quand.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 border border-gray-100 rounded-lg hover:shadow-md transition-shadow">
              <div className="bg-green-100 rounded-full p-3 mb-4">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Tutorat Personnalisé</h3>
              <p className="text-gray-600">
                Bénéficiez de cours particuliers et d'un accompagnement pédagogique adapté.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 border border-gray-100 rounded-lg hover:shadow-md transition-shadow">
              <div className="bg-purple-100 rounded-full p-3 mb-4">
                <Award className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Ressources Complètes</h3>
              <p className="text-gray-600">
                Des PDF téléchargeables pour chaque leçon et des exercices pratiques.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 border border-gray-100 rounded-lg hover:shadow-md transition-shadow">
              <div className="bg-red-100 rounded-full p-3 mb-4">
                <CheckCircle className="h-6 w-6 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Accès Gratuit</h3>
              <p className="text-gray-600">
                Contenus pédagogiques accessibles gratuitement pour tous les élèves.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 border border-gray-100 rounded-lg hover:shadow-md transition-shadow">
              <div className="bg-indigo-100 rounded-full p-3 mb-4">
                <GraduationCap className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Préparation Complète</h3>
              <p className="text-gray-600">
                Préparez efficacement vos examens et concours avec nos ressources.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Prêt à commencer votre apprentissage?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Accédez à tous nos cours et ressources pédagogiques pour améliorer vos connaissances
            et préparer efficacement vos examens.
          </p>
          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate('/cycles')}
          >
            Explorer les cours
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;