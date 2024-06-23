import { postModel } from "../models/Post.js";

const createPost = async (postData) => {
  const post = new postModel(postData);
  return await post.save();
};

const getPostById = async (id) => {
  const post = await postModel.findById(id).populate("author").exec();
  return post;
};

const updatePostById = async (id, updateData) => {
  updateData.modify_date = Date.now();
  const post = await postModel.findByIdAndUpdate(id, updateData, { new: true });
  return post;
};

const deletePostById = async (id) => {
  return await postModel.findByIdAndDelete(id);
};

const filterPost = async ({ sort, tag, search, page }) => {
  const POSTS_PER_PAGE = 8;
  const skip = (page - 1) * POSTS_PER_PAGE;

  let query = {};
  if (tag) {
    // Nếu tag là chuỗi, phân tách nó thành mảng
    const tagsArray = tag.split(",");
    query.tags = { $all: tagsArray };
  }
  if (search) query.title = { $regex: search, $options: "i" };

  let sortOrder = { modify_date: -1 };
  if (sort === "likes") sortOrder = { total_likes: -1 };
  if (sort === "views") sortOrder = { total_views: -1 };

  const posts = await postModel
    .find(query)
    .sort(sortOrder)
    .skip(skip)
    .limit(POSTS_PER_PAGE)
    .populate("author like_by")
    .exec();
  const totalPosts = await postModel.countDocuments(query);
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  return { posts, totalPages };
};

const getPostByAuthorId = async (
  authorId,
  { sort, tag, search, page, limit }
) => {
  try {
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 5;

    const POSTS_PER_PAGE = limit;
    const skip = (page - 1) * POSTS_PER_PAGE;

    let query = { author: authorId };

    if (tag) {
      const tagsArray = tag.split(",");
      query.tags = { $all: tagsArray };
    }

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    let sortOrder = { modify_date: -1 };
    if (sort === "likes") sortOrder = { total_likes: -1 };
    if (sort === "views") sortOrder = { total_views: -1 };

    const posts = await postModel
      .find(query)
      .sort(sortOrder)
      .skip(skip)
      .limit(POSTS_PER_PAGE)
      .populate("author like_by")
      .exec();

    const totalPosts = await postModel.countDocuments(query);
    const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

    return { posts, currentPage: page, totalPages };
  } catch (error) {
    throw new Error(
      `Failed to fetch posts for author with ID ${authorId}: ${error.message}`
    );
  }
};

const getPostsByDate = async (date, page) => {
  const pageSize = 5;
  const skip = (page - 1) * pageSize;
  const startOfDay = new Date(date);
  startOfDay.setUTCHours(0, 0, 0, 0);
  const endOfDay = new Date(date);
  endOfDay.setUTCHours(23, 59, 59, 999);

  try {
    // Count total number of posts in the given date range
    const totalPosts = await postModel.countDocuments({
      modify_date: { $gte: startOfDay, $lte: endOfDay },
    });

    // Calculate total number of pages
    const totalPages = Math.ceil(totalPosts / pageSize);

    // Find posts for the specified date range and pagination
    const posts = await postModel
      .find({
        modify_date: { $gte: startOfDay, $lte: endOfDay },
      })
      .sort({ modify_date: -1 })
      .skip(skip)
      .limit(pageSize)
      .populate("author");

    return {
      posts,
      totalPages,
    };
  } catch (err) {
    throw new Error(`Failed to fetch posts: ${err}`);
  }
};

export {
  createPost,
  getPostById,
  deletePostById,
  updatePostById,
  filterPost,
  getPostByAuthorId,
  getPostsByDate,
};
