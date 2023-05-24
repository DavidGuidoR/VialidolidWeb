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
router.post('/insert', customerController.insert);
router.get('/delete/:id/:tabla', customerController.delete);
router.get('/edit/:id/:tabla', customerController.edit);
router.get('/pantallaMenuPrincipal',customerController.pantallaMenuPrincipal);
router.get('/pantallaAdministracion', customerController.pantallaAdministracion);
router.get('/administracionEncargados', customerController.administracionEncargados);
router.get('/administracionModeradores', customerController.administracionModeradores);
router.get('/administracionDependencias', customerController.administracionDependencias);
router.get('/administracionUsuarios', customerController.administracionUsuarios);
router.get('/administracionReportes', customerController.administracionReportes);
router.get('/plantillaModeracion',customerController.plantillaModeracion);
router.get('/pantallaReportesEntrantes',customerController.pantallaReportesEntrantes);
router.get('/pantallaReportesRevisados',customerController.pantallaReportesRevisados);
module.exports=router;