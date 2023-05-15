const Blog = require('../models/blogs');

const admin_index = (req, res, next) => {
  let blogs;
  try {
    blogs = Blog.find();
    return res.status(201).json({
      title: blogs.title,
      short: blogs.short
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const admin_get_detail = async (req, res, next) => {
  try {
    const { id } = req.params;
    const detailPost = await Blog.findById(id)
    res.status(200).json({
      detailPost
    })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
};

const admin_add_post = async (req, res, next) => {
  try {
    const newPost = await Blog.create(req.body);
    res.status(201).json({
      newPost
    })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
};

// const admin_delete = (req, res, next) => {
//   const id = req.params.id;

//   let blogDelete;

//   try {
//     blogDelete = Blog.findByIdAndDelete(id);
//   } catch (err) {
//     console.log(err);
//     return next(err);
//   }
//   res.status(200).json({ message: 'Blog deleted', noteId: id });
// };

const admin_delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Blog.findByIdAndRemove(id)
    res.status(200).json({
      message: 'Deleting success!'
    })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
};

module.exports = {
  admin_index,
  admin_get_detail,
  admin_add_post,
  admin_delete,
};
