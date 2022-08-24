const { Router } = require('express');
const router = Router();
const { subirImagenes, obtenerImagenes } = require('../controllers/imagenes');
const Image = require('../models/Imagenes');

// Obterner listado de imagenes

router.get('/', obtenerImagenes);

// Ruta para subir imágenes

router.post('/subir', subirImagenes);

// Obtener una sola imagen

router.get('/imagen/:id', (req, res) => {
  console.log(req.params.id);
  res.send('Perfil de Imagenes');
});

// borrar una imagen

router.get('/borrar/:id/', (req, res) => {
  res.send('Borrada');
});

module.exports = router;
