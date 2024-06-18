import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  post_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "post",
    required: true,
  },
  commenter_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  content: { type: String, required: true },
  comment_at: { type: Date, default: Date.now },
});

export const commentModel = mongoose.model("comment", commentSchema);
