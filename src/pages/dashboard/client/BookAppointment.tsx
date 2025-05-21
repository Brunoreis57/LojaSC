import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, User, Scissors, Car, Sparkles } from 'lucide-react';
import Card from '../../../components/common/Card';
import Button from '../../../components/common/Button';
import Input from '../../../components/common/Input';
import { useAuth } from '../../../contexts/AuthContext';

interface BookAppointmentProps {
  serviceType: 'barbearia' | 'lavagem' | 'estetica';
}

// Mock professionals data
interface Professional {
  id: string;
  name: string;
  specialty: string;
  available: boolean;
}

// Mock service types
interface ServiceOption {
  id: string;
  name: string;
  duration: string;
  price: number;
}

export default function BookAppointment({ serviceType }: BookAppointmentProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [selectedProfessional, setSelectedProfessional] = useState<string>('');
  const [selectedService, setSelectedService] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  
  // Mock data based on service type
  const professionals: Professional[] = [
    { id: '1', name: 'Carlos Silva', specialty: serviceType === 'barbearia' ? 'Cortes Modernos' : serviceType === 'lavagem' ? 'Lavagem Detalhada' : 'Polimento Especialista', available: true },
    { id: '2', name: 'Maria Oliveira', specialty: serviceType === 'barbearia' ? 'Barbas e Cortes' : serviceType === 'lavagem' ? 'Lavagem Eco' : 'Higienização Completa', available: true },
    { id: '3', name: 'João Santos', specialty: serviceType === 'barbearia' ? 'Tratamentos Capilares' : serviceType === 'lavagem' ? 'Lavagem Express' : 'Cristalização', available: false }
  ];
  
  const serviceOptions: ServiceOption[] = 
    serviceType === 'barbearia'
      ? [
          { id: '1', name: 'Corte de Cabelo', duration: '30 min', price: 50 },
          { id: '2', name: 'Barba', duration: '20 min', price: 35 },
          { id: '3', name: 'Corte e Barba', duration: '45 min', price: 80 },
          { id: '4', name: 'Tratamento Capilar', duration: '40 min', price: 90 }
        ]
      : serviceType === 'lavagem'
      ? [
          { id: '1', name: 'Lavagem Básica', duration: '30 min', price: 40 },
          { id: '2', name: 'Lavagem Completa', duration: '45 min', price: 70 },
          { id: '3', name: 'Lavagem Completa com Cera', duration: '60 min', price: 100 },
          { id: '4', name: 'Lavagem Ecológica', duration: '40 min', price: 60 }
        ]
      : [ // estética
          { id: '1', name: 'Polimento', duration: '60 min', price: 150 },
          { id: '2', name: 'Higienização Interna', duration: '60 min', price: 120 },
          { id: '3', name: 'Cristalização', duration: '90 min', price: 200 },
          { id: '4', name: 'Polimento e Cristalização', duration: '120 min', price: 320 }
        ];
  
  // Available times (would be dynamic based on professional availability in a real app)
  const availableTimes = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
  ];
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit to an API
    console.log({
      professional: selectedProfessional,
      service: selectedService,
      date: selectedDate,
      time: selectedTime
    });
    
    // Redirect to client dashboard
    navigate(`/${serviceType}/cliente`);
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
  
  const getServiceIcon = () => {
    switch (serviceType) {
      case 'barbearia':
        return <Scissors className="h-6 w-6 text-amber-600 dark:text-amber-500" />;
      case 'lavagem':
        return <Car className="h-6 w-6 text-blue-600 dark:text-blue-400" />;
      case 'estetica':
        return <Sparkles className="h-6 w-6 text-purple-600 dark:text-purple-400" />;
    }
  };
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };
  
  const selectedServiceData = serviceOptions.find(service => service.id === selectedService);
  
  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center mb-6">
        {getServiceIcon()}
        <h1 className="text-2xl font-bold ml-2 text-gray-900 dark:text-white">
          Agendar {getServiceTitle()}
        </h1>
      </div>
      
      <Card serviceType={serviceType}>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Profissional
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {professionals.map(professional => (
                  <div
                    key={professional.id}
                    className={`
                      p-4 rounded-xl border-2 cursor-pointer transition-all
                      ${professional.available 
                        ? selectedProfessional === professional.id
                          ? serviceType === 'barbearia'
                            ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/20'
                            : serviceType === 'lavagem'
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                            : 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                        : 'border-gray-200 dark:border-gray-700 opacity-50 cursor-not-allowed'
                      }
                    `}
                    onClick={() => professional.available && setSelectedProfessional(professional.id)}
                  >
                    <div className="flex flex-col items-center">
                      <User className={`h-8 w-8 mb-2 ${
                        professional.available 
                          ? selectedProfessional === professional.id
                            ? serviceType === 'barbearia'
                              ? 'text-amber-600 dark:text-amber-500'
                              : serviceType === 'lavagem'
                              ? 'text-blue-600 dark:text-blue-400'
                              : 'text-purple-600 dark:text-purple-400'
                            : 'text-gray-700 dark:text-gray-300'
                          : 'text-gray-400 dark:text-gray-600'
                      }`} />
                      <span className="font-medium text-gray-900 dark:text-white">
                        {professional.name}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {professional.specialty}
                      </span>
                      {!professional.available && (
                        <span className="text-xs mt-1 text-red-500 dark:text-red-400">
                          Indisponível
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Serviço
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {serviceOptions.map(service => (
                  <div
                    key={service.id}
                    className={`
                      p-4 rounded-xl border-2 cursor-pointer transition-all
                      ${selectedService === service.id
                        ? serviceType === 'barbearia'
                          ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/20'
                          : serviceType === 'lavagem'
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      }
                    `}
                    onClick={() => setSelectedService(service.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {service.name}
                        </span>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                          <Clock className="h-4 w-4 mr-1" />
                          {service.duration}
                        </div>
                      </div>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {formatCurrency(service.price)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Data"
                id="appointmentDate"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                required
                fullWidth
              />
              
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Horário
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {availableTimes.map((time) => (
                    <button
                      key={time}
                      type="button"
                      className={`
                        p-2 text-sm rounded-lg border transition-colors
                        ${selectedTime === time
                          ? serviceType === 'barbearia'
                            ? 'bg-amber-100 border-amber-500 text-amber-800 dark:bg-amber-900/30 dark:border-amber-600 dark:text-amber-300'
                            : serviceType === 'lavagem'
                            ? 'bg-blue-100 border-blue-500 text-blue-800 dark:bg-blue-900/30 dark:border-blue-600 dark:text-blue-300'
                            : 'bg-purple-100 border-purple-500 text-purple-800 dark:bg-purple-900/30 dark:border-purple-600 dark:text-purple-300'
                          : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                        }
                      `}
                      onClick={() => setSelectedTime(time)}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Summary */}
            {selectedProfessional && selectedService && selectedDate && selectedTime && (
              <div className="mt-6 p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">
                  Resumo do Agendamento
                </h3>
                <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <div className="flex justify-between">
                    <span>Serviço:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {serviceOptions.find(s => s.id === selectedService)?.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Profissional:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {professionals.find(p => p.id === selectedProfessional)?.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Data:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {new Date(selectedDate).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Horário:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {selectedTime}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-200 dark:border-gray-600">
                    <span>Valor:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {selectedServiceData ? formatCurrency(selectedServiceData.price) : '-'}
                    </span>
                  </div>
                </div>
              </div>
            )}
            
            <div className="flex justify-end pt-4 mt-6 border-t border-gray-200 dark:border-gray-700">
              <Button
                type="button"
                variant="outline"
                className="mr-3"
                onClick={() => navigate(`/${serviceType}/cliente`)}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                serviceType={serviceType}
                disabled={!selectedProfessional || !selectedService || !selectedDate || !selectedTime}
              >
                Confirmar Agendamento
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
}