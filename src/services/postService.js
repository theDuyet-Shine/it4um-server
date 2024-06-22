import { postModel } from "../models/Post.js";
import {
  createPost,
  deletePostById,
  filterPost,
  getPostById,
  updatePostById,
} from "../repositories/PostRepo.js";
import { updateUserById } from "../repositories/UserRepo.js";

const createPostService = async (postData) => {
  try {
    const newPost = await createPost(postData);

    await updateUserById(postData.author, { $inc: { total_post: 1 } });

    return newPost;
  } catch (error) {
    console.error("Error in createPostService:", error);
    throw error;
  }
};

const getPostByIdService = async (id) => {
  const post = await getPostById(id);
  await updatePostById(post._id, { $inc: { total_views: 1 } });
  return post;
};

const updatePostService = async (id, updateData) => {
  return await updatePostById(id, updateData);
};

const deletePostService = async (id) => {
  return await deletePostById(id);
};

const filterPostService = async (filterParams) => {
  return await filterPost(filterParams);
};

const likePostService = async (userId, postId) => {
  try {
    // Increase total_likes by 1 and add userId to like_by array
    const updatedPost = await postModel.findByIdAndUpdate(
      postId,
      {
        $inc: { total_likes: 1 },
        $addToSet: { like_by: userId }, // Add userId to like_by array if not already present
      },
      { new: true }
    );

    return updatedPost;
  } catch (error) {
    console.error("Error in likePostService:", error);
    throw error;
  }
};

const unlikePostService = async (userId, postId) => {
  try {
    const updatedPost = await postModel.findByIdAndUpdate(
      postId,
      {
        $inc: { total_likes: -1 },
        $pull: { like_by: userId },
      },
      { new: true }
    );

    return updatedPost;
  } catch (error) {
    console.error("Error in unlikePostService:", error);
    throw error;
  }
};

export {
  createPostService,
  getPostByIdService,
  updatePostService,
  deletePostService,
  likePostService,
  unlikePostService,
  filterPostService,
};
