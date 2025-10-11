import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import JobCard from './components/JobCard';
import JobForm from './components/JobForm';
import FilterBar from './components/FilterBar';
import { fetchJobs, createJob, updateJob, deleteJob } from './api';

function App() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [currentJob, setCurrentJob] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    jobType: '',
    location: '',
    sort: 'date_desc'
  });

  // Fetch jobs on component mount
  useEffect(() => {
    loadJobs();
  }, []);

  // Apply filters when jobs or filters change
  useEffect(() => {
    applyFilters();
  }, [jobs, filters]);

  const loadJobs = async () => {
    setIsLoading(true);
    try {
      const data = await fetchJobs(filters);
      setJobs(data);
    } catch (error) {
      console.error('Error loading jobs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = () => {
    let result = [...jobs];
    
    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(job => 
        job.title.toLowerCase().includes(searchLower) || 
        job.company.toLowerCase().includes(searchLower)
      );
    }
    
    // Apply job type filter
    if (filters.jobType) {
      result = result.filter(job => job.job_type === filters.jobType);
    }
    
    // Apply location filter
    if (filters.location) {
      result = result.filter(job => job.location.includes(filters.location));
    }
    
    // Apply sorting
    if (filters.sort === 'date_desc') {
      result.sort((a, b) => new Date(b.posting_date) - new Date(a.posting_date));
    } else if (filters.sort === 'date_asc') {
      result.sort((a, b) => new Date(a.posting_date) - new Date(b.posting_date));
    }
    
    setFilteredJobs(result);
  };

  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
  };

  const handleAddJob = async (jobData) => {
    try {
      await createJob(jobData);
      setShowForm(false);
      loadJobs();
    } catch (error) {
      console.error('Error adding job:', error);
    }
  };

  const handleUpdateJob = async (jobData) => {
    try {
      await updateJob(jobData.id, jobData);
      setShowForm(false);
      setCurrentJob(null);
      loadJobs();
    } catch (error) {
      console.error('Error updating job:', error);
    }
  };

  const handleDeleteJob = async (jobId) => {
    try {
      await deleteJob(jobId);
      loadJobs();
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  const openEditForm = (job) => {
    setCurrentJob(job);
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 to-slate-900 text-white">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Job Listings</h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg"
            onClick={() => {
              setCurrentJob(null);
              setShowForm(true);
            }}
          >
            Add New Job
          </motion.button>
        </div>
        
        <FilterBar filters={filters} onFilterChange={handleFilterChange} />
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map(job => (
              <JobCard 
                key={job.id} 
                job={job} 
                onEdit={() => openEditForm(job)} 
                onDelete={() => handleDeleteJob(job.id)} 
              />
            ))}
          </div>
        )}
        
        {showForm && (
          <JobForm 
            job={currentJob} 
            onSubmit={currentJob ? handleUpdateJob : handleAddJob} 
            onCancel={() => {
              setShowForm(false);
              setCurrentJob(null);
            }} 
          />
        )}
      </main>
    </div>
  );
}

export default App;