const fs = require('fs');
const path = require('path');
const multer = require('multer');

const uploadDirectory = path.join(__dirname, '../../uploads/products');
fs.mkdirSync(uploadDirectory, { recursive: true });

const allowedTypes = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDirectory),
  filename: (_req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase();
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${extension}`);
  },
});

const productUpload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024, files: 6 },
  fileFilter: (_req, file, cb) => {
    if (!allowedTypes.has(file.mimetype)) return cb(new Error('Only JPG, PNG, WEBP, and GIF images are allowed'));
    cb(null, true);
  },
});

module.exports = productUpload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'images', maxCount: 5 },
]);
