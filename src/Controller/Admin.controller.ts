import { Request, Response } from 'express';
import {Admin} from '../models/Admin.model'
import QRCode from 'qrcode';


export const GetUsuariosValidaciones = async (req: Request, res: Response) =>{
    const {estado} = req.body

    try{
        const resultado = await Admin.GetUsuariosValidaciones(estado)

        res.status(200).json({
            message: 'Usuarios encontrados',
            resultado,
        });
    }catch (error) {
        console.error('Error con fetch', error);
        res.status(500).json({ error: 'Hubo un problema buscar los usuarios' });
    }
}

export const ValidarUsuario = async (req: Request, res: Response) =>{
    const {id_usuario} = req.params
    const {nuevo_estado} = req.body

    try{
        const uniqueUrl = `https://backend-congreso.vercel.app/admin/user/${id_usuario}`;

        const qrCode = await QRCode.toDataURL(uniqueUrl);

        const resultado = await Admin.ValidarUsuarios(Number(id_usuario),nuevo_estado,qrCode)

        res.status(200).json({
            message: 'Estado actualizado con exito ',
            resultado,
        });

    }catch (error) {
        console.error('Error con la actualizacion del usuario', error);
        res.status(500).json({ error: 'Hubo un problema al actualizar el usuario' });
    }
}

export const BuscarUsuario = async (req: Request, res: Response) =>{
    const {busqueda} = req.body

    try{
        const resultado = await Admin.BuscarUsuario(busqueda)

        res.status(200).json({
            message: 'Exito al encontrar el usuario',
            resultado,
        });
    }catch (error) {
        console.error('Error con la busqueda del usuario', error);
        res.status(500).json({ error: 'Hubo un problema al buscar el usuario' });
    }
}

export const ActualizarUsuario = async (req: Request, res: Response) =>{
    const {id_usuario} = req.params
    const {nombres, apellidos, dni, correo, contrasena} = req.body

    try{
        const resultado = await Admin.UpdateUser(Number(id_usuario),nombres,apellidos,dni,correo,contrasena)

        res.status(200).json({
            message: 'Usuario actualizado con exito',
            resultado,
        });
    }catch (error) {
        console.error('Error al actualizar el usuario', error);
        res.status(500).json({ error: 'Hubo un problema al al actualizar el usuario' });
    }
}

export const GetUserByID = async (req: Request, res: Response) =>{
    const {id_user} = req.params

    try{

        const resultado = await Admin.GetUserByID(Number(id_user))
        res.status(200).json({
            message: 'Usuario encontrado con exito',
            resultado,
        });

    }catch (error) {
        console.error('Error con fetch', error);
        res.status(500).json({ error: 'Hubo un problema buscar el user' });
    }
}