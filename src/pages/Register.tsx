import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Calendar, MapPin, Phone, Home, GraduationCap, ChevronDown, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useContent } from '../contexts/ContentContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const Register: React.FC = () => {
  const { register, isLoading } = useAuth();
  const { cycles, classes, getClassesByCycle } = useContent();
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    city: '',
    address: '',
    phone: '',
    password: '',
    confirmPassword: '',
    cycleId: '',
    classId: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // UI state
  const [selectedCycleClasses, setSelectedCycleClasses] = useState<any[]>([]);

  // Available cities
  const cities = [
    'Abidjan', 'Bouaké', 'Yamoussoukro', 'Divo', 
    'Dimbokro', 'Dabou', 'Toumodi'
  ];

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }

    // Handle cycle change to update available classes
    if (name === 'cycleId') {
      const cycleClasses = getClassesByCycle(value);
      setSelectedCycleClasses(cycleClasses);
      setFormData(prev => ({ ...prev, classId: '' })); // Reset class selection
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'Le prénom est requis';
    if (!formData.lastName.trim()) newErrors.lastName = 'Le nom est requis';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'La date de naissance est requise';
    if (!formData.city) newErrors.city = 'La ville est requise';
    if (!formData.address.trim()) newErrors.address = 'L\'adresse est requise';
    if (!formData.phone.trim()) newErrors.phone = 'Le numéro de téléphone est requis';
    if (!formData.password) newErrors.password = 'Le mot de passe est requis';
    if (formData.password.length < 6) newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    if (!formData.cycleId) newErrors.cycleId = 'Veuillez sélectionner un cycle';
    if (!formData.classId) newErrors.classId = 'Veuillez sélectionner une classe';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      const { confirmPassword, ...userData } = formData;
      const success = await register(userData);
      if (success) {
        navigate('/');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setErrors({ form: 'Une erreur est survenue. Veuillez réessayer.' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2">
            <GraduationCap className="h-10 w-10 text-blue-800" />
            <span className="font-bold text-2xl text-blue-800">
              One<span className="text-orange-500">Klas</span>
            </span>
          </Link>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Créez votre compte
          </h2>
          <p className="mt-2 text-gray-600">
            Déjà inscrit?{' '}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Connectez-vous
            </Link>
          </p>
        </div>

        <div className="bg-white shadow rounded-lg">
          {errors.form && (
            <div className="p-4 mb-4 bg-red-50 border-l-4 border-red-500 text-red-700">
              {errors.form}
            </div>
          )}

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="bg-gray-50 p-4 rounded-md mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Informations personnelles
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  label="Prénom"
                  value={formData.firstName}
                  onChange={handleChange}
                  error={errors.firstName}
                  leftIcon={<User className="h-5 w-5" />}
                  required
                />
                
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  label="Nom"
                  value={formData.lastName}
                  onChange={handleChange}
                  error={errors.lastName}
                  leftIcon={<User className="h-5 w-5" />}
                  required
                />
                
                <Input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  label="Date de naissance"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  error={errors.dateOfBirth}
                  leftIcon={<Calendar className="h-5 w-5" />}
                  required
                />
                
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  label="Numéro de téléphone"
                  value={formData.phone}
                  onChange={handleChange}
                  error={errors.phone}
                  placeholder="Ex: 07 07 07 07 07"
                  leftIcon={<Phone className="h-5 w-5" />}
                  required
                />

                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  label="Mot de passe"
                  value={formData.password}
                  onChange={handleChange}
                  error={errors.password}
                  placeholder="Minimum 6 caractères"
                  leftIcon={<Lock className="h-5 w-5" />}
                  rightIcon={
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="focus:outline-none">
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  }
                  required
                />

                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  label="Confirmer le mot de passe"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  error={errors.confirmPassword}
                  placeholder="Confirmez votre mot de passe"
                  leftIcon={<Lock className="h-5 w-5" />}
                  rightIcon={
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="focus:outline-none">
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  }
                  required
                />
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-md mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Adresse
              </h3>
              
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
                      className={`select pl-10 ${errors.city ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                      required
                    >
                      <option value="">Sélectionnez votre ville</option>
                      {cities.map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 pointer-events-none">
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </div>
                  {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city}</p>}
                </div>
                
                <Input
                  id="address"
                  name="address"
                  type="text"
                  label="Adresse"
                  value={formData.address}
                  onChange={handleChange}
                  error={errors.address}
                  leftIcon={<Home className="h-5 w-5" />}
                  required
                />
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Niveau scolaire
              </h3>
              
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
                      className={`select pl-10 ${errors.cycleId ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                      required
                    >
                      <option value="">Sélectionnez votre cycle</option>
                      {cycles.map(cycle => (
                        <option key={cycle.id} value={cycle.id}>{cycle.name}</option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 pointer-events-none">
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </div>
                  {errors.cycleId && <p className="text-xs text-red-500 mt-1">{errors.cycleId}</p>}
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
                      className={`select pl-10 ${errors.classId ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                      disabled={!formData.cycleId}
                      required
                    >
                      <option value="">Sélectionnez votre classe</option>
                      {selectedCycleClasses.map(cls => (
                        <option key={cls.id} value={cls.id}>{cls.name}</option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 pointer-events-none">
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </div>
                  {errors.classId && <p className="text-xs text-red-500 mt-1">{errors.classId}</p>}
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={isLoading}
              >
                Créer mon compte
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;