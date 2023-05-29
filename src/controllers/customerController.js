// Aqui podemos exportar un objeto

const { json } = require("body-parser");
const { route } = require("../routes/customer");

const controller = {};

// Pantallas y vistas de la aplicacion-------------------------------------------------------------------------------------------------------------------
controller.render = (req, res) => {
    res.render('menuPrincipal');
}

controller.pantallaSesion = (req, res) => {
    res.render('inicioSesion');
}

controller.pantallaSesionModerador = (req, res) => {
    res.render('iniciosesionmoderador');
}

controller.pantallaSesionAdministrador = (req, res) => {
    res.render('iniciosesionadministrador');
}

controller.pantallaSesionEncargado = (req, res) => {
    res.render('iniciosesionencargado');
}

controller.pantallaMenuPrincipal = (req, res) => {
    res.render('menuPrincipal');
}

controller.pantallaModeracion = (req, res) => {
    res.render('moderacion');
}

controller.pantallaAdministracion = (req, res) => {
    res.render('administracion');
}

controller.plantillaAdministracion = (req, res) => {
    res.render('plantillaadministracion');
}

controller.plantillaModeracion = (req, res) => {
    res.render('plantillamoderacion');
}

controller.plantillaEncargado = (req, res) => {
    res.render('plantillaencargado');
}

controller.plantillaInicioSesion = (req, res) => {
    res.render('plantillainiciosesion');
}


// Inicio de sesion dinamico-------------------------------------------------------------------------------------------------------------
controller.inicioSesion = (req, res) => {
    // Obtenemos el usuario y la contraseña del cuerpo de la solicitud
    console.log(req.body['contrasena']);
    const usuario = req.body['usuario'];
    const contrasena = req.body['contrasena'];
    const tabla = req.params.tabla;
    var consulta = '';
    if (tabla == "empleado") {
        consulta = 'SELECT usuario, contrasena, cargo, id_empleado FROM empleado WHERE usuario=?'
    } else {
        consulta = 'SELECT ed.usuario, ed.contrasena, d.id_dependencia, d.nombre, ed.id_encargado FROM encargado_dependencia ed JOIN dependencia d ON ed.id_dependencia = d.id_dependencia WHERE ed.usuario = ?';
    }
    // Establecemos la conexión con la base de datos
    req.getConnection((err, conn) => {
        // Consultamos la base de datos y obtenemos los datos del empleado
        if (tabla == "empleado") {
            conn.query(consulta, usuario, (err, empleado) => {
                // Verificamos si se produjo un error en la consulta
                if (err) {
                    res.send('Error en la consulta');
                    console.log(err);
                } else {
                    // Verificamos si se encontró un empleado con el usuario proporcionado
                    if (empleado.length > 0) {
                        // Extraemos los datos de la consulta
                        console.log(empleado);
                        const usuarioConsulta = empleado[0].usuario;
                        const contrasenaConsulta = empleado[0].contrasena;
                        const cargo = empleado[0].cargo;
                        const id_empleado = empleado[0].id_empleado;
                        // Comparamos el usuario y la contraseña con los datos de la consulta
                        if (usuario === usuarioConsulta && contrasena === contrasenaConsulta) {
                            // Redirigimos a la página correspondiente según el cargo
                            req.session.usuario = usuario;
                            req.session.cargo = cargo;
                            req.session.id_empleado = id_empleado;

                            if (cargo === "moderador") {
                                res.render('moderacion');
                            } else if (cargo === "administrador") {
                                res.render('administracion');
                            } else {
                                res.send('Cargo no reconocido');
                            }
                        } else {
                            res.send('Inicio de sesión fallido');
                        }
                    } else {
                        res.send('Usuario no encontrado');
                    }
                }
            });
        }
        else {
            conn.query(consulta, usuario, (err, empleado) => {
                // Verificamos si se produjo un error en la consulta
                if (err) {
                    res.send('Error en la consulta');
                    console.log(err);
                } else {
                    // Verificamos si se encontró un empleado con el usuario proporcionado
                    if (empleado.length > 0) {
                        // Extraemos los datos de la consulta
                        console.log(empleado);
                        const usuarioConsulta = empleado[0].usuario;
                        const contrasenaConsulta = empleado[0].contrasena;
                        const idDependenciaConsulta = empleado[0].id_dependencia;
                        const nombreDependenciaConsulta = empleado[0].nombre;
                        const id_encargado = empleado[0].id_encargado;
                        console.log(usuarioConsulta);
                        console.log(contrasenaConsulta);
                        console.log(idDependenciaConsulta);
                        console.log(nombreDependenciaConsulta);
                        console.log(id_encargado);

                        // Comparamos el usuario y la contraseña con los datos de la consulta
                        if (usuario === usuarioConsulta && contrasena === contrasenaConsulta) {
                            // Redirigimos a la página correspondiente según el cargo
                            req.session.usuario = usuario;
                            req.session.cargo = 'encargado';
                            req.session.dependencia = idDependenciaConsulta;
                            req.session.nombreDependencia = nombreDependenciaConsulta;
                            req.session.id_encargado = id_encargado;
                            res.render('encargado');

                        } else {
                            res.send('Inicio de sesión fallido');
                        }
                    } else {
                        res.send('Usuario no encontrado');
                    }
                }
            });
        }
    });
};

//Funciones de la administracion-------------------------------------------------
controller.administracionEncargado_dependencias = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT r.id_encargado, r.nombre, r.apellido_paterno, r.apellido_materno, c.nombre AS nombre_dependencia, r.usuario, r.contrasena FROM encargado_dependencia r JOIN dependencia c ON r.id_dependencia = c.id_dependencia', (err, encargados) => {
            if (err) {
                res.json(err);
            } else {
                console.log(encargados)
                res.render('administracionencargado_dependencias', { data: encargados });
            }
        })
    });
}

controller.administracionEmpleados = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM empleado', (err, empleados) => {
            if (err) {
                res.json(err);
            } else {
                res.render('administracionmoderadores', { data: empleados });
            }
        })
    });
}

controller.administracionDependencias = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM dependencia', (err, dependencias) => {
            if (err) {
                res.json(err);
            } else {
                res.render('administraciondependencias', { data: dependencias });
            }
        })
    });
}

controller.administracionCiudadanos = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM ciudadano', (err, usuarios) => {
            if (err) {
                res.json(err);
            } else {
                res.render('administracionusuarios', { data: usuarios });
            }
        })
    });
}

controller.administracionReportes = (req, res) => {
    function formatDate(date) {
        const options = { day: '2-digit', month: '2-digit', year: '2-digit' };
        const formattedDate = new Date(date).toLocaleDateString('es-ES', options);
        return formattedDate;
    }
    req.getConnection((err, conn) => {
        conn.query('SELECT r.id_reporte, r.fecha, r.descripcion, r.latitud, r.longitud, r.n_apoyos, r.estatus, r.n_denuncias, r.referencias, c.id_ciudadano AS nombre_ciudadano, d.nombre AS nombre_dependencia, r.tipo_reporte FROM reporte r JOIN ciudadano c ON r.id_ciudadano = c.id_ciudadano JOIN dependencia d ON r.id_dependencia = d.id_dependencia', (err, reportes) => {
            if (err) {
                res.json(err);
            } else {
                res.render('administracionreportes', { data: reportes, formatDate: formatDate });
            }
        })
    });
}


//Funciones del CRUD ------------------------------------------------------------------------------------------- 
controller.insert = (req, res) => {
    const data = req.body;
    const tabla = req.params.tabla;
    console.log(tabla);
    const tablaCapitalizada = tabla.charAt(0).toUpperCase() + tabla.slice(1) + 's';
    const ruta = '/administracion' + tablaCapitalizada;
    const consulta = 'INSERT INTO ' + tabla + ' set ?';

    req.getConnection((err, conn) => {
        conn.query(consulta, [data], (err, data) => {
            if (err) {
                res.send('Registro fallido')
            } else {
                res.redirect(ruta);
            }
        });
    });
}

controller.delete = (req, res) => {
    const id = req.params.id;
    const tabla = req.params.tabla;
    if (tabla == 'encargado_dependencia') {
        puntero = 'id_encargado'
    } else { puntero = 'id_' + tabla; }
    const tablaCapitalizada = tabla.charAt(0).toUpperCase() + tabla.slice(1) + 's';
    const ruta = '/administracion' + tablaCapitalizada;
    const consulta = 'DELETE FROM ' + tabla + ' WHERE ' + puntero + ' = ?';

    req.getConnection((err, conn) => {
        if (err) {
            console.error('Error al obtener la conexión:', err);
            return;
        }

        conn.query(consulta, [id], (err, data) => {
            if (err) {
                console.error('Error al ejecutar la consulta:', err);
                return;
            } else {
                res.redirect(ruta);
            }
        });
    });
}

controller.pantallaEdit = (req, res) => {
    const tabla = req.params.tabla;
    var puntero = '';
    const id = req.params.id;
    if (tabla == 'encargado_dependencia') {
        puntero = 'id_encargado'
    } else { puntero = 'id_' + tabla; }

    const tablaCapitalizada = tabla.charAt(0).toUpperCase() + tabla.slice(1) + 's';
    const ruta = '/administracion' + tablaCapitalizada;
    const consulta = 'SELECT * FROM ' + tabla + ' WHERE ' + puntero + ' = ?';


    req.getConnection((err, conn) => {
        if (err) {
            console.error('Error al obtener la conexión:', err);
            return;
        }
        conn.query(consulta, [id], (err, data) => {

            let inputsHTML = '';
            switch (tabla) {

                case 'dependencia':
                    inputsHTML += '<div class="cajastexto"><input type="text" name="id_dependencia" value="' + data[0].id_dependencia + '" readonly></div>';
                    inputsHTML += '<div class="cajastexto"><input type="text" name="nombre" value="' + data[0].nombre + '"></div>';
                    inputsHTML += '<div class="cajastexto"><input type="text" name="colonia" value="' + data[0].colonia + '"></div>';
                    inputsHTML += '<div class="cajastexto"><input type="text" name="calle" value="' + data[0].calle + '"></div>';
                    // Otros campos para empleados
                    break;

                case 'ciudadano':
                    inputsHTML += '<div class="cajastexto"><input type="text" name="id_ciudadano" value="' + data[0].id_ciudadano + '" readonly></div>';
                    inputsHTML += '<div class="cajastexto"><input type="text" name="nombre" value="' + data[0].nombre + '"></div>';
                    inputsHTML += '<div class="cajastexto"><input type="text" name="apellido_paterno" value="' + data[0].apellido_paterno + '"></div>';
                    inputsHTML += '<div class="cajastexto"><input type="text" name="apellido_materno" value="' + data[0].apellido_materno + '"></div>';
                    inputsHTML += '<div class="cajastexto"><input type="text" name="correo" value="' + data[0].correo + '"></div>';
                    inputsHTML += '<div class="cajastexto"><input type="text" name="contrasena" value="' + data[0].contrasena + '"></div>';
                    inputsHTML += '<div class="cajastexto"><input type="text" name="telefono" value="' + data[0].telefono + '"></div>';
                    inputsHTML += '<div class="cajastexto"><input type="text" name="estado" value="' + data[0].estado + '"></div>';
                    inputsHTML += '<div class="cajastexto"><input type="text" name="ciudad" value="' + data[0].ciudad + '"></div>';
                    inputsHTML += '<div class="cajastexto"><input type="text" name="n_penalizaciones" value="' + data[0].n_penalizaciones + '"></div>';
                    // Otros campos para usuarios
                    break;

                case 'encargado_dependencia':
                    inputsHTML += '<div class="cajastexto"><input type="text" name="id_encargado" value="' + data[0].id_encargado + '"readonly></div>';
                    inputsHTML += '<div class="cajastexto"><input type="text" name="nombre" value="' + data[0].nombre + '"></div>';
                    inputsHTML += '<div class="cajastexto"><input type="text" name="apellido_paterno" value="' + data[0].apellido_paterno + '"></div>';
                    inputsHTML += '<div class="cajastexto"><input type="text" name="apellido_materno" value="' + data[0].apellido_materno + '"></div>';
                    inputsHTML += '<div class="cajastexto"><input type="text" name="id_dependencia" value="' + data[0].id_dependencia + '" readonly></div>';
                    inputsHTML += '<div class="cajastexto"><input type="text" name="usuario" value="' + data[0].usuario + '"></div>';
                    inputsHTML += '<div class="cajastexto"><input type="text" name="contrasena" value="' + data[0].contrasena + '"></div>';
                    break;
                // Otros casos para diferentes tipos de registros
                case 'empleado':
                    inputsHTML += '<div class="cajastexto"><input type="text" name="id_empleado" value="' + data[0].id_empleado + '" readonly></div>';
                    inputsHTML += '<div class="cajastexto"><input type="text" name="cargo" value="' + data[0].cargo + '" readonly></div>';
                    inputsHTML += '<div class="cajastexto"><input type="text" name="nombre" value="' + data[0].nombre + '"></div>';
                    inputsHTML += '<div class="cajastexto"><input type="text" name="apellido_paterno" value="' + data[0].apellido_paterno + '"></div>';
                    inputsHTML += '<div class="cajastexto"><input type="text" name="apellido_materno" value="' + data[0].apellido_materno + '"></div>';
                    inputsHTML += '<div class="cajastexto"><input type="text" name="usuario" value="' + data[0].usuario + '"></div>';
                    inputsHTML += '<div class="cajastexto"><input type="text" name="contrasena" value="' + data[0].contrasena + '"></div>';
                    break;

                default:
                    break;
            }

            if (err) {
                console.error('Error al ejecutar la consulta:', err);
                return;
            } else {
                res.render('administracionedit', { data: data, inputsHTML, tabla });
            }
        });

    });
}

controller.edit = (req, res) => {
    const tabla = req.params.tabla;
    const datos = req.body;
    var puntero = '';
    if (tabla == 'encargado_dependencia') {
        puntero = 'id_encargado'
    } else { puntero = 'id_' + tabla; }
    var id = '';
    switch (tabla) {

        case 'dependencia': id = req.body.id_dependencia;
            break;

        case 'empleado': id = req.body.id_empleado;
            break;
        case 'ciudadano': id = req.body.id_ciudadano;
            break;
        case 'encargado_dependencia': id = req.body.id_encargado;
            break;
        default: console.log('error en el ID');
            break;
    }

    const tablaCapitalizada = tabla.charAt(0).toUpperCase() + tabla.slice(1) + 's';
    const ruta = '/administracion' + tablaCapitalizada;
    const consulta = 'UPDATE ' + tabla + ' set ? WHERE ' + puntero + '= ?'
    req.getConnection((err, conn) => {
        conn.query(consulta, [datos, id], (err, data) => {
            if (err) {
                res.send('error en la actualización');
                console.log(err);
            } else {
                res.redirect(ruta);
            }

        })
    })
}


// Funciones del moderador--------------------------------------------------------------------------------------------------------------------
controller.menumoderacion = (req, res) => {
    res.render('moderacion');
}

controller.pantallaReportesRevisados = (req, res) => {
    function formatDate(date) {
        const options = { day: '2-digit', month: '2-digit', year: '2-digit' };
        const formattedDate = new Date(date).toLocaleDateString('es-ES', options);
        return formattedDate;
    }
    req.getConnection((err, conn) => {
        conn.query('SELECT r.id_reporte, r.fecha, r.descripcion, r.latitud, r.longitud, r.n_apoyos, r.estatus, r.n_denuncias, r.referencias, c.id_ciudadano AS nombre_ciudadano, d.nombre AS nombre_dependencia, r.tipo_reporte FROM reporte r JOIN ciudadano c ON r.id_ciudadano = c.id_ciudadano JOIN dependencia d ON r.id_dependencia = d.id_dependencia', (err, reportes) => {
            if (err) {
                res.json(err);
            } else {
                res.render('moderacionreportesrevisados', { data: reportes, formatDate: formatDate });
            }
        })
    });
}

controller.pantallaReportesEntrantes = (req, res) => {
    function formatDate(date) {
        const options = { day: '2-digit', month: '2-digit', year: '2-digit' };
        const formattedDate = new Date(date).toLocaleDateString('es-ES', options);
        return formattedDate;
    }
    req.getConnection((err, conn) => {
        conn.query('SELECT r.id_reporte, r.fecha, r.descripcion, r.latitud, r.longitud, r.n_apoyos, r.estatus, r.n_denuncias, r.referencias, c.id_ciudadano AS nombre_ciudadano, d.nombre AS nombre_dependencia, r.tipo_reporte FROM reporte r JOIN ciudadano c ON r.id_ciudadano = c.id_ciudadano JOIN dependencia d ON r.id_dependencia = d.id_dependencia', (err, reportes) => {
            if (err) {
                res.json(err);
            } else {
                res.render('moderacionreportesentrantes', { data: reportes, formatDate: formatDate });
            }
        })
    });
}

controller.pantallaVisualizarReporte = (req, res) => {
    const { id_reporte } = req.params;
    function formatDate(date) {
        const options = { day: '2-digit', month: '2-digit', year: '2-digit' };
        const formattedDate = new Date(date).toLocaleDateString('es-ES', options);
        return formattedDate;
    }
    req.getConnection((err, conn) => {

        conn.query('SELECT r.id_reporte, r.fecha, r.descripcion, r.latitud, r.longitud, r.n_apoyos, r.estatus, r.n_denuncias, r.referencias, c.id_ciudadano AS nombre_ciudadano, d.nombre AS nombre_dependencia, r.tipo_reporte FROM reporte r JOIN ciudadano c ON r.id_ciudadano = c.id_ciudadano JOIN dependencia d ON r.id_dependencia = d.id_dependencia WHERE r.id_reporte = ?', [id_reporte], (err, reportes) => {
            if (err) {
                res.json(err);
            } else {
                console.log('Separacion en console log-------------------------------------------------------------------------');
                console.log(reportes);
                res.render('moderacionvisualizarreporte', { data: reportes, formatDate: formatDate });
            }
        })
    });

}


controller.cambiarestatus = (req, res) => {
    const { id_reporte } = req.params;
    const newCustumer = req.body['estatuscb'];
    req.getConnection((err, conn) => {
        conn.query('UPDATE reporte set estatus = ? WHERE id_reporte = ?', [newCustumer, id_reporte], (err, reportes) => {
            if (err) {
                res.json(err);
            } else {
                res.redirect('/menumoderacion');
            }
        })
    });
}

controller.penalizarreporte = (req, res) => {
    const { id_reporte } = req.params;
    const usermod = req.body['usermod'];

    const newCustumer = 'penalizado';
    const userrep = req.body['userrep'];

    const motivo = req.body['motivo'];
    req.getConnection((err, conn) => {
        conn.query('UPDATE reporte set estatus = ? WHERE id_reporte = ?', [newCustumer, id_reporte], (err, reportes) => {
            if (err) {
                res.json(err);
            } else {
                conn.query('INSERT INTO baja_reporte (id_reporte, id_empleado, motivo) VALUES ( ?,?,?)', [id_reporte, usermod, motivo], (err, baja_report) => {
                    if (err) {
                        res.json(err);
                    } else {
                        conn.query('UPDATE ciudadano set n_penalizaciones = 1 WHERE id_ciudadano = ?', [userrep], (err, ban) => {
                            if (err) {
                                res.json(err);
                            } else {
                                res.redirect('/menumoderacion');
                            }
                        });
                    }
                });
            }
        });
    });
}

controller.penalizar = (req, res) => {
    const { id_reporte } = req.params;
    function formatDate(date) {
        const options = { day: '2-digit', month: '2-digit', year: '2-digit' };
        const formattedDate = new Date(date).toLocaleDateString('es-ES', options);
        return formattedDate;

    }
    req.getConnection((err, conn) => {

        conn.query('SELECT r.id_reporte, r.fecha, r.descripcion, r.latitud, r.longitud, r.n_apoyos, r.estatus, r.n_denuncias, r.referencias, c.id_ciudadano AS nombre_ciudadano, d.nombre AS nombre_dependencia, r.tipo_reporte FROM reporte r JOIN ciudadano c ON r.id_ciudadano = c.id_ciudadano JOIN dependencia d ON r.id_dependencia = d.id_dependencia WHERE r.id_reporte = ?', [id_reporte], (err, reportes) => {
            if (err) {
                res.json(err);
            } else {
                console.log('Separacion en console log-------------------------------------------------------------------------');
                console.log(reportes);
                res.render('penalizar', { data: reportes, formatDate: formatDate });
            }
        })
    });

}

controller.eliminar = (req, res) => {
    const { id_reporte } = req.params;
    function formatDate(date) {
        const options = { day: '2-digit', month: '2-digit', year: '2-digit' };
        const formattedDate = new Date(date).toLocaleDateString('es-ES', options);
        return formattedDate;

    }
    req.getConnection((err, conn) => {

        conn.query('SELECT r.id_reporte, r.fecha, r.descripcion, r.latitud, r.longitud, r.n_apoyos, r.estatus, r.n_denuncias, r.referencias, c.id_ciudadano AS nombre_ciudadano, d.nombre AS nombre_dependencia, r.tipo_reporte FROM reporte r JOIN ciudadano c ON r.id_ciudadano = c.id_ciudadano JOIN dependencia d ON r.id_dependencia = d.id_dependencia WHERE r.id_reporte = ?', [id_reporte], (err, reportes) => {
            if (err) {
                res.json(err);
            } else {
                console.log('Separacion en console log-------------------------------------------------------------------------');
                console.log(reportes);
                res.render('eliminar', { data: reportes, formatDate: formatDate });
            }
        })
    });

}

controller.eliminarreporte = (req, res) => {
    const { id_reporte } = req.params;
    const usermod = req.body['usermod'];
    const userrep = req.body['userrep'];

    const motivo = req.body['motivo'];
    req.getConnection((err, conn) => {
        conn.query('DELETE FROM reporte WHERE id_reporte = ?', [id_reporte], (err, reportes) => {
            if (err) {
                res.json(err);
            } else {
                conn.query('INSERT INTO baja_reporte (id_reporte, id_empleado, motivo) VALUES ( ?,?,?)', [id_reporte, usermod, motivo], (err, baja_report) => {
                    if (err) {
                        res.json(err);
                    } else {
                        conn.query('UPDATE ciudadano set n_penalizaciones = 1 WHERE id_ciudadano = ?', [userrep], (err, ban) => {
                            if (err) {
                                res.json(err);
                            } else {
                                res.redirect('/menumoderacion');
                            }
                        });
                    }
                });
            }
        });
    });
}



// Funciones del encargado de dependencia-----------------------------------------------------------------------------------------------------------------
controller.pantallaEncargado = (req, res) => {
    res.render('encargado');
}

controller.pantallaReportesEntrantesEncargado = (req, res) => {
    const dependencia = req.query.dependencia;
    console.log(dependencia);
    var tabla = '';
    var id = '';
    var query = '';
    switch (dependencia) {
        case '1': tabla = 'reporte_ooapas';
            treporte = 'Reporte Ooapas';
            query = 'SELECT r.id_reporte, r.fecha, r.descripcion, r.latitud, r.longitud, r.n_apoyos, r.estatus, r.n_denuncias, r.referencias, r.id_ciudadano, r.tipo_reporte, r.id_dependencia, oo.cve_predio, oo.colonia, oo.calle FROM reporte_ooapas oo JOIN reporte r ON oo.id_reporte = r.id_reporte';
            break;
        case '2': tabla = 'reporte_m_animal';
            treporte = 'Maltrato animal';
            query = 'SELECT r.id_reporte, r.fecha, r.descripcion, r.latitud, r.longitud, r.n_apoyos, r.estatus, r.n_denuncias, r.referencias, r.id_ciudadano, r.tipo_reporte, r.id_dependencia, ma.tipo_mascota, ma.colonia, ma.calle FROM reporte_m_animal ma JOIN reporte r ON ma.id_reporte = r.id_reporte';
            break;
        case '3': tabla = 'reporte_vial';
            treporte = 'Problema en carretera';
            query = 'SELECT r.id_reporte, r.fecha, r.descripcion, r.latitud, r.longitud, r.n_apoyos, r.estatus, r.n_denuncias, r.referencias, r.id_ciudadano, r.tipo_reporte, r.id_dependencia, v.imagen, v.colonia, v.calle FROM reporte_vial v JOIN reporte r ON v.id_reporte = r.id_reporte';
            break;
        case '4': tabla = 'reporte_alumbrado_publico'
            treporte = 'Falla en alumbrado';
            query = 'SELECT r.id_reporte, r.fecha, r.descripcion, r.latitud, r.longitud, r.n_apoyos, r.estatus, r.n_denuncias, r.referencias, r.id_ciudadano, r.tipo_reporte, r.id_dependencia, ap.colonia, ap.calle FROM reporte_alumbrado_publico ap JOIN reporte r ON ap.id_reporte = r.id_reporte';
            break;
        case '5': tabla = 'reporte_bacheo'
            treporte = 'Bache'
            query = 'SELECT r.id_reporte, r.fecha, r.descripcion, r.latitud, r.longitud, r.n_apoyos, r.estatus, r.n_denuncias, r.referencias, r.id_ciudadano, r.tipo_reporte, r.id_dependencia, b.colonia, b.calle, b.imagen FROM reporte_bacheo b JOIN reporte r ON b.id_reporte = r.id_reporte';
            break;
        default: console.log('error en dependencia');
            break;
    }
    console.log(query);
    const consulta = 'SELECT tr.'
    function formatDate(date) {
        const options = { day: '2-digit', month: '2-digit', year: '2-digit' };
        const formattedDate = new Date(date).toLocaleDateString('es-ES', options);
        return formattedDate;
        var tipo = '';
    }
    req.getConnection((err, conn) => {
        conn.query(query, (err, reportes) => {
            if (err) {
                res.json(err);
            } else {
                console.log(reportes);
                res.render('encargadoreportesentrantes', { data: reportes, formatDate: formatDate, treporte });
            }
        })
    });
}

controller.pantallaReportesRevisadosEncargado = (req, res) => {
    const dependencia = req.query.dependencia;
    console.log(dependencia);
    var tabla = '';
    var treporte = '';
    var query = '';
    switch (dependencia) {
        case '1': tabla = 'reporte_ooapas';
            treporte = 'Reporte Ooapas';
            query = 'SELECT r.id_reporte, r.fecha, r.descripcion, r.latitud, r.longitud, r.n_apoyos, r.estatus, r.n_denuncias, r.referencias, r.id_ciudadano, r.tipo_reporte, r.id_dependencia, oo.cve_predio, oo.colonia, oo.calle FROM reporte_ooapas oo JOIN reporte r ON oo.id_reporte = r.id_reporte';
            break;
        case '2': tabla = 'reporte_m_animal';
            treporte = 'Maltrato animal';
            query = 'SELECT r.id_reporte, r.fecha, r.descripcion, r.latitud, r.longitud, r.n_apoyos, r.estatus, r.n_denuncias, r.referencias, r.id_ciudadano, r.tipo_reporte, r.id_dependencia, ma.tipo_mascota, ma.colonia, ma.calle FROM reporte_m_animal ma JOIN reporte r ON ma.id_reporte = r.id_reporte';
            break;
        case '3': tabla = 'reporte_vial';
            treporte = 'Problema en carretera';
            query = 'SELECT r.id_reporte, r.fecha, r.descripcion, r.latitud, r.longitud, r.n_apoyos, r.estatus, r.n_denuncias, r.referencias, r.id_ciudadano, r.tipo_reporte, r.id_dependencia, v.imagen, v.colonia, v.calle FROM reporte_vial v JOIN reporte r ON v.id_reporte = r.id_reporte';
            break;
        case '4': tabla = 'reporte_alumbrado_publico'
            treporte = 'Falla en alumbrado';
            query = 'SELECT r.id_reporte, r.fecha, r.descripcion, r.latitud, r.longitud, r.n_apoyos, r.estatus, r.n_denuncias, r.referencias, r.id_ciudadano, r.tipo_reporte, r.id_dependencia, ap.colonia, ap.calle FROM reporte_alumbrado_publico ap JOIN reporte r ON ap.id_reporte = r.id_reporte';
            break;
        case '5': tabla = 'reporte_bacheo'
            treporte = 'Bache'
            query = 'SELECT r.id_reporte, r.fecha, r.descripcion, r.latitud, r.longitud, r.n_apoyos, r.estatus, r.n_denuncias, r.referencias, r.id_ciudadano, r.tipo_reporte, r.id_dependencia, b.colonia, b.calle, b.imagen FROM reporte_bacheo b JOIN reporte r ON b.id_reporte = r.id_reporte';
            break;
        default: console.log('error en dependencia');
            break;
    }
    console.log(query);
    const consulta = 'SELECT tr.'
    function formatDate(date) {
        const options = { day: '2-digit', month: '2-digit', year: '2-digit' };
        const formattedDate = new Date(date).toLocaleDateString('es-ES', options);
        return formattedDate;
        var tipo = '';
    }
    req.getConnection((err, conn) => {
        conn.query(query, (err, reportes) => {
            if (err) {
                res.json(err);
            } else {
                console.log(reportes);
                res.render('encargadoreportesrevisados', { data: reportes, formatDate: formatDate, treporte });
            }
        })
    });
}

controller.pantallaVisualizarReportesEncargado = (req, res) => {

    const dependencia = req.params.dependencia;
    console.log(dependencia);
    var tabla = '';
    var id_tabla = '';
    var treporte = '';
    var query = '';
    let inputsHTML = '';
    switch (dependencia) {
        case '1': tabla = 'reporte_ooapas';
            treporte = 'Reporte Ooapas';
            id_tabla = 'id_reporte_oo';
            query = 'SELECT r.id_reporte, r.fecha, r.descripcion, r.latitud, r.longitud, r.n_apoyos, r.estatus, r.n_denuncias, r.referencias, r.id_ciudadano, r.tipo_reporte, r.id_dependencia, oo.cve_predio, oo.colonia, oo.calle FROM reporte_ooapas oo JOIN reporte r ON oo.id_reporte = r.id_reporte';
            break;
        case '2': tabla = 'reporte_m_animal';
            treporte = 'Maltrato animal';
            id_tabla = 'id_reporte_me';
            query = 'SELECT r.id_reporte, r.fecha, r.descripcion, r.latitud, r.longitud, r.n_apoyos, r.estatus, r.n_denuncias, r.referencias, r.id_ciudadano, r.tipo_reporte, r.id_dependencia, ma.tipo_mascota, ma.colonia, ma.calle FROM reporte_m_animal ma JOIN reporte r ON ma.id_reporte = r.id_reporte';
            break;
        case '3': tabla = 'reporte_vial';
            treporte = 'Problema en carretera';
            id_tabla = 'id_reporte_v';
            query = 'SELECT r.id_reporte, r.fecha, r.descripcion, r.latitud, r.longitud, r.n_apoyos, r.estatus, r.n_denuncias, r.referencias, r.id_ciudadano, r.tipo_reporte, r.id_dependencia, v.imagen, v.colonia, v.calle FROM reporte_vial v JOIN reporte r ON v.id_reporte = r.id_reporte';
            break;
        case '4': tabla = 'reporte_alumbrado_publico'
            treporte = 'Falla en alumbrado';
            id_tabla = 'id_reporte_ap';
            query = 'SELECT r.id_reporte, r.fecha, r.descripcion, r.latitud, r.longitud, r.n_apoyos, r.estatus, r.n_denuncias, r.referencias, r.id_ciudadano, r.tipo_reporte, r.id_dependencia, ap.colonia, ap.calle FROM reporte_alumbrado_publico ap JOIN reporte r ON ap.id_reporte = r.id_reporte';
            break;
        case '5': tabla = 'reporte_bacheo'
            treporte = 'Bache'
            id_tabla = 'id_reporte_b';
            query = 'SELECT r.id_reporte, r.fecha, r.descripcion, r.latitud, r.longitud, r.n_apoyos, r.estatus, r.n_denuncias, r.referencias, r.id_ciudadano, r.tipo_reporte, r.id_dependencia, b.colonia, b.calle, b.imagen FROM reporte_bacheo b JOIN reporte r ON b.id_reporte = r.id_reporte';
            break;
        default: console.log('error en dependencia');
            break;
    }
    const consulta = 'SELECT tr.'
    function formatDate(date) {
        const options = { day: '2-digit', month: '2-digit', year: '2-digit' };
        const formattedDate = new Date(date).toLocaleDateString('es-ES', options);
        return formattedDate;
        var tipo = '';
    }
    req.getConnection((err, conn) => {

        conn.query(query, (err, data) => {
            let inputsHTML = '';
            switch (dependencia) {

                case '1':
                    inputsHTML += '<div><h3>Clave de predio:</h3><p>' + data[0].cve_predio + '</p></div>';
                    inputsHTML += '<div><h3>Colonia</h3><p>' + data[0].colonia + '</p></div>';
                    inputsHTML += '<div><h3>Calle</h3><p>' + data[0].calle + '</p></div>';

                    break;

                case '2':
                    inputsHTML += '<div><h3>Tipo de mascota:</h3><p>' + data[0].tipo_mascota + '</p></div>';
                    inputsHTML += '<div><h3>Colonia</h3><p>' + data[0].colonia + '</p></div>';
                    inputsHTML += '<div><h3>Calle</h3><p>' + data[0].calle + '</p></div>';

                    break;

                case '3':
                    inputsHTML += '<div><img src=' + data[0].id_ciudadano + '></div>';
                    inputsHTML += '<div><h3>Colonia</h3><p>' + data[0].colonia + '</p></div>';
                    inputsHTML += '<div><h3>Calle</h3><p>' + data[0].calle + '</p></div>';
                    break;

                case '4':
                    inputsHTML += '<div><h3>Colonia</h3><p>' + data[0].colonia + '</p></div>';
                    inputsHTML += '<div><h3>Calle</h3><p>' + data[0].calle + '</p></div>';
                    break;


                case '5':
                    inputsHTML += '<div><img src=' + data[0].id_ciudadano + '></div>';
                    inputsHTML += '<div><h3>Colonia</h3><p>' + data[0].colonia + '</p></div>';
                    inputsHTML += '<div><h3>Calle</h3><p>' + data[0].calle + '</p></div>';
                    break;

                default:
                    break;
            }
            if (err) {
                res.json(err);
            } else {
                console.log(data);
                res.render('encargadovisualizarreporte', { data: data, formatDate: formatDate, tiporeporte: treporte, inputsHTML, id_tabla });
            }
        })
    });

}



controller.pantallaDescargarReportesEncargado = (req, res) => {
    const id_tabla = req.params.id_tabla;
    console.log(id_tabla);
}

controller.rechazarReportesEncargado = (req, res) => {
    const id_tabla = req.params.id_tabla;
    const id_reporte = req.params.id_reporte;
    const usuario = req.params.usuario;
    console.log(id_tabla);
    console.log(id_reporte);
    console.log(usuario);

}


controller.solucionarReportesEncargado = (req, res) => {
    const id_tabla = req.params.id_tabla;
    console.log(id_tabla);
}

controller.descargarReportesEncargado = (req, res) => {
    const id_tabla = req.params.id_tabla;
    console.log(id_tabla);
}

module.exports = controller;