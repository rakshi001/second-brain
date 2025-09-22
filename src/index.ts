import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const app = express();


app.get("/", (req, res) => {
  res.json({
    msg: "hi there",
  });
  console.log("hitting the end point");
});

app.post('api/v1/signup',(req,res)=>{

})

app.post('api/v1/signin',(req,res)=>{
    
})









































app.listen(3000);
