const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');

router.get('/getAll', adminController.adminGetAll);
router.get('/getDetail/:id', adminController.adminGetDetail);
router.post('/add', adminController.adminAddPost);
router.delete('/delete/:id', adminController.adminDelete);

module.exports = router;