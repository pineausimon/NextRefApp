import axios from '../../../shared/api/axiosInstance';

export type SearchContributorsQuery = {
    keyword: string;
};

export const searchContributors = async (query: SearchContributorsQuery) => {
    const result = await axios.post('/contributors/search', query);
    return result.data;
};