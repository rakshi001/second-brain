/**
 create the skeletons(backend end points) 
 create the schema
 complete the end points
 */

import mongoose, { model, Schema } from "mongoose";
import dotenv from "dotenv";
import { ObjectId } from "mongodb";

dotenv.config();

const MONGO_URL = process.env.MONGO_DB_URL as string;
mongoose.connect(MONGO_URL);
const UserSchema = new Schema({
  username: { type: String, unique: true },
  password: { type: String },
});

export const UserModel = model("User", UserSchema, "myUsers");

const ContentSchema = new Schema({
  title: String,
  link: String,
  tags: [{ type: mongoose.Types.ObjectId, ref: "Tag" }],
  userId: { type: mongoose.Types.ObjectId },
});
export const ContentModel = model("Content", ContentSchema);
