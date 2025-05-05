import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, Phone, Calendar, Home, MapPin, GraduationCap, 
  ChevronDown, Save, LogOut, BookOpen, History, Bell 
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useContent } from '../contexts/ContentContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card, { CardContent, CardHeader, CardTitle } from '../components/ui/Card';

const Profile: React.FC = () => {
  const { currentUser, updateUser, logout } = useAuth();
  const { cycles, classes, getClassesByCycle } = useContent();
  const navigate = useNavigate();

  // Available cities
  const cities = [
    'Abidjan', 'Bouaké', 'Yamoussoukro', 'Divo', 
    'Dimbokro', 'Dabou', 'Toumodi'
  ];

  // Form state initialization
  const [formData, setFormData] = useState({
    firstName: currentUser?.firstName || '',
    lastName: currentUser?.lastName || '',
    dateOfBirth: currentUser?.dateOfBirth || '',
    city: currentUser?.city || '',
    address: currentUser?.address || '',
    phone: currentUser?.phone || '',
    cycleId: currentUser?.cycleId || '',
    classId: currentUser?.classId || ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [selectedCycleClasses, setSelectedCycleClasses] = useState<any[]>(
    formData.cycleId ? getClassesByCycle(formData.cycleId) : []
  );

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Handle cycle change to update available classes
    if (name === 'cycleId') {
      const cycleClasses = getClassesByCycle(value);
      setSelectedCycleClasses(cycleClasses);
      setFormData(prev => ({ ...prev, classId: '' })); // Reset class selection
    }
  };

  // Save profile changes
  const handleSaveProfile = () => {
    updateUser(formData);
    setIsEditing(false);
  };

  // Toggle edit mode
  const toggleEditMode = () => {
    if (isEditing) {
      // Reset form data if canceling edit
      setFormData({
        firstName: currentUser?.firstName || '',
        lastName: currentUser?.lastName || '',
        dateOfBirth: currentUser?.dateOfBirth || '',
        city: currentUser?.city || '',
        address: currentUser?.address || '',
        phone: currentUser?.phone || '',
        cycleId: currentUser?.cycleId || '',
        classId: currentUser?.classId || ''
      });
    }
    setIsEditing(!isEditing);
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Get class and cycle names
  const currentClass = classes.find(c => c.id === formData.classId);
  const currentCycle = cycles.find(c => c.id === formData.cycleId);

  return (
    <div className="page-container">
      <h1 className="text-3xl font-bold mb-6">Mon Profil</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Profile Information */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="border-b pb-3">
              <div className="flex justify-between items-center">
                <CardTitle>Informations personnelles</CardTitle>
                <div>
                  {isEditing ? (
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        onClick={toggleEditMode}
                      >
                        Annuler
                      </Button>
                      <Button
                        variant="primary"
                        onClick={handleSaveProfile}
                        leftIcon={<Save className="h-4 w-4" />}
                      >
                        Enregistrer
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="outline"
                      onClick={toggleEditMode}
                    >
                      Modifier
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    label="Prénom"
                    value={formData.firstName}
                    onChange={handleChange}
                    leftIcon={<User className="h-5 w-5" />}
                    disabled={!isEditing}
                  />
                  
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    label="Nom"
                    value={formData.lastName}
                    onChange={handleChange}
                    leftIcon={<User className="h-5 w-5" />}
                    disabled={!isEditing}
                  />
                  
                  <Input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    label="Date de naissance"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    leftIcon={<Calendar className="h-5 w-5" />}
                    disabled={!isEditing}
                  />
                  
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    label="Numéro de téléphone"
                    value={formData.phone}
                    onChange={handleChange}
                    leftIcon={<Phone className="h-5 w-5" />}
                    disabled={!isEditing}
                  />
                </div>

                <div className="pt-4 border-t">
                  <h3 className="text-lg font-medium mb-4">Adresse</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-control">
                      <label className="label" htmlFor="city">Ville</label>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500">
                          <MapPin className="h-5 w-5" />
                        </div>
                        <select
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          className="select pl-10"
                          disabled={!isEditing}
                        >
                          <option value="">Sélectionnez votre ville</option>
                          {cities.map(city => (
                            <option key={city} value={city}>{city}</option>
                          ))}
                        </select>
                        {isEditing && (
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 pointer-events-none">
                            <ChevronDown className="h-4 w-4" />
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <Input
                      id="address"
                      name="address"
                      type="text"
                      label="Adresse"
                      value={formData.address}
                      onChange={handleChange}
                      leftIcon={<Home className="h-5 w-5" />}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h3 className="text-lg font-medium mb-4">Niveau scolaire</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-control">
                      <label className="label" htmlFor="cycleId">Cycle</label>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500">
                          <GraduationCap className="h-5 w-5" />
                        </div>
                        <select
                          id="cycleId"
                          name="cycleId"
                          value={formData.cycleId}
                          onChange={handleChange}
                          className="select pl-10"
                          disabled={!isEditing}
                        >
                          <option value="">Sélectionnez votre cycle</option>
                          {cycles.map(cycle => (
                            <option key={cycle.id} value={cycle.id}>{cycle.name}</option>
                          ))}
                        </select>
                        {isEditing && (
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 pointer-events-none">
                            <ChevronDown className="h-4 w-4" />
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="form-control">
                      <label className="label" htmlFor="classId">Classe</label>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500">
                          <GraduationCap className="h-5 w-5" />
                        </div>
                        <select
                          id="classId"
                          name="classId"
                          value={formData.classId}
                          onChange={handleChange}
                          className="select pl-10"
                          disabled={!isEditing || !formData.cycleId}
                        >
                          <option value="">Sélectionnez votre classe</option>
                          {selectedCycleClasses.map(cls => (
                            <option key={cls.id} value={cls.id}>{cls.name}</option>
                          ))}
                        </select>
                        {isEditing && (
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 pointer-events-none">
                            <ChevronDown className="h-4 w-4" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Educational Summary */}
          <Card>
            <CardHeader className="border-b pb-3">
              <CardTitle>Information scolaire</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex flex-col space-y-4">
                <div>
                  <div className="text-sm text-gray-500">Cycle actuel</div>
                  <div className="font-medium">{currentCycle?.name || 'Non défini'}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Classe actuelle</div>
                  <div className="font-medium">{currentClass?.name || 'Non définie'}</div>
                </div>
                <div className="pt-2">
                  <Button
                    variant="outline"
                    fullWidth
                    leftIcon={<BookOpen className="h-4 w-4" />}
                    onClick={() => navigate('/cycles')}
                  >
                    Accéder à mes cours
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity - would be dynamic in a real app */}
          <Card>
            <CardHeader className="border-b pb-3">
              <CardTitle>Activité récente</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-100 rounded-full p-2">
                    <BookOpen className="h-4 w-4 text-blue-800" />
                  </div>
                  <div>
                    <p className="font-medium">Leçon consultée</p>
                    <p className="text-sm text-gray-500">Mathématiques - Leçon 3</p>
                    <p className="text-xs text-gray-400">Il y a 2 heures</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="bg-green-100 rounded-full p-2">
                    <History className="h-4 w-4 text-green-800" />
                  </div>
                  <div>
                    <p className="font-medium">Téléchargement PDF</p>
                    <p className="text-sm text-gray-500">Physique - Exercices</p>
                    <p className="text-xs text-gray-400">Il y a 1 jour</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="bg-orange-100 rounded-full p-2">
                    <Bell className="h-4 w-4 text-orange-500" />
                  </div>
                  <div>
                    <p className="font-medium">Nouveau cours ajouté</p>
                    <p className="text-sm text-gray-500">Français - Leçon 12</p>
                    <p className="text-xs text-gray-400">Il y a 3 jours</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Actions */}
          <Card>
            <CardHeader className="border-b pb-3">
              <CardTitle>Actions du compte</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-3">
                <Button
                  variant="outline"
                  fullWidth
                  className="justify-start text-left"
                  onClick={() => navigate('/tutoring')}
                >
                  <GraduationCap className="h-4 w-4 mr-2" />
                  Gérer mes services de tutorat
                </Button>
                
                <Button
                  variant="outline"
                  fullWidth
                  className="justify-start text-left"
                >
                  <Bell className="h-4 w-4 mr-2" />
                  Gérer les notifications
                </Button>
                
                <Button
                  variant="outline"
                  fullWidth
                  className="justify-start text-left text-red-500 hover:text-red-600 hover:bg-red-50"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Se déconnecter
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;