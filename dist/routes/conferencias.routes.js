"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const conferencias_controller_1 = require("../Controller/conferencias.controller");
const router = express_1.default.Router();
router.get('/:idConferencia', conferencias_controller_1.obtenerUnaConferencia);
router.put('/', conferencias_controller_1.obtenerConferenciasTotales);
router.post('/insertar', conferencias_controller_1.crearUnaConferencia);
router.put('/editar', conferencias_controller_1.editarUnaConferencia);
router.delete('/eliminar/:idConferencia', conferencias_controller_1.eliminarUnaConferencia);
exports.default = router;
