/* 
    Rutas de Usuarios
    host + /api/auth/nuevo      (POST crear usuario)
    host + /api/auth/            (POST login usuario)
    host + /api/auth/renovar    (POST renovar token)
 */

const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();
const { validarCampos } = require('../middlewares/validar-campos');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');

 router.post('/nuevo', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe ser de 6 caracteres').isLength({ min: 6 }),
    validarCampos
 ], crearUsuario );

router.post('/',
[
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe ser de 6 caracteres').isLength({ min: 6 }),
    validarCampos
],
 loginUsuario ); 

router.get('/renovar', revalidarToken); 

module.exports = router;