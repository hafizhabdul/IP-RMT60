import api from '@/utils/api';

export const learningPathService = {
  list: async () => {
    const { data } = await api.get('/learning-paths');
    return data.paths || [];
  },
  detail: async (code) => {
    const { data } = await api.get(`/learning-paths/${code}`);
    return data.path;
  },
  module: async (code, number) => {
    const { data } = await api.get(`/learning-paths/${code}/modules/${number}`);
    return data.module;
  },
  enroll: async (code) => {
    const { data } = await api.post(`/learning-paths/${code}/enroll`);
    return data.enrollment;
  },
};
