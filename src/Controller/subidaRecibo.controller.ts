import { Request, Response } from "express";
import cloudinary from "../services/clodinary";

export const subirRecibo = async (req: Request, res: Response): Promise<void> => {
  try {
    // Verificamos si no hay archivo en la solicitud
    if (!req.file) {
      res.status(400).json({
        message: "Debe proporcionar un recibo de comprobante del pago",
        codigoResultado: 0,
      });
      return;
    }
    console.log(req.body.nombre)
    //Subimos el archivo a cloudinary.
    const resultadoSubirArchivo = await cloudinary.uploader.upload(req.file.path);

    //borrado del archivo localmente.

    // Si el archivo está presente, lo retornamos con los datos del archivo
    res.status(200).json({
      message: "Recibo subido correctamente",
      codigoResultado: 1,
      archivo: resultadoSubirArchivo, // Aquí puedes procesar el archivo más adelante
    });
    return;

  } catch (error: any) {
    console.error("Error al procesar el recibo:", error); // Para registrar el error en el servidor
    res.status(500).json({
      message: `Error ocurrido: ${error.message}`,
      codigoResultado: 0,
    });
    return;
  }
};
