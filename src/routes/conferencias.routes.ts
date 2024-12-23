import express from 'express';
import {obtenerUnaConferencia, obtenerConferenciasTotales } from '../Controller/conferencias.controller'
const router = express.Router();

router.get('/:idConferencia', obtenerUnaConferencia);
router.put('/', obtenerConferenciasTotales);

export default router;
