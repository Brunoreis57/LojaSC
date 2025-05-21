import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BarChart2, Scissors, Car, Sparkles, DollarSign, Users, TrendingUp, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { useAuth } from '../../contexts/AuthContext';

interface BusinessStats {
  revenue: {
    barbearia: number;
    lavagem: number;
    estetica: number;
  };
  appointments: {
    barbearia: number;
    lavagem: number;
    estetica: number;
  };
  employees: {
    barbearia: number;
    lavagem: number;
    estetica: number;
  };
}

export default function AdminDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<BusinessStats>({
    revenue: { barbearia: 0, lavagem: 0, estetica: 0 },
    appointments: { barbearia: 0, lavagem: 0, estetica: 0 },
    employees: { barbearia: 0, lavagem: 0, estetica: 0 }
  });
  const [period, setPeriod] = useState<'day' | 'week' | 'month'>('day');
  
  // Mock data loading
  useEffect(() => {
    // In a real app, this would be an API call
    setStats({
      revenue: { 
        barbearia: period === 'day' ? 1250 : period === 'week' ? 8500 : 32000, 
        lavagem: period === 'day' ? 1800 : period === 'week' ? 12000 : 45000, 
        estetica: period === 'day' ? 2200 : period === 'week' ? 15000 : 60000 
      },
      appointments: { 
        barbearia: period === 'day' ? 15 : period === 'week' ? 85 : 320, 
        lavagem: period === 'day' ? 12 : period === 'week' ? 68 : 250, 
        estetica: period === 'day' ? 8 : period === 'week' ? 45 : 180 
      },
      employees: { barbearia: 5, lavagem: 6, estetica: 4 }
    });
  }, [period]);
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };
  
  const totalRevenue = stats.revenue.barbearia + stats.revenue.lavagem + stats.revenue.estetica;
  const totalAppointments = stats.appointments.barbearia + stats.appointments.lavagem + stats.appointments.estetica;
  const totalEmployees = stats.employees.barbearia + stats.employees.lavagem + stats.employees.estetica;
  
  const getPeriodLabel = () => {
    switch (period) {
      case 'day': return 'Hoje';
      case 'week': return 'Esta Semana';
      case 'month': return 'Este Mês';
    }
  };
  
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Painel Administrativo
        <span className="text-gray-500 dark:text-gray-400 text-lg ml-2 font-normal">
          Visão Geral
        </span>
      </h1>
      
      <div className="flex justify-end mb-6">
        <div className="flex space-x-2">
          <Button 
            variant={period === 'day' ? 'primary' : 'outline'}
            serviceType="admin"
            size="sm"
            onClick={() => setPeriod('day')}
          >
            Hoje
          </Button>
          <Button 
            variant={period === 'week' ? 'primary' : 'outline'}
            serviceType="admin"
            size="sm"
            onClick={() => setPeriod('week')}
          >
            Semana
          </Button>
          <Button 
            variant={period === 'month' ? 'primary' : 'outline'}
            serviceType="admin"
            size="sm"
            onClick={() => setPeriod('month')}
          >
            Mês
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Card serviceType="admin" className="h-full">
            <div className="flex flex-col">
              <div className="flex items-center mb-1">
                <DollarSign className="h-5 w-5 text-emerald-500 mr-2" />
                <h3 className="font-semibold text-gray-900 dark:text-white">Faturamento Total</h3>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{getPeriodLabel()}</p>
              <span className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{formatCurrency(totalRevenue)}</span>
            </div>
            
            <div className="mt-6 space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Scissors className="h-4 w-4 text-amber-500 mr-2" />
                  <span className="text-gray-700 dark:text-gray-300">Barbearia</span>
                </div>
                <span className="font-medium text-gray-900 dark:text-white">
                  {formatCurrency(stats.revenue.barbearia)}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Car className="h-4 w-4 text-blue-500 mr-2" />
                  <span className="text-gray-700 dark:text-gray-300">Lavagem</span>
                </div>
                <span className="font-medium text-gray-900 dark:text-white">
                  {formatCurrency(stats.revenue.lavagem)}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Sparkles className="h-4 w-4 text-purple-500 mr-2" />
                  <span className="text-gray-700 dark:text-gray-300">Estética</span>
                </div>
                <span className="font-medium text-gray-900 dark:text-white">
                  {formatCurrency(stats.revenue.estetica)}
                </span>
              </div>
            </div>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Card serviceType="admin" className="h-full">
            <div className="flex flex-col">
              <div className="flex items-center mb-1">
                <Calendar className="h-5 w-5 text-emerald-500 mr-2" />
                <h3 className="font-semibold text-gray-900 dark:text-white">Agendamentos</h3>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{getPeriodLabel()}</p>
              <span className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{totalAppointments}</span>
            </div>
            
            <div className="mt-6 space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Scissors className="h-4 w-4 text-amber-500 mr-2" />
                  <span className="text-gray-700 dark:text-gray-300">Barbearia</span>
                </div>
                <span className="font-medium text-gray-900 dark:text-white">
                  {stats.appointments.barbearia}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Car className="h-4 w-4 text-blue-500 mr-2" />
                  <span className="text-gray-700 dark:text-gray-300">Lavagem</span>
                </div>
                <span className="font-medium text-gray-900 dark:text-white">
                  {stats.appointments.lavagem}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Sparkles className="h-4 w-4 text-purple-500 mr-2" />
                  <span className="text-gray-700 dark:text-gray-300">Estética</span>
                </div>
                <span className="font-medium text-gray-900 dark:text-white">
                  {stats.appointments.estetica}
                </span>
              </div>
            </div>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Card serviceType="admin" className="h-full">
            <div className="flex flex-col">
              <div className="flex items-center mb-1">
                <Users className="h-5 w-5 text-emerald-500 mr-2" />
                <h3 className="font-semibold text-gray-900 dark:text-white">Funcionários</h3>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Total</p>
              <span className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{totalEmployees}</span>
            </div>
            
            <div className="mt-6 space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Scissors className="h-4 w-4 text-amber-500 mr-2" />
                  <span className="text-gray-700 dark:text-gray-300">Barbearia</span>
                </div>
                <span className="font-medium text-gray-900 dark:text-white">
                  {stats.employees.barbearia}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Car className="h-4 w-4 text-blue-500 mr-2" />
                  <span className="text-gray-700 dark:text-gray-300">Lavagem</span>
                </div>
                <span className="font-medium text-gray-900 dark:text-white">
                  {stats.employees.lavagem}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Sparkles className="h-4 w-4 text-purple-500 mr-2" />
                  <span className="text-gray-700 dark:text-gray-300">Estética</span>
                </div>
                <span className="font-medium text-gray-900 dark:text-white">
                  {stats.employees.estetica}
                </span>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card 
          serviceType="admin" 
          title="Faturamento por Negócio"
          className="col-span-2"
        >
          <div className="h-64 bg-gray-100 dark:bg-gray-700/50 rounded-lg mb-4 flex items-center justify-center">
            <span className="text-gray-500 dark:text-gray-400">Gráfico de Faturamento</span>
          </div>
          
          <div className="flex flex-wrap justify-between gap-2">
            <div>
              <span className="text-xs text-gray-500 dark:text-gray-400">Maiores ganhos</span>
              <p className="font-medium text-gray-900 dark:text-white">Estética Automotiva</p>
            </div>
            <div>
              <span className="text-xs text-gray-500 dark:text-gray-400">Crescimento</span>
              <p className="font-medium text-green-600 dark:text-green-400 flex items-center">
                <TrendingUp className="h-4 w-4 mr-1" />
                12.5% este mês
              </p>
            </div>
            <div>
              <span className="text-xs text-gray-500 dark:text-gray-400">Projeção</span>
              <p className="font-medium text-gray-900 dark:text-white">{formatCurrency(145000)}</p>
            </div>
          </div>
        </Card>
        
        <Card 
          serviceType="admin" 
          title="Ações Rápidas"
        >
          <div className="space-y-3">
            <Link to="/admin/funcionarios">
              <Button 
                variant="outline" 
                serviceType="admin" 
                fullWidth
                icon={<Users className="h-4 w-4" />}
              >
                Gerenciar Funcionários
              </Button>
            </Link>
            
            <Link to="/admin/despesas">
              <Button 
                variant="outline" 
                serviceType="admin" 
                fullWidth
                icon={<DollarSign className="h-4 w-4" />}
              >
                Gerenciar Despesas
              </Button>
            </Link>
            
            <Link to="/admin/configuracoes">
              <Button 
                variant="outline" 
                serviceType="admin" 
                fullWidth
                icon={<Scissors className="h-4 w-4" />}
              >
                Configurar Barbearia
              </Button>
            </Link>
            
            <Link to="/admin/configuracoes">
              <Button 
                variant="outline" 
                serviceType="admin" 
                fullWidth
                icon={<Car className="h-4 w-4" />}
              >
                Configurar Lavagem
              </Button>
            </Link>
            
            <Link to="/admin/configuracoes">
              <Button 
                variant="outline" 
                serviceType="admin" 
                fullWidth
                icon={<Sparkles className="h-4 w-4" />}
              >
                Configurar Estética
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}