import axios from '../../../shared/api/axiosInstance';
import { withErrorHandling } from '../../../shared/api/withErrorHandling';
import type { ContentId } from '../../../types/ids';
import type { CreateContentCommand } from './models/CreateContentCommand';
import type { SearchContentsQuery } from './models/SearchContentsQuery';
import type { UpdateContentCommand } from './models/UpdateContentCommand';

export const getContents = async () => {
    return withErrorHandling(axios.get('/contents'));
};

export const getContentById = async (id: ContentId) => {
    return withErrorHandling(axios.get(`/contents/${id}`));
};

export const searchContents = async (query: SearchContentsQuery) => {
    return withErrorHandling(axios.post('/contents/search', query));
};

export const createContent = async (data: CreateContentCommand) => {
    return withErrorHandling( axios.post('/contents', data));
};

export const updateContent = async (data: UpdateContentCommand) => {
    return withErrorHandling(axios.put(`/contents/${data.id}`, data));
};

export const deleteContent = async (id: ContentId) => {
    return withErrorHandling(axios.delete(`/contents/${id}`));
};
