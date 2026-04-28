import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { learningPathService } from '@/services/learningPathService';

export function useLearningPaths() {
  return useQuery({
    queryKey: ['learning-paths'],
    queryFn: learningPathService.list,
    staleTime: 60 * 1000,
  });
}

export function usePathDetail(code, options = {}) {
  return useQuery({
    queryKey: ['learning-path', code],
    queryFn: () => learningPathService.detail(code),
    enabled: !!code,
    staleTime: 30 * 1000,
    ...options,
  });
}

export function useModuleDetail(code, number, options = {}) {
  return useQuery({
    queryKey: ['learning-path', code, 'module', number],
    queryFn: () => learningPathService.module(code, number),
    enabled: !!code && number != null,
    staleTime: 30 * 1000,
    ...options,
  });
}

export function useEnroll() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (code) => learningPathService.enroll(code),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['learning-paths'] });
      qc.invalidateQueries({ queryKey: ['progress', 'me'] });
    },
  });
}
