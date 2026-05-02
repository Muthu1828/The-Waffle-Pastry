const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Multer Storage Configuration
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'waffle-pastry-products',
    allowed_formats: ['jpg', 'png', 'jpeg']
  }
});

const upload = multer({ storage });

router.post('/', protect, admin, upload.single('image'), (req, res) => {
  if (req.file && req.file.path) {
    res.json({
      message: 'Image uploaded successfully',
      url: req.file.path
    });
  } else {
    res.status(400).json({ message: 'Failed to upload image' });
  }
});

module.exports = router;
