import express from 'express';
import upload from '../services/multer'

import {verificarcodigoorganizador, cambiarcontrasena, enviarcodigoverificacioncorreo, 
    verificarcodigo, actualizarcorreo, registrarusuario, login, logout, enviarcodigocambiocontrasena,obteneruniversidades} from '../Controller/usuario.controller';

const router = express.Router();

router.post('/verificarcodigo', verificarcodigo);
router.post('/verificarorganizador', verificarcodigoorganizador);
router.post('/actualizarcorreo', actualizarcorreo);
router.post('/verificacion/correo', enviarcodigoverificacioncorreo);
router.post('/verificacion/contrasena', enviarcodigocambiocontrasena);
router.post('/registrar', upload.single('recibo') ,registrarusuario);

router.post('/login', login);
router.post('/logout', logout);
router.post('/cambiarcontrasena', cambiarcontrasena);
router.get('/universidades', obteneruniversidades);

export default router;
