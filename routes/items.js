/* 
    Rutas de los items de la web
    host + /api/items/          (GET para obtener todos los items)
    host + /api/items/          (POST crear nuevo item)
    host + /api/items/:id       (PUT para actualizar nuevo item)
    host + /api/items/:id       (DELETE para borrar items)
    host + /api/items/:slug      (GET para para obtener items por slug )
    host + /api/items/random      (Get para obtenert random items)
 */

const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const {
  getItems,
  crearItem,
  actualizarItem,
  borrarItem,
  itemPorSlug,
  getRandomItems,
  getItemsTurnos,
} = require('../controllers/items');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

// Llamar al router
const router = Router();

// Obtener todos los items

router.get('/', getItems);

// Obtener objetos random
router.get('/random', getRandomItems);

// Obtener turnos
router.get('/turnos/:deturno', getItemsTurnos);

// Obtener por slug

router.get('/:slug', itemPorSlug);
// Crear nuevo item

// validación JWT
router.use(validarJWT);
router.post(
  '/',

  [check('nombre', 'El nombre es obligatorio').not().isEmpty(), validarCampos],
  crearItem
);

// Actualizar item
router.put(
  '/:id',
  [check('nombre', 'El nombre es obligatorio').not().isEmpty(), validarCampos],
  actualizarItem
);

// Borrar item
router.delete('/:id', borrarItem);

//exportar módulo router
module.exports = router;
