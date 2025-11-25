const express      = require('express');
const router       = express.Router();
const Comment      = require('../Models/Comment');
const verifyToken  = require('../middleware/authMiddleware');

// POST /api/comments/:postId → add a comment....
router.post('/:postId', verifyToken, async (req, res) => {
  try {
    const comment = new Comment({
      post: req.params.postId,
      user: req.user.id,
      text: req.body.text
    });
    await comment.save();
    // this
    // populate user for response
    await comment.populate('user', 'username');
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/comments/:postId → get all comments for that post
router.get('/:postId', async (req, res) => {
  try {
    const comments = await Comment
      .find({ post: req.params.postId })
      .populate('user', 'username')
      .sort({ createdAt: 1 });
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
