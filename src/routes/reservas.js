import express from 'express';
import ReservasController from '../controllers/reservas.js';
import { authMiddleware } from "../middlewares/authMiddleware.js";

var router = express.Router();

router.get('/obtenerReservas',authMiddleware, ReservasController.verficarReserva);
router.get('/verHorariosyFecha', authMiddleware, ReservasController.verHorarioyFechaCancha);
router.post('/anadirReserva', authMiddleware, ReservasController.realizarReserva);

export default router;
