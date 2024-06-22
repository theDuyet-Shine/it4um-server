import {
  createComment,
  getCommentById,
  getComments,
} from "../repositories/CommentRepo.js";
import { createNotification } from "../repositories/NotificationRepo.js";
import { getPostById, updatePostById } from "../repositories/PostRepo.js";
import { findUserById } from "../repositories/UserRepo.js";

const createCommentService = async (commentData) => {
  try {
    const post = await getPostById(commentData.post_id);

    if (post) {
      // Update total_comments count for the post
      await updatePostById(commentData.post_id, {
        $inc: { total_comments: 1 },
      });

      // Create the new comment
      const newComment = await createComment(commentData);
      console.log("New comment created:", newComment);

      if (commentData.reply_to) {
        console.log("This is a reply to another comment");

        // Fetch the parent comment to get the author's ID
        const parentComment = await getCommentById(commentData.reply_to);
        console.log("Parent comment fetched:", parentComment);

        if (
          parentComment &&
          parentComment.commenter_id.toString() !==
            commentData.commenter_id.toString()
        ) {
          const parentCommenter = await findUserById(
            parentComment.commenter_id
          );
          console.log("Parent commenter fetched:", parentCommenter);

          if (parentCommenter) {
            const notificationData = {
              type: "reply",
              user_id: parentComment.commenter_id,
              commenter_id: commentData.commenter_id,
              post_id: post._id,
              message: `${commentData.fullname} đã trả lời vào bình luận của bạn`,
            };

            await createNotification(notificationData);
            console.log("Reply notification created:", notificationData);
          }
        }
      } else {
        console.log("This is a top-level comment");

        if (commentData.commenter_id.toString() !== post.author.toString()) {
          const commenter = await findUserById(commentData.commenter_id);
          console.log("Commenter fetched:", commenter);

          if (commenter) {
            const notificationData = {
              type: "comment",
              user_id: post.author,
              commenter_id: commentData.commenter_id,
              post_id: post._id,
              message: `${commenter.fullname} đã bình luận về bài viết của bạn`,
            };

            await createNotification(notificationData);
            console.log(
              "Top-level comment notification created:",
              notificationData
            );
          }
        }
      }

      return newComment;
    }
  } catch (error) {
    console.error("Error in createCommentService:", error);
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
