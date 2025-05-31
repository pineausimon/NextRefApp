
import axios from "../../../shared/api/axios";
import type { ContentId } from "../../../types/ids";

export type CreateContentCommand = {
  title: string;
  type: string;
  publishedAt: Date;
  description: string;
};

export type UpdateContentCommand = {
  id: ContentId;
  title: string;
  type: string;
  publishedAt: Date;
  description: string;
};

export type SearchContentsQuery = {
  keyword?: string;
  sortBy?: string;
  limit?: number;
}

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
