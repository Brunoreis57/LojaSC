import { ReactNode } from 'react';
import clsx from 'clsx';
import { Loader2 } from 'lucide-react';

type ServiceType = 'barbearia' | 'lavagem' | 'estetica' | 'admin' | 'default';
type ButtonVariant = 'primary' | 'outline' | 'ghost' | 'destructive';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
  serviceType?: ServiceType;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  icon?: ReactNode;
  fullWidth?: boolean;
}

export default function Button({ 
  children, 
  onClick, 
  disabled = false, 
  loading = false, 
  variant = 'primary', 
  size = 'md',
  serviceType = 'default',
  className,
  type = 'button',
  icon,
  fullWidth = false,
}: ButtonProps) {
  
  const getServiceColor = () => {
    if (variant !== 'primary' || serviceType === 'default') return '';
    
    switch (serviceType) {
      case 'barbearia': 
        return 'bg-amber-500 hover:bg-amber-600 text-white border-amber-500';
      case 'lavagem': 
        return 'bg-blue-500 hover:bg-blue-600 text-white border-blue-500';
      case 'estetica': 
        return 'bg-purple-500 hover:bg-purple-600 text-white border-purple-500';
      case 'admin': 
        return 'bg-emerald-500 hover:bg-emerald-600 text-white border-emerald-500';
      default: 
        return '';
    }
  };
  
  const getVariantClasses = () => {
    // If a service is selected, use its color scheme for primary variant
    if (variant === 'primary' && serviceType !== 'default') {
      return getServiceColor();
    }
    
    switch (variant) {
      case 'primary':
        return 'bg-blue-600 hover:bg-blue-700 text-white border-blue-600';
      case 'outline':
        return 'bg-transparent border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800';
      case 'ghost':
        return 'bg-transparent border-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800';
      case 'destructive':
        return 'bg-red-600 hover:bg-red-700 text-white border-red-600';
      default:
        return 'bg-blue-600 hover:bg-blue-700 text-white border-blue-600';
    }
  };
  
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-3 py-1.5 text-sm';
      case 'md':
        return 'px-4 py-2';
      case 'lg':
        return 'px-6 py-3 text-lg';
      default:
        return 'px-4 py-2';
    }
  };
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={clsx(
        'font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 border',
        getVariantClasses(),
        getSizeClasses(),
        fullWidth ? 'w-full' : '',
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
        className
      )}
    >
      <span className="flex items-center justify-center">
        {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
        {icon && !loading && <span className="mr-2">{icon}</span>}
        {children}
      </span>
    </button>
  );
}