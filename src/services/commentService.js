import { createComment, getComments } from "../repositories/CommentRepo.js";
import { getPostById, updatePostById } from "../repositories/PostRepo.js";

export const createCommentService = async (commentData) => {
  try {
    const post = await getPostById(commentData.post_id);
    if (post) {
      await updatePostById(commentData.post_id, {
        $inc: { total_comments: 1 },
      });
      const newComment = createComment(commentData);
      return newComment;
    }
  } catch (error) {
    throw error;
  }
};

export const getCommentsService = async (postId, page) => {
  try {
    const comments = await getComments(postId, page);
    return comments;
  } catch (error) {
    throw error;
  }
};
