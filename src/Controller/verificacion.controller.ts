import { Request, Response } from 'express';
import { sendVerificationEmail } from '../services/emailservice';
import { verificacion } from '../models/verificacion.model';
import validator from 'email-validator';

export const enviarCodigo = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id_usuario, correo } = req.body;

        if (!validator.validate(correo)) {
            return res.status(400).json({ message: 'Correo electrónico inválido.' });
        }

        const codigo_verificacion = Math.floor(100000 + Math.random() * 900000).toString();

        await verificacion.guardarCodigoVerificacion(id_usuario, codigo_verificacion);

        await sendVerificationEmail(correo, codigo_verificacion);

        return res.status(200).json({ message: 'Código de verificación enviado.' });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        } else {
            return res.status(500).json({ message: 'Error desconocido.' });
        }
    }
};
    
        export const verificarCodigo= async(req: Request, res: Response) => {
            const { id_usuario, codigo_verificacion } = req.body;
    
            if (!id_usuario || !codigo_verificacion) {
                res.status(400).json({ error: 'Faltan parámetros requeridos.' });
                return;
            }
    
            try {
                const isValid = await verificacion.verificarCodigo(id_usuario, codigo_verificacion);
                if (isValid) {
                    res.status(200).json({ message: 'Código verificado correctamente.' });
                } else {
                    res.status(400).json({ error: 'Código de verificación inválido o expirado.' });
                }
            } catch (error) {
                res.status(500).json({ error: error instanceof Error ? error.message : 'Error desconocido.' });
            }
        }
    
        export const actualizarCorreo= async(req: Request, res: Response) => {
            const { id_usuario, nuevo_correo } = req.body;
    
            if (!id_usuario || !nuevo_correo) {
                res.status(400).json({ error: 'Faltan parámetros requeridos.' });
                return;
            }
    
            try {
                await verificacion.actualizarCorreoUsuario(id_usuario, nuevo_correo);
                res.status(200).json({ message: 'Correo actualizado correctamente.' });
            } catch (error) {
                res.status(500).json({ error: error instanceof Error ? error.message : 'Error desconocido.' });
            }
        }
    

