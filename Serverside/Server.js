const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./Routes/auth');
// const commentRoutes = require('./Routes/comments');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});


app.use('/api/auth', authRoutes);

const postRoutes = require('./Routes/posts');
app.use('/api/posts', postRoutes);


const commentRoutes = require('./Routes/comments');
app.use('/api/comments', commentRoutes);
