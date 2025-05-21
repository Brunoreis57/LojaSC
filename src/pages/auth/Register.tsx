import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Lock, Mail, User, Phone } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { useAuth } from '../../contexts/AuthContext';

interface RegisterProps {
  serviceType: 'barbearia' | 'lavagem' | 'estetica';
}

export default function Register({ serviceType }: RegisterProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const { register, loading } = useAuth();
  const navigate = useNavigate();
  
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(name, email, phone, password, serviceType);
    } catch (error) {
      console.error('Registration failed:', error);
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
          Cadastro de Cliente
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          {getServiceTitle()}
        </p>
      </div>

      <form onSubmit={handleRegister}>
        <Input
          label="Nome Completo"
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Seu nome completo"
          icon={<User className="h-5 w-5 text-gray-400" />}
          fullWidth
        />
        
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
        
        <Input
          label="Telefone"
          type="tel"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          placeholder="(00) 00000-0000"
          icon={<Phone className="h-5 w-5 text-gray-400" />}
          fullWidth
        />

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
            Cadastrar
          </Button>
        </div>
      </form>

      <div className="mt-4 text-center text-sm">
        <span className="text-gray-600 dark:text-gray-400">
          Já tem uma conta?{' '}
        </span>
        <Link
          to={`/${serviceType}/login`}
          className={`font-medium ${
            serviceType === 'barbearia'
              ? 'text-amber-600 dark:text-amber-500'
              : serviceType === 'lavagem'
              ? 'text-blue-600 dark:text-blue-400'
              : 'text-purple-600 dark:text-purple-400'
          }`}
        >
          Entrar
        </Link>
      </div>

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