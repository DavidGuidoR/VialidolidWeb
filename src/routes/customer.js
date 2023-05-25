/*Servidor para usar un metodo de express Router el cual nos regresa un modulo
de javascript en el cual podemos ir agregando rutas  y reutilizarlas*/

const express = require('express');
const router = express.Router();

//Mandamos llamar nuestro archivo de funciones customerController
const customerController = require('../controllers/customerController');

//Aqui escribiremos todas nuestras url que el servidor podra manejar

//De esta manera utilizamos las funciones de nuestro customerController
router.get('/', customerController.render);
router.get('/pantallaSesion',customerController.pantallaSesion);
router.post('/inicioSesion', customerController.inicioSesion);
router.post('/registro', customerController.insert);
router.post('/insert/:tabla', customerController.insert);
router.get('/delete/:id/:tabla', customerController.delete);
router.get('/pantallaEdit/:id/:tabla', customerController.pantallaEdit);
router.post('/edit/:tabla',customerController.edit);
router.get('/pantallaMenuPrincipal',customerController.pantallaMenuPrincipal);
router.get('/pantallaAdministracion', customerController.pantallaAdministracion);
router.get('/administracionEncargado_dependencias', customerController.administracionEncargado_dependencias);
router.get('/administracionEmpleados', customerController.administracionEmpleados);
router.get('/administracionDependencias', customerController.administracionDependencias);
router.get('/administracionCiudadanos', customerController.administracionCiudadanos);
router.get('/administracionReportes', customerController.administracionReportes);
router.get('/pantallaModeracion',customerController.pantallaModeracion);
router.get('/menumoderacion',customerController.menumoderacion);
router.get('/pantallaReportesEntrantes',customerController.pantallaReportesEntrantes);
router.get('/pantallaReportesRevisados',customerController.pantallaReportesRevisados);
router.get('/pantallaVisualizarReporte/:id_reporte',customerController.pantallaVisualizarReporte);
router.post('/cambiarestatus/:id_reporte', customerController.cambiarestatus);
module.exports=router;