import mongoose from "mongoose";

const emailBanListSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
});

export const emailBanListModel = mongoose.model(
  "email_ban_list",
  emailBanListSchema
);
