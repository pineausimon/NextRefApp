import axios from "../../../shared/api/axios";
import type { ContentId, UserCollectionId, UserId } from "../../../types/ids";

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
  const result = await axios.get(`/collections/${userId}`);
  return result.data;
};

export const getCollectionById = async (id: UserCollectionId) => {
  const result = await axios.get(`/collections/${id}`);
  return result.data;
};

export const createCollection = async (data: CreateCollectionCommand) => {
  const result = await axios.post('/collections', data);
  return result.data;
};

export const addContentToCollection = async (data: AddContentToCollectionCommand) => {
  const result = await axios.post(`/collections/${data.userCollectionId}/items`, data);
  return result.data;
};

// export const updateCollection = async (data: UpdateCollectionCommand) => {
//   const result = await axios.put(`/collections/${data.id}`, data);
//   return result.data;
// };

// export const deleteCollection = async (id: CollectionId) => {
//   const result = await axios.delete(`/collections/${id}`);
//   return result.data;
// };