import { postModel } from "../models/Post.js";
import { deleteCommentByPostId } from "../repositories/CommentRepo.js";
import { deleteNotificationByPostId } from "../repositories/NotificationRepo.js";
import {
  createPost,
  deletePostById,
  filterPost,
  getPostByAuthorId,
  getPostById,
  getPostsByDate,
  updatePostById,
  updatePostView,
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
  await updatePostView(id);
  return post;
};

const updatePostService = async (id, updateData) => {
  return await updatePostById(id, updateData);
};

const deletePostService = async (id) => {
  try {
    const post = await getPostById(id);
    if (!post) {
      throw new Error(`Post with id: ${id} not found`);
    }

    await updateUserById(post.author, { $inc: { total_post: -1 } });
    await deleteNotificationByPostId(id);
    await deleteCommentByPostId(id);
    return await deletePostById(id);
  } catch (error) {
    console.error("Error in deletePostService:", error);
    throw error;
  }
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

const getPostsByAuthorIdService = async (
  authorId,
  { sort, tag, search, page, limit }
) => {
  try {
    return await getPostByAuthorId(authorId, {
      sort,
      tag,
      search,
      page,
      limit,
    });
  } catch (error) {
    throw new Error(`Failed to fetch posts from service: ${error.message}`);
  }
};

const getPostsByDateService = async (date, page) => {
  try {
    const posts = await getPostsByDate(date, page);
    return posts;
  } catch (err) {
    throw new Error(`Service error: ${err}`);
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
  getPostsByAuthorIdService,
  getPostsByDateService,
};
