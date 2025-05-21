import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { useAuth } from '../../contexts/AuthContext';

interface LoginProps {
  serviceType: 'barbearia' | 'lavagem' | 'estetica' | 'admin';
}

export default function Login({ serviceType }: LoginProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isClient, setIsClient] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [employeeCode, setEmployeeCode] = useState('');
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (serviceType === 'admin') {
        await login(email, password, serviceType, 'admin');
      } else if (isClient) {
        await login(email, password, serviceType, 'client');
      } else {
        // For employees, we use employee code instead of email
        await login(employeeCode, password, serviceType, 'employee');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };
  
  const getServiceTitle = () => {
    switch (serviceType) {
      case 'barbearia':
        return 'Barbearia';
      case 'lavagem':
        return 'Lavagem de Carros';
      case 'estetica':
        return 'Estética Automotiva';
      case 'admin':
        return 'Administração';
    }
  };

  const getServiceEmoji = () => {
    switch (serviceType) {
      case 'barbearia':
        return '💈';
      case 'lavagem':
        return '🚗';
      case 'estetica':
        return '✨';
      case 'admin':
        return '👑';
    }
  };

  return (
    <Card serviceType={serviceType} className="shadow-lg">
      <div className="mb-6 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl mb-2 flex justify-center"
        >
          {getServiceEmoji()}
        </motion.div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {getServiceTitle()}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Faça login para continuar
        </p>
      </div>

      {/* Tab selector (only for non-admin services) */}
      {serviceType !== 'admin' && (
        <div className="flex rounded-lg mb-6 bg-gray-100 dark:bg-gray-700 p-1">
          <button
            onClick={() => setIsClient(true)}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
              isClient
                ? 'bg-white dark:bg-gray-800 shadow-sm text-gray-900 dark:text-white'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Cliente
          </button>
          <button
            onClick={() => setIsClient(false)}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
              !isClient
                ? 'bg-white dark:bg-gray-800 shadow-sm text-gray-900 dark:text-white'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Funcionário
          </button>
        </div>
      )}

      <form onSubmit={handleLogin}>
        {isClient || serviceType === 'admin' ? (
          <Input
            label="E-mail"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="seu@email.com"
            icon={<Mail className="h-5 w-5 text-gray-400" />}
            fullWidth
          />
        ) : (
          <Input
            label="Código de Funcionário"
            type="text"
            id="employeeCode"
            value={employeeCode}
            onChange={(e) => setEmployeeCode(e.target.value)}
            required
            placeholder="Seu código de acesso"
            icon={<User className="h-5 w-5 text-gray-400" />}
            fullWidth
          />
        )}

        <div className="relative">
          <Input
            label="Senha"
            type={showPassword ? 'text' : 'password'}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Sua senha"
            icon={<Lock className="h-5 w-5 text-gray-400" />}
            fullWidth
          />
          <button
            type="button"
            onClick={handleTogglePasswordVisibility}
            className="absolute right-3 bottom-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>

        <div className="mt-6">
          <Button
            type="submit"
            serviceType={serviceType}
            fullWidth
            isLoading={loading}
          >
            Entrar
          </Button>
        </div>
      </form>

      {isClient && serviceType !== 'admin' && (
        <div className="mt-4 text-center text-sm">
          <span className="text-gray-600 dark:text-gray-400">
            Não tem uma conta?{' '}
          </span>
          <Link
            to={`/${serviceType}/cadastro`}
            className={`font-medium ${
              serviceType === 'barbearia'
                ? 'text-amber-600 dark:text-amber-500'
                : serviceType === 'lavagem'
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-purple-600 dark:text-purple-400'
            }`}
          >
            Cadastre-se
          </Link>
        </div>
      )}

      <div className="mt-4 text-center">
        <Link
          to="/"
          className="text-sm text-gray-500 dark:text-gray-400 hover:underline"
        >
          Voltar para a página inicial
        </Link>
      </div>
    </Card>
  );
}