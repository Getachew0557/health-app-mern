import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Logging the MongoDB URL to confirm it's being read correctly
console.log(process.env.MONGO_URL);

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
