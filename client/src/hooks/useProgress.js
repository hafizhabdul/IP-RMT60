import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { progressService } from '@/services/progressService';

export function useMyProgress(options = {}) {
  return useQuery({
    queryKey: ['progress', 'me'],
    queryFn: progressService.me,
    staleTime: 30 * 1000,
    ...options,
  });
}

export function useStartStep() {
  return useMutation({
    mutationFn: (stepId) => progressService.startStep(stepId),
  });
}

export function useCompleteStep() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ stepId, ...payload }) => progressService.completeStep(stepId, payload),
    onSuccess: (_, { code }) => {
      qc.invalidateQueries({ queryKey: ['progress', 'me'] });
      qc.invalidateQueries({ queryKey: ['learning-paths'] });
      if (code) qc.invalidateQueries({ queryKey: ['learning-path', code] });
    },
  });
}
