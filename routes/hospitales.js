/*
    Ruta: /api/hospitales
*/
const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const hospitalesController = require('./../controllers/hospitales');

const router = Router();

router.get('/', validarJWT, hospitalesController.getHospitales);

router.post('/',
    [
        validarJWT,
        check('nombre', ' El nombre del hospital es necesario').not().isEmpty(),
        validarCampos
    ], 
    hospitalesController.crearHospital
);

router.put('/:id', 
    [
        validarJWT,
        check('nombre', ' El nombre del hospital es necesario').not().isEmpty(),
        validarCampos
    ],
    hospitalesController.updateHospital
);

router.delete('/:id', validarJWT, hospitalesController.deleteHospital);

module.exports = router;