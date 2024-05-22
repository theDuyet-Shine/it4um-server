import {
  getUserByIdService,
  updateUserByIdService,
} from "../services/userService.js";

export const getUserByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "Id not provided!" });
    const user = await getUserByIdService(id);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const updateUserByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const userData = req.body;
    if (!id) return res.status(400).json({ message: "Id not provided" });
    if (!userData)
      return res.status(400).json({ message: "Update Info not provided" });

    const user = await updateUserByIdService(id, userData);
    return res.status(200).json({ message: "Success", user });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
