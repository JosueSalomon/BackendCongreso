import express from 'express';
import {obtenerUnaConferencia, obtenerConferenciasTotales, subirRecursoDeConferencia, traerRecursosPorConferencia } from '../Controller/conferencias.controller'
import upload from '../services/multer';
import {crearUnaConferencia, editarUnaConferencia, eliminarUnaConferencia } from '../Controller/conferencias.controller'
const router = express.Router();

router.get('/:idConferencia', obtenerUnaConferencia);
router.put('/', obtenerConferenciasTotales);
router.post('/insertar', crearUnaConferencia);
router.put('/editar', editarUnaConferencia);
router.delete('/eliminar/:idConferencia', eliminarUnaConferencia);

//para subir los recursos de una conferencia
router.post('/subirRecurso', upload.single('recurso'), subirRecursoDeConferencia);

router.get('/obtenerRecursos/:idConferencia', traerRecursosPorConferencia);

export default router;
