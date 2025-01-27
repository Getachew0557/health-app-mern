import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';  // Import the connectDB function
import User from './models/user.model.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to the local MongoDB
connectDB();

app.post("/api/users", async(req, res) => {
  const user = req.body; //user will send this data

  if(!user.name || !user.price || !user.image) {
    return res.status(400).json({success:false, message: "please provide all fields"});

  }
   
  const newUser = new User(user)
  try{
    await newUser.save();
    res.status(201).json({success: true, data: newUser});
  }catch (error){
    console.error("Error on create user");

  }
});

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
