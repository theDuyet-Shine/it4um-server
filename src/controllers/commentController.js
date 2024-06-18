import {
  createCommentService,
  getCommentsService,
} from "../services/commentService.js";

export const createCommentController = async (req, res) => {
  try {
    const commentData = req.body;
    const newComment = await createCommentService(commentData);
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCommentsController = async (req, res) => {
  try {
    const { postId, page } = req.query;
    const comments = await getCommentsService(postId, page);
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
