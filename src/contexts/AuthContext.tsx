/**
 * AuthContext - Google OAuth Authentication
 * Integrates with backend /auth/google endpoint
 * Supports mock mode and real Google Sign-in
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '@/services/api';

export interface User {
  id: string;
  name: string;
  email: string;
  picture?: string;
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  googleLogin: (idToken: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load auth from localStorage on mount
    const savedToken = localStorage.getItem('aa_token');
    const savedUser = localStorage.getItem('aa_user');
    
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const googleLogin = async (idToken: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await authApi.googleLogin(idToken);
      
      // Save to state and localStorage
      setToken(response.token);
      setUser(response.user);
      localStorage.setItem('aa_token', response.token);
      localStorage.setItem('aa_user', JSON.stringify(response.user));

      return { success: true };
    } catch (error: any) {
      console.error('Google login failed:', error);
      return { success: false, error: error.message || 'Login failed. Please try again.' };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('aa_token');
    localStorage.removeItem('aa_user');
    localStorage.removeItem('aa_bookings');
    localStorage.removeItem('aa_orders');
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        token, 
        isAuthenticated: !!user, 
        googleLogin, 
        logout,
        loading
      }}
    >
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
