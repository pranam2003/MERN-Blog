// server/db.js or directly in server.js
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/blogDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('connected', () => {
    console.log('✅ Mongoose connected to blogDB');
});

db.on('error', (err) => {
    console.error('❌ Mongoose connection error:', err);
});

db.on('disconnected', () => {
    console.log('🔌 Mongoose disconnected');
});

module.exports = db;
