import React from 'react';
import { motion } from 'framer-motion';

// Define NavLink component before using it
const NavLink = ({ href, text }) => (
  <motion.a
    href={href}
    className="text-gray-300 hover:text-white transition-colors"
    whileHover={{ y: -2 }}
    whileTap={{ y: 0 }}
  >
    {text}
  </motion.a>
);

const Navbar = () => {
  return (
    <motion.nav 
      className="bg-white/10 backdrop-blur-lg shadow-lg"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <motion.div 
            className="text-2xl font-bold text-white"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-primary-400">Job</span>Finder
          </motion.div>
          
          
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;