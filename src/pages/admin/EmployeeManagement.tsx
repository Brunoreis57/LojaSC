import { useState, useEffect } from 'react';
import { User, Briefcase, Phone, Mail, Plus, Edit, Trash2, Check, X } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Modal from '../../components/common/Modal';

interface Employee {
  id: string;
  name: string;
  code: string;
  email: string;
  phone: string;
  serviceType: 'barbearia' | 'lavagem' | 'estetica';
  position: string;
  status: 'active' | 'inactive';
}

export default function EmployeeManagement() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState<Partial<Employee> | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedServiceType, setSelectedServiceType] = useState<'all' | 'barbearia' | 'lavagem' | 'estetica'>('all');
  
  // Mock data loading
  useEffect(() => {
    setEmployees([
      {
        id: '1',
        name: 'Carlos Silva',
        code: 'CS001',
        email: 'carlos@example.com',
        phone: '(11) 99999-9999',
        serviceType: 'barbearia',
        position: 'Barbeiro Sênior',
        status: 'active'
      },
      {
        id: '2',
        name: 'Maria Oliveira',
        code: 'MO002',
        email: 'maria@example.com',
        phone: '(11) 88888-8888',
        serviceType: 'barbearia',
        position: 'Barbeira',
        status: 'active'
      },
      {
        id: '3',
        name: 'João Santos',
        code: 'JS003',
        email: 'joao@example.com',
        phone: '(11) 77777-7777',
        serviceType: 'lavagem',
        position: 'Lavador',
        status: 'active'
      },
      {
        id: '4',
        name: 'Ana Lima',
        code: 'AL004',
        email: 'ana@example.com',
        phone: '(11) 66666-6666',
        serviceType: 'estetica',
        position: 'Esteticista Automotiva',
        status: 'inactive'
      }
    ]);
  }, []);
  
  const handleAddEmployee = () => {
    setCurrentEmployee({
      serviceType: 'barbearia',
      status: 'active'
    });
    setIsEditing(false);
    setModalOpen(true);
  };
  
  const handleEditEmployee = (employee: Employee) => {
    setCurrentEmployee({...employee});
    setIsEditing(true);
    setModalOpen(true);
  };
  
  const handleSaveEmployee = () => {
    if (!currentEmployee?.name || !currentEmployee.email) return;
    
    if (isEditing && currentEmployee.id) {
      setEmployees(employees.map(emp => 
        emp.id === currentEmployee.id ? {...currentEmployee as Employee} : emp
      ));
    } else {
      const newEmployee = {
        ...currentEmployee,
        id: `emp-${Date.now()}`,
        code: `${currentEmployee.name?.substring(0, 2).toUpperCase()}${employees.length + 1}`.padStart(4, '0')
      } as Employee;
      
      setEmployees([...employees, newEmployee]);
    }
    
    setModalOpen(false);
    setCurrentEmployee(null);
  };
  
  const handleDeleteEmployee = (id: string) => {
    setEmployees(employees.filter(emp => emp.id !== id));
  };
  
  const handleToggleStatus = (id: string) => {
    setEmployees(employees.map(emp => 
      emp.id === id 
        ? {...emp, status: emp.status === 'active' ? 'inactive' : 'active'} 
        : emp
    ));
  };
  
  const filteredEmployees = selectedServiceType === 'all' 
    ? employees
    : employees.filter(emp => emp.serviceType === selectedServiceType);
  
  const getServiceTypeColor = (type: 'barbearia' | 'lavagem' | 'estetica') => {
    switch (type) {
      case 'barbearia':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300';
      case 'lavagem':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'estetica':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
    }
  };
  
  const getServiceTypeName = (type: 'barbearia' | 'lavagem' | 'estetica') => {
    switch (type) {
      case 'barbearia':
        return 'Barbearia';
      case 'lavagem':
        return 'Lavagem';
      case 'estetica':
        return 'Estética';
    }
  };
  
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Gerenciamento de Funcionários
        </h1>
        
        <div className="flex flex-wrap gap-3">
          <div className="inline-flex rounded-md shadow-sm">
            <button
              onClick={() => setSelectedServiceType('all')}
              className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                selectedServiceType === 'all'
                  ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
                  : 'bg-white text-gray-700 border border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setSelectedServiceType('barbearia')}
              className={`px-4 py-2 text-sm font-medium ${
                selectedServiceType === 'barbearia'
                  ? 'bg-amber-600 text-white dark:bg-amber-700'
                  : 'bg-white text-gray-700 border-y border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600'
              }`}
            >
              Barbearia
            </button>
            <button
              onClick={() => setSelectedServiceType('lavagem')}
              className={`px-4 py-2 text-sm font-medium ${
                selectedServiceType === 'lavagem'
                  ? 'bg-blue-600 text-white dark:bg-blue-700'
                  : 'bg-white text-gray-700 border-y border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600'
              }`}
            >
              Lavagem
            </button>
            <button
              onClick={() => setSelectedServiceType('estetica')}
              className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                selectedServiceType === 'estetica'
                  ? 'bg-purple-600 text-white dark:bg-purple-700'
                  : 'bg-white text-gray-700 border border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600'
              }`}
            >
              Estética
            </button>
          </div>
          
          <Button 
            serviceType="admin"
            onClick={handleAddEmployee}
            icon={<Plus className="h-4 w-4" />}
          >
            Adicionar Funcionário
          </Button>
        </div>
      </div>
      
      <Card serviceType="admin">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Funcionário
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Código
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contato
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Serviço
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredEmployees.map(employee => (
                <tr key={employee.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <User className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {employee.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {employee.position}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white font-mono">
                      {employee.code}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-1" />
                        {employee.email}
                      </div>
                      <div className="flex items-center mt-1">
                        <Phone className="h-4 w-4 mr-1" />
                        {employee.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getServiceTypeColor(employee.serviceType)}`}>
                      {getServiceTypeName(employee.serviceType)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      employee.status === 'active'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                        : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                    }`}>
                      {employee.status === 'active' ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => handleToggleStatus(employee.id)}
                        className={`p-1 rounded-full ${
                          employee.status === 'active'
                            ? 'text-red-600 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900/20'
                            : 'text-green-600 hover:bg-green-100 dark:text-green-400 dark:hover:bg-green-900/20'
                        }`}
                      >
                        {employee.status === 'active' ? (
                          <X className="h-5 w-5" />
                        ) : (
                          <Check className="h-5 w-5" />
                        )}
                      </button>
                      <button
                        onClick={() => handleEditEmployee(employee)}
                        className="p-1 rounded-full text-blue-600 hover:bg-blue-100 dark:text-blue-400 dark:hover:bg-blue-900/20"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteEmployee(employee.id)}
                        className="p-1 rounded-full text-red-600 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900/20"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      
      <Modal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setCurrentEmployee(null);
        }}
        title={isEditing ? "Editar Funcionário" : "Adicionar Novo Funcionário"}
        footer={
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => setModalOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              serviceType="admin"
              onClick={handleSaveEmployee}
            >
              {isEditing ? "Atualizar" : "Adicionar"}
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <Input
            label="Nome Completo"
            id="employeeName"
            value={currentEmployee?.name || ''}
            onChange={(e) => setCurrentEmployee(prev => ({...prev, name: e.target.value}))}
            placeholder="Nome do funcionário"
            fullWidth
          />
          
          <Input
            label="E-mail"
            id="employeeEmail"
            type="email"
            value={currentEmployee?.email || ''}
            onChange={(e) => setCurrentEmployee(prev => ({...prev, email: e.target.value}))}
            placeholder="email@exemplo.com"
            fullWidth
          />
          
          <Input
            label="Telefone"
            id="employeePhone"
            value={currentEmployee?.phone || ''}
            onChange={(e) => setCurrentEmployee(prev => ({...prev, phone: e.target.value}))}
            placeholder="(00) 00000-0000"
            fullWidth
          />
          
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Tipo de Serviço
            </label>
            <select
              value={currentEmployee?.serviceType || 'barbearia'}
              onChange={(e) => setCurrentEmployee(prev => ({
                ...prev, 
                serviceType: e.target.value as 'barbearia' | 'lavagem' | 'estetica'
              }))}
              className="block w-full px-4 py-2.5 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 border rounded-lg focus:outline-none focus:ring-2 focus:border-blue-500 focus:ring-blue-200 dark:focus:ring-blue-800 border-gray-300 dark:border-gray-600"
            >
              <option value="barbearia">Barbearia</option>
              <option value="lavagem">Lavagem de Carros</option>
              <option value="estetica">Estética Automotiva</option>
            </select>
          </div>
          
          <Input
            label="Cargo"
            id="employeePosition"
            value={currentEmployee?.position || ''}
            onChange={(e) => setCurrentEmployee(prev => ({...prev, position: e.target.value}))}
            placeholder="Ex: Barbeiro, Lavador, etc."
            fullWidth
          />
          
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Status
            </label>
            <div className="flex space-x-3">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="status"
                  value="active"
                  checked={currentEmployee?.status === 'active'}
                  onChange={() => setCurrentEmployee(prev => ({...prev, status: 'active'}))}
                  className="form-radio h-5 w-5 text-emerald-600 dark:text-emerald-500"
                />
                <span className="ml-2 text-gray-700 dark:text-gray-300">Ativo</span>
              </label>
              
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="status"
                  value="inactive"
                  checked={currentEmployee?.status === 'inactive'}
                  onChange={() => setCurrentEmployee(prev => ({...prev, status: 'inactive'}))}
                  className="form-radio h-5 w-5 text-emerald-600 dark:text-emerald-500"
                />
                <span className="ml-2 text-gray-700 dark:text-gray-300">Inativo</span>
              </label>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}