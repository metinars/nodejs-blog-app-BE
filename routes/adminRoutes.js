const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
// const authMiddle = require('../middleware/authMiddle');

router.get('/getAll', adminController.admin_index);
router.get('/getDetail/:id', adminController.admin_get_detail)
router.post('/add', adminController.admin_add_post);
router.delete('/delete/:id', adminController.admin_delete);

module.exports = router;
