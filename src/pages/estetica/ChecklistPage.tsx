import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import VehicleChecklist from '../../components/checklist/VehicleChecklist';
import Navbar from '../../components/layout/Navbar';
import { ArrowLeft } from 'lucide-react';

// Em um ambiente real, isso viria de uma API
const mockVehicles = [
  { id: '1', plate: 'ABC1234', model: 'Toyota Corolla', color: 'Prata', clientName: 'João Silva' },
  { id: '2', plate: 'DEF5678', model: 'Honda Civic', color: 'Preto', clientName: 'Maria Oliveira' },
  { id: '3', plate: 'GHI9012', model: 'Volkswagen Golf', color: 'Branco', clientName: 'Pedro Santos' },
  { id: '4', plate: 'JKL3456', model: 'Fiat Toro', color: 'Vermelho', clientName: 'Ana Pereira' },
];

export default function EsteticaChecklistPage() {
  const { vehicleId } = useParams<{ vehicleId: string }>();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState<typeof mockVehicles[0] | null>(null);
  
  useEffect(() => {
    // Simular busca de dados do veículo
    if (vehicleId) {
      const foundVehicle = mockVehicles.find(v => v.id === vehicleId);
      setVehicle(foundVehicle || null);
    } else {
      // Se não tiver ID, estamos criando um novo checklist
      setVehicle(null);
    }
  }, [vehicleId]);
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar serviceType="estetica" />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center text-purple-600 dark:text-purple-400 hover:underline"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Voltar
          </button>
        </div>
        
        <VehicleChecklist 
          serviceType="estetica" 
          vehicleInfo={vehicle || undefined}
        />
      </div>
    </div>
  );
} 