import { Outlet, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';

export default function DashboardLayout() {
  const { isAuthenticated, user } = useAuth();
  
  // Redirect unauthenticated users to home
  if (!isAuthenticated || !user) {
    return <Navigate to="/" replace />;
  }
  
  // Redirect admins to admin dashboard
  if (user.role === 'admin') {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-[calc(100vh-4rem)]"
    >
      <Outlet />
    </motion.div>
  );
}