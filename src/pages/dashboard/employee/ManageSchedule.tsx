import React from 'react';

interface ManageScheduleProps {
  serviceType: 'barbearia' | 'lavagem' | 'estetica';
}

const ManageSchedule: React.FC<ManageScheduleProps> = ({ serviceType }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Gerenciar Agenda</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="grid gap-6">
          {/* Calendar Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Calendário</h2>
            <div className="border dark:border-gray-700 rounded-lg p-4 min-h-[400px]">
              {/* Calendar implementation will go here */}
              <p className="text-gray-600 dark:text-gray-400">Calendário em desenvolvimento</p>
            </div>
          </div>

          {/* Schedule Controls */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Controles de Agenda</h2>
            <div className="flex flex-wrap gap-4">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Adicionar Horário
              </button>
              <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600">
                Bloquear Horário
              </button>
              <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600">
                Definir Férias
              </button>
            </div>
          </div>

          {/* Upcoming Appointments */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Próximos Agendamentos</h2>
            <div className="space-y-3">
              <div className="border dark:border-gray-700 rounded-lg p-4">
                <p className="text-gray-600 dark:text-gray-400">Nenhum agendamento encontrado</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageSchedule;