import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import Button from '../components/ui/Button';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-12">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-blue-800">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mt-2 mb-6">Page introuvable</h2>
        <p className="text-gray-600 max-w-md mx-auto mb-8">
          La page que vous recherchez n'existe pas ou a été déplacée.
          Veuillez vérifier l'URL ou retourner à la page d'accueil.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
          <Button
            variant="primary"
            leftIcon={<Home className="h-5 w-5" />}
            className="min-w-[200px]"
            size="lg"
          >
            <Link to="/">Retour à l'accueil</Link>
          </Button>
          <Button
            variant="outline"
            leftIcon={<ArrowLeft className="h-5 w-5" />}
            className="min-w-[200px]"
            size="lg"
            onClick={() => window.history.back()}
          >
            Page précédente
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;