import { createComment, getComments } from "../repositories/CommentRepo.js";
import { notificationRepo } from "../repositories/NotificationRepo.js";
import { getPostById, updatePostById } from "../repositories/PostRepo.js";
import { findUserById } from "../repositories/UserRepo.js";

const createCommentService = async (commentData) => {
  try {
    const post = await getPostById(commentData.post_id);
    if (post) {
      await updatePostById(commentData.post_id, {
        $inc: { total_comments: 1 },
      });
      const newComment = createComment(commentData);
      if (commentData.commenter_id.toString() !== post.author.toString()) {
        const commenter = await findUserById(commentData.commenter_id);
        if (commenter) {
          const notificationData = {
            type: "comment",
            user_id: post.author,
            commenter_id: commenter._id,
            post_id: post._id,
            message: `${commenter.fullname} đã bình luận về bài viết của bạn`,
          };

          await notificationRepo.createNotification(notificationData);
        }
      }

      return newComment;
    }
  } catch (error) {
    throw error;
  }
};

const getCommentsService = async (postId, page) => {
  try {
    const comments = await getComments(postId, page);
    return comments;
  } catch (error) {
    throw error;
  }
};

export { getCommentsService, createCommentService };
