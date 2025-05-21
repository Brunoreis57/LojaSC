import { useState } from 'react';
import { Upload, Receipt, Calendar } from 'lucide-react';
import Card from '../../../components/common/Card';
import Input from '../../../components/common/Input';
import Button from '../../../components/common/Button';
import { useAuth } from '../../../contexts/AuthContext';

interface ExpenseFormProps {
  serviceType: 'barbearia' | 'lavagem' | 'estetica';
}

interface Expense {
  id: string;
  name: string;
  amount: number;
  date: string;
  receipt?: File | null;
}

export default function ExpenseForm({ serviceType }: ExpenseFormProps) {
  const { user } = useAuth();
  const [expenseName, setExpenseName] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseDate, setExpenseDate] = useState(new Date().toISOString().split('T')[0]);
  const [expenseReceipt, setExpenseReceipt] = useState<File | null>(null);
  
  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: '1',
      name: 'Produtos de limpeza',
      amount: 120,
      date: '2023-09-15'
    },
    {
      id: '2',
      name: 'Manutenção de equipamentos',
      amount: 350,
      date: '2023-09-10'
    }
  ]);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setExpenseReceipt(e.target.files[0]);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create new expense
    const newExpense: Expense = {
      id: Date.now().toString(),
      name: expenseName,
      amount: parseFloat(expenseAmount),
      date: expenseDate,
      receipt: expenseReceipt
    };
    
    // Add to list
    setExpenses([newExpense, ...expenses]);
    
    // Reset form
    setExpenseName('');
    setExpenseAmount('');
    setExpenseDate(new Date().toISOString().split('T')[0]);
    setExpenseReceipt(null);
  };
  
  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Controle de Despesas
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card
          serviceType={serviceType}
          title="Adicionar Despesa"
          className="lg:col-span-1"
        >
          <form onSubmit={handleSubmit}>
            <Input
              label="Nome da Despesa"
              id="expenseName"
              value={expenseName}
              onChange={(e) => setExpenseName(e.target.value)}
              placeholder="Ex: Material de limpeza"
              required
              fullWidth
            />
            
            <Input
              label="Valor (R$)"
              id="expenseAmount"
              type="number"
              step="0.01"
              min="0.01"
              value={expenseAmount}
              onChange={(e) => setExpenseAmount(e.target.value)}
              placeholder="0,00"
              required
              fullWidth
            />
            
            <Input
              label="Data"
              id="expenseDate"
              type="date"
              value={expenseDate}
              onChange={(e) => setExpenseDate(e.target.value)}
              required
              fullWidth
            />
            
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Comprovante (opcional)
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-3 text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Clique para enviar</span> ou arraste e solte
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      PNG, JPG ou PDF (máx. 5MB)
                    </p>
                  </div>
                  <input 
                    id="dropzone-file" 
                    type="file" 
                    accept="image/*,application/pdf" 
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
              {expenseReceipt && (
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 truncate">
                  Arquivo selecionado: {expenseReceipt.name}
                </p>
              )}
            </div>
            
            <Button
              type="submit"
              serviceType={serviceType}
              fullWidth
            >
              Adicionar Despesa
            </Button>
          </form>
        </Card>
        
        <Card 
          serviceType={serviceType} 
          title="Despesas do Mês Atual"
          className="lg:col-span-2"
        >
          <div className="space-y-4">
            {expenses.length > 0 ? (
              expenses.map((expense) => (
                <div 
                  key={expense.id}
                  className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-100 dark:border-gray-700 flex flex-wrap gap-4 items-center justify-between"
                >
                  <div className="flex-grow">
                    <span className="font-medium text-gray-900 dark:text-white">{expense.name}</span>
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mt-1">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(expense.date)}
                      </div>
                      {expense.receipt && (
                        <div className="flex items-center">
                          <Receipt className="h-4 w-4 mr-1" />
                          <button className="text-blue-600 dark:text-blue-400 hover:underline">
                            Ver comprovante
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <span className="font-semibold text-lg text-red-600 dark:text-red-400">
                    {formatCurrency(expense.amount)}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 dark:text-gray-400">Nenhuma despesa registrada este mês.</p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}