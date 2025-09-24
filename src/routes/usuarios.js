import express from 'express';
import UsuariosController from '../controllers/usuarios.js';
import { authMiddleware } from "../middlewares/authMiddleware.js";

var router = express.Router();

router.get('/getUsuarios',authMiddleware, UsuariosController.getUsuarios);
router.get('/getUsuarioId', authMiddleware, UsuariosController.getUsuarioId);
router.post('/addUsuario',  UsuariosController.addUsuario);
router.post('/loguearUsuario', UsuariosController.login);
router.post('/loguearAdmin', UsuariosController.loginAdmin);
router.delete('/deleteUsuario', authMiddleware, UsuariosController.deleteUsuario)

export default router;