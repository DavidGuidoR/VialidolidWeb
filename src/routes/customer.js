/*Servidor para usar un metodo de express Router el cual nos regresa un modulo
de javascript en el cual podemos ir agregando rutas  y reutilizarlas*/

const express = require('express');
const router = express.Router();

//Mandamos llamar nuestro archivo de funciones customerController
const customerController = require('../controllers/customerController');

//Aqui escribiremos todas nuestras url que el servidor podra manejar

//De esta manera utilizamos las funciones de nuestro customerController
router.get('/', customerController.render);
router.post('/inicioSesion', customerController.inicioSesion)
router.post('/registro', customerController.insert);
router.get('/pantallaSesion', customerController.pantallaSesion);
router.get('/pantallaRegistro', customerController.pantallaRegistro);
router.get('/pantallaUsuarios', customerController.pantallaUsuarios);
router.get('/pantallaReportes', customerController.pantallaReportes);
module.exports=router;