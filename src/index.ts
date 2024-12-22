import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// importacion rutas
import pruebaRouter from './routes/prueba.route'
import registroRouter from './routes/registro.route';
import verificacionRouter from './routes/verificacion.route';

dotenv.config();
require('dotenv').config();
const app: Express = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//rutas
app.use('/prueba', pruebaRouter);
app.use('/registro', registroRouter);
app.use('/verificacion', verificacionRouter);


//Servidor Raiz.
app.get('/', (req: Request, res: Response) => {
    res.send('Root server is on yei :3 lol ');
});

//Mensaje de consola que dice que funciona.
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto: ${port} :p`);
});