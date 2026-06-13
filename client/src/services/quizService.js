import api from '../utils/api';

// Get quiz questions with filters.
// The shared `api` instance attaches Accept-Language and the `lang` query param
// for GET requests automatically.
export const getQuizQuestions = async (params = {}) => {
    const { method, level, category, limit = 10 } = params;
    const query = {};

    if (method) query.method = method;
    if (level) query.level = level;
    if (category) query.category = category;
    if (limit) query.limit = limit;

    const response = await api.get('/quiz/questions', { params: query });
    return response.data;
};

// Get available filters (methods, levels, categories)
export const getQuizFilters = async () => {
    const response = await api.get('/quiz/filters');
    return response.data;
};

// Submit quiz answers. Auth is handled by the shared `api` instance, which
// attaches the Bearer token from localStorage on every request.
export const submitQuiz = async (data) => {
    const response = await api.post('/quiz/submit', data);
    return response.data;
};

// Get user's quiz history
export const getQuizHistory = async (params = {}) => {
    const { method, level, limit = 10 } = params;
    const query = {};

    if (method) query.method = method;
    if (level) query.level = level;
    if (limit) query.limit = limit;

    const response = await api.get('/quiz/history', { params: query });
    return response.data;
};

// Get specific attempt details
export const getQuizAttempt = async (attemptId) => {
    const response = await api.get(`/quiz/attempts/${attemptId}`);
    return response.data;
};
