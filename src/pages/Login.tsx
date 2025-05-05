import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Phone, Shield, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const Login: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) {
      setError('Veuillez entrer votre numéro de téléphone');
      return;
    }

    // For demo, just show OTP field
    setShowOtp(true);
    setError('');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) {
      setError('Veuillez entrer votre numéro de téléphone');
      return;
    }

    try {
      const success = await login(phone, otp);
      if (success) {
        navigate('/');
      } else {
        setError('Identifiants incorrects. Veuillez réessayer.');
      }
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.');
      console.error('Login error:', err);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Link to="/" className="flex items-center space-x-2">
            <Shield className="h-10 w-10 text-blue-800" />
            <span className="font-bold text-2xl text-blue-800">
              One<span className="text-orange-500">Klas</span>
            </span>
          </Link>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Connectez-vous
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Ou{' '}
          <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
            créez un nouveau compte
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={showOtp ? handleLogin : handleSendOtp}>
            <Input
              id="phone"
              type="tel"
              label="Numéro de téléphone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Ex: 07 07 07 07 07"
              leftIcon={<Phone className="h-5 w-5" />}
              required
              autoFocus
            />

            {showOtp && (
              <Input
                id="otp"
                type={showPassword ? "text" : "password"}
                label="Code de vérification (OTP)"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Entrez le code reçu par SMS"
                leftIcon={<Shield className="h-5 w-5" />}
                rightIcon={
                  <button type="button" onClick={toggleShowPassword} className="focus:outline-none">
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                }
              />
            )}

            <div>
              <Button
                type="submit"
                variant="primary"
                isLoading={isLoading}
                fullWidth
              >
                {showOtp ? "Se connecter" : "Envoyer le code"}
              </Button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Note de démonstration
                </span>
              </div>
            </div>

            <div className="mt-6 text-sm text-center text-gray-600">
              <p>Pour la démo, entrez n'importe quel numéro de téléphone valide.</p>
              <p className="mt-1">Utilisez "0000000000" pour un compte administrateur.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;