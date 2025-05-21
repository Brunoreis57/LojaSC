import { useState } from 'react';
import { Building2, Clock, Mail, Phone, MapPin, Save } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { useAuth } from '../../contexts/AuthContext';

interface BusinessHours {
  [key: string]: {
    open: string;
    close: string;
    isOpen: boolean;
  };
}

interface BusinessData {
  name: string;
  email: string;
  phone: string;
  address: string;
  hours: BusinessHours;
}

const DAYS = [
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
  'Domingo'
];

export default function BusinessSettings() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'barbearia' | 'lavagem' | 'estetica'>('barbearia');
  
  // Mock initial data
  const [businessData, setBusinessData] = useState<{
    [key in 'barbearia' | 'lavagem' | 'estetica']: BusinessData;
  }>({
    barbearia: {
      name: 'Barbearia Central',
      email: 'contato@barbearia.com',
      phone: '(11) 99999-9999',
      address: 'Rua das Barbearias, 123',
      hours: DAYS.reduce((acc, day) => ({
        ...acc,
        [day]: {
          open: '09:00',
          close: '19:00',
          isOpen: day !== 'Domingo'
        }
      }), {} as BusinessHours)
    },
    lavagem: {
      name: 'Lavagem Express',
      email: 'contato@lavagem.com',
      phone: '(11) 88888-8888',
      address: 'Rua das Lavagens, 456',
      hours: DAYS.reduce((acc, day) => ({
        ...acc,
        [day]: {
          open: '08:00',
          close: '18:00',
          isOpen: day !== 'Domingo'
        }
      }), {} as BusinessHours)
    },
    estetica: {
      name: 'Estética Automotiva Premium',
      email: 'contato@estetica.com',
      phone: '(11) 77777-7777',
      address: 'Rua da Estética, 789',
      hours: DAYS.reduce((acc, day) => ({
        ...acc,
        [day]: {
          open: '09:00',
          close: '19:00',
          isOpen: day !== 'Domingo'
        }
      }), {} as BusinessHours)
    }
  });
  
  const handleSave = () => {
    // In a real app, this would make an API call
    console.log('Saving business data:', businessData[activeTab]);
  };
  
  const updateBusinessData = (field: keyof BusinessData, value: any) => {
    setBusinessData(prev => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab],
        [field]: value
      }
    }));
  };
  
  const updateBusinessHours = (day: string, field: 'open' | 'close' | 'isOpen', value: string | boolean) => {
    setBusinessData(prev => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab],
        hours: {
          ...prev[activeTab].hours,
          [day]: {
            ...prev[activeTab].hours[day],
            [field]: value
          }
        }
      }
    }));
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Configurações do Negócio
      </h1>
      
      <div className="flex space-x-2 mb-6">
        <Button
          variant={activeTab === 'barbearia' ? 'primary' : 'outline'}
          serviceType="barbearia"
          onClick={() => setActiveTab('barbearia')}
        >
          Barbearia
        </Button>
        <Button
          variant={activeTab === 'lavagem' ? 'primary' : 'outline'}
          serviceType="lavagem"
          onClick={() => setActiveTab('lavagem')}
        >
          Lavagem
        </Button>
        <Button
          variant={activeTab === 'estetica' ? 'primary' : 'outline'}
          serviceType="estetica"
          onClick={() => setActiveTab('estetica')}
        >
          Estética
        </Button>
      </div>
      
      <div className="space-y-6">
        <Card
          serviceType={activeTab}
          title="Informações Básicas"
        >
          <div className="space-y-4">
            <Input
              label="Nome do Estabelecimento"
              id="businessName"
              value={businessData[activeTab].name}
              onChange={(e) => updateBusinessData('name', e.target.value)}
              icon={<Building2 className="h-5 w-5 text-gray-400" />}
              fullWidth
            />
            
            <Input
              label="E-mail"
              type="email"
              id="businessEmail"
              value={businessData[activeTab].email}
              onChange={(e) => updateBusinessData('email', e.target.value)}
              icon={<Mail className="h-5 w-5 text-gray-400" />}
              fullWidth
            />
            
            <Input
              label="Telefone"
              id="businessPhone"
              value={businessData[activeTab].phone}
              onChange={(e) => updateBusinessData('phone', e.target.value)}
              icon={<Phone className="h-5 w-5 text-gray-400" />}
              fullWidth
            />
            
            <Input
              label="Endereço"
              id="businessAddress"
              value={businessData[activeTab].address}
              onChange={(e) => updateBusinessData('address', e.target.value)}
              icon={<MapPin className="h-5 w-5 text-gray-400" />}
              fullWidth
            />
          </div>
        </Card>
        
        <Card
          serviceType={activeTab}
          title="Horário de Funcionamento"
        >
          <div className="space-y-4">
            {DAYS.map((day) => (
              <div key={day} className="flex items-center space-x-4">
                <div className="w-40">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={businessData[activeTab].hours[day].isOpen}
                      onChange={(e) => updateBusinessHours(day, 'isOpen', e.target.checked)}
                    />
                    <div className={`
                      w-11 h-6 rounded-full peer 
                      bg-gray-200 peer-focus:outline-none peer-focus:ring-4 
                      peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 
                      dark:bg-gray-700 
                      peer-checked:after:translate-x-full 
                      peer-checked:after:border-white 
                      after:content-[''] 
                      after:absolute 
                      after:top-[2px] 
                      after:left-[2px] 
                      after:bg-white 
                      after:border-gray-300 
                      after:border 
                      after:rounded-full 
                      after:h-5 
                      after:w-5 
                      after:transition-all
                      dark:border-gray-600
                      ${activeTab === 'barbearia'
                        ? 'peer-checked:bg-amber-600 dark:peer-checked:bg-amber-700'
                        : activeTab === 'lavagem'
                        ? 'peer-checked:bg-blue-600 dark:peer-checked:bg-blue-700'
                        : 'peer-checked:bg-purple-600 dark:peer-checked:bg-purple-700'
                      }
                    `} />
                    <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                      {day}
                    </span>
                  </label>
                </div>
                
                <div className="flex items-center space-x-2 flex-1">
                  <Clock className="h-5 w-5 text-gray-400" />
                  <input
                    type="time"
                    value={businessData[activeTab].hours[day].open}
                    onChange={(e) => updateBusinessHours(day, 'open', e.target.value)}
                    disabled={!businessData[activeTab].hours[day].isOpen}
                    className={`
                      px-3 py-2 bg-white dark:bg-gray-900 border rounded-lg
                      focus:outline-none focus:ring-2 transition-colors duration-200
                      disabled:opacity-50 disabled:cursor-not-allowed
                      ${!businessData[activeTab].hours[day].isOpen
                        ? 'border-gray-200 dark:border-gray-700'
                        : activeTab === 'barbearia'
                        ? 'border-amber-500 focus:border-amber-500 focus:ring-amber-200 dark:focus:ring-amber-800'
                        : activeTab === 'lavagem'
                        ? 'border-blue-500 focus:border-blue-500 focus:ring-blue-200 dark:focus:ring-blue-800'
                        : 'border-purple-500 focus:border-purple-500 focus:ring-purple-200 dark:focus:ring-purple-800'
                      }
                    `}
                  />
                  <span className="text-gray-500 dark:text-gray-400">até</span>
                  <input
                    type="time"
                    value={businessData[activeTab].hours[day].close}
                    onChange={(e) => updateBusinessHours(day, 'close', e.target.value)}
                    disabled={!businessData[activeTab].hours[day].isOpen}
                    className={`
                      px-3 py-2 bg-white dark:bg-gray-900 border rounded-lg
                      focus:outline-none focus:ring-2 transition-colors duration-200
                      disabled:opacity-50 disabled:cursor-not-allowed
                      ${!businessData[activeTab].hours[day].isOpen
                        ? 'border-gray-200 dark:border-gray-700'
                        : activeTab === 'barbearia'
                        ? 'border-amber-500 focus:border-amber-500 focus:ring-amber-200 dark:focus:ring-amber-800'
                        : activeTab === 'lavagem'
                        ? 'border-blue-500 focus:border-blue-500 focus:ring-blue-200 dark:focus:ring-blue-800'
                        : 'border-purple-500 focus:border-purple-500 focus:ring-purple-200 dark:focus:ring-purple-800'
                      }
                    `}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
        
        <div className="flex justify-end">
          <Button
            serviceType={activeTab}
            onClick={handleSave}
            icon={<Save className="h-4 w-4" />}
          >
            Salvar Alterações
          </Button>
        </div>
      </div>
    </div>
  );
}