import React, { useState } from 'react';
import { CheckCircle, Users, Home, Clock, CreditCard } from 'lucide-react';
import Button from '../../components/ui/Button';
import Card, { CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import Logo from '../components/common/Logo';

// Sans tagline
<Logo />

// Avec tagline
<Logo showTagline />


interface TutoringOption {
  id: string;
  title: string;
  description: string;
  price: string;
  features: string[];
  recommended?: boolean;
}

const TutoringServices: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  
  // Available subjects
  const subjects = [
    { id: '1', name: 'Mathématiques' },
    { id: '2', name: 'Physique-Chimie' },
    { id: '3', name: 'SVT' },
    { id: '4', name: 'Français' },
    { id: '5', name: 'Anglais' },
    { id: '6', name: 'Histoire-Géographie' },
    { id: '7', name: 'Philosophie' },
    { id: '8', name: 'Économie' },
    { id: '9', name: 'Comptabilité' }
  ];

  // Tutoring options
  const tutoringOptions: TutoringOption[] = [
    {
      id: 'group',
      title: 'Cours en groupe',
      description: 'Rejoignez des sessions collectives avec d\'autres élèves',
      price: '5 000 FCFA / mois / matière',
      features: [
        'Cours hebdomadaires en petit groupe',
        'Accès aux supports de cours',
        'Exercices corrigés',
        'Suivi de progression',
      ]
    },
    {
      id: 'home-1',
      title: 'Cours à domicile (1 matière)',
      description: 'Un professeur se déplace chez vous pour un enseignement individuel',
      price: '40 000 FCFA / mois',
      features: [
        'Cours particuliers à votre domicile',
        'Horaires flexibles',
        'Programme personnalisé',
        'Suivi individuel',
      ]
    },
    {
      id: 'home-2',
      title: 'Cours à domicile (2 matières)',
      description: 'Un professeur se déplace chez vous pour un enseignement individuel',
      price: '35 000 FCFA / matière / mois',
      features: [
        'Cours particuliers à votre domicile',
        'Horaires flexibles',
        'Programme personnalisé',
        'Suivi individuel',
      ],
      recommended: true
    },
    {
      id: 'home-3',
      title: 'Cours à domicile (3 matières)',
      description: 'Un professeur se déplace chez vous pour un enseignement individuel',
      price: '30 000 FCFA / matière / mois',
      features: [
        'Cours particuliers à votre domicile',
        'Horaires flexibles',
        'Programme personnalisé',
        'Suivi individuel',
      ]
    },
    {
      id: 'home-4',
      title: 'Cours à domicile (4 matières ou plus)',
      description: 'Un professeur se déplace chez vous pour un enseignement individuel',
      price: '25 000 FCFA / matière / mois',
      features: [
        'Cours particuliers à votre domicile',
        'Horaires flexibles',
        'Programme personnalisé',
        'Suivi individuel',
      ]
    }
  ];

  // Toggle subject selection
  const toggleSubject = (subjectId: string) => {
    if (selectedSubjects.includes(subjectId)) {
      setSelectedSubjects(selectedSubjects.filter(id => id !== subjectId));
    } else {
      setSelectedSubjects([...selectedSubjects, subjectId]);
    }
  };

  // Calculate total based on selection
  const calculateTotal = () => {
    if (!selectedOption) return 0;
    
    const option = tutoringOptions.find(opt => opt.id === selectedOption);
    if (!option) return 0;
    
    // Get price from the selected option
    let pricePerSubject = 0;
    switch (selectedOption) {
      case 'group':
        pricePerSubject = 5000;
        break;
      case 'home-1':
        pricePerSubject = 40000;
        break;
      case 'home-2':
        pricePerSubject = 35000;
        break;
      case 'home-3':
        pricePerSubject = 30000;
        break;
      case 'home-4':
        pricePerSubject = 25000;
        break;
    }
    
    if (selectedOption === 'home-1' && selectedSubjects.length > 0) {
      return pricePerSubject; // Fixed price for 1 subject
    }
    
    return pricePerSubject * selectedSubjects.length;
  };

  return (
    <div className="page-container">
      <h1 className="text-3xl font-bold mb-2">Services de Tutorat</h1>
      <p className="text-gray-600 max-w-3xl mb-8">
        OneKlas propose des services de tutorat en présentiel pour vous aider à progresser dans vos études.
        Nos tuteurs qualifiés sont disponibles pour des cours en groupe ou à domicile.
      </p>

      {/* Tutoring Options */}
      <div className="mb-12">
        <h2 className="section-title mb-8">Nos formules</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutoringOptions.map((option) => (
            <Card 
              key={option.id} 
              className={`relative ${
                selectedOption === option.id 
                  ? 'border-blue-500 ring-2 ring-blue-200' 
                  : 'hover:border-gray-300'
              }`}
            >
              {option.recommended && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Recommandé
                </div>
              )}
              <CardHeader>
                <CardTitle>{option.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{option.description}</p>
                <p className="text-2xl font-bold text-blue-900 mb-4">{option.price}</p>
                <ul className="space-y-2 mb-6">
                  {option.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant={selectedOption === option.id ? 'primary' : 'outline'}
                  fullWidth
                  onClick={() => setSelectedOption(option.id)}
                >
                  {selectedOption === option.id ? 'Sélectionné' : 'Choisir cette formule'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Subject Selection (only shown if a tutoring option is selected) */}
      {selectedOption && (
        <div className="mb-12">
          <h2 className="section-title mb-8">Choisissez vos matières</h2>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {subjects.map((subject) => (
                <div 
                  key={subject.id}
                  className={`p-3 rounded-md border cursor-pointer transition-all ${
                    selectedSubjects.includes(subject.id)
                      ? 'bg-blue-50 border-blue-500'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => toggleSubject(subject.id)}
                >
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full mr-2 flex items-center justify-center ${
                      selectedSubjects.includes(subject.id)
                        ? 'bg-blue-500'
                        : 'border border-gray-300'
                    }`}>
                      {selectedSubjects.includes(subject.id) && (
                        <CheckCircle className="h-4 w-4 text-white" />
                      )}
                    </div>
                    <span>{subject.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="bg-blue-50 rounded-lg border border-blue-100 p-6">
            <h3 className="text-xl font-semibold text-blue-900 mb-4">Résumé de votre commande</h3>
            
            <div className="mb-4">
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Formule choisie:</span>
                <span className="font-medium">{tutoringOptions.find(opt => opt.id === selectedOption)?.title}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Nombre de matières:</span>
                <span className="font-medium">{selectedSubjects.length}</span>
              </div>
              <div className="flex justify-between py-2 border-t border-blue-200 mt-2">
                <span className="text-gray-800 font-medium">Total mensuel:</span>
                <span className="text-xl font-bold text-blue-900">{calculateTotal().toLocaleString()} FCFA</span>
              </div>
            </div>
            
            <Button
              variant="primary"
              fullWidth
              disabled={selectedSubjects.length === 0}
            >
              Réserver mes cours
            </Button>
            
            <div className="mt-4 text-sm text-blue-800">
              <div className="flex items-start mb-2">
                <Users className="h-4 w-4 mr-2 flex-shrink-0 mt-1" />
                <span>Des tuteurs qualifiés et expérimentés</span>
              </div>
              <div className="flex items-start mb-2">
                <Home className="h-4 w-4 mr-2 flex-shrink-0 mt-1" />
                <span>Cours à domicile dans toute la ville</span>
              </div>
              <div className="flex items-start mb-2">
                <Clock className="h-4 w-4 mr-2 flex-shrink-0 mt-1" />
                <span>Horaires flexibles selon vos disponibilités</span>
              </div>
              <div className="flex items-start">
                <CreditCard className="h-4 w-4 mr-2 flex-shrink-0 mt-1" />
                <span>Paiement sécurisé et facilités de paiement</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FAQ Section */}
      <div className="mb-8">
        <h2 className="section-title mb-8">Questions fréquentes</h2>
        
        <div className="space-y-4">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-2">Comment se déroulent les cours en groupe ?</h3>
            <p className="text-gray-600">
              Les cours en groupe se déroulent dans des centres partenaires avec un maximum de 8 élèves.
              Les sessions sont hebdomadaires et durent 2 heures par matière.
            </p>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-2">Les tuteurs se déplacent-ils dans toutes les villes ?</h3>
            <p className="text-gray-600">
              Actuellement, nos services de tutorat à domicile sont disponibles à Abidjan, Bouaké et Yamoussoukro.
              Pour les autres villes, contactez-nous pour vérifier la disponibilité.
            </p>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-2">Comment sont sélectionnés les tuteurs ?</h3>
            <p className="text-gray-600">
              Tous nos tuteurs sont des enseignants qualifiés ou des étudiants de niveau supérieur.
              Ils passent par un processus de sélection rigoureux et sont formés à notre méthode pédagogique.
            </p>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-2">Est-il possible d'annuler ou de modifier mon abonnement ?</h3>
            <p className="text-gray-600">
              Oui, vous pouvez modifier ou annuler votre abonnement avec un préavis de 15 jours.
              Pour les cours non pris, un avoir vous sera proposé.
            </p>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div>
        <h2 className="section-title mb-8">Ce que disent nos élèves</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <p className="italic text-gray-600 mb-4">
              "Grâce aux cours particuliers en mathématiques, j'ai pu rattraper mon retard et obtenir une excellente note au BEPC."
            </p>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                <span className="font-semibold text-blue-800">AF</span>
              </div>
              <div>
                <p className="font-semibold">Aya F.</p>
                <p className="text-sm text-gray-500">Élève de 3ème, Abidjan</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <p className="italic text-gray-600 mb-4">
              "Les cours en groupe m'ont permis de mieux comprendre la physique-chimie. Le professeur explique très bien et répond à toutes nos questions."
            </p>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                <span className="font-semibold text-green-800">KT</span>
              </div>
              <div>
                <p className="font-semibold">Kouamé T.</p>
                <p className="text-sm text-gray-500">Élève de 1ère D, Yamoussoukro</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <p className="italic text-gray-600 mb-4">
              "J'ai pris des cours à domicile pour 3 matières et j'ai vu mes résultats s'améliorer significativement. Je recommande vivement ce service."
            </p>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                <span className="font-semibold text-purple-800">SM</span>
              </div>
              <div>
                <p className="font-semibold">Sonia M.</p>
                <p className="text-sm text-gray-500">Élève de Tle A, Bouaké</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutoringServices;