const express = require('express');
const mongoose = require('mongoose');

const Post = require('../models/Post');

const router = express.Router();

function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

router.post('/', async (req, res) => {
  // Create a new Post instance from req.body and save it to MongoDB
  try {
    const post = await Post.create(req.body);
      // Return the created post with status code 201.
    res.status(201).json(post);
    // Error handling
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({error: error.message});
  }
});

router.get('/', async (req, res) => {
  // TODO: Query all posts from MongoDB.
  try {
    const posts = await Post.find().sort({ createdAt: -1});
      // Return the results as JSON.
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  // Validate req.params.id using isValidObjectId().
  if (!isValidObjectId(id)) {
    return res.status(400).json({ error: 'Invalid post id' });
  }
  // Find one post by id.
  try {
    const post = await Post.findById(id);
    // Return 404 if the post is not found.
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

});

router.put('/:id', async (req, res) => {
  const id = req.params.id;
  // TODO: Validate req.params.id using isValidObjectId().
  if (!isValidObjectId(id)) {
    return res.status(400).json({ error: 'Invalid post id' });
  }
  // Update the post with req.body.
  try {
    const post = await Post.findByIdAndUpdate( id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    // Return the updated post as JSON.
    res.json(post);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message});
    }
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  // Validate req.params.id using isValidObjectId().
  if (!isValidObjectId(id)) {
    return res.status(400).json({ error: 'Invalid post id' });
  }
  // Delete the post by id.
  try {
    const post = await Post.findByIdAndDelete(id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    // Return a success message as JSON.
    res.json({ message: 'Post deleted succesfully' });
  } catch (error) {
    res.status(500).json({ error: error.message});
  }
});

module.exports = router;