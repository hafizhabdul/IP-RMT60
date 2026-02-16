import axios from 'axios';

const API_URL = import.meta.env.VITE_BASE_URL || '';
const DEFAULT_LANGUAGE = 'id';

const getLanguage = () => localStorage.getItem('ip-rmt60-language') || DEFAULT_LANGUAGE;

// Get articles with filters
export const getArticles = async (params = {}) => {
    const { method, level, category, featured, page = 1, limit = 10 } = params;
    const query = new URLSearchParams();

    if (method) query.append('method', method);
    if (level) query.append('level', level);
    if (category) query.append('category', category);
    if (featured) query.append('featured', featured);
    query.append('page', page);
    query.append('limit', limit);

    const response = await axios.get(`${API_URL}/articles?${query.toString()}`, {
        params: { lang: getLanguage() }
    });
    return response.data;
};

// Get single article by slug
export const getArticle = async (slug) => {
    const response = await axios.get(`${API_URL}/articles/${slug}`, {
        params: { lang: getLanguage() }
    });
    return response.data;
};

// Get article filters
export const getArticleFilters = async () => {
    const response = await axios.get(`${API_URL}/articles/filters`);
    return response.data;
};

// Get related articles
export const getRelatedArticles = async (slug) => {
    const response = await axios.get(`${API_URL}/articles/${slug}/related`, {
        params: { lang: getLanguage() }
    });
    return response.data;
};

// Search articles
export const searchArticles = async (query, limit = 10) => {
    const response = await axios.get(`${API_URL}/articles/search`, {
        params: {
            q: query,
            limit,
            lang: getLanguage()
        }
    });
    return response.data;
};

// Update reading progress
export const updateProgress = async (articleId, data, token) => {
    const response = await axios.post(
        `${API_URL}/articles/${articleId}/progress`,
        data,
        {
            headers: { Authorization: `Bearer ${token}` }
        }
    );
    return response.data;
};
