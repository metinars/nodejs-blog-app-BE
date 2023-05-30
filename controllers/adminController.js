const Blog = require('../models/blogs');

const adminGetAll = async (req, res, next) => {
  try {
    const getAllPosts = await Blog.find();
    return res.status(200).json({ getAllPosts });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const adminGetDetail = async (req, res, next) => {
  try {
    const { id } = req.params;
    const getDetailPost = await Blog.findById(id);
    res.status(200).json({
      getDetailPost,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const adminAddPost = async (req, res, next) => {
  try {
    const newPost = await Blog.create(req.body);
    res.status(201).json({
      newPost,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const adminPostDelete = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Blog.findByIdAndRemove(id);
    res.status(200).json({
      message: 'Deleting success!',
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  adminGetAll,
  adminGetDetail,
  adminAddPost,
  adminPostDelete,
};
