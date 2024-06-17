import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
  tag_name: { type: String, required: true, unique: true },
  created_at: { type: Date, default: Date.now },
});

export const tagModel = mongoose.model("tag", tagSchema);
