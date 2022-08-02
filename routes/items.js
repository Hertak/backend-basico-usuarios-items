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
    

   // Llamar al router
   const router = Router();
   // validación JWT
   router.use(validarJWT);

   // Obtener todos los items

   router.get('/', getItems);
    
   // Crear nuevo item

    router.post('/', crearItem); 

   // Actualizar item
    router.put('/:id', actualizarItem);

   // Borrar item
    router.delete('/:id', borrarItem); 
    
    //exportar módulo router
    module.exports = router;