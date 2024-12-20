import { prueba } from '../models/prueba.model'
import { Request, Response } from 'express'


export const funcionprueba = async (req: Request, res: Response) => {
    try {
        const resultado = await prueba.funcionprueba()

        res.status(201).json({
            resultado
        });
    }
    catch (error) {
        console.log('error con fetch ', error);
        res.status(500).json({ message: 'algo paso mal :(', error });
    }
}

export const funcionpruebaparametro = async (req: Request, res: Response) => {
    try {
        const {id} = req.params
        const resultado = await prueba.funcionPruebaParametro(Number(id))

        res.status(201).json({
            resultado
        });
    }
    catch (error) {
        console.log('error con fetch ', error);
        res.status(500).json({ message: 'algo paso mal :(', error });
    }
}