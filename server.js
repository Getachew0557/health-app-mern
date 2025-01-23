import express from 'express'
import dotenv  from 'dotenv'
const app = express();

const PORT = process.env.PORT || 5000

//Express js listen method to run project on http://localhost:5000
app.listen(PORT, console.log(`App is running on port ${PORT}`))
