const express = require('express');
const app = express();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: path.join(__dirname, '../public/subidas'),
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const subidas = multer({
  storage,
  dest: path.join(__dirname, '../public/subidas'),
}).single('imagen');

module.exports = {
  subidas,
};
