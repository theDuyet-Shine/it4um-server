import { adminDeletePost } from "../services/adminService.js";

const adminDeletePostController = async (req, res) => {
  const { postId, violation_score } = req.body;

  try {
    // Gọi đến adminDeletePost từ service để xóa bài đăng
    await adminDeletePost(postId, violation_score);

    // Trả về phản hồi thành công nếu không có lỗi
    return res.status(200).json({ message: "Post deleted successfully." });
  } catch (error) {
    // Xử lý lỗi nếu có bất kỳ lỗi nào xảy ra trong quá trình xóa bài đăng
    console.error("Error in adminDeletePost:", error);
    return res.status(500).json({ error: "Failed to delete post." });
  }
};
export { adminDeletePostController };
