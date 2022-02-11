/*
    Ruta: /api/todo
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-jwt');

const busquedaContoller = require('../controllers/busquedas');

const router = Router();

router.get('/:busqueda', validarJWT, busquedaContoller.getTodo);
router.get('/coleccion/:tabla/:busqueda', validarJWT, busquedaContoller.getDocs);

module.exports = router;