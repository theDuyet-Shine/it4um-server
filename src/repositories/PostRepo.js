import { postModel } from "../models/Post.js";

export const createPost = async (postData) => {
  const post = new postModel(postData);
  return await post.save();
};

export const getPostById = async (id) => {
  const post = await postModel.findById(id).populate("author like_by").exec();
  return post;
};

export const updatePostById = async (id, updateData) => {
  const post = await postModel.findByIdAndUpdate(id, updateData, { new: true });
  return post;
};

export const deletePostById = async (id) => {
  return await postModel.findByIdAndDelete(id);
};

export const filterPost = async ({ sort, tag, search, page }) => {
  const POSTS_PER_PAGE = 5;
  const skip = (page - 1) * POSTS_PER_PAGE;

  let query = {};
  if (tag) {
    // Nếu tag là chuỗi, phân tách nó thành mảng
    const tagsArray = tag.split(",");
    query.tags = { $all: tagsArray };
  }
  if (search) query.title = { $regex: search, $options: "i" };

  let sortOrder = { post_date: -1 };
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
