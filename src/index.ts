import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// importacion rutas
import pruebaRouter from './routes/prueba.route'
import conferenciasRouter from './routes/conferencias.routes'
import ponentesRouter from './routes/ponentes.route'
dotenv.config();
require('dotenv').config();
const app: Express = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//rutas
app.use('/prueba', pruebaRouter);
app.use('/conferencias', conferenciasRouter);
app.use('/ponentes', ponentesRouter);

//Servidor Raiz.
app.get('/', (req: Request, res: Response) => {
    res.send('Root server is on yei :3 lol ');
});

//Mensaje de consola que dice que funciona.
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto: ${port} :p`);
});