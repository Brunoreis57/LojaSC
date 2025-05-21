import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';

export default function AuthLayout() {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();
  
  // Extract service type from URL for redirection
  const getServiceType = () => {
    const path = location.pathname.split('/');
    if (path.length >= 2) {
      return path[1] as 'barbearia' | 'lavagem' | 'estetica' | 'admin';
    }
    return 'barbearia'; // Default fallback
  };
  
  // Redirect authenticated users to appropriate dashboard
  if (isAuthenticated && user) {
    const serviceType = user.serviceType;
    const role = user.role;
    
    if (role === 'admin') {
      return <Navigate to="/admin/dashboard" replace />;
    }
    
    if (role === 'client') {
      return <Navigate to={`/${serviceType}/cliente`} replace />;
    }
    
    if (role === 'employee') {
      return <Navigate to={`/${serviceType}/funcionario`} replace />;
    }
  }

  // Dynamically set background based on service type
  const getAuthBackground = () => {
    const service = getServiceType();
    
    switch (service) {
      case 'barbearia':
        return 'bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20';
      case 'lavagem':
        return 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20';
      case 'estetica':
        return 'bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20';
      case 'admin':
        return 'bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20';
      default:
        return 'bg-gray-50 dark:bg-gray-900';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`min-h-[calc(100vh-4rem)] ${getAuthBackground()} flex items-center justify-center p-4`}
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="w-full max-w-md"
      >
        <Outlet />
      </motion.div>
    </motion.div>
  );
}