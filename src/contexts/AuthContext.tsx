import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type ServiceType = 'barbearia' | 'lavagem' | 'estetica' | 'admin';
type UserRole = 'client' | 'employee' | 'admin';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  serviceType: ServiceType;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, serviceType: ServiceType, role?: UserRole) => Promise<void>;
  register: (name: string, email: string, phone: string, password: string, serviceType: ServiceType) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local storage for user data on initial load
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user data');
      }
    }
    setLoading(false);
  }, []);

  // Mock login function - in a real app, this would make an API call
  const login = async (email: string, password: string, serviceType: ServiceType, role: UserRole = 'client') => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful login
      const newUser: User = {
        id: `user-${Date.now()}`,
        name: email.split('@')[0], // Use part of email as mock name
        email,
        role,
        serviceType,
      };
      
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
    } finally {
      setLoading(false);
    }
  };

  // Mock registration function
  const register = async (name: string, email: string, phone: string, password: string, serviceType: ServiceType) => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful registration and login
      const newUser: User = {
        id: `user-${Date.now()}`,
        name,
        email,
        role: 'client',
        serviceType,
      };
      
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      register,
      logout,
      loading,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook for using authentication
export function useAuth() {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}