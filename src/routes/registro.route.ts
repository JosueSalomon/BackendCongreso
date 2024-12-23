import express from 'express';
import { RegistrarUsuario} from '../Controller/registro.controller';
import upload from '../services/multer';

const router = express.Router();

router.post('/', RegistrarUsuario);

export default router;