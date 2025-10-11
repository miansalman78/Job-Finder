import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000/api';

// Create axios instance with improved error handling
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false
});

// Fetch all jobs with optional filters
export const fetchJobs = async (filters = {}) => {
  try {
    const params = new URLSearchParams();
    if (filters.jobType) params.append('job_type', filters.jobType);
    if (filters.location) params.append('location', filters.location);
    if (filters.sort) params.append('sort', filters.sort);
    
    const response = await api.get(`/jobs?${params.toString()}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return [];
  }
};

// Create a new job
export const createJob = async (jobData) => {
  const response = await api.post('/jobs', jobData);
  return response.data;
};

// Update an existing job
export const updateJob = async (jobId, jobData) => {
  const response = await api.put(`/jobs/${jobId}`, jobData);
  return response.data;
};

// Delete a job
export const deleteJob = async (jobId) => {
  const response = await api.delete(`/jobs/${jobId}`);
  return response.data;
};