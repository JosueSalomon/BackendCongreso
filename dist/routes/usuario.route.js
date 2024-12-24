"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("../services/multer"));
const usuario_controller_1 = require("../Controller/usuario.controller");
const router = express_1.default.Router();
router.post('/verificarcodigo', usuario_controller_1.verificarcodigo);
router.post('/actualizarcorreo', usuario_controller_1.actualizarcorreo);
router.post('/verificacion/correo', usuario_controller_1.enviarcodigoverificacioncorreo);
router.post('/verificacion/contrasena', usuario_controller_1.enviarcodigocambiocontrasena);
router.post('/registrar', multer_1.default.single('recibo'), usuario_controller_1.registrarusuario);
router.post('/cambiarcontrasena', usuario_controller_1.cambiarcontrasena);
exports.default = router;
