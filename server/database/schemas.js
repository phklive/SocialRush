import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  score: { type: Number, required: true },
});

const CardSchema = new Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  text: { type: String, required: true },
  answer: { type: Boolean, required: true },
  author: { type: String, required: true },
});

CardSchema.plugin(mongoosePaginate)

export const User = mongoose.model("User", UserSchema);
export const Card = mongoose.model("Card", CardSchema);
