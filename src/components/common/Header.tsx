import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { BookOpen, GraduationCap, User, LogOut, Menu, X, FileText } from 'lucide-react';
import Logo from './Logo';

const Header = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Logo className="h-8" />

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-800 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <span className="sr-only">Open main menu</span>
            {isMenuOpen ? (
              <X className="block h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="block h-6 w-6" aria-hidden="true" />
            )}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/cycles" 
              className="nav-link flex items-center"
            >
              <BookOpen className="h-4 w-4 mr-2" />
              Cours
            </Link>
            
            <Link 
              to="/exam-prep" 
              className="nav-link flex items-center"
            >
              <GraduationCap className="h-4 w-4 mr-2" />
              Examens
            </Link>

            <Link 
              to="/devoirs-corriges" 
              className="nav-link flex items-center"
            >
              <FileText className="h-4 w-4 mr-2" />
              Devoirs Corrigés
            </Link>
            
            <Link 
              to="/tutoring" 
              className="nav-link flex items-center"
            >
              <User className="h-4 w-4 mr-2" />
              Tutorat
            </Link>
          </nav>

          {/* Desktop User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {currentUser?.isAdmin && (
              <Link 
                to="/admin" 
                className="nav-link"
              >
                Administration
              </Link>
            )}
            
            <Link 
              to="/profile" 
              className="nav-link flex items-center"
            >
              <User className="h-4 w-4 mr-2" />
              {currentUser?.firstName}
            </Link>
            
            <button
              onClick={handleLogout}
              className="nav-link flex items-center text-red-600 hover:text-red-700"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Déconnexion
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
          <Link
            to="/cycles"
            className="nav-link block px-3 py-2 rounded-md text-base font-medium flex items-center"
            onClick={closeMenu}
          >
            <BookOpen className="h-5 w-5 mr-3" />
            Cours
          </Link>

          <Link
            to="/exam-prep"
            className="nav-link block px-3 py-2 rounded-md text-base font-medium flex items-center"
            onClick={closeMenu}
          >
            <GraduationCap className="h-5 w-5 mr-3" />
            Examens
          </Link>

          <Link
            to="/devoirs-corriges"
            className="nav-link block px-3 py-2 rounded-md text-base font-medium flex items-center"
            onClick={closeMenu}
          >
            <FileText className="h-5 w-5 mr-3" />
            Devoirs Corrigés
          </Link>

          <Link
            to="/tutoring"
            className="nav-link block px-3 py-2 rounded-md text-base font-medium flex items-center"
            onClick={closeMenu}
          >
            <User className="h-5 w-5 mr-3" />
            Tutorat
          </Link>

          {currentUser?.isAdmin && (
            <Link
              to="/admin"
              className="nav-link block px-3 py-2 rounded-md text-base font-medium"
              onClick={closeMenu}
            >
              Administration
            </Link>
          )}

          <div className="border-t border-gray-200 pt-4 pb-3">
            <div className="px-3">
              <Link
                to="/profile"
                className="nav-link block px-3 py-2 rounded-md text-base font-medium flex items-center"
                onClick={closeMenu}
              >
                <User className="h-5 w-5 mr-3" />
                Mon profil
              </Link>

              <button
                onClick={() => {
                  closeMenu();
                  handleLogout();
                }}
                className="nav-link w-full text-left block px-3 py-2 rounded-md text-base font-medium flex items-center text-red-600 hover:text-red-700"
              >
                <LogOut className="h-5 w-5 mr-3" />
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;