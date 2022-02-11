/*
    Ruta: /api/upload
*/
const { Router } = require('express');
const fileUpload = require('express-fileupload');

const { validarJWT } = require('../middlewares/validar-jwt');

const uploadsController = require('../controllers/uploads');

const router = Router();

router.use(fileUpload());

router.put('/:tipo/:id', validarJWT, uploadsController.fileUpload);
router.get('/:tipo/:img', validarJWT, uploadsController.retornaImagen);

module.exports = router;