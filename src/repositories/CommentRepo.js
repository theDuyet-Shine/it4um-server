import { commentModel } from "../models/Comment.js";

const createComment = async (commentData) => {
  try {
    const newComment = await commentModel.create(commentData);
    return newComment;
  } catch (error) {
    throw error;
  }
};

const getComments = async (postId, page) => {
  try {
    const limit = 5; // Số lượng comment trên mỗi trang
    const skip = (page - 1) * limit;
    const comments = await commentModel
      .find({ post_id: postId })
      .sort({ comment_at: -1 }) // Sắp xếp theo thời gian comment mới nhất
      .skip(skip)
      .limit(limit)
      .populate("commenter_id", "username profile_image") // Populate thông tin của commenter
      .exec();

    const totalComments = await commentModel.countDocuments({
      post_id: postId,
    });

    return {
      comments,
      totalComments,
    };
  } catch (error) {
    throw error;
  }
};

export { createComment, getComments };
