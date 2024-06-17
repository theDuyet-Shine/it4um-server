import { createTagService, getAllTagService } from "../services/tagService.js";

const createTagController = async (req, res) => {
  const { tag_name } = req.body;

  try {
    const createdTag = await createTagService(tag_name);
    res.status(201).json(createdTag);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllTagController = async (req, res) => {
  try {
    const tags = await getAllTagService();
    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { createTagController, getAllTagController };
