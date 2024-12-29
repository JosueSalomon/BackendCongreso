import { Conferencia } from '../models/conferencias.model'
import { Request, Response } from 'express'


export const obtenerConferenciasTotales = async (req: Request, res: Response) => {
    try {
        const { dia } = req.body;

        const conferencias = await Conferencia.obtenerConferencias(dia);

        res.status(201).json({
            conferencias
        });
    }
    catch (error) {
        const errorInfo = error && typeof error === 'object'
            ? JSON.stringify(error, null, 2)
            : error?.toString() || 'Error desconocido';

        console.error('Informacion del error: ', errorInfo);
        res.status(500).json({
            message: 'Informacion del error: ', 
            error: errorInfo
        });
    }
}

export const obtenerUnaConferencia = async (req: Request, res: Response) => {
    try {
        const { idConferencia } = req.params;
        
        const conferencia = await Conferencia.obtenerConferencia(Number(idConferencia));
        
        res.status(201).json({
            conferencia
        })
    } catch (error) {
        const errorInfo = error && typeof error === 'object'
            ? JSON.stringify(error, null, 2)
            : error?.toString() || 'Error desconocido';

        console.error('Informacion del error: ', errorInfo);
        res.status(500).json({
            message: 'Informacion del error: ', 
            error: errorInfo
        });
    }
};

export const crearUnaConferencia = async (req: Request, res: Response) => {
    try {
        const {
            nombre_conferencia,
            nombres_ponente,
            apellidos_ponente,
            descripcion_ponente,
            img_perfil_ponente,
            descripcion_conferencia,
            direccion,
            fecha_conferencia,
            hora_inicio,
            hora_final,
            cupos,
            img_conferecia
        } = req.body;

        const nuevaConferencia = await Conferencia.crearConferencia(
            nombre_conferencia,
            nombres_ponente,
            apellidos_ponente,
            descripcion_ponente,
            img_perfil_ponente,
            descripcion_conferencia,
            direccion,
            fecha_conferencia,
            hora_inicio,
            hora_final,
            cupos,
            img_conferecia
            );
    
        res.status(201).json({nuevaConferencia});
    } catch (error: any) {
        const errorInfo = error && typeof error === 'object'
            ? JSON.stringify(error, null, 2)
            : error?.toString() || 'Error desconocido';

        console.error('Informacion del error: ', errorInfo);
        res.status(500).json({
            message: 'Informacion del error: ', 
            error: errorInfo
        });
    }
}


export const editarUnaConferencia = async (req: Request, res: Response) => {
    try {
        const {
            id_conferencia,
            nombre,
            nombres_ponente,
            apellidos_ponente,
            descripcion_conferencia,
            descripcion_ponente,
            direccion,
            fecha_conferencia,
            hora_inicio,
            hora_final,
            cupos,
            finalizado,
            inactivo,
            img_conferecia,
            img_ponente
        } = req.body;
        
        const edicionConferencia = await Conferencia.editarConferencia(
            id_conferencia,
            nombre,
            nombres_ponente,
            apellidos_ponente,
            descripcion_conferencia,
            descripcion_ponente,
            direccion,
            fecha_conferencia,
            hora_inicio,
            hora_final,
            cupos,
            finalizado,
            inactivo,
            img_conferecia,
            img_ponente
        );
    
        res.status(201).json({edicionConferencia});
    } catch (error: any) {
        const errorInfo = error && typeof error === 'object'
            ? JSON.stringify(error, null, 2)
            : error?.toString() || 'Error desconocido';

        console.error('Informacion del error: ', errorInfo);
        res.status(500).json({
            message: 'Informacion del error: ', 
            error: errorInfo
        });
    }
}

export const eliminarUnaConferencia = async (req: Request, res: Response) => {
    try {
        const { idConferencia } = req.params;
        
        const eliminarConferencia = await Conferencia.eliminarConferencia(Number(idConferencia));
        
        res.status(201).json({eliminarConferencia});
    } catch (error: any) {
        const errorInfo = error && typeof error === 'object'
            ? JSON.stringify(error, null, 2)
            : error?.toString() || 'Error desconocido';

        console.error('Informacion del error: ', errorInfo);
        res.status(500).json({
            message: 'Informacion del error: ', 
            error: errorInfo
        });
    }
}
