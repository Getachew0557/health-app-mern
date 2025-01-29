import express from 'express';
import bcrypt from 'bcryptjs'; 
import User from '../models/userModel.js'; // Use `import` instead of `require`
import jwt from 'jsonwebtoken';
import authMiddleware from '../middlewares/authMiddleware.js'; // ✅ Correct import


const router = express.Router();

// Route to create a new user
router.post('/register', async (req, res) => {
    try {
      console.log('Register request received:', req.body); // Log request data
  
      const userExists = await User.findOne({ email: req.body.email });
      if (userExists) {
        return res.status(200).send({ message: "User already exists", success: false });
      }
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      req.body.password = hashedPassword;
  
      const newUser = new User(req.body);
      await newUser.save();
      res.status(200).send({ message: 'User created successfully', success: true });
    } catch (error) {
      console.error('Error in /register route:', error.message); // Log the error
      res.status(500).send({ message: 'Error creating user', success: false });
    }
  });
  

// Route to login a user
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({email: req.body.email});
    if (!user){
        return res.status(200).send({message: "User not found", sucess: false});
    }
    const isMatch = await bcrypt.compare(req.body.password,user.password);
    if(!isMatch){
        return res.status(200).send({message: "Invalid credentials", sucess: false});  
    }
    else {
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1d'});
        res.status(200).send({message: "Login successful", data: token, success: true});
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "error logging in", success: false, error: error.message });
  }
});

// Create a protected route using middleware to avoid directly compare to database

router.post('/get-user-info-by-id', authMiddleware, async (req, res) => {
    try {

        const user = await User.findOne({_id: req.body.userId});
        if(!user){
            return res.status(200).send({message: "User not found", success: false});
        }else {
            return res.status(200).send({success: true, data:{
                name: user.name,
                email: user.email,
            }});
        }
        
    } catch (error) {
        res.status(500).send({message: "Error getting user info", success: false, error: error});
        
    }
});

export default router;
