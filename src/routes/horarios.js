import express from 'express';
import HorariosController from '../controllers/horarios.js';

var router = express.Router();

router.get('/getBloquesHorarios', HorariosController.getBloquesHorarios);
router.post('/addBloqueHorario', HorariosController.registroBloqueHorario);

export default router;