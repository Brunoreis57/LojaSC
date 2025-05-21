import React from 'react';

interface ArchivedExpensesProps {
  serviceType: 'barbearia' | 'lavagem' | 'estetica';
}

const ArchivedExpenses: React.FC<ArchivedExpensesProps> = ({ serviceType }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Despesas Arquivadas</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="space-y-4">
          {/* Placeholder for archived expenses list */}
          <p className="text-gray-600 dark:text-gray-300">
            Nenhuma despesa arquivada encontrada.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ArchivedExpenses;