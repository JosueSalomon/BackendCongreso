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
