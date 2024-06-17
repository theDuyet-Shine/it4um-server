import {
  createPost,
  deletePostById,
  filterPost,
  getPostById,
  updatePostById,
} from "../repositories/PostRepo.js";
import { updateUserById } from "../repositories/UserRepo.js";

export const createPostService = async (postData) => {
  try {
    const newPost = await createPost(postData);

    await updateUserById(postData.author, { $inc: { total_post: 1 } });

    return newPost;
  } catch (error) {
    console.error("Error in createPostService:", error);
    throw error;
  }
};

export const getPostByIdService = async (id) => {
  const post = await getPostById(id);
  await updatePostById(post._id, { $inc: { total_views: 1 } });
  return post;
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
