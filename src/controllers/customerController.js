// Aqui podemos exportar un objeto

const { json } = require("body-parser");

const controller = {};

    controller.render = (req, res) => {
        res.render('menuPrincipal');
            }

    controller.pantallaSesion = (req,res) => {
        res.render('inicioSesion');
        }

    controller.pantallaRegistro = (req,res) => {
        res.render('registro');
        }

    controller.pantallaMenuPrincipal = (req,res) => {
        res.render('menuPrincipal');
        }
    
    controller.plantillaModeracion = (req,res) => {
        res.render('plantillamoderacion');
        }   
    
    controller.pantallaAdministracion = (req,res) => {
        res.render('plantillaadministracion');
        }   
    
    controller.administracionEncargados = (req,res) => {
        req.getConnection((err, conn) => {
            conn.query('SELECT r.id_encargado, r.nombre, r.apellido_paterno, r.apellido_materno, c.nombre AS nombre_dependencia, r.usuario, r.contrasena FROM encargado_dependencia r JOIN dependencia c ON r.id_dependencia = c.id_dependencia', (err, encargados) => {
                if (err) {
                    res.json(err);
                } else{
                    console.log(encargados)
                res.render('administracionencargados',{data:encargados});
                }
            })
        });
        }
    
    controller.administracionModeradores = (req,res) => {
        req.getConnection((err, conn) => {
            conn.query('SELECT * FROM empleado', (err, empleados) => {
                if (err) {
                    res.json(err);
                } else{
                res.render('administracionmoderadores',{data:empleados});
                }
            })
        });
        }
    
    controller.administracionDependencias = (req,res) => {
        req.getConnection((err, conn) => {
            conn.query('SELECT * FROM dependencia', (err, dependencias) => {
                if (err) {
                    res.json(err);
                } else{
                res.render('administraciondependencias',{data:dependencias});
                }
            })
        });
        }
    
    controller.administracionUsuarios = (req,res) => {
        req.getConnection((err, conn) => {
            conn.query('SELECT * FROM ciudadano', (err, usuarios) => {
                if (err) {
                    res.json(err);
                } else{
                res.render('administracionusuarios',{data:usuarios});
                }
            })
        });
        }
    
    controller.administracionReportes = (req,res) => {
        function formatDate(date) {
            const options = { day: '2-digit', month: '2-digit', year: '2-digit' };
            const formattedDate = new Date(date).toLocaleDateString('es-ES', options);
            return formattedDate;
          }
        req.getConnection((err, conn) => {
            conn.query('SELECT r.id_reporte, r.fecha, r.descripcion, r.latitud, r.longitud, r.n_apoyos, r.estatus, r.n_denuncias, r.referencias, c.id_ciudadano AS nombre_ciudadano, d.nombre AS nombre_dependencia, r.tipo_reporte FROM reporte r JOIN ciudadano c ON r.id_ciudadano = c.id_ciudadano JOIN dependencia d ON r.id_dependencia = d.id_dependencia', (err, reportes) => {
                if (err) {
                    res.json(err);
                } else{
                res.render('administracionreportes',{data:reportes, formatDate: formatDate});
                }  
            })
        });
    }

    controller.pantallaReportesRevisados = (req,res) => {
        function formatDate(date) {
            const options = { day: '2-digit', month: '2-digit', year: '2-digit' };
            const formattedDate = new Date(date).toLocaleDateString('es-ES', options);
            return formattedDate;
          }
        req.getConnection((err, conn) => {
            conn.query('SELECT r.id_reporte, r.fecha, r.descripcion, r.latitud, r.longitud, r.n_apoyos, r.estatus, r.n_denuncias, r.referencias, c.id_ciudadano AS nombre_ciudadano, d.nombre AS nombre_dependencia, r.tipo_reporte FROM reporte r JOIN ciudadano c ON r.id_ciudadano = c.id_ciudadano JOIN dependencia d ON r.id_dependencia = d.id_dependencia', (err, reportes) => {
                if (err) {
                    res.json(err);
                } else{
                res.render('moderacionreportesrevisados',{data:reportes, formatDate: formatDate});
                }  
            })
        });
        }
    
    controller.pantallaReportesEntrantes = (req,res) => {
        function formatDate(date) {
            const options = { day: '2-digit', month: '2-digit', year: '2-digit' };
            const formattedDate = new Date(date).toLocaleDateString('es-ES', options);
            return formattedDate;
             }
        req.getConnection((err, conn) => {
            conn.query('SELECT r.id_reporte, r.fecha, r.descripcion, r.latitud, r.longitud, r.n_apoyos, r.estatus, r.n_denuncias, r.referencias, c.id_ciudadano AS nombre_ciudadano, d.nombre AS nombre_dependencia, r.tipo_reporte FROM reporte r JOIN ciudadano c ON r.id_ciudadano = c.id_ciudadano JOIN dependencia d ON r.id_dependencia = d.id_dependencia', (err, reportes) => {
                if (err) {
                    res.json(err);
                } else{
                res.render('moderacionreportesentrantes',{data:reportes, formatDate: formatDate});
                }  
            })
        });
        }

    controller.pantallaUsuarios = (req, res) => {
        req.getConnection((err, conn) => {
            conn.query('SELECT * FROM ciudadano', (err, usuarios) => {
                if (err) {
                    res.json(err);
                } else{
                console.log(usuarios);
                res.render('moderacionusuarios',{data:usuarios});
                }
            })
        });
    }

    controller.pantallaEmpleados = (req, res) => {
        req.getConnection((err, conn) => {
            conn.query('SELECT * FROM empleado', (err, empleados) => {
                if (err) {
                    res.json(err);
                } else{
                console.log(empleados);
                res.render('moderacionempleados',{data:empleados});
                }
            })
        });
    }

    controller.pantallaReportes = (req, res) => {
        function formatDate(date) {
            const options = { day: '2-digit', month: '2-digit', year: '2-digit' };
            const formattedDate = new Date(date).toLocaleDateString('es-ES', options);
            return formattedDate;
          }
        req.getConnection((err, conn) => {
            conn.query('SELECT r.id_reporte, r.fecha, r.descripcion, r.latitud, r.longitud, r.n_apoyos, r.estatus, r.n_denuncias, r.referencias, c.id_ciudadano AS nombre_ciudadano, d.nombre AS nombre_dependencia, r.tipo_reporte FROM reporte r JOIN ciudadano c ON r.id_ciudadano = c.id_ciudadano JOIN dependencia d ON r.id_dependencia = d.id_dependencia', (err, reportes) => {
                if (err) {
                    res.json(err);
                } else{
                    console.log('Separacion en console log-------------------------------------------------------------------------');
                console.log(reportes);
                res.render('moderacionreportes',{data:reportes, formatDate: formatDate});
                }  
            })
        });
    }

        

    controller.inicioSesion = (req, res) => {
        // Obtenemos el usuario y la contraseña del cuerpo de la solicitud
        const usuario = req.body['usuario'];
        const contrasena = req.body['contrasena'];
      
        // Establecemos la conexión con la base de datos
        req.getConnection((err, conn) => {
          // Consultamos la base de datos y obtenemos los datos del empleado
          conn.query('SELECT usuario, contrasena, cargo FROM empleado WHERE usuario=?', usuario, (err, empleado) => {
            // Verificamos si se produjo un error en la consulta
            if (err) {
              res.send('Error en la consulta');
              console.log(err);
            } else {
              // Verificamos si se encontró un empleado con el usuario proporcionado
              if (empleado.length > 0) {
                // Extraemos los datos de la consulta
                const usuarioConsulta = empleado[0].usuario;
                const contrasenaConsulta = empleado[0].contrasena;
                const cargo = empleado[0].cargo;
      
                // Comparamos el usuario y la contraseña con los datos de la consulta
                if (usuario === usuarioConsulta && contrasena === contrasenaConsulta) {
                  // Redirigimos a la página correspondiente según el cargo
                  req.session.usuario = usuario;
                  req.session.cargo = cargo;
                  if (cargo === "moderador") {
                    res.render('moderacion',{data:empleado});
                  } else if (cargo === "administrador") {
                    res.render('administracion',{data:empleado});
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
        });
      };
      

controller.insert = (req, res) =>{
    
    const data = req.body;

    req.getConnection((err, conn) => {
        
        console.log(req.body);
        conn.query('INSERT INTO empleado set ?', [data], (err, empleado) => {
            console.log(empleado);
            if(err){
                res.send('Registro fallido')
            } else{
                res.render('empleados',{
                    data:empleado
                });  
            }
        });
    });  
};

module.exports=controller;