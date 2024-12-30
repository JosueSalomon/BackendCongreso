"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const conferencias_controller_1 = require("../Controller/conferencias.controller");
const multer_1 = __importDefault(require("../services/multer"));
const conferencias_controller_2 = require("../Controller/conferencias.controller");
const router = express_1.default.Router();
router.get('/:idConferencia', conferencias_controller_1.obtenerUnaConferencia);
router.put('/', conferencias_controller_1.obtenerConferenciasTotales);
router.post('/insertar', conferencias_controller_2.crearUnaConferencia);
router.put('/editar', conferencias_controller_2.editarUnaConferencia);
router.delete('/eliminar/:idConferencia', conferencias_controller_2.eliminarUnaConferencia);
//para subir los recursos de una conferencia
router.post('/subirRecurso', multer_1.default.single('recurso'), conferencias_controller_1.insertarRecursoPorConferencia);
router.get('/obtenerRecursos/:idConferencia', conferencias_controller_1.traerRecursosPorConferencia);
exports.default = router;
