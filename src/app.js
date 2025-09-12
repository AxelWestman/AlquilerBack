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
console.log(valor)
console.log("Server escuchando en el puerto " + port)