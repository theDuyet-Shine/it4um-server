import {
  createPostService,
  deletePostService,
  filterPostService,
  getPostByIdService,
  likePostService,
  unlikePostService,
  updatePostService,
} from "../services/postService.js";

const createPostController = async (req, res) => {
  try {
    const postData = req.body;
    const newPost = await createPostService(postData);
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPostByIdController = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await getPostByIdService(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePostController = async (req, res) => {
  try {
    const postId = req.params.id;
    const updateData = req.body;
    const updatedPost = await updatePostService(postId, updateData);
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePostController = async (req, res) => {
  try {
    const postId = req.params.id;
    await deletePostService(postId);
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const filterPostController = async (req, res) => {
  try {
    const { sort, tag, search, page } = req.query;

    const pageNumber = parseInt(page, 10) || 1;

    const { posts, totalPages } = await filterPostService({
      sort,
      tag,
      search,
      page: pageNumber,
    });

    res.json({ posts, totalPages });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const likePostController = async (req, res) => {
  try {
    const { userId, postId } = req.body;
    const updatedPost = await likePostService(userId, postId);
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const unlikePostController = async (req, res) => {
  try {
    const { userId, postId } = req.body;
    const updatedPost = await unlikePostService(userId, postId);
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  createPostController,
  getPostByIdController,
  updatePostController,
  deletePostController,
  filterPostController,
  likePostController,
  unlikePostController,
};
