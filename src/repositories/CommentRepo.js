import { commentModel } from "../models/Comment.js";

const createComment = async (commentData) => {
  try {
    // Create the comment
    const newComment = await commentModel.create(commentData);

    // Populate the fields after creation
    const populatedComment = await commentModel
      .findById(newComment._id)
      .populate("commenter_id", "fullname profile_image")
      .populate("reply_to");

    return populatedComment;
  } catch (error) {
    throw error;
  }
};

const getCommentById = async (id) => {
  const comment = await commentModel
    .findById(id)
    .populate("commenter_id", "fullname profile_image");
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
