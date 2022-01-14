import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  score: { type: Number, required: true },
});

const CardSchema = new Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  answer: { type: Boolean, required: true },
  author: { type: String, required: true },
});

export const User = mongoose.model("User", UserSchema);
export const Card = mongoose.model("Card", CardSchema);
