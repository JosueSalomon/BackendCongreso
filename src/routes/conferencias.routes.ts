import express from 'express';
import {obtenerUnaConferencia, obtenerConferenciasTotales, crearUnaConferencia, editarUnaConferencia, eliminarUnaConferencia } from '../Controller/conferencias.controller'
const router = express.Router();

router.get('/:idConferencia', obtenerUnaConferencia);
router.put('/', obtenerConferenciasTotales);
router.post('/insertar', crearUnaConferencia);
router.put('/editar', editarUnaConferencia);
router.delete('/eliminar/:idConferencia', eliminarUnaConferencia);

export default router;
