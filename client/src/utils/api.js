import axios from 'axios';

const API_URL = '/api';

// Auth APIs
export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/register`, userData);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_URL}/auth/login`, credentials);
  return response.data;
};

// Placement APIs
export const submitPlacement = async (formData) => {
  const response = await axios.post(`${API_URL}/placements/submit`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const getAllPlacements = async () => {
  const response = await axios.get(`${API_URL}/placements`);
  return response.data;
};

export const getMyPlacements = async () => {
  const response = await axios.get(`${API_URL}/placements/my`);
  return response.data;
};

// Admin APIs
export const getPendingPlacements = async () => {
  const response = await axios.get(`${API_URL}/admin/placements/pending`);
  return response.data;
};

export const getAllPlacementsAdmin = async () => {
  const response = await axios.get(`${API_URL}/admin/placements`);
  return response.data;
};

export const approvePlacement = async (id) => {
  const response = await axios.put(`${API_URL}/admin/placements/${id}/approve`);
  return response.data;
};

export const rejectPlacement = async (id) => {
  const response = await axios.put(`${API_URL}/admin/placements/${id}/reject`);
  return response.data;
};