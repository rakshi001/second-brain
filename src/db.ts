/**
 create the skeletons(backend end points) 
 create the schema
 complete the end points
 */

import mongoose, { model, Schema } from "mongoose";
import dotenv from "dotenv"

dotenv.config();


const MONGO_URL = process.env.MONGO_DB_URL as string
mongoose.connect(
  "mongodb+srv://mlrakshi1_db_user:rakshi123@cluster0.6oggzpz.mongodb.net/"
);
const UserSchema = new Schema({
  username: { type: String, unique: true },
  password: { type: String },
});

export const UserModel = model("User", UserSchema, "myUsers");
