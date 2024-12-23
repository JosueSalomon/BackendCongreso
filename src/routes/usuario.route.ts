import express from 'express';
import {enviarCodigo, verificarCodigo, actualizarCorreo, RegistrarUsuario} from '../Controller/usuario.controller';

const router = express.Router();

router.post('/verificarcodigo', verificarCodigo);
router.post('/actualizarcorreo', actualizarCorreo);
router.post('/enviarcodigo', enviarCodigo);
router.post('/registrar', RegistrarUsuario);

export default router;
