import { commentModel } from "../models/Comment.js";

const createComment = async (commentData) => {
  try {
    const newComment = await commentModel.create(commentData);
    return newComment;
  } catch (error) {
    throw error;
  }
};

const getCommentById = async (id) => {
  const comment = await commentModel.findById(id);
  return comment;
};

const getComments = async (postId, page) => {
  const limit = 5;
  const skip = (page - 1) * limit;

  const topLevelComments = await commentModel
    .find({ post_id: postId, reply_to: null })
    .sort({ comment_at: -1 })
    .skip(skip)
    .limit(limit)
    .populate("commenter_id", "fullname profile_image")
    .exec();

  const topLevelCommentIds = topLevelComments.map((comment) => comment._id);
  const replies = await commentModel
    .find({ post_id: postId, reply_to: { $in: topLevelCommentIds } })
    .sort({ comment_at: 1 })
    .populate("commenter_id", "fullname profile_image")
    .exec();

  const allComments = topLevelComments.map((comment) => {
    const commentReplies = replies.filter((reply) =>
      reply.reply_to.equals(comment._id)
    );
    return { ...comment.toObject(), replies: commentReplies };
  });

  const totalComments = await commentModel.countDocuments({ post_id: postId });

  return {
    comments: allComments,
    totalComments,
  };
};

export { createComment, getComments, getCommentById };
