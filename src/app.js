import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { configDotenv } from 'dotenv';
import { env } from 'process';

const app = express();
configDotenv({ path: './.env' });

const port = process.env.PORT; 

console.log(port)

app.listen(port)
console.log("Server escuchando en el puerto " + port)

//cargar archivos de rutas
import usuarios_routes from './routes/usuarios.js';

//middlewares
app.use(bodyParser.json());

//Reescribir rutas
app.use('/api', usuarios_routes);

//exportar el modulo
export default app;