import express from 'express';
import CanchasController from '../controllers/canchas.js';

var router = express.Router();

router.post('/addCancha', CanchasController.registroCancha);

export default router;