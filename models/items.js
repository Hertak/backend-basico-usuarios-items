const { Schema, model } = require('mongoose');

const ItemSchma = Schema({

    nombre:{
        type: String,
        required: true
    },
    direccion:{
        type: String,
        required: true,
    },
    
});
module.exports = model('Item', ItemSchma);