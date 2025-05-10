import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { BookOpen, GraduationCap, User, LogOut } from 'lucide-react';
import Logo from './Logo';

const Header = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Logo className="h-8" />

          {/* Navigation */}
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
              to="/tutoring" 
              className="nav-link flex items-center"
            >
              <User className="h-4 w-4 mr-2" />
              Tutorat
            </Link>
          </nav>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
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
    </header>
  );
};

export default Header;