import React from 'react';
import { motion } from 'framer-motion';

const FilterBar = ({ filters, onFilterChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({ [name]: value });
  };

  return (
    <motion.div 
      className="bg-gradient-to-r from-green-800/80 to-blue-900/80 backdrop-blur-md p-4 rounded-xl mb-8 shadow-lg border border-green-700/30"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-gradient-to-r from-purple-800/30 to-indigo-900/30 p-3 rounded-lg">
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-200 mb-1">
            Search
          </label>
          <input
            type="text"
            id="search"
            name="search"
            value={filters.search}
            onChange={handleChange}
            placeholder="Job title or company"
            className="w-full bg-blue-900/50 border border-green-500 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        
        <div>
          <label htmlFor="jobType" className="block text-sm font-medium text-gray-200 mb-1">
            Job Type
          </label>
          <select
            id="jobType"
            name="jobType"
            value={filters.jobType}
            onChange={handleChange}
            className="w-full bg-blue-900/50 border border-green-500 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">All Types</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Freelance">Freelance</option>
            <option value="Internship">Internship</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-200 mb-1">
            Location
          </label>
          <select
            id="location"
            name="location"
            value={filters.location}
            onChange={handleChange}
            className="w-full bg-blue-900/50 border border-green-500 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">All Locations</option>
            <option value="Karachi">Karachi</option>
            <option value="Lahore">Lahore</option>
            <option value="Islamabad">Islamabad</option>
            <option value="Rawalpindi">Rawalpindi</option>
            <option value="Faisalabad">Faisalabad</option>
            <option value="Multan">Multan</option>
            <option value="Peshawar">Peshawar</option>
            <option value="Quetta">Quetta</option>
            <option value="Sialkot">Sialkot</option>
            <option value="Gujranwala">Gujranwala</option>
            <option value="Remote">Remote</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="sort" className="block text-sm font-medium text-gray-200 mb-1">
            Sort By
          </label>
          <select
            id="sort"
            name="sort"
            value={filters.sort}
            onChange={handleChange}
            className="w-full bg-blue-900/50 border border-green-500 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="date_desc">Newest First</option>
            <option value="date_asc">Oldest First</option>
          </select>
        </div>
      </div>
    </motion.div>
  );
};

export default FilterBar;