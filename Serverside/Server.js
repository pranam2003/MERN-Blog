const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./Routes/auth');
const postRoutes = require('./Routes/posts');
const commentRoutes = require('./Routes/comments');

const app = express();

// ⭐ Correct CORS setup for Render + Local
app.use(
  cors({
    origin: [
      "https://mern-blogfrontend.onrender.com", // Your frontend Render URL
      "http://localhost:5173"                   // Local development
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  })
);

// ⭐ Middleware
app.use(express.json());

// ⭐ MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// ⭐ Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

// ⭐ Start server
app.listen(process.env.PORT || 5000, () => {
  console.log(`🚀 Server running on port ${process.env.PORT}`);
});
