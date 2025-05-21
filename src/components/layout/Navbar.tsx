import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Menu, X, User, LogOut, Settings } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import ThemeToggle from '../common/ThemeToggle';
import { useAuth } from '../../contexts/AuthContext';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const getServiceColor = () => {
    if (!user) return '';
    
    switch (user.serviceType) {
      case 'barbearia': return 'text-amber-600 dark:text-amber-500';
      case 'lavagem': return 'text-blue-600 dark:text-blue-400';
      case 'estetica': return 'text-purple-600 dark:text-purple-400';
      case 'admin': return 'text-emerald-600 dark:text-emerald-400';
      default: return '';
    }
  };

  const getServiceName = () => {
    if (!user) return '';
    
    switch (user.serviceType) {
      case 'barbearia': return 'Barbearia';
      case 'lavagem': return 'Lavagem de Carros';
      case 'estetica': return 'Estética Automotiva';
      case 'admin': return 'Administração';
      default: return '';
    }
  };

  const getPageTitle = () => {
    if (!isAuthenticated) {
      return 'Central de Serviços';
    }
    
    if (user?.role === 'admin') {
      return 'Painel Administrativo';
    }

    return getServiceName();
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Dashboard navigation links based on user role and service type
  const getNavigationItems = () => {
    if (!isAuthenticated || !user) return [];
    
    if (user.role === 'admin') {
      return [
        { name: 'Dashboard', href: '/admin/dashboard' },
        { name: 'Funcionários', href: '/admin/funcionarios' },
        { name: 'Despesas', href: '/admin/despesas' },
        { name: 'Configurações', href: '/admin/configuracoes' },
      ];
    }
    
    if (user.role === 'client') {
      return [
        { name: 'Meus Agendamentos', href: `/${user.serviceType}/cliente` },
        { name: 'Agendar', href: `/${user.serviceType}/cliente/agendar` },
      ];
    }
    
    if (user.role === 'employee') {
      return [
        { name: 'Dashboard', href: `/${user.serviceType}/funcionario` },
        { name: 'Agenda', href: `/${user.serviceType}/funcionario/agenda` },
        { name: 'Despesas', href: `/${user.serviceType}/funcionario/despesas` },
        { name: 'Despesas Arquivadas', href: `/${user.serviceType}/funcionario/despesas-arquivadas` },
      ];
    }
    
    return [];
  };

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="flex items-center flex-shrink-0">
              <Link 
                to="/" 
                className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2"
              >
                <span className="text-lg">Central de Serviços</span>
              </Link>
            </div>
            
            {/* Desktop navigation */}
            {isAuthenticated && (
              <div className="hidden md:ml-6 md:flex md:space-x-4 items-center">
                {getNavigationItems().map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      location.pathname === item.href
                        ? `font-semibold ${getServiceColor()}`
                        : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex items-center">
            {/* Service indicator for authenticated users */}
            {isAuthenticated && user && (
              <div className={`hidden md:flex mr-4 font-medium ${getServiceColor()}`}>
                {getServiceName()}
              </div>
            )}
            
            {/* Theme toggle */}
            <div className="flex items-center">
              <ThemeToggle />
            </div>
            
            {/* User menu for authenticated users */}
            {isAuthenticated && (
              <div className="ml-3 relative">
                <div className="flex items-center gap-3">
                  <span className="hidden md:block text-sm text-gray-700 dark:text-gray-300">
                    {user?.name}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              </div>
            )}
            
            {/* Mobile menu button */}
            <div className="flex items-center md:hidden ml-3">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <span className="sr-only">Open main menu</span>
                {mobileMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={{ height: mobileMenuOpen ? 'auto' : 0, opacity: mobileMenuOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {isAuthenticated && getNavigationItems().map((item) => (
            <Link
              key={item.name}
              to={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === item.href
                  ? `font-semibold ${getServiceColor()}`
                  : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
              }`}
            >
              {item.name}
            </Link>
          ))}
          
          {isAuthenticated && (
            <div className={`px-3 py-2 text-sm font-medium ${getServiceColor()}`}>
              {getServiceName()}
            </div>
          )}
          
          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white flex items-center gap-2"
            >
              <LogOut className="h-5 w-5" />
              Sair
            </button>
          )}
        </div>
      </motion.div>
    </nav>
  );
}