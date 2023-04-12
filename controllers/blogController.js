const Blog = require('../models/blogs');

const blog_index = (req, res, next) => {
  let blogs;
  try {
    blogs = Blog.find();
  } catch (err) {
    console.log(err);
    return next(err);
  }
  res.status(200).json({ title: blogs.title });
};

const blog_content = (req, res, next) => {
  const id = req.params.id;
  let blogs;
  try {
    blogs = Blog.findById(id);
  } catch (error) {
    console.log(error);
    return next(error);
  }
  res.json({ title: blogs.title });
};

module.exports = {
  blog_index,
  blog_content,
};
