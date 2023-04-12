const Blog = require('../models/blogs');

const admin_index = (req, res, next) => {
  let blogs;
  try {
    blogs = Blog.find();
  } catch (err) {
    console.log(err);
    return next(err);
  }
  res.json({ title: blogs.title, shor: blogs.short });
};

const admin_add = (req, res, next) => {
  res.render('add');
};

const admin_add_post = async (req, res, next) => {
  const {title, short, long} = req.body;

  const blog = new Blog({
    title: title,
    short: short,
    long: long
  });
  
    try {
        await blog
            .save()
            .then((result) => {
                console.log('post');
            })
            .catch((err) => console.log(err));
    } catch (err) {
        return next(err)
    }
    res.json(blog);

};

const admin_delete = (req, res, next) => {
  const id = req.params.id;

  let blogDelete;

  try {
    blogDelete = Blog.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    return next(err);
  }
  res.status(200).json({ message: 'Blog deleted', noteId: id });
};

module.exports = {
  admin_index,
  admin_add,
  admin_add_post,
  admin_delete,
};
