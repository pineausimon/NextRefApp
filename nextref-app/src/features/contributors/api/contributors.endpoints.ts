import axios from '../../../shared/api/axiosInstance';
import { withErrorHandling } from '../../../shared/api/withErrorHandling';

export type SearchContributorsQuery = {
    keyword: string;
};

export const searchContributors = async (query: SearchContributorsQuery) => {
    return withErrorHandling(axios.post('/contributors/search', query));
};