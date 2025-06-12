import axios from '../../../shared/api/axiosInstance';
import { withErrorHandling } from '../../../shared/api/withErrorHandling';
import type { ContentId, UserCollectionId, UserId } from '../../../types/ids';

export type CreateCollectionCommand = {
    userId: UserId;
    name: string;
};

export type AddContentToCollectionCommand = {
    userId: UserId;
    userCollectionId: UserCollectionId;
    contentId: ContentId;
};

export const getUserCollections = async (userId: UserId) => {
    return withErrorHandling(axios.get(`/collections/${userId}`));
};

export const getCollectionById = async (id: UserCollectionId) => {
    return withErrorHandling(axios.get(`/collections/${id}`));
};

export const createCollection = async (data: CreateCollectionCommand) => {
    return withErrorHandling(axios.post('/collections', data));
};

export const addContentToCollection = async (data: AddContentToCollectionCommand) => {
    return withErrorHandling(axios.post(`/collections/${data.userCollectionId}/items`, data));
};

// export const updateCollection = async (data: UpdateCollectionCommand) => {
//   const result = await axios.put(`/collections/${data.id}`, data);
//   return result.data;
// };

// export const deleteCollection = async (id: CollectionId) => {
//   const result = await axios.delete(`/collections/${id}`);
//   return result.data;
// };
