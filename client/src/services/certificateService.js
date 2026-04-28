import api from '@/utils/api';

export const certificateService = {
  listMine: async () => {
    const { data } = await api.get('/certificates/me');
    return data.certificates || [];
  },
  verify: async (qrToken) => {
    const { data } = await api.get(`/certificates/verify/${qrToken}`);
    return data.certificate;
  },
};
