import express from 'express';
import UsuariosController from '../controllers/usuarios.js';

var router = express.Router();

router.get('/getUsuarios', UsuariosController.getUsuarios);
router.post('/addUsuario', UsuariosController.addUsuario);

export default router;