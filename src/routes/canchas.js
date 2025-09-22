import express from 'express';
import CanchasController from '../controllers/canchas.js';

var router = express.Router();

router.post('/addCancha', CanchasController.registroCancha);
router.get('/obtenerCanchas', CanchasController.obtenerCanchas);

export default router;