"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usuario_controller_1 = require("../Controller/usuario.controller");
const router = express_1.default.Router();
router.post('/verificarcodigo', usuario_controller_1.verificarCodigo);
router.post('/actualizarcorreo', usuario_controller_1.actualizarCorreo);
router.post('/enviarcodigo', usuario_controller_1.enviarCodigo);
router.post('/registrar', usuario_controller_1.RegistrarUsuario);
router.post('/login', usuario_controller_1.login);
router.post('/logout', usuario_controller_1.logout);
exports.default = router;
