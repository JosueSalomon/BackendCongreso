import multer from "multer";
import fs from 'fs'
import path from "path";

// Ruta donde se guardarán los archivos
const uploadPath = path.join(__dirname, '..', '..', 'uploads', 'receipts');

if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

//Configurar multer para almacenar imagenes
const storage = multer.diskStorage({
    destination: (req, file, cb)=> {
        cb(null, uploadPath); //Carpeta donde se guardaran los recibos.
    },
    filename : (req, file, cb)=> {
        cb(null, Date.now() + '-' + file.originalname); //Aqui le asignamos un nombre al archivo
    }
})

const upload = multer({storage});

export default upload