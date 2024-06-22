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
    console.log(commentData);
    const post = await getPostById(commentData.post_id);

    if (post) {
      // Update total_comments count for the post
      await updatePostById(commentData.post_id, {
        $inc: { total_comments: 1 },
      });

      // Create the new comment
      const newComment = await createComment(commentData);
      console.log("New comment created:", newComment);

      // Check if this is a reply
      if (commentData.reply_to) {
        console.log("This is a reply to another comment");

        // Fetch the parent comment to get the author's ID
        const parentComment = await getCommentById(commentData.reply_to._id);
        console.log("Parent comment fetched:", parentComment);

        // Fetch the commenter for the new comment
        const commenter = await findUserById(commentData.commenter_id);
        console.log("Commenter fetched:", commenter);

        // Check if the commenter of the new comment is the same as the parent commenter
        if (
          commenter._id.toString() !== parentComment.commenter_id.toString()
        ) {
          // Fetch parent commenter
          const parentCommenter = await findUserById(
            parentComment.commenter_id
          );
          console.log("Parent commenter fetched:", parentCommenter);

          if (parentCommenter) {
            // Create notification only if not self-reply
            const notificationData = {
              type: "reply",
              user_id: parentComment.commenter_id,
              commenter_id: commentData.commenter_id,
              post_id: post._id,
              message: `${commenter.fullname} đã trả lời vào bình luận của bạn`,
            };

            await createNotification(notificationData);
            console.log("Reply notification created:", notificationData);
          }
        }
      } else {
        console.log("This is a top-level comment");

        // Check if commenter is not the post author
        if (commentData.commenter_id.toString() !== post.author.toString()) {
          // Fetch commenter
          const commenter = await findUserById(commentData.commenter_id);
          console.log("Commenter fetched:", commenter);

          if (commenter) {
            // Create notification only if commenter is not post author
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
