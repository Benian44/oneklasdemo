import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, BookOpen, BookPlus, Upload, 
  FilePlus, UserPlus, PlusCircle, Search,
  Edit, Trash, CheckCircle
} from 'lucide-react';
import { useContent } from '../contexts/ContentContext';
import Button from '../components/ui/Button';
import Card, { CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Input from '../components/ui/Input';

const AdminDashboard: React.FC = () => {
  const { cycles, classes, subjects, lessons } = useContent();
  const navigate = useNavigate();
  
  // State for active tab
  const [activeTab, setActiveTab] = useState<'dashboard' | 'students' | 'subjects' | 'lessons'>('dashboard');
  
  // State for search
  const [searchTerm, setSearchTerm] = useState('');
  
  // Demo state for students (would come from API in real app)
  const [students] = useState([
    { id: '1', name: 'Aya Koné', class: '3ème', cycle: 'Collège', lastActive: '2 heures' },
    { id: '2', name: 'Mamadou Touré', class: '1ère D', cycle: 'Lycée', lastActive: '1 jour' },
    { id: '3', name: 'Sophie Diallo', class: 'Tle C', cycle: 'Lycée', lastActive: '5 heures' },
    { id: '4', name: 'Ibrahim Bamba', class: '6ème', cycle: 'Collège', lastActive: '3 jours' },
    { id: '5', name: 'Fatou Cissé', class: '2nd G1', cycle: 'Lycée', lastActive: '1 semaine' },
  ]);
  
  // Function to filter data based on search term
  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.cycle.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredSubjects = subjects.filter(subject => 
    subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subject.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredLessons = lessons.filter(lesson => 
    lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lesson.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="admin-card">
                <div className="flex flex-col">
                  <p className="text-gray-500 mb-1">Élèves inscrits</p>
                  <p className="admin-stat">{students.length}</p>
                </div>
                <div className="mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setActiveTab('students')}
                  >
                    Voir tous
                  </Button>
                </div>
              </Card>
              <Card className="admin-card">
                <div className="flex flex-col">
                  <p className="text-gray-500 mb-1">Matières</p>
                  <p className="admin-stat">{subjects.length}</p>
                </div>
                <div className="mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setActiveTab('subjects')}
                  >
                    Voir toutes
                  </Button>
                </div>
              </Card>
              <Card className="admin-card">
                <div className="flex flex-col">
                  <p className="text-gray-500 mb-1">Leçons</p>
                  <p className="admin-stat">{lessons.length}</p>
                </div>
                <div className="mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setActiveTab('lessons')}
                  >
                    Voir toutes
                  </Button>
                </div>
              </Card>
              <Card className="admin-card">
                <div className="flex flex-col">
                  <p className="text-gray-500 mb-1">Classes</p>
                  <p className="admin-stat">{classes.length}</p>
                </div>
                <div className="mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                  >
                    Détails
                  </Button>
                </div>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Activité récente</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-100 rounded-full p-2">
                      <FilePlus className="h-5 w-5 text-blue-800" />
                    </div>
                    <div>
                      <p className="font-medium">Nouveau document ajouté</p>
                      <p className="text-sm">Mathématiques - Cours pour 2nd C</p>
                      <p className="text-xs text-gray-500">Il y a 2 heures</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="bg-green-100 rounded-full p-2">
                      <UserPlus className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">Nouvel élève inscrit</p>
                      <p className="text-sm">Kouamé Yao - Classe de 4ème</p>
                      <p className="text-xs text-gray-500">Il y a 5 heures</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="bg-purple-100 rounded-full p-2">
                      <Edit className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium">Contenu modifié</p>
                      <p className="text-sm">Anglais - Leçon 8 mise à jour</p>
                      <p className="text-xs text-gray-500">Il y a 1 jour</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Actions rapides</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button
                    variant="outline"
                    className="h-auto py-4 flex flex-col items-center justify-center"
                  >
                    <BookPlus className="h-6 w-6 mb-2" />
                    <span>Ajouter une leçon</span>
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="h-auto py-4 flex flex-col items-center justify-center"
                  >
                    <Upload className="h-6 w-6 mb-2" />
                    <span>Téléverser un PDF</span>
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="h-auto py-4 flex flex-col items-center justify-center"
                  >
                    <PlusCircle className="h-6 w-6 mb-2" />
                    <span>Créer une matière</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );
        
      case 'students':
        return (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <Input
                placeholder="Rechercher un élève..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                leftIcon={<Search className="h-5 w-5" />}
                className="md:max-w-xs"
              />
              
              <Button
                variant="primary"
                leftIcon={<UserPlus className="h-5 w-5" />}
              >
                Ajouter un élève
              </Button>
            </div>
            
            <Card>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nom
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Classe
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Cycle
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Dernière connexion
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredStudents.map((student) => (
                      <tr key={student.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">{student.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-gray-500">{student.class}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-gray-500">{student.cycle}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-gray-500">{student.lastActive}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-blue-700"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600"
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {filteredStudents.length === 0 && (
                <div className="text-center py-6">
                  <p className="text-gray-500">Aucun élève trouvé</p>
                </div>
              )}
            </Card>
          </div>
        );
        
      case 'subjects':
        return (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <Input
                placeholder="Rechercher une matière..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                leftIcon={<Search className="h-5 w-5" />}
                className="md:max-w-xs"
              />
              
              <Button
                variant="primary"
                leftIcon={<BookPlus className="h-5 w-5" />}
              >
                Ajouter une matière
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSubjects.map((subject) => (
                <Card key={subject.id} className="admin-card">
                  <CardHeader className="pb-0">
                    <CardTitle>{subject.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-500 text-sm mb-4">{subject.description}</p>
                    <p className="text-xs text-gray-400 mb-2">
                      Associé à {subject.classIds.length} classes
                    </p>
                    <div className="flex space-x-2 mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Modifier
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 border-red-200 hover:bg-red-50"
                      >
                        <Trash className="h-4 w-4 mr-1" />
                        Supprimer
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            {filteredSubjects.length === 0 && (
              <div className="text-center py-6 bg-white rounded-lg shadow">
                <p className="text-gray-500">Aucune matière trouvée</p>
              </div>
            )}
          </div>
        );
        
      case 'lessons':
        return (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <Input
                placeholder="Rechercher une leçon..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                leftIcon={<Search className="h-5 w-5" />}
                className="md:max-w-xs"
              />
              
              <Button
                variant="primary"
                leftIcon={<FilePlus className="h-5 w-5" />}
              >
                Ajouter une leçon
              </Button>
            </div>
            
            <Card>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Titre
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Matière
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Fichiers
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredLessons.slice(0, 10).map((lesson) => (
                      <tr key={lesson.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900">{lesson.title}</div>
                          <div className="text-xs text-gray-500">{lesson.description}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-gray-500">
                            {subjects.find(s => s.id === lesson.subjectId)?.name || 'N/A'}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            <div className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Cours
                            </div>
                            <div className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Exercices
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-blue-700"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600"
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {filteredLessons.length === 0 && (
                <div className="text-center py-6">
                  <p className="text-gray-500">Aucune leçon trouvée</p>
                </div>
              )}
            </Card>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="page-container">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-1">Administration</h1>
          <p className="text-gray-600">Gérez les contenus, les élèves et les paramètres de la plateforme</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-8">
        <button
          className={`py-3 px-5 border-b-2 font-medium ${
            activeTab === 'dashboard' 
              ? 'border-blue-500 text-blue-600' 
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
          onClick={() => setActiveTab('dashboard')}
        >
          Tableau de bord
        </button>
        <button
          className={`py-3 px-5 border-b-2 font-medium ${
            activeTab === 'students' 
              ? 'border-blue-500 text-blue-600' 
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
          onClick={() => setActiveTab('students')}
        >
          Élèves
        </button>
        <button
          className={`py-3 px-5 border-b-2 font-medium ${
            activeTab === 'subjects' 
              ? 'border-blue-500 text-blue-600' 
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
          onClick={() => setActiveTab('subjects')}
        >
          Matières
        </button>
        <button
          className={`py-3 px-5 border-b-2 font-medium ${
            activeTab === 'lessons' 
              ? 'border-blue-500 text-blue-600' 
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
          onClick={() => setActiveTab('lessons')}
        >
          Leçons
        </button>
      </div>

      {/* Content based on active tab */}
      {renderContent()}
    </div>
  );
};

export default AdminDashboard;