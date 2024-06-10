import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullname: { type: String, required: true },
  profile_image: {
    type: String,
    default:
      "https://th.bing.com/th/id/OIP.ZXSgz-LNexQRb5OgjOrr6wHaFv?rs=1&pid=ImgDetMain",
  },
  address: { type: String, default: null },
  phone_number: { type: String, default: null },
  email: { type: String, required: true, unique: true },
  expertise: { type: String, default: null },
  total_post: { type: Number, default: 0 },
});

export const userModel = mongoose.model("user", userSchema);
