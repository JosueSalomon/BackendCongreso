import express from 'express';
import {enviarCodigo, verificarCodigo, actualizarCorreo} from '../Controller/verificacion.controller';

const router = express.Router();


router.post('/verificarcodigo', verificarCodigo);
router.post('/actualizarcorreo', actualizarCorreo);
router.post('/enviarcodigo', enviarCodigo);

export default router;
