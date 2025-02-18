import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js"; // Use `import` instead of `require`
import jwt from "jsonwebtoken";
import authMiddleware from "../middlewares/authMiddleware.js"; // ✅ Correct import
import Doctor from "../models/doctorModel.js";

const router = express.Router();

// Route to create a new user
router.post("/register", async (req, res) => {
  try {
    console.log("Register request received:", req.body); // Log request data

    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res
        .status(200)
        .send({ message: "User already exists", success: false });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    const newUser = new User(req.body);
    await newUser.save();
    res
      .status(200)
      .send({ message: "User created successfully", success: true });
  } catch (error) {
    console.error("Error in /register route:", error.message); // Log the error
    res.status(500).send({ message: "Error creating user", success: false });
  }
});

// Route to login a user
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(200).send({ message: "User not found", sucess: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "Incorrect Password", sucess: false });
    } else {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      res
        .status(200)
        .send({ message: "Login successful", data: token, success: true });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({
        message: "error logging in",
        success: false,
        error: error.message,
      });
  }
});

// Route to get all users
router.get("/get-all-users", authMiddleware, async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send({ success: true, users });
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).send({ message: "Error fetching users", success: false });
  }
});

// Create a protected route using middleware to avoid directly compare to database

router.post("/get-user-info-by-id", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
    user.password = undefined;
    if (!user) {
      return res
        .status(200)
        .send({ message: "User not found", success: false });
    } else {
      return res.status(200).send({ success: true, data: user });
    }
  } catch (error) {
    res
      .status(500)
      .send({
        message: "Error getting user info",
        success: false,
        error: error,
      });
  }
});

// Route to create a new doctor
router.post("/apply-doctor-account", authMiddleware, async (req, res) => {
  try {
    const newdoctor = new Doctor({ ...req.body, status: "pending" });
    await newdoctor.save();
    const adminUser = await User.findOne({ isAdmin: true });
    const unseenNotifications = adminUser.unseenNotifications;
    unseenNotifications.push({
      type: "new-doctor-request",
      message: `${newdoctor.firstName} ${newdoctor.lastName} has applied for a doctor account`,
      data: {
        doctorId: newdoctor._id,
        name: newdoctor.firstName + " " + newdoctor.lastName,
      },
      onclickPath: "/admin/doctors",
    });
    await User.findByIdAndUpdate(adminUser._id, { unseenNotifications });
    res
      .status(200)
      .send({ message: "Doctor account applied  successfully", success: true });
  } catch (error) {
    console.error("Error in /register route:", error.message); // Log the error
    res
      .status(500)
      .send({ message: "Error on apply doctor", success: false, error });
  }
});

// Mark notification as seen
// Mark notification as seen
router.post(
  "/mark-all-notifications-as-seen",
  authMiddleware,
  async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.body.userId });
      const unseenNotifications = user.unseenNotifications;
      const seenNotifications = user.seenNotifications || [];
      seenNotifications.push(...unseenNotifications);
      user.unseenNotifications = [];
      user.seenNotifications = seenNotifications;
      const updatedUser = await user.save();
      updatedUser.password = undefined;

      res.status(200).send({
        success: true,
        message: "All notifications marked as seen",
        user: updatedUser,
      });
    } catch (error) {
      console.error("Error in /mark-all-notifications-as-seen route:", error.message); // Log the error
      res.status(500).send({
        success: false,
        message: "Error marking notifications as seen",
        error,
      });
    }
    }
  
);

export default router;
