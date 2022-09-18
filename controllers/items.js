const { response } = require('express');
const Item = require('../models/items');

// Obtener los items

const getItems = async (req, res = response) => {
  // Metodo Find para listar y metodo populate para llenar la referencia
  const items = await Item.aggregate([{ $sample: { size: 30 } }]);

  res.json({
    ok: true,
    items,
  });
};
const getRandomItems = async (req, res = response) => {
  // Metodo Find para listar Items
  const items = await Item.aggregate([{ $sample: { size: 4 } }]);

  res.json({
    ok: true,
    items,
  });
};
// Obtener turnos
const getItemsTurnos = async (req, res = response) => {
  const url = req.params.deturno;

  const items = await Item.aggregate([
    { $match: { deturno: url } },
    { $sample: { size: 10 } },
  ]);

  res.json({
    ok: true,
    items,
  });
};
const crearItem = async (req, res = response) => {
  const item = new Item(req.body);

  try {
    item.usuario = req.uid;
    const itemGuardado = await item.save();

    res.json({
      ok: true,
      item: itemGuardado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      mensaje: 'Hable con el administrador',
    });
  }
};

// Buscar por slug item
const itemPorSlug = async (req, res = response) => {
  const url = req.params.slug;

  /* const slug = req.body.slug;
  const item = await Item.findById(slug); */

  const itemslug = await Item.findOne({ slug: url });

  if (itemslug !== undefined && itemslug !== null) {
    res.json({
      ok: true,
      item: itemslug,
    });
  } else {
    return res.status(404).json({
      ok: false,
      mensaje: 'El Item no existe por ese slug',
    });
  }
};
// Actualizar item
const actualizarItem = async (req, res = response) => {
  const itemId = req.params.id;
  const uid = req.uid;

  try {
    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({
        ok: false,
        mensaje: 'El Item no existe por ese id',
      });
    }
    if (item.usuario.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        mensaje: 'No tiene permiso para editar este item',
      });
    }

    const nuevoItem = {
      ...req.body,
      usuario: uid,
    };

    const itemActualizado = await Item.findByIdAndUpdate(itemId, nuevoItem, {
      new: true,
    });

    res.json({
      ok: true,
      item: itemActualizado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      mensaje: 'Hable con el admin',
    });
  }
};

const borrarItem = async (req, res = response) => {
  const itemId = req.params.id;
  const uid = req.uid;

  try {
    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({
        ok: false,
        mensaje: 'El Item no existe por ese id',
      });
    }
    if (item.usuario.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        mensaje: 'No tiene permiso para borrar este item',
      });
    }

    const borrarItem = {
      ...req.body,
      usuario: uid,
    };

    const itemBorrado = await Item.findByIdAndDelete(itemId, borrarItem);

    res.json({
      ok: true,
      borrado: Ok,
      item: itemBorrado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      mensaje: 'Hable con el admin',
    });
  }
};

module.exports = {
  getItems,
  crearItem,
  actualizarItem,
  borrarItem,
  itemPorSlug,
  getRandomItems,
  getItemsTurnos,
};
