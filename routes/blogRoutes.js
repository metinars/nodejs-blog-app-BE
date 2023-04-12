const express = require('express');
const router = express.Router();
const blogConroller = require('../controllers/blogController');

router.get('/getAll', blogConroller.blog_index);
router.get('/get/:id', blogConroller.blog_content);
router.post('/add', (req, res, next) => {
    res.json({ mesaj: 'mesaj' })
});

module.exports = router;