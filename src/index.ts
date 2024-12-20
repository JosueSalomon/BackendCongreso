import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// importacion rutas
import pruebaRouter from './routes/prueba.route'

dotenv.config();
require('dotenv').config();
const app: Express = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//rutas
app.use('/prueba', pruebaRouter);

//Servidor Raiz.
app.get('/', (req: Request, res: Response) => {
    res.send('Root server is on siuuuuuuuuu :3 ');
});

//Mensaje de consola que dice que funciona.
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto: ${port} :p`);
});