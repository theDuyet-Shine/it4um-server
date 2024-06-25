import {
  changePasswordService,
  findUserByEmailService,
  getUserByIdService,
  updateUserByIdService,
} from "../services/userService.js";

const getUserByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "Thiếu ID!" });
    const user = await getUserByIdService(id);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const updateUserByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const userData = req.body;
    if (!id) return res.status(400).json({ message: "Thiếu ID" });
    if (!userData)
      return res.status(400).json({ message: "Thiếu thông tin cập nhật" });

    const user = await updateUserByIdService(id, userData);
    return res.status(200).json({ message: "Thành công", user });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const changePasswordController = async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;

    if (!id) return res.status(400).json({ message: "Thiếu ID" });
    if (!password) return res.status(400).json({ message: "Thiếu mật khẩu" });
    const updatedUser = await changePasswordService(id, password);
    res
      .status(200)
      .json({ message: "Đổi mật khẩu thành công", user: updatedUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const findUserByEmailController = async (req, res) => {
  try {
    const { email } = req.params;
    if (!email) return res.status(400).json({ messgae: "Thiếu email" });
    const user = await findUserByEmailService(email);
    if (user)
      res.status(200).json({ message: "Email có tồn tại trong hệ thống" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export {
  getUserByIdController,
  updateUserByIdController,
  changePasswordController,
  findUserByEmailController,
};
