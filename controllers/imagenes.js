const { response } = require('express');
const Image = require('../models/Imagenes');

const subirImagenes = async (req, res) => {
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
};

const obtenerImagenes = async (req, res) => {
  const images = await Image.find();

  res.status(201).json({
    ok: true,
    images,
  });
};

module.exports = {
  subirImagenes,
  obtenerImagenes,
};
