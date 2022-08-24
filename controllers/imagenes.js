const { storage } = require('../middlewares/multer');
const Image = require('../models/Imagenes');

const subirImagenes = async (req, res) => {
  console.log(req.body);
  const image = new Image();
  image.titulo = req.body.titulo;
  image.descripcion = req.body.descripcion;
  image.archivo = req.file.filename;
  image.path = '/img/subidas/' + req.file.filename;
  image.nombreOriginal = req.file.originalname;
  image.mimetype = req.file.mimetype;
  image.tamanio = req.file.size;
  /*  await image.save(); */
  res.redirect('/');
};

module.exports = {
  subirImagenes,
};
