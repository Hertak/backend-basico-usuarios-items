const { Schema, model } = require('mongoose');

const ItemSchema = Schema({
  nombre: {
    type: String,
    require: true,
  },
  telefono: {
    type: String,
  },
  direccion: {
    type: String,
  },

  slug: {
    type: String,
  },
  deturno: {
    type: Array,
  },
  op_imagen: {
    type: String,
  },

  usuario: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
  },
});

// Modificar __v y _id para que se vea mejor en la base de datos, solo modifica el llamado al metodo toJSON
ItemSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});
module.exports = model('Item', ItemSchema);
