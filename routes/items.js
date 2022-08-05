/* 
    Rutas de los items de la web
    host + /api/items/          (GET para obtener todos los items)
    host + /api/items/          (POST crear nuevo item)
    host + /api/items/:id       (PUT para actualizar nuevo item)
    host + /api/items/:id       (DELETE para borrar items)
 */

   const { Router } = require('express');
   const { validarJWT } = require('../middlewares/validar-jwt');
   const { getItems, crearItem, actualizarItem, borrarItem } = require('../controllers/items');    
   const { check } = require('express-validator');
   const { validarCampos } = require('../middlewares/validar-campos');
   const { isDate } = require('../helpers/isDate');
    

   // Llamar al router
   const router = Router();
   // validación JWT
   router.use( validarJWT );

   // Obtener todos los items

   router.get('/', getItems);
    
   // Crear nuevo item

    router.post('/',
    
    [
      check('nombre', 'El nombre es obligatorio').not().isEmpty(),
      check('direccion', 'la dirección es obligatorio').not().isEmpty(),
      check('start', 'la fecha es obligatorio').custom( isDate ),
      check('end', 'la fecha de finalización es obligatorio').custom( isDate ),
      validarCampos
    ],
    crearItem
    ); 


   // Actualizar item
    router.put('/:id',
    [
      check('nombre', 'El nombre es obligatorio').not().isEmpty(),
      check('direccion', 'la dirección es obligatorio').not().isEmpty(),
      check('start', 'la fecha es obligatorio').custom( isDate ),
      check('end', 'la fecha de finalización es obligatorio').custom( isDate ),
      validarCampos
    ],
    actualizarItem);

   // Borrar item
    router.delete('/:id', borrarItem); 
    
    //exportar módulo router
    module.exports = router;