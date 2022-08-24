const { Router } = require('express');
const router = Router();
const Image = require('../models/Imagenes');
/* const { subirImagenes } = require('../controllers/imagenes'); */

// Obterner listado de imagenes

router.get('/', async (req, res) => {
  /* const images = await Image.find(); */

  res.render('index');
});

// Ruta para subir imágenes

router.post('/subir', async (req, res) => {
  const image = new Image();
  image.titulo = req.body.titulo;
  image.descripcion = req.body.descripcion;
  image.archivo = req.file.filename;
  image.path = '/subidas/' + req.file.filename;
  image.nombreOriginal = req.file.originalname;
  image.mimetype = req.file.mimetype;
  image.tamanio = req.file.size;

  await image.save();
  res.status(201).json({
    ok: true,
    imagen: image.nombreOriginal,
  });
});

// Obtener una sola imagen

router.get('/imagen/:id', (req, res) => {
  res.send('Perfil de Imagenes');
});

// borrar una imagen

router.get('/borrar/:id/', (req, res) => {
  res.send('Borrada');
});

module.exports = router;
