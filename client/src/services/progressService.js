import api from '@/utils/api';

export const progressService = {
  me: async () => {
    const { data } = await api.get('/progress/me');
    return data;
  },
  startStep: async (stepId) => {
    const { data } = await api.post(`/progress/steps/${stepId}/start`);
    return data.progress;
  },
  completeStep: async (stepId, payload = {}) => {
    const { data } = await api.post(`/progress/steps/${stepId}/complete`, payload);
    return data;
  },
};
