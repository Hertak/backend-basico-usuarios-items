const express = require('express');
const path = require('path');
const multer = require('multer');
const uuid = require('uuid').v4;
const app = express();
app.use(express.urlencoded({ extended: false }));

const storage = multer.diskStorage({
  destination: path.join(__dirname, 'public/img/subidas'),
  filename: (req, file, cb, filename) => {
    cb(null, uuid() + path.extname(file.originalname));
  },
});
app.use(multer({ storage: storage }).single('image'));

module.exports = {
  storage,
};
