import express from 'express';
import {enviarCodigo, verificarCodigo, actualizarCorreo, RegistrarUsuario, login, logout} from '../Controller/usuario.controller';

const router = express.Router();

router.post('/verificarcodigo', verificarCodigo);
router.post('/actualizarcorreo', actualizarCorreo);
router.post('/enviarcodigo', enviarCodigo);
router.post('/registrar', RegistrarUsuario);

router.post('/login', login);
router.post('/logout', logout);

export default router;
