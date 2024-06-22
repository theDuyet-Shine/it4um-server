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
  try {
    const limit = 5; // Số lượng comment trên mỗi trang
    const skip = (page - 1) * limit;

    // Step 1: Fetch top-level comments
    const topLevelComments = await commentModel
      .find({ post_id: postId, reply_to: null }) // Fetch comments where reply_to is null (top-level comments)
      .sort({ comment_at: -1 }) // Sắp xếp theo thời gian comment mới nhất
      .skip(skip)
      .limit(limit)
      .populate("commenter_id", "username profile_image") // Populate thông tin của commenter
      .exec();

    // Step 2: Fetch replies for top-level comments
    // Assuming each top-level comment has an _id property (adjust this as per your schema)
    const topLevelCommentIds = topLevelComments.map((comment) => comment._id);
    const replies = await commentModel
      .find({ post_id: postId, reply_to: { $in: topLevelCommentIds } }) // Fetch comments where reply_to is in topLevelCommentIds
      .sort({ comment_at: 1 }) // Sắp xếp theo thời gian comment cũ nhất trước
      .populate("commenter_id", "username profile_image") // Populate thông tin của commenter
      .exec();

    // Combine top-level comments and their replies into a single array
    const allComments = [];
    topLevelComments.forEach((comment) => {
      allComments.push(comment);
      const commentReplies = replies.filter((reply) =>
        reply.reply_to.equals(comment._id)
      );
      allComments.push(...commentReplies);
    });

    const totalComments = await commentModel.countDocuments({
      post_id: postId,
    });

    return {
      comments: allComments,
      totalComments,
    };
  } catch (error) {
    throw error;
  }
};

export { createComment, getComments, getCommentById };
