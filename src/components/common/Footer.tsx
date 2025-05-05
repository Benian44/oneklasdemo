import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, BookOpen } from 'lucide-react';
import Logo from '../components/common/Logo';

// Sans tagline
<Logo />

// Avec tagline
<Logo showTagline />


const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <BookOpen className="h-8 w-8 text-white" />
              <span className="font-bold text-xl text-white">
                One<span className="text-orange-500">Klas</span>
              </span>
            </div>
            <p className="text-blue-100 mb-4">
              OneKlas est une plateforme éducative conçue pour les élèves du collège et du lycée en Côte d'Ivoire.
              Nous proposons des ressources pédagogiques de qualité pour aider les élèves à réussir.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-blue-100 hover:text-orange-500 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-blue-100 hover:text-orange-500 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-blue-100 hover:text-orange-500 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liens Rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-blue-100 hover:text-orange-500 transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/cycles" className="text-blue-100 hover:text-orange-500 transition-colors">
                  Cours
                </Link>
              </li>
              <li>
                <Link to="/tutoring" className="text-blue-100 hover:text-orange-500 transition-colors">
                  Tutorat
                </Link>
              </li>
              <li>
                <a href="#" className="text-blue-100 hover:text-orange-500 transition-colors">
                  À propos
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-100 hover:text-orange-500 transition-colors">
                  Contactez-nous
                </a>
              </li>
            </ul>
          </div>

          {/* Educational Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Ressources Éducatives</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/cycles/1/classes" className="text-blue-100 hover:text-orange-500 transition-colors">
                  Collège (1er cycle)
                </Link>
              </li>
              <li>
                <Link to="/cycles/2/classes" className="text-blue-100 hover:text-orange-500 transition-colors">
                  Lycée (2nd cycle)
                </Link>
              </li>
              <li>
                <a href="#" className="text-blue-100 hover:text-orange-500 transition-colors">
                  Bibliothèque de PDF
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-100 hover:text-orange-500 transition-colors">
                  Exercices pratiques
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-100 hover:text-orange-500 transition-colors">
                  Support d'étude
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contactez-nous</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <span className="text-blue-100">
                  Abidjan, Cocody Angré, 
                  <br />
                  Côte d'Ivoire
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-orange-500 flex-shrink-0" />
                <span className="text-blue-100">+225 07 0707 0707</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-orange-500 flex-shrink-0" />
                <span className="text-blue-100">contact@oneklas.ci</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-800 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-blue-200 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} OneKlas. Tous droits réservés.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-blue-200 hover:text-orange-500 transition-colors">
                Conditions d'utilisation
              </a>
              <a href="#" className="text-blue-200 hover:text-orange-500 transition-colors">
                Politique de confidentialité
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;