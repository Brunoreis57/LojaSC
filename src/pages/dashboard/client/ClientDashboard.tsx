import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, User } from 'lucide-react';
import Card from '../../../components/common/Card';
import Button from '../../../components/common/Button';
import LoyaltyCard from '../../../components/loyalty/LoyaltyCard';
import { useAuth } from '../../../contexts/AuthContext';

interface ClientDashboardProps {
  serviceType: 'barbearia' | 'lavagem' | 'estetica';
}

// Mock appointment data
interface Appointment {
  id: string;
  date: string;
  time: string;
  service: string;
  professional: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

export default function ClientDashboard({ serviceType }: ClientDashboardProps) {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loyaltyCount, setLoyaltyCount] = useState(0);
  
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
        professional: 'Carlos Silva',
        status: 'scheduled'
      },
      {
        id: '2',
        date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR'),
        time: '10:30',
        service: serviceType === 'barbearia' 
          ? 'Barba' 
          : serviceType === 'lavagem'
          ? 'Lavagem Eco'
          : 'Higienização Interna',
        professional: 'Maria Oliveira',
        status: 'scheduled'
      }
    ]);
    
    // Mock loyalty data
    setLoyaltyCount(Math.floor(Math.random() * 
      (serviceType === 'barbearia' ? 10 : 5)) + 1);
  }, [serviceType]);
  
  const getRequiredCount = () => {
    switch (serviceType) {
      case 'barbearia':
        return 10;
      case 'lavagem':
      case 'estetica':
        return 5;
      default:
        return 5;
    }
  };

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
  
  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Olá, {user?.name || 'Cliente'}! 
        <span className="text-gray-500 dark:text-gray-400 text-lg ml-2 font-normal">
          Bem-vindo ao {getServiceTitle()}
        </span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card 
            serviceType={serviceType} 
            title="Próximos Agendamentos"
            footer={
              <div className="flex justify-end">
                <Link to={`/${serviceType}/cliente/agendar`}>
                  <Button serviceType={serviceType} size="sm">
                    Novo Agendamento
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
                        <User className="h-4 w-4 mr-1" />
                        {appointment.professional}
                      </div>
                    </div>
                    
                    <div className="flex gap-4 items-center">
                      <div className="flex flex-col items-center">
                        <div className="flex items-center text-gray-600 dark:text-gray-300">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{appointment.date}</span>
                        </div>
                        <div className="flex items-center mt-1 text-gray-600 dark:text-gray-300">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{appointment.time}</span>
                        </div>
                      </div>
                      
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          // Mock cancellation
                          setAppointments(appointments.filter(a => a.id !== appointment.id));
                        }}
                      >
                        Cancelar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 dark:text-gray-400 mb-4">Você não tem agendamentos.</p>
                <Link to={`/${serviceType}/cliente/agendar`}>
                  <Button serviceType={serviceType}>
                    Agendar Agora
                  </Button>
                </Link>
              </div>
            )}
          </Card>
        </div>
        
        <div className="lg:col-span-1">
          <LoyaltyCard
            serviceType={serviceType}
            currentCount={loyaltyCount}
            requiredCount={getRequiredCount()}
            lastVisit="15/09/2023"
          />
        </div>
      </div>
    </div>
  );
}