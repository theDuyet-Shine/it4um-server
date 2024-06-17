import { tagModel } from "../models/Tag.js";

const createTag = async (tag_name) => {
  const tag = new tagModel({ tag_name: tag_name });
  return await tag.save();
};

const getAllTag = async () => {
  const tags = await tagModel.find();
  return tags;
};

export { createTag, getAllTag };
