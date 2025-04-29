const Post = require('../models/postModel');

exports.listPublic = async (req, res) => {
  // Modified to limit to 6 posts
  const posts = await Post.getLatest(6);
  res.json({ success: true, posts });
};

exports.listAll = async (req, res) => {
  const posts = await Post.getAll();
  res.json({ success: true, posts });
};

exports.create = async (req, res) => {
  const { content, type } = req.body;
  if (!content || !type) return res.json({ success: false, error: 'All fields required' });
  await Post.create({ content, type });
  res.json({ success: true });
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { content, type } = req.body;
  await Post.update(id, { content, type });
  res.json({ success: true });
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  await Post.delete(id);
  res.json({ success: true });
};