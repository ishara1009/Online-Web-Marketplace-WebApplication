const fs = require('fs');
const path = require('path');
const multer = require('multer');

const uploadDirectory = path.join(__dirname, '../../uploads/avatars');
fs.mkdirSync(uploadDirectory, { recursive: true });

const allowedTypes = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);
const storage = multer.diskStorage({
  destination: (_req, _file, callback) => callback(null, uploadDirectory),
  filename: (_req, file, callback) => {
    const extension = path.extname(file.originalname).toLowerCase();
    callback(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${extension}`);
  },
});

module.exports = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024, files: 1 },
  fileFilter: (_req, file, callback) => {
    if (!allowedTypes.has(file.mimetype)) return callback(new Error('Only JPG, PNG, WEBP, and GIF images are allowed'));
    callback(null, true);
  },
});
