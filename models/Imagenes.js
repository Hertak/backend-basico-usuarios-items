const { Schema, model } = require('mongoose');

const imageSchema = new Schema({
  titulo: { type: String },
  descripcion: { type: String },
  archivo: { type: String },
  path: { type: String },
  nombreOriginal: { type: String },
  mimetype: { type: String },
  tamanio: { type: Number },
  creado: { type: Date, default: Date.now() },
});

module.exports = model('Image', imageSchema);
