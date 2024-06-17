import mongoose from "mongoose";

let profile_image_name_list = [
  "Lola",
  "Snickers",
  "Annie",
  "Ginger",
  "Mitten",
  "Milo",
  "Lucy",
  "Simon",
  "Loky",
  "Casper",
  "Spooky",
];

const getRandomName = () => {
  const randomIndex = Math.floor(
    Math.random() * profile_image_name_list.length
  );
  return profile_image_name_list[randomIndex];
};

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullname: { type: String, required: true },
  profile_image: {
    type: String,
    default: () => {
      return `https://api.dicebear.com/8.x/avataaars/svg?seed=${getRandomName()}`;
    },
  },
});

export const adminModel = mongoose.model("admin", adminSchema);
