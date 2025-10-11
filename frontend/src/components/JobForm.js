import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const JobForm = ({ job, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    job_type: 'Full-time',
    description: '',
    tags: '',
    posting_date: new Date().toISOString().split('T')[0]
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (job) {
      // Format tags if they're an array
      const formattedTags = Array.isArray(job.tags) 
        ? job.tags.join(', ') 
        : job.tags || '';
      
      setFormData({
        ...job,
        tags: formattedTags
      });
    }
  }, [job]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.company) newErrors.company = 'Company is required';
    if (!formData.location) newErrors.location = 'Location is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <motion.div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="bg-gray-800 rounded-xl p-6 w-full max-w-2xl"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', damping: 25 }}
      >
        <h2 className="text-2xl font-bold text-white mb-6">
          {job ? 'Edit Job Listing' : 'Add New Job Listing'}
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-300 mb-1">Job Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`w-full bg-gray-700 border ${errors.title ? 'border-red-500' : 'border-gray-600'} rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-500`}
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
            </div>
            
            <div>
              <label className="block text-gray-300 mb-1">Company</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className={`w-full bg-gray-700 border ${errors.company ? 'border-red-500' : 'border-gray-600'} rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-500`}
              />
              {errors.company && <p className="text-red-500 text-sm mt-1">{errors.company}</p>}
            </div>
            
            <div>
              <label className="block text-gray-300 mb-1">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className={`w-full bg-gray-700 border ${errors.location ? 'border-red-500' : 'border-gray-600'} rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-500`}
              />
              {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
            </div>
            
            <div>
              <label className="block text-gray-300 mb-1">Job Type</label>
              <select
                name="job_type"
                value={formData.job_type}
                onChange={handleChange}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Freelance">Freelance</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-gray-300 mb-1">Tags (comma separated)</label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="React, JavaScript, Remote"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-gray-300 mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              ></textarea>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 mt-6">
            <motion.button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Cancel
            </motion.button>
            
            <motion.button
              type="submit"
              className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {job ? 'Update Job' : 'Add Job'}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default JobForm;