import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ClipboardCheck, PlusCircle, Car, Calendar, CheckCircle, Clock, ArrowRight } from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

// Dados mockados - em uma aplicação real viriam de uma API
const mockAppointments = [
  { id: '1', client: 'João Silva', vehicle: 'Toyota Corolla - ABC1234', time: '09:30', date: '2023-10-20', service: 'Polimento Completo', status: 'confirmado' },
  { id: '2', client: 'Maria Oliveira', vehicle: 'Honda Civic - DEF5678', time: '10:45', date: '2023-10-20', service: 'Restauração de Faróis', status: 'pendente' },
  { id: '3', client: 'Pedro Santos', vehicle: 'Volkswagen Golf - GHI9012', time: '14:15', date: '2023-10-20', service: 'Impermeabilização de Estofados', status: 'confirmado' },
  { id: '4', client: 'Ana Pereira', vehicle: 'Fiat Toro - JKL3456', time: '16:00', date: '2023-10-20', service: 'Cristalização de Pintura', status: 'confirmado' },
];

const mockVehicles = [
  { id: '1', plate: 'ABC1234', model: 'Toyota Corolla', client: 'João Silva', status: 'Em andamento' },
  { id: '2', plate: 'DEF5678', model: 'Honda Civic', client: 'Maria Oliveira', status: 'Aguardando' },
  { id: '3', plate: 'GHI9012', model: 'Volkswagen Golf', client: 'Pedro Santos', status: 'Finalizado' },
  { id: '4', plate: 'JKL3456', model: 'Fiat Toro', client: 'Ana Pereira', status: 'Em andamento' },
];

export default function EsteticaEmployeeDashboard() {
  const [activeTab, setActiveTab] = useState<'schedule' | 'vehicles' | 'checklists'>('schedule');
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar serviceType="estetica" />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Painel do Funcionário</h1>
            <p className="text-gray-600 dark:text-gray-400">Área do funcionário de Estética Automotiva</p>
          </div>
          
          <div className="flex space-x-2">
            <Button
              variant="outline"
              icon={<Calendar className="w-4 h-4" />}
              onClick={() => setActiveTab('schedule')}
            >
              Agenda
            </Button>
            
            <Button
              variant="outline"
              icon={<Car className="w-4 h-4" />}
              onClick={() => setActiveTab('vehicles')}
            >
              Veículos
            </Button>
            
            <Button
              variant="outline"
              icon={<ClipboardCheck className="w-4 h-4" />}
              onClick={() => setActiveTab('checklists')}
            >
              Checklists
            </Button>
          </div>
        </div>
        
        {activeTab === 'schedule' && (
          <div className="grid grid-cols-1 gap-6">
            <Card title="Agendamentos do Dia" serviceType="estetica">
              <div className="space-y-4">
                {mockAppointments.map((appointment) => (
                  <div 
                    key={appointment.id} 
                    className="p-4 border rounded-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">{appointment.client}</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">{appointment.vehicle}</p>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          <span className="inline-flex items-center mr-2">
                            <Clock className="w-3 h-3 mr-1" /> 
                            {appointment.time}
                          </span>
                          <span>{appointment.service}</span>
                        </p>
                      </div>
                      <div>
                        <span 
                          className={`px-2 py-1 text-xs rounded-full ${
                            appointment.status === 'confirmado' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                          }`}
                        >
                          {appointment.status === 'confirmado' ? 'Confirmado' : 'Pendente'}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Button size="sm" serviceType="estetica">
                        Iniciar Serviço
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}
        
        {activeTab === 'vehicles' && (
          <div className="grid grid-cols-1 gap-6">
            <Card title="Veículos em Atendimento" serviceType="estetica">
              <div className="space-y-4">
                {mockVehicles.map((vehicle) => (
                  <div 
                    key={vehicle.id} 
                    className="p-4 border rounded-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">{vehicle.model}</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">Placa: {vehicle.plate}</p>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">Cliente: {vehicle.client}</p>
                      </div>
                      <div>
                        <span 
                          className={`px-2 py-1 text-xs rounded-full ${
                            vehicle.status === 'Em andamento' 
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' 
                              : vehicle.status === 'Finalizado'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                          }`}
                        >
                          {vehicle.status}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end space-x-2">
                      <Link to={`/estetica/checklist/${vehicle.id}`}>
                        <Button size="sm" variant="outline" icon={<ClipboardCheck className="w-4 h-4" />}>
                          Checklist
                        </Button>
                      </Link>
                      
                      {vehicle.status !== 'Finalizado' && (
                        <Button size="sm" serviceType="estetica" icon={<CheckCircle className="w-4 h-4" />}>
                          {vehicle.status === 'Em andamento' ? 'Finalizar' : 'Iniciar'}
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}
        
        {activeTab === 'checklists' && (
          <div className="grid grid-cols-1 gap-6">
            <Card title="Checklists de Veículos" serviceType="estetica">
              <div className="mb-4">
                <p className="text-gray-600 dark:text-gray-400">
                  Crie e gerencie checklists para os veículos dos clientes. Documente o estado do veículo, danos, e o que precisa ser feito durante o serviço de estética.
                </p>
              </div>
              
              <div className="space-y-4">
                {mockVehicles.map((vehicle) => (
                  <div 
                    key={vehicle.id} 
                    className="p-4 border rounded-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">{vehicle.model}</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">Placa: {vehicle.plate}</p>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">Cliente: {vehicle.client}</p>
                      </div>
                      <Link 
                        to={`/estetica/checklist/${vehicle.id}`}
                        className="flex items-center text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300"
                      >
                        Ver checklist <ArrowRight className="w-4 h-4 ml-1" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6">
                <Link to="/estetica/checklist/new">
                  <Button 
                    serviceType="estetica" 
                    fullWidth 
                    icon={<PlusCircle className="w-5 h-5" />}
                  >
                    Criar Novo Checklist
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
} 