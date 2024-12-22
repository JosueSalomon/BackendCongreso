import express from 'express';
import { RegistrarUsuario} from '../Controller/registro.controller';

const router = express.Router();

router.post('/', RegistrarUsuario);

export default router;