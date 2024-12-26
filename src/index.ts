import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// importacion rutas
import pruebaRouter from './routes/Admin.route'

import usuarioRouter from './routes/usuario.route';

dotenv.config();
require('dotenv').config();
const app: Express = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//rutas
app.use('/admin', pruebaRouter);
app.use('/usuario', usuarioRouter);

//Servidor Raiz.
app.get('/', (req: Request, res: Response) => {
    res.send('Root server is on yei :3 lol ');
});

//Mensaje de consola que dice que funciona.
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto: ${port} :p`);
});