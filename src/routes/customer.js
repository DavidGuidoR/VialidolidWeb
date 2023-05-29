/*Servidor para usar un metodo de express Router el cual nos regresa un modulo
de javascript en el cual podemos ir agregando rutas  y reutilizarlas*/

const express = require('express');
const router = express.Router();

//Mandamos llamar nuestro archivo de funciones customerController
const customerController = require('../controllers/customerController');

//Aqui escribiremos todas nuestras url que el servidor podra manejar

//De esta manera utilizamos las funciones de nuestro customerController

// Rutas Pantallas de inicio
router.get('/', customerController.render);
router.get('/pantallaMenuPrincipal',customerController.pantallaMenuPrincipal);

// Rutas del Inicio de Sesion
router.get('/plantillaInicioSesion',customerController.plantillaInicioSesion);
router.get('/pantallaSesion',customerController.pantallaSesion);
router.get('/pantallaSesionModerador',customerController.pantallaSesionModerador);
router.get('/pantallaSesionAdministrador',customerController.pantallaSesionAdministrador);
router.get('/pantallaSesionEncargado',customerController.pantallaSesionEncargado);
router.post('/inicioSesion/:tabla', customerController.inicioSesion);


// Rutas del Administrador
router.get('/plantillaAdministracion',customerController.plantillaAdministracion);
router.get('/pantallaAdministracion', customerController.pantallaAdministracion);
router.get('/administracionEncargado_dependencias', customerController.administracionEncargado_dependencias);
router.get('/administracionEmpleados', customerController.administracionEmpleados);
router.get('/administracionDependencias', customerController.administracionDependencias);
router.get('/administracionCiudadanos', customerController.administracionCiudadanos);
router.get('/administracionReportes', customerController.administracionReportes);
// Administrador CRUD
router.post('/insert/:tabla', customerController.insert);
router.get('/delete/:id/:tabla', customerController.delete);
router.get('/pantallaEdit/:id/:tabla', customerController.pantallaEdit);
router.post('/edit/:tabla',customerController.edit);

// Rutas del Moderador
router.get('/plantillaModeracion',customerController.plantillaModeracion)
router.get('/pantallaModeracion',customerController.pantallaModeracion);
router.get('/menumoderacion',customerController.menumoderacion);
router.get('/pantallaReportesEntrantes',customerController.pantallaReportesEntrantes);
router.get('/pantallaReportesRevisados',customerController.pantallaReportesRevisados);
router.get('/pantallaVisualizarReporte/:id_reporte',customerController.pantallaVisualizarReporte);
router.post('/cambiarestatus/:id_reporte', customerController.cambiarestatus);


// Rutas del Encargado
router.get('/plantillaEncargado',customerController.plantillaEncargado);
router.get('/pantallaEncargado',customerController.pantallaEncargado);
router.get('/pantallaReportesEntrantesEncargado',customerController.pantallaReportesEntrantesEncargado);
router.get('/pantallaReportesRevisadosEncargado',customerController.pantallaReportesRevisadosEncargado);
router.get('/pantallaVisualizarReportesEncargado/:id_reporte/:dependencia',customerController.pantallaVisualizarReportesEncargado);
router.get('/pantallaDescargarReportesEncargado',customerController.pantallaDescargarReportesEncargado);
router.get('/rechazarReportesEncargado/:id_tabla/:id_reporte/:id_encargado',customerController.rechazarReportesEncargado);
router.post('/cambiarEstatusReportesEncargado',customerController.cambiarEstatusReportesEncargado);
router.get('/descargarReportesEncargado/:id_tabla/:id_reporte/:dependencia',customerController.descargarReportesEncargado);
router.get('/reportesSolucionadoEncargado',customerController.descargarReportesEncargado);
router.get('/solucionarReportesEncargado/:id_tabla/:id_reporte/:id_encargado',customerController.solucionarReportesEncargado);
router.post('/cambiarEstatusReportesSolucionado',customerController.cambiarEstatusReportesSolucionado);

// Rutas de penalizacion
router.post('/penalizarreporte/:id_reporte', customerController.penalizarreporte);
router.get('/penalizar/:id_reporte',customerController.penalizar);

module.exports=router;