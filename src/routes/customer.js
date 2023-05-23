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
router.get('/pantallaEmpleados', customerController.pantallaEmpleados);
router.get('/pantallaMenuPrincipal',customerController.pantallaMenuPrincipal);
router.get('/plantillaModeracion',customerController.plantillaModeracion);
router.get('/menumoderacion',customerController.menumoderacion);
router.get('/pantallaReportesEntrantes',customerController.pantallaReportesEntrantes);
router.get('/pantallaReportesRevisados',customerController.pantallaReportesRevisados);
router.get('/pantallaVisualizarReporte/:id_reporte',customerController.pantallaVisualizarReporte);
router.post('/cambiarestatus/:id_reporte', customerController.cambiarestatus);
module.exports=router;