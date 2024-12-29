"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarUnaConferencia = exports.editarUnaConferencia = exports.crearUnaConferencia = exports.obtenerUnaConferencia = exports.obtenerConferenciasTotales = void 0;
const conferencias_model_1 = require("../models/conferencias.model");
const obtenerConferenciasTotales = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { dia } = req.body;
        const conferencias = yield conferencias_model_1.Conferencia.obtenerConferencias(dia);
        res.status(201).json({
            conferencias
        });
    }
    catch (error) {
        const errorInfo = error && typeof error === 'object'
            ? JSON.stringify(error, null, 2)
            : (error === null || error === void 0 ? void 0 : error.toString()) || 'Error desconocido';
        console.error('Informacion del error: ', errorInfo);
        res.status(500).json({
            message: 'Informacion del error: ',
            error: errorInfo
        });
    }
});
exports.obtenerConferenciasTotales = obtenerConferenciasTotales;
const obtenerUnaConferencia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idConferencia } = req.params;
        const conferencia = yield conferencias_model_1.Conferencia.obtenerConferencia(Number(idConferencia));
        res.status(201).json({
            conferencia
        });
    }
    catch (error) {
        const errorInfo = error && typeof error === 'object'
            ? JSON.stringify(error, null, 2)
            : (error === null || error === void 0 ? void 0 : error.toString()) || 'Error desconocido';
        console.error('Informacion del error: ', errorInfo);
        res.status(500).json({
            message: 'Informacion del error: ',
            error: errorInfo
        });
    }
});
exports.obtenerUnaConferencia = obtenerUnaConferencia;
const crearUnaConferencia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre_conferencia, nombres_ponente, apellidos_ponente, descripcion_ponente, img_perfil_ponente, descripcion_conferencia, direccion, fecha_conferencia, hora_inicio, hora_final, cupos, img_conferecia } = req.body;
        const nuevaConferencia = yield conferencias_model_1.Conferencia.crearConferencia(nombre_conferencia, nombres_ponente, apellidos_ponente, descripcion_ponente, img_perfil_ponente, descripcion_conferencia, direccion, fecha_conferencia, hora_inicio, hora_final, cupos, img_conferecia);
        res.status(201).json({ nuevaConferencia });
    }
    catch (error) {
        const errorInfo = error && typeof error === 'object'
            ? JSON.stringify(error, null, 2)
            : (error === null || error === void 0 ? void 0 : error.toString()) || 'Error desconocido';
        console.error('Informacion del error: ', errorInfo);
        res.status(500).json({
            message: 'Informacion del error: ',
            error: errorInfo
        });
    }
});
exports.crearUnaConferencia = crearUnaConferencia;
const editarUnaConferencia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_conferencia, nombre, nombres_ponente, apellidos_ponente, descripcion_conferencia, descripcion_ponente, direccion, fecha_conferencia, hora_inicio, hora_final, cupos, finalizado, inactivo, img_conferecia, img_ponente } = req.body;
        const edicionConferencia = yield conferencias_model_1.Conferencia.editarConferencia(id_conferencia, nombre, nombres_ponente, apellidos_ponente, descripcion_conferencia, descripcion_ponente, direccion, fecha_conferencia, hora_inicio, hora_final, cupos, finalizado, inactivo, img_conferecia, img_ponente);
        res.status(201).json({ edicionConferencia });
    }
    catch (error) {
        const errorInfo = error && typeof error === 'object'
            ? JSON.stringify(error, null, 2)
            : (error === null || error === void 0 ? void 0 : error.toString()) || 'Error desconocido';
        console.error('Informacion del error: ', errorInfo);
        res.status(500).json({
            message: 'Informacion del error: ',
            error: errorInfo
        });
    }
});
exports.editarUnaConferencia = editarUnaConferencia;
const eliminarUnaConferencia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idConferencia } = req.params;
        const eliminarConferencia = yield conferencias_model_1.Conferencia.eliminarConferencia(Number(idConferencia));
        res.status(201).json({ eliminarConferencia });
    }
    catch (error) {
        const errorInfo = error && typeof error === 'object'
            ? JSON.stringify(error, null, 2)
            : (error === null || error === void 0 ? void 0 : error.toString()) || 'Error desconocido';
        console.error('Informacion del error: ', errorInfo);
        res.status(500).json({
            message: 'Informacion del error: ',
            error: errorInfo
        });
    }
});
exports.eliminarUnaConferencia = eliminarUnaConferencia;
