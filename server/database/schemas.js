import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  id: String,
  name: String,
  email: String,
  password: String,
  score: Number,
});

const CardSchema = new Schema({
  title: String,
  text: String,
  answer: Boolean,
  author: String,
});

export const User = mongoose.model("User", UserSchema);
export const Card = mongoose.model("Card", CardSchema);
