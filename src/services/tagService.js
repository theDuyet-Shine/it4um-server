import { createTag, getAllTag } from "../repositories/tagRepo.js";

const createTagService = async (tag_name) => {
  try {
    const createdTag = await createTag(tag_name);
    return createdTag;
  } catch (error) {
    console.error("Error while creating tag:", error);
    throw new Error("Could not create tag");
  }
};

const getAllTagService = async () => {
  try {
    const tags = await getAllTag();
    return tags;
  } catch (error) {
    console.error("Error while getting tags:", error);
    throw new Error("Could not fetch tags");
  }
};

export { createTagService, getAllTagService };
