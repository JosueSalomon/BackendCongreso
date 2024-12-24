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
exports.actualizarCorreo = exports.verificarCodigo = exports.enviarCodigo = exports.RegistrarUsuario = exports.subirRecibo = void 0;
const emailservice_1 = require("../services/emailservice");
const usuario_model_1 = require("../models/usuario.model");
const email_validator_1 = __importDefault(require("email-validator"));
const cloudinary_1 = __importDefault(require("../services/cloudinary"));
const subirRecibo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Verificamos si no hay archivo en la solicitud
        if (!req.file) {
            res.status(400).json({
                message: "Debe proporcionar un recibo de comprobante del pago",
                codigoResultado: 0,
            });
            return;
        }
        //Subimos el archivo a cloudinary.
        const resultadoSubirArchivo = yield cloudinary_1.default.uploader.upload(req.file.path);
        //borrado del archivo localmente.
        // Si el archivo está presente, lo retornamos con los datos del archivo
        res.status(200).json({
            message: "Recibo subido correctamente",
            codigoResultado: 1,
            archivo: resultadoSubirArchivo, // Aquí puedes procesar el archivo más adelante
        });
        return;
    }
    catch (error) {
        console.error("Error al procesar el recibo:", error); // Para registrar el error en el servidor
        res.status(500).json({
            message: 'Error ocurrido: ${error.message}',
            codigoResultado: 0,
        });
        return;
    }
});
exports.subirRecibo = subirRecibo;
const RegistrarUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        // Elimina todos los datos almacenados en localStorage
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
exports.RegistrarUsuario = RegistrarUsuario;
const enviarCodigo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_usuario, correo } = req.body;
        if (!email_validator_1.default.validate(correo)) {
            return res.status(400).json({ message: 'Correo electrónico inválido.' });
        }
        const codigo_verificacion = Math.floor(100000 + Math.random() * 900000).toString();
        yield usuario_model_1.usuario.usuariocodigocorreo(id_usuario, codigo_verificacion);
        yield (0, emailservice_1.sendVerificationEmail)(correo, codigo_verificacion);
        return res.status(200).json({ message: 'Código de verificación enviado.' });
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
exports.enviarCodigo = enviarCodigo;
const verificarCodigo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.verificarCodigo = verificarCodigo;
const actualizarCorreo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.actualizarCorreo = actualizarCorreo;
