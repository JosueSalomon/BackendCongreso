import { registro } from '../models/registro.model'
import { Request, Response } from 'express'

export const RegistrarUsuario = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      nombres,
      apellidos,
      telefono,
      dni,
      fecha_nacimiento,
      genero,
      identificador_unah,
      correo,
      contrasena,
      img_recibo,
      codigo_recibo
    } = req.body;

    if (!nombres || !apellidos || !telefono || !fecha_nacimiento || !dni || !correo || !contrasena) {
      res.status(400).json({ message: 'Faltan datos requeridos en la solicitud' });
      return;
    }

    const telefonoNumerico = parseInt(telefono, 10);
    if (isNaN(telefonoNumerico)) {
      res.status(400).json({ message: 'El teléfono debe ser un número válido' });
      return;
    }

    const resultado = await registro.registrarusuario(
      nombres,
      apellidos,
      dni,
      telefonoNumerico,
      fecha_nacimiento,
      genero,
      identificador_unah || '',
      correo,
      contrasena,
      img_recibo || '',
      codigo_recibo || ''
    );

    res.status(201).json(resultado);
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    const err = error as Error;
    res.status(500).json({
      message: 'Hubo un problema al registrar el usuario',
      error: err.message || error,
    });
  }

 
}