import axios from 'axios';

const API_URL = import.meta.env.VITE_BASE_URL || '';
const DEFAULT_LANGUAGE = 'id';

const getLanguage = () => localStorage.getItem('ip-rmt60-language') || DEFAULT_LANGUAGE;

// Get quiz questions with filters
export const getQuizQuestions = async (params = {}) => {
    const { method, level, category, limit = 10 } = params;
    const query = new URLSearchParams();

    if (method) query.append('method', method);
    if (level) query.append('level', level);
    if (category) query.append('category', category);
    if (limit) query.append('limit', limit);

    query.append('lang', getLanguage());

    const response = await axios.get(`${API_URL}/quiz/questions?${query.toString()}`);
    return response.data;
};

// Get available filters (methods, levels, categories)
export const getQuizFilters = async () => {
    const response = await axios.get(`${API_URL}/quiz/filters`, {
        params: { lang: getLanguage() }
    });
    return response.data;
};

// Submit quiz answers
export const submitQuiz = async (data, token) => {
    const response = await axios.post(
        `${API_URL}/quiz/submit`,
        data,
        {
            headers: { Authorization: `Bearer ${token}` }
        }
    );
    return response.data;
};

// Get user's quiz history
export const getQuizHistory = async (token, params = {}) => {
    const { method, level, limit = 10 } = params;
    const query = new URLSearchParams();

    if (method) query.append('method', method);
    if (level) query.append('level', level);
    if (limit) query.append('limit', limit);

    query.append('lang', getLanguage());

    const response = await axios.get(
        `${API_URL}/quiz/history?${query.toString()}`,
        {
            headers: { Authorization: `Bearer ${token}` }
        }
    );
    return response.data;
};

// Get specific attempt details
export const getQuizAttempt = async (attemptId, token) => {
    const response = await axios.get(
        `${API_URL}/quiz/attempts/${attemptId}`,
        {
            headers: { Authorization: `Bearer ${token}` }
        }
    );
    return response.data;
};
