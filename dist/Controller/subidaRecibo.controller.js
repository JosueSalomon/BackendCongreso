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
exports.subirRecibo = void 0;
const clodinary_1 = __importDefault(require("../services/clodinary"));
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
        const resultadoSubirArchivo = yield clodinary_1.default.uploader.upload(req.file.path);
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
            message: `Error ocurrido: ${error.message}`,
            codigoResultado: 0,
        });
        return;
    }
});
exports.subirRecibo = subirRecibo;
