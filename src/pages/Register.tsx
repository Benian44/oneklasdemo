import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Calendar, MapPin, Phone, Home, GraduationCap, ChevronDown, Lock, Eye, EyeOff, Users } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useContent } from '../contexts/ContentContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';

const Register: React.FC = () => {
  const { register } = useAuth();
  const { cycles, classes, getClassesByCycle } = useContent();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    city: '',
    address: '',
    cycleId: '',
    classId: '',
    userType: 'student' as 'student' | 'parent' | 'teacher',
    gender: 'male' as 'male' | 'female',
    qualifications: '',
    subjectIds: [] as string[],
    childrenIds: [] as string[]
  });

  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedCycleClasses, setSelectedCycleClasses] = useState<any[]>([]);

  // Available cities
  const cities = [
    'Abidjan', 'Bouaké', 'Yamoussoukro', 'Divo', 
    'Dimbokro', 'Dabou', 'Toumodi'
  ];

  // Filtrer les classes en fonction du cycle sélectionné
  const availableClasses = formData.cycleId
    ? classes.filter(c => c.cycleId === formData.cycleId)
    : [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await register(formData);
      navigate('/login', { state: { message: 'Inscription réussie ! Vous pouvez maintenant vous connecter.' } });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === 'cycleId') {
      const cycleClasses = getClassesByCycle(value);
      setSelectedCycleClasses(cycleClasses);
      setFormData(prev => ({ ...prev, classId: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Créer un compte
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Type d'utilisateur */}
            <div>
              <label htmlFor="userType" className="block text-sm font-medium text-gray-700">
                Je suis
              </label>
              <select
                id="userType"
                name="userType"
                value={formData.userType}
                onChange={handleChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                required
              >
                <option value="student">Un élève</option>
                <option value="parent">Un parent</option>
                <option value="teacher">Un enseignant</option>
              </select>
            </div>

            {/* Informations personnelles */}
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                  Prénom
                </label>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                  Nom
                </label>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Sexe
                </label>
                <div className="mt-2 space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={formData.gender === 'male'}
                      onChange={handleChange}
                      className="form-radio h-4 w-4 text-blue-600"
                    />
                    <span className="ml-2">Masculin</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={formData.gender === 'female'}
                      onChange={handleChange}
                      className="form-radio h-4 w-4 text-blue-600"
                    />
                    <span className="ml-2">Féminin</span>
                  </label>
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Numéro de téléphone
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                  Ville
                </label>
                <Input
                  id="city"
                  name="city"
                  type="text"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Adresse
                </label>
                <Input
                  id="address"
                  name="address"
                  type="text"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Cycle et Classe */}
              <div>
                <label htmlFor="cycleId" className="block text-sm font-medium text-gray-700">
                  Cycle
                </label>
                <select
                  id="cycleId"
                  name="cycleId"
                  value={formData.cycleId}
                  onChange={handleChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  required
                >
                  <option value="">Sélectionnez un cycle</option>
                  {cycles.map(cycle => (
                    <option key={cycle.id} value={cycle.id}>
                      {cycle.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="classId" className="block text-sm font-medium text-gray-700">
                  Classe
                </label>
                <select
                  id="classId"
                  name="classId"
                  value={formData.classId}
                  onChange={handleChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  required
                  disabled={!formData.cycleId}
                >
                  <option value="">Sélectionnez une classe</option>
                  {availableClasses.map(classe => (
                    <option key={classe.id} value={classe.id}>
                      {classe.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Champs spécifiques pour les enseignants */}
              {formData.userType === 'teacher' && (
                <div>
                  <label htmlFor="qualifications" className="block text-sm font-medium text-gray-700">
                    Qualifications
                  </label>
                  <Input
                    id="qualifications"
                    name="qualifications"
                    type="text"
                    value={formData.qualifications}
                    onChange={handleChange}
                    placeholder="Ex: Licence en Mathématiques, 5 ans d'expérience..."
                    required
                  />
                </div>
              )}
            </div>

            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      {error}
                    </h3>
                  </div>
                </div>
              </div>
            )}

            <div>
              <Button
                type="submit"
                className="w-full flex justify-center py-2 px-4"
                disabled={isLoading}
              >
                {isLoading ? 'Inscription en cours...' : 'S\'inscrire'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Register;