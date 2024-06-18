import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  type: { type: String, required: true },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  post_id: { type: mongoose.Schema.Types.ObjectId, ref: "post" },
  content: { type: String },
});

export const notificationModel = mongoose.model(
  "notification",
  notificationSchema
);
