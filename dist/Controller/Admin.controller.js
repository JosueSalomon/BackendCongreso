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
exports.GetUserByID = exports.ActualizarUsuario = exports.BuscarUsuario = exports.ValidarUsuario = exports.GetUsuariosValidaciones = void 0;
const Admin_model_1 = require("../models/Admin.model");
const qrcode_1 = __importDefault(require("qrcode"));
const GetUsuariosValidaciones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { estado } = req.body;
    try {
        const resultado = yield Admin_model_1.Admin.GetUsuariosValidaciones(estado);
        res.status(200).json({
            message: 'Usuarios encontrados',
            resultado,
        });
    }
    catch (error) {
        console.error('Error con fetch', error);
        res.status(500).json({ error: 'Hubo un problema buscar los usuarios' });
    }
});
exports.GetUsuariosValidaciones = GetUsuariosValidaciones;
const ValidarUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_usuario } = req.params;
    const { nuevo_estado } = req.body;
    try {
        const uniqueUrl = `https://backend-congreso.vercel.app/admin/user/${id_usuario}`;
        const qrCode = yield qrcode_1.default.toDataURL(uniqueUrl);
        const resultado = yield Admin_model_1.Admin.ValidarUsuarios(Number(id_usuario), nuevo_estado, qrCode);
        res.status(200).json({
            message: 'Estado actualizado con exito ',
            resultado,
        });
    }
    catch (error) {
        console.error('Error con la actualizacion del usuario', error);
        res.status(500).json({ error: 'Hubo un problema al actualizar el usuario' });
    }
});
exports.ValidarUsuario = ValidarUsuario;
const BuscarUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { busqueda } = req.body;
    try {
        const resultado = yield Admin_model_1.Admin.BuscarUsuario(busqueda);
        res.status(200).json({
            message: 'Exito al encontrar el usuario',
            resultado,
        });
    }
    catch (error) {
        console.error('Error con la busqueda del usuario', error);
        res.status(500).json({ error: 'Hubo un problema al buscar el usuario' });
    }
});
exports.BuscarUsuario = BuscarUsuario;
const ActualizarUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_usuario } = req.params;
    const { nombres, apellidos, dni, correo, contrasena } = req.body;
    try {
        const resultado = yield Admin_model_1.Admin.UpdateUser(Number(id_usuario), nombres, apellidos, dni, correo, contrasena);
        res.status(200).json({
            message: 'Usuario actualizado con exito',
            resultado,
        });
    }
    catch (error) {
        console.error('Error al actualizar el usuario', error);
        res.status(500).json({ error: 'Hubo un problema al al actualizar el usuario' });
    }
});
exports.ActualizarUsuario = ActualizarUsuario;
const GetUserByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_user } = req.params;
    try {
        const resultado = yield Admin_model_1.Admin.GetUserByID(Number(id_user));
        res.status(200).json({
            message: 'Usuario encontrado con exito',
            resultado,
        });
    }
    catch (error) {
        console.error('Error con fetch', error);
        res.status(500).json({ error: 'Hubo un problema buscar el user' });
    }
});
exports.GetUserByID = GetUserByID;
