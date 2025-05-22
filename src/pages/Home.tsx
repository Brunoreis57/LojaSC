import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Scissors, Car, Sparkles } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();
  
  // Função para navegação com log
  const handleNavigate = (path: string) => {
    console.log(`Tentando navegar para: ${path}`);
    try {
      // Usando window.location para navegação direta
      window.location.href = path;
      console.log(`Navegação para ${path} executada com sucesso`);
    } catch (error) {
      console.error(`Erro ao navegar para ${path}:`, error);
    }
  };
  
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  const ServiceCard = ({ 
    title, 
    emoji, 
    description, 
    path, 
    icon, 
    className 
  }: { 
    title: string;
    emoji: string;
    description: string;
    path: string;
    icon: React.ReactNode;
    className: string;
  }) => (
    <motion.div
      variants={item}
      onClick={() => {
        console.log(`Clicou no card ${title}`);
        handleNavigate(path);
      }}
      className={`service-card ${className} bg-gray-100 dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-md shadow-gray-300 dark:shadow-none flex flex-col p-6 text-center cursor-pointer`}
    >
      <h2 className="text-xl font-bold mb-2 text-center">
        {title} {emoji}
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6 flex-grow">
        {description}
      </p>
      <a
        href={path}
        className="mt-auto px-6 py-2.5 rounded-xl font-medium text-black dark:text-white shadow-sm transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 inline-block"
        style={{ 
          backgroundColor: 'hsl(var(--primary))',
          borderColor: 'hsl(var(--primary))',
        }}
      >
        Acessar
      </a>
    </motion.div>
  );

  return (
    <div className="min-h-[calc(100vh-8rem)] flex flex-col justify-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <div className="flex justify-center mb-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="text-4xl font-bold text-gray-900 dark:text-white flex items-center"
          >
            <span className="text-emerald-600 dark:text-emerald-400">MV</span>
            <span className="mx-2">•</span>
            <span>Serviços</span>
          </motion.div>
        </div>
        <p className="text-xl text-gray-600 dark:text-gray-300 mt-3">
          Qual serviço você deseja acessar?
        </p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4"
      >
        <ServiceCard
          title="Barbearia"
          emoji="💈"
          description="Cortes e serviços."
          path="/barbearia/login"
          icon={<Scissors className="h-12 w-12 text-amber-600 dark:text-amber-500" />}
          className="barber-card hover:border-amber-500 border-2 border-transparent"
        />

        <ServiceCard
          title="Lavagem de Carros"
          emoji="🚗"
          description="Lavagem veicular."
          path="/lavagem/login"
          icon={<Car className="h-12 w-12 text-blue-600 dark:text-blue-400" />}
          className="wash-card hover:border-blue-500 border-2 border-transparent"
        />

        <ServiceCard
          title="Estética Automotiva"
          emoji="✨"
          description="Serviços estéticos."
          path="/estetica/login"
          icon={<Sparkles className="h-12 w-12 text-purple-600 dark:text-purple-400" />}
          className="detail-card hover:border-purple-500 border-2 border-transparent"
        />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-12 text-center"
      >
        <a
          href="/admin/login"
          className="text-sm text-gray-500 dark:text-gray-400 hover:underline"
        >
          Acesso Administrativo
        </a>
      </motion.div>
    </div>
  );
}