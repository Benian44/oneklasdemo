import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Types
interface User {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  dateOfBirth: string;
  city: string;
  address: string;
  cycleId: string;
  classId: string;
  isAdmin?: boolean;
}

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (phone: string, otp?: string) => Promise<boolean>;
  register: (userData: Omit<User, 'id'>) => Promise<boolean>;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  // Check for existing session on load
  useEffect(() => {
    const checkAuth = () => {
      const storedUser = localStorage.getItem('oneklas_user');
      if (storedUser) {
        setCurrentUser(JSON.parse(storedUser));
      }
      setIsLoading(false);
    };
    
    checkAuth();
  }, []);

  // Login function
  const login = async (phone: string, otp?: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // For demo purposes, we're simulating API call
      // In a real app, this would validate with a backend
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo, we'll allow any login with basic validation
      if (phone.length < 8) {
        throw new Error('Invalid phone number');
      }
      
      // Mock user for demonstration
      const user: User = {
        id: Math.random().toString(36).substring(2, 9),
        firstName: 'Demo',
        lastName: 'User',
        phone,
        dateOfBirth: '2000-01-01',
        city: 'Abidjan',
        address: '123 Main St',
        cycleId: '1', // College by default
        classId: '1', // 6e by default
        isAdmin: phone === '0000000000' // Demo admin account
      };
      
      setCurrentUser(user);
      localStorage.setItem('oneklas_user', JSON.stringify(user));
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      setIsLoading(false);
      return false;
    }
  };

  // Register function
  const register = async (userData: Omit<User, 'id'>): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create new user with ID
      const newUser: User = {
        ...userData,
        id: Math.random().toString(36).substring(2, 9)
      };
      
      setCurrentUser(newUser);
      localStorage.setItem('oneklas_user', JSON.stringify(newUser));
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      setIsLoading(false);
      return false;
    }
  };

  // Logout function
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('oneklas_user');
    navigate('/login');
  };

  // Update user data
  const updateUser = (data: Partial<User>) => {
    if (currentUser) {
      const updatedUser = { ...currentUser, ...data };
      setCurrentUser(updatedUser);
      localStorage.setItem('oneklas_user', JSON.stringify(updatedUser));
    }
  };

  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
    isLoading,
    login,
    register,
    logout,
    updateUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};