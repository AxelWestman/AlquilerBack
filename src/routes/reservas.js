import express from 'express';
import ReservasController from '../controllers/reservas.js';

var router = express.Router();

router.get('/obtenerReservas', ReservasController.verficarReserva);
router.post('/anadirReserva', ReservasController.realizarReserva);

export default router;
