import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthStatus } from '../types';
import { validateUser, createUser } from '../data/users';

interface AuthContextType {
  user: User | null;
  status: AuthStatus;
  login: (email: string, password: string) => Promise<User | null>;
  signup: (email: string, password: string, name: string) => Promise<User | null>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<AuthStatus>('loading');

  useEffect(() => {
    // Check for saved user on initial load
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setStatus('authenticated');
    } else {
      setStatus('unauthenticated');
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // This is a mock implementation
      // In a real app, this would make an API call
      const authenticatedUser = validateUser(email, password);
      
      if (authenticatedUser) {
        setUser(authenticatedUser);
        setStatus('authenticated');
        localStorage.setItem('user', JSON.stringify(authenticatedUser));
        return authenticatedUser;
      }
      return null;
    } catch (error) {
      console.error('Login error:', error);
      return null;
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    try {
      // This is a mock implementation
      // In a real app, this would make an API call
      const newUser = createUser(email, password, name);
      setUser(newUser);
      setStatus('authenticated');
      localStorage.setItem('user', JSON.stringify(newUser));
      return newUser;
    } catch (error) {
      console.error('Signup error:', error);
      return null;
    }
  };

  const logout = () => {
    setUser(null);
    setStatus('unauthenticated');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, status, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};