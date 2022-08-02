
const { response } = require('express');
const Item = require( '../models/items' );


// Crear un nuevo item

const getItems = (req, res = response) => {

    res.json({
        ok: true,
        mensaje: 'Todos los items'
    })
 
}
const crearItem = async(req, res = response) => {

    const item = new Item( req.body );

    try {
        
        item.usuario = req.uid;
        const itemGuardado = await item.save()

        res.json({
            ok: true,
            item: itemGuardado
        })
        
    } catch (error) { 
        console.log(error);
        res.status(500).json({
            ok: false,
            mensaje: 'Hable con el administrador'
        });
        
    }

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