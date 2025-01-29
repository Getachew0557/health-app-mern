import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // Add CORS support
import { connectDB } from './config/db.js';
import userRoute from './routes/userRoute.js';

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors()); // Enable CORS

// Routes
app.use('/api/user', userRoute);

// Database connection
connectDB();

// Server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
