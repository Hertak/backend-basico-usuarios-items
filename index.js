const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');
const multer = require('multer');
const path = require('path');
const uuid = require('uuid').v4;

require('dotenv').config();

//Crear servidor Express

const app = express();

// Para manejo de imagenes Multer
const storage = multer.diskStorage({
  destination: path.join(__dirname, 'public/subidas'),
  filename: (req, file, cb) => {
    cb(null, uuid() + path.extname(file.originalname));
  },
});

app.use(
  multer({
    storage,
    dest: path.join(__dirname, 'public/subidas'),
    fileFilter: function (req, file, cb) {
      const filetypes = /jpeg|jpg|png|gif/;
      const mimetype = filetypes.test(file.mimetype);
      const extname = filetypes.test(
        path.extname(file.originalname).toLowerCase()
      );

      if (mimetype && extname) {
        return cb(null, true);
      }
      cb('Error: La subida de imágenes solo soporta - ' + filetypes);
    },
    limits: { fileSize: 100000000 },
  }).single('imagen')
);

// Base de datos

dbConnection();

// CORS

app.use(cors());

//Directorio Publico

app.use(express.static('public'));

//Lectura del body

app.use(express.json());

//Rutas

// Ruta usuarios

app.use('/api/auth', require('./routes/auth'));

// Ruta items

app.use('/api/items', require('./routes/items'));

// Ruta de Imágenes
app.use('/api/imagenes', require('./routes/admImagenes'));
//escuchar peticiones

app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});
