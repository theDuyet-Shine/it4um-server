import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  type: { type: String, required: true },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  commenter_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  post_id: { type: mongoose.Schema.Types.ObjectId, ref: "post" },
  message: { type: String },
  comment_at: { type: Date, default: Date.now },
  status: { type: String, default: "unread" },
});

export const notificationModel = mongoose.model(
  "notification",
  notificationSchema
);
