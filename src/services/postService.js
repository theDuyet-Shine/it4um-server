import {
  createPost,
  deletePostById,
  filterPost,
  getPostById,
  updatePostById,
} from "../repositories/PostRepo.js";

export const createPostService = async (postData) => {
  return await createPost(postData);
};

export const getPostByIdService = async (id) => {
  return await getPostById(id);
};

export const updatePostService = async (id, updateData) => {
  return await updatePostById(id, updateData);
};

export const deletePostService = async (id) => {
  return await deletePostById(id);
};

export const filterPostService = async (filterParams) => {
  return await filterPost(filterParams);
};
