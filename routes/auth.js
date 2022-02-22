/*
    Ruta: /api/login
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const authContoller = require('../controllers/auth');

const router = Router();

router.post('/', 
    [
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos
    ],
    authContoller.login
)

router.post('/google', 
    [
        check('token', 'El token de Google es obligatorio').not().isEmpty(),
        validarCampos
    ],
    authContoller.googleSignIn
)

router.get('/renew', 
    validarJWT,
    authContoller.renewToken
)

module.exports = router;