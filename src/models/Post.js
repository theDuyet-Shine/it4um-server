import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    tag: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
    content: { type: String, required: true },
    post_date: { type: Date, default: Date.now },
    modify_date: { type: Date, default: Date.now },
    total_views: { type: Number, default: 0 },
    total_likes: { type: Number, default: 0 },
    like_by: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    total_comments: { type: Number, default: 0 }
});

export const postModel = mongoose.model("post", postSchema)