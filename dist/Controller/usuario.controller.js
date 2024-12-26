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
exports.logout = exports.login = exports.actualizarCorreo = exports.verificarCodigo = exports.enviarCodigo = exports.RegistrarUsuario = exports.subirRecibo = void 0;
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
        console.log(req.body.nombre);
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
        const { nombres, apellidos, id_universidad, id_tipo_usuario, telefono, dni, fecha_nacimiento, genero, identificador_unah, correo, contrasena, img_recibo, codigo_recibo, id_qr, validacion } = req.body;
        if (!nombres || !apellidos || !telefono || !fecha_nacimiento || !dni || !correo || !contrasena) {
            res.status(400).json({ message: 'Faltan datos requeridos en la solicitud' });
            return;
        }
        const resultado = yield usuario_model_1.usuario.registrarusuario(nombres, apellidos, id_universidad, id_tipo_usuario, dni, telefono, fecha_nacimiento, genero, identificador_unah || '', correo, contrasena, img_recibo || '', codigo_recibo || '', id_qr, validacion);
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
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { correo, contrasenia } = req.body;
        if (!correo || !contrasenia) {
            return res.status(401).json({
                message: "Correo y contraseña son requeridos",
                codigoResultado: 0,
                data: []
            });
        }
        const resultado = yield usuario_model_1.usuario.login(correo, contrasenia);
        return res.status(200).json({
            message: "Inicio de sesión exitoso",
            codigoResultado: 1,
            data: resultado
        });
    }
    catch (error) {
        // Manejo de errores
        if (error instanceof Error && error.message === "Credenciales inválidas") {
            return res.status(401).json({
                message: "Credenciales inválidas",
                codigoResultado: 0,
                data: []
            });
        }
        // Error desconocido o interno
        return res.status(500).json({
            message: error instanceof Error ? error.message : "Error interno del servidor",
            codigoResultado: -1,
            data: []
        });
    }
});
exports.login = login;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const correo = req.body.correo;
        if (!correo) {
            return res.status(401).json({
                message: "Se necesitan credenciales",
                codigoResultado: 0
            });
        }
        const resultado = yield usuario_model_1.usuario.logout(correo);
        console.log(resultado);
        if (resultado === 1) {
            return res.status(200).json({
                message: "Cierre de sesión correcto",
                codigoResultado: 1
            });
        }
        else {
            return res.status(401).json({
                message: "No se pudo cerrar sesión o el usuario ya tenia cerrada la sesión, verificar existencia del token",
                codigoResultado: 0
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            message: error instanceof Error ? error.message : "Error interno del servidor",
            codigoResultado: -1,
            data: []
        });
    }
});
exports.logout = logout;
