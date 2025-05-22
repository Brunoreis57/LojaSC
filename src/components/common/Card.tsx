import { ReactNode } from 'react';
import clsx from 'clsx';

type ServiceType = 'barbearia' | 'lavagem' | 'estetica' | 'admin' | 'default';

interface CardProps {
  children: ReactNode;
  className?: string;
  serviceType?: ServiceType;
  title?: string;
  footer?: ReactNode;
}

export default function Card({ 
  children, 
  className, 
  serviceType = 'default',
  title,
  footer
}: CardProps) {
  const getServiceBorderColor = () => {
    if (serviceType === 'default') return '';
    
    switch (serviceType) {
      case 'barbearia': 
        return 'border-t-amber-500';
      case 'lavagem': 
        return 'border-t-blue-500';
      case 'estetica': 
        return 'border-t-purple-500';
      case 'admin': 
        return 'border-t-emerald-500';
      default: 
        return '';
    }
  };
  
  return (
    <div 
      className={clsx(
        'bg-gray-100 dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-md shadow-gray-400 dark:shadow-none overflow-hidden border border-gray-100 dark:border-gray-700',
        serviceType !== 'default' && 'border-t-4',
        getServiceBorderColor(),
        className
      )}
    >
      {title && (
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
        </div>
      )}
      <div className="px-6 py-5">
        {children}
      </div>
      {footer && (
        <div className="px-6 py-4 bg-gray-200 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700">
          {footer}
        </div>
      )}
    </div>
  );
}