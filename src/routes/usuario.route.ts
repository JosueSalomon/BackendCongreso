import express from 'express';
import upload from '../services/multer'

import {verificarcodigoorganizador, cambiarcontrasena, enviarcodigoverificacioncorreo, verificarusuario, verificar_codigo_organizador,
    verificarcodigo, actualizarcorreo, registrarusuario, login, logout, enviarcodigocambiocontrasena,obteneruniversidades} from '../Controller/usuario.controller';

const router = express.Router();

router.post('/verificarcodigo', verificarcodigo);
router.post('/verificarorganizador', verificarcodigoorganizador);
router.post('/actualizarcorreo', actualizarcorreo);
router.post('/verificacion/correo', enviarcodigoverificacioncorreo);
router.post('/verificacion/reenviarcorreo', enviarcodigoverificacioncorreo);
router.post('/verificacion/contrasena', enviarcodigocambiocontrasena);
//router.post('/registrar',upload.single('recibo'), procesarRecibo ,registrarusuario, enviarcodigoverificacioncorreo);
router.post('/registrar',registrarusuario, enviarcodigoverificacioncorreo);

router.post('/login', login);
router.post('/logout', logout);
router.post('/cambiarcontrasena', cambiarcontrasena);
router.get('/universidades', obteneruniversidades);
router.post('/verificacion/existe', verificarusuario);
router.post('/verificacion/codigo_organizador', verificar_codigo_organizador);
export default router;
