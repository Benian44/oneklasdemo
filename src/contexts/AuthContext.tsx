import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Types
export type UserType = 'student' | 'parent' | 'teacher';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  password: string;
  dateOfBirth: string;
  city: string;
  address: string;
  cycleId: string;
  classId: string;
  userType: UserType;
  isAdmin?: boolean;
  createdAt: string;
  // For parents
  childrenIds?: string[];
  // For teachers
  subjectIds?: string[];
  qualifications?: string;
}

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (phone: string, password: string) => Promise<boolean>;
  register: (userData: Omit<User, 'id' | 'isAdmin' | 'createdAt'>) => Promise<boolean>;
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

  // Initialize admin user if not exists
  useEffect(() => {
    const initializeAdmin = () => {
      const storedUsers = JSON.parse(localStorage.getItem('oneklas_users') || '[]');
      const adminExists = storedUsers.some((user: User) => user.isAdmin);

      if (!adminExists) {
        const adminUser: User = {
          id: 'admin',
          firstName: 'Admin',
          lastName: 'OneKlas',
          phone: '0000000000',
          password: 'password',
          dateOfBirth: '2000-01-01',
          city: 'Abidjan',
          address: 'Cocody',
          cycleId: '',
          classId: '',
          userType: 'teacher',
          isAdmin: true,
          createdAt: new Date().toISOString()
        };

        storedUsers.push(adminUser);
        localStorage.setItem('oneklas_users', JSON.stringify(storedUsers));
      }
    };

    initializeAdmin();
  }, []);

  // Login function
  const login = async (phone: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Get stored users
      const storedUsers = JSON.parse(localStorage.getItem('oneklas_users') || '[]');
      const user = storedUsers.find((u: User) => u.phone === phone && u.password === password);
      
      if (!user) {
        setIsLoading(false);
        return false;
      }
      
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
  const register = async (userData: Omit<User, 'id' | 'isAdmin' | 'createdAt'>): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Get stored users
      const storedUsers = JSON.parse(localStorage.getItem('oneklas_users') || '[]');
      
      // Check if phone number already exists
      if (storedUsers.some((u: User) => u.phone === userData.phone)) {
        throw new Error('Ce numéro de téléphone est déjà enregistré');
      }
      
      // Create new user
      const newUser: User = {
        ...userData,
        id: Math.random().toString(36).substring(2, 9),
        isAdmin: false,
        createdAt: new Date().toISOString()
      };
      
      // Save to local storage
      storedUsers.push(newUser);
      localStorage.setItem('oneklas_users', JSON.stringify(storedUsers));
      
      // Log in the new user
      setCurrentUser(newUser);
      localStorage.setItem('oneklas_user', JSON.stringify(newUser));
      
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      setIsLoading(false);
      throw error;
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
      
      // Update user in users list
      const storedUsers = JSON.parse(localStorage.getItem('oneklas_users') || '[]');
      const updatedUsers = storedUsers.map((u: User) => 
        u.id === updatedUser.id ? updatedUser : u
      );
      localStorage.setItem('oneklas_users', JSON.stringify(updatedUsers));
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