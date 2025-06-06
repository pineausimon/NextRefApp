import axios from '../../../shared/api/axiosInstance';
import type { ContentId } from '../../../types/ids';
import type { CreateContentCommand } from './models/CreateContentCommand';
import type { SearchContentsQuery } from './models/SearchContentsQuery';
import type { UpdateContentCommand } from './models/UpdateContentCommand';

export const getContents = async () => {
    const result = await axios.get('/contents');
    return result.data;
};

export const getContentById = async (id: ContentId) => {
    const result = await axios.get(`/contents/${id}`);
    return result.data;
};

export const searchContents = async (query: SearchContentsQuery) => {
    const result = await axios.post('/contents/search', query);
    return result.data;
};

export const createContent = async (data: CreateContentCommand) => {
    const result = await axios.post('/contents', data);
    return result.data;
};

export const updateContent = async (data: UpdateContentCommand) => {
    const result = await axios.put(`/contents/${data.id}`, data);
    return result.data;
};

export const deleteContent = async (id: ContentId) => {
    const result = await axios.delete(`/contents/${id}`);
    return result.data;
};
