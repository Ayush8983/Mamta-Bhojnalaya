const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {
  getMenuItems,
  addMenuItem,
  deleteMenuItem,
} = require('../controllers/adminMenuController');

// 📸 Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // path relative to root where your `uploads` folder is
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

// ✅ GET all menu items
router.get('/', getMenuItems);

// ✅ POST - add menu item with image
router.post('/', upload.single('image'), addMenuItem);

// ✅ DELETE menu item
router.delete('/:id', deleteMenuItem);

module.exports = router;
