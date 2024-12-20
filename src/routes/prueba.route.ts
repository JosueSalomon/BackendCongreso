import express from 'express';
import { funcionprueba,funcionpruebaparametro } from '../Controller/prueba.controller';

const router = express.Router();


router.get('/', funcionprueba);
router.get('/:id', funcionpruebaparametro);

export default router;

