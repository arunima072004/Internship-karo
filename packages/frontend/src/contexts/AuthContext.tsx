import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { ExperienceLevel } from '../types/shared';

// API Configuration
const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:4000/api';

// Configure axios defaults
axios.defaults.baseURL = API_BASE_URL;

interface AuthUser {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  bio?: string;
  currentRole?: string;
  experienceLevel: ExperienceLevel;
  location?: string;
  linkedinProfile?: string;
  portfolioUrl?: string;
  subscriptionStatus: string;
  createdAt: string;
  updatedAt?: string;
  lastActive?: string;
}

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  experienceLevel: ExperienceLevel;
}

interface ProfileUpdateData {
  firstName?: string;
  lastName?: string;
  bio?: string;
  currentRole?: string;
  location?: string;
  linkedinProfile?: string;
  portfolioUrl?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  tokens: AuthTokens | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  updateProfile: (data: ProfileUpdateData) => Promise<void>;
  refreshToken: () => Promise<void>;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Token management utilities
const TOKEN_KEY = 'itp_access_token';
const REFRESH_TOKEN_KEY = 'itp_refresh_token';

const getStoredTokens = (): AuthTokens | null => {
  const accessToken = localStorage.getItem(TOKEN_KEY);
  const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
  
  if (accessToken && refreshToken) {
    return {
      accessToken,
      refreshToken,
      expiresIn: '15m' // Default value
    };
  }
  
  return null;
};

const storeTokens = (tokens: AuthTokens) => {
  localStorage.setItem(TOKEN_KEY, tokens.accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken);
};

const clearTokens = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

// Axios interceptor for automatic token attachment
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [tokens, setTokens] = useState<AuthTokens | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state on mount
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedTokens = getStoredTokens();
        if (storedTokens) {
          setTokens(storedTokens);
          
          // Validate token by fetching user profile
          const response = await axios.get('/auth/profile');
          if (response.data.success) {
            setUser(response.data.data.user);
          } else {
            // Token is invalid, clear it
            clearTokens();
            setTokens(null);
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        // Clear invalid tokens
        clearTokens();
        setTokens(null);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Axios response interceptor for token refresh
  useEffect(() => {
    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          
          try {
            await refreshToken();
            // Retry the original request with new token
            const token = localStorage.getItem(TOKEN_KEY);
            if (token) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              return axios(originalRequest);
            }
          } catch (refreshError) {
            // Refresh failed, logout user
            logout();
            return Promise.reject(refreshError);
          }
        }
        
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      setIsLoading(true);
      const response = await axios.post('/auth/login', credentials);
      
      if (response.data.success) {
        const { user: userData, tokens: tokenData } = response.data.data;
        
        setUser(userData);
        setTokens(tokenData);
        storeTokens(tokenData);
      } else {
        throw new Error(response.data.error || 'Login failed');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      throw new Error(
        error.response?.data?.error || 
        error.message || 
        'Login failed. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    try {
      setIsLoading(true);
      const response = await axios.post('/auth/register', data);
      
      if (response.data.success) {
        const { user: userData, tokens: tokenData } = response.data.data;
        
        setUser(userData);
        setTokens(tokenData);
        storeTokens(tokenData);
      } else {
        throw new Error(response.data.error || 'Registration failed');
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      throw new Error(
        error.response?.data?.error || 
        error.message || 
        'Registration failed. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Call logout endpoint to update last active time
      if (tokens) {
        await axios.post('/auth/logout');
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear local state regardless of API call success
      setUser(null);
      setTokens(null);
      clearTokens();
    }
  };

  const updateProfile = async (data: ProfileUpdateData) => {
    try {
      const response = await axios.put('/auth/profile', data);
      
      if (response.data.success) {
        setUser(response.data.data.user);
      } else {
        throw new Error(response.data.error || 'Profile update failed');
      }
    } catch (error: any) {
      console.error('Profile update error:', error);
      throw new Error(
        error.response?.data?.error || 
        error.message || 
        'Profile update failed. Please try again.'
      );
    }
  };

  const refreshToken = async () => {
    try {
      const currentTokens = getStoredTokens();
      if (!currentTokens) {
        throw new Error('No refresh token available');
      }

      const response = await axios.post('/auth/refresh', {
        refreshToken: currentTokens.refreshToken
      });
      
      if (response.data.success) {
        const { user: userData, tokens: tokenData } = response.data.data;
        
        setUser(userData);
        setTokens(tokenData);
        storeTokens(tokenData);
      } else {
        throw new Error(response.data.error || 'Token refresh failed');
      }
    } catch (error: any) {
      console.error('Token refresh error:', error);
      // Clear tokens on refresh failure
      clearTokens();
      setTokens(null);
      setUser(null);
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    tokens,
    login,
    register,
    logout,
    updateProfile,
    refreshToken,
    isLoading,
    isAuthenticated: !!user && !!tokens,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
