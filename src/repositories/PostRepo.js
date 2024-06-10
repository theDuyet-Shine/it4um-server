import { postModel } from "../models/Post";

export const createPost = async (postData) => {
  const post = new postModel(postData);
  return await post.save();
};

export const getPostById = async(id) => {
    const post = await postModel.findById(id).populate('author like_by').exec()
    return post;
}

export const filterPost