import { emailBanListModel } from "../models/EmailBanList.js";
import { userModel } from "../models/User.js";
import { getPostById } from "../repositories/PostRepo.js";
import { deleteUserById } from "../repositories/UserRepo.js";
import { deletePostService } from "./postService.js";

const adminDeletePost = async (postId, violation_score) => {
  try {
    // Lấy thông tin của bài đăng từ ID
    const post = await getPostById(postId);

    // Kiểm tra xem bài đăng có tồn tại không
    if (!post) {
      throw new Error("Post not found!");
    }

    // Kiểm tra điều kiện để xử lý vi phạm
    if (post.author.violation_score + violation_score >= 20) {
      // Xóa người dùng và các thông tin liên quan nếu vi phạm quá mức cho phép
      await deleteUserById(post.author._id);
      const bannedEmail = new emailBanListModel({
        email: post.author.email,
      });

      await bannedEmail.save();
    } else {
      // Cập nhật điểm vi phạm của tác giả bài đăng
      await userModel.findByIdAndUpdate(post.author._id, {
        $inc: { violation_score: violation_score },
      });
      await deletePostService(postId);
    }
  } catch (error) {
    console.error("Error in adminDeletePost:", error);
    throw error;
  }
};

export { adminDeletePost };
