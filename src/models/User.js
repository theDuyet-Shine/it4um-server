import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    address: { type: String },
    phone_number: { type: String },
    email: { type: String, required: true, unique: true },
    expertise: { type: String },
    total_post: { type: Number, default: 0 }
});

export const userModel = mongoose.model("user", userSchema)