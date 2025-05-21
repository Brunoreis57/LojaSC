import { Routes, Route } from 'react-router-dom';

// Layouts
import Layout from './components/layout/Layout';
import AuthLayout from './components/layout/AuthLayout';
import DashboardLayout from './components/layout/DashboardLayout';
import AdminLayout from './components/layout/AdminLayout';

// Pages
import Home from './pages/Home';
import NotFound from './pages/NotFound';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Dashboard Pages
import ClientDashboard from './pages/dashboard/client/ClientDashboard';
import EmployeeDashboard from './pages/dashboard/employee/EmployeeDashboard';
import BookAppointment from './pages/dashboard/client/BookAppointment';
import ManageSchedule from './pages/dashboard/employee/ManageSchedule';
import ExpenseForm from './pages/dashboard/employee/ExpenseForm';
import ArchivedExpenses from './pages/dashboard/employee/ArchivedExpenses';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import EmployeeManagement from './pages/admin/EmployeeManagement';
import ExpenseManagement from './pages/admin/ExpenseManagement';
import BusinessSettings from './pages/admin/BusinessSettings';

function App() {
  return (
    <Routes>
      {/* Main layout with theme toggle */}
      <Route element={<Layout />}>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        
        {/* Auth routes */}
        <Route element={<AuthLayout />}>
          <Route path="/barbearia/login" element={<Login serviceType="barbearia" />} />
          <Route path="/barbearia/cadastro" element={<Register serviceType="barbearia" />} />
          
          <Route path="/lavagem/login" element={<Login serviceType="lavagem" />} />
          <Route path="/lavagem/cadastro" element={<Register serviceType="lavagem" />} />
          
          <Route path="/estetica/login" element={<Login serviceType="estetica" />} />
          <Route path="/estetica/cadastro" element={<Register serviceType="estetica" />} />
          
          <Route path="/admin/login" element={<Login serviceType="admin" />} />
        </Route>
        
        {/* Client & Employee Dashboard Routes */}
        <Route element={<DashboardLayout />}>
          {/* Barbershop */}
          <Route path="/barbearia/cliente" element={<ClientDashboard serviceType="barbearia" />} />
          <Route path="/barbearia/cliente/agendar" element={<BookAppointment serviceType="barbearia" />} />
          <Route path="/barbearia/funcionario" element={<EmployeeDashboard serviceType="barbearia" />} />
          <Route path="/barbearia/funcionario/agenda" element={<ManageSchedule serviceType="barbearia" />} />
          <Route path="/barbearia/funcionario/despesas" element={<ExpenseForm serviceType="barbearia" />} />
          <Route path="/barbearia/funcionario/despesas-arquivadas" element={<ArchivedExpenses serviceType="barbearia" />} />
          
          {/* Car Wash */}
          <Route path="/lavagem/cliente" element={<ClientDashboard serviceType="lavagem" />} />
          <Route path="/lavagem/cliente/agendar" element={<BookAppointment serviceType="lavagem" />} />
          <Route path="/lavagem/funcionario" element={<EmployeeDashboard serviceType="lavagem" />} />
          <Route path="/lavagem/funcionario/agenda" element={<ManageSchedule serviceType="lavagem" />} />
          <Route path="/lavagem/funcionario/despesas" element={<ExpenseForm serviceType="lavagem" />} />
          <Route path="/lavagem/funcionario/despesas-arquivadas" element={<ArchivedExpenses serviceType="lavagem" />} />
          
          {/* Auto Detailing */}
          <Route path="/estetica/cliente" element={<ClientDashboard serviceType="estetica" />} />
          <Route path="/estetica/cliente/agendar" element={<BookAppointment serviceType="estetica" />} />
          <Route path="/estetica/funcionario" element={<EmployeeDashboard serviceType="estetica" />} />
          <Route path="/estetica/funcionario/agenda" element={<ManageSchedule serviceType="estetica" />} />
          <Route path="/estetica/funcionario/despesas" element={<ExpenseForm serviceType="estetica" />} />
          <Route path="/estetica/funcionario/despesas-arquivadas" element={<ArchivedExpenses serviceType="estetica" />} />
        </Route>
        
        {/* Admin Dashboard Routes */}
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/funcionarios" element={<EmployeeManagement />} />
          <Route path="/admin/despesas" element={<ExpenseManagement />} />
          <Route path="/admin/configuracoes" element={<BusinessSettings />} />
        </Route>
        
        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;