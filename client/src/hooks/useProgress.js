import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/utils/api';
import { progressService } from '@/services/progressService';
import { SILENT_REQUEST } from '@/config/elearning';
import { showToast } from '@/utils/toast';

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
    // Silent: guest 401s must not toast or wipe storage.
    mutationFn: async (stepId) => {
      const { data } = await api.post(`/progress/steps/${stepId}/start`, {}, SILENT_REQUEST);
      return data.progress;
    },
  });
}

export function useCompleteStep() {
  const qc = useQueryClient();
  return useMutation({
    // Silent: guest 401s must not toast or wipe storage.
    mutationFn: async ({ stepId, ...payload }) => {
      const { data } = await api.post(`/progress/steps/${stepId}/complete`, payload, SILENT_REQUEST);
      return data;
    },
    // onSuccess only fires when the request actually succeeded (logged-in user,
    // server persisted). Guest 401s reject and never reach here, so no toast spam.
    onSuccess: (_, { code }) => {
      qc.invalidateQueries({ queryKey: ['progress', 'me'] });
      qc.invalidateQueries({ queryKey: ['learning-paths'] });
      if (code) qc.invalidateQueries({ queryKey: ['learning-path', code] });
      showToast.success('Progres tersimpan');
    },
  });
}

// Server-authoritative quiz grading. Returns { score, passed, passingScore,
// correctCount, total, review, certificate }. Silent so guests (401/422) are
// handled by the caller instead of the global interceptor.
export function useGradeQuiz() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ stepId, answers }) => {
      const { data } = await api.post(
        `/learning-paths/steps/${stepId}/grade`,
        { answers },
        SILENT_REQUEST
      );
      return data;
    },
    onSuccess: (data, { code } = {}) => {
      // A pass persists progress / may issue a certificate server-side.
      if (data?.passed) {
        qc.invalidateQueries({ queryKey: ['progress', 'me'] });
        qc.invalidateQueries({ queryKey: ['learning-paths'] });
        if (code) qc.invalidateQueries({ queryKey: ['learning-path', code] });
        // Only a passing grade persists progress; a certificate gets its own
        // dedicated celebratory UI in LessonPlayer, so keep this subtle.
        if (!data.certificate) showToast.success('Progres tersimpan');
      }
    },
  });
}
