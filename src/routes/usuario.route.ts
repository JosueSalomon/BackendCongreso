import express from 'express';
import upload from '../services/multer'

import {cambiarcontrasena, enviarcodigoverificacioncorreo, verificarcodigo, actualizarcorreo, registrarusuario, enviarcodigocambiocontrasena} from '../Controller/usuario.controller';

const router = express.Router();

router.post('/verificarcodigo', verificarcodigo);
router.post('/actualizarcorreo', actualizarcorreo);
router.post('/verificacion/correo', enviarcodigoverificacioncorreo);
router.post('/verificacion/contrasena', enviarcodigocambiocontrasena);
router.post('/registrar', upload.single('recibo') ,registrarusuario);
router.post('/cambiarcontrasena', cambiarcontrasena);

export default router;
