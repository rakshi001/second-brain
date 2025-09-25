import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { UserModel } from "./db.js";
import { JWT_PASSWORD } from "./config.js";
import { userMiddleware } from "./middleware.js";

const jwt_password = JWT_PASSWORD;

const app = express();

app.use(express.json());
app.get("/", (req, res) => {
  res.json({
    msg: "hi there",
  });
  console.log("hitting the end point");
});

app.post("/api/v1/signup", async (req, res) => {
  //zod validation
  const { username, password } = req.body;
  try {
    await UserModel.create({
      username: username,
      password: password,
    });
    console.log("user created");
    res.json({
      message: "user signed up",
    });
  } catch (e) {
    res.status(411).json({
      "server crashed ": "user already exist",
    });
  }
});

app.post("/api/v1/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const existingUser = await UserModel.findOne({
    username,
    password,
  });

  if (existingUser) {
    const token = jwt.sign(
      {
        id: existingUser._id,
      },
      jwt_password
    );
    res.json({
      token,
    });
  } else {
    res.status(403).json({
      message: "incorrect credentials",
    });
  }
});

app.post("/api/v1/content", userMiddleware, (req, res) => {
  //link,title,tags,userid
  const { link, type } = req.body;
});
app.delete("/api/v1/signin", (req, res) => {});

app.post("/api/v1/brain/share", (req, res) => {});

app.get("/api/v1/brain/:shareLink", (req, res) => {});

app.listen(3000);

// imports
// setup app
// connect to mongodb
// define schema and model
// create an endpoint /users where we get details
// start the server

// import express from "express";
// import mongoose, { Schema, Document } from "mongoose";

// const app = express();

// mongoose
//   .connect(
//     "mongodb+srv://mlrakshi1_db_user:rakshi123@cluster0.6oggzpz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
//     {
//       dbName: "second_brain",
//     }
//   )
//   .then(() => console.log("mongodb connected"))
//   .catch((err) => console.error("mongo not connected", err));

// interface IUser extends Document {
//   name: string;
//   email: string;
//   password: string;
//   age: Number;
// }

// const UserSchema = new Schema<IUser>({
//   name: String,
//   email: String,
//   password: String,
//   age: Number,
// });

// const User = mongoose.model<IUser>("User", UserSchema);

// app.get("/users", async (req, res) => {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch {
//     res.status(500).json({
//       msg: "crashed",
//     });
//   }
// });
// app.listen(3000);
