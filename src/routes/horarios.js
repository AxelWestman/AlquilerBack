import express from 'express';
import HorariosController from '../controllers/horarios.js';
import { authMiddleware } from "../middlewares/authMiddleware.js";

var router = express.Router();

router.get('/getBloquesHorarios',authMiddleware, HorariosController.getBloquesHorarios);
router.post('/addBloqueHorario', authMiddleware, HorariosController.registroBloqueHorario);

export default router;