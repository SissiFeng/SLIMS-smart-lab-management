// src/services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  timeout: 5000,
});

export const inventoryApi = {
  getChemicals: () => api.get('/inventory/chemicals'),
  addChemical: (data: any) => api.post('/inventory/chemicals', data),
  updateChemical: (id: string, data: any) => 
    api.put(`/inventory/chemicals/${id}`, data),
};

export const safetyApi = {
  getSafetyStatus: () => api.get('/safety/status'),
  performCheck: (chemicalId: string) => 
    api.post(`/safety/check/${chemicalId}`),
};

export const analyticsApi = {
  getUsageReport: (chemicalId: string) => 
    api.get(`/analytics/usage-report/${chemicalId}`),
};

export default api;