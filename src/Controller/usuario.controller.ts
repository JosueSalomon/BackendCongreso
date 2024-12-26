import { Request, Response } from 'express';
import { sendVerificationEmail } from '../services/emailservice';
import { usuario } from '../models/usuario.model';
import validator from 'email-validator';
import cloudinary from "../services/cloudinary";
import fs from 'fs';


export const registrarusuario = async (req: Request, res: Response): Promise<void> => {
  try {

    if (!req.file) {
      res.status(400).json({
        message: "Debe proporcionar un recibo de comprobante del pago",
        codigoResultado: 0,
      });
      return;
    }
    //Subimos el archivo a cloudinary.
    const resultadoSubirArchivo = await cloudinary.uploader.upload(req.file.path);
    const img_recibo: string = resultadoSubirArchivo.url;

    console.log(req.file.path)
    fs.unlink(req.file.path, (err) => {
      if (err) {
          console.error('Error al eliminar el archivo local:', err);
      } else {
          console.log('Archivo local eliminado con éxito');
      }
  });
  
    const {
      nombres,
      apellidos,
      id_universidad,
      id_tipo_usuario,
      telefono,
      dni,
      fecha_nacimiento,
      genero,
      identificador_unah,
      correo,
      contrasena,
      codigo_recibo,
      id_qr,
      validacion,
      codigo_organizador
    } = req.body;

    if (!nombres || !apellidos || !telefono || !fecha_nacimiento || !dni || !correo || !contrasena) {
      res.status(400).json({ message: 'Faltan datos requeridos en la solicitud' });
      return;
    }

    const resultado = await usuario.registrarusuario(
      nombres,
      apellidos,
      id_universidad,
      id_tipo_usuario,
      dni,
      telefono,
      fecha_nacimiento,
      genero,
      identificador_unah || '',
      correo,
      contrasena,
      img_recibo,
      codigo_recibo || '',
      id_qr,
      validacion,
      codigo_organizador

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

export const enviarcodigoverificacioncorreo = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id_usuario, correo } = req.body;

        if (!validator.validate(correo)) {
            return res.status(400).json({ message: 'Correo electrónico inválido.' });
        }

        const codigo_verificacion = Math.floor(100000 + Math.random() * 900000).toString();

        const id_tipo_verificacion = 1;

        const coincide = await usuario.verificarcorreo(id_usuario, correo);

        if (coincide) {

        await usuario.usuariocodigocorreo(id_usuario, codigo_verificacion, id_tipo_verificacion);

        await sendVerificationEmail(correo, codigo_verificacion);

        return res.status(200).json({ message: 'Código de verificación de correo enviado correctamente.' });

        } else {
          return res.status(200).json({ message: 'El correo no coincide, ingrese un correo valido.'});
        }

    } catch (error: unknown) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        } else {
            return res.status(500).json({ message: 'Error desconocido.' });
        }
    }
};


export const enviarcodigocambiocontrasena = async (req: Request, res: Response): Promise<any> => {
  try {
      const { id_usuario, correo } = req.body;

      if (!validator.validate(correo)) {
          return res.status(400).json({ message: 'Correo electrónico inválido.' });
      }

      const codigo_verificacion = Math.floor(100000 + Math.random() * 900000).toString();
      const id_tipo_verificacion = 2;

      await usuario.usuariocodigocorreo(id_usuario, codigo_verificacion, id_tipo_verificacion);

      await sendVerificationEmail(correo, codigo_verificacion);

      return res.status(200).json({ message: 'Código de verificación para cambio de contraseña enviado correctamente.' });
  } catch (error: unknown) {
      if (error instanceof Error) {
          return res.status(500).json({ message: error.message });
      } else {
          return res.status(500).json({ message: 'Error desconocido.' });
      }
  }
};
    
        export const verificarcodigo = async(req: Request, res: Response) => {
            const { id_usuario, codigo_verificacion } = req.body;
    
            if (!id_usuario || !codigo_verificacion) {
                res.status(400).json({ error: 'Faltan parámetros requeridos.' });
                return;
            }
    
            try {
                const isValid = await usuario.usuarioverificarcorreo(id_usuario, codigo_verificacion);
                if (isValid) {
                    res.status(200).json({ message: 'Código verificado correctamente.' });
                } else {
                    res.status(400).json({ error: 'Código de verificación inválido o expirado.' });
                }
            } catch (error) {
                res.status(500).json({ error: error instanceof Error ? error.message : 'Error desconocido.' });
            }
        }
    
        export const verificarcodigoorganizador = async(req: Request, res: Response) => {
          const { id_usuario, codigo_verificacion } = req.body;
  
          if (!id_usuario || !codigo_verificacion) {
              res.status(400).json({ error: 'Faltan parámetros requeridos.' });
              return;
          }
  
          try {
              const isValid = await usuario.verificar_usuario_organizador(id_usuario, codigo_verificacion);
              if (isValid) {
                  res.status(200).json({ message: 'Código verificado correctamente.' });
              } else {
                  res.status(400).json({ error: 'Código de verificación inválido o expirado.' });
              }
          } catch (error) {
              res.status(500).json({ error: error instanceof Error ? error.message : 'Error desconocido.' });
          }
      }

        export const actualizarcorreo = async(req: Request, res: Response) => {
            const { id_usuario, nuevo_correo } = req.body;
    
            if (!id_usuario || !nuevo_correo) {
                res.status(400).json({ error: 'Faltan parámetros requeridos.' });
                return;
            }
    
            try {
                await usuario.usuarioexternoactualizarcorreo(id_usuario, nuevo_correo);
                res.status(200).json({ message: 'Correo actualizado correctamente.' });
            } catch (error) {
                res.status(500).json({ error: error instanceof Error ? error.message : 'Error desconocido.' });
            }
        }

export const login = async (req: Request, res: Response) : Promise<any> => {
  try {
    const { correo, contrasenia } = req.body;

    if(!correo || !contrasenia){
      return res.status(401).json({
        message : "Correo y contraseña son requeridos",
        codigoResultado : 0,
        data : []
      });
    }

    const resultado = await usuario.login(correo, contrasenia);

    return res.status(200).json({
      message: "Inicio de sesión exitoso",
      codigoResultado: 1, 
      data : resultado
    })
  } catch (error : unknown) {
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
}

export const logout = async (req:Request, res:Response):Promise<any> => {
  try {
    const correo = req.body.correo;

    if(!correo){
      return res.status(401).json({
        message: "Se necesitan credenciales",
        codigoResultado: 0
      });
    }

    const resultado = await usuario.logout(correo);
    console.log(resultado)
    if(resultado === 1){
      return res.status(200).json({
        message: "Cierre de sesión correcto",
        codigoResultado: 1
      });
    }else {
      return res.status(401).json({
        message: "No se pudo cerrar sesión o el usuario ya tenia cerrada la sesión, verificar existencia del token", 
        codigoResultado: 0
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error instanceof Error ? error.message : "Error interno del servidor",
      codigoResultado: -1,
      data: []
    });
  }
}

export const cambiarcontrasena = async (req: Request, res: Response): Promise<any> => {
            const { id_usuario, contrasena_actual, nueva_contrasena } = req.body;
        
            if (!id_usuario || !contrasena_actual || !nueva_contrasena) {
              return res.status(400).json({ message: 'Todos los campos son requeridos.' });
            }
        
            try {
              const resultado = await usuario.cambiarcontrasena(
                id_usuario,
                contrasena_actual,
                nueva_contrasena
              );
              res.status(201).json(resultado);
            } catch (error) {
              console.error('Error al cambiar contraseña:', error);
              const err = error as Error;
              res.status(500).json({
                message: 'Hubo un problema al cambiar contraseña',
                error: err.message || error,
              });
        }
      }


export const obteneruniversidades = async (req: Request, res: Response): Promise<any>=> {
        try {
          const universidades = await usuario.obteneruniversidades();
          return res.status(200).json(universidades);
        } catch (error: unknown) {
          if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
          } else {
            return res.status(500).json({ message: 'Error desconocido.' });
          }
        }
      };
