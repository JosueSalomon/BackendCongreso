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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cambiarcontrasena = exports.actualizarcorreo = exports.verificarcodigo = exports.enviarcodigocambiocontrasena = exports.enviarcodigoverificacioncorreo = exports.registrarusuario = void 0;
const emailservice_1 = require("../services/emailservice");
const usuario_model_1 = require("../models/usuario.model");
const email_validator_1 = __importDefault(require("email-validator"));
const cloudinary_1 = __importDefault(require("../services/cloudinary"));
const fs_1 = __importDefault(require("fs"));
const registrarusuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file) {
            res.status(400).json({
                message: "Debe proporcionar un recibo de comprobante del pago",
                codigoResultado: 0,
            });
            return;
        }
        //Subimos el archivo a cloudinary.
        const resultadoSubirArchivo = yield cloudinary_1.default.uploader.upload(req.file.path);
        const img_recibo = resultadoSubirArchivo.url;
        console.log(req.file.path);
        fs_1.default.unlink(req.file.path, (err) => {
            if (err) {
                console.error('Error al eliminar el archivo local:', err);
            }
            else {
                console.log('Archivo local eliminado con éxito');
            }
        });
        const { nombres, apellidos, id_universidad, id_tipo_usuario, telefono, dni, fecha_nacimiento, genero, identificador_unah, correo, contrasena, codigo_recibo, id_qr, validacion, codigo_organizador } = req.body;
        if (!nombres || !apellidos || !telefono || !fecha_nacimiento || !dni || !correo || !contrasena) {
            res.status(400).json({ message: 'Faltan datos requeridos en la solicitud' });
            return;
        }
        const resultado = yield usuario_model_1.usuario.registrarusuario(nombres, apellidos, id_universidad, id_tipo_usuario, dni, telefono, fecha_nacimiento, genero, identificador_unah || '', correo, contrasena, img_recibo, codigo_recibo || '', id_qr, validacion, codigo_organizador);
        res.status(201).json(resultado);
    }
    catch (error) {
        console.error('Error al registrar usuario:', error);
        const err = error;
        res.status(500).json({
            message: 'Hubo un problema al registrar el usuario',
            error: err.message || error,
        });
    }
});
exports.registrarusuario = registrarusuario;
const enviarcodigoverificacioncorreo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_usuario, correo } = req.body;
        if (!email_validator_1.default.validate(correo)) {
            return res.status(400).json({ message: 'Correo electrónico inválido.' });
        }
        const codigo_verificacion = Math.floor(100000 + Math.random() * 900000).toString();
        const id_tipo_verificacion = 1;
        yield usuario_model_1.usuario.usuariocodigocorreo(id_usuario, codigo_verificacion, id_tipo_verificacion);
        yield (0, emailservice_1.sendVerificationEmail)(correo, codigo_verificacion);
        return res.status(200).json({ message: 'Código de verificación de correo enviado correctamente.' });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        else {
            return res.status(500).json({ message: 'Error desconocido.' });
        }
    }
});
exports.enviarcodigoverificacioncorreo = enviarcodigoverificacioncorreo;
const enviarcodigocambiocontrasena = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_usuario, correo } = req.body;
        if (!email_validator_1.default.validate(correo)) {
            return res.status(400).json({ message: 'Correo electrónico inválido.' });
        }
        const codigo_verificacion = Math.floor(100000 + Math.random() * 900000).toString();
        const id_tipo_verificacion = 2;
        yield usuario_model_1.usuario.usuariocodigocorreo(id_usuario, codigo_verificacion, id_tipo_verificacion);
        yield (0, emailservice_1.sendVerificationEmail)(correo, codigo_verificacion);
        return res.status(200).json({ message: 'Código de verificación para cambio de contraseña enviado correctamente.' });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        else {
            return res.status(500).json({ message: 'Error desconocido.' });
        }
    }
});
exports.enviarcodigocambiocontrasena = enviarcodigocambiocontrasena;
const verificarcodigo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_usuario, codigo_verificacion } = req.body;
    if (!id_usuario || !codigo_verificacion) {
        res.status(400).json({ error: 'Faltan parámetros requeridos.' });
        return;
    }
    try {
        const isValid = yield usuario_model_1.usuario.usuarioverificarcorreo(id_usuario, codigo_verificacion);
        if (isValid) {
            res.status(200).json({ message: 'Código verificado correctamente.' });
        }
        else {
            res.status(400).json({ error: 'Código de verificación inválido o expirado.' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Error desconocido.' });
    }
});
exports.verificarcodigo = verificarcodigo;
const actualizarcorreo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_usuario, nuevo_correo } = req.body;
    if (!id_usuario || !nuevo_correo) {
        res.status(400).json({ error: 'Faltan parámetros requeridos.' });
        return;
    }
    try {
        yield usuario_model_1.usuario.usuarioexternoactualizarcorreo(id_usuario, nuevo_correo);
        res.status(200).json({ message: 'Correo actualizado correctamente.' });
    }
    catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Error desconocido.' });
    }
});
exports.actualizarcorreo = actualizarcorreo;
const cambiarcontrasena = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_usuario, contrasena_actual, nueva_contrasena } = req.body;
    if (!id_usuario || !contrasena_actual || !nueva_contrasena) {
        return res.status(400).json({ message: 'Todos los campos son requeridos.' });
    }
    try {
        const resultado = yield usuario_model_1.usuario.cambiarcontrasena(id_usuario, contrasena_actual, nueva_contrasena);
        res.status(201).json(resultado);
    }
    catch (error) {
        console.error('Error al cambiar contraseña:', error);
        const err = error;
        res.status(500).json({
            message: 'Hubo un problema al cambiar contraseña',
            error: err.message || error,
        });
    }
});
exports.cambiarcontrasena = cambiarcontrasena;
