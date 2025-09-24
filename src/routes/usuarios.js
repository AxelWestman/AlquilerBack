import express from 'express';
import UsuariosController from '../controllers/usuarios.js';

var router = express.Router();

router.get('/getUsuarios', UsuariosController.getUsuarios);
router.get('/getUsuarioId', UsuariosController.getUsuarioId);
router.post('/addUsuario', UsuariosController.addUsuario);
router.post('/loguearUsuario', UsuariosController.login);
router.post('/loguearAdmin', UsuariosController.loginAdmin);
router.delete('/deleteUsuario', UsuariosController.deleteUsuario)

export default router;