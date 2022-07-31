
const { response } = require('express');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');

// Crear Usuario

const crearUsuario = async(req, res = response) => {

   const { email, password } = req.body;
try {

    let usuario = await Usuario.findOne({ email });
    

     if ( usuario ) {
        return res.status(400).json({
            ok: false,
            msg: 'Un usuario ya existe con ese correo'
        });
    } 
    
    usuario = new Usuario(req.body);
// Encriptar contraseña

    const salt = await bcrypt.genSaltSync(10);
    usuario.password = await bcrypt.hashSync(password, salt);
// Guardar usuario en la base de datos
    await usuario.save(); 
// Generar token
    const token = await generarJWT(usuario.id, usuario.name);

    res.status(201).json({
        ok: true,
        uid: usuario.id,
        name: usuario.name,
        token
    });
}
 catch (error) {
    res.status(500).json({
        ok: false,
        mensaje: 'Por favor hable con un administrador'
    })
    
}
}
   
// Login Usuario
const loginUsuario = async(req, res = response) => {

    const { email, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ email });
    

     if ( !usuario ) {
        return res.status(400).json({
            ok: false,
            msg: 'El usuario o la contraseña no existe'
        });
    } 

    // Confirmar contraseñas 

    const validPassword = bcrypt.compareSync(password, usuario.password);

    if ( !validPassword ) {
        return res.status(400).json({
            ok: false,
            msg: 'El usuario o la contrasña no existe'
        });


    }
// Generar token
const token = await generarJWT( usuario.id, usuario.name );

    res.json({
        ok: true,
        uid: usuario.id,
        name: usuario.name,
        token

    })

 } catch (error) {
        res.status(500).json({
            ok: false,
            mensaje: 'Por favor hable con un administrador'
        })
    }
        
    

// Manejar errores
    const errors = validationResult( req );
    
    if (!errors.isEmpty()) {
        return res.status(500).json({
            ok: false,
            errors: errors.array()
        })
    }
}
// Revalidar Token
const revalidarToken =  (req, res = response) => {

    
    res.json({
        ok: true,
        mensaje: 'Renovar'
    })
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}