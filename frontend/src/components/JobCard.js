import React from 'react';
import { motion } from 'framer-motion';

const JobCard = ({ job, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const tags = job.tags && typeof job.tags === 'string' 
    ? job.tags.split(',') 
    : Array.isArray(job.tags) ? job.tags : [];

  return (
    <motion.div 
      className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl shadow-3d transition-all"
      whileHover={{ 
        scale: 1.03,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-white">{job.title}</h3>
        <span className="px-3 py-1 bg-primary-600/30 text-primary-300 text-sm rounded-xl">
          {job.job_type}
        </span>
      </div>
      
      <p className="text-gray-300 mb-2">{job.company} • {job.location}</p>
      
      <p className="text-gray-400 text-sm mb-4">
        Posted: {formatDate(job.posting_date)}
      </p>
      
      <div className="mt-2 flex flex-wrap gap-2 mb-6">
        {tags.map((tag, index) => (
          <motion.span 
            key={index}
            className="px-3 py-1 bg-indigo-600/30 text-indigo-300 text-sm rounded-xl"
            whileHover={{ scale: 1.1 }}
          >
            {tag}
          </motion.span>
        ))}
      </div>
      
      <div className="flex justify-end space-x-2 mt-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-3 py-1 bg-primary-600 hover:bg-primary-700 text-white rounded-lg"
          onClick={onEdit}
        >
          Edit
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg"
          onClick={onDelete}
        >
          Delete
        </motion.button>
      </div>
    </motion.div>
  );
};

export default JobCard;