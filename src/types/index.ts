// Service Types
export type ServiceType = 'barbearia' | 'lavagem' | 'estetica' | 'admin';

// User Types
export type UserRole = 'client' | 'employee' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  serviceType: ServiceType;
}

// Appointment Types
export interface Appointment {
  id: string;
  clientId: string;
  clientName: string;
  employeeId: string;
  employeeName: string;
  serviceId: string;
  serviceName: string;
  price: number;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  serviceType: 'barbearia' | 'lavagem' | 'estetica';
}

// Expense Types
export interface Expense {
  id: string;
  name: string;
  amount: number;
  date: string;
  employeeId?: string;
  employeeName?: string;
  receiptUrl?: string;
  serviceType: 'barbearia' | 'lavagem' | 'estetica';
  isArchived: boolean;
}

// Loyalty Types
export interface LoyaltyInfo {
  userId: string;
  serviceType: 'barbearia' | 'lavagem' | 'estetica';
  currentCount: number;
  requiredCount: number;
  lastUpdated: string;
  rewardAvailable: boolean;
}

// Business Settings
export interface BusinessSettings {
  name: string;
  logo?: string;
  address?: string;
  phone?: string;
  email?: string;
  openingHours?: {
    [key: string]: {
      open: string;
      close: string;
      isOpen: boolean;
    }
  };
  serviceType: 'barbearia' | 'lavagem' | 'estetica';
}