import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BarChart2, Banknote, Calendar, Clock, Users, DollarSign } from 'lucide-react';
import Card from '../../../components/common/Card';
import Button from '../../../components/common/Button';
import { useAuth } from '../../../contexts/AuthContext';

interface EmployeeDashboardProps {
  serviceType: 'barbearia' | 'lavagem' | 'estetica';
}

interface Appointment {
  id: string;
  date: string;
  time: string;
  service: string;
  client: string;
  clientPhone: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  payment?: number;
}

interface EarningsData {
  today: number;
  week: number;
  month: number;
  year: number;
}

export default function EmployeeDashboard({ serviceType }: EmployeeDashboardProps) {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [earnings, setEarnings] = useState<EarningsData>({ today: 0, week: 0, month: 0, year: 0 });
  const [earningsMode, setEarningsMode] = useState<'day' | 'week' | 'month' | 'year'>('day');
  
  // Mock data loading
  useEffect(() => {
    // In a real app, this would be an API call
    setAppointments([
      {
        id: '1',
        date: new Date().toLocaleDateString('pt-BR'),
        time: '14:00',
        service: serviceType === 'barbearia' 
          ? 'Corte de Cabelo' 
          : serviceType === 'lavagem'
          ? 'Lavagem Completa'
          : 'Polimento',
        client: 'João Silva',
        clientPhone: '(11) 99999-9999',
        status: 'scheduled',
        payment: 50
      },
      {
        id: '2',
        date: new Date().toLocaleDateString('pt-BR'),
        time: '15:30',
        service: serviceType === 'barbearia' 
          ? 'Barba' 
          : serviceType === 'lavagem'
          ? 'Lavagem Eco'
          : 'Higienização Interna',
        client: 'Pedro Souza',
        clientPhone: '(11) 88888-8888',
        status: 'scheduled',
        payment: 35
      },
      {
        id: '3',
        date: new Date().toLocaleDateString('pt-BR'),
        time: '17:00',
        service: serviceType === 'barbearia' 
          ? 'Corte e Barba' 
          : serviceType === 'lavagem'
          ? 'Lavagem Completa com Cera'
          : 'Polimento e Cristalização',
        client: 'Ana Oliveira',
        clientPhone: '(11) 77777-7777',
        status: 'scheduled',
        payment: 80
      }
    ]);
    
    // Mock earnings data
    setEarnings({
      today: 165,
      week: 850,
      month: 3200,
      year: 38500
    });
  }, [serviceType]);
  
  const getServiceTitle = () => {
    switch (serviceType) {
      case 'barbearia':
        return 'Barbearia';
      case 'lavagem':
        return 'Lavagem';
      case 'estetica':
        return 'Estética Automotiva';
    }
  };
  
  // Function to format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };
  
  const getEarningsValue = () => {
    switch (earningsMode) {
      case 'day':
        return earnings.today;
      case 'week':
        return earnings.week;
      case 'month':
        return earnings.month;
      case 'year':
        return earnings.year;
    }
  };
  
  const getEarningsLabel = () => {
    switch (earningsMode) {
      case 'day':
        return 'Hoje';
      case 'week':
        return 'Esta Semana';
      case 'month':
        return 'Este Mês';
      case 'year':
        return 'Este Ano';
    }
  };
  
  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Olá, {user?.name || 'Funcionário'}! 
        <span className="text-gray-500 dark:text-gray-400 text-lg ml-2 font-normal">
          {getServiceTitle()}
        </span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card 
          serviceType={serviceType} 
          className="lg:col-span-2"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <BarChart2 className="w-5 h-5 mr-2" />
            Ganhos
          </h2>
          
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 mb-4">
            <div className="flex justify-between items-center mb-4">
              <div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {getEarningsLabel()}
                </span>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {formatCurrency(getEarningsValue())}
                </h3>
              </div>
              
              <div className="flex space-x-2">
                <Button 
                  variant={earningsMode === 'day' ? 'primary' : 'outline'}
                  serviceType={serviceType}
                  size="sm"
                  onClick={() => setEarningsMode('day')}
                >
                  Dia
                </Button>
                <Button 
                  variant={earningsMode === 'week' ? 'primary' : 'outline'}
                  serviceType={serviceType}
                  size="sm"
                  onClick={() => setEarningsMode('week')}
                >
                  Semana
                </Button>
                <Button 
                  variant={earningsMode === 'month' ? 'primary' : 'outline'}
                  serviceType={serviceType}
                  size="sm"
                  onClick={() => setEarningsMode('month')}
                >
                  Mês
                </Button>
                <Button 
                  variant={earningsMode === 'year' ? 'primary' : 'outline'}
                  serviceType={serviceType}
                  size="sm"
                  onClick={() => setEarningsMode('year')}
                >
                  Ano
                </Button>
              </div>
            </div>
            
            {/* Placeholder for a chart - in a real app, this would be a real chart component */}
            <div className="h-40 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <span className="text-gray-500 dark:text-gray-400">Gráfico de ganhos</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <Button serviceType={serviceType} variant="outline" icon={<Banknote className="h-4 w-4" />}>
              <Link to={`/${serviceType}/funcionario/despesas`}>Registrar Despesa</Link>
            </Button>
            <Button serviceType={serviceType} variant="outline" icon={<Calendar className="h-4 w-4" />}>
              <Link to={`/${serviceType}/funcionario/agenda`}>Gerenciar Agenda</Link>
            </Button>
          </div>
        </Card>
        
        <Card 
          serviceType={serviceType}
          title="Resumo"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
              <div className="flex items-center">
                <Users className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
                <span className="text-gray-700 dark:text-gray-300">Clientes Hoje</span>
              </div>
              <span className="font-semibold text-gray-900 dark:text-white">{appointments.length}</span>
            </div>
            
            <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
              <div className="flex items-center">
                <DollarSign className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
                <span className="text-gray-700 dark:text-gray-300">Média por Cliente</span>
              </div>
              <span className="font-semibold text-gray-900 dark:text-white">
                {formatCurrency(appointments.reduce((sum, appt) => sum + (appt.payment || 0), 0) / appointments.length || 0)}
              </span>
            </div>
            
            <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
                <span className="text-gray-700 dark:text-gray-300">Próximo Cliente</span>
              </div>
              <span className="font-semibold text-gray-900 dark:text-white">
                {appointments[0]?.time || '-'}
              </span>
            </div>
          </div>
        </Card>
      </div>
      
      <Card 
        serviceType={serviceType} 
        title="Agendamentos de Hoje"
        footer={
          <div className="flex justify-end">
            <Link to={`/${serviceType}/funcionario/agenda`}>
              <Button serviceType={serviceType} size="sm">
                Ver Todos
              </Button>
            </Link>
          </div>
        }
      >
        {appointments.length > 0 ? (
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <div 
                key={appointment.id} 
                className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row gap-4 sm:items-center justify-between"
              >
                <div className="flex flex-col">
                  <span className="font-medium text-gray-900 dark:text-white">{appointment.service}</span>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                    <Users className="h-4 w-4 mr-1" />
                    {appointment.client} • {appointment.clientPhone}
                  </div>
                </div>
                
                <div className="flex gap-4 items-center">
                  <div className="flex flex-col items-center">
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{appointment.time}</span>
                    </div>
                    {appointment.payment && (
                      <div className="text-green-600 dark:text-green-400 mt-1 font-medium">
                        {formatCurrency(appointment.payment)}
                      </div>
                    )}
                  </div>
                  
                  <Button 
                    variant="primary" 
                    serviceType={serviceType}
                    size="sm"
                  >
                    Concluir
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400 mb-4">Não há agendamentos para hoje.</p>
          </div>
        )}
      </Card>
    </div>
  );
}