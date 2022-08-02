
const { response } = require('express');



// Crear un nuevo item

const getItems = (req, res = response) => {

    res.json({
        ok: true,
        mensaje: 'Todos los items'
    })
 
}
const crearItem = (req, res = response) => {

    res.json({
        ok: true,
        mensaje: 'Crear items'
    })
}

const actualizarItem = (req, res = response) => {

    res.json({
        ok: true,
        mensaje: 'Actualizar items'
    })
 
}
const borrarItem = (req, res = response) => {

    res.json({
        ok: true,
        mensaje: 'Borrar items'
    })
 
}

module.exports = {
    getItems,
    crearItem,
    actualizarItem,
    borrarItem
}