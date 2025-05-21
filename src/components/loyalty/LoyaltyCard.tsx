import { motion } from 'framer-motion';
import { Scissors, Car, Sparkles } from 'lucide-react';
import Card from '../common/Card';

interface LoyaltyCardProps {
  serviceType: 'barbearia' | 'lavagem' | 'estetica';
  currentCount: number;
  requiredCount: number;
  lastVisit?: string;
}

export default function LoyaltyCard({ serviceType, currentCount, requiredCount, lastVisit }: LoyaltyCardProps) {
  const getIcon = () => {
    switch (serviceType) {
      case 'barbearia':
        return <Scissors className="h-6 w-6 text-amber-600 dark:text-amber-500" />;
      case 'lavagem':
        return <Car className="h-6 w-6 text-blue-600 dark:text-blue-400" />;
      case 'estetica':
        return <Sparkles className="h-6 w-6 text-purple-600 dark:text-purple-400" />;
    }
  };

  const getTitle = () => {
    switch (serviceType) {
      case 'barbearia':
        return 'Cartão Fidelidade Barbearia';
      case 'lavagem':
        return 'Cartão Fidelidade Lavagem';
      case 'estetica':
        return 'Cartão Fidelidade Estética';
    }
  };

  const getProgressBarClass = () => {
    switch (serviceType) {
      case 'barbearia':
        return 'barber';
      case 'lavagem':
        return 'wash';
      case 'estetica':
        return 'detail';
    }
  };

  const getRequiredText = () => {
    switch (serviceType) {
      case 'barbearia':
        return `${requiredCount} cortes`;
      case 'lavagem':
        return `${requiredCount} lavagens`;
      case 'estetica':
        return `${requiredCount} serviços`;
    }
  };

  const progressPercentage = (currentCount / requiredCount) * 100;
  
  return (
    <Card serviceType={serviceType} className="overflow-visible">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {getIcon()}
          <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
            {getTitle()}
          </h3>
        </div>
        {lastVisit && (
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Última visita: {lastVisit}
          </span>
        )}
      </div>
      
      <div className="loyalty-progress-container mb-2">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`loyalty-progress-bar ${getProgressBarClass()}`}
        />
      </div>
      
      <div className="flex justify-between text-sm">
        <span className="text-gray-600 dark:text-gray-300">
          {currentCount} / {requiredCount}
        </span>
        <span className="font-medium">
          {currentCount === requiredCount ? (
            <span className="text-green-600 dark:text-green-400">
              Ganhou 1 {serviceType === 'barbearia' ? 'corte' : serviceType === 'lavagem' ? 'lavagem' : 'serviço'} grátis! 🎉
            </span>
          ) : (
            <span className="text-gray-700 dark:text-gray-300">
              Faltam {requiredCount - currentCount} para {serviceType === 'barbearia' ? '1 corte' : serviceType === 'lavagem' ? '1 lavagem' : '1 serviço'} grátis
            </span>
          )}
        </span>
      </div>
      
      <div className="flex justify-center mt-6">
        <div className="grid grid-cols-5 gap-2">
          {Array.from({ length: requiredCount }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, rotate: -10 }}
              animate={{ 
                scale: i < currentCount ? 1 : 0.6, 
                rotate: 0,
                opacity: i < currentCount ? 1 : 0.3
              }}
              transition={{ 
                delay: i * 0.1,
                type: "spring",
                stiffness: 200,
                damping: 10
              }}
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                i < currentCount 
                  ? serviceType === 'barbearia'
                    ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'
                    : serviceType === 'lavagem'
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                    : 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
                  : 'bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500'
              }`}
            >
              {i + 1}
            </motion.div>
          ))}
        </div>
      </div>
    </Card>
  );
}