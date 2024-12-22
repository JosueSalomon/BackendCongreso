import multer from "multer";

//Configurar multer para almacenar imagenes
const storage = multer.diskStorage({
    destination: (req, file, cb)=> {
        cb(null, 'uploads/'); //Carpeta donde se guardaran los recibos.
    },
    filename : (req, file, cb)=> {
        cb(null, Date.now() + '-' + file.originalname); //Aqui le asignamos un nombre al archivo
    }
})

const upload = multer({storage});

export default upload;