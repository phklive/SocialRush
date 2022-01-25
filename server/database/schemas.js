import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  highScore: { type: Number, required: true },
  wolf: { type: Number, required: true },
  sheep: { type: Number, required: true }
},
{
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
},
);

const CardSchema = new Schema({
  id: { type: String, required: true },
  report: { type: Number, required: true},
  title: { type: String, required: true },
  text: { type: String, required: true },
  author: { type: String, required: true },
  true: { type: Number, required: true },
  false: { type: Number, required: true },
}, 
{
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
},
);

export const User = mongoose.model("User", UserSchema);
export const Card = mongoose.model("Card", CardSchema);
