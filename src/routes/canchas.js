import express from 'express';
import CanchasController from '../controllers/canchas.js';
import { authMiddleware } from "../middlewares/authMiddleware.js";

var router = express.Router();

router.post('/addCancha', authMiddleware, CanchasController.registroCancha);
router.get('/obtenerCanchas', authMiddleware, CanchasController.obtenerCanchas);

export default router;