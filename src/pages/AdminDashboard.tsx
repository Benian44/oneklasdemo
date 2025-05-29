import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, BookOpen, BookPlus, Upload, 
  FilePlus, UserPlus, PlusCircle, Search,
  Edit, Trash, CheckCircle, GraduationCap, User, Dumbbell, HelpCircle
} from 'lucide-react';
import { useContent } from '../contexts/ContentContext';
import Button from '../components/ui/Button';
import Card, { CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Input from '../components/ui/Input';
import HomeworkManager from '../components/admin/HomeworkManager';
import QuizManager from '../components/admin/QuizManager';
import HelpRequestManager from '../components/admin/HelpRequestManager';
import TutoringManager from '../components/admin/TutoringManager';

interface StoredUser {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  dateOfBirth: string;
  city: string;
  address: string;
  cycleId: string;
  classId: string;
  userType: 'student' | 'parent' | 'teacher';
  isAdmin?: boolean;
  createdAt: string;
  qualifications?: string;
  subjectIds?: string[];
  childrenIds?: string[];
}

const AdminDashboard: React.FC = () => {
  const { cycles, classes, subjects, lessons } = useContent();
  const navigate = useNavigate();
  
  // State for active tab
  const [activeTab, setActiveTab] = useState<'dashboard' | 'students' | 'subjects' | 'lessons' | 'homework' | 'quiz' | 'help' | 'tutoring'>('dashboard');
  
  // State for search
  const [searchTerm, setSearchTerm] = useState('');
  
  // State for users
  const [users, setUsers] = useState<StoredUser[]>([]);

  // Load users from localStorage
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('oneklas_users') || '[]');
    setUsers(storedUsers);
  }, []);

  // Function to get user type icon
  const getUserTypeIcon = (userType: string) => {
    switch (userType) {
      case 'student':
        return <GraduationCap className="h-5 w-5 text-blue-600" />;
      case 'parent':
        return <Users className="h-5 w-5 text-green-600" />;
      case 'teacher':
        return <User className="h-5 w-5 text-purple-600" />;
      default:
        return <User className="h-5 w-5" />;
    }
  };

  // Function to get user type label
  const getUserTypeLabel = (userType: string) => {
    switch (userType) {
      case 'student':
        return 'Élève';
      case 'parent':
        return 'Parent';
      case 'teacher':
        return 'Enseignant';
      default:
        return userType;
    }
  };

  // Function to get class name
  const getClassName = (classId: string) => {
    return classes.find(c => c.id === classId)?.name || 'N/A';
  };

  // Function to delete user
  const handleDeleteUser = (userId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      const updatedUsers = users.filter(user => user.id !== userId);
      localStorage.setItem('oneklas_users', JSON.stringify(updatedUsers));
      setUsers(updatedUsers);
    }
  };

  // Filter users based on search term
  const filteredUsers = users.filter(user => 
    user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone.includes(searchTerm) ||
    user.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    getUserTypeLabel(user.userType).toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter subjects and lessons as before
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
                  <p className="text-gray-500 mb-1">Utilisateurs inscrits</p>
                  <p className="admin-stat">{users.length}</p>
                  <div className="mt-2 space-y-1">
                    <p className="text-sm text-gray-500">
                      {users.filter(u => u.userType === 'student').length} élèves
                    </p>
                    <p className="text-sm text-gray-500">
                      {users.filter(u => u.userType === 'parent').length} parents
                    </p>
                    <p className="text-sm text-gray-500">
                      {users.filter(u => u.userType === 'teacher').length} enseignants
                    </p>
                  </div>
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
                  {users.slice(-3).reverse().map((user, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="bg-blue-100 rounded-full p-2">
                        {getUserTypeIcon(user.userType)}
                      </div>
                      <div>
                        <p className="font-medium">Nouvel utilisateur inscrit</p>
                        <p className="text-sm">{user.firstName} {user.lastName} - {getUserTypeLabel(user.userType)}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(user.createdAt).toLocaleDateString('fr-FR', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
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
                    onClick={() => setActiveTab('lessons')}
                  >
                    <BookPlus className="h-6 w-6 mb-2" />
                    <span>Ajouter une leçon</span>
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="h-auto py-4 flex flex-col items-center justify-center"
                    onClick={() => setActiveTab('subjects')}
                  >
                    <Upload className="h-6 w-6 mb-2" />
                    <span>Gérer les matières</span>
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="h-auto py-4 flex flex-col items-center justify-center"
                    onClick={() => setActiveTab('students')}
                  >
                    <PlusCircle className="h-6 w-6 mb-2" />
                    <span>Gérer les utilisateurs</span>
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
                placeholder="Rechercher un utilisateur..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                leftIcon={<Search className="h-5 w-5" />}
                className="md:max-w-xs"
              />
            </div>
            
            <Card>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nom complet
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Classe
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ville
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date d'inscription
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {getUserTypeIcon(user.userType)}
                            <span className="ml-2">{getUserTypeLabel(user.userType)}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">
                            {user.firstName} {user.lastName}
                          </div>
                          {user.userType === 'teacher' && user.qualifications && (
                            <div className="text-sm text-gray-500">{user.qualifications}</div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-gray-900">{user.phone}</div>
                          <div className="text-sm text-gray-500">{user.address}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-gray-500">
                            {user.userType === 'student' ? getClassName(user.classId) : '-'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-gray-500">{user.city}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-gray-500">
                            {new Date(user.createdAt).toLocaleDateString('fr-FR')}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-blue-700"
                            onClick={() => {
                              // Implement edit functionality
                              alert('Fonctionnalité de modification à venir');
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600"
                            onClick={() => handleDeleteUser(user.id)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {filteredUsers.length === 0 && (
                <div className="text-center py-6">
                  <p className="text-gray-500">Aucun utilisateur trouvé</p>
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
                onClick={() => {
                  alert('Fonctionnalité d\'ajout de matière à venir');
                }}
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
                        onClick={() => {
                          alert('Fonctionnalité de modification à venir');
                        }}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Modifier
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 border-red-200 hover:bg-red-50"
                        onClick={() => {
                          alert('Fonctionnalité de suppression à venir');
                        }}
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
                onClick={() => {
                  alert('Fonctionnalité d\'ajout de leçon à venir');
                }}
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
                            <div className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Vidéo
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-blue-700"
                            onClick={() => {
                              alert('Fonctionnalité de modification à venir');
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600"
                            onClick={() => {
                              alert('Fonctionnalité de suppression à venir');
                            }}
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
        
      case 'homework':
        return <HomeworkManager />;
        
      case 'quiz':
        return <QuizManager />;
        
      case 'help':
        return <HelpRequestManager />;
        
      case 'tutoring':
        return <TutoringManager />;
        
      default:
        return null;
    }
  };

  return (
    <div className="page-container">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-1">Administration</h1>
          <p className="text-gray-600">Gérez les contenus, les utilisateurs et les paramètres de la plateforme</p>
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
          Utilisateurs
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
        <button
          className={`py-3 px-5 border-b-2 font-medium ${
            activeTab === 'homework' 
              ? 'border-blue-500 text-blue-600' 
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
          onClick={() => setActiveTab('homework')}
        >
          Devoirs Corrigés
        </button>
        <button
          className={`py-3 px-5 border-b-2 font-medium ${
            activeTab === 'quiz' 
              ? 'border-blue-500 text-blue-600' 
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
          onClick={() => setActiveTab('quiz')}
        >
          Quiz
        </button>
        <button
          className={`py-3 px-5 border-b-2 font-medium ${
            activeTab === 'help' 
              ? 'border-blue-500 text-blue-600' 
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
          onClick={() => setActiveTab('help')}
        >
          Demandes d'aide
        </button>
        <button
          className={`py-3 px-5 border-b-2 font-medium ${
            activeTab === 'tutoring' 
              ? 'border-blue-500 text-blue-600' 
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
          onClick={() => setActiveTab('tutoring')}
        >
          Cours à domicile
        </button>
      </div>

      {/* Content based on active tab */}
      {renderContent()}
    </div>
  );
};

export default AdminDashboard;