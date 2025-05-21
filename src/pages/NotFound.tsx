import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center text-center px-4"
    >
      <AlertTriangle className="h-16 w-16 text-yellow-500 mb-4" />
      <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Página não encontrada</h1>
      <p className="text-lg mb-8 text-gray-600 dark:text-gray-300">
        A página que você está procurando não existe ou foi movida.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-blue-600 text-white font-medium rounded-xl shadow-sm hover:bg-blue-700 transition-colors duration-200"
      >
        Voltar para a página inicial
      </Link>
    </motion.div>
  );
}