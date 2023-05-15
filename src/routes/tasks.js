const express = require('express');
const TaskController = require('../controllers/TaskController');

const router = express.Router();

router.get('/index', TaskController.index);
router.get('/create', TaskController.create);
router.get('/moderacion', TaskController.moderacion);
router.get('/vreportes', TaskController.vreportes);
router.get('/vusuarios', TaskController.vusuarios);
router.get('/tasks/edit/:id_reporte', TaskController.edit);
module.exports = router;