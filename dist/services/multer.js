"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// Ruta donde se guardarán los archivos
const uploadPath = path_1.default.join(__dirname, '..', 'uploads', 'receipts');
if (!fs_1.default.existsSync(uploadPath)) {
    fs_1.default.mkdirSync(uploadPath, { recursive: true });
}
//Configurar multer para almacenar imagenes
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadPath); //Carpeta donde se guardaran los recibos.
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); //Aqui le asignamos un nombre al archivo
    }
});
const upload = (0, multer_1.default)({ storage });
exports.default = upload;
