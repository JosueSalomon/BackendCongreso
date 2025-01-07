import express from 'express';
import {GetUsuariosValidaciones,
    ValidarUsuario,
    BuscarUsuario,
    ActualizarUsuario,
    GetUserByID,
    enviar_correo_organizador,
    sendCertificates} from '../Controller/Admin.controller';

const router = express.Router();



router.post('/validaciones',GetUsuariosValidaciones)
router.put('/validar/usuario/:id_usuario',ValidarUsuario)
router.post('/buscar',BuscarUsuario)
router.put('/actualizar/usuario/:id_usuario',ActualizarUsuario)
router.get('/user/:id_user',GetUserByID)
router.post('/codigo/usuario_organizador', enviar_correo_organizador);
router.post('/envio/certificados', sendCertificates);


export default router;

