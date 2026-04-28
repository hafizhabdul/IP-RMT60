import { useQuery } from '@tanstack/react-query';
import { certificateService } from '@/services/certificateService';

export function useMyCertificates(options = {}) {
  return useQuery({
    queryKey: ['certificates', 'me'],
    queryFn: certificateService.listMine,
    staleTime: 60 * 1000,
    ...options,
  });
}
