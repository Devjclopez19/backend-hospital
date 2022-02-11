/*
    Ruta: /api/medicos
*/
const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const medicosController = require('./../controllers/medicos');

const router = Router();

router.get('/', validarJWT, medicosController.getMedicos);

router.post('/',
    [
        validarJWT,
        check('nombre', 'El nombre del medico es obligatorio').not().isEmpty(),
        check('hospital','El hospital id debe ser valido').isMongoId(),
        validarCampos
    ], 
    medicosController.crearMedico
);

router.put('/:id', 
    [
        
    ],
    medicosController.updateMedico
);

router.delete('/:id', medicosController.deleteMedico);

module.exports = router;