import React from 'react';
import { motion } from 'framer-motion';
import { Utensils } from 'lucide-react';

interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ title = '家庭点餐' }) => {
  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-40 glass border-b border-primary-100"
    >
      <div className="px-4 py-3 flex items-center justify-center gap-2">
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        >
          <Utensils className="w-6 h-6 text-primary-500" />
        </motion.div>
        <h1 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
          {title}
        </h1>
      </div>
    </motion.header>
  );
};

export default React.memo(Header);

